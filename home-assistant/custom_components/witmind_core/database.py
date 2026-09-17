"""Small, namespaced SQLite store owned by Home Assistant."""
from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from .const import DB_DIRECTORY, DB_PATH, SCHEMA_VERSION


class WitmindDatabase:
    def __init__(self, hass: Any, path: str = DB_PATH) -> None:
        self.hass = hass
        self.path = path

    async def async_initialize(self) -> None:
        await self.hass.async_add_executor_job(self._initialize)

    def _connect(self) -> sqlite3.Connection:
        connection = sqlite3.connect(self.path, timeout=10)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute("PRAGMA foreign_keys=ON")
        return connection

    def _initialize(self) -> None:
        Path(self.path).parent.mkdir(parents=True, exist_ok=True)
        with self._connect() as db:
            db.executescript(
                """
                CREATE TABLE IF NOT EXISTS schema_meta (
                  key TEXT PRIMARY KEY,
                  value TEXT NOT NULL
                );
                CREATE TABLE IF NOT EXISTS kv (
                  namespace TEXT NOT NULL,
                  key TEXT NOT NULL,
                  value_json TEXT NOT NULL,
                  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
                  PRIMARY KEY (namespace, key)
                );
                CREATE TABLE IF NOT EXISTS documents (
                  namespace TEXT NOT NULL,
                  document_id TEXT NOT NULL,
                  value_json TEXT NOT NULL,
                  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
                  PRIMARY KEY (namespace, document_id)
                );
                """
            )
            db.execute("INSERT OR REPLACE INTO schema_meta(key, value) VALUES('schema_version', ?)", (str(SCHEMA_VERSION),))

    async def async_info(self) -> dict[str, Any]:
        return await self.hass.async_add_executor_job(self._info)

    def _info(self) -> dict[str, Any]:
        with self._connect() as db:
            count = db.execute("SELECT COUNT(*) FROM kv").fetchone()[0]
            documents = db.execute("SELECT COUNT(*) FROM documents").fetchone()[0]
        return {"path": self.path, "schema_version": SCHEMA_VERSION, "kv_count": count, "document_count": documents}

    async def async_kv_get(self, namespace: str, key: str) -> Any:
        return await self.hass.async_add_executor_job(self._kv_get, namespace, key)

    def _kv_get(self, namespace: str, key: str) -> Any:
        with self._connect() as db:
            row = db.execute("SELECT value_json FROM kv WHERE namespace=? AND key=?", (namespace, key)).fetchone()
        return None if row is None else json.loads(row[0])

    async def async_kv_set(self, namespace: str, key: str, value: Any) -> None:
        await self.hass.async_add_executor_job(self._kv_set, namespace, key, value)

    def _kv_set(self, namespace: str, key: str, value: Any) -> None:
        encoded = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        with self._connect() as db:
            db.execute("INSERT INTO kv(namespace,key,value_json,updated_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(namespace,key) DO UPDATE SET value_json=excluded.value_json, updated_at=datetime('now')", (namespace, key, encoded))

    async def async_kv_delete(self, namespace: str, key: str) -> bool:
        return await self.hass.async_add_executor_job(self._kv_delete, namespace, key)

    def _kv_delete(self, namespace: str, key: str) -> bool:
        with self._connect() as db:
            result = db.execute("DELETE FROM kv WHERE namespace=? AND key=?", (namespace, key))
        return result.rowcount > 0

    async def async_kv_list(self, namespace: str) -> list[str]:
        return await self.hass.async_add_executor_job(self._kv_list, namespace)

    def _kv_list(self, namespace: str) -> list[str]:
        with self._connect() as db:
            return [row[0] for row in db.execute("SELECT key FROM kv WHERE namespace=? ORDER BY key", (namespace,)).fetchall()]

    async def async_doc_get(self, namespace: str, document_id: str) -> Any:
        return await self.hass.async_add_executor_job(self._doc_get, namespace, document_id)

    def _doc_get(self, namespace: str, document_id: str) -> Any:
        with self._connect() as db:
            row = db.execute("SELECT value_json FROM documents WHERE namespace=? AND document_id=?", (namespace, document_id)).fetchone()
        return None if row is None else json.loads(row[0])

    async def async_doc_upsert(self, namespace: str, document_id: str, value: Any) -> None:
        await self.hass.async_add_executor_job(self._doc_upsert, namespace, document_id, value)

    def _doc_upsert(self, namespace: str, document_id: str, value: Any) -> None:
        encoded = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
        with self._connect() as db:
            db.execute("INSERT INTO documents(namespace,document_id,value_json,updated_at) VALUES(?,?,?,datetime('now')) ON CONFLICT(namespace,document_id) DO UPDATE SET value_json=excluded.value_json, updated_at=datetime('now')", (namespace, document_id, encoded))

    async def async_doc_delete(self, namespace: str, document_id: str) -> bool:
        return await self.hass.async_add_executor_job(self._doc_delete, namespace, document_id)

    def _doc_delete(self, namespace: str, document_id: str) -> bool:
        with self._connect() as db:
            result = db.execute("DELETE FROM documents WHERE namespace=? AND document_id=?", (namespace, document_id))
        return result.rowcount > 0

    async def async_doc_list(self, namespace: str) -> list[str]:
        return await self.hass.async_add_executor_job(self._doc_list, namespace)

    def _doc_list(self, namespace: str) -> list[str]:
        with self._connect() as db:
            return [row[0] for row in db.execute("SELECT document_id FROM documents WHERE namespace=? ORDER BY document_id", (namespace,)).fetchall()]
