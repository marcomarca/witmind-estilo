# Migración de paneles Home Assistant a Witmind Next

Guía operativa para que nuevos desarrolladores conviertan paneles antiguos de Home Assistant en vistas del sistema Witmind Signature sin romper los paneles existentes.

## Estado actual

La instalación paralela vigente en Home Assistant es `Witmind Next`.

| Recurso | Ubicación actual |
| --- | --- |
| Panel bridge | `/config/www/witmind-ui-panel.js` |
| Aplicación estable | `/config/www/witmind-ui/current.json` |
| Release activa | `0.1.6` |
| Releases conservadas | `0.1.0`, `0.1.1`, `0.1.2`, `0.1.3`, `0.1.4`, `0.1.5`, `0.1.6` y la antigua `1.0.0` |
| Integración SQLite | `/config/custom_components/witmind_core/` |
| Base de datos | `/config/witmind/witmind.db` |
| Puerto DEV | `192.168.20.44:5174` |
| Puerto 3D existente | `192.168.20.44:5173` — no tocar |

La aplicación nueva no reemplaza todavía `witmind-panel`, `showroom-3d-panel`, `showroom-v2-panel` ni los demás paneles. Se migra uno por uno y cada versión se publica como una release inmutable.

La release `0.1.3` añade el panel paralelo `Witmind Lobby`. Reutiliza la UI del showroom con `panel_kind: lobby`, las cuatro entidades reales del Lobby y las escenas `Visita`/`Regular`. Su energía usa temporalmente `sensor.showroom_energia_estimada`, que es la estimación global existente; no se inventan potencias para los circuitos del Lobby. Las releases `0.1.4`/`0.1.5` añaden el proxy persistente de `weather/subscribe_forecast`; la `0.1.6` conecta la hamburguesa visual con el evento oficial `hass-toggle-menu` de Home Assistant.

## Principios que no se deben romper

- Home Assistant es la fuente de verdad de estados y servicios.
- El iframe nunca recibe el objeto completo `hass` ni accede a SQLite.
- Solo `witmind-ui-panel.js` conoce directamente `hass` y `hass.connection`.
- El frontend usa `PostMessageHaClient`; el mock solo se usa en laboratorio y tests.
- No usar `.storage` para datos de Witmind. La persistencia vive en `/config/witmind/witmind.db`.
- No crear SQLite local en el PC ni abrir la base por Samba durante el uso normal.
- No sobrescribir una release publicada.
- `current.json` se cambia únicamente durante `promote` o `rollback`, nunca durante el build/release.
- No crear un segundo bloque raíz `panel_custom:` en `configuration.yaml`.
- El panel 3D y su puerto `5173` quedan fuera del alcance de esta migración.

## Mapa del repositorio

```text
src/showroom-panel.js                 Panel visual operativo actual
src/witmind-app.ts                    Entrada del iframe y adaptador de compatibilidad
src/ha/WitmindHaClient.ts              Contrato postMessage + MockHaClient
witmind-ui.html                       Entrada Vite de la aplicación aislada
home-assistant/www/witmind-ui-panel.js Bridge estable cargado por Home Assistant
home-assistant/custom_components/
  witmind_core/                        WebSocket y SQLite del lado HA
home-assistant/www/witmind-ui/
  current.json                         Puntero de release estable
  releases/<version>/                  Assets inmutables
tools/release.ps1                      Build y copia de una release nueva
tools/promote.ps1                      Cambio explícito de current.json
tools/rollback.ps1                     Alias seguro de promote para rollback
skills/witmind-ui/SKILL.md             Reglas de diseño y composición
skills/witmind-ui/PATTERNS.md          Patrones reutilizables del proyecto
docs/WITMIND_VISUAL_CONTRACT.md        Métricas visuales medidas
```

## Arquitectura de runtime

```text
Home Assistant
  └─ panel_custom: witmind-ui-panel
       └─ /local/witmind-ui-panel.js
            └─ iframe STABLE/DEV/PREVIEW
                 └─ witmind-ui.html
                      └─ witmind-app.ts
                           └─ PostMessageHaClient
                                └─ showroom-panel / futura vista migrada
```

### Modos del bridge

