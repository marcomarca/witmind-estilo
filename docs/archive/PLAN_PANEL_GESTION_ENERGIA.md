# Plan estricto de implementación: panel Gestión de energía

## Objetivo

Crear un panel Home Assistant independiente llamado **Gestión de energía**, accesible desde el menú lateral y desde la navegación horizontal Witmind. Debe concentrar estimaciones de consumo, historial de uso por circuito, comparación por zona y una simulación de ahorro por dimerización entre 10 % y 90 %.

## Contrato visual

- Conservar Manrope, naranja Witmind `#f26522`, superficies, radios, espaciado, encabezado y controles de Showroom.
- Mantener tema claro y oscuro con los mismos tokens.
- Usar tarjetas solo para métricas y gráficas que necesiten separación funcional.
- No reconstruir toda la vista por cada cambio de entidad.
- Mantener feedback visible para carga, error, datos parciales y actualización.
- Adaptar la cuadrícula a escritorio, tablet y móvil sin desbordamiento horizontal de la página.

## Fuentes reales y límites

| Zona | Circuitos | Potencia nominal documentada |
|---|---:|---:|
| Showroom | 10 | 1.395 W conocidos en 9 circuitos; reflector pendiente |
| Oficinas | 7 | 789 W |
| Sala de grabación | 4 | 200 W |
| Lobby | 4 | Potencias no documentadas en la configuración actual |
| Edificio | 25 | 2.384 W conocidos en 20 circuitos |

No se asignarán valores inventados al reflector ni al Lobby. Esos circuitos sí aparecerán en la gráfica de tiempo de uso, pero el consumo y el ahorro solo incluirán circuitos con potencia nominal conocida. El componente aceptará potencias futuras desde configuración sin tener que rediseñarse.

## Modelo de cálculo

1. Solicitar el historial de estados de los 25 circuitos a Home Assistant.
2. Normalizar respuestas completas y compactas de `history/history_during_period`.
3. Convertir cada intervalo `on` en horas de uso.
4. Para circuitos con potencia conocida, calcular `kWh = W × horas / 1000`.
5. Agregar resultados por hora o día, circuito y zona.
6. Calcular potencia instantánea usando los estados actuales.
7. Calcular el ahorro por dimerización con un modelo lineal documentado: `ahorro = consumo base × porcentaje / 100`.
8. Mostrar por separado consumo restante y consumo ahorrado.

## Fases

### Fase 0: auditoría y seguridad

- [x] Auditar entidades, potencias y gráficos existentes.
- [x] Verificar que Home Assistant conserva historial de los switches.
- [x] Detectar potencias no documentadas y evitar supuestos.
- [x] Crear backup de `configuration.yaml`, bridge y `current.json` antes del despliegue.

### Fase 1: motor de energía

- [x] Crear tipos y funciones puras para normalizar historial.
- [x] Calcular horas, kWh, agregados por zona y buckets temporales.
- [x] Añadir pruebas unitarias de intervalos, cambio de bucket y circuitos sin potencia.
- [x] Validar redondeo y zona horaria `America/La_Paz`.

### Fase 2: panel visual

- [x] Crear `witmind-energy-panel` con encabezado Signature.
- [x] Añadir selectores 24 h, 7 días y 30 días.
- [x] Añadir KPIs de potencia actual, consumo del período, pico y cobertura.
- [x] Añadir gráfica temporal por zona.
- [x] Añadir gráfica de uso por circuito y período.
- [x] Añadir simulador de dimerización 10 % a 90 % con gráfica de línea.
- [x] Añadir estados de carga, error, parcial y vacío.
- [x] Verificar por código tema claro, oscuro, responsive y movimiento reducido.

### Fase 3: integración Witmind

- [x] Importar el componente en la aplicación.
- [x] Añadir Energía a la navegación horizontal.
- [x] Añadir alias de custom element al bridge.
- [x] Permitir el comando de historial de Home Assistant en el bridge.
- [x] Suscribir todas las entidades necesarias.

### Fase 4: Home Assistant

