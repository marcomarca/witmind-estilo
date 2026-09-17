"""Allowlisted websocket API for the Witmind panel."""
from __future__ import annotations

import json
from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api

from .const import MAX_DOCUMENT_ID_LENGTH, MAX_KEY_LENGTH, MAX_NAMESPACE_LENGTH, MAX_VALUE_BYTES
from .database import WitmindDatabase


def _text(value: Any, limit: int, field: str) -> str:
    if not isinstance(value, str) or not value or len(value) > limit:
        raise vol.Invalid(f"{field} inválido")
    return value


def _payload_size(value: Any) -> None:
    if len(json.dumps(value, ensure_ascii=False).encode("utf-8")) > MAX_VALUE_BYTES:
        raise vol.Invalid("payload demasiado grande")


def async_register_websocket_commands(hass: Any, db: WitmindDatabase) -> None:
    async def handle(hass: Any, connection: Any, msg: dict[str, Any]) -> None:
        command = msg["type"].removeprefix("witmind_core/")
        try:
            if command == "ping":
                result = {"pong": True}
            elif command == "db/info":
                result = await db.async_info()
            else:
                namespace = _text(msg.get("namespace"), MAX_NAMESPACE_LENGTH, "namespace")
                if command.startswith("kv/"):
                    key = _text(msg.get("key"), MAX_KEY_LENGTH, "key")
                    if command == "kv/get": result = {"value": await db.async_kv_get(namespace, key)}
                    elif command == "kv/set": _payload_size(msg.get("value")); await db.async_kv_set(namespace, key, msg.get("value")); result = {"saved": True}
                    elif command == "kv/delete": result = {"deleted": await db.async_kv_delete(namespace, key)}
                    elif command == "kv/list": result = {"keys": await db.async_kv_list(namespace)}
                    else: raise vol.Invalid("comando KV inválido")
                elif command.startswith("doc/"):
                    document_id = _text(msg.get("document_id"), MAX_DOCUMENT_ID_LENGTH, "document_id")
                    if command == "doc/get": result = {"value": await db.async_doc_get(namespace, document_id)}
                    elif command == "doc/upsert": _payload_size(msg.get("value")); await db.async_doc_upsert(namespace, document_id, msg.get("value")); result = {"saved": True}
                    elif command == "doc/delete": result = {"deleted": await db.async_doc_delete(namespace, document_id)}
                    elif command == "doc/list": result = {"document_ids": await db.async_doc_list(namespace)}
                    else: raise vol.Invalid("comando de documentos inválido")
                else: raise vol.Invalid("comando no permitido")
            connection.send_result(msg["id"], result)
        except (vol.Invalid, ValueError, TypeError) as error:
            connection.send_error(msg["id"], "invalid_format", str(error))
        except Exception as error:  # noqa: BLE001 - never leak a traceback to the panel
            connection.send_error(msg["id"], "unknown_error", str(error))

    schema = vol.Schema(
        {vol.Required("id"): str, vol.Required("type"): str},
        extra=vol.ALLOW_EXTRA,
    )
    websocket_api.async_register_command(hass, handle, schema)
