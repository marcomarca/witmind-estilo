# PLAN DE IMPLEMENTACIÓN — Navegación unificada de WITMIND dentro de Home Assistant

**Documento ejecutable para una IA implementadora.**  
**Estado:** especificación y plan; NO es código ya implementado.  
**Proyecto de referencia:** contenido de `witmind-chatgpt-bundle.zip` recibido el 23-09-2026.  
**Objetivo:** eliminar la doble barra lateral de la vista del plano, hacer inequívoca la navegación entre paneles y preservar los datos, controles y el editor del edificio.

> **INSTRUCCIÓN PRINCIPAL:** ejecuta las fases en el orden indicado. No rediseñes el producto, no inventes entidades, no refactorices módulos ajenos ni publiques una release sin pruebas. Si un requisito no puede verificarse con los archivos disponibles, anota el bloqueo y continúa solo con las tareas independientes.

---

## 0. Resultado exigido

Cuando un usuario abre la vista del edificio desde Home Assistant, debe encontrar:

1. **Una única barra lateral global:** la de Home Assistant, fuera del iframe de WITMIND.
2. **Cabecera WITMIND existente:** marca, título, hora, clima y estado, con sus comportamientos actuales.
3. **Una tira horizontal de accesos internos, no una segunda navegación global:** `Plano`, `Circuitos`, `Ambiente`, `Alarmas` y `Consumo`. Al pulsarlos se desplaza dentro de la **misma página** hasta la tarjeta correspondiente.
4. **El plano existente como foco principal**, selector Planta Baja/Planta Alta, overlays, editor y tabla de circuitos intactos.
5. **La columna de supervisión existente** (alarmas, ambiente, consumo, controles rápidos), sin recrear su lógica.
6. **Sin salto accidental a Showroom, Lobby, Oficinas u otro panel WITMIND al arrastrar horizontalmente** cuando se usa Home Assistant como contenedor. La navegación global la efectúa el sidebar de Home Assistant.
7. **Sin alteraciones de URLs de HA ni cambios de `panel_id` para disimular un error de despliegue.**

Estructura conceptual:

```text
HOME ASSISTANT (padre; NO modificar su barra lateral)
├─ Barra lateral global: Control general, Lobby, Oficinas, etc.
└─ Panel personalizado WITMIND
   └─ iframe de la aplicación
      └─ witmind-workspace [modo navegación gestionada por HA]
         └─ Página actual (p. ej. general)
            └─ witmind-building-panel
               ├─ Cabecera WITMIND (conservar)
               ├─ Accesos contextuales horizontales (NUEVO)
               └─ Dashboard sin sidebar interno
                  ├─ Columna principal: plano + circuitos
                  └─ Columna lateral: alarmas + ambiente + consumo + controles
```

**No crear** cinco rutas/páginas nuevas para los accesos internos. Son anclas de tarjetas existentes, no secciones con contenido independiente.

---

## 1. Inventario exacto del proyecto y alcance

### 1.1. Archivos y responsabilidades comprobados en el ZIP

| Archivo | Responsabilidad | Acción |
|---|---|---|
| `src/building-control-panel.ts` | Custom element `witmind-building-panel`; markup, estilos, plano, overlays, edición y navegación interna. | **Modificar obligatoriamente.** |
| `src/witmind-workspace.ts` | Registro de paneles, montaje de vistas, carrusel y gestos entre paneles. | **Modificar en fase independiente.** |
| `src/witmind-app.ts` | Entrada de la UI aislada; recibe `WITMIND_INIT`, construye workspace y recibe estados del bridge. | **Cambio mínimo para indicar modo de navegación.** |
| `home-assistant/www/witmind-ui-panel.js` | Bridge entre HA e iframe; modos STABLE/DEV/PREVIEW, comunicación y menú HA. | **No modificar**, salvo fallo demostrado e independiente. |
| `src/building-config.ts` | Entidades y zonas reales. | No modificar. |
| `src/building-layout-store.ts` | Persistencia de transformaciones y overlays de planos. | No modificar. |
| `src/ha/WitmindHaClient.ts` | Cliente por `postMessage`. | No modificar. |
| `src/witmind-operations-panel.ts`, `src/witmind-energy-panel.ts`, `src/witmind-admin-panel.ts`, `src/showroom-panel.js` | Resto de paneles. | No rediseñar. Solo probar regresiones. |
| `home-assistant/configuration.yaml.snippet.yaml` | Ejemplos de registro de paneles. | **Leer, no copiar ni desplegar sin contrastar con HA real.** |
| `tools/verify-building-floor-layout.mjs`, `tools/verify-building-live-overlays.mjs` | Pruebas existentes del plano. | Reutilizar y complementar. |
| `tools/verify-mobile-*.mjs` | Pruebas de gestos/arranque heredadas. | Revisar su expectativa por el cambio intencional del carrusel. |
| `tools/release.ps1`, `tools/promote.ps1`, `tools/rollback.ps1` | Publicación inmutable y rollback. | Reutilizar sin reescribir. |

En el snapshot, `home-assistant/www/witmind-ui/current.json` apunta a la versión **0.6.9**. Eso **no prueba** que sea la versión que está ejecutando ahora el HA del usuario. Consultar el `current.json` real antes de elegir la nueva versión.

