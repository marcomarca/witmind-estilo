---
name: witmind-ui
description: Adaptive architectural design system and component composition skill for Witmind Signature UI interfaces in Home Assistant.
---

# Witmind Signature UI Design Skill

## 1. Core Identity & Philosophy
Witmind Signature UI is an architectural, touch-first automation interface designed for premium Savant, Crestron, and KNX installations.
It is characterized by:
- **Quiet, architectural restraint**: Deep petroleum dark (`#071118`) and warm porcelain light (`#f3f3ef`).
- **Orange as emitted light**: Witmind orange (`#f26522`) represents active light emission, primary series, or selected focus — never purely arbitrary background paint.
- **Single typographic family**: Manrope Variable with tabular numerals (`font-variant-numeric: tabular-nums`) across all telemetry, numbers, time, and measurements.
- **Centralized visualization**: All charts use `WitViz` presets — never raw arbitrary ECharts configurations in views.

---

## 2. Invariant Hierarchy: MUST, SHOULD, MAY

### MUST (Non-negotiable invariants)
- **Theme Parity**: Dark and Light MUST share identical component dimensions, spacing, layout hierarchy, and touch geometry. Only semantic color tokens vary.
- **No Direct Raw Colors**: Views and components MUST consume semantic CSS tokens (`var(--wit-surface)`, `var(--wit-text-primary)`, `var(--wit-accent)`), never raw hex codes.
- **Tabular Numerals**: Any numeric readout (Watts, kWh, °C, %, time) MUST use `font-variant-numeric: tabular-nums`.
- **Touch Target Standard**: All interactive buttons, chips, and toggles MUST maintain a minimum touch area of 44×44px (preferably 48px).
- **Home Assistant Contract**: State MUST flow reactively from `hass.states` and actions MUST trigger via `hass.callService(...)`. Never mutate state directly.
- **Graceful Degradation**: Never render `undefined`, `NaN`, or empty broken labels. Use `<wit-empty-state>` for offline/unavailable entities.

### SHOULD (Strong defaults)
- Card radius: `22px` (`var(--wit-radius-card)`).
- Card padding: `24px`.
- Primary gap: `16px` or `20px`.
- Hierarchy: Home cards SHOULD feature 1 primary KPI, 1 secondary metric, and 1 direct context/action.

### MAY (Contextual choices)
- 2 vs 3 grid columns depending on container query width.
- Choice between Sparkline vs Mini Bars for contextual trend.
- Placement of secondary icon.

---

## 3. Pre-Design Decision Protocol (Answer Before Implementation)
Before writing any new component or view, answer these mandatory questions:
1. **User Goal**: What is the primary user intention? (Immediate control vs telemetry inspection vs historical analysis).
2. **View Classification**:
   - `overview`: Glanceable (0.5–2m distance), bold KPIs, minimal controls.
   - `control`: Direct touch manipulation, immediate reactive feedback, large targets.
   - `detail`: Progressive inspection via modal sheet or secondary page.
   - `analytics`: Multi-period filtering (Day/Month/Year), tooltips, comparative series.
   - `diagnostics`: Function over minimalism; entity tables, bus latency, hardware status.
3. **Information Hierarchy**:
   - What is the single primary fact?
   - What is the secondary fact?
   - What is the direct action?
4. **Existing Primitives**: Does an existing primitive (`surface`, `button`, `stat`, `switch`, `status-pill`, `sheet`) satisfy the requirement?
5. **Visualization**: Does an existing `WitViz` preset (`gauge`, `sparkline`, `energyBars`, `areaTrend`) cover the visual data?

---

## 4. Visualization Rules with WitViz
Do NOT call `echarts.init()` directly inside view files.
Use the declarative `<wit-chart>` web component or `WitViz` API:

```html
<!-- Semicircular Architectural Load Gauge -->
<wit-chart
  type="gauge"
  .config=${{
    value: loadPercent,
    valueLabel: "42%",
    secondaryLabel: "432 W"
  }}
></wit-chart>

<!-- Contextual Sparkline -->
<wit-chart
  type="sparkline"
  .config=${{
    data: [120, 240, 480, 920, 1800, 2400, 3100, 3420],
    tone: "accent"
  }}
></wit-chart>
```

---

## 5. Three-Use Promotion Rule
1. A one-off solution for a unique problem is an **exception** (document in `EXCEPTIONS.md`).
2. If the same solution appears twice, it becomes a **pattern candidate**.
3. If needed 3 times, promote it to a reusable primitive in `src/design-system/primitives/`.
