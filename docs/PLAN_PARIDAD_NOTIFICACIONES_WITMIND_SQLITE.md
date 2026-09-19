# Plan de paridad funcional y migración SQLite — Notificaciones Witmind

**Estado:** documento de implementación. No contiene ni autoriza cambios directos en Home Assistant.  
**Fecha de auditoría:** 2026-09-19, zona horaria `America/La_Paz`.  
**Objetivo:** recuperar en el panel unificado toda la funcionalidad útil de `notifications-panel.js` 1.0.7, conservar el motor backend ya estabilizado y preparar su persistencia en SQLite sin producir envíos duplicados.

## 1. Conclusión ejecutiva

La lógica clásica de notificaciones **no está muerta ni fue sustituida**. El componente `/config/custom_components/witmind_notifications/` continúa cargándose al iniciar Home Assistant, evalúa sensores aunque el panel esté cerrado, administra temporizadores, reintentos, recordatorios, recuperaciones y realiza los envíos.

La ruta activa `/notificaciones` ya no carga directamente el frontend clásico. Carga `/local/witmind-ui-panel.js?v=0.6.4`, que monta `src/witmind-admin-panel.ts`. Esa interfaz nueva solo expone una fracción del backend:

- lista reglas;
- activa o desactiva;
- elimina sin confirmación;
- lista destinos;
- envía una prueba;
- muestra solamente 12 elementos del historial.

El frontend clásico 1.0.7 tenía un editor completo de reglas, estado operacional en vivo, selección de sensores y múltiples destinatarios, temporización, histéresis, frecuencia de recordatorios, aviso de recuperación, personalización de mensajes, renombrado seguro de dispositivos, confirmación de eliminación, pestañas e historial detallado.

Por tanto, la tarea principal no es volver a escribir el motor. La primera tarea es **portar la interfaz clásica al panel unificado conservando exactamente el contrato del backend actual**. La migración de `.storage/witmind_notifications` a SQLite debe realizarse después, sustituyendo únicamente la capa de persistencia y manteniendo una sola instancia del motor.

## 2. Evidencia auditada

### Frontend clásico

- Archivo: `\\192.168.20.232\config\www\notifications-panel.js`
- Versión declarada: `1.0.7`.
- Tamaño auditado: aproximadamente 90 KB.
- Custom element: `notifications-panel`.
- Actualmente permanece en disco, pero `configuration.yaml` ya no lo usa como `module_url`.

### Frontend unificado actual

- Fuente: `src/witmind-admin-panel.ts`.
- Custom element montado: `witmind-admin-panel`.
- Integración con el workspace: `src/witmind-workspace.ts`.
- Bridge: `home-assistant/www/witmind-ui-panel.js`.
- Ruta de HA: `/notificaciones`.
- `require_admin: true`.

### Backend activo

- `\\192.168.20.232\config\custom_components\witmind_notifications\__init__.py`
- `const.py`
- `discovery.py`
- `dispatcher.py`
- `engine.py`
- `storage.py`
- `websocket.py`
- Versión de integración: `1.0.7`.

### Persistencia observada

`/config/.storage/witmind_notifications` contiene actualmente:

- `runtime_schema: 2`;
- 2 reglas;
- 2 estados runtime;
- 424 registros de historial, con límite configurado de 500;
- 3 aliases de dispositivos.

Distribución del historial observada:

| Tipo | Estado | Cantidad |
|---|---:|---:|
| Alerta | Error | 361 |
| Alerta | Enviada | 14 |
| Recuperación | Enviada | 11 |
| Recordatorio | Enviado | 26 |
| Prueba manual | Enviada | 12 |

Los 361 errores comparten el diagnóstico de identidad protegida: un dispositivo guardado ya no existe con la misma identidad y debe seleccionarse nuevamente. El panel actual no permite editar los destinatarios de una regla, por lo que hoy no ofrece una forma razonable de reparar este incidente desde la interfaz.

## 3. Arquitectura real actual

```text
Sensores Home Assistant
        │ cambios de estado
        ▼
NotificationRuleEngine
        ├── Durante / pending
        ├── condición e histéresis
        ├── incidencia activa
        ├── recordatorios
        ├── recuperación
        ├── reintentos
        └── watchdog de vencimientos
                │
                ▼
NotificationDispatcher
        ├── notify.mobile_app_* heredado
        └── notify.send_message moderno
                │
                ▼
Dispositivos Mobile App

WitmindNotificationStore
        └── .storage/witmind_notifications

Panel abierto
        └── WebSocket witmind_notifications/*
```

El panel no mantiene vivo el motor. Puede estar cerrado y las reglas siguen evaluándose porque `witmind_notifications` se inicializa desde `configuration.yaml` durante el arranque de Home Assistant.

## 4. Capacidades existentes del backend que no deben reimplementarse

