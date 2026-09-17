# WITMIND SIGNATURE UI
## MASTER-SPEC — Plan maestro de implementación

> **ESTADO:** Proyecto nuevo desde cero  
> **ROL:** Contrato persistente del proyecto  
> **REFERENCIAS VISUALES:** `showroom-witmind-os.html` y `showroom-witmind-os-light.html`  
> **OBJETIVO:** Construir un sistema UI reutilizable, premium, mantenible y adaptable para todas las vistas futuras de Witmind.  
> **DESTINO:** Home Assistant Custom Panel / Web Components.  
> **PRINCIPIO CENTRAL:** El sistema debe ser estricto en identidad y flexible en composición.

---

# 0. REGLA DE LECTURA OBLIGATORIA PARA CUALQUIER IA

Este archivo **NO debe resumirse, condensarse, reemplazarse ni reescribirse como una versión corta**.

Cada IA que trabaje en el proyecto debe:

1. Leer este archivo completo antes de cambiar código.
2. Tratar este archivo como contrato persistente y fuente de intención del proyecto.
3. No crear un resumen que sustituya este documento.
4. Si necesita resumir internamente para razonar, ese resumen no reemplaza este archivo.
5. Antes de implementar una tarea, identificar explícitamente:
   - fase actual;
   - archivos que se tocarán;
   - componentes existentes que se reutilizarán;
   - patrón de vista aplicable;
   - excepciones necesarias;
   - criterios de aceptación.
6. No avanzar de fase mientras el gate de la fase actual no esté cumplido.
7. No rediseñar silenciosamente módulos ya aceptados.
8. No introducir una librería nueva sin justificar por qué el stack actual no cubre el caso.
9. No crear valores visuales arbitrarios si existe un token equivalente.
10. No forzar un patrón existente sobre un caso nuevo cuando perjudique función, legibilidad, jerarquía o interacción.

---

# 1. MISIÓN

Crear desde cero una plataforma llamada **Witmind Signature UI**.

No se está construyendo solamente un dashboard. Se está construyendo:

- un design system;
- un sistema de interacción;
- un sistema tipográfico;
- un sistema de estados;
- una librería de visualización;
- una librería de primitives;
- una librería de patterns;
- un UI Lab;
- una implementación de referencia para Showroom;
- un skill adaptativo para futuras IAs;
- pruebas funcionales y visuales;
- un bundle integrable con Home Assistant.

Los archivos:

```text
showroom-witmind-os.html
showroom-witmind-os-light.html
```

son **referencias visuales y de intención**.

No modificarlos. No extender su CSS. No usarlos como nueva base técnica. Estudiar sus proporciones, tipografía, jerarquía, paleta y relación dark/light; luego reconstruir el sistema desde cero de forma estructurada.

---

# 2. RESULTADO FINAL ESPERADO

El sistema debe permitir construir muchas vistas diferentes que se sientan parte del mismo producto:

```text
Home / Overview
Lighting
Scenes
Media
Energy
Analytics
Diagnostics
Settings
Climate
Rooms
Devices
Security
Schedules
Calendar
Automation
Status
Maintenance
```

Las vistas no tienen que compartir el mismo layout. Deben compartir:

```text
tipografía
tokens
materiales
iconografía
semántica de color
estados
motion
ritmo espacial
gramática de interacción
visualizaciones
primitives
patterns
```

---

# 3. PRINCIPIO DE PRODUCTO

El resultado debe sentirse como software comercial de automatización arquitectónica premium.

Debe transmitir:

```text
calma
precisión
calidad
claridad
profesionalismo
sofisticación
control
coherencia
confianza
```

No debe sentirse como:

```text
tema de Home Assistant
dashboard Lovelace
demo CSS
plantilla Bootstrap
Material UI genérico
admin dashboard
prototipo Dribbble
glassmorphism experimental
```

---

# 4. PRINCIPIO DE MARCA

El naranja Witmind:

```text
#f26522
```

es una **fuente de luz/acento**, no un color de relleno dominante.

Debe representar principalmente:

```text
active
selected
brand emphasis
primary chart series
interactive highlight
energy / lighting accent
```

No debe representar:

```text
success
warning
danger
```

Semántica global:

```text
active      -> Witmind orange
success     -> green
warning     -> amber
danger      -> red
unavailable -> desaturated / reduced opacity
disabled    -> reduced interaction/contrast
```

---

# 5. REFERENCIAS CONGELADAS Y NUEVA ALTERNATIVA

No modificar:

```text
showroom-witmind-os.html
showroom-witmind-os-light.html
```

Crear una nueva alternativa:

```text
showroom-witmind-signature.html
showroom-witmind-signature-light.html
```

Ambas deben cargar la **misma implementación**.

Oscuro:

```html
<showroom-witmind-signature></showroom-witmind-signature>
```

Claro:

```html
<showroom-witmind-signature theme="light"></showroom-witmind-signature>
```

No crear implementaciones separadas tipo:

```text
signature-dark.js
signature-light.js
```

---

# 6. STACK TECNOLÓGICO OBLIGATORIO

## 6.1 Aplicación

Usar:

```text
TypeScript
Lit
Web Components
Shadow DOM
```

Lit es responsable de:

