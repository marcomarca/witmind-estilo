# Plan estricto de corrección — Grabación, Calendario laboral y Control general

## Objetivo

Llevar estos tres paneles al mismo contrato visual y funcional de Showroom/Lobby, sin perder entidades reales ni acciones existentes.

## Fase 0 — Auditoría y respaldo

- [x] Leer la implementación actual de `witmind-operations-panel.ts` y `witmind-admin-panel.ts`.
- [x] Leer `custom_components/calendario_laboral` directamente desde Home Assistant.
- [x] Identificar formato real de fechas, campos, servicios y endpoints.
- [x] Respaldar `configuration.yaml`, `current.json` y cualquier archivo remoto que vaya a modificarse.
- [x] Registrar la versión estable antes de editar (`0.4.8`).

## Fase 1 — Sala de grabación

- [x] Comparar la estructura contra las vistas Iluminación de Showroom.
- [x] Reutilizar el patrón de encabezado, superficie, tarjetas de circuitos e interruptor.
- [x] Mantener exactamente los cuatro circuitos reales y sus potencias: 24 W, 96 W, 50 W y 30 W.
- [x] Mantener `Apagar todo` con confirmación/estado pendiente visible.
- [x] Verificar estados `on`, `off`, `unavailable`, `pending` y error sin recargar la página mediante el flujo de estado existente.
- [x] Verificar tema claro y oscuro mediante tokens compartidos y release compilada.

## Fase 2 — Calendario laboral

- [x] Mapear los registros pregrabados del componente real a la interfaz nueva (`holidays`).
- [x] Normalizar fechas sin desplazar el día por zona horaria (`America/La_Paz`, mediodía local).
- [x] Mostrar nombre, fecha y descripción en tarjetas consistentes con Showroom.
- [x] Mantener alta, actualización, eliminación y recarga si el componente ya las ofrece.
- [x] Mostrar estados vacíos, error y carga con feedback visible.
- [x] Verificar que las fechas pregrabadas aparecen al entrar, sin pulsar Actualizar, corrigiendo la clave de respuesta.

## Fase 3 — Control general

- [x] Reemplazar la cuadrícula comprimida por tarjetas de acción legibles.
- [x] Copiar el patrón de botones de acciones rápidas de Showroom.
- [x] Separar acciones normales y acciones protegidas.
- [x] Mostrar estado de ejecución sin deformar el texto.
- [x] Mantener confirmación para apagado total.
- [x] Verificar resumen real por zona y potencia total en el modelo de datos.
- [x] Verificar tema claro/oscuro y responsive con reglas desktop/tablet/móvil.

## Fase 4 — Verificación obligatoria

- [x] `npx tsc --noEmit` (`tsc_exit=0`).
- [x] `npm test` (7 pruebas, 2 archivos).
- [x] `node --check home-assistant/www/witmind-ui-panel.js` (`node_exit=0`).
- [x] Build de panel y release inmutable `0.4.10`.
- [x] HTTP 200 de `current.json` y `releases/0.4.10/index.html`.
- [ ] Prueba visual local de cada panel en navegador (pendiente de sesión del usuario).
- [ ] Prueba visual en Home Assistant con Ctrl+F5 (pendiente de sesión del usuario).
- [ ] Revisar consola del navegador después de recarga dura (pendiente de sesión del usuario).
- [x] Crear backup antes de promover: `\\192.168.20.232\config\backups\strict-audit-0.4.10-20260918-005945`.
- [x] Promover solo después de compilación, tests y HTTP correctos.

## Criterio de cierre

No se considera terminado si una fecha pregrabada no aparece, si un panel carga solo una vista genérica, si una acción rompe el layout, si el tema claro/oscuro diverge, o si existe un error de consola sin explicación.

## Hallazgo del calendario

El almacenamiento real de Home Assistant contiene 15 registros para 2026. La integración los devuelve bajo la clave `holidays`; el panel buscaba únicamente `records`, `items` y `events`, por lo que mostraba `0 registros` aunque el backend estuviera correcto. La corrección está en el adaptador del panel y no modifica `.storage/calendario_laboral`.

Fechas verificadas: 01/01 Año Nuevo, 02/01 Feriado adicional de Año Nuevo, 23/01 Estado Plurinacional trasladado, 16/02 y 17/02 Carnaval, 03/04 Viernes Santo, 01/05 Día del Trabajo, 04/06 Corpus Christi, 05/06 Feriado adicional, 22/06 Año Nuevo Andino trasladado, 16/07 Aniversario de La Paz, 06/08 Independencia de Bolivia, 07/08 Feriado adicional, 02/11 Todos los Difuntos y 25/12 Navidad.

## Registro de revisión

| Versión | Grabación | Calendario | Control | Tests | HA | Estado |
|---|---|---|---|---|---|---|
| 0.4.10 | ✓ | ✓ | ✓ | ✓ | ✓ | Lista para validación visual en HA |
