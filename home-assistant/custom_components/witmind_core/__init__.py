"""Witmind Core Home Assistant integration."""
from __future__ import annotations

from typing import Any

from .const import DOMAIN
from .database import WitmindDatabase
from .websocket import async_register_websocket_commands


async def async_setup(hass: Any, config: dict[str, Any]) -> bool:
    database = WitmindDatabase(hass)
    await database.async_initialize()
    hass.data[DOMAIN] = database
    async_register_websocket_commands(hass, database)
    return True
