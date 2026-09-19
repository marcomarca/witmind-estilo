"""Witmind Core Home Assistant integration con persistencia SQLite y Calendario Laboral."""
from __future__ import annotations

import logging
from typing import Any

from .calendar_migration import CalendarMigration
from .calendar_repository import CalendarRepository
from .calendar_service import CalendarService, MODE_SHADOW
from .calendar_websocket import async_register_calendar_websocket_commands
from .const import DOMAIN
from .database import WitmindDatabase
from .websocket import async_register_websocket_commands

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: Any, config: dict[str, Any]) -> bool:
    """Configura la integración witmind_core."""
    database = WitmindDatabase(hass)
    await database.async_initialize()

    calendar_repo = CalendarRepository(hass, database)
    calendar_service = CalendarService(hass, calendar_repo, mode=MODE_SHADOW)
    await calendar_service.async_initialize()

    calendar_migration = CalendarMigration(hass, calendar_repo)

    # Compatibilidad hacia atrás: database es el objeto principal en hass.data[DOMAIN]
    database.calendar_repository = calendar_repo  # type: ignore[attr-defined]
    database.calendar_service = calendar_service  # type: ignore[attr-defined]
    database.calendar_migration = calendar_migration  # type: ignore[attr-defined]
    hass.data[DOMAIN] = database

    # Registrar APIs de WebSocket
    async_register_websocket_commands(hass, database)
    async_register_calendar_websocket_commands(hass, calendar_service, calendar_migration)

    _LOGGER.info("Witmind Core (DB + Calendario Laboral SQLite) inicializado correctamente")
    return True
