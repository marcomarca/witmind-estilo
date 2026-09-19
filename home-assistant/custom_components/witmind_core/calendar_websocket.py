"""WebSocket API allowlisted para el Calendario Laboral de Witmind en SQLite 3."""
from __future__ import annotations

import logging
from typing import Any

try:
    import voluptuous as vol
    from homeassistant.components import websocket_api
    from homeassistant.core import HomeAssistant, callback
except ImportError:
    class _VolMock:
        def All(self, *args: Any, **kwargs: Any) -> Any: return self
        def Match(self, *args: Any, **kwargs: Any) -> Any: return self
        def Strip(self, *args: Any, **kwargs: Any) -> Any: return self
        def Length(self, *args: Any, **kwargs: Any) -> Any: return self
        def Required(self, *args: Any, **kwargs: Any) -> Any: return args[0]
        def Optional(self, *args: Any, **kwargs: Any) -> Any: return args[0]
        def In(self, *args: Any, **kwargs: Any) -> Any: return self
        def Coerce(self, *args: Any, **kwargs: Any) -> Any: return self
    vol = _VolMock()  # type: ignore[assignment]
    class _WsMock:
        @staticmethod
        def websocket_command(*args: Any, **kwargs: Any) -> Any:
            def decorator(func: Any) -> Any: return func
            return decorator
        @staticmethod
        def require_admin(func: Any) -> Any: return func
        @staticmethod
        def async_response(func: Any) -> Any: return func
        @staticmethod
        def async_register_command(*args: Any, **kwargs: Any) -> None: pass
    websocket_api = _WsMock()  # type: ignore[assignment]
    def callback(func: Any) -> Any: return func  # type: ignore[misc]
    HomeAssistant = Any  # type: ignore[misc,assignment]

from .calendar_migration import CalendarMigration
from .calendar_repository import CalendarValidationError
from .calendar_service import CalendarService
from .const import (
    CALENDAR_DOMAIN,
    MAX_HOLIDAY_DESCRIPTION_LENGTH,
    MAX_HOLIDAY_ID_LENGTH,
    MAX_HOLIDAY_NAME_LENGTH,
)

_LOGGER = logging.getLogger(__name__)

DATE_SCHEMA = vol.All(str, vol.Match(r"^\d{4}-\d{2}-\d{2}$"))
NAME_SCHEMA = vol.All(str, vol.Strip, vol.Length(min=1, max=MAX_HOLIDAY_NAME_LENGTH))
DESCRIPTION_SCHEMA = vol.All(str, vol.Strip, vol.Length(max=MAX_HOLIDAY_DESCRIPTION_LENGTH))
RECORD_ID_SCHEMA = vol.All(str, vol.Strip, vol.Length(min=1, max=MAX_HOLIDAY_ID_LENGTH))