```text
render declarativo
reactividad
lifecycle
actualizaciones parciales
encapsulación
```

No usar reconstrucción masiva de `shadowRoot.innerHTML` como motor principal.

No usar React, Vue ni Svelte.

## 6.2 Build

Usar:

```text
Vite
```

Desarrollo:

```text
Vite dev server
```

Producción:

```text
Vite library mode
```

Artefacto objetivo:

```text
dist/showroom-witmind-signature.js
```

## 6.3 Tipografía

Usar:

```text
Manrope
```

Preferir distribución local/self-hosted:

```text
@fontsource-variable/manrope
```

La app debe verse correctamente sin Internet.

## 6.4 Iconografía

Usar:

```text
Lucide
```

No mezclar:

```text
emoji
Material Icons
Font Awesome
múltiples SVG packs
pictogramas aleatorios
```

Escalas:

```text
18px
22px
28px
36px
```

Stroke por defecto:

```text
1.8px
```

Permitir pequeñas correcciones ópticas.

## 6.5 Visualización

Usar:

```text
Apache ECharts 6
```

ECharts será el motor para:

```text
gauges
sparklines
energy bars
line charts
area charts
comparativas
historical trends
visualizaciones temporales
```

Las vistas NO deben usar ECharts directamente. Deben usar la capa `WitViz`.

## 6.6 Motion

Usar:

```text
Motion
```

Solo para:

```text
sheet enter/exit
popover enter/exit
page transition
state confirmation
selected-card transitions
number transitions cuando aporten contexto
```

Hover/pressed simples deben resolverse con CSS.

## 6.7 Testing

Usar:

```text
Vitest
Playwright
```

Vitest:

```text
controllers
formatters
config normalization
visualization preset builders
pure utilities
```

Playwright:

```text
interactions
responsive
visual regression
dark/light
keyboard
navigation
sheets
```

---

# 7. LIBRERÍAS PROHIBIDAS POR DEFECTO

No introducir sin necesidad demostrada:

```text
React
Vue
Svelte
Redux
Zustand
MobX
XState
Tailwind
Bootstrap
Material UI
Swiper
Highcharts
D3 como motor general
Chart.js
ApexCharts
```

Antes de agregar una librería, comprobar si CSS + Lit + ECharts + Motion + Lucide ya resuelven el problema.

---

# 8. ESTADO DE APLICACIÓN

No agregar state manager global complejo inicialmente.

Fuente externa:

```text
Home Assistant hass object
```

Estado local esperado:

```text
active view
active sheet
selected period
current page
temporary loading state
temporary interaction state
local UI preferences
```

Lit reactive state debe ser suficiente.

---

# 9. CONTRATO HOME ASSISTANT

Leer desde:

```ts
hass.states
```

Acciones:

```ts
hass.callService(...)
```

Consultas:

```ts
hass.callWS(...)
```

ó:

```ts
hass.connection.sendMessagePromise(...)
```

Suscripciones:

```ts
hass.connection.subscribeEvents(...)
hass.connection.subscribeMessage(...)
```

Prohibido:

```text
mutar hass.states directamente
mutar estados privados del mock desde UI
inventar entidades
```

---

# 10. MOCK

Durante desarrollo usar el mock Home Assistant existente.

No crear un mock específico para Signature salvo que sea necesario representar una capacidad real de HA todavía no soportada.

Objetivo:

```text
mismo mock
  -> múltiples variantes
```

Signature debe poder pasar del mock a Home Assistant real sin reescribir el modelo de comunicación.

---

# 11. ESTRUCTURA OBJETIVO

```text
witmind-signature/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
│
├── src/
│   │
│   ├── showroom-witmind-signature.ts
│   │
│   ├── types/
│   │   ├── home-assistant.ts
│   │   ├── showroom.ts
│   │   └── visualization.ts
│   │
│   ├── config/
│   │   ├── entities.ts
│   │   ├── showroom.config.ts
│   │   └── normalize-config.ts
│   │
│   ├── controllers/
│   │   ├── hass-controller.ts
│   │   ├── lights-controller.ts
│   │   ├── scenes-controller.ts
│   │   ├── media-controller.ts
│   │   ├── weather-controller.ts
│   │   └── energy-controller.ts
│   │
│   ├── design-system/
│   │   │
│   │   ├── tokens/
│   │   │   ├── foundation.css
│   │   │   ├── semantic-dark.css
│   │   │   ├── semantic-light.css
│   │   │   ├── typography.css
│   │   │   ├── motion.css
│   │   │   └── visualization.css
│   │   │
│   │   ├── primitives/
│   │   │   ├── surface.ts
│   │   │   ├── button.ts
│   │   │   ├── icon-button.ts
│   │   │   ├── status-pill.ts
│   │   │   ├── stat.ts
│   │   │   ├── segmented-control.ts
│   │   │   ├── sheet.ts
│   │   │   ├── switch.ts
│   │   │   └── empty-state.ts
│   │   │
│   │   └── patterns/
│   │       ├── overview.ts
│   │       ├── detail.ts
│   │       ├── control.ts
│   │       ├── analytics.ts
│   │       ├── diagnostics.ts
│   │       └── sheet-layout.ts
│   │
│   ├── visualization/
│   │   ├── echarts.ts
│   │   ├── themes/
│   │   │   ├── witmind-dark.ts
│   │   │   └── witmind-light.ts
│   │   ├── presets/
│   │   │   ├── gauge.ts
│   │   │   ├── sparkline.ts
│   │   │   ├── energy-bars.ts
│   │   │   ├── area-trend.ts
│   │   │   └── line-trend.ts
│   │   └── wit-viz.ts
│   │
│   ├── views/
│   │   ├── home-view.ts
│   │   ├── lights-view.ts
│   │   ├── energy-view.ts
│   │   ├── scenes-view.ts
│   │   ├── media-view.ts
│   │   ├── more-view.ts
│   │   └── diagnostics-view.ts
│   │
│   ├── components/
│   │   ├── app-header.ts
│   │   ├── bottom-dock.ts
│   │   ├── lighting-summary.ts
│   │   ├── weather-summary.ts
│   │   ├── energy-summary.ts
│   │   ├── media-summary.ts
│   │   └── scene-shortcuts.ts
│   │
│   └── utilities/
│       ├── formatting.ts
│       ├── entity.ts
│       ├── responsive.ts
│       └── accessibility.ts
│
├── lab/
│   └── index.html
│
├── skills/
│   └── witmind-ui/
│       ├── SKILL.md
│       ├── PATTERNS.md
│       ├── EXCEPTIONS.md
│       └── EXAMPLES.md
│
└── tests/
    ├── unit/
    └── visual/
```

