# WITMIND SIGNATURE UI
## Master Implementation Specification

> STATUS: ACTIVE PROJECT CONTRACT  
> PURPOSE: Build the reusable visual and interaction platform for future Witmind interfaces.  
> REFERENCE INPUTS: `showroom-witmind-os.html` and `showroom-witmind-os-light.html`.  
> IMPORTANT: Those files are references only. DO NOT modify them.  
> TARGET: Home Assistant custom panel / Web Component ecosystem.  

---

# 0. MISSION
Build a new interface platform from zero named: **Witmind Signature UI**

This is not a reskin of the existing Showroom.
This project must create:
1. a reusable design system;
2. reusable UI primitives;
3. reusable visualization components;
4. a dark theme;
5. a light theme;
6. a component laboratory;
7. a reference Showroom implementation;
8. an adaptive AI design skill;
9. automated visual regression tests;
10. a production bundle suitable for Home Assistant.

The supplied dark and light Witmind OS HTML files are VISUAL REFERENCES.
Do not edit them. Do not extend their CSS. Do not copy their implementation architecture blindly.
Study their proportions, typography, colors, hierarchy, theme relationship and overall visual direction.
Then rebuild the new system structurally from zero.

---

# 1. NON-NEGOTIABLE PROJECT RULE
The existing files are frozen references:
- `showroom-witmind-os.html`
- `showroom-witmind-os-light.html`

They must remain untouched.

Create a new implementation:
- `showroom-witmind-signature.html`
- `showroom-witmind-signature-light.html`

Both must load the SAME application bundle.

Dark:
```html
<showroom-witmind-signature></showroom-witmind-signature>
```

Light:
```html
<showroom-witmind-signature theme="light"></showroom-witmind-signature>
```

There must NOT be separate dark and light component implementations.
Theme differences must come from semantic design tokens.

---

# 2. PRODUCT GOAL
The final system should feel like software that could be sold by a premium architectural automation company.

It must NOT feel like:
- a Home Assistant theme;
- a Lovelace dashboard;
- a CSS demo;
- a generic SaaS admin dashboard;
- a Material UI template;
- a Bootstrap dashboard;
- an experimental glassmorphism concept.

The desired characteristics are:
- quiet
- precise
- architectural
- premium
- touch-first
- highly legible
- consistent
- restrained
- contextual
- responsive
- professional
- brand-specific

The Witmind orange is LIGHT, not decoration.
The UI should still look premium if most orange accents are removed.

---

# 3. TECHNOLOGY STACK
Use the following stack:

### Application
- TypeScript
- Lit Web Components
- Shadow DOM

Lit owns component rendering and reactive updates.
Do not build the application using repeated innerHTML replacement.
Do not introduce React or Vue.

### Build system
- Vite
Use Vite development mode during implementation.
Use Vite library mode for production output.
Expected final artifact: `dist/showroom-witmind-signature.js`.
Home Assistant should eventually need only that bundle plus required static assets.

### Visualization
- Apache ECharts (v5 / v6)
ECharts is the primary visualization engine for:
- gauges
- energy bars
- line charts
- area charts
- sparklines
- historical trends
- comparative charts

Do NOT let individual pages configure arbitrary chart styles.
All ECharts output must go through the Witmind visualization layer (`WitViz`).

### Animation
- Motion
Use Motion only for meaningful interaction transitions:
- sheet enter/exit
- popover enter/exit
- page transition
- state confirmation
- selected card transition
- number transition when useful

Do NOT animate decorative elements continuously.
Prefer CSS for simple hover/pressed states.

### Icons
- Lucide
Use one icon family throughout the product.
Standard icon sizes: 18px, 22px, 28px, 36px.
Standard stroke: 1.8px.

### Typography
- Manrope (`@fontsource-variable/manrope`)
Prefer a locally bundled package rather than runtime dependency on Google Fonts.
The dashboard must remain visually correct without internet access.

### Testing
- Vitest & Playwright

---

# 4. DO NOT OVERENGINEER STATE MANAGEMENT
Do NOT add: Redux, Zustand, MobX, XState unless a real future requirement proves it necessary.
The Home Assistant `hass` object remains the external state source.
Application-local state should remain small:
- active view
- active sheet
- selected period
- current page
- temporary loading state
- temporary interaction state

Lit reactive state is sufficient.

---

# 5. SOURCE OF TRUTH HIERARCHY
When two instructions conflict, use this priority order:
1. Accessibility / functional correctness
2. Home Assistant behavior
3. Semantic design tokens
4. Existing reusable primitive
5. Existing pattern
6. Visualization preset
7. Witmind UI Skill
8. Local design judgment

A prompt written later must NOT silently override levels 1–5.

---

# 6. DESIGN TOKEN PHILOSOPHY
No page should invent values such as:
`border-radius: 19px; padding: 17px; color: #ee6a27;`
without a strong reason.

### Dark Theme Direction
Canvas: `#071118`  
Surface: `#10191e`  
Surface raised: `#162126`  
Interactive surface: `#1b282e`  
Text primary: `#f5f6f4`  
Text secondary: `#adb4b6`  
Text tertiary: `#747e82`  
Accent orange: `#f26522` (emitted light)  

### Light Theme Direction (Porcelain)
Canvas: `#f3f3ef`  
Surface: `rgba(255,255,255,.82)`  
Surface raised: `rgba(255,255,255,.95)`  
Text primary: `#182126`  
Text secondary: `#667176`  
Text tertiary: `#92999c`  
Border: `rgba(18,32,38,.08)`  
Accent orange: `#f26522`  

Dark and Light must have IDENTICAL:
component dimensions, spacing, radii, typography, layout, icons, interaction model, and information hierarchy. Only semantic appearance changes.

---

# 7. TYPOGRAPHY & SPACING SCALE
### Typography (Manrope)
- display: 56px / 1
- hero: 36px / 1.08
- kpi: 32px / 1.05
- title: 18px / 1.2
- body: 14px / 1.45
- label: 12px / 1.35
- meta: 11px / 1.35
`font-variant-numeric: tabular-nums` for all numbers, measurements, units, time.

### Spacing
4, 8, 12, 16, 24, 32, 40, 48 px.

### Radii
- control: 14px
- card: 22px
- large panel: 28px
- pill: 999px

---

# 8. VISUALIZATION & WITVIZ
All charts use `WitViz` presets:
- `WitViz.gauge(element, options)`: Semicircular progress ring (start: 210°, end: -30°), round caps, no pointer, quiet track, central value + secondary load, 3-tier threshold coloring (0-60% accent, 60-85% warning, 85-100% danger).
- `WitViz.sparkline(element, options)`: Minimal contextual trend.
- `WitViz.energyBars(element, options)`: Historical comparative intervals.
- `WitViz.areaTrend(element, options)`: Clean analytics trend.

---

# 9. EXECUTION PHASES / GATES
- Gate 1: Bootstrap técnico (Vite, TS, Lit, Manrope, Lucide, `<showroom-witmind-signature>`).
- Gate 2: Design System tokens, primitives, and interactive UI Lab.
- Gate 3: Visualization (ECharts, witmind-dark/light themes, WitViz presets in Lab).
- Gate 4: Motion transitions & sheets.
- Gate 5: Showroom Home reference view with reactive mock Hass.
- Gate 6: Lighting controls & real interactive feedback.
- Gate 7: Energy Analytics (Day/Month/Year analytics view).
- Gate 8: Remaining views (Scenes, Media Detail, Diagnostics).
- Gate 9: Adaptive AI Skill (`skills/witmind-ui/SKILL.md`).
- Gate 10: Visual regression tests & production bundle.