La IA implementadora debe reutilizar estas capacidades; no debe duplicarlas en TypeScript:

- descubrimiento de sensores con `device_class: temperature`;
- descubrimiento de Notify Entities de `mobile_app`;
- compatibilidad con acciones heredadas `notify.mobile_app_*`;
- identidad estable por Device Registry, Config Entry, identificadores y Entity Registry;
- protección contra reasignar silenciosamente una regla a otro teléfono;
- aliases amigables persistentes separados del nombre de Home Assistant;
- condiciones `above`, `below`, `outside` e `inside`;
- duración `for_seconds` de 0 a 86 400 segundos;
- histéresis de 0 a 50;
- máximo 25 destinatarios;
- modos `once`, `repeat` y `daily`;
- recordatorio repetido entre 60 y 604 800 segundos;
- recuperación opcional;
- plantillas seguras de título y mensaje;
- timeout de entrega de 20 segundos;
- reintento de entrega a los 60 segundos;
- historial por destinatario y por intento;
- watchdog cada segundo para rescatar deadlines perdidos;
- persistencia de runtime y deadlines;
- suscripción a sensores únicamente para reglas habilitadas;
- evento `witmind_notifications_updated`.

No mover condiciones, histéresis, temporizadores o decisiones de envío al navegador. El frontend solo edita configuración y representa el runtime devuelto por el backend.

## 5. Comparación funcional

| Función | Clásico 1.0.7 | Panel unificado actual | Acción requerida |
|---|---:|---:|---|
| Resumen de reglas activas | Sí | Solo conteo total | Recuperar activas y en alerta |
| Resumen de dispositivos disponibles | Sí | No | Recuperar disponible/total |
| Último envío | Sí | No | Recuperar fecha y destino |
| Pestañas Reglas/Dispositivos/Historial | Sí | No | Recuperar |
| Crear reglas | Sí | No | Falta crítica |
| Editar reglas | Sí | No | Falta crítica |
| Activar/desactivar | Sí | Sí | Conservar con estado ocupado |
| Eliminar con confirmación | Sí | No | Recuperar |
| Seleccionar sensor | Sí | No | Recuperar |
| Priorizar sensores configurados | Sí | No | Recuperar `preferred_sensors` |
| Valor del sensor en vivo | Sí | No | Recuperar |
| ≥ umbral | Sí | No | Recuperar editor |
| ≤ umbral | Sí | No | Recuperar editor |
| Fuera de rango | Sí | No | Recuperar editor |
| Dentro de rango | Sí | No | Recuperar editor |
| Duración “Durante” | Sí | No | Recuperar |
| Histéresis | Sí | No | Recuperar |
| Ayudas explicativas | Sí | No | Recuperar |
| Una vez por incidencia | Sí | No | Recuperar |
| Repetir mientras siga activa | Sí | No | Recuperar |
| Cada 24 horas | Sí | No | Recuperar |
| Aviso de recuperación | Sí | No | Recuperar |
| Selección múltiple de destinos | Sí | No | Recuperar |
| Nombre y cuerpo personalizados | Sí | No | Recuperar |
| Variables de plantilla | Sí | No | Recuperar y documentar |
| Vista previa del mensaje | Sí | No | Recuperar |
| Estado normal | Sí | No | Recuperar |
| Temporizando y cuenta regresiva | Sí | No | Recuperar |
| Enviando | Sí | No | Recuperar |
| Alerta activa | Sí | No | Recuperar |
| Próximo recordatorio | Sí | No | Recuperar |
| Error y próximo reintento | Sí | No | Recuperar |
| Error inline por regla | Sí | No | Recuperar |
| Destinos con hardware/software/área | Sí | Parcial | Recuperar datos completos |
| Disponibilidad del destino | Sí | No | Recuperar |
| Renombrar destino de forma segura | Sí | No | Recuperar |
| Restaurar nombre de HA | Sí | No | Recuperar |
| Prueba individual por destino | Sí | Sí | Corregir estado ocupado y feedback |
| Historial completo cargado | Sí, hasta 150 en UI | Solo primeros 12 visibles | Recuperar lista y filtros |
| Tipo alerta/recordatorio/recuperación/prueba | Sí | No | Recuperar |
| Estado enviado/error | Sí | No | Recuperar |
| Error detallado | Sí | No | Recuperar |
| Actualización por evento backend | Sí, con debounce | Sí, pero defectuosa | Corregir suscripción |
| Evitar render durante modal | Sí | No aplica porque no hay editor | Implementar barrera |
| Toast de éxito/error | Sí | No para notificaciones | Recuperar |
| Tema claro/oscuro | Sí | Sí | Conservar |
| Responsive | Sí | Básico | Recuperar y probar |

## 6. Defectos concretos del frontend actual

La implementación no debe limitarse a copiar estilos. Debe corregir estos defectos:

