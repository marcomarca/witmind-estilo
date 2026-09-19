# Plan de paridad y migración segura — Calendario Laboral Witmind a SQLite 3

**Estado del documento:** plan de implementación; no ejecuta cambios de código, configuración, datos ni despliegue.  
**Fecha de auditoría:** 2026-09-19 (America/La_Paz).  
**Ámbito:** Calendario Laboral, sus consumidores en Home Assistant, el panel unificado Witmind y su futura persistencia en SQLite 3.

## 1. Respuesta ejecutiva

La versión clásica **sí sigue funcionando y sigue siendo la lógica activa**. No fue reemplazada en el backend:

- `calendario_laboral:` continúa habilitado en `/config/configuration.yaml`.
- El componente `/config/custom_components/calendario_laboral/__init__.py` sigue creando y actualizando `binary_sensor.dia_no_laborable`.
- Los 15 feriados actuales siguen guardados en `/config/.storage/calendario_laboral`.
- El panel unificado actual todavía llama a `calendario_laboral/get`, `add`, `update` y `delete`; por tanto depende del backend clásico.
- Las automatizaciones y scripts reales consultan `binary_sensor.bloqueo_automatizaciones_laborales`, que a su vez depende de `binary_sensor.dia_no_laborable`.

Lo que cambió fue el frontend. La ruta activa `/calendario-laboral` carga `/local/witmind-ui-panel.js?v=0.6.2`; ya no carga directamente `calendario-laboral-panel.js`. Sin embargo, la nueva interfaz ofrece menos funciones que el panel clásico y continúa usando su API y su almacenamiento.

El archivo clásico que está en el respaldo y el que permanece en `/config/www/calendario-laboral-panel.js` son iguales byte por byte. El backend del respaldo y el instalado también son iguales. La versión clásica podría volver a mostrarse cambiando el `module_url`, pero **no debe hacerse como solución permanente** porque no resuelve la migración a SQLite ni la existencia de dos frontends.

`witmind_core` ya está habilitado y ya crea `/config/witmind/witmind.db`, pero actualmente solo proporciona tablas genéricas `kv` y `documents`. No implementa calendario, no migra los 15 feriados, no calcula días no laborables y no publica el sensor central. `witmind_notifications` tampoco sustituye al calendario: es otro subsistema, usa su propio Home Assistant `Store` y no debe convertirse en dueño de la lógica laboral.

## 2. Fuentes auditadas

### Instalación activa en Home Assistant

- `\\192.168.20.232\config\configuration.yaml`
- `\\192.168.20.232\config\automations.yaml`
- `\\192.168.20.232\config\scripts.yaml`
- `\\192.168.20.232\config\custom_components\calendario_laboral\__init__.py`
- `\\192.168.20.232\config\custom_components\calendario_laboral\README.md`
- `\\192.168.20.232\config\custom_components\witmind_notifications\`
- `\\192.168.20.232\config\custom_components\witmind_core\`
- `\\192.168.20.232\config\.storage\calendario_laboral` (solo lectura de diagnóstico)
- `\\192.168.20.232\config\witmind\witmind.db` (existencia y metadatos; no modificado)

### Versión clásica respaldada

- `C:\Users\witronix\Desktop\backup hoy final\www\calendario-laboral-panel.js`
- `C:\Users\witronix\Desktop\backup hoy final\custom_components\calendario_laboral\__init__.py`

### Versión actual del proyecto

- `src/witmind-admin-panel.ts`
- `home-assistant/custom_components/witmind_core/database.py`
- `home-assistant/custom_components/witmind_core/websocket.py`
- `home-assistant/www/witmind-ui-panel.js`
- `home-assistant/configuration.yaml.snippet.yaml`

## 3. Arquitectura real actual

```text
/calendario-laboral
        │
        ▼