- `STABLE`: lee `/local/witmind-ui/current.json` con `cache: no-store` y carga `releases/<version>/index.html`.
- `DEV`: usa `witmind_ui_dev_url` de `localStorage`, hace probe y espera `WITMIND_READY` durante aproximadamente cuatro segundos. Si falla, vuelve a STABLE.
- `PREVIEW`: usa `witmind_ui_preview_version` de `localStorage` sin cambiar `current.json`.

Claves de navegador reservadas:

```text
witmind_ui_mode
witmind_ui_dev_url
witmind_ui_preview_version
```

## Flujo de entidades y acciones

La aplicación envía una suscripción selectiva:

```js
{
  source: "witmind-ui",
  protocol: 1,
  type: "WITMIND_SUBSCRIBE_ENTITIES",
  entityIds: ["switch.ejemplo", "sensor.energia"]
}
```

El bridge conserva un `Set` de entidades y responde solo con cambios:

```js
{
  source: "witmind-ha",
  protocol: 1,
  type: "WITMIND_ENTITY_UPDATE",
  states: { "switch.ejemplo": { entity_id: "switch.ejemplo", state: "on" } },
  removed: []
}
```

Para servicios:

```js
client.callService("switch.turn_on", { entity_id: "switch.ejemplo" });
```

El bridge traduce esto a `hass.callService(domain, service, data, target)` y devuelve `WITMIND_SERVICE_RESULT` con `requestId`, `ok`, `result` o `error`.

Para WebSocket de Home Assistant solo se permiten comandos explícitos, actualmente:

```text
weather/subscribe_forecast
recorder/get_statistics_metadata
recorder/statistics_during_period
```

Para persistencia se usa `WITMIND_DB_REQUEST` con comandos allowlist:

```text
witmind_core/ping
witmind_core/db/info
witmind_core/kv/get
witmind_core/kv/set
witmind_core/kv/delete
witmind_core/kv/list
witmind_core/doc/get
witmind_core/doc/upsert
witmind_core/doc/delete
witmind_core/doc/list
```

No añadir SQL ni comandos arbitrarios al bridge.

## Patrón de control robusto

Al migrar un interruptor, escena o script, conservar este patrón:

1. Leer el estado desde `hass.states` adaptado por `PostMessageHaClient`.
2. Rechazar `unknown`, `unavailable` o entidades inexistentes antes de actuar.
3. Marcar la entidad como pendiente con el estado esperado.
4. Ejecutar el servicio con `callService`.
5. Reflejar feedback visual inmediato (`Encendiendo…`, `Apagando…`).
6. Esperar el evento de estado o volver a consultar `get_states`.
7. Confirmar el estado esperado dentro de un timeout.
8. Limpiar pendiente y mostrar error accionable si no se confirma.

Para escenas y control general:

- agrupar entidades por dominio (`switch`, `light`, `script`, etc.);
- ejecutar primero la escena/script configurada;
- aplicar control directo como fallback si falla;
- verificar todos los estados esperados;
- nunca asumir que una llamada exitosa implica que el hardware cambió.

El patrón ya está implementado en `src/showroom-panel.js` mediante `_trackedEntities`, `_liveStates`, `_pendingSwitches`, `_switchErrors`, `_waitForExpectedStates` y `_setEntitiesState`. Reutilizarlo antes de crear otra variante.

## Cómo migrar un panel antiguo

### 1. Auditar el panel actual

Antes de editar:

- localizar el archivo remoto en `/config/www`;
- identificar el nombre del custom element y su entrada `panel_custom`;
- listar entidades leídas;
- listar servicios ejecutados;
- localizar `subscribeEvents`, `subscribeMessage`, `sendMessagePromise`, `callWS` y `callApi`;
- anotar configuración específica del panel;
- comprobar si otro panel usa los mismos servicios.

La versión antigua es una referencia de comportamiento, no una fuente para copiar monolitos a Home Assistant.

### 2. Extraer configuración, no IDs al design system

Los IDs de entidades deben vivir en la configuración del panel o en su módulo de vista:

```yaml
config:
  entities:
    - switch.salon
  energy_sensor: sensor.energia
```

El design system solo define superficies, botones, estados, tipografía y layout. No debe conocer `switch.salon` ni otros IDs concretos.

### 3. Crear la vista en el repositorio