No crear todos los archivos vacíos desde el inicio. La estructura define ownership; crear archivos cuando la fase los necesite.

---

# 12. JERARQUÍA DE FUENTES DE VERDAD

Cuando dos decisiones entren en conflicto:

```text
1. Accesibilidad y corrección funcional
2. Contrato Home Assistant
3. Semantic design tokens
4. Existing reusable primitive
5. Existing documented pattern
6. Existing visualization preset
7. Witmind UI Skill
8. Local design judgment
```

Una decisión local no puede romper silenciosamente niveles 1–6.

---

# 13. DESIGN SYSTEM = CÓDIGO EJECUTABLE

El Design System real es:

```text
tokens
primitives
patterns
visualization presets
motion presets
```

No es el Skill. No es un PDF. No es una descripción textual.

---

# 14. GRUPOS DE TOKENS OBLIGATORIOS

Definir:

```text
COLOR
TYPE
SPACE
SIZE
RADIUS
ELEVATION
MOTION
BLUR
OPACITY
Z-INDEX
CHART
```

---

# 15. FOUNDATION TOKENS

Foundation contiene valores crudos.

Ejemplo:

```css
--wit-brand-orange: #f26522;

--wit-space-1: 4px;
--wit-space-2: 8px;
--wit-space-3: 12px;
--wit-space-4: 16px;
--wit-space-5: 24px;
--wit-space-6: 32px;

--wit-radius-control: 14px;
--wit-radius-card: 22px;
--wit-radius-panel: 28px;
--wit-radius-pill: 999px;
```

Los componentes deben preferir tokens semánticos sobre valores raw.

---

# 16. SEMANTIC TOKENS

```css
--wit-color-canvas
--wit-color-surface
--wit-color-surface-raised
--wit-color-surface-floating

--wit-color-text-primary
--wit-color-text-secondary
--wit-color-text-tertiary

--wit-color-border
--wit-color-border-strong

--wit-color-accent
--wit-color-success
--wit-color-warning
--wit-color-danger

--wit-shadow-surface
--wit-shadow-raised
--wit-shadow-modal
```

---

# 17. TEMA OSCURO

Dirección:

```text
carbón
petróleo
negro azulado
warm dark
```

No:

```text
black + neon
```

Referencia inicial:

```text
canvas:            #071118
surface:           #10191e
surface raised:    #162126
interactive:       #1b282e
text primary:      #f5f6f4
text secondary:    #adb4b6
text tertiary:     #747e82
```

El naranja se comporta como luz controlada.

---

# 18. TEMA CLARO

Dirección:

```text
porcelain
stone
architectural white
warm neutral
```

No:

```text
pure white
cold SaaS gray
```

Referencia inicial:

```text
canvas:            #f3f3ef
surface:           rgba(255,255,255,.82)
surface raised:    rgba(255,255,255,.95)
text primary:      #182126
text secondary:    #667176
text tertiary:     #92999c
border:            rgba(18,32,38,.08)
```

Dark y Light comparten layout, spacing, radii, dimensiones, tipografía, interacción, jerarquía, iconos y gramática de visualización.

---

# 19. TIPOGRAFÍA

Una sola familia:

```text
Manrope
```

Pesos permitidos por defecto:

```text
400 regular
500 medium
600 semibold
700 bold
```

Uso recomendado:

```text
400 -> body / descriptive
500 -> values / controls
600 -> titles / selected controls
700 -> major emphasis only
```

No usar 800/900 rutinariamente.

---

# 20. TYPE ROLES

```text
display
hero
kpi
title
body
label
meta
```

Referencia:

```css
--wit-type-display-size: 56px;
--wit-type-display-line: 1;

--wit-type-hero-size: 36px;
--wit-type-hero-line: 1.08;

--wit-type-kpi-size: 32px;
--wit-type-kpi-line: 1.05;

--wit-type-title-size: 18px;
--wit-type-title-line: 1.2;

--wit-type-body-size: 14px;
--wit-type-body-line: 1.45;

--wit-type-label-size: 12px;
--wit-type-label-line: 1.35;

--wit-type-meta-size: 11px;
--wit-type-meta-line: 1.35;
```

Texto operativo importante: normalmente `>= 12px`.

---

# 21. NÚMEROS

Para:

```text
time
energy
power
temperature
percentage
measurements
```

usar:

```css
font-variant-numeric: tabular-nums;
font-feature-settings: "tnum" 1;
```

---

# 22. SPACING

Escala preferida:

```text
4
8
12
16
24
32
40
48
```

No convertirla en ley matemática. Se permiten correcciones ópticas justificadas.

Ejemplo válido:

```text
icon/text gap = 10px
```

si 8 es demasiado corto y 12 demasiado amplio.

---

# 23. RADII

Defaults:

```text
control -> 14px
card -> 22px
large panel -> 28px
pill -> 999px
```

Son `SHOULD`, no `MUST`.

---

# 24. ELEVATION

Tres niveles principales:

```text
surface
raised
modal
```

No crear una sombra diferente por widget.

---

# 25. SURFACE HIERARCHY

## Level 0 — Canvas

Background global.

## Level 1 — Content

Ejemplos:

```text
weather
energy
rooms
system
media
analytics cards
```

Debe ser calmado, relativamente opaco y con poco glass.

## Level 2 — Floating

Ejemplos:

```text
status pills
dock
popover
toolbar
sheet
floating controls
```

Puede usar más transparencia, blur y profundidad.

---

# 26. PRINCIPIO DE GLASS

Glass comunica:

```text
depth
floating controls
modal hierarchy
temporary layers
```

No es decoración universal.

---

# 27. STATE LANGUAGE GLOBAL

Estados estándar:

```text
default
hover
pressed
focused
active
pending
success
warning
danger
unavailable
disabled
```

La semántica debe ser única en todo el producto.

---

# 28. ACTIVE

Representa:

```text
selected
on
current
chosen
primary interaction state
```

Color principal: Witmind accent.

---

# 29. SUCCESS

Reservar para:

```text
confirmed operation
healthy connection
successful completion
```

No usar success green como color general de un dispositivo ON.

---

# 30. WARNING / DANGER / UNAVAILABLE

Warning:

```text
attention
near threshold
degraded state
```

Danger:

```text
error
critical threshold
destructive operation
```

Unavailable:

```text
desaturation
lower opacity
explicit status if operationally important
```

---

# 31. PRIMITIVES INICIALES

Construir primero:

```text
Surface
Button
IconButton
StatusPill
Stat
SegmentedControl
Sheet
Switch
EmptyState
```

No construir 25 widgets de negocio antes de estabilizar primitives.

---

# 32. PRIMITIVE VS PATTERN VS WIDGET

Primitive:

```text
button
pill
surface
switch
sheet
```

Pattern:

```text
overview layout
control group
analytics panel
detail layout
diagnostics layout
```

Widget:

```text
Lighting Summary
Energy Summary
Weather Summary
```

No mezclar responsabilidades.

---

# 33. CLASIFICACIÓN DE VISTAS

Toda vista nueva debe clasificarse antes de implementarse:

```text
overview
control
detail
analytics
diagnostics
sheet
empty/error
```

---

# 34. OVERVIEW PATTERN

Objetivo: glanceability.

Características:

```text
low density
large values
few controls
summary data
strong hierarchy
minimal charts
```

Distancia de uso esperada: `0.5–2m`.

---

# 35. CONTROL PATTERN

Objetivo: acción directa.

```text
large touch targets
clear state
immediate feedback
simple groups
few secondary metrics
```

---

# 36. DETAIL PATTERN

Objetivo: inspeccionar + ajustar.

Puede incluir:

```text
secondary values
history
configuration
advanced actions
```

---

# 37. ANALYTICS PATTERN

Objetivo: comparar + explorar + entender tendencias.

Puede incluir:

```text
axes
tooltips
filters
time ranges
multiple series
tables
zoom/pan
```

---

# 38. DIAGNOSTICS PATTERN

Objetivo: troubleshooting.

Puede incluir:

```text
entity IDs
timestamps
technical statuses
errors
telemetry
raw metadata
```

Aquí la función puede vencer al minimalismo.

---

# 39. SHEET PATTERN

Objetivo: progressive disclosure.

Home muestra resumen. Sheet muestra detalle.

---

# 40. INFORMATION HIERARCHY

Cada widget Home normalmente tiene:

```text
ONE primary fact
ONE secondary fact
ONE context/action
```

Ejemplo Energy:

```text
432 W
26.11 kWh this month
sparkline
```

No meter ocho métricas en Home.

---

# 41. PREMIUM HOME

Home debe tener jerarquía asimétrica:

```text
1 primary element
2–3 secondary elements
remaining tertiary context
```

No crear una pared de cards equivalentes.

---

# 42. ICON SYSTEM

Lucide defaults:

```text
stroke width 1.8
round caps
round joins
```

Inactive -> text-secondary.  
Active -> accent.  
Success -> success.  
Warning -> warning.  
Danger -> danger.

---