1. `_load()` crea una nueva suscripción a `witmind_notifications_updated` cada vez que carga. Un evento llama nuevamente a `_load()`, que vuelve a suscribirse y reemplaza la referencia anterior. Esto puede acumular listeners.
2. El evento backend vuelve a solicitar reglas, destinos, sensores e historial completos y reconstruye la vista. El clásico refresca solo reglas e historial con debounce de 80 ms.
3. La condición de carga de la plantilla usa `!this._calendar.length` incluso cuando el panel es Notificaciones. El estado de carga debe usar datos propios del módulo.
4. El botón “Probar” mostrado junto a cada regla envía realmente al primer destino global, no a los destinatarios de esa regla. Es semánticamente incorrecto.
5. Las tarjetas no muestran `rule.source.entity_id`, condición ni runtime; normalmente terminan mostrando solo “Activa”.
6. El borrado se ejecuta sin diálogo de confirmación.
7. No existe estado ocupado por acción, por lo que pueden ocurrir dobles clics.
8. No existe forma de crear o editar una regla aunque el backend expone `rules/create` y `rules/update`.
9. Se cargan sensores pero no se muestran ni utilizan.
10. Se cargan hasta 150 eventos pero se ocultan todos salvo los primeros 12.
11. No se muestra el error de identidad que afecta actualmente a 361 eventos ni se ofrece la reparación mediante reselección del destino.
12. El método de prueba busca por `key`, `id` o `device_id`, pero debe priorizar el `target_id` estable y conservar el snapshot de identidad completo.

## 7. Decisión de alcance

La implementación debe dividirse en dos entregas independientes:

### Entrega A — Paridad visual y funcional

- Mantener el backend 1.0.7 y `.storage` sin cambios.
- Portar las funciones del panel clásico al panel unificado.
- Resolver los destinatarios obsoletos desde el editor.
- Verificar envíos sin cambiar el motor.

### Entrega B — Persistencia SQLite

- Mantener exactamente el mismo motor y API WebSocket.
- Sustituir `WitmindNotificationStore` por un adaptador SQLite compatible.
- Migrar reglas, runtime, historial y aliases.
- Ejecutar una sola instancia de `NotificationRuleEngine`.

No mezclar ambas entregas en una sola release. Si se cambia UI, persistencia y motor al mismo tiempo, será imposible aislar el origen de una alerta duplicada o perdida.

## 8. Implementación exacta del frontend

### 8.1 Estructura de archivos

Mantener el custom element `witmind-admin-panel` para no modificar bridge, aliases ni `witmind-workspace.ts` durante esta fase.

Crear módulos auxiliares puros:

- `src/notifications-types.ts`: contratos TypeScript.
- `src/notifications-model.ts`: normalización, validación y textos de estado.
- `src/notifications-view.ts`: renderizadores puros opcionales si `witmind-admin-panel.ts` queda demasiado grande.
- `src/tests/unit/notifications-model.test.ts`: pruebas de reglas y estados visuales.

`src/witmind-admin-panel.ts` seguirá decidiendo entre calendario y notificaciones, pero delegará las operaciones de notificaciones. No registrar de nuevo el tag `notifications-panel` dentro de la app versionada.

### 8.2 Estado requerido en el componente

Añadir estado separado del calendario:

```ts
private _notificationLoaded = false;
private _notificationLoading = false;
private _notificationError = "";
private _notificationTab: "rules" | "devices" | "history" = "rules";
private _notificationBusy = "";
private _notificationEditorOpen = false;
private _notificationEditorStep = 1;
private _editingRuleId: string | null = null;
private _ruleDraft: NotificationRuleDraft | null = null;
private _deleteRuleId: string | null = null;
private _renameTargetId: string | null = null;
private _renameValue = "";
private _editorError = "";
private _deleteError = "";
private _renameError = "";
private _notificationToast: { message: string; type: "success" | "error" } | null = null;
private _notificationUnsubscribe?: () => void;
private _notificationRefreshTimer?: number;
private _notificationCountdownTimer?: number;
```

No reutilizar `_busy`, `_modal`, `_toast` o `_loaded` del calendario para una operación de notificaciones. Los dos dominios deben poder desmontarse y remontarse sin contaminarse.

### 8.3 Ciclo de vida y suscripción

Implementar exactamente este comportamiento:

1. Al montar Notificaciones, llamar una vez a `_loadNotifications(true)`.
2. Suscribirse una sola vez a `witmind_notifications_updated`.
3. Si ya existe `_notificationUnsubscribe`, no volver a suscribirse.
4. Al recibir evento, aplicar debounce de 80 ms.
5. En refresco de runtime solicitar solamente:
   - `witmind_notifications/rules/list`;
   - `witmind_notifications/history/list` con límite 150.
