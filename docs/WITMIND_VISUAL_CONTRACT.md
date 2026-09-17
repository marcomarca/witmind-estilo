# WITMIND SIGNATURE — VISUAL CONTRACT
## Extracted from Golden Reference (`reference/witmind-os`)

> **STATUS**: GOLDEN VISUAL CONTRACT  
> **ORIGIN**: Automated browser telemetry (`tools/capture-reference-metrics.ts`) executed on `reference/witmind-os/dark.html` and `reference/witmind-os/light.html`.  
> **TARGET**: Absolute fidelity baseline for Witmind Signature UI.  
> **RULE**: Visual styling must adhere strictly to these measured empirical values during Phase A (Fidelity Phase).

---

## 1. TYPOGRAPHY & TEXT ENGINE

The entire visual system is built on a single, local variable typography: **Manrope** (`@fontsource-variable/manrope`).  
All numerical data, KPIs, clock digits, dates, units, and tags strictly enforce `font-variant-numeric: tabular-nums` (`font-feature-settings: "tnum" 1`).

| Token / Role | Measured Family | Weight (Numeric) | Size | Line Height | Letter Spacing | Case / Transform | Numeric Mode |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Clock Digits** (`.clock-digits`) | Manrope | `450` | `clamp(48px, 5vw, 60px)` | `1.0` (60px) | `-0.04em` | Normal | `tabular-nums` |
| **Hero Title** (`.hero-title`) | Manrope | `720` | `28px` | `1.15` (32px) | `-0.02em` | Normal | Normal |
| **Hero Kicker** (`.hero-kicker`) | Manrope | `720` | `11px` | `1.1` (12px) | `+0.10em` | `uppercase` | Normal |
| **Hero Caption** (`.hero-caption`) | Manrope | `400` | `16px` (`--s4`) | `1.4` (22px) | Normal | Normal | Normal |
| **KPI Display** (`.kpi-display`) | Manrope | `520` | `32px` | `1.05` (34px) | `-0.03em` | Normal | `tabular-nums` |
| **KPI Sub-label** (`.kpi-sub-label`)| Manrope | `400` | `12px` (`--s3`) | `1.35` (16px) | Normal | Normal | Normal |
| **Card Kicker** (`.card-kicker`) | Manrope | `640` | `12px` (`--s3`) | `1.3` (16px) | `+0.08em` | `uppercase` | Normal |
| **Card Head Meta** (`.card-head-meta`)| Manrope | `520` | `11px` | `1.3` (14px) | Normal | Normal | `tabular-nums` |
| **Section / Sheet Title** (`.sheet-title`) | Manrope | `720` | `20px` | `1.2` (24px) | Normal | Normal | Normal |
| **Brand Name** (`.brand-name`) | Manrope | `720` | `18px` | `1.1` (20px) | `+0.02em` | Normal | Normal |
| **Brand Sub / Site** (`.brand-site`) | Manrope | `640` | `11px` | `1.1` (12px) | `+0.08em` | `uppercase` | Normal |
| **Pill Title** (`.pill-title`) | Manrope | `640` | `12px` (`--s3`) | `1.2` (14px) | Normal | Normal | `tabular-nums` |
| **Pill Meta** (`.pill-meta`) | Manrope | `520` | `11px` | `1.2` (13px) | Normal | Normal | Normal |
| **Control / Button** (`.nav-segment-btn`)| Manrope | `640` | `12px` (`--s3`) | `1.2` (14px) | Normal | Normal | Normal |
| **Dock Label** (`.dock-btn`) | Manrope | `640` | `12px` (`--s3`) | `1.2` (14px) | Normal | Normal | `tabular-nums` |
| **Gauge Center Value** (`.gauge-value`) | Manrope | `720` | `16px` | `1.1` (18px) | Normal | Normal | `tabular-nums` |
| **Gauge Sub-label** (`.gauge-sub`) | Manrope | `400` | `10px` | `1.1` (11px) | Normal | Normal | `tabular-nums` |

---

## 2. COLOR PALETTES & 3-LAYER SURFACE SYSTEM

The system uses a strict **3-layer surface depth architecture** with identical geometry across themes.

### A. Semantic Color Comparison (Dark vs Light Porcelain)