### 1.2. Inconsistencia de rutas que hay que diagnosticar, no “arreglar” a ciegas

El YAML de ejemplo recibido declara:

```text
/witmind-general   -> panel_id: general -> witmind-building-panel (plano)
/control-general   -> panel_id: control -> witmind-operations-panel
```

Sin embargo, la captura suministrada muestra el plano bajo `/control-general`. Puede haber una configuración instalada distinta del snippet, una release diferente o una asignación modificada. **No supongas que el snippet describe la instalación activa.**

**Procedimiento de identificación obligatorio en la instalación de pruebas:**

1. Abrir la URL que presenta el plano y registrar la URL visible.
2. Leer la configuración efectiva del `panel_custom` correspondiente (solo lectura).
3. Inspeccionar qué `panel_id` envía el bridge en `WITMIND_INIT` o qué configuración recibe `witmind-workspace`; no registrar tokens ni credenciales.
4. Confirmar que el elemento montado sea `witmind-building-panel`.
5. Documentar resultado en el informe. **Esta tarea es de navegación, no de migración de rutas:** si hay discrepancia, mantener la asignación actual y pedir decisión explícita antes de cambiar rutas o alias.

### 1.3. Recursos visuales que pueden faltar

El ZIP tiene el componente que referencia `./building/planta-baja-*.{webp,png}` y `./building/planta-alta-*.{webp,png}`, pero no incluye necesariamente las imágenes reales desplegadas. No fabricar planos de sustitución ni cambiar esas rutas. Para QA visual completo, recuperar únicamente los assets autorizados desde el entorno del proyecto o ejecutar la prueba en HA/DEV donde ya existen. Si no están disponibles, declarar que la prueba visual de geometría con plano real queda **pendiente**, sin afirmar que pasó.

### 1.4. Conflicto con documentación histórica

`docs/PLAN_MAESTRO_CONTROL_EDIFICIO_BMS.md` pide reproducir la captura original, incluida su sidebar propia. Esa obligación histórica corresponde al diseño anterior. **Para esta tarea concreta, este nuevo plan prevalece solo en la decisión de navegación/layout**: eliminar esa sidebar interna. El resto del plano, datos y composición de tarjetas conserva su contrato. Al finalizar, añadir una nota de decisión de arquitectura (ADR) o actualizar un documento de navegación; no borrar el plan histórico.

---

## 2. Restricciones no negociables

- Mantener **Lit + TypeScript**. No migrar a React, Vue, Svelte ni añadir un router.
- Mantener bridge + iframe + `witmind-app` + workspace; no incorporar HA dentro de WITMIND ni reemplazar el menú nativo.
- No usar CSS global, `document.querySelector` ni manipulación del DOM interno de HA para ocultar su sidebar.
- No cambiar la identidad ni la semántica de las entidades de HA; no crear datos ficticios ni llamar servicios distintos.
- No tocar el algoritmo de cálculo eléctrico, los umbrales de alarmas, la telemetría ni el historial.
- No reescribir `FLOOR_META`, proporciones de los planos, posiciones de overlays, almacenamiento de layouts ni herramientas de edición.
- No convertir `Energía` en alias de `Consumo` dentro del nuevo menú: solo usar los cinco accesos de destino único especificados.
- No ofrecer `Reportes` ni `Configuración` como botones falsos: hoy están deshabilitados en la sidebar antigua y no tienen un destino funcional en esta vista. **Quitarlos del menú nuevo sin borrar funcionalidades de otras páginas.**
- No renombrar ni eliminar el botón de menú HA usado en móvil: `_toggleMenu()` emite `hass-toggle-menu`; debe seguir funcionando.
- No prometer que el ancho del plano aumenta exactamente 200 px: desaparece una columna reservada de 200 px en desktop y 70 px en un breakpoint intermedio; la anchura real del plano depende del grid interior.
- No reiniciar HA, cambiar `configuration.yaml` o promover STABLE para probar solo un cambio de CSS/TS. Primero usar desarrollo/preview.
- Preservar el modo carrusel fuera de la integración gobernada por HA, para no romper usos autónomos sin decidirlo expresamente.

---

## 3. Verificación inicial y línea base — ANTES de editar

### Paso 3.1. Preparar una copia segura

1. Abrir el repositorio completo, no únicamente los archivos exportados si hay una copia de desarrollo disponible.
2. Verificar rama y cambios locales. Si existe Git, crear rama de trabajo, por ejemplo `ux/ha-single-navigation`. No descartar cambios ajenos.
3. Registrar la versión estable actual desde el `current.json` de HA **sin modificarlo**.
4. Guardar capturas del estado anterior: escritorio y móvil, dark/light, ambas plantas.
5. Registrar el comportamiento actual de scroll, controles rápidos, barra de HA y swipe del plano.

**Salida:** baseline documentada. Si no existe entorno con imágenes reales, guardar baseline parcial y anotar la limitación.

### Paso 3.2. Leer el código antes de tocarlo

En `src/building-control-panel.ts` localizar las siguientes partes por **símbolos/selectores**, no por números de línea (cambian entre versiones):

