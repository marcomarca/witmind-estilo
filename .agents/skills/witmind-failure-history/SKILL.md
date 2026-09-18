---
name: witmind-failure-history
description: Registro histórico sintetizado de fallas, regresiones, causas raíz y resoluciones entre versiones de Witmind Home Assistant. Consultar antes de modificar el workspace, gestos táctiles/ratón, el bridge o vistas de paneles para no repetir errores pasados.
---

# Registro Histórico de Fallas y Regresiones (Witmind HA)

Este documento es la memoria técnica de fallas ocurridas en la integración real de Witmind con Home Assistant. Cualquier agente de IA o desarrollador debe consultar este registro antes de alterar componentes críticos para no reintroducir bugs ya resueltos.

---

## Índice de Fallas y Soluciones por Versión

### 1. Falla de Clics en Desktop por Captura Prematura de Puntero
- **Versión con falla**: `0.5.13`
- **Versión corregida**: `0.5.14`
- **Ruta afectada**: [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts)
- **Síntoma real**: En escritorio con ratón, los botones de navegación interna ([Inicio], [Iluminación], [Energía], [Sistema]) no respondían al clic ni cambiaban de vista. En móvil funcionaba bien.
- **Causa raíz**: Se quitó `button` de `_isSwipeIgnored` y se llamó a `setPointerCapture` inmediatamente en `_onPointerDown`. En desktop (ratón), el contenedor `.track` capturaba todo el puntero al presionar el ratón y los botones nunca recibían el evento `click`.
- **Solución en `0.5.14`**: Diferir `setPointerCapture` a `_onPointerMove` únicamente tras confirmar desplazamiento horizontal real (`dx > 8px`). Al hacer clic simple sin arrastre, nunca se captura el puntero.
- **Regla preventiva**: **Nunca capturar el puntero en `pointerdown` en contenedores padre**. La captura se activa solo cuando se valida el inicio de un arrastre intencional.

---

