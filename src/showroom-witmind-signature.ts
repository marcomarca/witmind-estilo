import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { renderSvg } from "./utilities/icons.js";
import type { HomeAssistant } from "./types/home-assistant.js";
import { globalMockHass } from "./controllers/mock-hass-provider.js";

interface Circuit {
  id: string;
  name: string;
  subtitle: string;
  watts: number;
}

const SPOTS: Circuit[] = [
  { id: "switch.interruptor_inteligente_switch_1", name: "Spots ventana", subtitle: "Zona ventana", watts: 100 },
  { id: "switch.interruptor_inteligente_switch_2", name: "Spots 2×3", subtitle: "Muestra 2 × 3", watts: 120 },
  { id: "switch.interruptor_inteligente_switch_3", name: "Spots 3×3", subtitle: "Muestra 3 × 3", watts: 180 },
  { id: "switch.interruptor_inteligente_switch_4", name: "Spots TV", subtitle: "Zona audiovisual", watts: 25 }
];

const SAMPLES: Circuit[] = [
  { id: "switch.interruptor_inteligente_2_switch_1", name: "Paneles 3k/6k", subtitle: "Temperaturas color", watts: 96 },
  { id: "switch.interruptor_inteligente_2_switch_2", name: "Colgantes", subtitle: "Muestra suspendida", watts: 10 },
  { id: "switch.interruptor_inteligente_2_switch_3", name: "Slims", subtitle: "Línea decorativa", watts: 432 },
  { id: "switch.interruptor_inteligente_2_switch_4", name: "Downlights", subtitle: "Iluminación empotrada", watts: 144 },
  { id: "switch.smart_relay_switch_4_switch", name: "Paneles", subtitle: "Control por relé", watts: 288 }
];

const REFLECTOR: Circuit = {
  id: "switch.smart_relay_switch_3_switch",
  name: "Reflector exterior",
  subtitle: "Control aislado",
  watts: 0
};

const ALL_CIRCUITS = [...SPOTS, ...SAMPLES, REFLECTOR];
const TOTAL_NOMINAL_CAPACITY_W = 1395;

const ENTITIES = {
  weather: "weather.forecast_casa",
  media: "media_player.showroom_1",
  lightCount: "sensor.showroom_luminarias_encendidas",
  energy: "sensor.showroom_energia_estimada",
  power: "sensor.showroom_potencia_estimada",
  battery: "sensor.21051182g_battery_level",
  presentation: "scene.presentacion",
  meeting: "scene.reunion",
  allOn: "script.showroom_encendido_general",
  allOff: "script.showroom_apagado_general"
};

@customElement("showroom-witmind-signature")
export class ShowroomWitmindSignature extends LitElement {
  @property({ type: String, reflect: true })
  theme: "dark" | "light" = "dark";

  @property({ type: Object })
  hass?: HomeAssistant;

  @state()
  private _page: number = 0; // 0: Home / Operation, 1: Analytics / Extended Control

  @state()
  private _sheet: string | null = null; // null | "lights"

  @state()
  private _timeStr: string = "";

  @state()
  private _dateStr: string = "";

  @state()
  private _stats: any[] = [];

  @state()
  private _recentActivity = [
    { text: "Spots ventana encendidos", time: "hace 2 min", type: "light" },
    { text: "Ambient Lounge reproducción iniciada", time: "hace 6 min", type: "media" },
    { text: "Escena Presentación aplicada", time: "hace 14 min", type: "scene" },
    { text: "Sincronización de telemetría OK", time: "hace 18 min", type: "system" }
  ];

  private _timeInterval?: number;
  private _unsubscribeHass?: () => void;
  private _unsubEvents?: () => void;

