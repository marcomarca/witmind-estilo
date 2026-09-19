"""Suite de pruebas unitarias automáticas para el Calendario Laboral SQLite de Witmind."""
import asyncio
from datetime import date
import json
import os
from pathlib import Path
import shutil
import tempfile
import unittest
from unittest.mock import MagicMock

# Importar componentes de witmind_core
import sys
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR / "home-assistant"))

from custom_components.witmind_core.database import WitmindDatabase
from custom_components.witmind_core.calendar_repository import CalendarRepository, CalendarValidationError
from custom_components.witmind_core.calendar_service import CalendarService, MODE_SHADOW, MODE_ACTIVE
from custom_components.witmind_core.calendar_migration import CalendarMigration


class MockHass:
    """Mock mínimo del objeto Home Assistant para pruebas unitarias."""
    def __init__(self):
        self.states = MagicMock()
        self.bus = MagicMock()

    async def async_add_executor_job(self, target, *args):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, target, *args)


class TestWitmindCalendarSQLite(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()
        self.db_path = os.path.join(self.temp_dir, "witmind.db")
        self.hass = MockHass()
        self.db = WitmindDatabase(self.hass, path=self.db_path)
        self.db._initialize()
        self.repo = CalendarRepository(self.hass, self.db)
        self.service = CalendarService(self.hass, self.repo, mode=MODE_SHADOW)
        self.migration = CalendarMigration(self.hass, self.repo)

    def tearDown(self):
        shutil.rmtree(self.temp_dir, ignore_errors=True)

    def test_database_initialization_and_schema(self):
        """Verifica que las tablas de calendario, auditoría y metadatos se hayan creado."""
        info = self.db._info()
        self.assertEqual(info["holidays_count"], 0)
        self.assertIn("path", info)
        self.assertEqual(info["path"], self.db_path)

    def test_repository_crud_and_validation(self):
        """Prueba inserción, consulta, actualización, eliminación y validaciones."""
        # 1. Inserción normal
        record = self.repo.add({
            "id": "h-2026-01-01",
            "date": "2026-01-01",
            "name": "Año Nuevo",
            "description": "Feriado nacional",
            "active": True
        })
        self.assertEqual(record["id"], "h-2026-01-01")
        self.assertEqual(record["date"], "2026-01-01")
        self.assertEqual(record["name"], "Año Nuevo")
        self.assertTrue(record["active"])

        # 2. Revisión incrementada
        self.assertEqual(self.repo.get_revision(), 1)

        # 3. Rechazo de fecha duplicada
        with self.assertRaises(CalendarValidationError):
            self.repo.add({
                "date": "2026-01-01",
                "name": "Año Nuevo Duplicado"
            })

        # 4. Rechazo de fecha con formato inválido
        with self.assertRaises(CalendarValidationError):
            self.repo.add({
                "date": "2026-02-30",
                "name": "Fecha inexistente"
            })

        # 5. Rechazo de nombre vacío o demasiado largo
        with self.assertRaises(CalendarValidationError):
            self.repo.add({
                "date": "2026-03-01",
                "name": ""
            })
        with self.assertRaises(CalendarValidationError):
            self.repo.add({
                "date": "2026-03-01",
                "name": "X" * 121
            })

        # 6. Actualización
        updated = self.repo.update("h-2026-01-01", {"active": False, "description": "Actualizado"})
        self.assertFalse(updated["active"])
        self.assertEqual(updated["description"], "Actualizado")
        self.assertEqual(self.repo.get_revision(), 2)

        # 7. Auditoría
        audit = self.repo.get_audit_log()
        self.assertEqual(len(audit), 2)
        self.assertEqual(audit[0]["operation"], "update")
        self.assertEqual(audit[1]["operation"], "add")

        # 8. Eliminación
        deleted = self.repo.delete("h-2026-01-01")
        self.assertEqual(deleted["id"], "h-2026-01-01")
        self.assertEqual(len(self.repo.get_all()), 0)
        self.assertEqual(self.repo.get_revision(), 3)

    def test_calendar_service_today_status_semantics(self):
        """Prueba la semántica laboral: domingo, feriado activo, domingo+feriado, inactivo y día hábil."""
        holidays = [
            {"date": "2026-01-01", "name": "Año Nuevo", "active": True},
            {"date": "2026-05-01", "name": "Día del Trabajo", "active": False},
            {"date": "2026-06-21", "name": "Año Nuevo Andino", "active": True}, # Domingo 2026-06-21
        ]

        # Día hábil ordinario (Lunes 2026-01-05)
        blocked, reason, h, is_sun = self.service._today_status(holidays, target_date=date(2026, 1, 5))
        self.assertFalse(blocked)
        self.assertEqual(reason, "Día laboral")
        self.assertIsNone(h)
        self.assertFalse(is_sun)

        # Feriado activo en día entre semana (Jueves 2026-01-01)
        blocked, reason, h, is_sun = self.service._today_status(holidays, target_date=date(2026, 1, 1))
        self.assertTrue(blocked)
        self.assertEqual(reason, "Año Nuevo")
        self.assertEqual(h["name"], "Año Nuevo")
        self.assertFalse(is_sun)

        # Domingo ordinario sin feriado (Domingo 2026-01-04)
        blocked, reason, h, is_sun = self.service._today_status(holidays, target_date=date(2026, 1, 4))
        self.assertTrue(blocked)
        self.assertEqual(reason, "Domingo")
        self.assertIsNone(h)
        self.assertTrue(is_sun)

        # Domingo coincidente con feriado activo (Domingo 2026-06-21)
        blocked, reason, h, is_sun = self.service._today_status(holidays, target_date=date(2026, 6, 21))
        self.assertTrue(blocked)
        self.assertEqual(reason, "Domingo · Año Nuevo Andino")
        self.assertEqual(h["name"], "Año Nuevo Andino")
        self.assertTrue(is_sun)

        # Feriado inactivo en día hábil (Viernes 2026-05-01 desactivado)
        blocked, reason, h, is_sun = self.service._today_status(holidays, target_date=date(2026, 5, 1))
        self.assertFalse(blocked)
        self.assertEqual(reason, "Día laboral")

    def test_next_holiday_calculation(self):
        """Verifica que el próximo feriado ignore fechas pasadas e inactivos."""
        holidays = [
            {"date": "2026-01-01", "name": "Año Nuevo", "active": True},
            {"date": "2026-02-16", "name": "Carnaval Inactivo", "active": False},
            {"date": "2026-04-03", "name": "Viernes Santo", "active": True},
            {"date": "2026-05-01", "name": "Día del Trabajo", "active": True},
        ]

        # Simular fecha 2026-02-01: debe ser Viernes Santo (salta el inactivo de Carnaval)
        nxt = self.service._next_holiday(holidays, target_date=date(2026, 2, 1))
        self.assertIsNotNone(nxt)
        self.assertEqual(nxt["date"], "2026-04-03")
        self.assertEqual(nxt["name"], "Viernes Santo")

    def test_migration_idempotency_and_hash(self):
        """Verifica la importación de los 15 registros canónicos y la idempotencia."""
        storage_file = os.path.join(self.temp_dir, "calendario_laboral")
        sample_data = {
            "version": 1,
            "key": "calendario_laboral",
            "data": {
                "holidays": [
                    {"id": "h1", "date": "2026-01-01", "name": "Año Nuevo", "description": "", "active": True},
                    {"id": "h2", "date": "2026-01-02", "name": "Feriado adicional", "description": "", "active": True},
                    {"id": "h3", "date": "2026-01-23", "name": "Estado Plurinacional", "description": "", "active": True},
                ]
            }
        }
        with open(storage_file, "w", encoding="utf-8") as f:
            json.dump(sample_data, f)

        # 1. Preview
        preview = self.migration.preview(storage_file)
        self.assertEqual(preview["valid_count"], 3)
        self.assertFalse(preview["already_imported"])
        hash1 = preview["canonical_hash"]
        self.assertTrue(len(hash1) == 64)

        # 2. Primera importación (Commit)
        res1 = self.migration.commit(storage_file)
        self.assertEqual(res1["status"], "committed")
        self.assertEqual(res1["imported_count"], 3)
        self.assertEqual(len(self.repo.get_all()), 3)

        # 3. Segunda importación sin forzar: debe ser idempotente y no duplicar
        res2 = self.migration.commit(storage_file)
        self.assertEqual(res2["status"], "already_imported")
        self.assertEqual(len(self.repo.get_all()), 3)


if __name__ == "__main__":
    unittest.main()
