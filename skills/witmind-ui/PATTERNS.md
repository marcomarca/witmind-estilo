# Witmind Signature UI — Standard Design Patterns

## Pattern 1: Overview (Home Dashboard)
- **Role**: Glanceable context from 0.5m to 2m distance.
- **Hierarchy**: 1 Primary Hero (e.g. Lighting Status with quick toggles), 1 Central Gauge (Electrical Load), 2-3 contextual cards (Climate, Media, Scene Shortcuts).
- **Chart Type**: Semicircular Gauge (210° to -30°) or mini sparklines. No heavy axis lines.

## Pattern 2: Control (Lighting & Actuators)
- **Role**: Direct physical control without visual friction.
- **Interaction**: Immediate reactive feedback, touch targets ≥ 44px, spring toggle animations.
- **Primitives**: `<wit-switch>`, `<wit-button>`, `<wit-icon-button>`.

## Pattern 3: Detail Sheet (Depth Transition)
- **Role**: Progressive disclosure for deeper adjustments (DALI circuit brightness, RGB/CCT sliders).
- **Motion**: Receding canvas, background blur (16px), sheet rise (`opacity: 0 -> 1`, `translateY: 12px -> 0`, `scale: 0.985 -> 1`).
- **Primitives**: `<wit-sheet>`.

## Pattern 4: Analytics (Energy & Trends)
- **Role**: Exploration and historical comparison.
- **Controls**: Segmented period switcher (`Día`, `Mes`, `Año`).
- **Visuals**: `<wit-chart type="areaTrend">` and `<wit-chart type="energyBars">` with interactive tooltips and quiet dotted gridlines.

## Pattern 5: Diagnostics (System Telemetry)
- **Role**: Real-time troubleshooting and bus health.
- **Characteristics**: Displays entity IDs, timestamps, KNX/DALI bus latencies, and active states in a clean tabular view. Function and precision over visual minimalism.