### 2. Disparos Involuntarios de Gestos sobre Controles Interactivos
- **Versión con falla**: `0.2.0`
- **Versión corregida**: `0.2.1`
- **Ruta afectada**: [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts), [`src/swipe-gesture.ts`](file:///c:/dev/automatizacion-estilo/src/swipe-gesture.ts)
- **Síntoma real**: Al intentar operar un slider, switch o selector dentro de una tarjeta, el carrusel cambiaba de pantalla horizontalmente.
- **Causa raíz**: No se filtraba la ruta de propagación del evento (`composedPath()`) para elementos interactivos anidados en Shadow DOM.
- **Solución en `0.2.1`**: Incorporación de `_isSwipeIgnored` evaluando `event.composedPath()` contra `input, textarea, select, [data-no-swipe]` y asegurando que el desplazamiento horizontal supere estrictamente al vertical con sesgo (`SWIPE_AXIS_BIAS = 1.15`).
- **Regla preventiva**: Al escuchar eventos de gestos en el nivel superior, inspeccionar siempre `composedPath()` para respetar elementos interactivos internos de Web Components.

---

### 3. Pantalla en Blanco por Desincronización de Tags y Normalización
- **Versión con falla**: Pre-`0.3.3`
- **Versión corregida**: `0.3.3`
- **Ruta afectada**: [`home-assistant/www/witmind-ui-panel.js`](file:///c:/dev/automatizacion-estilo/home-assistant/www/witmind-ui-panel.js), [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts)
- **Síntoma real**: Al entrar desde el sidebar a entradas como `/calendario-laboral` o `/witmind-lobby`, la pantalla quedaba en blanco o mostraba panel no encontrado.
- **Causa raíz**: Home Assistant registraba nombres de Custom Element específicos (ej. `witmind-calendario-laboral-panel`), pero el bridge o el workspace esperaban `panel_kind: calendar`. Si se cambiaba uno sin normalizar el otro, fallaba la resolución.
- **Solución en `0.3.3`**: Mapeo y normalización bidireccional exhaustiva en `_config()` de `witmind-ui-panel.js` (`this.localName` $\rightarrow$ `panel_kind` / `panel_id`).
- **Regla preventiva**: Todo nuevo panel debe registrar su alias tanto en la lista de Custom Elements de `witmind-ui-panel.js` como en el mapeo `safePanelId` del workspace.

---

### 4. Parpadeo y Pérdida de Foco por Reconstrucción Total del Shadow DOM
- **Versión con falla**: `0.1.8`
- **Versión corregida**: `0.1.9` / `0.1.10`
- **Ruta afectada**: [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js)
- **Síntoma real**: Al encender o apagar una luz, toda la pantalla parpadeaba, se reseteaba el scroll de la vista y se perdía la accesibilidad del teclado.
- **Causa raíz**: Cada actualización de entidad en Home Assistant invocaba `render()` completo, reemplazando `this.shadowRoot.innerHTML`.
- **Solución en `0.1.9`**: Implementación de `_updateStatePresentation()`, que muta directamente clases CSS (`is-on`, `is-pending`), atributos ARIA y textos de estado en el DOM existente sin destruirlo.
- **Regla preventiva**: Separar el render estructural inicial de los parches de estado reactivos. Las actualizaciones de entidades solo deben mutar atributos de los elementos existentes.

---

### 5. Error 404 del Iframe por Desajuste en el Contrato de Entrada
- **Versión con falla**: `0.1.0`
- **Versión corregida**: `0.1.1`
- **Ruta afectada**: [`tools/release.ps1`](file:///c:/dev/automatizacion-estilo/tools/release.ps1), [`vite.config.ts`](file:///c:/dev/automatizacion-estilo/vite.config.ts)
- **Síntoma real**: El bridge cargaba `/local/witmind-ui/releases/0.1.0/index.html` devolviendo `404 Not Found`.
- **Causa raíz**: Vite compilaba el punto de entrada con el nombre del archivo fuente `dist-panel/witmind-ui.html`, mientras que el bridge en Home Assistant espera por convención `/releases/<version>/index.html`.
- **Solución en `0.1.1`**: `release.ps1` copia automáticamente `witmind-ui.html` renombrándolo a `index.html` y verifica que existan tanto `index.html` como `assets/`.
- **Regla preventiva**: Toda release inmutable debe contener obligatoriamente `index.html`. Una release con solo `witmind-ui.html` es inválida y debe ser rechazada antes de la promoción.

---

### 6. Menú Hamburguesa Inoperativo en la Aplicación Aislada
- **Versión con falla**: `0.1.5`
- **Versión corregida**: `0.1.6`
- **Ruta afectada**: [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js), [`src/ha/WitmindHaClient.ts`](file:///c:/dev/automatizacion-estilo/src/ha/WitmindHaClient.ts)
- **Síntoma real**: Al pulsar el botón de menú (tres líneas) en la esquina superior izquierda de Witmind, el sidebar lateral nativo de Home Assistant no se abría.
- **Causa raíz**: La aplicación corre dentro de un `iframe` y no tiene acceso directo al DOM de Home Assistant ni a `window.parent` por aislamiento.
- **Solución en `0.1.6`**: Enviar mensaje postMessage `WITMIND_ACTION: toggle_menu`. El bridge `witmind-ui-panel.js` escucha el mensaje y despacha el evento nativo `hass-toggle-menu` en el contexto principal de Home Assistant.
- **Regla preventiva**: Las acciones globales de Home Assistant (abrir menú, cambiar tema del sistema, navegar fuera del panel) deben solicitarse por protocolo `postMessage` al bridge.

---

### 7. Gráfica de Energía Vacía hasta Presionar Refrescar
- **Versión con falla**: `0.5.2`
- **Versión corregida**: `0.5.3`
- **Ruta afectada**: [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js)
- **Síntoma real**: Al entrar al panel, la tarjeta de energía aparecía vacía o con estado "Sin datos" hasta que pasaban 30 segundos o el usuario pulsaba refrescar manualmente.
- **Causa raíz**: En Home Assistant, los estados de entidades se reciben de forma asíncrona tras el primer render. La entidad de energía llegaba milisegundos después del montaje y el temporizador de refresco esperaba 30s.
- **Solución en `0.5.3`**: Detección de `energyAppeared`: si la entidad no existía en el primer render y llega en el siguiente snapshot, disparar de inmediato `_loadEnergyStatistics()` sin esperar el temporizador.
- **Regla preventiva**: No asumir que todas las entidades están disponibles en el ciclo `connectedCallback()`. Programar carga inmediata reactiva ante la llegada tardía de la entidad principal.

---

## Protocolo Obligatorio para Registrar Nuevas Fallas

Cada vez que se solucione un error en una release nueva:
1. Añadir una nueva sección en este archivo con:
   - Versión con falla y versión corregida.
   - Ruta exacta del archivo.
   - Síntoma visible en la vida real.
   - Causa técnica raíz.
   - Solución aplicada.
   - Regla preventiva.
2. Mantener la redacción sintetizada, directa y de alto nivel técnico.