```text
render()
  .bms-shell
  header.topbar
  button.menu-button
  aside.sidebar             <-- eliminar
  main.dashboard-grid       <-- conservar
  article#floor-plan
  article#circuits
  article#alerts
  article#environment
  article#consumption
  .quick-card

_scrollTo(id)
_toggleMenu()
_setFloor(...)
_renderFloorOverlays()
_toggleEditMode(...)

static styles = css`...`
  .bms-shell
  .topbar
  .sidebar y reglas asociadas
  .dashboard-grid
  @media (max-width:1180px)
  @media (max-width:820px)
  @media (max-width:520px)
```

En `src/witmind-workspace.ts` localizar:

```text
safePanelId(...)
PANEL_META
config setter
_renderShell()
_mountPages()
_attachPanel()
_renderNav()
_onNavClick(...)
_onPointerDown/Move/Up(...)
_onTouchStart/Move/End(...)
_goTo(...)
_snap(...)
```

En `src/witmind-app.ts` localizar `messageHandler`, `WITMIND_INIT` y `ensurePanel()`. Verificar el orden real de asignación a `workspace`.

### Paso 3.3. Ejecutar las comprobaciones preexistentes

Desde la raíz del repositorio completo:

```bash
npm install                 # solo si faltan dependencias; preferir el lockfile y gestor del repo
npm run test
npm run build:panel
npm run dev                  # dejar servidor Vite escuchando en el puerto configurado: 5174
```

Con Vite disponible, ejecutar los scripts existentes que sean aplicables:

```bash
node tools/verify-building-floor-layout.mjs
node tools/verify-building-live-overlays.mjs
node tools/verify-panel-aliases.mjs
```

No tratar los ejemplos de `run.md` con puerto 5173 como autoridad: **`vite.config.ts` configura 5174** en este snapshot. Si Playwright no tiene Chromium instalado, instalarlo en el entorno de desarrollo, sin convertirlo en dependencia de producción. Si falta una imagen real, distinguir error de recurso ausente de regresión de CSS.

**Condición de salida:** registrar qué comandos pasan/fallan ANTES del cambio. No atribuir a la refactorización fallos que ya estaban presentes.

---

## 4. FASE A — Eliminar la segunda sidebar y crear accesos contextuales

**Ámbito de edición:** `src/building-control-panel.ts`. No mezclar con cambios del workspace en el mismo incremento.

### A.1. Eliminar solo el bloque de navegación interno

En el template de `render()`, quitar **íntegramente**:

```html
<aside class="sidebar" aria-label="Secciones del edificio">
  ...
</aside>
```

Incluye su `side-brand`, el bloque `<nav>` con ocho botones y el bloque `.operator`. **No tocar** `header.topbar`, el botón `.menu-button`, `main.dashboard-grid` ni ninguna `<article>`.

Resultado estructural esperado:

```text
<div class="bms-shell">
  <header class="topbar">...</header>
  <nav class="section-nav" aria-label="Secciones del edificio">...</nav>
  <main class="dashboard-grid">...</main>
</div>
```

### A.2. Crear una tira de cinco botones que apunten a IDs existentes

Insertarla **después** del cierre de `header.topbar` y **antes** de `main.dashboard-grid`.

Mapa exacto y único:

| Texto visible | Destino en DOM | Función |
|---|---|---|
| Plano | `floor-plan` | `_scrollTo("floor-plan")` |
| Circuitos | `circuits` | `_scrollTo("circuits")` |
| Ambiente | `environment` | `_scrollTo("environment")` |
| Alarmas | `alerts` | `_scrollTo("alerts")` |
| Consumo | `consumption` | `_scrollTo("consumption")` |

Ejemplo estructural **orientativo**, que la IA deberá adaptar a `html` de Lit (no copiar como HTML literal):

```ts
<nav class="section-nav" aria-label="Secciones del edificio">
  <button type="button" @click=${() => this._scrollTo("floor-plan")}>Plano</button>
  <button type="button" @click=${() => this._scrollTo("circuits")}>Circuitos</button>
  <button type="button" @click=${() => this._scrollTo("environment")}>Ambiente</button>
  <button type="button" @click=${() => this._scrollTo("alerts")}>Alarmas</button>
  <button type="button" @click=${() => this._scrollTo("consumption")}>Consumo</button>
</nav>
```

No utilizar `role="tablist"`/`role="tab"`: no se están cambiando paneles tabulados, solo desplazando la página. No establecer `aria-current` fijo en Plano: el usuario puede desplazarse manualmente y quedaría una selección falsa. Un indicador activo por intersección **queda fuera de alcance** para esta entrega.

Usar botones semánticos y el `:focus-visible` existente. Si se decide incorporar iconos, reutilizar `renderIcon` y no imponer nuevas dependencias.

### A.3. Reescribir únicamente la composición exterior del CSS

En `static styles = css\`...\``, sustituir la definición de `.bms-shell` de dos columnas por un contenedor vertical de ancho completo. Se recomienda:

```css
.bms-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  /* conservar los backgrounds de dark/light existentes */
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  flex: none;
  min-height: 70px;
  /* conservar colores, bordes, display y contenidos actuales */
}

.section-nav {
  position: sticky;
  top: 70px;
  z-index: 19;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  min-width: 0;
  padding: 6px 14px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
  scrollbar-width: thin;
}

.section-nav button {
  flex: 0 0 auto;
  min-height: 40px;
  padding: 0 13px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-2);
  color: inherit;
  cursor: pointer;
}

.section-nav button:hover { border-color: var(--orange); }
.dashboard-grid { min-width: 0; width: 100%; }
```