# 43. WITVIZ — REGLA CENTRAL

Las vistas no llaman ECharts directamente.

API:

```ts
WitViz.gauge(...)
WitViz.sparkline(...)
WitViz.energyBars(...)
WitViz.areaTrend(...)
WitViz.lineTrend(...)
```

Views proporcionan:

```text
data
intent
labels
units
period
interaction requirements
```

WitViz controla:

```text
theme
font
colors
grid
tooltip
animation
responsive
dark/light
```

---

# 44. WITVIZ GAUGE API

```ts
WitViz.gauge(element, {
  kind: "load",
  value: 31,
  min: 0,
  max: 100,
  valueLabel: "31%",
  secondaryLabel: "432 W"
});
```

---

# 45. WITVIZ SPARKLINE API

```ts
WitViz.sparkline(element, {
  data,
  tone: "accent"
});
```

---

# 46. WITVIZ ENERGY BARS API

```ts
WitViz.energyBars(element, {
  data,
  currentIndex,
  period: "day"
});
```

---

# 47. ADVANCED VISUALIZATION OVERRIDES

No exponer todo ECharts a cualquier vista.

Permitir override avanzado solo cuando:

```text
existing preset cannot satisfy a documented real requirement
```

Documentar la excepción.

---

# 48. ECHARTS THEMES

Crear:

```text
witmind-dark
witmind-light
```

Derivados de semantic tokens.

No hardcodear un theme distinto por gráfico.

---

# 49. CHART SEMANTICS

Primary series -> accent.  
Secondary -> quiet neutral.  
Comparison -> secondary semantic tone.  
Grid -> very low contrast.  
Axis -> secondary/tertiary text.

---

# 50. PREMIUM GAUGE STANDARD

Default gauge:

```text
semicircular progress
no needle
round caps
quiet track
no minor ticks
no useless labels
large central value
small secondary measurement
```

Ángulos sugeridos:

```text
start: 210°
end: -30°
```

---

# 51. LOAD GAUGE THRESHOLDS

Para carga eléctrica:

```text
0–60%    accent
60–85%   warning
85–100%  danger
```

Los thresholds viven en preset/config, no en cada vista.

---

# 52. HOME CHART STANDARD

Home chart es contexto, no analytics.

Por defecto:

```text
no axis
no legend
no grid
no zoom
few/no labels
```

Tipos:

```text
sparkline
mini bars
small area trend
```

---

# 53. ANALYTICS CHART STANDARD

Puede usar:

```text
axes
tooltips
period controls
zoom/pan
comparison
multiple series
annotations
```

Mantener grid quieto, labels selectivos y series primarias evidentes.

---

# 54. MOTION TOKENS

```text
fast    140ms
normal  200ms
modal   300ms
```

Ease:

```text
cubic-bezier(.2,.8,.2,1)
```

---

# 55. MOTION PRINCIPLE

Motion comunica:

```text
cause
effect
state
depth
navigation
```

No decoración.

---

# 56. NO PERMANENT MOTION

Prohibido salvo pending/loading:

```text
breathing
floating
permanent glow
continuous pulse
decorative loops
```

---

# 57. SHEET MOTION

Apertura sugerida:

```text
opacity 0 -> 1
translateY 12px -> 0
scale .985 -> 1
~300ms
```

Backdrop: dim + modest blur.  
Dashboard: recede visualmente.

---

# 58. REDUCED MOTION

Respetar:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 59. TOUCH

Target principal: tablet landscape.

Targets:

```text
minimum ~44x44
prefer 48px for primary actions
```

Si no cabe contenido, reducir información; no reducir controles.

---

# 60. RESPONSIVE TARGETS

Obligatorios:

```text
1024x768
1366x768
1440x900
1920x1080
```

Prioridad:

```text
1366x768
1440x900
```

Usar container queries cuando la anchura del componente importe más que el viewport.

---

# 61. SAFE AREAS

Soportar:

```css
env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)
```

---

# 62. ACCESSIBILITY

Implementar:

```text
keyboard focus
visible focus
aria-label
aria-pressed
aria-selected
correct roles
sufficient contrast
reduced motion
touch size
```

---

# 63. ERROR STATES

Todo componente debe soportar:

```text
loading
empty
unknown
unavailable
error
stale
```

Nunca mostrar:

```text
undefined
NaN
null
undefined%
NaN W
```

---

# 64. LOADING

Preferir:

```text
skeleton / stable previous data
```

Evitar spinners grandes que bloquean la UI.

Durante refresh conservar último dato válido cuando sea seguro.

---

# 65. PERFORMANCE

No rerenderizar toda la app continuamente.

Charts:

```text
ResizeObserver
reuse ECharts instances
dispose on disconnect
```

Subscriptions: centralizar cuando sea posible. No crear múltiples subscriptions redundantes por widget.

---

# 66. UI LAB — OBLIGATORIO

Antes de construir muchas vistas crear:

```text
showroom-witmind-signature-lab.html
```

El Lab es la referencia visual ejecutable.

---

# 67. UI LAB — TYPOGRAPHY

Mostrar:

```text
Display
Hero
KPI
Title
Body
Label
Meta
```

Dark y Light.

---

# 68. UI LAB — COLORS

Mostrar:

```text
brand
semantic colors
surfaces
text
borders
state colors
```

---

# 69. UI LAB — PRIMITIVES

Mostrar:

```text
buttons
icon buttons
switches
pills
cards
stats
segmented controls
sheets
empty states
```

---

# 70. UI LAB — STATES

Mostrar:

```text
default
hover
pressed
focused
active
pending
success
warning
danger
unavailable
disabled
```

---

# 71. UI LAB — VISUALIZATION

Mostrar:

```text
Load Gauge
Sparkline
Energy Bars
Area Trend
Line Trend
```

Dark y Light.

---

# 72. UI LAB — RESPONSIVE

Verificar:

```text
wide
tablet
narrow
```

No crear un Lab que solo funcione en 1920px.

---

# 73. PRIMERA APP DE REFERENCIA

Después del Lab construir:

```text
Showroom Signature Home
```

Módulos iniciales:

```text
Header / status
Showroom hero
Lighting summary
Weather
Energy
Media
Scenes
System
Bottom dock
```

---

# 74. HOME ES UNA PRUEBA DEL SISTEMA

Home no es la fuente del design system.

Si Home necesita una pieza inexistente, determinar si es:

```text
primitive
pattern
widget-specific
```

No añadir hacks locales inmediatamente.

---

# 75. LIGHTING SUMMARY

Home:

```text
primary: lights on
secondary: power
context: zones
```

Tap -> Lights Detail / Sheet.

---

# 76. WEATHER SUMMARY

Home:

```text
primary: temperature
secondary: condition
context: high/low or short forecast
```

---

# 77. ENERGY SUMMARY

Home:

```text
primary: current power OR principal selected KPI
secondary: period total
context: sparkline
```

---

# 78. MEDIA SUMMARY

Playing:

```text
title
artist/source
play/pause
```

Puede ganar presencia contextual.

Idle: compactar.

---

# 79. SCENES SUMMARY

Home: 2–4 escenas principales. No mostrar todas las secundarias.

---

# 80. SYSTEM SUMMARY

Home: solo estado accionable.

Battery normal -> quiet.  
Battery low -> promote warning.

---

# 81. CONTEXTUALITY

Ejemplos:

```text
media playing -> Media gains prominence
battery < 25 -> warning chip
lights = 0 -> Lighting simplifies
entity unavailable -> warning promoted
everything healthy -> avoid repetitive OK
```

---

# 82. SKILL ADAPTATIVO

Crear después de que Design System + UI Lab tengan ejemplos reales.

Ruta:

```text
skills/witmind-ui/SKILL.md
```

El Skill NO es el Design System.

---

# 83. SKILL — CLASES DE REGLAS

Usar:

```text
MUST
SHOULD
MAY
```

---

# 84. MUST

Invariantes:

```text
accessibility
semantic colors
Home Assistant contract
theme parity
no fake entities
correct user feedback
```

Una vista normal no rompe MUST.

---

# 85. SHOULD

Defaults fuertes:

```text
card radius
card padding
standard gap
type roles
standard surfaces
chart presets
```

Se pueden adaptar cuando el caso real lo justifica.

---

# 86. MAY

Preferencias contextuales:

```text
2 vs 3 columns
icon position
bar vs line
horizontal vs vertical KPI
card spans
```

---

# 87. PROTOCOLO PARA CASO NUEVO

Cuando aparezca un caso no contemplado:

## Paso 1
Definir tarea principal del usuario.

## Paso 2
Clasificar vista:

```text
overview
control
detail
analytics
diagnostics
sheet
empty/error
```

## Paso 3
Buscar patrón existente.

## Paso 4
Clasificar compatibilidad:

```text
compatible
partially compatible
incompatible
```

## Paso 5 — Compatible
Reutilizar patrón.

## Paso 6 — Parcial
Mantener MUST y adaptar SHOULD.

## Paso 7 — Incompatible
Crear variante local.

## Paso 8
Documentar:

```text
what changed
why
which SHOULD was overridden
whether reusable
```

---

# 88. NO FORZAR PATRONES

Prohibido meter un caso en un patrón porque “se parece” si empeora:

```text
function
legibility
hierarchy
interaction
```

---

# 89. THREE-USE RULE

Primera aparición:

```text
exception
```

Segunda:

```text
pattern candidate
```

Tercera:

```text
review for official reusable pattern
```

No promover automáticamente. Revisar primero.

---

# 90. EXCEPCIÓN VÁLIDA

Standard:

```text
card padding = 24px
```

Analytics necesita chart full-bleed:

```text
header uses 24px
chart viewport edge-to-edge
```

Válido: se rompe SHOULD, no MUST.

---

# 91. EXCEPCIÓN INVÁLIDA

“Esta card se ve linda verde” cuando green significa success.

Inválido: rompe semántica global.

---

# 92. SKILL — QUESTIONS BEFORE DESIGN

Antes de implementar una vista:

```text
What is the user's main goal?
Is it glanceable or analytical?
Is it control or information?
What is primary information?
What is secondary?
What needs direct action?
What is the viewing distance?
Touch or mouse?
Which pattern fits?
Which primitive already exists?
Which WitViz preset fits?
Is a new pattern truly necessary?
```

---

# 93. SKILL — SOURCE PRIORITY

Consultar primero:

```text
tokens
primitives
patterns
UI Lab
WitViz presets
EXCEPTIONS.md
EXAMPLES.md
```

No inventar antes de inspeccionar el sistema.

---

# 94. SKILL — NO CSS DUMP

SKILL.md no debe duplicar el CSS completo.

Debe decir:

```text
use standard card radius token
```

No copiar valores repetidos en decenas de lugares.

---

# 95. PATTERNS.md

Documentar:

```text
when to use overview
when to use control
when to use analytics
when to use sheet
composition guidance
density guidance
allowed deviations
```

---

# 96. EXCEPTIONS.md

Registrar:

```text
context
rule overridden
reason
scope
whether reusable
decision/date
```

---

# 97. EXAMPLES.md

Mostrar:

```text
good
bad
why
```

No limitarse a screenshots: explicar la decisión.

---

# 98. VISUAL REGRESSION

Playwright screenshots mínimo:

```text
UI Lab dark
UI Lab light
Home dark
Home light
Load Gauge dark/light
Energy Detail dark/light
Lights Sheet dark/light
```

---

# 99. TEST RESOLUTIONS

```text
1024x768
1366x768
1440x900
1920x1080
```

---

# 100. NO ACTUALIZAR GOLDENS A CIEGAS

Si falla screenshot:

```text
inspect
understand
decide
```

No actualizar snapshots automáticamente sin revisar.

---

# 101. PHASE 0 — BOOTSTRAP

Objetivo: proyecto compila.

Crear:

```text
Vite
TypeScript
Lit
Manrope local
Lucide
base custom element
```

No dashboard todavía.

### Gate

```text
npm dev works
TypeScript clean
component renders
dark/light wrappers load same bundle
```

---

# 102. PHASE 1 — TOKENS

Construir:

```text
foundation
semantic dark
semantic light
typography
spacing
radius
elevation
motion
visualization tokens
```

### Gate

No primitive debe depender de valores visuales arbitrarios.

---

# 103. PHASE 2 — PRIMITIVES

Crear:

```text
Surface
Button
IconButton
StatusPill
Stat
SegmentedControl
Sheet
Switch
EmptyState
```

### Gate

Todos funcionan en Dark/Light y muestran states principales.

---

# 104. PHASE 3 — UI LAB

Crear Lab con:

```text
typography
tokens
primitives
states
```

### Gate

Una persona puede entender el sistema visual sin abrir el código.

---

# 105. PHASE 4 — VISUALIZATION FOUNDATION

Integrar:

```text
ECharts 6
witmind-dark theme
witmind-light theme
WitViz
```

Crear:

```text
gauge
sparkline
energyBars
areaTrend
lineTrend
```

### Gate

Todos aparecen en UI Lab. Theme switch y resize funcionan.

---

# 106. PHASE 5 — MOTION

Integrar Motion.

Definir:

```text
sheet
pressed
selection
page
state
```

### Gate

Motion consistente, reduced motion funcional, sin looping decorativo.

---

# 107. PHASE 6 — HOME SHELL

Crear:

```text
Header
layout
navigation
dock
```

Sin lógica compleja inicialmente.

### Gate

Layout correcto en resoluciones objetivo.

---

# 108. PHASE 7 — HOME DATA

Conectar mock.

Implementar:

```text
Lighting
Weather
Energy
Media
Scenes
System
```

### Gate

Todos muestran datos del mock, sin fake state, sin errores de consola.

---

# 109. PHASE 8 — CONTROLS

Implementar:

```text
Lights Sheet
switches
scenes
media controls
general controls
```

### Gate

Todas las acciones pasan por `hass.callService`. Pending/Error/Unavailable funcionan.

---

# 110. PHASE 9 — ENERGY ANALYTICS

Implementar Energy Detail:

```text
Day
Month
Year
Total
Average
Peak
Chart
```

### Gate

Usa WitViz. No ECharts styling local arbitrario.

---

# 111. PHASE 10 — OTHER VIEWS

Crear:

```text
Lights
Scenes
Media Detail
More
Diagnostics
```

Cada vista debe clasificarse primero.

### Gate

No hacks visuales nuevos sin documentar.

---

# 112. PHASE 11 — SKILL

Solo ahora escribir Skill completo, basado en:

```text
real primitives
real patterns
real exceptions
real examples
```

### Gate

Otra IA puede crear una vista simple sin romper el lenguaje visual.

---

# 113. PHASE 12 — HARDENING

Revisar:

```text
visual regression
responsive
offline
unavailable
keyboard
reduced motion
safe areas
performance
bundle
```

---

# 114. PERFORMANCE GATE

```text
no unnecessary full rerenders
no chart recreation on harmless updates
no duplicate subscriptions
no memory leaks
chart dispose on disconnect
ResizeObserver behavior
```

---

# 115. ACCESSIBILITY GATE

```text
keyboard navigation
focus visibility
aria labels
pressed/selected semantics
touch size
contrast
reduced motion
```

---

# 116. THEME PARITY GATE

Cada feature se prueba en:

```text
dark
light
```

No permitir “dark listo; light después”.

---

# 117. NEW-LIBRARY PROTOCOL

Antes de agregar librería nueva documentar:

```text
problem
why current stack cannot solve it
bundle impact
license
maintenance risk
alternatives considered
```