- [x] Registrar `witmind-energy-panel` en `panel_custom`.
- [x] Usar ruta `/witmind-energy` y título `Gestión de energía`.
- [x] Actualizar el cache-buster del bridge.
- [x] Validar estructura, indentación, unicidad de nombre y ruta de `configuration.yaml`.
- [ ] Ejecutar la comprobación nativa de configuración de Home Assistant tras recargar el servidor.
- [x] Reiniciar Home Assistant una sola vez después de validar; funcionamiento confirmado por el usuario.

### Fase 5: verificación y release

- [x] Ejecutar TypeScript sin errores.
- [x] Ejecutar todas las pruebas unitarias.
- [x] Validar sintaxis del bridge.
- [x] Generar release inmutable.
- [x] Verificar HTTP 200 de manifiesto, HTML y assets.
- [x] Confirmar que el bundle contiene el panel, historial y simulador.
- [x] Registrar release, backup y resultado final en este archivo.
- [x] Verificar visualmente el panel en una sesión autenticada después del reinicio; funcionamiento confirmado por el usuario.

## Criterios de aceptación

- El panel abre desde el menú lateral sin pantalla blanca.
- La hamburguesa abre el menú nativo de Home Assistant.
- La navegación horizontal puede entrar y salir de Energía.
- Las gráficas usan datos reales de historial cuando existen.
- Los circuitos sin potencia conocida no producen consumo falso.
- El slider muestra ahorro y consumo restante para 10 % a 90 %.
- No hay parpadeo completo al recibir cambios de estado.
- No hay errores en consola, rutas o custom elements.
- Tema claro y oscuro conservan contraste y geometría.

## Registro de ejecución

| Release | Motor | Panel | Bridge | HA | Tests | Estado |
|---|---|---|---|---|---|---|
| 0.5.0 | ☑ | ☑ | ☑ | ☑ Publicado | ☑ 10/10 | Funcionamiento autenticado confirmado |
| 0.5.1 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 15/15 + navegador | Gesto táctil bidireccional corregido |
| 0.5.2 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 15/15 + 588 px | Título de Showroom restaurado en tablet |
| 0.5.3 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 15/15 + 588/758 px | Cabeceras tablet de Oficinas, Grabación, Energía y Calendario unificadas |
| 0.5.4 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ HTTP extremo a extremo | Entrada `index.html` restaurada para el bridge |
| 0.5.5 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 15/15 + 4 auditorías responsive | Cabeceras de Control y Notificaciones unificadas |
| 0.5.6 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 15/15 + auditoría 758 px | Temperatura y humedad alineadas en las zonas de Oficinas |
| 0.5.7 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 17/17 + navegador móvil | Gesto bidireccional estabilizado ante `pointerup` móvil con coordenadas cero |
| 0.5.8 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 17/17 + bootstrap móvil | Inicialización única e idempotente desde cualquier entrada del sidebar |
| 0.5.9 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 17/17 + contador de renders | Un solo render inicial y cero renders por INIT duplicado |
| 0.5.10 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ bridge + móvil + HTTP | Bridge idempotente y cache-bust uniforme para Android |
| 0.5.11 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 17/17 + 389 px + HTTP | Marca y título de Lobby restaurados en smartphone |
| 0.5.12 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ 17/17 + touch real + HTTP | Gesto sobre tarjetas habilitado y acciones protegidas |
| 0.5.13 | ☑ | ☑ | ☑ | ☑ Promovido | ☑ touch-only + rerender + resize + HTTP | Gesto móvil desacoplado de Pointer Events y renders hijos |

### Evidencia de despliegue

- Backup: `\\192.168.20.232\config\backups\energy-panel-0.5.0-20260918-015326`
- Release inmutable: `\\192.168.20.232\config\www\witmind-ui\releases\0.5.0`
- Manifiesto estable: `0.5.0`
- HTTP: manifiesto `200`, HTML `200`, JavaScript `200`, CSS `200`, bridge `200`.
- Validación: TypeScript correcto, bridge correcto y 10 de 10 pruebas unitarias aprobadas.
- La comprobación nativa de configuración sigue siendo una validación operativa recomendable antes de futuros cambios en YAML.