  static styles = css`
    :host {
      /* Brand Accent Tokens (Emitted Light) */
      --accent: #f26522;
      --accent-hover: #dc581a;
      --accent-soft: rgba(242, 101, 34, 0.12);
      --accent-border: rgba(242, 101, 34, 0.34);
      --accent-glow: rgba(242, 101, 34, 0.16);

      /* Global State Tokens */
      --state-success: #16a34a;
      --state-warning: #d97706;
      --state-danger: #dc2626;

      /* Typography Scale (Manrope) */
      --font-ui: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

      /* Spacing Scale (4, 8, 12, 16, 24, 32, 40, 48) */
      --s1: 4px;
      --s2: 8px;
      --s3: 12px;
      --s4: 16px;
      --s5: 24px;
      --s6: 32px;
      --s8: 40px;
      --s10: 48px;

      /* Radii (Architectural Invariants) */
      --r-control: 14px;
      --r-card: 22px;
      --r-panel: 28px;
      --r-pill: 999px;

      /* Motion */
      --motion-fast: 140ms;
      --motion-normal: 200ms;
      --motion-slow: 300ms;
      --ease-apple: cubic-bezier(0.2, 0.8, 0.2, 1);

      /* Touch Target Standard */
      --touch-min: 44px;
      --touch-target: 48px;

      /* DARK THEME (Default) — 3-Layer Surfaces */
      --canvas: #071118;
      --surface: rgba(16, 25, 30, 0.88);
      --surface-raised: #162126;
      --surface-interactive: #1b282e;
      --glass: rgba(20, 30, 35, 0.72);
      --text-1: #f5f6f4;
      --text-2: #adb4b6;
      --text-3: #747e82;
      --line: rgba(255, 255, 255, 0.08);

      display: block;
      width: 100%;
      min-height: 100dvh;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
      overflow-x: hidden;
      container-type: inline-size;
      container-name: showroom-container;

      font-family: var(--font-ui);
      font-feature-settings: "tnum" 1;
      color: var(--text-1);

      /* Atmospheric subtle background */
      background:
        radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.14), transparent 65%),
        radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.06), transparent 70%),
        var(--canvas);
      position: relative;
    }

    /* LIGHT THEME (Studio Frost / Porcelain) */
    :host([theme="light"]) {
      --canvas: #f3f3ef;
      --surface: rgba(255, 255, 255, 0.88);
      --surface-raised: #ffffff;
      --surface-interactive: #f8fafc;
      --glass: rgba(255, 255, 255, 0.82);
      --text-1: #182126;
      --text-2: #667176;
      --text-3: #92999c;
      --line: rgba(18, 32, 38, 0.08);

      background:
        radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.10), transparent 65%),
        radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.04), transparent 70%),
        var(--canvas);
      color: var(--text-1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    /* Numeral Tabular Font Standard */
    .tnum, [data-tnum="true"], .clock-digits, .kpi-display, .gauge-value, .cell-val {
      font-feature-settings: "tnum" 1;
      font-variant-numeric: tabular-nums;
    }

    /* Main Workspace Frame */
    .app-frame {
      position: relative;
      z-index: 1;
      max-width: 1480px;
      margin: 0 auto;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      padding:
        max(var(--s5), env(safe-area-inset-top))
        max(var(--s6), env(safe-area-inset-right))
        max(104px, calc(env(safe-area-inset-bottom) + 84px))
        max(var(--s6), env(safe-area-inset-left));
      gap: var(--s5);
      transition: padding var(--motion-normal) var(--ease-apple), gap var(--motion-normal) var(--ease-apple);
    }

    /* CARD SYSTEM (Level 1 Surface) */
    .card {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--r-card);
      padding: var(--s5);
      display: flex;
      flex-direction: column;
      transition: transform var(--motion-fast) var(--ease-apple),
                  border-color var(--motion-fast) var(--ease-apple),
                  box-shadow var(--motion-fast) var(--ease-apple);
      overflow: hidden;
    }
    .card.interactive {
      cursor: pointer;
    }
    .card.interactive:hover {
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-1px);
    }
    :host([theme="light"]) .card.interactive:hover {
      border-color: rgba(18, 32, 38, 0.16);
    }
    .card.interactive:active {
      transform: scale(0.985);
    }

    /* Card Header */
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--s2);
    }
    .card-kicker {
      font-size: var(--s3);
      font-weight: 640;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-2);
    }
    .card-head-icon {
      color: var(--text-3);
      display: flex;
      align-items: center;
    }
    .card-head-meta {
      font-size: 11px;
      font-weight: 520;
      color: var(--text-3);
    }

    /* HEADER & TOP STATUS AREA */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--s1) 0;
      gap: var(--s4);
      min-height: 56px;
    }

    .header-brand-wrap {
      display: flex;
      align-items: center;
      gap: var(--s5);
      min-width: 0;
      flex: 1 1 auto;
    }
    .brand-block {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
      flex-shrink: 0;
    }
    .brand-name {
      font-size: 18px;
      font-weight: 720;
      letter-spacing: 0.02em;
      color: var(--text-1);
    }
    .brand-site {
      font-size: 11px;
      font-weight: 640;
      letter-spacing: 0.08em;
      color: var(--accent);
      text-transform: uppercase;
    }

    .pills-strip {
      display: flex;
      align-items: center;
      gap: var(--s2);
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 2px 2px 4px 2px;
    }
    .pills-strip::-webkit-scrollbar {
      display: none;
    }
    .status-pill {
      min-height: 48px;
      padding: 0 var(--s4);
      background: var(--glass);
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: inline-flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform var(--motion-fast) var(--ease-apple),
                  border-color var(--motion-fast) var(--ease-apple),
                  background var(--motion-fast) var(--ease-apple);
    }
    .status-pill:hover {
      border-color: var(--accent-border);
      transform: translateY(-1px);
    }
    .status-pill:active {
      transform: scale(0.97);
    }
    .status-pill.is-active-pill {
      border-color: var(--accent-border);
    }
    .status-pill.is-warning {
      border-color: rgba(217, 119, 6, 0.4);
      background: rgba(217, 119, 6, 0.1);
    }

    .pill-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-2);
    }
    .pill-icon.active-accent { color: var(--accent); }

    .pill-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      white-space: nowrap;
    }
    .pill-title {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
    }
    .pill-meta {
      font-size: 11px;
      font-weight: 520;
      color: var(--text-2);
    }

    .header-clock-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      line-height: 1;
      flex-shrink: 0;
    }
    .clock-digits {
      font-size: clamp(38px, 4vw, 56px);
      font-weight: 450;
      letter-spacing: -0.04em;
      color: var(--text-1);
    }
    .clock-date-row {
      display: flex;
      align-items: center;
      gap: var(--s2);
      margin-top: var(--s1);
    }
    .date-label {
      font-size: var(--s3);
      font-weight: 520;
      color: var(--text-2);
      white-space: nowrap;
    }
    .theme-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--s1);
      min-height: 32px;
      padding: 4px 12px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      font-size: 11px;
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .theme-toggle-btn:hover {
      color: var(--text-1);
      border-color: var(--accent-border);
    }
    .theme-toggle-btn:active {
      transform: scale(0.96);
    }

    /* HORIZONTAL CAROUSEL (CSS Scroll Snap) */
    .carousel-track {
      display: flex;
      width: 100%;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      gap: var(--s6);
    }
    .carousel-track::-webkit-scrollbar { display: none; }

    .carousel-pane {
      flex: 0 0 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      display: flex;
      flex-direction: column;
      gap: var(--s5);
    }

    /* HERO WIDGET */
    .hero-card {
      padding: var(--s5) var(--s6);
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: var(--surface-raised);
      border: 1px solid var(--accent-border);
    }
    .hero-brand-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .hero-kicker {
      font-size: 11px;
      font-weight: 720;
      letter-spacing: 0.1em;
      color: var(--accent);
      text-transform: uppercase;
    }
    .hero-title {
      font-size: 28px;
      font-weight: 720;
      letter-spacing: -0.02em;
      color: var(--text-1);
      line-height: 1.15;
    }
    .hero-caption {
      font-size: var(--s4);
      color: var(--text-2);
    }
    .hero-segmented-nav {
      display: flex;
      gap: var(--s1);
      background: var(--surface-interactive);
      padding: var(--s1);
      border-radius: var(--r-pill);
      border: 1px solid var(--line);
      flex-shrink: 0;
    }
    .nav-segment-btn {
      background: transparent;
      border: none;
      color: var(--text-2);
      min-height: 44px;
      padding: 0 var(--s4);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--r-pill);
      font-size: var(--s3);
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .nav-segment-btn:hover { color: var(--text-1); }
    .nav-segment-btn:active { transform: scale(0.97); }
    .nav-segment-btn.is-selected {
      background: var(--accent);
      color: #ffffff;
    }

    /* GRIDS SYSTEM (Page 1) */
    .grid-top-quad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--s5);
    }

    .grid-mid-trio {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr 1.2fr;
      gap: var(--s5);
    }

    /* WEATHER WIDGET */
    .weather-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .weather-kpi-block { margin: var(--s1) 0; }
    .kpi-display {
      font-size: 32px;
      font-weight: 520;
      letter-spacing: -0.03em;
      color: var(--text-1);
    }
    .kpi-sub-label {
      font-size: var(--s3);
      color: var(--text-2);
      margin-top: 2px;
    }
    .weather-week-strip {
      display: flex;
      justify-content: space-between;
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
      font-size: 11px;
      color: var(--text-2);
    }
    .fc-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    /* ENERGY WIDGET */
    .energy-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .sparkline-bars {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 32px;
      padding-top: var(--s1);
    }
    .sparkline-bars span {
      flex: 1;
      border-radius: 2px 2px 0 0;
      background: rgba(255, 255, 255, 0.12);
    }
    :host([theme="light"]) .sparkline-bars span {
      background: rgba(18, 32, 38, 0.08);
    }
    .sparkline-bars span.is-hot {
      background: var(--accent);
    }

    /* POWER GAUGE WIDGET */
    .gauge-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .gauge-box {
      position: relative;
      width: 76px;
      height: 76px;
      margin: 0 auto;
    }
    .gauge-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .gauge-track {
      fill: none;
      stroke: var(--line);
      stroke-width: 8;
    }
    .gauge-indicator {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dasharray var(--motion-slow) var(--ease-apple);
    }
    .gauge-center-data {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1.1;
    }
    .gauge-value {
      font-size: 16px;
      font-weight: 720;
      color: var(--text-1);
    }
    .gauge-sub {
      font-size: 10px;
      color: var(--text-3);
    }
    .gauge-footer-note {
      font-size: 11px;
      color: var(--text-3);
      text-align: center;
    }

    /* AMBIENCE WIDGET */
    .ambience-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .status-badge {
      padding: 2px 8px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      font-size: 10px;
      font-weight: 720;
      letter-spacing: 0.06em;
    }
    .status-badge.is-preset {
      background: var(--accent-soft);
      border-color: var(--accent-border);
      color: var(--accent);
    }
    .ambience-center { margin: var(--s1) 0; }
    .ambience-title {
      font-size: 20px;
      font-weight: 720;
      color: var(--text-1);
    }
    .ambience-sub {
      font-size: var(--s3);
      color: var(--text-2);
      margin-top: 2px;
    }
    .ambience-footer {
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
    }

    /* ROOMS WIDGET */
    .rooms-card { gap: var(--s3); }
    .rooms-stack {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .room-row {
      min-height: 48px;
      padding: 8px 12px;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .room-row:hover {
      border-color: var(--accent-border);
    }
    .room-left {
      display: flex;
      align-items: center;
      gap: var(--s2);
    }
    .room-indicator {
      color: var(--text-3);
      display: flex;
    }
    .room-indicator.is-on { color: var(--accent); }
    .room-title {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
    }
    .room-tag {
      padding: 2px 8px;
      border-radius: var(--r-pill);
      background: var(--line);
      font-size: 11px;
      font-weight: 640;
      color: var(--text-2);
    }
    .room-tag.is-on {
      background: var(--accent-soft);
      color: var(--accent);
      border: 1px solid var(--accent-border);
    }

    /* SHORTCUTS (2x3) */
    .shortcuts-card { gap: var(--s3); }
    .shortcuts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .sc-item {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      padding: var(--s2) var(--s3);
      display: flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      min-height: 48px;
      transition: all var(--motion-fast);
    }
    .sc-item:hover {
      border-color: var(--accent-border);
      transform: translateY(-1px);
    }
    .sc-item:active {
      transform: scale(0.97);
    }
    .sc-item.is-highlight {
      background: var(--accent-soft);
      border-color: var(--accent-border);
    }
    .sc-ico {
      display: flex;
      color: var(--text-2);
      flex-shrink: 0;
    }
    .sc-text-col {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
    }
    .sc-heading {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sc-sub-text {
      font-size: 11px;
      color: var(--text-3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* CALENDAR WIDGET */
    .calendar-card { gap: var(--s3); }
    .calendar-events-stack {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
    }
    .agenda-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .agenda-subhead {
      font-size: 10px;
      font-weight: 720;
      letter-spacing: 0.08em;
      color: var(--text-3);
    }
    .event-item {
      display: flex;
      align-items: center;
      gap: var(--s2);
      min-height: 38px;
      padding: 6px 10px;
      background: var(--surface-interactive);
      border-radius: 8px;
      border-left: 2px solid var(--accent);
      font-size: 12px;
    }
    .event-hour {
      font-weight: 720;
      color: var(--accent);
      flex-shrink: 0;
    }
    .event-title {
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* PAGE 2 GRIDS & WIDGETS */
    .grid-page2-pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s5);
    }

    /* MEDIA EXPANDED */
    .media-expanded-card {
      min-height: 210px;
      justify-content: space-between;
    }
    .media-body-row {
      display: flex;
      align-items: center;
      gap: var(--s4);
      margin: var(--s2) 0;
    }
    .media-cover-box {
      width: 52px;
      height: 52px;
      border-radius: var(--r-control);
      background: linear-gradient(135deg, var(--accent) 0%, #1a1a24 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0;
    }
    .media-title-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    .media-headline {
      font-size: var(--s4);
      font-weight: 720;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .media-subhead {
      font-size: var(--s3);
      color: var(--text-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .media-ctrl-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--s3);
      border-top: 1px solid var(--line);
    }
    .media-transport-group {
      display: flex;
      align-items: center;
      gap: var(--s3);
    }
    .transport-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .transport-btn:hover { border-color: var(--accent-border); }
    .transport-btn:active { transform: scale(0.95); }
    .transport-btn.is-play-action {
      background: var(--accent);
      color: #ffffff;
      border: none;
    }
    .media-vol-group {
      display: flex;
      gap: 8px;
    }
    .vol-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: 640;
    }
    .vol-btn:hover { border-color: var(--accent-border); }
    .vol-btn:active { transform: scale(0.95); }

    /* LIGHTS SUMMARY */
    .lights-card {
      min-height: 210px;
      justify-content: space-between;
    }
    .lights-kpi-block { margin: var(--s1) 0; }
    .lights-breakdown-row {
      display: flex;
      gap: var(--s2);
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
      flex-wrap: wrap;
    }
    .chip-label {
      padding: 4px 10px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      font-size: 11px;
      color: var(--text-2);
    }

    /* SCENES 2x2 */
    .scenes-card { gap: var(--s3); }
    .scenes-quad-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .scene-box {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      min-height: 52px;
      padding: var(--s3) var(--s4);
      display: flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
      transition: all var(--motion-fast);
    }
    .scene-box:hover { border-color: var(--accent-border); }
    .scene-box:active { transform: scale(0.97); }
    .scene-box.is-accent {
      border-color: var(--accent-border);
      background: var(--accent-soft);
    }
    .scene-ico { display: flex; flex-shrink: 0; }

    /* RECENT ACTIVITY */
    .activity-card { gap: var(--s2); }
    .activity-feed {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .activity-entry {
      display: flex;
      align-items: center;
      gap: var(--s2);
      min-height: 36px;
      padding: 6px 10px;
      background: var(--surface-interactive);
      border-radius: 8px;
      font-size: 12px;
    }
    .entry-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
    }
    .entry-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
    }
    .entry-msg {
      font-weight: 640;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .entry-time { font-size: 10px; color: var(--text-3); }

    /* DIAGNOSTICS */
    .diag-card { gap: var(--s2); }
    .diag-quad {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .diag-cell {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 52px;
    }
    .cell-label { font-size: 11px; color: var(--text-3); font-weight: 640; }
    .cell-val { font-size: var(--s3); font-weight: 720; color: var(--state-success); }

    /* SYSTEM CARD */
    .system-card { justify-content: space-between; }
    .system-list {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
      margin-top: var(--s1);
    }
    .system-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--s3);
      padding: 8px 0;
      border-bottom: 1px solid var(--line);
    }
    .system-row strong { color: var(--text-1); }

    /* BOTTOM DOCK (Floating Architectural Pill) */
    .wit-dock {
      position: fixed;
      bottom: max(16px, env(safe-area-inset-bottom));
      left: 50%;
      transform: translateX(-50%);
      background: var(--glass);
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      padding: 6px var(--s3);
      display: flex;
      align-items: center;
      gap: var(--s2);
      z-index: 2000;
      max-width: calc(100vw - 32px);
    }
    :host([theme="light"]) .wit-dock {
      box-shadow: 0 16px 40px rgba(18, 32, 38, 0.14);
    }
    .dock-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--s2);
      min-height: 44px;
      padding: 0 var(--s4);
      border-radius: var(--r-pill);
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-2);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
      white-space: nowrap;
    }
    .dock-btn:hover {
      color: var(--text-1);
      background: var(--line);
    }
    .dock-btn:active {
      transform: scale(0.96);
    }
    .dock-dots-group {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 var(--s1);
    }
    .dock-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--line);
      cursor: pointer;
      transition: all var(--motion-normal);
    }
    .dock-dot.is-active {
      width: 20px;
      border-radius: var(--r-pill);
      background: var(--accent);
    }

    /* MODAL SHEETS & BOTTOM SHEETS */
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--s5);
      animation: fadeIn var(--motion-fast) ease-out;
    }
    :host([theme="light"]) .sheet-scrim {
      background: rgba(18, 32, 38, 0.4);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .sheet-modal {
      background: var(--surface-raised);
      border: 1px solid var(--line);
      border-radius: var(--r-panel);
      width: min(620px, calc(100vw - 40px));
      max-height: 85dvh;
      overflow-y: auto;
      padding: var(--s5);
      display: flex;
      flex-direction: column;
      gap: var(--s5);
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
      animation: scaleUp var(--motion-normal) var(--ease-apple);
    }
    @keyframes scaleUp {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sheet-title {
      font-size: 20px;
      font-weight: 720;
      color: var(--text-1);
    }
    .sheet-meta {
      font-size: var(--s3);
      color: var(--text-2);
    }
    .sheet-close-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .sheet-close-btn:hover {
      color: var(--text-1);
      border-color: var(--accent-border);
    }
    .sheet-close-btn:active {
      transform: scale(0.95);
    }

    .sheet-group-label {
      font-size: 11px;
      font-weight: 720;
      letter-spacing: 0.08em;
      color: var(--text-3);
      margin-bottom: var(--s2);
      display: block;
    }
    .switches-stack {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
    }
    .switch-row {
      min-height: 60px;
      padding: 0 var(--s4);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .switch-row:hover { border-color: var(--accent-border); }
    .switch-row:active { transform: scale(0.985); }
    .switch-row.is-on {
      border-color: var(--accent-border);
      background: var(--accent-soft);
    }
    .switch-left {
      display: flex;
      align-items: center;
      gap: var(--s3);
    }
    .switch-icon {
      display: flex;
      color: var(--text-3);
    }
    .switch-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .switch-name { font-size: var(--s3); font-weight: 640; color: var(--text-1); }
    .switch-meta { font-size: 11px; color: var(--text-2); }

    .switch-toggle {
      width: 48px;
      height: 26px;
      border-radius: var(--r-pill);
      background: var(--line);
      position: relative;
      transition: all var(--motion-normal);
      flex-shrink: 0;
    }
    .switch-toggle::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      top: 3px;
      left: 3px;
      transition: transform var(--motion-normal);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .switch-row.is-on .switch-toggle {
      background: var(--accent);
    }
    .switch-row.is-on .switch-toggle::after {
      transform: translateX(22px);
    }

    .sheet-actions {
      display: flex;
      gap: var(--s2);
      margin-top: var(--s2);
    }
    .sheet-action-btn {
      flex: 1;
      min-height: 48px;
      border-radius: var(--r-control);
      border: 1px solid var(--line);
      font-size: var(--s3);
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .sheet-action-btn:active { transform: scale(0.97); }
    .sheet-action-btn.is-primary {
      background: var(--accent);
      color: #ffffff;
      border: none;
    }
    .sheet-action-btn.is-danger {
      background: rgba(220, 38, 38, 0.15);
      color: var(--state-danger);
      border-color: rgba(220, 38, 38, 0.3);
    }

    .active-accent { color: var(--accent) !important; }

    /* ==========================================================================
       ARCHITECTURAL RESPONSIVE ADAPTATION SYSTEM (witmind-ui skill)
       Tier 1: Desktop (> 1200px)
       Tier 2: Laptop & Tablet Landscape (900px – 1199px)
       Tier 3: Tablet Portrait & Compact Panel (640px – 899px)
       Tier 4: Mobile Handheld (< 640px)
       ========================================================================== */

    /* Tier 2: Laptop & Tablet Landscape (<= 1180px) */
    @media (max-width: 1180px) {
      .app-frame {
        padding:
          max(var(--s4), env(safe-area-inset-top))
          max(var(--s5), env(safe-area-inset-right))
          max(100px, calc(env(safe-area-inset-bottom) + 78px))
          max(var(--s5), env(safe-area-inset-left));
        gap: var(--s4);
      }
      .grid-top-quad {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s4);
      }
      .grid-mid-trio {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s4);
      }
      .calendar-card {
        grid-column: 1 / -1;
      }
    }

    /* Tier 3: Tablet Portrait (<= 960px) */
    @media (max-width: 960px) {
      .header {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
          "brand clock"
          "pills pills";
        gap: var(--s3);
        min-height: auto;
      }
      .header-brand-wrap {
        display: contents;
      }
      .brand-block {
        grid-area: brand;
      }
      .header-clock-wrap {
        grid-area: clock;
      }
      .pills-strip {
        grid-area: pills;
        width: 100%;
        padding-bottom: 2px;
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);
      }
      .grid-mid-trio {
        grid-template-columns: 1fr;
        gap: var(--s4);
      }
      .calendar-card {
        grid-column: auto;
      }
    }

    /* Tier 4: Mobile & Touch Compact (<= 640px) */
    @media (max-width: 640px) {
      .app-frame {
        padding:
          max(var(--s3), env(safe-area-inset-top))
          max(var(--s3), env(safe-area-inset-right))
          max(92px, calc(env(safe-area-inset-bottom) + 72px))
          max(var(--s3), env(safe-area-inset-left));
        gap: var(--s3);
      }
      .card {
        padding: var(--s4);
      }
      .clock-digits {
        font-size: clamp(28px, 6.5vw, 36px);
      }
      .date-label {
        font-size: 11px;
      }
      .theme-toggle-btn {
        min-height: 28px;
        padding: 2px 8px;
        font-size: 10px;
      }
      .hero-card {
        flex-direction: column;
        align-items: stretch;
        gap: var(--s4);
        padding: var(--s4);
      }
      .hero-title {
        font-size: clamp(20px, 4.8vw, 24px);
      }
      .hero-segmented-nav {
        width: 100%;
        display: flex;
      }
      .nav-segment-btn {
        flex: 1;
        text-align: center;
        min-height: 44px;
        padding: 0 var(--s2);
      }
      .grid-top-quad {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .grid-mid-trio {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .grid-page2-pair {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .shortcuts-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--s2);
      }
      .sc-item {
        min-height: 48px;
        padding: 6px 10px;
      }
      .wit-dock {
        width: calc(100vw - 24px);
        max-width: 480px;
        justify-content: space-around;
        padding: 4px 6px;
        gap: 4px;
      }
      .dock-btn {
        padding: 0 var(--s2);
        min-height: 44px;
        font-size: 12px;
        gap: 6px;
      }
      .dock-dots-group {
        display: none;
      }

      /* Mobile Bottom Sheet Modal Transition */
      .sheet-scrim {
        align-items: flex-end;
        padding: 0;
      }
      .sheet-modal {
        width: 100%;
        max-height: 88dvh;
        border-radius: var(--r-panel) var(--r-panel) 0 0;
        border-bottom: none;
        padding: var(--s4) var(--s4) max(var(--s5), env(safe-area-inset-bottom)) var(--s4);
        gap: var(--s4);
        animation: slideUpSheet var(--motion-normal) var(--ease-apple);
      }
      @keyframes slideUpSheet {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    const urlTheme = new URLSearchParams(window.location.search).get("theme");
    if (urlTheme === "light" || urlTheme === "dark") {
      this.theme = urlTheme;
    }

    if (!this.hasAttribute("theme")) {
      this.setAttribute("theme", this.theme);
    }

    this._updateClock();
    this._timeInterval = window.setInterval(() => this._updateClock(), 1000);

    if (!this.hass && globalMockHass) {
      this._unsubscribeHass = globalMockHass.subscribe((h) => {
        this.hass = h;
        this.requestUpdate();
      });
    }

    this._subscribeEvents();
    this._fetchStatistics();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timeInterval) clearInterval(this._timeInterval);
    if (this._unsubscribeHass) this._unsubscribeHass();
    if (this._unsubEvents) this._unsubEvents();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("theme")) {
      document.documentElement.setAttribute("theme", this.theme);
      if (this.theme === "light") {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
      } else {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
      }
    }
  }

  private _updateClock() {
    const now = new Date();
    this._timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    this._dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  }

  private _subscribeEvents() {
    if (this.hass?.connection?.subscribeEvents) {
      try {
        this.hass.connection
          .subscribeEvents((ev: any) => {
            if (ev?.event_type === "state_changed" && ev?.data?.entity_id) {
              const entityId = ev.data.entity_id;
              const newState = ev.data.new_state?.state;
              const name = ev.data.new_state?.attributes?.friendly_name || entityId.split(".")[1] || entityId;
              const type = entityId.startsWith("switch") ? "light" : entityId.startsWith("media") ? "media" : "scene";
              this._recentActivity.unshift({
                text: `${name}: ${newState === "on" ? "Encendido" : newState === "off" ? "Apagado" : newState}`,
                time: "hace un momento",
                type
              });
              if (this._recentActivity.length > 8) this._recentActivity.pop();
              this.requestUpdate();
            }
          }, "state_changed")
          .then((unsub: any) => {
            this._unsubEvents = unsub;
          })
          .catch(() => {});
      } catch (_e) {}
    }
  }

  private async _fetchStatistics() {
    if (this.hass?.connection?.sendMessagePromise || this.hass?.callWS) {
      try {
        const now = Date.now();
        const start = now - 24 * 3600 * 1000;
        const msg = {
          type: "recorder/statistics_during_period",
          start_time: new Date(start).toISOString(),
          end_time: new Date(now).toISOString(),
          statistic_ids: [ENTITIES.energy],
          period: "hour"
        };
        let res: any = null;
        if (this.hass.connection?.sendMessagePromise) {
          res = await this.hass.connection.sendMessagePromise(msg);
        } else if (this.hass.callWS) {
          res = await this.hass.callWS(msg);
        }

        if (res && res[ENTITIES.energy]) {
          this._stats = res[ENTITIES.energy];
          this.requestUpdate();
        }
      } catch (_e) {}
    }
  }

  private _state(entityId: string) {
    return this.hass?.states?.[entityId];
  }

  private _value(entityId: string, fallback = "—") {
    return this._state(entityId)?.state ?? fallback;
  }

  private _attr(entityId: string, attrName: string, fallback: any = null) {
    return this._state(entityId)?.attributes?.[attrName] ?? fallback;
  }

  private _callService(domain: string, service: string, data = {}) {
    if (this.hass?.callService) {
      this.hass.callService(domain, service, data);
    }
  }

  private _toggleSwitch(entityId: string) {
    const curr = this._value(entityId, "off");
    const desired = curr === "on" ? "turn_off" : "turn_on";
    this._callService("switch", desired, { entity_id: entityId });
  }

  private _toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.setAttribute("theme", this.theme);
  }

  private _openSheet(name: string) {
    this._sheet = name;
  }

  private _closeSheet() {
    this._sheet = null;
  }

  private _setPage(pageNum: number) {
    this._page = pageNum;
    const track = this.shadowRoot?.querySelector("#carouselTrack");
    if (track) {
      const targetPane = this.shadowRoot?.querySelectorAll(".carousel-pane")?.[pageNum];
      if (targetPane) {
        targetPane.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    }
  }

  private _detectActiveAmbience() {
    const s1 = this._value("switch.interruptor_inteligente_switch_1");
    const s2 = this._value("switch.interruptor_inteligente_switch_2");
    const s3 = this._value("switch.interruptor_inteligente_switch_3");
    const s4 = this._value("switch.interruptor_inteligente_switch_4");
    const slims = this._value("switch.interruptor_inteligente_2_switch_3");
    const count = Number(this._value(ENTITIES.lightCount, "0"));

    if (count === 0) return { name: "Reposo", sub: "Todo apagado", isPreset: false };
    if (s1 === "on" && s4 === "on" && s2 === "off" && s3 === "off" && slims === "off") {
      return { name: "Presentación", sub: "Ventana + TV activas", isPreset: true };
    }
    if (s1 === "on" && s2 === "on" && s3 === "off" && s4 === "off" && slims === "off") {
      return { name: "Reunión", sub: "Spots 2×3 + Ventana", isPreset: true };
    }
    if (count === 9) return { name: "Encendido Total", sub: "Todos los circuitos", isPreset: true };
    return { name: "Personalizado", sub: `${count} luminarias activas`, isPreset: false };
  }

  /* RENDER SECTIONS */

  private _renderStatusPills(totalActive: number, powerWattsVal: number, isPlaying: boolean, energyKwhVal: string, batteryVal: number, isBatteryLow: boolean) {
    return html`
      ${isBatteryLow
        ? html`
            <div class="status-pill is-warning" id="pillBatWarn" @click=${() => this._setPage(1)}>
              <span class="pill-icon">${renderSvg("alertTriangle")}</span>
              <div class="pill-texts">
                <span class="pill-title">Batería baja</span>
                <span class="pill-meta">${batteryVal}%</span>
              </div>
            </div>
          `
        : null}