Si el stack actual lo resuelve, no agregar librería.

---

# 118. ANTI-DRIFT RULE

Nunca resolver un problema local con:

```text
random hex
random radius
random shadow
new font
new icon family
new chart library
new motion library
```

Primero revisar Design System.

---

# 119. ANTI-COPY RULE

Future views no deben copiar Home.

Consistency no significa:

```text
same cards
same grid
same proportions
```

Consistency significa:

```text
same language
same states
same material
same typography
same motion
same visualization grammar
```

---

# 120. PREMIUM QUALITY QUESTION

Antes de aceptar una vista:

```text
Would this still feel like Witmind if the logo were hidden?
```

Si no, el lenguaje de marca es demasiado débil.

---

# 121. CROSS-VIEW QUALITY QUESTION

```text
Does this feel like the same product without being a copy of another layout?
```

Ese es el objetivo.

---

# 122. HOME QUALITY CHECK

```text
clear primary element?
clear reading order?
too many equal cards?
too much text?
orange overused?
too much glass?
touch targets adequate?
values readable at distance?
```

---

# 123. CHART QUALITY CHECK

```text
does chart answer a question?
is primary series obvious?
too much grid?
too many labels?
unnecessary legend?
tooltips usable on touch?
theme consistent?
```

---

# 124. GAUGE QUALITY CHECK

```text
does gauge need to exist?
would a number be enough?
is scale meaningful?
are thresholds meaningful?
does it look architectural rather than automotive?
```

Si gauge no aporta percepción de proporción/progreso, usar número.

---

# 125. SHEET QUALITY CHECK

```text
is this detail that should leave Home?
clear close action?
focus managed?
backdrop enough?
not competing with background?
```

---

# 126. ERROR QUALITY CHECK

```text
does user know what failed?
is retry possible if appropriate?
does layout remain stable?
is last valid data preserved?
```

---

# 127. DEVELOPMENT SESSION PROTOCOL

Al iniciar cada sesión:

```text
1. Read MASTER-SPEC.md completely.
2. Identify current phase.
3. Inspect relevant tokens/primitives/patterns.
4. Inspect UI Lab.
5. Inspect SKILL.md if it already exists.
6. List files to change.
7. List reusable components.
8. State whether task introduces a new pattern.
9. Implement only current scope.
10. Test Dark + Light.
11. Run relevant tests.
12. Update EXCEPTIONS.md only if required.
```

---

# 128. PROHIBICIÓN DE RESUMIR ESTE ARCHIVO

No crear como sustituto:

```text
MASTER-SPEC-SUMMARY.md
QUICK-RULES.md
condensed design guide
```

Se permite una checklist auxiliar, pero:

```text
MASTER-SPEC.md remains authoritative
```

Toda IA debe seguir leyendo este documento completo.

---

# 129. DEFINITION OF DONE — DESIGN SYSTEM

```text
tokens stable
dark/light parity
primitives complete
states complete
UI Lab complete
no unexplained arbitrary styling
```

---

# 130. DEFINITION OF DONE — VISUALIZATION

```text
ECharts integrated
themes integrated
WitViz API works
gauge works
sparkline works
bars work
area/line trend work
resize stable
dark/light stable
```

---

# 131. DEFINITION OF DONE — SHOWROOM HOME

```text
mock connected
lighting works
weather works
energy works
media works
scenes work
system works
dock works
responsive works
dark/light works
no fake data
no console errors
```

---

# 132. DEFINITION OF DONE — CONTROLS

```text
switches work
pending works
errors work
scenes work
media controls work
sheets work
keyboard works
touch works
```

---

# 133. DEFINITION OF DONE — ANALYTICS

```text
statistics via real/mock API
Day/Month/Year
tooltips
touch exploration
axes readable
WitViz preset
dark/light
responsive
```

---

# 134. DEFINITION OF DONE — SKILL

```text
MUST/SHOULD/MAY documented
view classification documented
new-case protocol documented
exceptions documented
examples documented
another AI successfully applies it
```

---

# 135. DEFINITION OF DONE — PROJECT

```text
all phase gates pass
visual regression passes
responsive passes
accessibility reviewed
performance reviewed
production bundle generated
Home Assistant integration proven
```

---

# 136. FINAL PRINCIPLE

## The system must be strict about identity and flexible about composition.

Strict:

```text
brand
semantics
states
typography
materials
visualization grammar
motion
accessibility
HA contract
```

Flexible:

```text
layout
density
card spans
information hierarchy
chart choice
view composition
exceptions
```

Nunca sacrificar función para obedecer una regla estética blanda.

Nunca sacrificar identidad por resolver rápidamente un caso local.

---

# 137. FINAL INSTRUCTION TO THE IMPLEMENTING AI

Do not attempt to build the entire product in one pass.

Work phase by phase.

Do not generate dozens of placeholder files.

Do not summarize this specification.

Do not replace this specification with your own interpretation.

When uncertain:

```text
inspect existing system
classify the case
preserve invariants
adapt defaults
document exceptions
```

The purpose of this project is not to build one beautiful dashboard.

The purpose is to build a durable UI platform capable of producing many premium Witmind interfaces without visual drift.

---

# END OF MASTER-SPEC