### Corrección táctil 0.5.1

- Causa: `pointercancel` reutilizaba coordenadas finales inválidas, normalmente `clientX = 0`, y convertía ambos sentidos en avance al panel derecho.
- Solución: bloqueo explícito de eje, conservación de la última coordenada válida, cancelación sin navegación y separación entre desplazamiento vertical y gesto horizontal.
- Verificación en navegador: derecha abre el panel anterior, izquierda abre el siguiente, el gesto vertical conserva el panel y `pointercancel` no navega.
- Backup: `\\192.168.20.232\config\backups\swipe-fix-0.5.1-20260918-100608`.

### Corrección responsive de Showroom 0.5.2

- Causa: el breakpoint de contenedor `≤760 px` ocultaba explícitamente todo el bloque de título de la sala.
- Alcance: únicamente `panel_kind: showroom`; las demás vistas quedan sin cambios hasta su revisión individual.
- Resultado a 588 × 829 px: “Control operativo / Showroom” visible, navegación debajo y sin desbordamiento horizontal en temas claro y oscuro.
- Backup: `\\192.168.20.232\config\backups\showroom-tablet-title-0.5.2-20260918-101212`.

### Consistencia de cabeceras tablet 0.5.3

- Oficinas y Sala de grabación mantienen marca, reloj y tema en una sola fila, con título y resumen de circuitos siempre visibles.
- Gestión de energía apila el encabezado analítico y el selector de período a `≤760 px` sin ocultar el reloj.
- Calendario laboral usa la misma cabecera Witmind que Showroom y elimina la duplicación del título.
- Alcance deliberado: Notificaciones y Control general no se modificaron en esta release.
- Verificación visual: 588 × 829 px y 758 × 588 px, sin desbordamiento horizontal.
- Backup: `\\192.168.20.232\config\backups\tablet-header-consistency-0.5.3-20260918-104000`.

### Corrección de entrada del bridge 0.5.4

- Causa: el despliegue manual de `0.5.3` copió `dist-panel/witmind-ui.html` con su nombre de build, pero el contrato estable del bridge solicita `releases/<version>/index.html`.
- Solución: release inmutable nueva generada mediante `tools/release.ps1`, que renombra correctamente la entrada a `index.html`; no se modificó la release defectuosa.
- Verificación: `current.json`, `index.html`, JavaScript y CSS responden HTTP 200 desde `192.168.20.232:8123`.
- Backup: `\\192.168.20.232\config\backups\bridge-entry-fix-0.5.4-20260918-104500`.

### Cabeceras de Control y Notificaciones 0.5.5

- Control general usa la misma fila superior de marca, reloj y tema que las vistas operativas aprobadas.
- Notificaciones Witmind reemplaza la cabecera administrativa antigua por la cabecera Witmind y elimina el título duplicado.
- Verificación visual en 588 × 829 px y 758 × 588 px, en temas claro y oscuro, sin desbordamiento y con alineación vertical exacta.
- La skill local `.agents/skills/witmind-ha-release-guard` obliga a publicar mediante `tools/release.ps1` y validar `index.html` más sus assets antes de promover.
- Backup: `\\192.168.20.232\config\backups\control-notifications-header-0.5.5-20260918-105700`.

### Métricas ambientales de Oficinas 0.5.6

- Temperatura y humedad quedan ancladas a la esquina superior derecha del encabezado de Gerencia y Oficinas grandes.
- A menos de 420 px pasan a una fila propia para evitar solapamientos; a la resolución objetivo permanecen alineadas con el nombre de la zona.
- Verificación visual y geométrica a 758 × 829 px.
- Backup: `\\192.168.20.232\config\backups\office-environment-layout-0.5.6-20260918-110600`.

### Gesto táctil móvil 0.5.7