      <div class="status-pill is-active-pill" id="pillLights" @click=${() => this._openSheet("lights")}>
        <span class="pill-icon active-accent">${renderSvg("bulb")}</span>
        <div class="pill-texts">
          <span class="pill-title">${totalActive} luces</span>
          <span class="pill-meta">${powerWattsVal} W</span>
        </div>
      </div>

      <div class="status-pill" id="pillMedia" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
        <span class="pill-icon ${isPlaying ? "active-accent" : ""}">${renderSvg("music")}</span>
        <div class="pill-texts">
          <span class="pill-title">${isPlaying ? "Ambient Lounge" : "Audio en pausa"}</span>
          <span class="pill-meta">Witmind Studio</span>
        </div>
      </div>

      <div class="status-pill" id="pillEnergy" @click=${() => this._setPage(1)}>
        <span class="pill-icon">${renderSvg("zap")}</span>
        <div class="pill-texts">
          <span class="pill-title">${energyKwhVal} kWh</span>
          <span class="pill-meta">Consumo hoy</span>
        </div>
      </div>
    `;
  }

  private _renderHeroWidget(totalActive: number, powerWatts: number) {
    return html`
      <section class="card hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Iluminación de precisión</h1>
          <p class="hero-caption">
            ${totalActive} de ${ALL_CIRCUITS.length} luminarias activas • ${powerWatts} W de carga
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button
            class="nav-segment-btn ${this._page === 0 ? "is-selected" : ""}"
            id="navSegHome"
            @click=${() => this._setPage(0)}
          >
            Inicio
          </button>
          <button
            class="nav-segment-btn"
            id="navSegLights"
            @click=${() => this._openSheet("lights")}
          >
            Luces
          </button>
          <button
            class="nav-segment-btn ${this._page === 1 ? "is-selected" : ""}"
            id="navSegMore"
            @click=${() => this._setPage(1)}
          >
            Analítica
          </button>
        </div>
      </section>
    `;
  }

  private _renderWeatherWidget(weatherTemp: string, weatherState: string, weatherHumidity: string) {
    return html`
      <div class="card weather-card interactive" id="widgetWeather" @click=${() => this._setPage(1)}>
        <div class="card-head">
          <span class="card-kicker">Clima</span>
          <span class="card-head-icon">${renderSvg("sun")}</span>
        </div>
        <div class="weather-kpi-block">
          <div class="kpi-display">${weatherTemp}°</div>
          <div class="kpi-sub-label">${weatherState === "sunny" ? "Soleado" : weatherState} • Humedad ${weatherHumidity}%</div>
        </div>
        <div class="weather-week-strip">
          <div class="fc-col"><span>Hoy</span><strong class="active-accent">24°</strong></div>
          <div class="fc-col"><span>Mañana</span><strong>23°</strong></div>
          <div class="fc-col"><span>Sáb</span><strong>25°</strong></div>
          <div class="fc-col"><span>Dom</span><strong>21°</strong></div>
        </div>
      </div>
    `;
  }

  private _renderEnergyWidget(powerWatts: number, energyKwh: string) {
    return html`
      <div class="card energy-card interactive" id="widgetEnergy" @click=${() => this._setPage(1)}>
        <div class="card-head">
          <span class="card-kicker">Energía</span>
          <span class="card-head-icon">${renderSvg("zap")}</span>
        </div>
        <div class="energy-kpi-block">
          <div class="kpi-display">${powerWatts} W</div>
          <div class="kpi-sub-label">${energyKwh} kWh consumidos</div>
        </div>
        ${this._renderCleanSparkline(this._stats)}
      </div>
    `;
  }

  private _renderCleanSparkline(stats: any[]) {
    if (!stats || stats.length === 0) {
      return html`
        <div class="sparkline-bars">
          <span style="height: 25%;"></span>
          <span style="height: 40%;"></span>
          <span style="height: 60%;"></span>
          <span style="height: 85%;" class="is-hot"></span>
          <span style="height: 100%;" class="is-hot"></span>
          <span style="height: 70%;"></span>
          <span style="height: 45%;"></span>
          <span style="height: 30%;"></span>
        </div>
      `;
    }

    const maxMean = Math.max(...stats.map((s) => s.mean || (s.change ? s.change * 1000 : 0)), 100);

    return html`
      <div class="sparkline-bars">
        ${stats.slice(0, 16).map((s) => {
          const w = s.mean || (s.change ? s.change * 1000 : 0);
          const pct = Math.max(12, Math.min(100, (w / maxMean) * 100));
          const isHot = w > maxMean * 0.4;
          return html`<span style="height: ${pct}%;" class="${isHot ? "is-hot" : ""}"></span>`;
        })}
      </div>
    `;
  }

  private _renderPowerGaugeWidget(powerWatts: number) {
    const pct = Math.min(100, Math.max(0, Math.round((powerWatts / TOTAL_NOMINAL_CAPACITY_W) * 100)));
    const strokeDash = `${pct * 2.51} 251.2`;
    const gaugeColor = pct > 85 ? "var(--state-danger)" : pct > 60 ? "var(--state-warning)" : "var(--accent)";

    return html`
      <div class="card gauge-card">
        <div class="card-head">
          <span class="card-kicker">Carga Eléctrica</span>
          <span class="card-head-meta">${TOTAL_NOMINAL_CAPACITY_W} W MAX</span>
        </div>
        <div class="gauge-box">
          <svg class="gauge-svg" viewBox="0 0 100 100">
            <circle class="gauge-track" cx="50" cy="50" r="40"/>
            <circle
              class="gauge-indicator"
              cx="50"
              cy="50"
              r="40"
              style="stroke-dasharray: ${strokeDash}; stroke: ${gaugeColor};"
            />
          </svg>
          <div class="gauge-center-data">
            <span class="gauge-value">${pct}%</span>
            <span class="gauge-sub">${powerWatts} W</span>
          </div>
        </div>
        <div class="gauge-footer-note">Capacidad nominal activa</div>
      </div>
    `;
  }

  private _renderActiveAmbienceWidget(activeAmbience: { name: string; sub: string; isPreset: boolean }) {
    return html`
      <div class="card ambience-card">
        <div class="card-head">
          <span class="card-kicker">Ambiente Activo</span>
          <span class="status-badge ${activeAmbience.isPreset ? "is-preset" : ""}">${activeAmbience.isPreset ? "PRESET" : "MANUAL"}</span>
        </div>
        <div class="ambience-center">
          <div class="ambience-title">${activeAmbience.name}</div>
          <div class="ambience-sub">${activeAmbience.sub}</div>
        </div>
        <div class="ambience-footer">
          <span class="active-accent" style="font-size: 11px; font-weight: 520;">Control dinámico del showroom</span>
        </div>
      </div>
    `;
  }

  private _renderRoomsWidget(spotsOn: number, samplesOn: number, reflectorOn: number, isPlaying: boolean, powerWatts: number) {
    return html`
      <div class="card rooms-card">
        <div class="card-head">
          <span class="card-kicker">Zonas</span>
          <span class="card-head-icon">${renderSvg("layers")}</span>
        </div>
        <div class="rooms-stack">
          <div class="room-row interactive" id="rowSpots" @click=${() => this._openSheet("lights")}>
            <div class="room-left">
              <span class="room-indicator ${spotsOn > 0 ? "is-on" : ""}">${renderSvg("bulb")}</span>
              <span class="room-title">Spots</span>
            </div>
            <span class="room-tag ${spotsOn > 0 ? "is-on" : ""}">${spotsOn} / 4</span>
          </div>