| Semantic Token | Role / Layer | Dark Theme (`dark.html`) | Light Theme (`light.html`) | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `--canvas` | **Level 0 (Canvas)** | `#071118` (`rgb(7, 17, 24)`) | `#f3f3ef` (`rgb(243, 243, 239)`) | Solid viewport background |
| `--surface` | **Level 1 (Cards)** | `rgba(16, 25, 30, 0.88)` | `rgba(255, 255, 255, 0.88)` | Primary content cards |
| `--surface-raised` | **Level 1+ (Hero, Modal)** | `#162126` (`rgb(22, 33, 38)`) | `#ffffff` (`rgb(255, 255, 255)`) | Raised panels, sheets |
| `--surface-interactive`| **Controls, Rows, Items** | `#1b282e` (`rgb(27, 40, 46)`) | `#f8fafc` (`rgb(248, 250, 252)`)| Clickable rows, segments |
| `--glass` | **Level 2 (Dock, Pills)** | `rgba(20, 30, 35, 0.68)` | `rgba(255, 255, 255, 0.75)` | Translucent floating elements |
| `--text-1` | **Primary Text** | `#f5f6f4` (`rgb(245, 246, 244)`)| `#182126` (`rgb(24, 33, 38)`) | Headings, KPIs, titles |
| `--text-2` | **Secondary Text** | `#adb4b6` (`rgb(173, 180, 182)`)| `#667176` (`rgb(102, 113, 118)`)| Labels, kickers, captions |
| `--text-3` | **Tertiary / Meta Text** | `#747e82` (`rgb(116, 126, 130)`)| `#92999c` (`rgb(146, 153, 156)`)| Units, subtle timestamps |
| `--line` | **Structural Borders** | `rgba(255, 255, 255, 0.08)` | `rgba(18, 32, 38, 0.08)` | 1px clean card/row borders |

### B. Shared Brand & State Tokens

| Brand / State Token | Raw Value | Semantic Meaning |
| :--- | :--- | :--- |
| `--accent` | `#f26522` | Witmind Signature Orange (Active emitted light, primary actions) |
| `--accent-hover` | `#dc581a` | Darkened hover state |
| `--accent-soft` | `rgba(242, 101, 34, 0.12)` | Subtle tinted background for active items |
| `--accent-border` | `rgba(242, 101, 34, 0.34)` | Subtle orange boundary border for active cards |
| `--accent-glow` | `rgba(242, 101, 34, 0.16)` | Soft radial illumination halo |
| `--state-success` | `#16a34a` | System OK, Connected, Live telemetry |
| `--state-warning` | `#d97706` | Warning threshold, 60-85% electric capacity |
| `--state-danger` | `#dc2626` | Alarm, >85% electric overload |

### C. Atmospheric Canvas Gradients
- **Dark**:  
  `radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.14), transparent 65%), radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.06), transparent 70%), var(--canvas)`
- **Light (Porcelain)**:  
  `radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.10), transparent 65%), radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.04), transparent 70%), var(--canvas)`

---

## 3. SPACING SCALE & RADII GEOMETRY

### Spacing Scale (4px / 8px Strict Grid)
- `--s1`: `4px`
- `--s2`: `8px`
- `--s3`: `12px`
- `--s4`: `16px`
- `--s5`: `24px`
- `--s6`: `32px`
- Viewport Bottom Margin: `96px` (clears the floating bottom dock)

### Corner Radii Scale
- `--r-control`: `14px` (internal buttons, room rows, shortcut boxes, diagnostic cells)
- `--r-card`: `22px` (all standard cards: Weather, Energy, Gauge, Ambience, Rooms, Shortcuts, Calendar)
- `--r-panel`: `28px` (large modal sheets, primary container shells)
- `--r-pill`: `999px` (status pills, segmented nav toggles, badges, bottom dock)

---

## 4. SHADOWS, BLUR & MATERIAL TREATMENTS

| Element / Material | Border Width & Style | Box Shadow | Backdrop Filter |
| :--- | :--- | :--- | :--- |
| **Standard Card** (`.card`) | `1px solid var(--line)` | `none` | `none` (opaque / 88% alpha) |
| **Status Pill** (`.status-pill`) | `1px solid var(--line)` | `none` | `blur(20px)` |
| **Bottom Dock** (`.wit-dock`) | `1px solid var(--line)` | Dark: `0 16px 40px rgba(0, 0, 0, 0.4)`<br>Light: `0 16px 40px rgba(18, 32, 38, 0.12)` | `blur(24px)` |
| **Sheet Modal** (`.sheet-modal`) | `1px solid var(--line)` | `0 24px 64px rgba(0, 0, 0, 0.7)` | `none` (opaque raised) |
| **Sheet Scrim** (`.sheet-scrim`) | `none` | `none` | `blur(12px)` (overlay: `rgba(0,0,0,0.65)`) |

---

## 5. MEASURED COMPONENT DIMENSIONS & GEOMETRY

### A. Shell & Header
- **Max Workspace Width**: `1480px` (`margin: 0 auto`)
- **Shell Padding**: `24px 32px 96px 32px` (top, right, bottom, left)
- **Shell Gap**: `24px` (`--s5`)
- **Header Height**: `~95px` (measured bounding box)
- **Status Pill Dimensions**: Height: `48px`, Padding: `0 16px`, Gap: `8px`, Radius: `999px`
- **Clock Block**: Height: `60px`, Digits Size: `60px` (`450` weight), Date Label: `12px`

### B. Hero Widget Card
- **Height / Layout**: Horizontal flexbox (`flex-direction: row`, `justify-content: space-between`, `align-items: center`)
- **Padding**: `24px 32px` (`var(--s5) var(--s6)`)
- **Border**: `1px solid var(--accent-border)` (`rgba(242, 101, 34, 0.34)`)
- **Background**: `var(--surface-raised)`
- **Radius**: `22px` (`--r-card`)
- **Segmented Nav**: Container Padding: `4px`, Background: `var(--surface-interactive)`, Radius: `999px`. Segment Button Padding: `8px 16px`, Selected Button Background: `var(--accent)`, Color: `#ffffff`.