Preferir una vista/módulo pequeño dentro de `src/` y montarla desde `src/witmind-app.ts` o un router común. No meter la UI completa en `witmind-ui-panel.js`.

Para una migración incremental se puede usar un adaptador de compatibilidad como el actual: la vista recibe una forma mínima de `hass` creada desde `PostMessageHaClient`, pero no importa ni usa `hass` global directamente.

### 4. Aplicar Witmind Signature

Usar `skills/witmind-ui/SKILL.md`, `PATTERNS.md` y `docs/WITMIND_VISUAL_CONTRACT.md`:

- Petroleum Dark `#071118` y Porcelain Light `#f3f3ef` mediante tokens semánticos;
- naranja Witmind solo para acción activa, emisión de luz o foco seleccionado;
- Manrope Variable y numerales tabulares;
- tarjetas de `22px`, controles de `44px` o más;
- geometría idéntica entre dark/light;
- máximo un KPI principal por tarjeta;
- estados vacíos y no disponibles explícitos, sin `undefined` ni `NaN`.

### 5. Probar primero con mock

El mock debe probar render, cambios de estado, acciones y errores sin fingir producción. No añadir rutas de mock al release que se ejecutará dentro de Home Assistant.

### 6. Compilar una release

Desde el repositorio:

```powershell
node_modules/.bin/vite.cmd build --mode panel
```

El build genera `dist-panel/witmind-ui.html` y assets relativos. Para el flujo normal:

```powershell
.\tools\release.ps1 -Version 0.2.0
```

El script:

- rechaza una carpeta de release existente;
- valida TypeScript;
- ejecuta Vite en modo panel;
- crea `releases/0.2.0`;
- copia `index.html` y `assets/`;
- no modifica `current.json`.

### 7. Publicar por Samba con backup

Antes de modificar `/config`:

1. Crear una carpeta fechada en `/config/backups/witmind-next-YYYYMMDD-HHMMSS`.
2. Copiar `configuration.yaml` allí.
3. Copiar el `current.json` actual allí antes de promover.
4. Confirmar que `releases/<version>` no exista.
5. Copiar solo archivos nuevos o la release nueva.
6. Comparar hashes SHA-256 local/remoto.
7. Editar `configuration.yaml` al final.

Rutas actuales del recurso:

```text
\\192.168.20.232\config\configuration.yaml
\\192.168.20.232\config\www\witmind-ui-panel.js
\\192.168.20.232\config\www\witmind-ui\current.json
\\192.168.20.232\config\www\witmind-ui\releases\<version>\
\\192.168.20.232\config\custom_components\witmind_core\
```

El bloque se añade dentro del `panel_custom:` existente:

```yaml
- name: witmind-ui-panel
  url_path: witmind-next
  sidebar_title: Witmind Next
  sidebar_icon: mdi:view-dashboard-variant
  module_url: /local/witmind-ui-panel.js?v=0.1.1
  require_admin: false
  config:
    app_base: /local/witmind-ui
    dev_url: http://192.168.20.44:5174/witmind-ui.html
    default_mode: stable
    fallback_release: 0.1.0
```

No usar `embed_iframe: true`: el propio custom element crea el iframe.

### 8. Promover o hacer rollback

Respaldar `current.json` y luego:

```powershell
.\tools\promote.ps1 -Version 0.2.0
.\tools\rollback.ps1 -Version 0.1.1
```

Promote/rollback solo cambian el puntero `current.json`; no borran releases antiguas y no requieren rebuild ni reinicio de Home Assistant.

## Reinicios y caché

Reiniciar Home Assistant cuando:

- se añade por primera vez `witmind_core:`;
- se añade o cambia el registro `panel_custom`;
- se modifica código Python.

No reiniciar por:

- HMR de DEV;
- publicar una release;
- cambiar `current.json`;
- PREVIEW, PROMOTE o ROLLBACK.

Si el navegador muestra un bridge antiguo, aumentar el query string de `module_url`, por ejemplo `v=0.1.2`, y hacer `Ctrl + F5`.

## Checklist de pruebas

### Build local

```powershell
node_modules/.bin/vitest.cmd run
node_modules/.bin/vite.cmd build --mode panel
```

También comprobar:

```powershell
node --check home-assistant/www/witmind-ui-panel.js
node --check src/showroom-panel.js
```