          <div class="room-row interactive" id="rowSamples" @click=${() => this._openSheet("lights")}>
            <div class="room-left">
              <span class="room-indicator ${samplesOn > 0 ? "is-on" : ""}">${renderSvg("layers")}</span>
              <span class="room-title">Muestrarios & Paneles</span>
            </div>
            <span class="room-tag ${samplesOn > 0 ? "is-on" : ""}">${samplesOn} / 5</span>
          </div>

          <div class="room-row interactive" id="rowReflector" @click=${() => this._toggleSwitch(REFLECTOR.id)}>
            <div class="room-left">
              <span class="room-indicator ${reflectorOn > 0 ? "is-on" : ""}">${renderSvg("bulb")}</span>
              <span class="room-title">Reflector Exterior</span>
            </div>
            <span class="room-tag ${reflectorOn > 0 ? "is-on" : ""}">${reflectorOn > 0 ? "On" : "Off"}</span>
          </div>

          <div class="room-row interactive" id="rowMedia" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
            <div class="room-left">
              <span class="room-indicator ${isPlaying ? "is-on" : ""}">${renderSvg("music")}</span>
              <span class="room-title">Multimedia</span>
            </div>
            <span class="room-tag ${isPlaying ? "is-on" : ""}">${isPlaying ? "Playing" : "Paused"}</span>
          </div>

