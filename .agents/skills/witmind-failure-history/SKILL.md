---
name: witmind-failure-history
description: Registro histórico sintetizado y cronológico de fallas, regresiones, causas raíz y resoluciones entre versiones de Witmind Home Assistant. Consultar obligatoriamente antes de modificar el workspace, gestos táctiles/ratón en móvil/desktop, el bridge o vistas de paneles para no repetir errores pasados.
---

# Registro Histórico de Fallas, Regresiones y Soluciones (Witmind HA)

> **MANDATO PARA AGENTES DE IA Y DESARROLLADORES:**
> Este documento recopila todas las fallas reales que ocurrieron durante la evolución de Witmind en Home Assistant OS (desde `0.1.0` hasta `0.5.14`). Muchas de estas fallas requirieron días de depuración en entornos hostiles (como el WebView de la app de Android dentro de un iframe).
> **Antes de realizar cualquier cambio en gestos, listeners de eventos, el bridge `witmind-ui-panel.js` o el ciclo de vida de los paneles, revisa este historial para no reintroducir un bug previamente resuelto.**

---

## 1. Tabla Cronológica de Fallas por Versión

| Versión Falla | Versión Corrección | Componente / Ruta Afectada | Síntoma Real | Causa Raíz Técnica Breve |
|---|---|---|---|---|
| `0.1.0` | `0.1.1` | [`tools/release.ps1`](file:///c:/dev/automatizacion-estilo/tools/release.ps1) | Error 404 al abrir el panel en Home Assistant. | Vite compilaba como `witmind-ui.html`; el bridge exige `index.html`. |
| `0.1.2` | `0.1.3` | [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js) | Métricas de energía rotas o inexistentes en Lobby. | Se intentaban inventar mediciones para circuitos sin potencia documentada. |
| `0.1.5` | `0.1.6` | [`src/ha/WitmindHaClient.ts`](file:///c:/dev/automatizacion-estilo/src/ha/WitmindHaClient.ts) | Menú hamburguesa (tres líneas) inoperativo. | Iframe aislado intentaba acceder directamente a Home Assistant sin postMessage. |
| `0.1.6` | `0.1.7` | [`home-assistant/www/witmind-ui-panel.js`](file:///c:/dev/automatizacion-estilo/home-assistant/www/witmind-ui-panel.js) | Pantalla en blanco al entrar a Lobby por sidebar. | Desincronización del tag Custom Element con el `panel_kind`. |
| `0.1.8` | `0.1.9` | [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js) | Parpadeo total de pantalla y pérdida de scroll al tocar un switch. | Reconstrucción completa del Shadow DOM (`innerHTML = ...`) en cada cambio de estado. |
| `0.2.0` | `0.2.1` | [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | Al usar sliders o switches, la vista cambiaba horizontalmente de panel. | Gesto de swipe no excluía controles anidados en `composedPath()`. |
| Pre-`0.3.3` | `0.3.3` | [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | Vistas operativas y administrativas en blanco. | Nombres de tags en `configuration.yaml` no normalizados en `safePanelId`. |
| `0.4.8` | `0.4.10` | [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts) | Calendario laboral mostraba `0 registros` teniendo 15 en la base de datos. | Backend devolvía clave `holidays`; el frontend buscaba `records`, `items` o `events`. |
| `0.5.0` | `0.5.1` | [`src/swipe-gesture.ts`](file:///c:/dev/automatizacion-estilo/src/swipe-gesture.ts) | Deslizar a la izquierda o cancelar siempre forzaba el cambio a la derecha. | `pointercancel` entregaba `clientX = 0`, calculando una distancia negativa gigante. |
| `0.5.1` | `0.5.2` | [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js) | Título de Showroom desaparecía en tablets (588px a 760px). | Breakpoint container `@container showroom-panel (max-width: 760px)` con `display: none`. |
| `0.5.3` | `0.5.4` | [`tools/release.ps1`](file:///c:/dev/automatizacion-estilo/tools/release.ps1) | Error 404 en el bridge tras despliegue de versión. | Despliegue manual copió `witmind-ui.html` saltándose el script de release. |
| `0.5.6` | `0.5.7` | [`src/swipe-gesture.ts`](file:///c:/dev/automatizacion-estilo/src/swipe-gesture.ts) | En Android, levantar el dedo invertía la dirección o trababa la pantalla. | Android WebView reporta `clientX = 0` en el evento nativo `pointerup`. |
| `0.5.7` | `0.5.8` | [`src/witmind-app.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-app.ts) | Pantalla parpadeaba y montaba Showroom antes del panel solicitado. | Doble emisión de `WITMIND_INIT` (en `load` y tras `WITMIND_READY`) no idempotente. |
| `0.5.8` | `0.5.9` | Paneles en [`src/`](file:///c:/dev/automatizacion-estilo/src/) | Renders múltiples e innecesarios durante el arranque. | Setters ejecutaban `render()` antes de que el elemento estuviera conectado (`isConnected`). |
| `0.5.9` | `0.5.10` | [`home-assistant/configuration.yaml.snippet.yaml`](file:///c:/dev/automatizacion-estilo/home-assistant/configuration.yaml.snippet.yaml) | La app de Android conservaba versiones viejas y rotas del bridge. | Falta de cache-busting sincronizado (`module_url: ...?v=0.5.10`) en las 9 entradas de HA. |
| `0.5.10` | `0.5.11` | [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js) | Marca y título colapsaban en smartphones estrechos (< 460px). | Regla container `@container (max-width: 460px)` ocultaba agresivamente elementos de marca. |
| `0.5.11` | `0.5.12` | [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | Imposible deslizar en smartphone: nada se movía con el dedo. | Las tarjetas cubren el 95% de la pantalla a 389px y los botones estaban excluidos del gesto. |
| `0.5.12` | `0.5.13` | [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | Gesto táctil congelado a mitad de camino en app Android al recibir estados. | Android WebView cancela Pointer Events en iframes si un nodo hijo se actualiza. |
| `0.5.13` | `0.5.14` | [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | En Desktop con ratón, los clics en Iluminación, Energía y Sistema no funcionaban. | `setPointerCapture` en `pointerdown` capturaba el puntero y cancelaba el `click` en ratón. |
| `0.6.0` | `0.6.1` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts) | La interfaz parecía cambiar de tamaño al alternar entre Planta Baja y Planta Alta. | Cada planta tenía distinta cantidad de filas de circuitos; esto modificaba la altura del documento y la aparición de la barra vertical. |
| `0.6.1` | `0.6.2` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/building-config.ts`](file:///c:/dev/automatizacion-estilo/src/building-config.ts) | Circuitos por zona mostraba potencias incorrectas o no disponibles y el switch encendía indiscriminadamente una zona completa. | La potencia MQTT en kW se rotulaba como W, el medidor real del Lobby no estaba mapeado y el control no distinguía perfiles operativos de estados parciales. |
| `0.6.2` | `0.6.3` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/building-config.ts`](file:///c:/dev/automatizacion-estilo/src/building-config.ts) | Tarjetas flotantes sobre el plano desalineadas al cambiar entre desktop, tablet y móvil; Mindtec y Oficina grande superpuestas en la misma sala. | Letterboxing del plano desplazaba `.floor-overlays` al calcular porcentajes sobre `.floor-viewport` y no sobre el plano; coordenadas de habitaciones no coincidían con el plano arquitectónico. |
| `0.6.4` | `0.6.5` | [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts), [`src/notifications-model.ts`](file:///c:/dev/automatizacion-estilo/src/notifications-model.ts) | Pérdida de editor en notificaciones, acumulación de suscripciones y bloqueo para reparar 361 errores de identidad obsoleta. | Interfaz unificada carecía de wizard de 4 pasos, acumulaba listeners de WebSocket en cada `_load()` y no preservaba inputs ante eventos concurrentes de Home Assistant. |
| `0.6.5` | `0.6.6` | [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts), [`src/notifications-model.ts`](file:///c:/dev/automatizacion-estilo/src/notifications-model.ts) | Contraste ilegible en modo claro, colapso de icono de papelera y recorte de botones de acción en modales móviles. | Colores de métricas hardcodeados en blanco sobre fondo claro, SVG de papelera sin dimensiones explícitas y modal sin flexbox vertical con scroll interno. |
| `0.6.6` | `0.6.7` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`tools/optimize-floor-plans.mjs`](file:///c:/dev/automatizacion-estilo/tools/optimize-floor-plans.mjs) | Planos 2D pesaban ~5.7 MB y no soportaban temas claro/oscuro ni aspect-ratio específico. | Falta de pipeline WebP y aspecto rígido 1536/1024 en contenedor de Planta Alta. |
| `0.6.7` | `0.6.8` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/building-layout-store.ts`](file:///c:/dev/automatizacion-estilo/src/building-layout-store.ts) | Tarjetas flotantes y posición del plano rígidas, requiriendo intervención en código para mover popups. | Falta de modo edición interactivo, drag & drop con Pointer Events y persistencia en localStorage. |
| `0.6.8` | `0.6.9` | [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/building-layout-store.ts`](file:///c:/dev/automatizacion-estilo/src/building-layout-store.ts) | Tarjetas atrapadas en margen invisible (0..78%) y sin posibilidad de redimensionar ancho o escala. | Clamping restrictivo a 0..100-ancho y falta de manija/controles de resize interactivo. |

---

## 2. Fichas Técnicas Detalladas de las Fallas Críticas

---

### FALLA K: Defectos Visuales en Notificaciones: Contraste Claro, Iconos y Recorte Mobile (0.6.5 $\rightarrow$ 0.6.6)
- **Rutas afectadas**: [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts) y [`src/notifications-model.ts`](file:///c:/dev/automatizacion-estilo/src/notifications-model.ts).
- **Síntoma real**: En modo claro, las temperaturas y valores de regla eran texto blanco sobre fondo blanco (completamente invisible); el botón de eliminar tarjeta colapsaba a un círculo vacío; en dispositivos móviles (390px) el wizard de reglas empujaba los botones "Siguiente"/"Guardar" fuera de la pantalla; y la badge de estado duplicaba la palabra "recordatorio".
- **Causa raíz técnica**:
  1. `.rule-metrics strong` utilizaba `#f5f6f4` fijo sin selector específico para `:host([data-theme=light])`.
  2. El botón de eliminar carecía de clases con layout `inline-flex` y su SVG carecía de `width`/`height` explícitos.
  3. `.modal-card` usaba `overflow-y: auto` en todo el contenedor en lugar de desacoplar `.wizard-body` con scroll independiente y `wizard-actions` fijos.
  4. `deriveRuleStatus` retornaba `label: "Alerta activa · recordatorio"` mientras `countdownMarkup` anexaba nuevamente `" · recordatorio"`.
- **Solución implementada en `0.6.6`**:
  1. Definición completa de reglas de alto contraste para modo claro (`#172129` para valores y títulos, `#556268` para etiquetas).
  2. Adopción de `.icon-btn.danger` y dimensiones explícitas de 16x16 px para todos los SVGs de acción.
  3. Contenedor modal con `display: flex; flex-direction: column; max-height: min(90vh, 90dvh)` y `.wizard-body { flex: 1 1 auto; overflow-y: auto; }`.
  4. Normalización del label de estado a `"Alerta activa"`.
  5. Suite de inspección visual multiresolución automatizada (`tools/debug-notifications-appearance.mjs`) que genera 40 capturas a escala 2x verificando 0 desbordamientos.
- **Regla preventiva**: Toda interfaz con diálogos modales en móvil debe aislar el cuerpo del formulario con scroll propio respecto a las acciones fijas inferiores, y todo SVG de acción debe tener dimensiones CSS explícitas.


---

### FALLA A: La Cancelación de Pointer Events en Android WebView (0.5.12 $\rightarrow$ 0.5.13)
- **Ruta afectada**: [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts)
- **Entorno del fallo**: Smartphone físico ejecutando la app oficial de Home Assistant para Android.
- **Síntoma real**: Al apoyar el dedo sobre la pantalla para deslizar entre salas, el carrusel comenzaba a moverse y repentinamente se quedaba congelado a mitad de pantalla sin responder al dedo.
- **Causa raíz técnica**:
  1. La arquitectura de Witmind se ejecuta dentro de un `iframe` incrustado en el Custom Panel de Home Assistant.
  2. En Android WebView, cuando un Web Component hijo actualiza su Shadow DOM (por ejemplo, porque Home Assistant envió un evento WebSocket o un cambio de sensor de 1W), el motor Blink de Android **dispara un `pointercancel` inmediato en el Pointer Event activo**.
  3. Adicionalmente, si el scroll oculta o muestra la barra de navegación del móvil, el evento `resize` forzaba `_snap()`, abortando el deslizamiento en pleno arrastre.
- **Solución implementada en `0.5.13`**:
  1. **Desacoplamiento total**: En dispositivos táctiles (`event.pointerType === "touch"`), se descartaron los Pointer Events y se adoptaron **Touch Events puros** (`touchstart`, `touchmove`, `touchend`, `touchcancel`).
  2. **Anclaje a `window`**: Los listeners `touchmove` y `touchend` se registran a nivel de `window`. Así, aunque el componente hijo desmonte o vuelva a renderizar su Shadow DOM, `window` no pierde el contacto del dedo.
  3. **Inmunidad ante `resize`**: Si existe un arrastre activo (`this._drag || this._touchDrag`), el evento `resize` no dispara `_snap()`.
- **Regla preventiva**: **Nunca confiar en Pointer Events para gestos táctiles complejos dentro de un iframe en Android WebView**. Usar Touch Events escuchados en `window`.

---

### FALLA B: Imposibilidad de Iniciar el Swipe en Smartphones Estrechos (0.5.11 $\rightarrow$ 0.5.12)
- **Ruta afectada**: [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts)
- **Síntoma real**: En un smartphone a 389px de ancho, el usuario intentaba hacer swipe horizontal y la pantalla no se movía en absoluto. En tablet y desktop sí funcionaba.
- **Causa raíz técnica**: Para evitar clics accidentales, el selector `_isSwipeIgnored` incluía `button, a`. En una pantalla móvil de 389px, las tarjetas táctiles (`<button class="scene">`, `<button class="device">`) ocupan prácticamente el 100% del área útil. No existía ningún píxel libre de fondo donde el dedo pudiera posarse para iniciar un arrastre.
- **Solución implementada en `0.5.12`**:
  1. Permitir que el gesto horizontal inicie **sobre botones y enlaces** (`button` y `a` removidos de `_isSwipeIgnored`).
  2. Solo se mantienen excluidos controles con arrastre propio (`input[type="range"]`, campos de texto, `select` y `[data-no-swipe]`).
  3. **Seguridad contra clics accidentales**: Si el usuario realiza un arrastre horizontal, al soltar el dedo se activa `this._suppressClickUntil = performance.now() + 500;`. Esto consume el evento `click` sintetizado que Android emite después de `touchend`, evitando que el gesto encienda o apague luces.
- **Regla preventiva**: En interfaces compactas para móvil, los botones deben permitir el inicio del gesto horizontal, protegiendo las acciones mediante supresión temporal de clics al detectar desplazamiento.

---

### FALLA C: Regresión de Clics en Desktop por Captura Prematura de Puntero (0.5.13 $\rightarrow$ 0.5.14)
- **Ruta afectada**: [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts)
- **Síntoma real**: En navegadores de escritorio (con ratón), hacer clic en [Inicio], [Iluminación], [Energía], [Sistema], switches o escenas no ejecutaba ninguna acción. En móvil funcionaba.
- **Causa raíz técnica**:
  1. Para ratón se usaba `_onPointerDown`.
  2. Al quitar `button` de la lista de ignorados (en la solución de 0.5.12), `_onPointerDown` ejecutaba:
     `if (!ignored) track.setPointerCapture(event.pointerId);`
  3. Apenas el usuario presionaba el botón izquierdo del ratón sobre un botón dentro del Shadow DOM de `showroom-panel`, el contenedor `.track` capturaba el puntero.
  4. Al soltarse el ratón, el navegador dirigía el `pointerup` a `.track` y **nunca emitía el evento `click` sobre el botón hijo**.
- **Solución implementada en `0.5.14`**:
  1. Eliminar `setPointerCapture` de `_onPointerDown`.
  2. Diferir `setPointerCapture` a `_onPointerMove` **únicamente cuando el desplazamiento horizontal supere el umbral de arrastre (`dx > 8px`)**:
     ```typescript
     if (this._drag.axis !== "horizontal") return;
     if (!this._dragging) {
       this._dragging = true;
       track.setPointerCapture(event.pointerId);
     }
     ```
  3. Si el usuario solo hace clic (movimiento $< 8\text{ px}$), nunca se captura el puntero y el botón recibe el evento `click` normal.
- **Regla preventiva**: **`setPointerCapture` jamás debe ejecutarse en `pointerdown` en contenedores genéricos**, solo en `pointermove` cuando se certifique un arrastre real.

---

### FALLA D: Coordenadas Fantasma en Cero en `pointerup` de Android (0.5.6 $\rightarrow$ 0.5.7)
- **Ruta afectada**: [`src/swipe-gesture.ts`](file:///c:/dev/automatizacion-estilo/src/swipe-gesture.ts)
- **Síntoma real**: Al deslizar hacia la izquierda para ir al siguiente panel en Android, al soltar el dedo la vista saltaba abruptamente hacia el panel anterior o se bloqueaba.
- **Causa raíz técnica**: Varios WebViews de Android reportan `clientX = 0` y `clientY = 0` en el objeto del evento `pointerup`. La fórmula de desplazamiento:
  `dx = clientX_final - clientX_inicial`
  se convertía en `0 - 300 = -300`, invirtiendo el sentido calculado o generando un salto falso.
- **Solución implementada en `0.5.7`**:
  Creación de la función `resolvePointerReleaseCoordinate`:
  ```typescript
  export function resolvePointerReleaseCoordinate(input: {
    pointerType: string;
    lastMove: number;
    release: number;
  }): number {
    if (input.pointerType === "mouse" && Number.isFinite(input.release)) return input.release;
    return input.lastMove; // En táctil, se descarta el release si es cero y se usa el último pointermove válido
  }
  ```
- **Regla preventiva**: En gestos táctiles, nunca asumir que `pointerup` o `touchend` traen las coordenadas reales del impacto; utilizar la última muestra de movimiento válida.

---

### FALLA E: Destrucción Total del Shadow DOM en Cambios de Entidad (0.1.8 $\rightarrow$ 0.1.9)
- **Ruta afectada**: [`src/showroom-panel.js`](file:///c:/dev/automatizacion-estilo/src/showroom-panel.js)
- **Síntoma real**: Al encender cualquier luz, toda la pantalla parpadeaba de golpe, se reiniciaba la posición de scroll y se perdía el foco del teclado.
- **Causa raíz técnica**: En el setter `set hass()`, cualquier cambio recibido de Home Assistant desencadenaba una llamada incondicional a `render()`, que sobrescribía `this.shadowRoot.innerHTML`.
- **Solución implementada en `0.1.9`**:
  Separación en dos flujos:
  1. `render()` estructural: Solo se ejecuta en el montaje inicial o al cambiar de modo (`home`, `lights`, etc.).
  2. `_updateStatePresentation()` incremental: Al recibir cambios de WebSocket, busca los elementos existentes por selector (`querySelector('[data-action="toggle-switch"]')`) y actualiza exclusivamente sus clases CSS (`is-on`, `is-pending`), estados ARIA (`aria-pressed`) y textos de estado, manteniendo el DOM intacto.
- **Regla preventiva**: En Web Components de Home Assistant, **nunca reconstruir el DOM por eventos de WebSocket**. Aplicar parches de atributos en caliente.

---

### FALLA F: Contrato de Entrada Roto por Despliegue Manual (0.1.0 $\rightarrow$ 0.1.1 y 0.5.3 $\rightarrow$ 0.5.4)
- **Ruta afectada**: [`tools/release.ps1`](file:///c:/dev/automatizacion-estilo/tools/release.ps1), [`home-assistant/www/witmind-ui-panel.js`](file:///c:/dev/automatizacion-estilo/home-assistant/www/witmind-ui-panel.js)
- **Síntoma real**: El panel de Home Assistant quedaba con pantalla negra o cargaba indefinidamente con error 404 en la consola.
- **Causa raíz técnica**: Vite genera por defecto `dist-panel/witmind-ui.html`. Sin embargo, el bridge espera `releases/<version>/index.html`. Cuando un desarrollador copiaba `dist-panel` a mano por Samba sin pasar por `tools/release.ps1`, subía `witmind-ui.html`.
- **Solución implementada en `0.5.4`**:
  1. El script `tools/release.ps1` automatiza la copia, el renombrado a `index.html` y la verificación de `assets/`.
  2. Creación del skill `witmind-ha-release-guard` que prohíbe el copiado manual y exige comprobación HTTP 200 de `index.html` antes de promover `current.json`.
- **Regla preventiva**: **Prohibido copiar carpetas manualmente por Samba**. Las releases siempre se compilan, renombran y transfieren con `tools/release.ps1`.

---

### FALLA G: Datos Ocultos en el Calendario Laboral (0.4.8 $\rightarrow$ 0.4.10)
- **Ruta afectada**: [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts)
- **Síntoma real**: La vista del Calendario laboral mostraba `0 registros pregrabados`, a pesar de que el archivo `.storage/calendario_laboral` de Home Assistant contenía 15 feriados para 2026.
- **Causa raíz técnica**: El componente backend de Home Assistant entrega la lista de registros en la respuesta WebSocket bajo la clave `"holidays"`. El frontend buscaba genéricamente `"records"`, `"items"` o `"events"`, por lo que consideraba vacía la respuesta.
- **Solución implementada en `0.4.10`**:
  Inspeccionar la respuesta real del backend e incluir `"holidays"` en el desempaquetado:
  `const holidays = Array.isArray(response?.holidays) ? response.holidays : (response?.records || []);`
- **Regla preventiva**: Al migrar o conectar un panel con un custom component de Home Assistant, inspeccionar directamente la respuesta serializada de la integración antes de diseñar el parser del frontend.

---

## 3. Checklist Preventivo de Oro (Para Futuros Desarrollos)

Antes de promover una release o dar por concluido un cambio, verificar:

1. **Gestos táctiles**: ¿Probaste en móvil real o emulador con Touch Events? Asegúrate de que los Touch Events se escuchen en `window` y que `resolvePointerReleaseCoordinate` proteja contra coordenadas cero en Android.
2. **Gestos con ratón**: ¿Probaste que los botones se pueden pulsar sin arrastrar? Verifica que `setPointerCapture` no se ejecute en `pointerdown`.
3. **Persistencia del DOM**: ¿El botón o interruptor conserva el foco y la posición de scroll al encenderse? No llames a `render()` en updates reactivos; usa `_updateStatePresentation()`.
4. **Contrato de release**: ¿Ejecutaste `tools/release.ps1` y comprobaste que existe `releases/<version>/index.html` respondiendo `HTTP 200`?
5. **Idempotencia del bridge**: ¿El bridge reacciona a cambios de panel sin recargar innecesariamente el iframe si los parámetros son idénticos?
6. **Estabilidad entre plantas**: ¿Los contenedores del plano y de circuitos conservan dimensiones idénticas al cambiar de planta? Ejecuta `node tools/verify-building-floor-layout.mjs` con el servidor local activo.

---

### FALLA H: Salto de tamaño entre plantas del BMS (0.6.0 $\rightarrow$ 0.6.1)
- **Rutas afectadas**: [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts) y [`src/witmind-workspace.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-workspace.ts).
- **Síntoma real**: Al alternar entre Planta Baja y Planta Alta, el plano parecía cambiar de ancho y la página modificaba su longitud, aunque las dos imágenes estaban renderizadas con el mismo `object-fit: contain`.
- **Causa raíz técnica**: Planta Baja renderizaba tres zonas y Planta Alta cinco. La tabla de circuitos crecía 86–100 px y podía hacer aparecer la barra de desplazamiento vertical, reduciendo adicionalmente el ancho útil.
- **Solución implementada en `0.6.1`**:
  1. Reservar una altura mínima estable para `.circuits-card` y `.circuit-table`, calculada para la planta con más zonas.
  2. Usar `scrollbar-gutter: stable` solo en el panel general a partir de 821 px; en móvil se conserva todo el ancho disponible.
  3. Añadir `tools/verify-building-floor-layout.mjs`, que compara las dimensiones de ambas plantas en 1440, 1024 y 390 px.
- **Regla preventiva**: El tamaño visual de una planta no debe depender de cuántas entidades o filas tenga. Verificar igualdad geométrica en los tres anchos antes de publicar.

---

### FALLA I: Potencia y acciones de zona sin semántica operativa (0.6.1 $\rightarrow$ 0.6.2)
- **Rutas afectadas**: [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts) y [`src/building-config.ts`](file:///c:/dev/automatizacion-estilo/src/building-config.ts).
- **Síntoma real**: Showroom mostraba aproximadamente `1 W` pese a consumir más de 1 kW; Lobby mostraba “No disponible”; el switch de Showroom podía encender sus diez circuitos en lugar de aplicar Reunión.
- **Causa raíz técnica**:
  1. `sensor.showroom_potencia_activa` publica `kW`, pero la UI lo presentaba como `W` sin conversión.
  2. `sensor.sensor_de_potencia_showroom_p`, registrado como medidor real del Lobby, no estaba incluido en el registro BMS.
  3. El estado y la acción del switch se deducían con “algún circuito encendido” / “todos los circuitos”, sin un contrato de perfil.
- **Solución implementada en `0.6.2`**:
  1. Normalización estricta `kW/MW/W -> W`, rechazando unidades incompatibles.
  2. Mapeo del medidor físico de Lobby y separación visual entre potencia medida y potencia nominal calculada por switches reales.
  3. Perfiles declarativos: Reunión (2 ON + 8 OFF), Invitados (4 ON) y Grabación completa (4 ON), con apagado limitado a la zona.
  4. Overlays por planta con circuitos, potencia y ambiente reales, sin mezclar plantas.
  5. Verificación reproducible con `node tools/verify-building-live-overlays.mjs`.
- **Regla preventiva**: Nunca presentar potencia sin normalizar `unit_of_measurement`, y nunca usar un interruptor agregado sin declarar su perfil exacto de entidades ON/OFF.

---

### FALLA J: Regresión en Editor de Notificaciones y Fuga de Listeners (0.6.4 $\rightarrow$ 0.6.5)
- **Rutas afectadas**: [`src/witmind-admin-panel.ts`](file:///c:/dev/automatizacion-estilo/src/witmind-admin-panel.ts), [`src/notifications-model.ts`](file:///c:/dev/automatizacion-estilo/src/notifications-model.ts) y [`src/notifications-types.ts`](file:///c:/dev/automatizacion-estilo/src/notifications-types.ts).
- **Síntoma real**: Al migrar la ruta `/notificaciones` a `witmind-admin-panel.ts`, la interfaz perdió el wizard de creación y edición en 4 pasos, sólo mostraba 12 eventos del historial y acumulaba listeners de `witmind_notifications_updated` en cada recarga. Esto impedía editar destinatarios y provocó que 361 alertas cayeran en error de identidad obsoleta (`stale_identity`).
- **Causa raíz técnica**:
  1. El panel unificado sólo implementaba un subconjunto mínimo sin editor ni sincronización con las APIs completas de `witmind_notifications`.
  2. Cada ejecución de `_load()` registraba un nuevo listener WebSocket en Home Assistant sin validar si ya existía una suscripción activa.
  3. Los eventos concurrentes de entidades en segundo plano desencadenaban `_render()` indiscriminado que destruía el Shadow DOM y reseteaba los formularios en edición.
- **Solución implementada en `0.6.5`**:
  1. Portar el 100% de paridad funcional del panel clásico v1.0.7 con estética Witmind Signature (pestañas Reglas, Dispositivos e Historial; wizard en 4 pasos con previsualización en vivo; filtros de historial por tipo/estado).
  2. Implementación de una sola suscripción WebSocket por ciclo de vida con debounce de 80 ms, refrescando únicamente `rules/list` e `history/list` (hasta 150 registros).
  3. Barrera de interacción (`_hasLiveInteraction`) que inhibe la reconstrucción del DOM mientras un editor, diálogo o modal esté abierto.
  4. Watchdog de cuentas regresivas cada segundo sobre nodos `data-*` específicos sin modificar el árbol de componentes.
  5. Verificación automatizada con `node tools/verify-notifications-panel.mjs`.
- **Regla preventiva**: En Web Components que contengan formularios o editores de reglas, el refresco de entidades de Home Assistant jamás debe llamar a `_render()` completo si hay modales o inputs activos; usar barreras de interacción y parches de nodos selectivos.

---

### MEJORA K: Optimización de Planos 2D y Soporte Dinámico de Temas Claro/Oscuro (0.6.6 $\rightarrow$ 0.6.7)
- **Rutas afectadas**: [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`public/building/`](file:///c:/dev/automatizacion-estilo/public/building/) y [`tools/optimize-floor-plans.mjs`](file:///c:/dev/automatizacion-estilo/tools/optimize-floor-plans.mjs).
- **Síntoma / Necesidad**: Los planos 2D pesaban ~5.7 MB en total, ralentizaban la carga inicial en móviles sobre Home Assistant y sólo existía soporte monocromo/fijo sin adaptación al tema claro/oscuro del usuario ni consideración de la relación de aspecto no estándar de Planta Alta (1448x1086 vs 1536x1024).
- **Causa raíz técnica**:
  1. Las imágenes originales en PNG no tenían cuantización de paleta ni compresión WebP.
  2. El componente sólo referenciaba una ruta fija de imagen por planta (`./building/planta-baja.png`).
  3. El contenedor `.floor-stage` forzaba un `aspect-ratio: 1536 / 1024` rígido para ambas plantas, causando ligera distorsión en Planta Alta.
- **Solución implementada en `0.6.7`**:
  1. Pipeline de optimización con Sharp (`tools/optimize-floor-plans.mjs`): generación de WebP ultra-ligero (q90, ~60-100 KB, ahorro del 95%) y PNG paletizado de alta fidelidad (q95, ahorro del 50-60%) para temas dark y light.
  2. Renderizado dinámico en `<picture>` con `<source type="image/webp">` y fallback `<img>` reactivo al tema actual (`this._theme`).
  3. `aspect-ratio` dinámico en `.floor-stage` (1536/1024 para Planta Baja y 1448/1086 para Planta Alta).
  4. Pruebas y verificación HTTP 200 en Home Assistant OS.
- **Regla preventiva**: Los planos arquitectónicos deben servirse siempre con formato dual WebP/PNG y su contenedor debe reflejar la relación de aspecto exacta de la planta para evitar deformaciones anamórficas.

---

### MEJORA L: Modo Edición Visual de Plano 2D y Overlays Persistentes (0.6.7 $\rightarrow$ 0.6.8)
- **Rutas afectadas**: [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts), [`src/building-layout-store.ts`](file:///c:/dev/automatizacion-estilo/src/building-layout-store.ts) y [`src/utilities/icon.ts`](file:///c:/dev/automatizacion-estilo/src/utilities/icon.ts).
- **Síntoma / Necesidad**: La calibración de la posición del plano 2D y la ubicación de las tarjetas emergentes (popups/overlays) de cada zona dependían de coordenadas estáticas hardcodeadas. Cualquier ajuste de diseño requería editar código y recompilar. El usuario solicitó un botón de lápiz en la esquina superior derecha que permitiera entrar en modo edición, arrastrar visualmente las tarjetas y calibrar la posición/zoom del plano de forma persistente.
- **Causa raíz técnica**:
  1. No existía capa de persistencia desacoplada para coordenadas del plano y overlays.
  2. Los gestos de swipe (`_onTouchStart`, `_onPointerDown`, `_finishFloorSwipe`) podían interferir con el arrastre de elementos individuales dentro del plano.
  3. No se utilizaba `setPointerCapture` para seguimiento ininterrumpido de punteros/dedos al mover tarjetas rápidamente.
- **Solución implementada en `0.6.8`**:
  1. **Layout Store desacoplado (`src/building-layout-store.ts`)**: Manejo de coordenadas en porcentajes relativos a `.floor-stage`, con clamping estricto (`0%` a `100% - width%`), sanitización de zoom/offset y persistencia en `localStorage` (`witmind_building_layout_v1`).
  2. **Botón Lápiz y Barra de Edición**: Botón `.pencil-btn` flotante en la esquina superior derecha del viewport. Al activarlo, despliega `.edit-toolbar` con controles de paneo direccional (← ↑ ↓ →), zoom (+ / -), centrado, restablecimiento de planta y botón para guardar/salir.
  3. **Arrastre de Overlays con Pointer Events**: Cada `.zone-overlay` en modo edición cuenta con `setPointerCapture` en `pointerdown`, normalización delta a porcentajes y feedback visual (borde cian punteado, cursor `grab`/`grabbing`).
  4. **Protección contra Swipes y Clics no deseados**: Durante `_editMode === true`, los gestos de deslizamiento horizontal entre plantas quedan completamente inhibidos.
  5. **Suite de pruebas unitarias**: [`src/tests/unit/building-customizer.test.ts`](file:///c:/dev/automatizacion-estilo/src/tests/unit/building-customizer.test.ts) validando carga por defecto, persistencia, sujeción a bordes y restablecimiento.
- **Regla preventiva**: Todo modo de edición con arrastre interactivo en web components debe capturar el puntero mediante `setPointerCapture`, inhibir explícitamente los gestos de swipe globales del contenedor padre y usar unidades relativas en porcentaje respecto al contenedor de aspecto ratio controlado.

---

### FALLA M: Encierro en Margen Invisible y Dimensiones Fijas en Overlays del Plano (0.6.8 $\rightarrow$ 0.6.9)
- **Rutas afectadas**: [`src/building-control-panel.ts`](file:///c:/dev/automatizacion-estilo/src/building-control-panel.ts) y [`src/building-layout-store.ts`](file:///c:/dev/automatizacion-estilo/src/building-layout-store.ts).
- **Síntoma real**: Al intentar colocar las tarjetas de zona fuera de las habitaciones o en las franjas vacías (letterboxing) del visor del plano, las tarjetas chocaban contra una pared invisible (`left: 0%` o `78%`, `top: 0%` o `92%`), haciendo imposible despejar el dibujo arquitectónico. Asimismo, las dimensiones de las tarjetas eran fijas e inmodificables.
- **Causa raíz técnica**:
  1. `sanitizeOverlay` forzaba matemáticamente `left` en `[0, 100 - width]` y `top` en `[0, 92]`, asumiendo erróneamente que una tarjeta nunca debía sobrepasar el plano 2D.
  2. No existía en el DOM ni en la lógica ningún controlador o manija de redimensionamiento (`resize`).
- **Solución implementada en `0.6.9`**:
  1. **Lienzo libre y extendido**: Apertura de límites en `sanitizeOverlay` (`left: -40% a 130%`, `top: -25% a 120%`) y `overflow: visible` en `.floor-stage` y `.floor-overlays`, permitiendo situar tarjetas cómodamente en los márgenes circundantes.
  2. **Manija interactiva de redimensionamiento (`.resize-handle`)**: Tirador táctil `⤡` en la esquina inferior derecha con `setPointerCapture` para arrastrar el ancho (10% a 60%).
  3. **Controles rápidos en cabecera**: Botones `[-]` y `[+]` para micro-ajustes de 2% en el ancho con badge informativo.
  4. **Soporte de escala tipográfica**: Campo `scale?: number` (0.7x a 1.4x) persistente.
- **Regla preventiva**: En editores de planos o lienzos gráficos, nunca confinar los elementos flotantes a los límites estrictos de la imagen; los usuarios requieren espacio libre en los márgenes exteriores para ubicar etiquetas sin tapar la arquitectura.