**Cuidado:** no reemplazar toda la regla larga de `.topbar` de forma destructiva. La muestra anterior define las propiedades relevantes; fusionar con las existentes. Mantener el `background` de `.bms-shell` y la variante light. No usar un grid nuevo que reserve una primera columna oculta.

### A.4. Retirar reglas obsoletas de `.sidebar`

Buscar y eliminar solo selectores exclusivos de esa sidebar, incluidos:

```text
.sidebar
:host([data-theme=light]) .sidebar
.side-brand
.sidebar nav
.sidebar nav button
.sidebar nav button.active
.sidebar nav button:disabled
.operator
.operator-avatar
.operator div
.operator strong
.operator small
```

Inspeccionar además los `@media` para retirar sus reglas de `.sidebar` y `.operator`. No borrar selectores globales que puedan tener otro uso legítimo.

**Importante:** el CSS de este archivo está parcialmente compactado en líneas muy largas. Usar edición de fragmentos bien delimitados o parser/revisión manual. **No ejecutar una sustitución regex global que borre el resto de la línea CSS.**

### A.5. Adaptar los tres breakpoints existentes

- **Por encima de 1180 px:** cabecera nominal 70 px; tira a `top:70px`; dashboard de dos columnas **internas** con el `1.95fr / 1fr` actual, sin columna para sidebar WITMIND.
- **1180 px o menos y más de 820 px:** cabecera actual de 64 px; tira `top:64px`; conservar las adaptaciones de la tabla y métricas; quitar el viejo grid `70px 1fr` de sidebar y dejar la distribución de contenido interna existente (`1.55fr / 1fr`, si sigue siendo legible).
- **820 px o menos:** conservar el botón `.menu-button` de HA; cabecera 64 px; tira `top:64px`, desplazable **horizontalmente**, sin crear drawer WITMIND; mantener el orden de cards ya definido en el CSS actual.
- **520 px o menos:** botones de tira con área táctil recomendada de al menos 44 px de alto; evitar que la cabecera, selector de plantas o tarjetas generen overflow horizontal. No permitir que el scroll horizontal de la tira cambie de panel.

Si las medidas reales de la cabecera varían tras un cambio futuro, extraer una variable CSS compartida `--wit-header-height` utilizada por `.topbar`, `.section-nav` y offsets de scroll. **En esta entrega** mantener 70/64 px y verificar ambas alturas con Playwright para reducir alcance.

### A.6. Scroll correcto dentro del iframe

El contenedor que realmente hace scroll es `.page` en el Shadow DOM de `witmind-workspace` (`overflow-y:auto`). La implementación actual es:

```ts
private _scrollTo(id: string) {
  this.renderRoot.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

**Primero** conservarla y añadir `scroll-margin-top` a las cinco tarjetas, equivalente a cabecera + tira + separación (medido; no inventar un valor fijo si se superponen). Verificar el resultado en la página real. `scrollIntoView` puede afectar a ancestros desplazables: comprobar que no mueve el documento de HA ni provoca un salto inesperado de iframe.

**Solo si falla**, sustituir `_scrollTo` por un desplazamiento limitado a la `.page` ancestro del host; calcular posición con `getBoundingClientRect()` de target y scroller, sumar `scroller.scrollTop` y restar alturas reales de `.topbar` y `.section-nav` más 8 px. Limitar `top` a >= 0. Respetar `prefers-reduced-motion` para elegir entre `smooth` y `auto`. No implementar un segundo listener de scroll ni modificar el bridge para realizar este ajuste.

Validar que las cinco tarjetas quedan visibles **debajo** de la cabecera y la tira, sin que su título quede oculto.

### A.7. No tocar la funcionalidad del plano

Conservar explícitamente:

```text
_setFloor
_finishFloorSwipe
_renderFloorOverlays
_onOverlayPointerDown / _onOverlayPointerMove / _onOverlayPointerUp
_onOverlayResizeDown / _onOverlayResizeMove / _onOverlayResizeUp
_onStagePointerDown / _onStagePointerMove / _onStagePointerUp
_toggleEditMode y toolbar de edición
_layoutStore, saveBuildingLayout, resetFloorLayout
FLOOR_META y image paths
```

El swipe **entre plantas** sobre `.floor-viewport` no es lo mismo que el swipe **entre paneles** del workspace. El primero se conserva; el segundo se gobierna en Fase B.

### A.8. Criterios de aceptación de la fase A

- [ ] En el Shadow DOM de `witmind-building-panel` hay **0** elementos `aside.sidebar` y **1** `nav.section-nav`.
- [ ] Hay exactamente cinco accesos contextuales, con destinos únicos y existentes.
- [ ] El dashboard ocupa el ancho completo del panel WITMIND, sin espacio reservado de 200/70 px.
- [ ] Desktop conserva plano + circuitos a la izquierda y las tarjetas de supervisión a la derecha.
- [ ] Móvil conserva el orden existente de tarjetas y muestra menú HA operativo.
- [ ] Planta Alta/Baja, edición y controles siguen disponibles.
- [ ] Ningún acceso conduce a una página vacía ni aparece como un “tab” falso.

**Crear un commit o checkpoint antes de iniciar Fase B.**

---

## 5. FASE B — Una sola autoridad para navegar entre paneles

**Ámbito de edición:** `src/witmind-workspace.ts` y cambio pequeño en `src/witmind-app.ts`.

### B.1. Problema que hay que corregir

El workspace renderiza páginas y permite navegar entre `general`, `showroom`, `lobby`, `offices`, `recording`, `energy`, `calendar`, `notifications` y `control`. Aunque `.workspace-nav` se oculta cuando `general` está activo, los handlers de gesto pueden seguir cambiando de página dentro del iframe sin cambiar la URL/entrada activa de Home Assistant. **Ocultar los puntos no desactiva la navegación.**

### B.2. Definir un modo explícito, no detectar por CSS

Crear en `WitmindWorkspace` una propiedad pública tipada, por ejemplo:

```ts
type WorkspaceNavigationMode = "host" | "carousel";
```

Semántica:

- `host`: **Home Assistant gobierna** la navegación entre paneles. El workspace muestra solamente el panel indicado por `panel_id`; no presenta puntos/flechas del carrusel y no interpreta gestos globales de arrastre.
- `carousel`: comportamiento antiguo para vista autónoma/laboratorio que explícitamente quiera usar el carrusel.

No usar `this._activeId === "general"` como único criterio: el problema de doble autoridad afecta a todas las entradas de HA. No usar `narrow` para decidir el modo: el mismo principio aplica a desktop y móvil.

### B.3. Asignar el modo desde `witmind-app.ts`

`WITMIND_INIT` es el protocolo que recibe la UI desde su bridge padre. Al recibirlo, la aplicación debe marcar la navegación como `host` antes de crear o configurar el workspace. En ausencia de INIT (uso autónomo), mantener `carousel`, salvo decisión diferente del producto.

Secuencia recomendada en `messageHandler`:

```text
validar protocolo + origen/fuente como ya se hace
-> registrar modo de navegación = host
-> actualizar panelConfig / signature / narrow / tema
-> ensurePanel() o applyPanelConfig() con modo ya establecido
-> mantener hass y subscripciones actuales
```

En `ensurePanel()`, establecer `workspace.navigationMode` **antes de** `workspace.config`. Si el panel ya existe, actualizar la propiedad sin reconstruirlo innecesariamente. Extender el tipo `PanelElement` para tipar la propiedad; no usar `any` sin necesidad.

**No cambiar el protocolo del bridge ni el objeto `hass`.** El modo es un detalle interno de la UI al procesar el INIT que ya existe.

### B.4. Implementar `host` en `witmind-workspace.ts`

Hacerlo de forma acotada y verificable:

1. Añadir campo privado `_navigationMode` y setter/getter públicos `navigationMode`.
2. El setter debe ignorar asignaciones idénticas; si cambia con el componente conectado, remontar **una sola vez**, solo cuando sea necesario.
3. En `_mountPages()` obtener las definiciones existentes con `_panelConfigs()` y, en modo `host`, filtrar a **la definición cuyo `id === _activeId`** antes de crear las páginas. En `carousel`, conservar todas las definiciones.
4. Mantener `_attachPanel()` como punto de montaje; no clonar su lógica ni duplicar un componente.
5. Hacer que `_renderNav()` oculte/vacíe los indicadores en `host`. No depender de `general` para ocultarlos.
6. En modo `host`, los handlers globales `_onPointerDown`, `_onPointerMove`, `_onPointerUp`, `_onTouchStart`, `_onTouchMove`, `_onTouchEnd` deben **salir sin iniciar/capturar/consumir** un gesto del carrusel. Limpiar cualquier estado de arrastre si se cambia de modo con un gesto pendiente.
7. En `_goTo()`, un intento de pasar a otro ID en modo `host` no debe cambiar `_activeId` ni emitir `witmind-panel-change`. Los cambios de panel válidos llegan por `config.panel_id` desde el padre.
8. En `_snap()`, la única página de modo `host` debe estar siempre en `translate3d(0%, 0, 0)`. No dejar transformaciones de un índice anterior.
9. En `config` setter, al recibir un nuevo `panel_id`, actualizar `_activeId` y montar solamente su nueva vista. Conservar el comportamiento idempotente ante INIT idénticos (sin desmontar al recibir estados/metadata repetidos).
10. Mantener las reglas de `.page` responsables del scroll vertical; **no eliminar `overflow-y:auto`** ni `height:100%`.

No eliminar inmediatamente toda la infraestructura de carrusel: debe seguir funcionando en modo `carousel`, y existe una batería heredada que lo prueba. Tampoco redirigir a `/control-general`, `/witmind-general` o cualquier otra URL desde `_goTo()`; el workspace no debe codificar rutas del host.

### B.5. Evitar regresión de interacción

Un fallo histórico del repositorio describe clics de desktop perdidos por `setPointerCapture` prematuro. En modo `host`, ninguna captura del track debe interferir con botones de luces, escenas o el editor. En modo `carousel`, conservar la protección existente contra clics sintetizados después de swipes, sin reescribir sus algoritmos por este cambio.

Revisar que:

- un clic simple ejecuta exactamente una acción;
- arrastrar el plano sigue cambiando de planta donde está habilitado;
- arrastrar una tarjeta o botón no cambia a otro panel ni activa el control;
- desplazar horizontalmente `.section-nav` solo mueve la tira;
- `hass-toggle-menu` abre la barra de HA en móvil;
- un nuevo INIT con otro `panel_id` muestra ese panel y no deja el anterior visible.

### B.6. Criterios de aceptación de la fase B

- [ ] En HA, `witmind-workspace` crea **solo la página del `panel_id` solicitado**.
- [ ] No aparecen puntos/flechas del carrusel en ningún panel HA.
- [ ] Un swipe global no cambia de panel ni altera la URL del navegador.
- [ ] Los gestos propios del plano siguen operativos.
- [ ] Los demás paneles cargan directamente desde sus entradas de HA.
- [ ] Modo autónomo `carousel`: navegación heredada disponible y ensayada.
- [ ] INIT repetido e idéntico no remonta vistas ni duplica suscripciones.

**Checkpoint independiente de Fase A.**

---

## 6. FASE C — Pruebas automáticas y manuales (obligatorias)

### C.1. Añadir una prueba E2E específica de navegación

Crear un script nuevo en `tools/` con Playwright o extender uno existente sin destruir sus checks. Nombre sugerido: `tools/verify-building-single-navigation.mjs`. No necesita añadirse a producción.

**Preparación:** levantar Vite en 5174, abrir `witmind-ui.html` dentro de un iframe de prueba, enviar `WITMIND_INIT` con `panel_id: "general"`, `panel_kind: "general"`, `theme: "dark"` y usuario de prueba. Esperar al `witmind-building-panel`. Inyectar estados simulados **solo en el harness de QA**, no en código de producto.

**Asserts de DOM obligatorios:**

```text
witmind-building-panel.shadowRoot.querySelectorAll('aside.sidebar').length === 0
witmind-building-panel.shadowRoot.querySelectorAll('nav.section-nav').length === 1
nav.section-nav contiene cinco botones con textos previstos
#floor-plan, #circuits, #alerts, #environment, #consumption existen una vez
workspace en modo host tiene una sola .page
workspace .workspace-nav está oculta o vacía y no interactuable
```

**Asserts de geometría:**

- Tomar `getBoundingClientRect()` del host, `.bms-shell`, `.dashboard-grid`, `.floor-card`, `.floor-viewport` y `.section-nav`.
- `.dashboard-grid` comienza al borde horizontal del panel, salvo padding interno; no hay reserva lateral de sidebar.
- `scrollWidth <= clientWidth + 1` para la página del workspace en resoluciones esperadas. La tira horizontal puede tener su propio `scrollWidth > clientWidth`, pero no debe desbordar el documento.
- Para cada botón: pulsarlo; esperar el scroll; verificar que el título de su tarjeta aparece por debajo de la cabecera+tira sticky y dentro del viewport.
- Probar los cinco destinos en desktop y móvil; no probar únicamente el primero.

**Resoluciones:** 1440×900, 1366×768, 1024×768, 820×900, 390×844 y 375×812. Probar las dos plantas y los dos temas al menos en desktop y móvil; guardar screenshots con nombres inequívocos.

### C.2. Probar la navegación y los gestos

En modo `host`:

1. Inyectar panel `general`; anotar ID activo.
2. Hacer un gesto horizontal suficientemente amplio **fuera del plano**. Verificar ID activo sin cambios y que no se dispara `witmind-panel-change`.
3. Hacer swipe de izquierda a derecha y viceversa **dentro del plano**, con edición desactivada. Verificar que cambia solo `ground/upper` (según el gesto), no el ID del workspace.
4. Hacer scroll horizontal sobre la tira; verificar que la tira se desplaza y la vista `general` permanece.
5. Pulsar un botón de circuitos con servicio simulado; verificar exactamente una llamada y servicio/entidad correctos.
6. Cambiar configuración con INIT a `lobby`, después a `offices`; verificar que se monta el componente correcto y se desmonta/deja de mostrar el anterior.
7. Repetir el mismo INIT; verificar identidad estable cuando no cambió la configuración funcional.

En modo `carousel` autónomo, comprobar al menos que existe el carrusel y que un gesto o botón de navegación cambia de página como antes.

### C.3. Revisar y adaptar las pruebas heredadas sin falsearlas

Hay pruebas antiguas `tools/verify-mobile-card-swipe.mjs` y `tools/verify-mobile-rerender-swipe.mjs` que **esperan** avanzar entre paneles tras recibir un INIT. Tras introducir `host`, esa expectativa será incorrecta por diseño. **No las borres ni las hagas pasar omitiendo asserts.**

Elegir y documentar una de estas estrategias de prueba:

- Ejecutar esas verificaciones sobre una instancia autónoma de `witmind-workspace` configurada en `carousel`, manteniendo el escenario que realmente ensayan; **y** añadir prueba nueva de que `host` bloquea el salto entre paneles.
- Si la estructura de harness no permite ese aislamiento con un cambio pequeño, conservar scripts heredados como referencia y sustituir su uso en CI por dos scripts equivalentes: uno para `carousel` y otro para `host`. Anotar expresamente qué comportamiento de producto cambió.

Actualizar además `tools/verify-mobile-bootstrap.mjs` porque localiza el panel activo mediante `.dot[aria-current="page"]`, indicador que ahora estará oculto/vacío en `host`. El aserto debe leer `workspace`/`.page[data-panel-id]`/componente montado, **no reconstruir puntos artificiales para satisfacer el test**.

### C.4. Regresiones funcionales del BMS

Ejecutar y ampliar los scripts existentes:

```bash
npm run test
npm run build
npm run build:panel
node tools/verify-building-floor-layout.mjs
node tools/verify-building-live-overlays.mjs
node tools/verify-panel-aliases.mjs
node tools/verify-building-single-navigation.mjs
```

Confirmar, con datos simulados controlados o una instalación autorizada:

- temperatura/humedad y overlays pertenecen a la planta seleccionada;
- tabla de zonas cambia con la planta y mantiene los circuitos correctos;
- `Encender luces` y `Apagar luces` llaman los servicios esperados, sin doble ejecución;
- botones deshabilitados de modos no configurados permanecen deshabilitados;
- alarmas no configuradas mantienen su estado vacío correcto;
- consumo e histórico muestran los mismos datos/estados `loading`, `ready`, `unavailable`, `error`;
- `loadBuildingLayout`, edición, guardado y reseteo de overlays siguen funcionando;
- zoom/transforms no se reajustan por el nuevo padding del shell;
- conectividad pendiente/normal se presenta igual que antes;
- menú HA móvil funciona en una prueba **real integrada**, no solo con un evento simulado.

**Precaución:** las pruebas de servicios sobre una instalación real pueden energizar/apagar circuitos. Realizarlas con mocks o en una ventana autorizada, nunca como efecto colateral del despliegue.

### C.5. Criterios visuales

Conservar identidad WITMIND, tipografía, paleta, paneles y densidad visual. Comparar contra la captura original **solo para las zonas no modificadas intencionalmente**. La eliminación de la barra lateral y el desplazamiento del contenido son diferencias esperadas, no fallos del diff. No introducir bloques de marketing, gráficos nuevos, un drawer WITMIND ni una segunda navegación inferior.

---

## 7. FASE D — Integración con Home Assistant y publicación controlada

### D.1. Verificar el destino real

Antes de desplegar:

1. Confirmar el `panel_id` que muestra la vista del plano en la instalación activa (apartado 1.2).
2. Confirmar URL y modo de la instancia DEV/PREVIEW.
3. Leer `current.json` real para identificar la versión estable y el rollback. No confiar solo en los comentarios de documentación antigua.
4. Verificar que no se está cambiando el código de un panel ajeno ni el servicio de HA.

### D.2. Build y comprobación previa

```bash
npm run test
npm run build:panel
```

El build del panel genera **`dist-panel/witmind-ui.html`**. El contrato del bridge exige que cada release publicada tenga **`releases/<version>/index.html`** y sus assets. `tools/release.ps1` realiza esa adaptación; no copiar manualmente una carpeta con `witmind-ui.html` y llamarla release.

### D.3. Publicación en release inmutable

Procedimiento en entorno Windows del proyecto, después de contar con permisos y acceso HA:

```powershell
# Elegir VERSION NUEVA después de consultar la versión real; NO reutilizar una existente.
powershell -File tools/release.ps1 -Version X.Y.Z
```

**Antes de promover:**

- comprobar que la release nueva contiene `index.html` y el directorio `assets/`;
- solicitar por HTTP el HTML y cada `src`/`href` que referencia; exigir 200;
- abrir la nueva versión en PREVIEW y confirmar el plano, las tarjetas y los gestos con HA real;
- respaldar el `current.json` original con ruta registrada;
- tomar captura de pantalla y obtener validación de la fase visual/funcional;
- comprobar que la versión no sobrescribe releases previas.

Solo si todo pasa:

```powershell
powershell -File tools/promote.ps1 -Version X.Y.Z
```

Volver a pedir `current.json` sin caché, comprobar que apunta a X.Y.Z, cargar el `index.html` estable y validar otra vez recursos 200 + vista del edificio. **No afirmar despliegue exitoso por el mero hecho de que los archivos existan en la carpeta compartida.**

### D.4. Rollback

Si falla cualquier comprobación posterior:

```powershell
powershell -File tools/rollback.ps1 -Version VERSION_ANTERIOR_VERIFICADA
```

Verificar por HTTP el puntero y la vista anterior. La reversión es del frontend/versionado; no alterar entidades ni SQLite. No reiniciar HA salvo cambio real de configuración/integración que lo requiera; esta tarea no lo prevé.

### D.5. Documentación de cierre

Añadir una nota breve en `docs/` que declare: `Home Assistant = navegación entre paneles; WITMIND building = navegación interna de cinco anclas; workspace en modo host desactiva carrusel global`. Si el proyecto mantiene historial de regresiones, registrar este cambio en `.agents/skills/witmind-failure-history/SKILL.md` según su estructura. No alterar registros anteriores.

---

## 8. Matriz de aceptación global — definición de terminado

| ID | Condición comprobable | Evidencia mínima |
|---|---|---|
| NAV-01 | Una única sidebar vertical visible: Home Assistant. | Captura integrada desktop y ausencia de `aside.sidebar` WITMIND. |
| NAV-02 | Cinco accesos horizontales con destinos distintos. | Test DOM + clic en todos. |
| NAV-03 | Las tarjetas no quedan detrás de elementos sticky al navegar. | Test de geometría al hacer scroll. |
| NAV-04 | El dashboard recupera el ancho exterior previamente reservado al sidebar interno. | Rectángulos DOM antes/después. |
| NAV-05 | HA es la autoridad entre paneles; swipe no cambia de panel. | Test `host`, URL/ID estables. |
| NAV-06 | Swipe entre plantas y modo edición funcionan. | Tests y verificación visual con imágenes reales. |
| NAV-07 | Los controles no producen dobles llamadas ni servicios distintos. | Spy/mocks de `callService`. |
| NAV-08 | Dark/light y resoluciones desktop/tablet/móvil sin overflow inesperado. | Screenshots y métricas. |
| NAV-09 | Los demás paneles siguen abriendo desde HA por su entrada. | Smoke test por `panel_id`. |
| NAV-10 | No se modificaron datos, integración HA ni rutas arbitrariamente. | Diff revisado. |
| NAV-11 | `npm run test` y `npm run build:panel` pasan; E2E actualizados. | Log con nombres y resultado de cada comando. |
| NAV-12 | Release promovida solo tras HTTP 200 y PREVIEW; rollback conocido. | Versión, URLs verificadas y backup. |

**Si NAV-01 a NAV-11 no se cumplen, no publicar. Si no se dispone del entorno HA real, entregar el código/propuesta de release y declarar NAV-12 como pendiente; no fingir su ejecución.**

---

## 9. Orden de trabajo obligatorio y reglas de parada

Ejecutar exactamente en este orden:

```text
00  Leer repo + verificar ruta/panel_id real o documentar bloqueo
01  Crear baseline + ejecutar tests actuales
02  Modificar SOLO building-control-panel.ts (Fase A)
03  Probar layout, cinco anclas, plano y editor
04  Crear checkpoint
05  Añadir navigationMode host/carousel en workspace y app (Fase B)
06  Probar navegación host y carrusel autónomo
07  Crear checkpoint
08  Añadir/actualizar pruebas y capturas (Fase C)
09  Repetir test, build, E2E y revisión del diff
10  Actualizar documentación de navegación
11  Preparar release NUEVA (sin promover)
12  Verificar HTTP/assets + PREVIEW integrada (Fase D)
13  Promover solo tras validación
14  Verificar STABLE y registrar rollback
```

**Parar e informar**, sin adoptar atajos, cuando:

- el ZIP no contiene archivos requeridos para compilar o probar y no hay repositorio completo;
- la ruta/panel ID en HA resulta distinta del snippet y el cambio solicitado exigiría reasignar rutas;
- faltan las imágenes necesarias para validar visualmente overlays sobre plano real;
- un test de servicios falla y no se puede demostrar que es anterior al cambio;
- un cambio para “arreglar scroll” exige tocar el bridge o HA cuando todavía no se probó el scroll nativo;
- HTTP de `index.html` o assets no devuelve 200;
- no hay confirmación o permisos de publicación.

No usar un fallo preexistente como justificación para ampliar la refactorización a módulos ajenos.

---

## 10. Formato exigido del informe de la IA implementadora

Entregar al finalizar, sin omitir campos:

```markdown
# Informe de implementación

