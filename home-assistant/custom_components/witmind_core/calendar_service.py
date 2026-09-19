"""Servicio de dominio para el Calendario Laboral de Witmind en SQLite 3."""
from __future__ import annotations

import asyncio
from copy import deepcopy
from datetime import date, datetime
import logging
from typing import Any

try:
    from homeassistant.const import STATE_OFF, STATE_ON
    from homeassistant.core import HomeAssistant, callback
    from homeassistant.helpers.event import async_track_time_change
    from homeassistant.util import dt as dt_util
except ImportError:
    STATE_OFF = "off"
    STATE_ON = "on"
    def callback(func: Any) -> Any:  # type: ignore[misc]
        return func
    def async_track_time_change(*_args: Any, **_kwargs: Any) -> Any:  # type: ignore[misc]
        return None
    class dt_util:  # type: ignore[no-redef]
        @staticmethod
        def now() -> datetime:
            return datetime.now()
    HomeAssistant = Any  # type: ignore[misc,assignment]

from .calendar_repository import CalendarRepository
from .const import (
    CALENDAR_ENTITY_ID,
    EVENT_CALENDAR_UPDATED,
    LEGACY_EVENT_UPDATED,
)

_LOGGER = logging.getLogger(__name__)

MODE_SHADOW = "shadow"
MODE_ACTIVE = "active"