- Causa: ciertos navegadores Android/WebView entregan coordenadas cero en `pointerup`, sustituyendo la última posición real y pudiendo invertir el sentido calculado.
- Solución: tacto y lápiz conservan la última muestra válida de `pointermove`; mouse mantiene la coordenada precisa de liberación. También se procesan las muestras coalescentes disponibles.
- Verificación en navegador a 390 × 844 px: derecha→izquierda avanza y el gesto inverso retrocede aun con `pointerup` simulado en cero.
- Backup: `\\192.168.20.232\config\backups\mobile-swipe-direction-0.5.7-20260918-111200`.

### Inicialización móvil idempotente 0.5.8

- Causa: el iframe montaba Showroom antes de conocer la ruta solicitada y después reconstruía el workspace por cada `WITMIND_INIT`; el bridge puede emitir INIT tanto en `load` como al recibir `WITMIND_READY`.
- Solución: dentro de Home Assistant se conserva un fondo estable hasta recibir la configuración, el workspace nace directamente en el panel solicitado y los INIT con configuración idéntica no vuelven a montar ni a suscribir entidades.
- Verificación a 390 × 844 px: cero workspaces antes de INIT, exactamente uno después de dos INIT consecutivos y la misma instancia después de un tercer INIT duplicado.
- Herramienta reproducible: `node tools/verify-mobile-bootstrap.mjs` con Vite disponible en `127.0.0.1:5174`.
- Backup: `\\192.168.20.232\config\backups\mobile-bootstrap-idempotent-0.5.8-20260918-112800`.

### Render único en Home Assistant móvil 0.5.9

- Los paneles reciben configuración, tema, modo estrecho y adaptador de Home Assistant antes de conectarse al DOM.
- Oficinas, Grabación, Control, Energía, Calendario, Notificaciones, Showroom y Lobby evitan renderizar desde setters mientras todavía están desconectados.
- El tema inicial se guarda antes de crear el workspace; aplicar nuevamente el mismo tema no produce trabajo visual.
- Verificación a 390 × 844 px: un render inicial de Oficinas y cero renders adicionales tras INIT duplicados.
- Backup: `\\192.168.20.232\config\backups\mobile-single-render-0.5.9-20260918-113200`.

### Bridge móvil y caché Android 0.5.10

- Causa raíz adicional: Home Assistant puede reasignar la misma propiedad `panel` durante cambios de layout estrecho; el bridge anterior recargaba el iframe en cada asignación. Además, las nueve entradas seguían usando `module_url ...?v=0.5.0`, permitiendo que distintos WebView Android conservaran generaciones distintas del bridge.
- Solución: el bridge compara la configuración recibida, ignora reasignaciones idénticas, reutiliza el iframe para cambios reales y emite un solo INIT por documento.
- Las nueve entradas `panel_custom` usan ahora `/local/witmind-ui-panel.js?v=0.5.10` para invalidar la caché del teléfono y la tablet de forma determinista.
- Verificación: tres asignaciones idénticas producen una sola carga; un cambio real produce exactamente una segunda inicialización. Bridge, manifiesto, HTML, JavaScript y CSS responden HTTP 200.
- Backup completo: `\\192.168.20.232\config\backups\mobile-bridge-cache-0.5.10-20260918-114500`.

### Cabecera de Lobby en smartphone 0.5.11

- Causa: el breakpoint de contenedor `≤760 px` ocultaba el bloque de título de todas las vistas salvo Showroom, mientras que a `≤460 px` también ocultaba la marca Witmind.
- Solución: Lobby conserva su título operativo sobre la navegación y la marca se compacta, sin alterar las tarjetas, los controles ni el orden del workspace.
- Verificación reproducible: `node tools/verify-lobby-mobile-layout.mjs`; a 389 × 844 px, en tema claro y oscuro, se validan marca, título `Lobby`, orden vertical y ausencia de desbordamiento horizontal.
- Release: `\\192.168.20.232\config\www\witmind-ui\releases\0.5.11`.
- HTTP: `current.json`, `index.html`, JavaScript y CSS responden `200`.
- Backup del puntero anterior: `\\192.168.20.232\config\backups\lobby-mobile-389-0.5.11-20260918-115208\current.json`.