          <div class="room-row interactive" id="rowEnergy" @click=${() => this._setPage(1)}>
            <div class="room-left">
              <span class="room-indicator is-on">${renderSvg("zap")}</span>
              <span class="room-title">Carga General</span>
            </div>
            <span class="room-tag is-on">${powerWatts} W</span>
          </div>
        </div>
      </div>
    `;
  }

  private _renderShortcutsWidget() {
    return html`
      <div class="card shortcuts-card">
        <div class="card-head">
          <span class="card-kicker">Accesos Rápidos</span>
          <span class="card-head-meta">2 × 3</span>
        </div>
        <div class="shortcuts-grid">
          <div class="sc-item interactive" id="scPres" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.presentation })}>
            <span class="sc-ico">${renderSvg("sparkles")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Presentación</span>
              <span class="sc-sub-text">Ventana + TV</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scMeet" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.meeting })}>
            <span class="sc-ico">${renderSvg("users")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Reunión</span>
              <span class="sc-sub-text">2×3 + Ventana</span>
            </div>
          </div>

          <div class="sc-item interactive is-highlight" id="scAllOn" @click=${() => this._callService("script", "showroom_encendido_general", { entity_id: ENTITIES.allOn })}>
            <span class="sc-ico active-accent">${renderSvg("sun")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Todos ON</span>
              <span class="sc-sub-text">General</span>
            </div>
          </div>

          <div class="sc-item interactive is-dim" id="scAllOff" @click=${() => this._callService("script", "showroom_apagado_general", { entity_id: ENTITIES.allOff })}>
            <span class="sc-ico">${renderSvg("moon")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Todos OFF</span>
              <span class="sc-sub-text">Apagado</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scSpotsOnly" @click=${() => SPOTS.forEach((s) => this._callService("switch", "turn_on", { entity_id: s.id }))}>
            <span class="sc-ico">${renderSvg("bulb")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Solo Spots</span>
              <span class="sc-sub-text">4 circuitos</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scSamplesOnly" @click=${() => SAMPLES.forEach((s) => this._callService("switch", "turn_on", { entity_id: s.id }))}>
            <span class="sc-ico">${renderSvg("layers")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Solo Muestras</span>
              <span class="sc-sub-text">5 paneles</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderCalendarWidget() {
    return html`
      <div class="card calendar-card">
        <div class="card-head">
          <span class="card-kicker">Agenda</span>
          <span class="card-head-icon">${renderSvg("calendar")}</span>
        </div>
        <div class="calendar-events-stack">
          <div class="agenda-group">
            <span class="agenda-subhead">HOY</span>
            <div class="event-item">
              <span class="event-hour">09:00</span>
              <span class="event-title">Presentación ejecutiva showroom</span>
            </div>
            <div class="event-item">
              <span class="event-hour">11:30</span>
              <span class="event-title">Reunión técnica de iluminación</span>
            </div>
          </div>
          <div class="agenda-group">
            <span class="agenda-subhead">MAÑANA</span>
            <div class="event-item">
              <span class="event-hour">10:00</span>
              <span class="event-title">Demostración dinámica para clientes</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderMediaWidget(mediaTitle: string, mediaArtist: string, isPlaying: boolean, mediaVolume: number) {
    return html`
      <div class="card media-expanded-card">
        <div class="card-head">
          <span class="card-kicker">Reproductor de Medios</span>
          <span class="card-head-meta">${mediaVolume}% Vol</span>
        </div>
        <div class="media-body-row">
          <div class="media-cover-box">${renderSvg("music")}</div>
          <div class="media-title-col">
            <div class="media-headline">${mediaTitle}</div>
            <div class="media-subhead">${mediaArtist}</div>
          </div>
        </div>
        <div class="media-ctrl-row">
          <div class="media-transport-group">
            <button class="transport-btn" id="btnMediaPrev" @click=${() => this._callService("media_player", "media_previous_track", { entity_id: ENTITIES.media })}>
              ${renderSvg("skipBack")}
            </button>
            <button class="transport-btn is-play-action" id="btnMediaPlay" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
              ${isPlaying ? renderSvg("pause") : renderSvg("play")}
            </button>
            <button class="transport-btn" id="btnMediaNext" @click=${() => this._callService("media_player", "media_next_track", { entity_id: ENTITIES.media })}>
              ${renderSvg("skipForward")}
            </button>
          </div>
          <div class="media-vol-group">
            <button class="vol-btn" id="btnVolDown" @click=${() => this._callService("media_player", "volume_down", { entity_id: ENTITIES.media })}>−</button>
            <button class="vol-btn" id="btnVolUp" @click=${() => this._callService("media_player", "volume_up", { entity_id: ENTITIES.media })}>+</button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderLightsSummaryWidget(totalActive: number, spotsOn: number, samplesOn: number, reflectorOn: number, powerWatts: number) {
    return html`
      <div class="card lights-card interactive" id="widgetLights" @click=${() => this._openSheet("lights")}>
        <div class="card-head">
          <span class="card-kicker">Iluminación</span>
          <span class="card-head-icon active-accent">${renderSvg("bulb")}</span>
        </div>
        <div class="lights-kpi-block">
          <div class="kpi-display">${totalActive} / ${ALL_CIRCUITS.length}</div>
          <div class="kpi-sub-label">Luminarias encendidas • ${powerWatts} W</div>
        </div>
        <div class="lights-breakdown-row">
          <span class="chip-label">Spots: <strong>${spotsOn}/4</strong></span>
          <span class="chip-label">Muestras: <strong>${samplesOn}/5</strong></span>
          <span class="chip-label">Reflector: <strong>${reflectorOn}/1</strong></span>
        </div>
      </div>
    `;
  }

  private _renderScenesWidget() {
    return html`
      <div class="card scenes-card">
        <div class="card-head">
          <span class="card-kicker">Escenas de Iluminación</span>
        </div>
        <div class="scenes-quad-grid">
          <div class="scene-box interactive" id="scenePres" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.presentation })}>
            <span class="scene-ico">${renderSvg("sparkles")}</span>
            <span>Presentación</span>
          </div>
          <div class="scene-box interactive" id="sceneMeet" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.meeting })}>
            <span class="scene-ico">${renderSvg("users")}</span>
            <span>Reunión</span>
          </div>
          <div class="scene-box interactive is-accent" id="sceneAllOn" @click=${() => this._callService("script", "showroom_encendido_general", { entity_id: ENTITIES.allOn })}>
            <span class="scene-ico">${renderSvg("sun")}</span>
            <span>Encender todo</span>
          </div>
          <div class="scene-box interactive" id="sceneAllOff" @click=${() => this._callService("script", "showroom_apagado_general", { entity_id: ENTITIES.allOff })}>
            <span class="scene-ico">${renderSvg("moon")}</span>
            <span>Apagar todo</span>
          </div>
        </div>
      </div>
    `;
  }

  private _renderRecentActivityWidget() {
    return html`
      <div class="card activity-card">
        <div class="card-head">
          <span class="card-kicker">Actividad Reciente</span>
          <span class="status-badge" style="color: var(--state-success);">${renderSvg("checkCircle")} EN VIVO</span>
        </div>
        <div class="activity-feed">
          ${this._recentActivity.map((a) => html`
            <div class="activity-entry">
              <span class="entry-bullet"></span>
              <div class="entry-texts">
                <span class="entry-msg">${a.text}</span>
                <span class="entry-time">${a.time}</span>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _renderDiagnosticsWidget() {
    return html`
      <div class="card diag-card">
        <div class="card-head">
          <span class="card-kicker">Diagnóstico del Sistema</span>
          <span class="status-badge" style="color: var(--state-success);">SISTEMA OK</span>
        </div>
        <div class="diag-quad">
          <div class="diag-cell">
            <span class="cell-label">Home Assistant</span>
            <span class="cell-val" style="color: var(--state-success);">Conectado</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Weather API</span>
            <span class="cell-val" style="color: var(--state-success);">Suscrito</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Recorder</span>
            <span class="cell-val" style="color: var(--state-success);">Sincronizado</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Circuitos</span>
            <span class="cell-val">${ALL_CIRCUITS.length} Online</span>
          </div>
        </div>
      </div>
    `;
  }

  private _renderSystemWidget(batteryVal: number) {
    return html`
      <div class="card system-card">
        <div class="card-head">
          <span class="card-kicker">Estado General</span>
        </div>
        <div class="system-list">
          <div class="system-row">
            <span>Tablet Showroom</span>
            <strong>${batteryVal}% Batería</strong>
          </div>
          <div class="system-row">
            <span>Servidor HA</span>
            <strong>Mock HA Provider</strong>
          </div>
          <div class="system-row">
            <span>Última sincronización</span>
            <strong>${this._timeStr}</strong>
          </div>
        </div>
      </div>
    `;
  }

  private _renderBottomDock(totalActive: number, powerWatts: number, isPlaying: boolean, batteryVal: number) {
    return html`
      <nav class="wit-dock">
        <button class="dock-btn" id="dockLights" @click=${() => this._openSheet("lights")}>
          <span class="active-accent">${renderSvg("bulb")}</span>
          <span>Luces ${totalActive}</span>
        </button>
        <button class="dock-btn" id="dockPower" @click=${() => this._setPage(1)}>
          <span>${renderSvg("zap")}</span>
          <span>${powerWatts} W</span>
        </button>
        <button class="dock-btn" id="dockMedia" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
          <span>${renderSvg("music")}</span>
          <span>${isPlaying ? "❚❚" : "▶"}</span>
        </button>
        <button class="dock-btn" id="dockBattery" @click=${() => this._setPage(1)}>
          <span>${renderSvg("battery")}</span>
          <span>${batteryVal}%</span>
        </button>
        <div class="dock-dots-group">
          <div
            class="dock-dot ${this._page === 0 ? "is-active" : ""}"
            id="dockDot0"
            title="Página 1: Operación"
            @click=${() => this._setPage(0)}
          ></div>
          <div
            class="dock-dot ${this._page === 1 ? "is-active" : ""}"
            id="dockDot1"
            title="Página 2: Analítica"
            @click=${() => this._setPage(1)}
          ></div>
        </div>
      </nav>
    `;
  }

  private _renderLightsSheet(totalActive: number, powerWatts: number) {
    return html`
      <div
        class="sheet-scrim"
        id="sheetScrim"
        @click=${(e: MouseEvent) => {
          if ((e.target as HTMLElement).id === "sheetScrim") this._closeSheet();
        }}
      >
        <div class="sheet-modal">
          <div class="sheet-header">
            <div>
              <h2 class="sheet-title">Control de Luminarias</h2>
              <p class="sheet-meta">${totalActive} de ${ALL_CIRCUITS.length} encendidas • ${powerWatts} W de carga</p>
            </div>
            <button class="sheet-close-btn" id="sheetCloseBtn" @click=${() => this._closeSheet()}>
              ${renderSvg("close")}
            </button>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">SPOTS</span>
            <div class="switches-stack">
              ${SPOTS.map((s) => {
                const isOn = this._value(s.id) === "on";
                return html`
                  <div
                    class="switch-row interactive ${isOn ? "is-on" : ""}"
                    data-entity-id="${s.id}"
                    @click=${() => this._toggleSwitch(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">${renderSvg("bulb")}</span>
                      <div class="switch-texts">
                        <span class="switch-name">${s.name}</span>
                        <span class="switch-meta">${s.subtitle} • ${s.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `;
              })}
            </div>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">MUESTRARIOS & PANELES</span>
            <div class="switches-stack">
              ${SAMPLES.map((s) => {
                const isOn = this._value(s.id) === "on";
                return html`
                  <div
                    class="switch-row interactive ${isOn ? "is-on" : ""}"
                    data-entity-id="${s.id}"
                    @click=${() => this._toggleSwitch(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">${renderSvg("bulb")}</span>
                      <div class="switch-texts">
                        <span class="switch-name">${s.name}</span>
                        <span class="switch-meta">${s.subtitle} • ${s.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `;
              })}
            </div>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">REFLECTOR EXTERIOR</span>
            <div class="switches-stack">
              <div
                class="switch-row interactive ${this._value(REFLECTOR.id) === "on" ? "is-on" : ""}"
                data-entity-id="${REFLECTOR.id}"
                @click=${() => this._toggleSwitch(REFLECTOR.id)}
              >
                <div class="switch-left">
                  <span class="switch-icon ${this._value(REFLECTOR.id) === "on" ? "active-accent" : ""}">${renderSvg("bulb")}</span>
                  <div class="switch-texts">
                    <span class="switch-name">${REFLECTOR.name}</span>
                    <span class="switch-meta">${REFLECTOR.subtitle}</span>
                  </div>
                </div>
                <div class="switch-toggle"></div>
              </div>
            </div>
          </div>

          <div class="sheet-actions">
            <button
              class="sheet-action-btn is-danger"
              id="modalTurnAllOff"
              @click=${() => this._callService("script", "showroom_apagado_general", { entity_id: ENTITIES.allOff })}
            >
              Apagar todo
            </button>
            <button
              class="sheet-action-btn is-primary"
              id="modalTurnAllOn"
              @click=${() => this._callService("script", "showroom_encendido_general", { entity_id: ENTITIES.allOn })}
            >
              Encender todo
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const powerWattsVal = Number(this._value(ENTITIES.power, "0"));
    const energyKwhVal = Number(this._value(ENTITIES.energy, "26.11")).toFixed(2);
    const batteryVal = Number(this._value(ENTITIES.battery, "98"));
    const isBatteryLow = batteryVal < 25;

    const weatherState = this._value(ENTITIES.weather, "sunny");
    const weatherTemp = this._attr(ENTITIES.weather, "temperature", "23.5");
    const weatherHumidity = this._attr(ENTITIES.weather, "humidity", "48");

    const mediaState = this._value(ENTITIES.media, "paused");
    const isPlaying = mediaState === "playing";
    const mediaTitle = this._attr(ENTITIES.media, "media_title", "Ambient Lounge Experience");
    const mediaArtist = this._attr(ENTITIES.media, "media_artist", "Witmind Studio");
    const mediaVolume = Math.round((this._attr(ENTITIES.media, "volume_level", 0.65) || 0.65) * 100);

    const spotsOn = SPOTS.filter((s) => this._value(s.id) === "on").length;
    const samplesOn = SAMPLES.filter((s) => this._value(s.id) === "on").length;
    const reflectorOn = this._value(REFLECTOR.id) === "on" ? 1 : 0;
    const totalActive = spotsOn + samplesOn + reflectorOn;

    const activeAmbience = this._detectActiveAmbience();
    const isLight = this.theme === "light";

    return html`
      <div class="app-frame">
        <!-- HEADER -->
        <header class="header">
          <div class="header-brand-wrap">
            <div class="brand-block">
              <span class="brand-name">WITMIND</span>
              <span class="brand-site">SHOWROOM · WTX MDTC</span>
            </div>

            <div class="pills-strip">
              ${this._renderStatusPills(totalActive, powerWattsVal, isPlaying, energyKwhVal, batteryVal, isBatteryLow)}
            </div>
          </div>

          <div class="header-clock-wrap">
            <div class="clock-digits" id="witClockDigits">${this._timeStr}</div>
            <div class="clock-date-row">
              <span class="date-label" id="witDateLabel">${this._dateStr}</span>
              <button
                class="theme-toggle-btn"
                id="btnThemeToggle"
                title="Cambiar tema claro/oscuro"
                @click=${this._toggleTheme}
              >
                ${isLight ? "☀️ Claro" : "🌙 Oscuro"}
              </button>
            </div>
          </div>
        </header>

        <!-- HORIZONTAL 2-PAGE CAROUSEL -->
        <div class="carousel-track" id="carouselTrack">
          <!-- PAGE 1: Operation / Glance -->
          <div class="carousel-pane">
            ${this._renderHeroWidget(totalActive, powerWattsVal)}

            <!-- Grid 1: 4 Quad Cards -->
            <div class="grid-top-quad">
              ${this._renderWeatherWidget(weatherTemp, weatherState, weatherHumidity)}
              ${this._renderEnergyWidget(powerWattsVal, energyKwhVal)}
              ${this._renderPowerGaugeWidget(powerWattsVal)}
              ${this._renderActiveAmbienceWidget(activeAmbience)}
            </div>

            <!-- Grid 2: 3 Mid Trio Cards -->
            <div class="grid-mid-trio">
              ${this._renderRoomsWidget(spotsOn, samplesOn, reflectorOn, isPlaying, powerWattsVal)}
              ${this._renderShortcutsWidget()}
              ${this._renderCalendarWidget()}
            </div>
          </div>

          <!-- PAGE 2: Analytics & Extended Controls -->
          <div class="carousel-pane">
            <div class="grid-page2-pair">
              ${this._renderMediaWidget(mediaTitle, mediaArtist, isPlaying, mediaVolume)}
              ${this._renderLightsSummaryWidget(totalActive, spotsOn, samplesOn, reflectorOn, powerWattsVal)}
            </div>

            <div class="grid-page2-pair">
              ${this._renderScenesWidget()}
              ${this._renderRecentActivityWidget()}
            </div>

            <div class="grid-page2-pair">
              ${this._renderDiagnosticsWidget()}
              ${this._renderSystemWidget(batteryVal)}
            </div>
          </div>
        </div>

        <!-- BOTTOM TRANSLUCENT DOCK -->
        ${this._renderBottomDock(totalActive, powerWattsVal, isPlaying, batteryVal)}

        <!-- LIGHTS SHEET MODAL -->
        ${this._sheet === "lights" ? this._renderLightsSheet(totalActive, powerWattsVal) : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "showroom-witmind-signature": ShowroomWitmindSignature;
  }
}