6. No volver a pedir sensores y dispositivos por cada cambio térmico.
7. Actualizar las cuentas regresivas cada segundo modificando solo nodos con:
   - `data-pending-until`;
   - `data-reminder-at`;
   - `data-retry-at`.
8. En `disconnectedCallback`:
   - cancelar debounce;
   - cancelar intervalo;
   - cancelar toast;
   - ejecutar la desuscripción exactamente una vez.

No llamar a `_render()` desde cada actualización de `hass`. Calcular una firma solo con los sensores usados por reglas o por el borrador abierto.

### 8.4 Barrera contra destrucción del editor

El editor, confirmación de borrado y diálogo de alias son interacciones vivas. Mientras alguno esté abierto:

- no reemplazar `shadowRoot.innerHTML` por eventos de Home Assistant;
- no reconstruir inputs durante peticiones WebSocket;
- actualizar botones, errores y previsualización in-place;
- diferir el render estructural hasta cerrar el diálogo.

Esto es obligatorio para evitar pérdida de foco, borrado del texto escrito y cancelación del swipe en Android WebView.

### 8.5 Cabecera, resumen y pestañas

La vista debe contener:

1. Botón “Nueva regla”, visible solo para administrador.
2. Resumen:
   - reglas habilitadas;
   - reglas actualmente en alerta;
   - dispositivos disponibles/total;
   - último envío exitoso y destino.
3. Pestañas:
   - Reglas;
   - Dispositivos;
   - Historial.
4. Botón Actualizar que vuelva a escanear sensores y destinos.

### 8.6 Tarjetas de reglas

Cada regla debe mostrar:

- nombre;
- sensor y nombre visible;
- condición resumida;
- valor actual con unidad real;
- política de avisos;
- aviso de recuperación sí/no;
- destinatarios actuales;
- estado habilitada/deshabilitada;
- estado runtime;
- último error;
- botones editar y eliminar;
- switch de habilitación.

Estados visuales derivados, en este orden:

```text
enabled=false         → disabled
runtime.sending       → sending
runtime.retry_at      → retry
runtime.active        → alert
runtime.pending       → pending
otro                  → normal
```

Textos requeridos:

- `disabled`: “Deshabilitada”.
- `sending`: “Enviando alerta…” o “Enviando recordatorio…”.
- `retry`: “Error de envío · reintento mm:ss”.
- `active`: “Alerta activa” y, si existe, “recordatorio mm:ss”.
- `pending`: “Temporizando mm:ss”.
- `normal`: “En espera”.

Eliminar el botón “Probar” de las tarjetas de reglas. El backend actual solo prueba un destino individual. Las pruebas deben vivir en la pestaña Dispositivos. Si en el futuro se quiere probar una regla completa, debe añadirse un comando backend específico y claramente distinto.

### 8.7 Editor de reglas en cuatro pasos

#### Paso 1 — Sensor

- Selector de sensores devueltos por `sensors/list`.
- `preferred_sensors` aparecen primero y con el nombre configurado.
- Mostrar área, dispositivo, `entity_id`, valor, unidad y disponibilidad.
- Al crear, sugerir el nombre `Temperatura · <sensor>`.

#### Paso 2 — Condición y comportamiento

Campos:

- tipo: `above`, `below`, `outside`, `inside`;
- umbral para above/below;
- límite inferior y superior para rangos;
- duración en minutos, convertida a `for_seconds`;
- histéresis;
- frecuencia: once/repeat/daily;
- intervalo de repetición en minutos cuando corresponda;
- aviso de recuperación.

Mostrar una explicación en lenguaje natural y ayudas para:

- duración;
- histéresis;
- frecuencia;
- recuperación.

#### Paso 3 — Destinatarios

- Lista de todos los destinos descubiertos.
- Checkbox múltiple.
- Mostrar alias, nombre HA, endpoint, disponibilidad y metadatos.
- Identificar por `target_id`/`identity_keys`, nunca solo por texto visible.
- Al editar una regla con destino obsoleto, mostrarlo como “Requiere reselección”.
- No permitir guardar hasta seleccionar al menos un destino actual.

Esta pantalla es la reparación requerida para los 361 errores de identidad encontrados.

#### Paso 4 — Mensaje

Campos:

- nombre interno de la regla;
- título;
- cuerpo;
- activar regla al guardar.

Variables admitidas:

- `{value}`;
- `{unit}`;
- `{sensor}`;
- `{area}`;
- `{threshold}`;
- `{lower}`;
- `{upper}`;
- `{time}`;
- `{rule}`;
- `{entity_id}`.

Mostrar vista previa con el valor real del sensor cuando esté disponible.

Como mejora sobre el clásico, exponer opcionalmente `recovery_title` y `recovery_body` dentro de un acordeón “Mensaje de recuperación”. El backend ya soporta ambos campos. Si se dejan vacíos, conservar los valores por defecto del motor.