### Gesto sobre tarjetas en smartphone 0.5.12

- Causa raíz: el workspace descartaba todo gesto iniciado sobre `button` o `a`. A 389 px las tarjetas interactivas cubren casi toda la superficie visible, por lo que no quedaba una zona práctica desde la cual comenzar el desliz; en tablet sí había huecos libres.
- Solución: botones y enlaces participan en el reconocimiento horizontal. Los controles con arrastre propio (`input`, `select`, campos de texto y `[data-no-swipe]`) siguen excluidos.
- Seguridad: después de reconocer un arrastre horizontal se consume el `click` sintetizado por Android para impedir que el gesto ejecute una escena, active una luz o dispare otra acción.
- Verificación reproducible: `node tools/verify-mobile-card-swipe.mjs`; usa eventos táctiles reales de Chromium a 389 × 844 px y exige Lobby→Oficinas, Oficinas→Lobby y cero llamadas de servicio.
- Release: `\\192.168.20.232\config\www\witmind-ui\releases\0.5.12`.
- HTTP: `current.json`, `index.html`, JavaScript y CSS responden `200`.
- Backup del puntero anterior: `\\192.168.20.232\config\backups\mobile-card-swipe-0.5.12-20260918-115819\current.json`.

### Conexión de Calendario laboral

- Causa raíz: `configuration.yaml` declara `name: witmind-calendario-laboral-panel`, pero el bridge solo registraba los aliases `calendario-laboral-panel` y `witmind-calendario-panel`. Home Assistant no encontraba el custom element solicitado y dejaba la ruta `/calendario-laboral` en blanco antes de montar la aplicación.
- Solución: registrar y normalizar el nombre exacto `witmind-calendario-laboral-panel` a `panel_kind: calendar` y `panel_id: calendar`.
- Las nueve entradas Witmind usan `/local/witmind-ui-panel.js?v=0.5.13` para evitar mezclar el bridge anterior y el corregido en la caché de los clientes.
- Verificación reproducible: `node tools/verify-panel-aliases.mjs`; valida todos los nombres activos y su panel de destino.
- Verificación remota: bridge local/remoto con SHA-256 idéntico, nueve URLs actualizadas, alias presente tres veces y JavaScript HTTP `200`.
- Backup: `\\192.168.20.232\config\backups\calendar-panel-alias-20260918-120702`.
- Operación pendiente: reiniciar Home Assistant para que vuelva a registrar `panel_custom` con el nuevo `module_url`.

### Gesto táctil resistente a rerender en smartphone 0.5.13

- Las correcciones anteriores validaban Pointer Events de Chromium, pero no la ruta Touch Events que puede conservar Android WebView cuando cancela el puntero dentro de un iframe.
- El dedo usa ahora `touchstart`, `touchmove`, `touchend` y `touchcancel`; los movimientos y finales se escuchan en `window`, que permanece estable aunque un panel hijo sustituya su Shadow DOM.
- Mouse y lápiz conservan Pointer Events y capturan el puntero desde `pointerdown`, no después del primer movimiento.
- Los eventos `resize` móviles ya no ejecutan `_snap()` mientras existe un contacto activo; el ajuste se realiza al terminar el gesto con el viewport vigente.
- `node tools/verify-mobile-rerender-swipe.mjs` fuerza simultáneamente un render hijo, un INIT distinto y un cambio 389 × 844 → 389 × 843 durante el contacto, y exige llegar de Lobby a Oficinas.
- `node tools/verify-mobile-card-swipe.mjs` valida ambos sentidos con eventos táctiles reales y cero llamadas de servicio accidentales.
- Release: `\\192.168.20.232\config\www\witmind-ui\releases\0.5.13`.
- HTTP: `current.json`, `index.html`, JavaScript y CSS responden `200`.
- Backup del puntero anterior: `\\192.168.20.232\config\backups\mobile-touch-rerender-0.5.13-20260918-122643\current.json`.