### C. Top Quad Grid (`.grid-top-quad`)
- **Grid Layout**: 4 columns (`repeat(4, 1fr)`), Gap: `24px` (`--s5`).
- **Card Min-Height**: `185px` (all 4 cards: Weather, Energy, Power Gauge, Ambience share exact equal height).
- **Weather Widget**: KPI Display: `32px` (`520` weight), Sub-label: `12px`, Forecast strip: 4 equal flex columns separated by `1px solid var(--line)`.
- **Energy Widget**: KPI Display: `32px` (`520` weight), Sub-label: `12px`, Sparkline container: `32px` height, 16 vertical bar spans with `2px 2px 0 0` top radius. Active bars get `.is-hot` (`var(--accent)`).
- **Power Gauge Widget**: Box: `76px x 76px`, SVG Circle: `r=40`, Stroke Width: `8px`, Track Stroke: `var(--line)`, Indicator Stroke: `var(--accent)` (dynamic threshold colors: green/orange/red), Center Value: `16px` (`720` weight).
- **Ambience Widget**: Badge: `2px 8px` padding, `999px` radius, Title: `20px` (`720` weight), Sub-label: `12px`.

### D. Mid Trio Grid (`.grid-mid-trio`)
- **Grid Layout**: 3 columns (`1.1fr 1.3fr 1.3fr`), Gap: `24px` (`--s5`).
- **Rooms Card**: Stack of 5 interactive room rows (`padding: 8px 12px`, `radius: 14px`, `gap: 8px`). Tag: `padding: 2px 8px`, `radius: 999px`.
- **Shortcuts Card (2x3 Grid)**: Grid of 6 buttons (`grid-template-columns: 1fr 1fr`, `gap: 8px`). Min-Height: `48px`, Padding: `8px 12px`, Radius: `14px`, Icon: `18px`, Title: `12px` (`640` weight), Subtext: `11px` (`var(--text-3)`).
- **Calendar Card**: Stack of agenda items with `border-left: 2px solid var(--accent)`, Padding: `6px 10px`, Radius: `8px`.

### E. Bottom Floating Dock (`.wit-dock`)
- **Position**: `fixed`, `bottom: 16px`, `left: 50%`, `transform: translateX(-50%)`, `z-index: 2000`.
- **Padding**: `6px 12px`.
- **Radius**: `999px` (`--r-pill`).
- **Dock Buttons**: `padding: 8px 16px`, Height: `36px`, Icon: `18px`, Text: `12px` (`640` weight).
- **Page Dots Group**: Dot: `8px x 8px`, Radius: `50%`. Active Dot: `20px x 8px`, Radius: `999px`, Background: `var(--accent)`.

### F. Modal Sheets (Lights Control)
- **Scrim**: `fixed`, `inset: 0`, Background: `rgba(0, 0, 0, 0.65)` (Dark) / `rgba(18, 32, 38, 0.4)` (Light), `backdrop-filter: blur(12px)`.
- **Modal Container**: Width: `min(620px, calc(100vw - 40px))`, Max-Height: `85dvh`, Padding: `24px`, Radius: `28px` (`--r-panel`), Background: `var(--surface-raised)`.
- **Switch Row**: Min-height: `52px`, Padding: `10px 14px`, Radius: `14px`, Background: `var(--surface-interactive)`.
- **Switch Toggle**: Width: `44px`, Height: `24px`, Radius: `999px`, Thumb: `18px x 18px` circle.

---

## 6. ICONOGRAPHY STANDARD (LUCIDE)

- **Glyphs Engine**: Lucide Icons
- **Standard Stroke Width**: `1.8px` (consistently across all icons)
- **Standard Sizes**:
  - `14px`: Badges, checkmarks, transport sub-icons
  - `16px`: Action headers, weather sub-icons, modal close
  - `18px`: Primary card headers, shortcuts, room indicators, dock actions
  - `24px`: Media transport play/pause actions
- **Treatment**: Optical center alignment, stroke color bound to `currentColor` (`var(--text-2)` by default, `var(--accent)` for active emitted light).

---

## 7. MOTION & INTERACTION SPECIFICATION

- **Durations**:
  - Fast (Hovers, active press): `150ms` (`--motion-fast`)
  - Normal (Page slides, dot expand): `220ms` (`--motion-normal`)
  - Slow (Gauges, energy bars, modal enter): `300ms` (`--motion-slow`)
- **Easing Curve**: `cubic-bezier(0.2, 0.8, 0.2, 1)` (`--ease-apple`)
- **Active Click Scale**: `transform: scale(0.985)` on `.interactive:active`.

---

## 8. GOLDEN METRICS INTEGRITY CHECKLIST

- [x] All values derived from browser runtime inspection of `reference/witmind-os`.
- [x] Zero external Google Fonts dependency (uses local Manrope woff2).
- [x] Strict tabular numbers applied to all data KPIs.
- [x] Equal geometry across Dark and Porcelain Light themes.
- [x] Reference telemetry captured in `reference-analysis/*.json`.