def async_register_calendar_websocket_commands(
    hass: HomeAssistant,
    service: CalendarService,
    migration: CalendarMigration,
) -> None:
    """Registra los comandos WebSocket oficiales de witmind_calendar."""

    # 1. Consulta canónica del calendario
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/get",
            vol.Optional("year"): vol.Coerce(int),
        }
    )
    @websocket_api.async_response
    async def ws_get(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        year = msg.get("year")
        payload = await service.async_get_payload(year=year)
        connection.send_result(msg["id"], payload)

    # 2. Diagnóstico de salud y estado del motor
    @websocket_api.websocket_command({vol.Required("type"): f"{CALENDAR_DOMAIN}/health"})
    @websocket_api.async_response
    async def ws_health(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        repo = service.repository
        revision = await repo.async_get_revision()
        all_holidays = await repo.async_get_all()
        active_count = sum(1 for h in all_holidays if h["active"])
        import_hash = await repo.async_get_meta("legacy_import_hash")
        import_time = await repo.async_get_meta("legacy_import_completed_at")

        connection.send_result(
            msg["id"],
            {
                "status": "ok",
                "backend": "sqlite",
                "mode": service.mode,
                "revision": revision,
                "total_holidays": len(all_holidays),
                "active_holidays": active_count,
                "legacy_import_hash": import_hash,
                "legacy_import_completed_at": import_time,
            },
        )

    # 3. Alta protegida
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/add",
            vol.Required("date"): DATE_SCHEMA,
            vol.Required("name"): NAME_SCHEMA,
            vol.Optional("description", default=""): DESCRIPTION_SCHEMA,
            vol.Optional("active", default=True): bool,
        }
    )
    async def ws_add(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        try:
            record = await service.async_add_holiday(
                {
                    "date": msg["date"],
                    "name": msg["name"],
                    "description": msg.get("description", ""),
                    "active": msg.get("active", True),
                },
                actor_user_id=user_id,
            )
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"record": record, "calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Error agregando feriado: %s", err)
            connection.send_error(msg["id"], "internal_error", str(err))

    # 4. Actualización protegida
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/update",
            vol.Required("record_id"): RECORD_ID_SCHEMA,
            vol.Optional("date"): DATE_SCHEMA,
            vol.Optional("name"): NAME_SCHEMA,
            vol.Optional("description"): DESCRIPTION_SCHEMA,
            vol.Optional("active"): bool,
        }
    )
    async def ws_update(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        changes = {k: msg[k] for k in ("date", "name", "description", "active") if k in msg}
        try:
            record = await service.async_update_holiday(
                msg["record_id"], changes, actor_user_id=user_id
            )
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"record": record, "calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Error actualizando feriado: %s", err)
            connection.send_error(msg["id"], "internal_error", str(err))

    # 5. Eliminación protegida
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/delete",
            vol.Required("record_id"): RECORD_ID_SCHEMA,
        }
    )
    async def ws_delete(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        try:
            deleted = await service.async_delete_holiday(msg["record_id"], actor_user_id=user_id)
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"deleted": deleted, "calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Error eliminando feriado: %s", err)
            connection.send_error(msg["id"], "internal_error", str(err))

    # 6. Previsualización de importación
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/import/preview",
            vol.Optional("storage_path"): str,
        }
    )
    async def ws_import_preview(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        storage_path = msg.get("storage_path")
        try:
            res = (
                await migration.async_preview(storage_path)
                if storage_path
                else await migration.async_preview()
            )
            connection.send_result(msg["id"], res)
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Error previsualizando importación: %s", err)
            connection.send_error(msg["id"], "import_preview_failed", str(err))

    # 7. Commit de importación
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/import/commit",
            vol.Optional("storage_path"): str,
            vol.Optional("force", default=False): bool,
        }
    )
    async def ws_import_commit(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        storage_path = msg.get("storage_path")
        force = bool(msg.get("force", False))
        try:
            res = (
                await migration.async_commit(storage_path, force=force, actor_user_id=user_id)
                if storage_path
                else await migration.async_commit(force=force, actor_user_id=user_id)
            )
            connection.send_result(msg["id"], res)
        except Exception as err:  # noqa: BLE001
            _LOGGER.exception("Error ejecutando commit de importación: %s", err)
            connection.send_error(msg["id"], "import_commit_failed", str(err))

    # 8. Modificación de modo (sombra / activo)
    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): f"{CALENDAR_DOMAIN}/mode/set",
            vol.Required("mode"): vol.In(["shadow", "active"]),
        }
    )
    async def ws_mode_set(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        try:
            await service.async_set_mode(msg["mode"])
            connection.send_result(msg["id"], {"mode": service.mode})
        except Exception as err:  # noqa: BLE001
            connection.send_error(msg["id"], "mode_set_failed", str(err))

    # Registrar comandos oficiales
    websocket_api.async_register_command(hass, ws_get)
    websocket_api.async_register_command(hass, ws_health)
    websocket_api.async_register_command(hass, ws_add)
    websocket_api.async_register_command(hass, ws_update)
    websocket_api.async_register_command(hass, ws_delete)
    websocket_api.async_register_command(hass, ws_import_preview)
    websocket_api.async_register_command(hass, ws_import_commit)
    websocket_api.async_register_command(hass, ws_mode_set)

    # Aliases de compatibilidad clásica: solo si 'calendario_laboral' NO está activo en hass.data
    # para evitar duplicidad de handlers.
    if getattr(hass, "data", None) is not None and "calendario_laboral" not in hass.data:
        _register_legacy_aliases(hass, service)


def _register_legacy_aliases(hass: HomeAssistant, service: CalendarService) -> None:
    """Registra comandos con prefijo calendario_laboral/* redirigidos a SQLite."""
    @websocket_api.websocket_command({vol.Required("type"): "calendario_laboral/get"})
    @websocket_api.async_response
    async def ws_legacy_get(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        payload = await service.async_get_payload()
        connection.send_result(msg["id"], payload)

    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "calendario_laboral/add",
            vol.Required("date"): DATE_SCHEMA,
            vol.Required("name"): NAME_SCHEMA,
            vol.Optional("description", default=""): DESCRIPTION_SCHEMA,
            vol.Optional("active", default=True): bool,
        }
    )
    async def ws_legacy_add(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        try:
            record = await service.async_add_holiday(
                {
                    "date": msg["date"],
                    "name": msg["name"],
                    "description": msg.get("description", ""),
                    "active": msg.get("active", True),
                },
                actor_user_id=user_id,
            )
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"record": record, "calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))

    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "calendario_laboral/update",
            vol.Required("record_id"): RECORD_ID_SCHEMA,
            vol.Optional("date"): DATE_SCHEMA,
            vol.Optional("name"): NAME_SCHEMA,
            vol.Optional("description"): DESCRIPTION_SCHEMA,
            vol.Optional("active"): bool,
        }
    )
    async def ws_legacy_update(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        changes = {k: msg[k] for k in ("date", "name", "description", "active") if k in msg}
        try:
            record = await service.async_update_holiday(
                msg["record_id"], changes, actor_user_id=user_id
            )
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"record": record, "calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))

    @websocket_api.require_admin
    @websocket_api.async_response
    @websocket_api.websocket_command(
        {
            vol.Required("type"): "calendario_laboral/delete",
            vol.Required("record_id"): RECORD_ID_SCHEMA,
        }
    )
    async def ws_legacy_delete(hass: HomeAssistant, connection: Any, msg: dict[str, Any]) -> None:
        user_id = connection.user.id if getattr(connection, "user", None) else None
        try:
            await service.async_delete_holiday(msg["record_id"], actor_user_id=user_id)
            payload = await service.async_get_payload()
            connection.send_result(msg["id"], {"calendar": payload})
        except CalendarValidationError as err:
            connection.send_error(msg["id"], "invalid_holiday", str(err))

    try:
        websocket_api.async_register_command(hass, ws_legacy_get)
        websocket_api.async_register_command(hass, ws_legacy_add)
        websocket_api.async_register_command(hass, ws_legacy_update)
        websocket_api.async_register_command(hass, ws_legacy_delete)
        _LOGGER.info("Aliases clásicos de calendario_laboral/* registrados en witmind_core")
    except Exception as err:
        _LOGGER.debug("No se registraron aliases clásicos: %s", err)