## Estado
- Fase A: completada / parcial / bloqueada
- Fase B: completada / parcial / bloqueada
- Fase C: completada / parcial / bloqueada
- Fase D: completada / pendiente / bloqueada

## Diagnóstico de instalación
- URL real del plano:
- panel_id real:
- custom element efectivamente montado:
- versión estable previa:
- assets de planos disponibles: sí/no

## Cambios realizados
- Archivo: ...
- Cambio exacto: ...
- Razón: ...

## Pruebas
| Comando/escenario | Resultado | Evidencia |
|---|---|---|
| ... | PASS / FAIL / NOT RUN | ... |

## Desviaciones del plan
- ... (si ninguna, escribir "Ninguna")

## Despliegue
- Versión nueva:
- PREVIEW validada: sí/no
- Estado de promoción a STABLE:
- Backup de current.json:
- URLs/HTTP de index, JS, CSS:
- Versión verificada para rollback:

## Riesgos pendientes
- ... (no ocultar bloqueos)
```

El informe debe diferenciar **código implementado**, **prueba local**, **prueba integrada** y **publicación**: son estados distintos.

---

## 11. Texto corto para dar junto con este plan a otra IA

> Implementa `PLAN_IMPLEMENTACION_NAVEGACION_WITMIND.md` sobre el repositorio WITMIND adjunto. Sigue las fases en orden y no amplíes el alcance. Prioriza eliminar la sidebar interna del `witmind-building-panel`, introducir los cinco accesos contextuales y conservar todo el plano y su editor. Después establece `navigationMode: host` al recibir `WITMIND_INIT` para impedir que el workspace navegue entre paneles por swipe dentro de Home Assistant; conserva el carrusel autónomo. Ejecuta y adapta pruebas sin falsear sus asertos. No cambies rutas HA, bridge, entidades ni releases estables por suposición. Reporta archivos modificados, tests con resultado y cualquier bloqueo real. No publiques sin PREVIEW validada, HTTP 200 de assets y rollback identificado.