witmind-ui-panel.js → app versionada → witmind-admin-panel.ts
        │
        │ WebSocket calendario_laboral/*
        ▼
custom_components/calendario_laboral
        │
        ├── Home Assistant Store: .storage/calendario_laboral
        ├── binary_sensor.dia_no_laborable
        └── evento calendario_laboral_updated
                    │
                    ▼
template binary_sensor.bloqueo_automatizaciones_laborales
        │
        ├── automation.taller_ciclo_10s
        ├── automation.witmind_bloqueo_laboral_apagado_seguro
        ├── automatización de límites de climatización
        └── scripts de reconciliación/inicio/recuperación de climatización
```

SQLite está al costado de este flujo, no dentro de él:

```text
custom_components/witmind_core → /config/witmind/witmind.db
                                ├── schema_meta
                                ├── kv
                                └── documents

No hay hoy tabla, repositorio, servicio, WebSocket, sensor ni migración de calendario.
```

## 4. Riesgo de duplicidad

El calendario clásico no enciende ni apaga equipos directamente. Su responsabilidad es calcular y publicar el estado laboral. Las acciones físicas se realizan desde automatizaciones y scripts consumidores.

El riesgo aparece si dos motores publican estados o eventos en paralelo:

1. El componente clásico escribe `binary_sensor.dia_no_laborable` desde `.storage`.
2. Un componente SQLite nuevo intenta escribir el mismo sensor o un segundo sensor equivalente.
3. El template `binary_sensor.bloqueo_automatizaciones_laborales` cambia de estado o se vuelve ambiguo.
4. La automatización `Witmind - Aplicar bloqueo laboral` puede reaccionar a transiciones repetidas y ejecutar otra vez el apagado seguro.
5. Otros consumidores pueden consultar fuentes diferentes y tomar decisiones contradictorias.

La regla de migración será: **un solo origen de verdad, un solo calculador activo y un solo escritor del sensor operacional**. La convivencia temporal solo se permitirá si el motor SQLite está en modo sombra, sin publicar el sensor ni disparar eventos operativos.

## 5. Comparación funcional: clásico 1.5.0 frente al panel unificado actual

| Capacidad | Panel clásico 1.5.0 | Panel actual unificado | Brecha |
|---|---:|---:|---|
| Listar feriados | Sí | Sí | Paridad básica |
| Crear feriado | Sí, modal y estado activo configurable | Sí, formulario en línea, siempre activo | Parcial |
| Editar fecha, nombre, descripción y estado | Sí | No | Falta crítica |
| Activar/desactivar | Sí, acción explícita | Sí, pero el texto del activo dice “Activo” en lugar de expresar claramente “Desactivar” | Mejorar UX |
| Eliminar con confirmación | Sí | No confirmación | Falta de seguridad |
| Deshacer eliminación | Sí, durante 8 segundos | No | Falta |
| Filtrar por año | Sí | No | Falta |
| Mostrar años disponibles | Sí, desde backend | No | Falta |
| Estado de hoy laboral/no laborable | Sí | No | Falta crítica operacional |
| Motivo del bloqueo | Sí | No | Falta crítica operacional |
| Próximo feriado activo | Sí | No | Falta |
| Estado de automatizaciones protegidas | Sí | No | Falta crítica de observabilidad |
| Diferenciar automatización operativa/deshabilitada/pausada | Sí | No | Falta |
| Restringir mutaciones a administradores en UI | Sí | Parcial; eliminar se oculta, pero el formulario de alta sigue visible | Inconsistencia |
| Validación de fecha/nombre antes de enviar | Sí | Solo validación HTML básica | Parcial |
| Preservar formulario/modal durante actualizaciones de `hass` | Sí | No hay modal; cada carga reconstruye todo el Shadow DOM | Riesgo de UX |
| Estado ocupado y prevención de doble envío | Sí | Parcial y no uniforme | Falta |
| Mensajes de éxito tipo toast | Sí | No | Falta |
| Error contextual dentro del formulario | Sí | Error general | Parcial |
| Refresco ante cambios del sensor central | Sí | No suscripción ni firma del sensor | Falta |
| Refresco por evento de calendario | Indirecto mediante estado/recarga | No se suscribe a `calendario_laboral_updated` | Falta |
| Tema claro/oscuro | Sí | Sí | Paridad |
| Diseño responsive | Sí | Sí, más simple | Debe verificarse |
| Menú lateral de Home Assistant | Sí | Sí | Paridad |
| CRUD WebSocket con `record_id` | Sí | Sí | Paridad de contrato clásico |
| Mostrar almacenamiento/origen | Backend lo informa; UI se centra en operación | No | Debe añadirse como diagnóstico, no como dato principal |

### Conclusión de paridad

La interfaz actual cubre el CRUD mínimo de alta, activación y borrado, pero perdió buena parte del comportamiento operacional y de seguridad de la clásica. Antes de retirar el frontend viejo, la nueva versión debe recuperar al menos: edición completa, estado del día, motivo, próximo feriado, filtro anual, automatizaciones protegidas, confirmación y deshacer eliminación, permisos coherentes, estados ocupados y actualización reactiva.

## 6. Capacidades del backend clásico que deben conservarse

La migración a SQLite no debe reducir estas garantías:

- Un registro contiene `id`, `date`, `name`, `description` y `active`.
- La fecha es ISO `YYYY-MM-DD` y debe ser una fecha válida.
- Nombre obligatorio, máximo 120 caracteres.
- Descripción máxima de 500 caracteres.
- Una sola entrada por fecha.
- IDs estables a través de reinicios y ediciones.
- Los registros se ordenan cronológicamente.
- Domingo siempre es no laborable.
- Domingo más feriado activo conserva ambos motivos.
- Un feriado inactivo no bloquea.
- Se calcula el próximo feriado activo.
- El estado se recalcula al iniciar, a medianoche y después de cada mutación.
- El sensor se actualiza inmediatamente tras alta, edición, activación, desactivación o eliminación.
- Las mutaciones requieren usuario administrador.
- `record_id` se usa para el registro; `id` queda reservado al protocolo WebSocket.
- Después de una mutación se emite un evento con operación, ID y fecha.
- Una carga inválida no puede reemplazar silenciosamente el calendario válido.

## 7. Semántica laboral que no debe cambiar durante la migración

Hay dos niveles distintos y deben seguir separados en la primera versión SQLite:

1. `binary_sensor.dia_no_laborable`:
   - `on` en domingo o feriado activo;
   - `off` en el resto de los días;
   - conserva atributos de fecha, motivo, domingo, feriado activo, cantidad activa y próximo feriado.
2. `binary_sensor.bloqueo_automatizaciones_laborales`:
   - incluye el sensor anterior;
   - añade sábado desde las 13:00.

No se trasladará el corte del sábado al calendario en la fase de paridad. Hacerlo simultáneamente alteraría comportamiento y dificultaría saber si un error viene de la migración de datos o de una nueva política.

## 8. Arquitectura objetivo con SQLite 3

El calendario debe convertirse en un dominio propio de `witmind_core`, no en una función de `witmind_notifications` ni en acceso SQL directo desde el navegador.

```text
Panel Witmind
    │ WebSocket allowlisted
    ▼
witmind_core.calendar_api
    │
    ├── CalendarService        validación y reglas de negocio
    ├── CalendarRepository     transacciones SQLite
    ├── CalendarStatePublisher único escritor del sensor
    └── CalendarMigration      importación idempotente desde Store
              │
              ▼
      /config/witmind/witmind.db
```

### Reglas arquitectónicas

- El navegador nunca abre SQLite ni recibe una ruta del sistema de archivos.
- Todo acceso pasa por WebSocket autenticado y allowlisted.
- Toda mutación requiere administrador en el backend, aunque la UI también oculte controles.
- Las reglas laborales viven en un servicio de dominio único.
- El repositorio usa transacciones; el sensor se recalcula solo después de confirmar la transacción.
- El evento de actualización se emite solo después del commit.
- La API devuelve una revisión monotónica para que el panel descarte respuestas antiguas.
- `witmind_notifications` puede consumir el evento o el sensor, pero no almacena ni calcula el calendario.
- El frontend unificado deja de llamar al componente clásico una vez finalizado el corte.

## 9. Esquema SQLite propuesto

No se recomienda guardar todo el calendario como un único JSON en `documents`. Para este dominio conviene una tabla normalizada con restricciones en base de datos.

```sql
CREATE TABLE work_calendar_holidays (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL UNIQUE
    CHECK (date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
  name TEXT NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 120),
  description TEXT NOT NULL DEFAULT '' CHECK (length(description) <= 500),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_work_calendar_active_date
  ON work_calendar_holidays(active, date);

CREATE TABLE work_calendar_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE work_calendar_audit (
  sequence INTEGER PRIMARY KEY AUTOINCREMENT,
  operation TEXT NOT NULL,
  record_id TEXT,
  record_date TEXT,
  actor_user_id TEXT,
  before_json TEXT,
  after_json TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

`work_calendar_meta` debe guardar como mínimo:

- `schema_version` del dominio.
- `revision` monotónica.
- `legacy_import_completed_at`.
- hash SHA-256 del conjunto importado.
- cantidad de registros importados.
- origen de migración.

La auditoría no sustituye los respaldos, pero permite comprobar quién cambió qué y reconstruir incidentes sin depender del historial visual.

## 10. Contrato WebSocket objetivo

### Lectura

- `witmind_calendar/get`
  - devuelve estado de hoy, motivo, próximo feriado, años, registros, revisión y modo del motor.
- `witmind_calendar/health`
  - devuelve esquema, conectividad, último refresco, dueño del sensor y estado de migración; no expone rutas sensibles.

### Mutaciones administrativas

- `witmind_calendar/add`
- `witmind_calendar/update`
- `witmind_calendar/delete`
- `witmind_calendar/import/preview`
- `witmind_calendar/import/commit`

Todas las mutaciones deben:

1. validar en backend;
2. abrir transacción;
3. escribir registro y auditoría;
4. incrementar revisión;
5. confirmar transacción;
6. recalcular el sensor;
7. emitir `witmind_calendar_updated`;
8. devolver el registro y el payload canónico.

Durante una ventana de compatibilidad posterior al corte, el nuevo backend puede registrar aliases `calendario_laboral/get|add|update|delete`. Esos aliases deben delegar al mismo servicio SQLite, nunca mantener una segunda implementación. Se retirarán cuando no exista ningún cliente antiguo.

## 11. Contrato estable del sensor

Para no modificar de golpe todas las automatizaciones, el backend SQLite debe asumir exactamente el mismo `entity_id`:

`binary_sensor.dia_no_laborable`

Debe conservar estos atributos:

- `friendly_name`
- `icon`
- `fecha`
- `motivo`
- `es_domingo`
- `feriado_activo`
- `feriados_activos`
- `proximo_feriado`
- `proximo_feriado_nombre`

Se pueden añadir atributos diagnósticos sin romper consumidores:

- `backend: sqlite`
- `revision`
- `last_evaluated_at`
- `database_schema_version`

No se creará un segundo sensor operacional durante el corte. Para modo sombra se utilizará un objeto diagnóstico interno o un sensor con nombre explícitamente no operacional que ninguna automatización consulte.

## 12. Plan de implementación por fases

### Fase 0 — Congelación e inventario

- [ ] Declarar una ventana de cambio sin ediciones de feriados.
- [ ] Respaldar `configuration.yaml`, `automations.yaml`, `scripts.yaml`, el componente clásico, `.storage/calendario_laboral` y `witmind.db`.
- [ ] Registrar conteo, IDs, fechas, estados activos y hash canónico de los 15 registros.
- [ ] Enumerar todos los consumidores de ambos sensores laborales.
- [ ] Confirmar que ninguna ruta manual de panel salta el bloqueo esperado.
- [ ] Documentar el estado previo del sensor y su motivo.

### Fase 1 — Repositorio SQLite sin autoridad operacional

- [ ] Añadir migración de esquema al `witmind_core` con tablas de calendario.
- [ ] Implementar `CalendarRepository` y pruebas de transacciones/restricciones.
- [ ] Implementar `CalendarService` con la semántica exacta del clásico.
- [ ] Mantener el publicador del sensor deshabilitado en modo sombra.
- [ ] No registrar aliases clásicos todavía.

### Fase 2 — Importación idempotente

- [ ] Leer `.storage/calendario_laboral` mediante una rutina explícita de migración, no mediante edición manual.
- [ ] Validar cada registro con las mismas reglas del backend clásico.
- [ ] Rechazar fechas duplicadas o inválidas antes de escribir.
- [ ] Mostrar una previsualización con altas, conflictos y descartes.
- [ ] Importar los 15 registros en una sola transacción.
- [ ] Guardar marca y hash de migración para que una segunda ejecución no duplique filas.
- [ ] Comparar orden, IDs, datos, activos, años y próximo feriado entre Store y SQLite.

### Fase 3 — Modo sombra y prueba de paridad

- [ ] Calcular en SQLite el estado del día sin publicarlo.
- [ ] Comparar durante al menos siete cambios de fecha simulados: laborable, domingo, feriado activo, feriado inactivo, domingo+feriado, fin de año y ausencia de próximos feriados.
- [ ] Probar explícitamente 2026-09-19 y el corte externo del sábado a las 13:00.
- [ ] Confirmar que ninguna acción física ni evento operacional proviene del modo sombra.
- [ ] Registrar discrepancias como fallo bloqueante.

### Fase 4 — Recuperación de la paridad del frontend

- [ ] Recuperar edición completa mediante modal estable.
- [ ] Recuperar alta con elección de estado activo.
- [ ] Recuperar confirmación y deshacer eliminación.
- [ ] Recuperar filtro por año.
- [ ] Mostrar estado de hoy, motivo y próximo feriado.
- [ ] Mostrar automatizaciones protegidas como observabilidad, aclarando que listarlas no implementa la protección.
- [ ] Ocultar o deshabilitar todas las mutaciones para no administradores.
- [ ] Añadir estados ocupado, error contextual y mensajes de éxito.
- [ ] Suscribirse una sola vez a `witmind_calendar_updated` y liberar la suscripción al desmontar.
- [ ] Evitar reconstruir el formulario activo por actualizaciones de `hass`.
- [ ] Mantener responsive desktop/tablet/smartphone y navegación del workspace.

### Fase 5 — Corte atómico de autoridad

- [ ] Confirmar respaldo restaurable y pruebas de paridad en verde.
- [ ] Detener Home Assistant dentro de la ventana de mantenimiento.
- [ ] Deshabilitar la entrada `calendario_laboral:` en `configuration.yaml`.
- [ ] Habilitar el módulo calendario SQLite de `witmind_core` como único publicador.
- [ ] Registrar aliases clásicos solo como adaptadores temporales al mismo servicio SQLite.
- [ ] Arrancar Home Assistant una sola vez.
- [ ] Verificar que existe un único dueño de `binary_sensor.dia_no_laborable`.
- [ ] Verificar que el sensor template mantiene la política del sábado.
- [ ] Verificar que no existe una segunda integración registrando los mismos comandos WebSocket.
- [ ] Promover el frontend que usa `witmind_calendar/*` solo después de validar el backend.

### Fase 6 — Validación operacional

- [ ] Alta, edición, activación, desactivación, eliminación y deshacer desde la UI.
- [ ] Cambio inmediato del sensor cuando se modifica el día actual.
- [ ] Persistencia tras reinicio de Home Assistant.
- [ ] Bloqueo de mutaciones para usuario no administrador.
- [ ] Unicidad por fecha y límites de texto.
- [ ] Evento único por commit.
- [ ] Una sola ejecución del apagado seguro ante transición `off → on`.
- [ ] Taller no inicia durante bloqueo.
- [ ] Climatización automática no inicia durante bloqueo.
- [ ] Acciones manuales que deban seguir permitidas conservan su autoridad.
- [ ] El panel funciona sin leer `.storage`.

### Fase 7 — Retiro controlado del legado

- [ ] Mantener `.storage/calendario_laboral` intacto y solo como respaldo durante un período acordado.
- [ ] Mantener el código clásico fuera de carga, pero disponible para rollback durante ese período.
- [ ] Eliminar aliases WebSocket clásicos solo cuando logs y búsquedas confirmen cero clientes.
- [ ] Archivar el JS clásico; no dejarlo referenciado por `module_url` ni `extra_module_url`.
- [ ] Corregir comentarios obsoletos de `configuration.yaml` que todavía describen el JS clásico como frontend activo.
- [ ] Retirar definitivamente el componente clásico solo después de dos reinicios y pruebas de calendario satisfactorias.

## 13. Mecanismos obligatorios contra duplicados

- El nuevo backend debe abortar el modo activo si detecta `calendario_laboral` cargado en `hass.data`.
- El componente clásico y el nuevo no pueden registrar simultáneamente el mismo comando WebSocket.
- Solo un componente puede escribir `binary_sensor.dia_no_laborable`.
- La importación debe tener una clave idempotente y hash de origen.
- `date` debe ser `UNIQUE` en SQLite.
- Cada mutación debe aceptar opcionalmente `expected_revision`; una revisión vieja debe devolver conflicto, no sobrescribir.
- El frontend debe bloquear doble clic mientras una mutación está pendiente.
- El evento se emite después del commit, nunca antes.
- Las automatizaciones de apagado deben seguir siendo idempotentes y tener trazas verificables.
- No se duplicará la lista de feriados en YAML, JavaScript ni constantes de dos backends.

## 14. Pruebas de aceptación mínimas

### Datos y persistencia

- [ ] 15 de 15 registros migrados inicialmente.
- [ ] Mismos IDs, fechas, nombres, descripciones y estados.
- [ ] Segunda importación: 0 altas, 0 duplicados, mismo hash.
- [ ] Reinicio: mismos registros y revisión coherente.
- [ ] WAL, integridad SQLite y transacciones comprobadas.

### Reglas de calendario

- [ ] Lunes normal: sensor `off`, motivo “Día laboral”.
- [ ] Domingo sin feriado: sensor `on`, motivo “Domingo”.
- [ ] Feriado activo: sensor `on`, nombre correcto.
- [ ] Feriado inactivo: no bloquea.
- [ ] Domingo con feriado: motivo combinado.
- [ ] Próximo feriado ignora inactivos y fechas pasadas.
- [ ] Zona horaria de La Paz no cambia el día por UTC.
- [ ] Refresco a medianoche exactamente una vez.

### Consumidores

- [ ] `binary_sensor.bloqueo_automatizaciones_laborales` conserva el corte del sábado 13:00.
- [ ] `automation.taller_ciclo_10s` queda bloqueada.
- [ ] `automation.witmind_bloqueo_laboral_apagado_seguro` ejecuta una vez la transición.
- [ ] Límites de climatización no arrancan bloqueados.
- [ ] Scripts de reconciliación, inicio y recuperación respetan el sensor.

### Frontend

- [ ] Paridad funcional completa con el clásico.
- [ ] Accesibilidad de teclado y foco estable en modal.
- [ ] Sin pérdida de datos al actualizar estados de HA.
- [ ] Sin doble envío.
- [ ] Estados de error recuperables.
- [ ] Desktop, tablet y smartphone.
- [ ] El bridge conserva sus contratos de tags y cache-busting.

## 15. Estrategia de rollback

El rollback debe poder ejecutarse sin convertir SQLite de regreso a Store durante el incidente:

1. detener Home Assistant;
2. restaurar la configuración que habilita `calendario_laboral:`;
3. deshabilitar el publicador de calendario en `witmind_core`;
4. conservar o restaurar el `.storage/calendario_laboral` respaldado;
5. arrancar Home Assistant;
6. comprobar `binary_sensor.dia_no_laborable` y el sensor de bloqueo;
7. volver temporalmente al frontend clásico solo si el panel unificado no puede usar los aliases clásicos.

Nunca deben quedar ambos publicadores activos “mientras se investiga”. Si el corte falla, se vuelve al clásico como unidad completa.

## 16. Archivos previstos para una implementación futura

### Nuevos o ampliados en el proyecto

- `home-assistant/custom_components/witmind_core/calendar_repository.py`
- `home-assistant/custom_components/witmind_core/calendar_service.py`
- `home-assistant/custom_components/witmind_core/calendar_websocket.py`
- `home-assistant/custom_components/witmind_core/calendar_migration.py`
- `home-assistant/custom_components/witmind_core/database.py`
- `home-assistant/custom_components/witmind_core/__init__.py`
- `src/witmind-admin-panel.ts`
- pruebas unitarias Python del dominio y repositorio
- pruebas del contrato WebSocket
- pruebas de paridad del frontend
- herramienta de auditoría/migración en modo preview

### Configuración de Home Assistant durante el corte

- `/config/configuration.yaml`
- posiblemente comentarios/documentación de `automations.yaml` y `scripts.yaml`, sin cambiar sus entidades durante la fase de paridad

### Elementos que no deben editarse como método normal

- `/config/.storage/calendario_laboral`
- la base SQLite a mano por Samba
- archivos del Core oficial de Home Assistant

## 17. Decisiones explícitas

1. SQLite será la fuente única de datos después del corte.
2. `witmind_core` será dueño del dominio calendario.
3. `witmind_notifications` seguirá separado; una migración propia desde Store sería otro proyecto.
4. El sensor `binary_sensor.dia_no_laborable` conservará nombre y atributos por compatibilidad.
5. El sábado 13:00 seguirá en el sensor template durante la migración inicial.
6. No habrá dos motores operacionales en paralelo.
7. El modo sombra nunca ejecutará acciones ni publicará el sensor real.
8. La UI recuperará todas las funciones del panel clásico antes de retirar el legado.
9. El archivo `.storage` no se borrará durante la estabilización; quedará como respaldo inerte.
10. Un reinicio de Home Assistant será necesario únicamente en la futura fase de corte porque cambia código Python y carga de integraciones; este documento no realiza ese reinicio.

## 18. Criterio de finalización

La migración solo se considerará completa cuando:

- SQLite sea la única fuente activa;
- exista un único publicador del sensor;
- los 15 registros hayan sido migrados y verificados;
- el comportamiento laboral sea idéntico al clásico;
- la UI nueva iguale o supere todas las funciones listadas;
- los consumidores reales hayan pasado pruebas de bloqueo y continuidad;
- dos reinicios consecutivos mantengan datos y estado correctos;
- el componente clásico esté fuera de carga y documentado para rollback;
- no haya referencias activas al JS clásico ni clientes de los comandos antiguos.

---

Este plan separa deliberadamente tres trabajos: **paridad funcional**, **migración de persistencia** y **corte operacional**. Mezclarlos en una sola publicación impediría determinar si una falla proviene de la interfaz, de los datos o de la lógica que protege el edificio.
