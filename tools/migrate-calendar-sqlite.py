#!/usr/bin/env python3
"""Herramienta de migración y verificación del Calendario Laboral a SQLite 3."""
import argparse
import json
import os
from pathlib import Path
import sys

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "home-assistant"))

from custom_components.witmind_core.database import WitmindDatabase
from custom_components.witmind_core.calendar_repository import CalendarRepository
from custom_components.witmind_core.calendar_migration import CalendarMigration


class DummyHass:
    def __init__(self):
        self.states = None
        self.bus = None

    def async_add_executor_job(self, target, *args):
        return target(*args)


def main():
    parser = argparse.ArgumentParser(description="Migrador y verificador de Calendario Laboral a SQLite 3")
    parser.add_argument(
        "--storage-path",
        default=r"\\192.168.20.232\config\.storage\calendario_laboral",
        help="Ruta al archivo .storage/calendario_laboral",
    )
    parser.add_argument(
        "--db-path",
        default=r"\\192.168.20.232\config\witmind\witmind.db",
        help="Ruta a witmind.db",
    )
    parser.add_argument("--preview", action="store_true", help="Previsualizar registros sin escribir")
    parser.add_argument("--commit", action="store_true", help="Ejecutar la migración a la base de datos")
    parser.add_argument("--force", action="store_true", help="Forzar importación ignorando hash previo")
    parser.add_argument("--health", action="store_true", help="Inspeccionar salud y registros en SQLite")

    args = parser.parse_args()

    # Si la ruta por defecto de red no existe, buscar en rutas locales alternativas
    storage_path = args.storage_path
    if not os.path.exists(storage_path):
        candidates = [
            "/config/.storage/calendario_laboral",
            r"C:\Users\witronix\Desktop\backup hoy final\.storage\calendario_laboral",
        ]
        for c in candidates:
            if os.path.exists(c):
                storage_path = c
                break

    db_path = args.db_path
    if not os.path.exists(db_path) and not args.preview:
        local_candidate = "/config/witmind/witmind.db"
        if os.path.exists(local_candidate):
            db_path = local_candidate

    hass = DummyHass()
    db = WitmindDatabase(hass, path=db_path)
    if os.path.exists(db_path) or args.commit:
        db._initialize()
    repo = CalendarRepository(hass, db)
    migration = CalendarMigration(hass, repo)

    if args.health:
        info = db._info()
        holidays = repo.get_all()
        meta_hash = repo.get_meta("legacy_import_hash")
        meta_time = repo.get_meta("legacy_import_completed_at")
        rev = repo.get_revision()
        print("=== ESTADO DE WITMIND CALENDAR SQLITE ===")
        print(f"Base de datos: {db_path}")
        print(f"Total feriados en tabla: {len(holidays)}")
        print(f"Revisión: {rev}")
        print(f"Hash importación previa: {meta_hash}")
        print(f"Fecha importación previa: {meta_time}")
        print("------------------------------------------")
        for h in holidays:
            status = "ACTIVO" if h["active"] else "INACTIVO"
            desc = f" - {h['description']}" if h["description"] else ""
            print(f"[{h['date']}] {h['name']} ({status}){desc}")
        return

    if args.preview or (not args.commit and not args.health):
        print(f"Leyendo origen legado: {storage_path}")
        res = migration.preview(storage_path)
        print(f"\nTotal registros encontrados: {res['total_found']}")
        print(f"Registros válidos: {res['valid_count']}")
        print(f"Registros inválidos: {res['invalid_count']}")
        print(f"Fechas duplicadas: {res['duplicate_dates']}")
        print(f"Hash canónico SHA-256: {res['canonical_hash']}")
        print(f"¿Ya importado en base de datos?: {res['already_imported']}")
        print("\nLista canónica de feriados a migrar:")
        for h in res["holidays"]:
            print(f"  {h['date']} | {h['name']} | ID={h['id']}")
        if not args.commit:
            print("\nPara ejecutar la migración, utiliza el parámetro --commit")
        return

    if args.commit:
        print(f"Iniciando importación atómica hacia {db_path}...")
        res = migration.commit(storage_path, force=args.force, actor_user_id="cli_migration")
        print(json.dumps(res, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
