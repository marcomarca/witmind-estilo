"""Repositorio transaccional SQLite para el Calendario Laboral de Witmind."""
from __future__ import annotations

from datetime import date
import json
import logging
from typing import Any
from uuid import uuid4

from .const import (
    MAX_HOLIDAY_DESCRIPTION_LENGTH,
    MAX_HOLIDAY_ID_LENGTH,
    MAX_HOLIDAY_NAME_LENGTH,
)
from .database import WitmindDatabase

_LOGGER = logging.getLogger(__name__)


class CalendarValidationError(ValueError):
    """Error de validación de datos del calendario."""


class CalendarRepository:
    """Gestiona persistencia normalizada y transaccional en SQLite."""

    def __init__(self, hass: Any, db: WitmindDatabase) -> None:
        self.hass = hass
        self.db = db

    # -------------------------------------------------------------------------
    # Métodos síncronos ejecutados dentro del pool de hilos
    # -------------------------------------------------------------------------

    def normalize_record(self, raw: dict[str, Any], *, require_all: bool = True) -> dict[str, Any]:
        """Valida y normaliza un registro de feriado."""
        if not isinstance(raw, dict):
            raise CalendarValidationError("El registro debe ser un objeto JSON válido.")

        record_id = str(raw.get("id") or raw.get("record_id") or uuid4()).strip()
        date_str = str(raw.get("date") or "").strip()
        name = str(raw.get("name") or "").strip()
        description = str(raw.get("description") or "").strip()
        active = bool(raw.get("active", True))

        if require_all and (not date_str or not name):
            raise CalendarValidationError("Fecha y nombre son obligatorios.")

        if date_str:
            try:
                date.fromisoformat(date_str)
            except ValueError as err:
                raise CalendarValidationError(f"Fecha inválida: {date_str}. Debe ser YYYY-MM-DD.") from err

        if len(record_id) > MAX_HOLIDAY_ID_LENGTH:
            raise CalendarValidationError(f"El identificador supera {MAX_HOLIDAY_ID_LENGTH} caracteres.")

        if not name and require_all:
            raise CalendarValidationError("El nombre es obligatorio.")

        if len(name) > MAX_HOLIDAY_NAME_LENGTH:
            raise CalendarValidationError(f"El nombre supera {MAX_HOLIDAY_NAME_LENGTH} caracteres.")

        if len(description) > MAX_HOLIDAY_DESCRIPTION_LENGTH:
            raise CalendarValidationError(f"La descripción supera {MAX_HOLIDAY_DESCRIPTION_LENGTH} caracteres.")

        return {
            "id": record_id,
            "date": date_str,
            "name": name,
            "description": description,
            "active": active,
        }

    def get_all(self, year: int | None = None, active_only: bool = False) -> list[dict[str, Any]]:
        """Devuelve todos los feriados ordenados cronológicamente."""
        query = "SELECT id, date, name, description, active, created_at, updated_at FROM work_calendar_holidays WHERE 1=1"
        params: list[Any] = []

        if year is not None:
            query += " AND date GLOB ?"
            params.append(f"{year:04d}-*")

        if active_only:
            query += " AND active = 1"

        query += " ORDER BY date ASC"

        with self.db.connect() as conn:
            rows = conn.execute(query, params).fetchall()

        return [
            {
                "id": row["id"],
                "date": row["date"],
                "name": row["name"],
                "description": row["description"],
                "active": bool(row["active"]),
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
            }
            for row in rows
        ]

    def get_by_id(self, record_id: str) -> dict[str, Any] | None:
        """Obtiene un registro por su ID."""
        with self.db.connect() as conn:
            row = conn.execute(
                "SELECT id, date, name, description, active, created_at, updated_at FROM work_calendar_holidays WHERE id = ?",
                (record_id,),
            ).fetchone()

        if not row:
            return None

        return {
            "id": row["id"],
            "date": row["date"],
            "name": row["name"],
            "description": row["description"],
            "active": bool(row["active"]),
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }

    def get_by_date(self, date_str: str) -> dict[str, Any] | None:
        """Obtiene un registro por su fecha exacta."""
        with self.db.connect() as conn:
            row = conn.execute(
                "SELECT id, date, name, description, active, created_at, updated_at FROM work_calendar_holidays WHERE date = ?",
                (date_str,),
            ).fetchone()

        if not row:
            return None

        return {
            "id": row["id"],
            "date": row["date"],
            "name": row["name"],
            "description": row["description"],
            "active": bool(row["active"]),
            "created_at": row["created_at"],
            "updated_at": row["updated_at"],
        }

    def add(self, raw_data: dict[str, Any], actor_user_id: str | None = None) -> dict[str, Any]:
        """Inserta un nuevo feriado y registra auditoría."""
        record = self.normalize_record(raw_data, require_all=True)

        with self.db.connect() as conn:
            existing = conn.execute(
                "SELECT id FROM work_calendar_holidays WHERE date = ?",
                (record["date"],),
            ).fetchone()
            if existing:
                raise CalendarValidationError(f"Ya existe un registro para {record['date']}.")

            conn.execute(
                """
                INSERT INTO work_calendar_holidays (id, date, name, description, active, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
                """,
                (
                    record["id"],
                    record["date"],
                    record["name"],
                    record["description"],
                    1 if record["active"] else 0,
                ),
            )

            # Auditoría
            conn.execute(
                """
                INSERT INTO work_calendar_audit (operation, record_id, record_date, actor_user_id, before_json, after_json)
                VALUES ('add', ?, ?, ?, NULL, ?)
                """,
                (
                    record["id"],
                    record["date"],
                    actor_user_id,
                    json.dumps(record, ensure_ascii=False),
                ),
            )

            self._increment_revision(conn)

        return self.get_by_id(record["id"]) or record

    def update(
        self,
        record_id: str,
        changes: dict[str, Any],
        actor_user_id: str | None = None,
    ) -> dict[str, Any]:
        """Actualiza un feriado existente y registra auditoría."""
        record_id = str(record_id).strip()
        if not record_id:
            raise CalendarValidationError("Identificador de feriado inválido.")

        with self.db.connect() as conn:
            current_row = conn.execute(
                "SELECT id, date, name, description, active FROM work_calendar_holidays WHERE id = ?",
                (record_id,),
            ).fetchone()

            if not current_row:
                raise CalendarValidationError("No se encontró el feriado solicitado.")

            before_dict = {
                "id": current_row["id"],
                "date": current_row["date"],
                "name": current_row["name"],
                "description": current_row["description"],
                "active": bool(current_row["active"]),
            }

            merged = {**before_dict, **changes, "id": record_id}
            normalized = self.normalize_record(merged, require_all=True)

            if normalized["date"] != before_dict["date"]:
                date_conflict = conn.execute(
                    "SELECT id FROM work_calendar_holidays WHERE date = ? AND id != ?",
                    (normalized["date"], record_id),
                ).fetchone()
                if date_conflict:
                    raise CalendarValidationError(f"Ya existe un registro para {normalized['date']}.")

            conn.execute(
                """
                UPDATE work_calendar_holidays
                SET date = ?, name = ?, description = ?, active = ?, updated_at = datetime('now')
                WHERE id = ?
                """,
                (
                    normalized["date"],
                    normalized["name"],
                    normalized["description"],
                    1 if normalized["active"] else 0,
                    record_id,
                ),
            )

            conn.execute(
                """
                INSERT INTO work_calendar_audit (operation, record_id, record_date, actor_user_id, before_json, after_json)
                VALUES ('update', ?, ?, ?, ?, ?)
                """,
                (
                    record_id,
                    normalized["date"],
                    actor_user_id,
                    json.dumps(before_dict, ensure_ascii=False),
                    json.dumps(normalized, ensure_ascii=False),
                ),
            )

            self._increment_revision(conn)

        return self.get_by_id(record_id) or normalized

    def delete(self, record_id: str, actor_user_id: str | None = None) -> dict[str, Any]:
        """Elimina un feriado y registra auditoría."""
        record_id = str(record_id).strip()
        if not record_id:
            raise CalendarValidationError("Identificador de feriado inválido.")

        with self.db.connect() as conn:
            current_row = conn.execute(
                "SELECT id, date, name, description, active FROM work_calendar_holidays WHERE id = ?",
                (record_id,),
            ).fetchone()

            if not current_row:
                raise CalendarValidationError("No se encontró el feriado solicitado.")

            deleted_dict = {
                "id": current_row["id"],
                "date": current_row["date"],
                "name": current_row["name"],
                "description": current_row["description"],
                "active": bool(current_row["active"]),
            }

            conn.execute("DELETE FROM work_calendar_holidays WHERE id = ?", (record_id,))

            conn.execute(
                """
                INSERT INTO work_calendar_audit (operation, record_id, record_date, actor_user_id, before_json, after_json)
                VALUES ('delete', ?, ?, ?, ?, NULL)
                """,
                (
                    record_id,
                    deleted_dict["date"],
                    actor_user_id,
                    json.dumps(deleted_dict, ensure_ascii=False),
                ),
            )

            self._increment_revision(conn)

        return deleted_dict

    def get_meta(self, key: str, default: str | None = None) -> str | None:
        """Obtiene un metadato del calendario."""
        with self.db.connect() as conn:
            row = conn.execute("SELECT value FROM work_calendar_meta WHERE key = ?", (key,)).fetchone()
        return row["value"] if row else default

    def set_meta(self, key: str, value: str) -> None:
        """Establece un metadato del calendario."""
        with self.db.connect() as conn:
            conn.execute(
                """
                INSERT INTO work_calendar_meta (key, value, updated_at)
                VALUES (?, ?, datetime('now'))
                ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
                """,
                (key, str(value)),
            )

    def get_revision(self) -> int:
        """Obtiene el número de revisión monotónica."""
        val = self.get_meta("revision", "0")
        try:
            return int(val) if val else 0
        except ValueError:
            return 0

    def _increment_revision(self, conn: Any) -> int:
        """Incrementa la revisión atómicamente dentro de una transacción activa."""
        row = conn.execute("SELECT value FROM work_calendar_meta WHERE key = 'revision'").fetchone()
        current = int(row["value"]) if row and row["value"].isdigit() else 0
        new_rev = current + 1
        conn.execute(
            """
            INSERT INTO work_calendar_meta (key, value, updated_at)
            VALUES ('revision', ?, datetime('now'))
            ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')
            """,
            (str(new_rev),),
        )
        return new_rev

    def get_audit_log(self, limit: int = 50) -> list[dict[str, Any]]:
        """Obtiene entradas recientes de auditoría."""
        with self.db.connect() as conn:
            rows = conn.execute(
                """
                SELECT sequence, operation, record_id, record_date, actor_user_id, before_json, after_json, created_at
                FROM work_calendar_audit
                ORDER BY sequence DESC
                LIMIT ?
                """,
                (limit,),
            ).fetchall()

        return [
            {
                "sequence": row["sequence"],
                "operation": row["operation"],
                "record_id": row["record_id"],
                "record_date": row["record_date"],
                "actor_user_id": row["actor_user_id"],
                "before": json.loads(row["before_json"]) if row["before_json"] else None,
                "after": json.loads(row["after_json"]) if row["after_json"] else None,
                "created_at": row["created_at"],
            }
            for row in rows
        ]

    # -------------------------------------------------------------------------
    # Wrappers asíncronos para Home Assistant
    # -------------------------------------------------------------------------

    async def async_get_all(self, year: int | None = None, active_only: bool = False) -> list[dict[str, Any]]:
        return await self.hass.async_add_executor_job(self.get_all, year, active_only)

    async def async_get_by_id(self, record_id: str) -> dict[str, Any] | None:
        return await self.hass.async_add_executor_job(self.get_by_id, record_id)

    async def async_get_by_date(self, date_str: str) -> dict[str, Any] | None:
        return await self.hass.async_add_executor_job(self.get_by_date, date_str)

    async def async_add(self, raw_data: dict[str, Any], actor_user_id: str | None = None) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self.add, raw_data, actor_user_id)

    async def async_update(
        self,
        record_id: str,
        changes: dict[str, Any],
        actor_user_id: str | None = None,
    ) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self.update, record_id, changes, actor_user_id)

    async def async_delete(self, record_id: str, actor_user_id: str | None = None) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self.delete, record_id, actor_user_id)

    async def async_get_meta(self, key: str, default: str | None = None) -> str | None:
        return await self.hass.async_add_executor_job(self.get_meta, key, default)

    async def async_set_meta(self, key: str, value: str) -> None:
        await self.hass.async_add_executor_job(self.set_meta, key, value)

    async def async_get_revision(self) -> int:
        return await self.hass.async_add_executor_job(self.get_revision)

    async def async_get_audit_log(self, limit: int = 50) -> list[dict[str, Any]]:
        return await self.hass.async_add_executor_job(self.get_audit_log, limit)