### 8.8 Validación del frontend

Validar antes de enviar, sin sustituir la validación backend:

- sensor obligatorio y `sensor.*`;
- nombre obligatorio, máximo 120;
- título máximo 240;
- cuerpo obligatorio, máximo 2000;
- duración entre 0 y 86 400 segundos;
- histéresis entre 0 y 50;
- inferior menor a superior;
- en `outside`, `hysteresis * 2 < upper - lower`;
- al menos un destinatario y máximo 25;
- `repeat` con intervalo entre 60 y 604 800 segundos.

Al fallar, volver al paso exacto que contiene el error y mantener todos los datos escritos.

### 8.9 Normalización antes de guardar

El payload debe conservar:

```ts
{
  name,
  enabled,
  source: { entity_id, display_name, area_name },
  condition: { type, threshold?, lower?, upper?, for_seconds, hysteresis },
  recipients: [{
    target_id,
    identity_keys,
    device_id,
    notify_entity_id,
    legacy_service,
    name,
    custom_name
  }],
  message: { title, body, recovery_title?, recovery_body? },
  behavior: { notification_mode, reminder_interval_seconds, notify_recovery }
}
```

No eliminar `target_id` ni `identity_keys`. El panel clásico 1.0.7 los seleccionaba, aunque su `_normalizedDraft()` terminaba enviando un subconjunto antiguo. La implementación nueva debe conservar la identidad completa que el backend ya sabe validar y resolver.

### 8.10 Dispositivos

Cada tarjeta debe mostrar:

- nombre amigable;
- nombre actual de HA si existe alias;
- disponible/no disponible;
- fabricante y modelo;
- firmware;
- área;
- Notify Entity;
- acción heredada cuando exista;
- botón Enviar prueba;
- botón Cambiar nombre amigable.

El diálogo de alias debe:

- limitar a 80 caracteres;
- explicar que no cambia Home Assistant;
- guardar mediante `targets/alias/set` con `target_id`;
- permitir restaurar nombre HA con alias vacío;
- no cerrar si el backend devuelve error;
- refrescar destinos y reglas después de guardar.

### 8.11 Historial

No truncar visualmente a 12 sin indicarlo. Implementar inicialmente:

- carga de 150 eventos;
- filtro por tipo: todos, alerta, recordatorio, recuperación, prueba;
- filtro por estado: todos, enviado, error;
- filtro por regla/destino mediante búsqueda local;
- contador visible “mostrando X de Y”; 
- paginación o “Cargar más” local en bloques de 50;
- timestamp formateado en `America/La_Paz`;
- tipo, regla, sensor, valor, destinatario, endpoint y error.

Los errores deben ser seleccionables/copiarse y no quedar ocultos en un texto genérico.

## 9. Contratos TypeScript mínimos

Crear tipos explícitos; no mantener `any[]`:

```ts
type NotificationMode = "once" | "repeat" | "daily";
type ConditionType = "above" | "below" | "outside" | "inside";

interface NotificationRuntime {
  active: boolean;
  pending: boolean;
  pending_since: string | null;
  pending_until: string | null;
  sending: boolean;
  last_sent: string | null;
  last_attempt: string | null;
  last_recovery: string | null;
  last_value: number | string | null;
  last_error: string | null;
  next_reminder_at: string | null;
  retry_at: string | null;
  retry_kind: "alert" | "reminder" | null;
}

interface NotificationRule {
  id: string;
  name: string;
  enabled: boolean;
  source: NotificationSource;
  condition: NotificationCondition;
  recipients: NotificationRecipient[];
  message: NotificationMessage;
  behavior: NotificationBehavior;
  runtime: NotificationRuntime;
  created_at: string;
  updated_at: string;
}
```

Definir también `NotificationSensor`, `NotificationTarget`, `NotificationHistoryEvent` y `NotificationRuleDraft`. Todo parser debe validar arrays y campos esenciales antes de renderizar.

## 10. Comandos WebSocket que debe usar la UI

| Operación | Comando |
|---|---|
| Listar reglas con runtime | `witmind_notifications/rules/list` |
| Crear | `witmind_notifications/rules/create` |
| Actualizar | `witmind_notifications/rules/update` |
| Eliminar | `witmind_notifications/rules/delete` |
| Activar/desactivar | `witmind_notifications/rules/toggle` |
| Sensores | `witmind_notifications/sensors/list` |
| Destinos | `witmind_notifications/targets/list` |
| Alias | `witmind_notifications/targets/alias/set` |
| Historial | `witmind_notifications/history/list` |
| Prueba individual | `witmind_notifications/test` |

Todos requieren administrador en el backend. La UI debe reflejarlo, pero nunca asumir que ocultar botones reemplaza la autorización del servidor.

## 11. Persistencia SQLite objetivo