### Home Assistant

- [ ] La configuración YAML pasa la comprobación de Home Assistant.
- [ ] `Witmind Next` aparece en el sidebar.
- [ ] Network devuelve 200 para bridge, `current.json`, `index.html`, JS y CSS.
- [ ] La consola no contiene `_render is not a function` ni errores del iframe.
- [ ] Se recibe `WITMIND_READY` y `WITMIND_INIT`.
- [ ] Una entidad real aparece con su estado correcto.
- [ ] Un cambio físico se refleja sin recargar.
- [ ] Un servicio real no destructivo se ejecuta y devuelve resultado.
- [ ] Una escena confirma todos sus estados esperados.
- [ ] Energía carga al iniciar, sin depender de pulsar Refresh.
- [ ] `witmind_core/ping` responde.
- [ ] `kv/set` y `kv/get` funcionan.
- [ ] El valor persiste después de reiniciar Home Assistant.
- [ ] DEV funciona con HMR.
- [ ] Detener Vite vuelve a STABLE.
- [ ] PREVIEW carga una release no activa.
- [ ] PROMOTE y ROLLBACK cambian solo `current.json`.
- [ ] Los paneles antiguos y el 3D continúan funcionando.

## Diagnóstico rápido

### Pantalla blanca y `_render is not a function`

El bridge remoto es antiguo o está cacheado. Verificar `module_url`, subir su versión `?v=...`, reiniciar HA si cambió YAML y hacer recarga fuerte.

Desde el bridge `?v=0.1.5`, una pantalla blanca deja un diagnóstico visible después de ocho segundos y registra mensajes con el prefijo `[Witmind UI]` en la consola del navegador. El bridge también registra los alias `witmind-ui-panel` y `witmind-lobby-panel`; el segundo es obligatorio cuando la entrada `panel_custom` usa `name: witmind-lobby-panel`.

Si aparece la entrada en el sidebar pero el contenido queda completamente vacío, comprobar primero que el `name` de `panel_custom` tenga un custom element definido por el módulo. Un nombre sin alias registrado produce un panel blanco sin feedback.

Los estados posibles permiten separar rápidamente:

- `No se pudo leer current.json`: la ruta `app_base` no responde o la release activa no es válida.
- `Error cargando iframe`: Home Assistant no pudo abrir el HTML de la release.
- `WITMIND_READY no recibido`: el HTML abrió, pero su JavaScript o sus assets no arrancaron.
- `Bridge conectado`: el iframe ya está comunicando con el panel host y el problema restante está en entidades/servicios.

Comprobar directamente `http://<ha>/local/witmind-ui/current.json`, `.../releases/<version>/index.html` y los assets indicados por el HTML; todos deben responder `200`.

### “No existe sensor…” al iniciar energía

Comprobar que el sensor esté incluido en la suscripción y que el release sea `0.1.2` o posterior. El fix de `0.1.2` carga estadísticas inmediatamente cuando el estado aparece por primera vez.

### DEV no carga

Comprobar que Vite escuche en `0.0.0.0:5174`, que el firewall permita la red local y que la URL sea `/witmind-ui.html`. El bridge vuelve a STABLE después del probe/handshake fallido.

### Servicio falla o queda “Sin confirmación”

Revisar dominio/servicio, permisos del usuario, entidad `unavailable` y eventos `state_changed`. Una llamada aceptada por HA no garantiza feedback físico: la confirmación de estado es obligatoria.

### Rollback de emergencia

1. Ejecutar `rollback.ps1` a la última release conocida.
2. Si falla el registro del panel, restaurar el `configuration.yaml` desde el backup fechado.
3. Retirar solo `witmind_core`, `witmind-ui-panel.js` y la release nueva si es necesario.
4. No tocar las releases antiguas ni archivos de otros paneles.

## Regla para aportar cambios

Cada pull request de migración debe incluir:

- panel antiguo y entidades/servicios auditados;
- vista nueva y configuración YAML;
- estrategia de suscripción de entidades;
- pruebas de éxito, error y estado no disponible;
- captura dark/light si cambia la UI;
- versión de release propuesta;
- plan de rollback;
- confirmación de que no usa `.storage`, SQLite local, SQL directo ni el puerto `5173`.
