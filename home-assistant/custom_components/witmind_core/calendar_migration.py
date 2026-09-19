"""Rutina de importación idempotente desde .storage/calendario_laboral hacia SQLite 3."""
from __future__ import annotations

from datetime import datetime
import hashlib
import json
import logging
from pathlib import Path
from typing import Any

from .calendar_repository import CalendarRepository, CalendarValidationError

_LOGGER = logging.getLogger(__name__)

DEFAULT_LEGACY_STORAGE_PATH = "/config/.storage/calendario_laboral"


class CalendarMigration:
    """Migrador transaccional e idempotente de registros de calendario."""

    def __init__(self, hass: Any, repository: CalendarRepository) -> None:
        self.hass = hass
        self.repository = repository

    def calculate_canonical_hash(self, holidays: list[dict[str, Any]]) -> str:
        """Calcula el hash SHA-256 determinista del conjunto de feriados."""
        canonical = [
            {
                "id": str(item.get("id", "")),
                "date": str(item.get("date", "")),
                "name": str(item.get("name", "")),
                "description": str(item.get("description", "")),
                "active": bool(item.get("active", True)),
            }
            for item in sorted(holidays, key=lambda x: str(x.get("date", "")))
        ]
        serialized = json.dumps(canonical, sort_keys=True, ensure_ascii=False)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def load_legacy_storage(self, storage_path: str = DEFAULT_LEGACY_STORAGE_PATH) -> list[dict[str, Any]]:
        """Lee y extrae la lista de feriados del archivo de almacenamiento legado."""
        path = Path(storage_path)
        if not path.exists():
            raise FileNotFoundError(f"Archivo de almacenamiento legado no encontrado en {storage_path}")

        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)

        if not isinstance(data, dict) or "data" not in data or not isinstance(data["data"].get("holidays"), list):
            raise ValueError(f"Formato inválido en {storage_path}")

        return data["data"]["holidays"]

    def preview(self, storage_path: str = DEFAULT_LEGACY_STORAGE_PATH) -> dict[str, Any]:
        """Previsualiza la migración sin escribir ningún cambio en base de datos."""
        raw_holidays = self.load_legacy_storage(storage_path)
        valid: list[dict[str, Any]] = []
        invalid: list[dict[str, Any]] = []
        seen_dates: set[str] = set()
        duplicates: list[str] = []

        for raw in raw_holidays:
            try:
                norm = self.repository.normalize_record(raw, require_all=True)
                if norm["date"] in seen_dates:
                    duplicates.append(norm["date"])
                    continue
                seen_dates.add(norm["date"])
                valid.append(norm)
            except CalendarValidationError as err:
                invalid.append({"raw": raw, "error": str(err)})

        canon_hash = self.calculate_canonical_hash(valid)
        already_imported = self.repository.get_meta("legacy_import_hash") == canon_hash

        return {
            "source_path": storage_path,
            "total_found": len(raw_holidays),
            "valid_count": len(valid),
            "invalid_count": len(invalid),
            "duplicate_dates": duplicates,
            "canonical_hash": canon_hash,
            "already_imported": already_imported,
            "holidays": valid,
            "invalid_records": invalid,
        }

    def commit(
        self,
        storage_path: str = DEFAULT_LEGACY_STORAGE_PATH,
        force: bool = False,
        actor_user_id: str | None = None,
    ) -> dict[str, Any]:
        """Importa todos los feriados válidos en una única transacción atómica."""
        preview_data = self.preview(storage_path)

        if preview_data["already_imported"] and not force:
            return {
                "status": "already_imported",
                "message": "Los registros ya fueron importados previamente con el mismo hash canónico.",
                "canonical_hash": preview_data["canonical_hash"],
                "imported_count": preview_data["valid_count"],
            }

        valid_records = preview_data["holidays"]

        with self.repository.db.connect() as conn:
            # Insertar feriados
            for record in valid_records:
                conn.execute(
                    """
                    INSERT INTO work_calendar_holidays (id, date, name, description, active, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
                    ON CONFLICT(date) DO UPDATE SET
                        name = excluded.name,
                        description = excluded.description,
                        active = excluded.active,
                        updated_at = datetime('now')
                    """,
                    (
                        record["id"],
                        record["date"],
                        record["name"],
                        record["description"],
                        1 if record["active"] else 0,
                    ),
                )

            # Registrar en auditoría
            conn.execute(
                """
                INSERT INTO work_calendar_audit (operation, record_id, record_date, actor_user_id, before_json, after_json)
                VALUES ('import_batch', 'batch', ?, ?, NULL, ?)
                """,
                (
                    datetime.now().isoformat(),
                    actor_user_id,
                    json.dumps(
                        {"count": len(valid_records), "hash": preview_data["canonical_hash"]},
                        ensure_ascii=False,
                    ),
                ),
            )

            # Actualizar metadatos
            now_iso = datetime.now().isoformat()
            conn.execute(
                "INSERT INTO work_calendar_meta (key, value, updated_at) VALUES ('legacy_import_hash', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')",
                (preview_data["canonical_hash"],),
            )
            conn.execute(
                "INSERT INTO work_calendar_meta (key, value, updated_at) VALUES ('legacy_import_completed_at', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')",
                (now_iso,),
            )
            conn.execute(
                "INSERT INTO work_calendar_meta (key, value, updated_at) VALUES ('legacy_import_count', ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')",
                (str(len(valid_records)),),
            )

            self.repository._increment_revision(conn)

        _LOGGER.info(
            "Migración de Calendario Laboral completada: %s registros importados con hash %s",
            len(valid_records),
            preview_data["canonical_hash"],
        )

        return {
            "status": "committed",
            "message": f"Se importaron {len(valid_records)} feriados exitosamente.",
            "canonical_hash": preview_data["canonical_hash"],
            "imported_count": len(valid_records),
            "completed_at": now_iso,
        }

    async def async_preview(self, storage_path: str = DEFAULT_LEGACY_STORAGE_PATH) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self.preview, storage_path)

    async def async_commit(
        self,
        storage_path: str = DEFAULT_LEGACY_STORAGE_PATH,
        force: bool = False,
        actor_user_id: str | None = None,
    ) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self.commit, storage_path, force, actor_user_id)