### 11.1 Principio

`witmind_core` posee `/config/witmind/witmind.db`. `witmind_notifications` debe poseer la semántica de notificaciones, pero utilizar una conexión/repository proporcionada por `witmind_core`.

No abrir una segunda base diferente ni usar SQLite desde JavaScript. No ejecutar SQL en el event loop de Home Assistant; todas las operaciones deben pasar por `async_add_executor_job` y por un `asyncio.Lock` de escritura.

### 11.2 Dependencia

- Añadir `witmind_core` como dependencia de la integración `witmind_notifications`.
- Obtener explícitamente la instancia `WitmindDatabase` desde `hass.data["witmind_core"]`.
- No depender de atributos dinámicos no documentados. Crear un helper estable, por ejemplo `get_witmind_database(hass)`.
- Si SQLite no está disponible, fallar el modo SQLite con un error claro; no iniciar silenciosamente otro motor con Store.

### 11.3 Tablas propuestas

```sql
CREATE TABLE notification_rules (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  enabled INTEGER NOT NULL CHECK (enabled IN (0,1)),
  rule_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE notification_runtime (
  rule_id TEXT PRIMARY KEY
    REFERENCES notification_rules(id) ON DELETE CASCADE,
  runtime_schema INTEGER NOT NULL,
  runtime_json TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE notification_history (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TEXT NOT NULL,
  event_type TEXT NOT NULL,
  status TEXT NOT NULL,
  rule_id TEXT,
  rule_name TEXT,
  sensor_entity_id TEXT,
  sensor_name TEXT,
  value REAL,
  recipient TEXT,
  target TEXT,
  error TEXT
);

CREATE INDEX idx_notification_history_timestamp
  ON notification_history(timestamp DESC);
CREATE INDEX idx_notification_history_rule
  ON notification_history(rule_id, timestamp DESC);
CREATE INDEX idx_notification_history_status
  ON notification_history(status, timestamp DESC);

CREATE TABLE notification_device_aliases (
  target_id TEXT PRIMARY KEY,
  alias TEXT NOT NULL,
  identity_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_seen_at TEXT
);

CREATE TABLE notification_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

Guardar la regla completa y runtime como JSON preserva compatibilidad con el motor actual, mientras que las columnas principales permiten listar y diagnosticar. Validar JSON al entrar y al salir.

### 11.4 Adaptador compatible

Crear `home-assistant/custom_components/witmind_notifications/sqlite_store.py` con la misma interfaz pública que hoy consume el motor:

- `async_load()`;
- `async_save_now()`;
- `async_schedule_save()`;
- `list_rules()`;
- `get_rule()`;
- `set_rule()`;
- `delete_rule()`;
- `default_runtime()`;
- `get_runtime()`;
- `update_runtime()`;
- `list_rules_with_runtime()`;
- `add_history()`;
- `list_history()`;
- `decorate_targets()`;
- `set_device_alias()`;
- `decorate_rules_with_targets()`.

Mantener un cache en memoria cargado desde SQLite para que los getters síncronos del motor no bloqueen. Las mutaciones actualizan cache y se persisten por cola. Los CRUD iniciados por usuario deben esperar `async_save_now()` antes de confirmar éxito.

No refactorizar `NotificationRuleEngine` a métodos async de repositorio en la misma entrega. Ese cambio ampliaría innecesariamente el riesgo.

## 12. Migración Store → SQLite sin notificaciones duplicadas

### Fase 0 — Respaldo e inventario

- [ ] Congelar temporalmente creación/edición de reglas.
- [ ] Respaldar `.storage/witmind_notifications`, `witmind.db` y el componente completo.
- [ ] Registrar conteos: 2 reglas, 2 runtimes, 424 históricos y 3 aliases, ajustándolos al valor real del día del corte.
- [ ] Calcular hash canónico del Store.
- [ ] Identificar y corregir o deshabilitar reglas con destinatarios obsoletos.

### Fase 1 — Esquema y adaptador sin motor

- [ ] Crear tablas en SQLite.
- [ ] Implementar repositorio y pruebas.
- [ ] No instanciar un segundo `NotificationRuleEngine`.
- [ ] No suscribirse a sensores desde el migrador.
- [ ] No llamar `NotificationDispatcher` desde migración.

### Fase 2 — Preview de importación

- [ ] Leer Store mediante API de migración dedicada, no editar `.storage`.
- [ ] Validar reglas con `_normalize_rule` sin regenerar IDs.
- [ ] Preservar `created_at` y `updated_at`.
- [ ] Preservar todos los campos runtime, incluido `active`, pending/deadlines, `last_sent`, `next_reminder_at`, retry y error.
- [ ] Preservar historial en orden cronológico antiguo→nuevo.
- [ ] Preservar snapshots de identidad y aliases.
- [ ] Mostrar conflictos sin escribir.

### Fase 3 — Copia idempotente en sombra

- [ ] Importar dentro de una sola transacción.
- [ ] Guardar `legacy_import_hash`, fecha, conteos y `runtime_schema=2` en `notification_meta`.
- [ ] Segunda ejecución con mismo hash debe producir cero cambios.
- [ ] SQLite todavía no puede alimentar un motor ni enviar nada.

### Fase 4 — Corte atómico

- [ ] Detener Home Assistant.
- [ ] Cambiar una sola opción de backend de `store` a `sqlite`.
- [ ] No cargar simultáneamente `WitmindNotificationStore` y el adaptador SQLite como fuentes activas.
- [ ] Arrancar Home Assistant.
- [ ] Crear exactamente una instancia de `NotificationRuleEngine` con SQLite.
- [ ] Reconstruir una sola suscripción de sensores.
- [ ] Restaurar timers desde runtime persistido.
- [ ] El watchdog debe ejecutar cada deadline vencido como máximo una vez.

### Fase 5 — Estabilización

- [ ] Mantener `.storage/witmind_notifications` intacto pero inerte.
- [ ] Validar dos reinicios consecutivos.
- [ ] Confirmar que conteos, runtime e historial coinciden.
- [ ] Confirmar ausencia de dos alertas iguales por destinatario y episodio.
- [ ] Archivar Store solo después del período de observación.

## 13. Salvaguardas obligatorias contra duplicados

- Nunca iniciar dos `NotificationRuleEngine`.
- Nunca registrar dos listeners para el mismo conjunto de sensores.
- Nunca permitir que Store y SQLite acepten escrituras simultáneas.
- Cada deadline debe estar protegido por `_due_inflight`.
- Conservar `runtime.active`; perderlo durante el corte haría que una incidencia existente parezca nueva.
- Conservar `last_sent` y `next_reminder_at`; regenerarlos puede adelantar recordatorios.
- Conservar `retry_at` y `retry_kind`; no crear un reintento adicional.
- Un envío se considera exitoso solo después de que al menos un destinatario confirme.
- No marcar episodio activo antes de completar el primer envío exitoso.
- Las actualizaciones frontend no pueden disparar envíos; solo CRUD explícito cambia reglas.
- Pruebas manuales deben quedar con `event_type=test`, nunca `alert`.

## 14. Pruebas obligatorias del backend

### Condiciones

- [ ] `above`: activa en igualdad y recupera bajo umbral menos histéresis.
- [ ] `below`: activa en igualdad y recupera sobre umbral más histéresis.
- [ ] `outside`: ambos extremos y recuperación interior con histéresis.
- [ ] `inside`: rango inclusivo y recuperación exterior con histéresis.
- [ ] Sensor `unknown`, `unavailable`, vacío y no numérico.

### Temporización

- [ ] Condición se mantiene todo `for_seconds` y envía una vez.
- [ ] Condición se normaliza antes del vencimiento y cancela pending.
- [ ] Reinicio durante pending conserva deadline.
- [ ] Callback perdido es recuperado por watchdog una vez.

### Episodios y frecuencia

- [ ] `once`: un aviso por episodio.
- [ ] `repeat`: primer aviso inmediato tras “Durante”; recordatorios posteriores al intervalo.
- [ ] `daily`: siguiente recordatorio a 24 h.
- [ ] Recuperación opcional.
- [ ] Rearme automático solo al cruzar histéresis.
- [ ] Reinicio durante incidencia no duplica primer aviso.

### Entrega

- [ ] Múltiples destinatarios con éxito total.
- [ ] Éxito parcial registra errores pero mantiene episodio activo.
- [ ] Fallo total programa un reintento.
- [ ] Timeout de proveedor no deja `sending=true` permanentemente.
- [ ] Destino renombrado conserva identidad.
- [ ] Destino eliminado no se reasigna a otro equipo.
- [ ] Reselección desde UI repara identidad obsoleta.

### SQLite

- [ ] Importación idempotente.
- [ ] Foreign keys activas.
- [ ] WAL activo.
- [ ] Escrituras fuera del event loop.
- [ ] Eliminación de regla elimina su runtime, no su historial.
- [ ] Límite de historial se conserva.
- [ ] Recuperación tras interrupción de escritura.

## 15. Pruebas obligatorias del frontend

- [ ] Crear regla completa.
- [ ] Editar los cuatro pasos sin perder valores.
- [ ] Reemplazar destinatario obsoleto.
- [ ] Activar/desactivar con doble clic bloqueado.
- [ ] Confirmar/cancelar eliminación.
- [ ] Renombrar/restaurar nombre de dispositivo.
- [ ] Probar cada destino y mostrar resultado.
- [ ] Ver pending, alert, reminder y retry con countdown.
- [ ] Evento backend refresca sin multiplicar suscripciones.
- [ ] Modal conserva foco mientras cambia el sensor.
- [ ] Historial filtra 150 elementos correctamente.
- [ ] Usuario no administrador no puede mutar, incluso manipulando DOM.
- [ ] Desktop 1440 px.
- [ ] Tablet 1024/768 px.
- [ ] Smartphone 390 px.
- [ ] App Android dentro del iframe.
- [ ] Swipe del workspace no ejecuta accidentalmente botones.
- [ ] Clic de ratón sigue funcionando sin captura prematura.

Crear una prueba de navegador reproducible, por ejemplo:

- `tools/verify-notifications-panel.mjs`.

Debe simular reglas y runtime, contar suscripciones, abrir el editor, cambiar inputs, disparar actualizaciones de `hass` y comprobar que el contenido escrito permanece.

## 16. Secuencia de implementación para una IA más débil

La IA implementadora debe seguir este orden y no saltar pasos:

1. Leer completo este documento.
2. Leer completo `notifications-panel.js` clásico.
3. Leer completos `websocket.py`, `engine.py`, `storage.py`, `discovery.py` y `dispatcher.py`.
4. No editar todavía; escribir tipos a partir de los payloads reales.
5. Añadir pruebas unitarias del modelo.
6. Corregir lifecycle y suscripción en el panel actual.
7. Implementar pestañas y tarjetas de reglas.
8. Implementar editor de cuatro pasos.
9. Implementar dispositivos, alias y pruebas.
10. Implementar historial y filtros.
11. Ejecutar build y pruebas de navegador.
12. Probar contra backend Store actual.
13. Publicar una release solo de paridad mediante el proceso protegido de releases.
14. Observar funcionamiento y reparar destinatarios obsoletos.
15. Recién después implementar el adaptador SQLite.
16. Probar migración en sombra.
17. Ejecutar corte atómico en una release separada.

Si una etapa falla, detenerse y corregirla. No compensar un problema frontend modificando el motor ni compensar un problema de identidad enviando por nombre visible.

## 17. Archivos esperados en futuras entregas

### Paridad frontend

- `src/witmind-admin-panel.ts`
- `src/notifications-types.ts`
- `src/notifications-model.ts`
- `src/tests/unit/notifications-model.test.ts`
- `tools/verify-notifications-panel.mjs`

### Migración SQLite

- `home-assistant/custom_components/witmind_core/database.py`
- helper estable para obtener `WitmindDatabase`
- `home-assistant/custom_components/witmind_notifications/sqlite_store.py`
- `home-assistant/custom_components/witmind_notifications/migration.py`
- `home-assistant/custom_components/witmind_notifications/__init__.py`
- `home-assistant/custom_components/witmind_notifications/manifest.json`
- pruebas Python del repositorio, migración y reinicio de runtime

### No editar directamente

- releases compiladas dentro de `home-assistant/www/witmind-ui/releases/`;
- `current.json` fuera del proceso de release;
- `.storage/witmind_notifications`;
- `witmind.db` por Samba o mediante un editor externo.

## 18. Rollback

Si falla la paridad visual, volver únicamente a la release anterior del frontend; el backend no habrá cambiado.

Si falla el corte SQLite:

1. detener Home Assistant;
2. configurar nuevamente backend `store`;
3. asegurar que el adaptador SQLite queda inactivo;
4. restaurar `.storage/witmind_notifications` si fuese necesario;
5. iniciar Home Assistant;
6. comprobar que existe un solo motor;
7. comprobar runtime antes de permitir nuevas alertas;
8. no copiar eventos nuevos de SQLite hacia Store automáticamente durante el incidente.

Nunca dejar ambos backends activos como “respaldo en caliente”. Eso es precisamente lo que puede duplicar notificaciones.

## 19. Criterio de finalización

El trabajo estará completo cuando:

- la UI nueva iguale todas las capacidades relevantes del clásico;
- las dos reglas actuales puedan editarse y reparar destinatarios;
- los errores de identidad sean visibles y accionables;
- no existan listeners WebSocket duplicados;
- pending, alerta, recordatorio, recuperación y reintento se representen en vivo;
- la UI no pierda formularios por renders de HA;
- todas las pruebas desktop/tablet/móvil pasen;
- posteriormente, SQLite conserve reglas, runtime, aliases e historial;
- exista una sola instancia del motor antes y después del corte;
- dos reinicios consecutivos no causen alertas duplicadas;
- `.storage/witmind_notifications` quede inerte y documentado para rollback.

---

La prioridad operacional es recuperar primero la capacidad de **entender y reparar las reglas existentes**. La migración de persistencia solo debe comenzar cuando el panel pueda mostrar con precisión qué sensor vigila cada regla, qué condición aplica, a quién intenta avisar y por qué una entrega falló.