class CalendarService:
    """Servicio de dominio y cálculo de estado laboral."""

    def __init__(
        self,
        hass: HomeAssistant,
        repository: CalendarRepository,
        mode: str = MODE_SHADOW,
    ) -> None:
        self.hass = hass
        self.repository = repository
        self.mode = mode  # shadow | active
        self._unsub_midnight = None
        self._lock = asyncio.Lock()

    async def async_initialize(self) -> None:
        """Inicializa el servicio, carga metadatos y programa el refresco nocturno."""
        stored_mode = await self.repository.async_get_meta("calendar_mode")
        if stored_mode in (MODE_SHADOW, MODE_ACTIVE):
            self.mode = stored_mode

        _LOGGER.info(
            "Witmind CalendarService inicializado en modo %s (publicación en bus: %s)",
            self.mode,
            self.mode == MODE_ACTIVE,
        )

        if self.mode == MODE_ACTIVE:
            await self.async_refresh_state()

        @callback
        def _midnight_refresh(_now: Any) -> None:
            if hasattr(self.hass, "async_create_task"):
                self.hass.async_create_task(self.async_refresh_state())

        self._unsub_midnight = async_track_time_change(
            self.hass,
            _midnight_refresh,
            hour=0,
            minute=0,
            second=0,
        )

    def set_mode(self, mode: str) -> None:
        """Cambia el modo del servicio."""
        if mode not in (MODE_SHADOW, MODE_ACTIVE):
            raise ValueError(f"Modo inválido: {mode}. Debe ser shadow o active.")
        self.mode = mode

    async def async_set_mode(self, mode: str) -> None:
        """Cambia y persiste el modo del servicio."""
        self.set_mode(mode)
        await self.repository.async_set_meta("calendar_mode", mode)
        if self.mode == MODE_ACTIVE:
            await self.async_refresh_state()

    def _today_status(
        self, holidays: list[dict[str, Any]], target_date: date | None = None
    ) -> tuple[bool, str, dict[str, Any] | None, bool]:
        """Calcula si una fecha dada (por defecto hoy en hora local) es no laborable y su motivo."""
        current_date = target_date or dt_util.now().date()
        today_iso = current_date.isoformat()
        is_sunday = current_date.weekday() == 6

        holiday = next(
            (item for item in holidays if item["active"] and item["date"] == today_iso),
            None,
        )

        if is_sunday and holiday:
            return True, f"Domingo · {holiday['name']}", holiday, True
        if is_sunday:
            return True, "Domingo", None, True
        if holiday:
            return True, holiday["name"], holiday, False
        return False, "Día laboral", None, False

    def _next_holiday(
        self, holidays: list[dict[str, Any]], target_date: date | None = None
    ) -> dict[str, Any] | None:
        """Determina el próximo feriado activo estrictamente posterior a la fecha."""
        current_iso = (target_date or dt_util.now().date()).isoformat()
        candidates = [
            item for item in holidays if item["active"] and item["date"] > current_iso
        ]
        return deepcopy(min(candidates, key=lambda item: item["date"])) if candidates else None

    async def async_get_payload(self, year: int | None = None) -> dict[str, Any]:
        """Genera el payload canónico completo compatible con la UI."""
        holidays = await self.repository.async_get_all(year=None)
        filtered_holidays = (
            [h for h in holidays if h["date"].startswith(f"{year:04d}-")]
            if year is not None
            else holidays
        )

        is_blocked, reason, holiday, is_sunday = self._today_status(holidays)
        next_h = self._next_holiday(holidays)
        years = sorted({int(item["date"][:4]) for item in holidays if len(item["date"]) >= 4 and item["date"][:4].isdigit()})
        revision = await self.repository.async_get_revision()

        return {
            "entity_id": CALENDAR_ENTITY_ID,
            "today": dt_util.now().date().isoformat(),
            "is_non_working_day": is_blocked,
            "reason": reason,
            "is_sunday": is_sunday,
            "today_holiday": deepcopy(holiday),
            "next_holiday": next_h,
            "holidays": deepcopy(filtered_holidays),
            "years": years,
            "revision": revision,
            "mode": self.mode,
            "storage": "sqlite:witmind.db:work_calendar_holidays",
        }

    async def async_refresh_state(self) -> None:
        """Evalúa y publica el estado en Home Assistant si está en modo ACTIVO."""
        if self.mode != MODE_ACTIVE:
            _LOGGER.debug("CalendarService en modo sombra; se omite actualización de entidad")
            return

        holidays = await self.repository.async_get_all()
        is_blocked, reason, holiday, is_sunday = self._today_status(holidays)
        next_holiday = self._next_holiday(holidays)
        active_count = sum(1 for item in holidays if item["active"])
        revision = await self.repository.async_get_revision()

        attributes: dict[str, Any] = {
            "friendly_name": "Día no laborable",
            "icon": "mdi:calendar-remove" if is_blocked else "mdi:calendar-check",
            "fecha": dt_util.now().date().isoformat(),
            "motivo": reason,
            "es_domingo": is_sunday,
            "feriado_activo": holiday["name"] if holiday else None,
            "feriados_activos": active_count,
            "proximo_feriado": next_holiday["date"] if next_holiday else None,
            "proximo_feriado_nombre": next_holiday["name"] if next_holiday else None,
            "backend": "sqlite",
            "revision": revision,
        }

        if hasattr(self.hass, "states") and hasattr(self.hass.states, "async_set"):
            self.hass.states.async_set(
                CALENDAR_ENTITY_ID,
                STATE_ON if is_blocked else STATE_OFF,
                attributes,
            )

    async def async_add_holiday(
        self, data: dict[str, Any], actor_user_id: str | None = None
    ) -> dict[str, Any]:
        """Añade un feriado de forma atómica y notifica."""
        async with self._lock:
            record = await self.repository.async_add(data, actor_user_id)
            await self._on_mutation("add", record)
            return record

    async def async_update_holiday(
        self,
        record_id: str,
        changes: dict[str, Any],
        actor_user_id: str | None = None,
    ) -> dict[str, Any]:
        """Actualiza un feriado de forma atómica y notifica."""
        async with self._lock:
            record = await self.repository.async_update(record_id, changes, actor_user_id)
            await self._on_mutation("update", record)
            return record

    async def async_delete_holiday(
        self, record_id: str, actor_user_id: str | None = None
    ) -> dict[str, Any]:
        """Elimina un feriado de forma atómica y notifica."""
        async with self._lock:
            record = await self.repository.async_delete(record_id, actor_user_id)
            await self._on_mutation("delete", record)
            return record

    async def _on_mutation(self, operation: str, record: dict[str, Any]) -> None:
        """Ejecuta el post-commit: refresco de sensor y disparo de eventos si está activo."""
        if self.mode == MODE_ACTIVE:
            await self.async_refresh_state()
            if hasattr(self.hass, "bus") and hasattr(self.hass.bus, "async_fire"):
                self.hass.bus.async_fire(
                    EVENT_CALENDAR_UPDATED,
                    {
                        "operation": operation,
                        "record_id": record["id"],
                        "date": record["date"],
                        "backend": "sqlite",
                    },
                )
                self.hass.bus.async_fire(
                    LEGACY_EVENT_UPDATED,
                    {
                        "operation": operation,
                        "record_id": record["id"],
                        "date": record["date"],
                    },
                )
