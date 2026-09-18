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
