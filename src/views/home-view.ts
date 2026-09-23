import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { renderSvg, ICONS } from "../utilities/icons.js";
import type { HomeAssistant } from "../types/home-assistant.js";

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
  subtitle: "Control aislado · 100 W",
  watts: 100
};

const ALL_CIRCUITS = [...SPOTS, ...SAMPLES, REFLECTOR];
const TOTAL_NOMINAL_CAPACITY_W = 1495;

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

@customElement("wit-home-view")
export class WitHomeView extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String, reflect: true })
  theme: "dark" | "light" = "dark";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--wit-space-5, 24px);
        width: 100%;
        user-select: none;
        -webkit-user-select: none;
      }

      /* CARD SYSTEM */
      .card {
        position: relative;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-card, 22px);
        padding: var(--wit-space-5, 24px);
        display: flex;
        flex-direction: column;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default),
                    border-color var(--wit-duration-fast) var(--wit-ease-default);
        overflow: hidden;
      }

      .card.interactive {
        cursor: pointer;
      }

      .card.interactive:hover {
        border-color: rgba(255, 255, 255, 0.16);
        transform: translateY(-1px);
      }

      :host([theme="light"]) .card.interactive:hover {
        border-color: rgba(18, 32, 38, 0.16);
      }

      .interactive:active {
        transform: scale(0.985);
      }

      .card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--wit-space-2, 8px);
      }

      .card-kicker {
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--wit-text-secondary);
      }

      .card-head-icon {
        color: var(--wit-text-tertiary);
        display: flex;
        align-items: center;
      }

      .card-head-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-tertiary);
      }

      .active-accent {
        color: var(--wit-accent) !important;
      }

      /* HERO WIDGET */
      .hero-card {
        padding: var(--wit-space-5, 24px) var(--wit-space-6, 32px);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-accent);
        border-radius: var(--wit-radius-card, 22px);
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
        color: var(--wit-accent);
        text-transform: uppercase;
      }

      .hero-title {
        font-size: 28px;
        font-weight: 720;
        letter-spacing: -0.02em;
        color: var(--wit-text-primary);
        margin: 0;
      }

      .hero-caption {
        font-size: var(--wit-space-4, 16px);
        color: var(--wit-text-secondary);
        margin: 0;
        font-variant-numeric: tabular-nums;
      }

      .hero-segmented-nav {
        display: flex;
        gap: var(--wit-space-1, 4px);
        background: var(--wit-surface-interactive);
        padding: var(--wit-space-1, 4px);
        border-radius: var(--wit-radius-pill, 999px);
        border: 1px solid var(--wit-border-subtle);
      }

      .nav-segment-btn {
        background: transparent;
        border: none;
        color: var(--wit-text-secondary);
        padding: var(--wit-space-2, 8px) var(--wit-space-4, 16px);
        border-radius: var(--wit-radius-pill, 999px);
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
        font-family: inherit;
      }

      .nav-segment-btn:hover {
        color: var(--wit-text-primary);
      }

      .nav-segment-btn.is-selected {
        background: var(--wit-accent);
        color: #ffffff;
      }

      /* GRIDS */
      .grid-top-quad {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--wit-space-5, 24px);
      }

      @media (max-width: 1180px) {
        .grid-top-quad {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 650px) {
        .grid-top-quad {
          grid-template-columns: 1fr;
        }
      }

      .grid-mid-trio {
        display: grid;
        grid-template-columns: 1.1fr 1.3fr 1.3fr;
        gap: var(--wit-space-5, 24px);
      }

      @media (max-width: 1100px) {
        .grid-mid-trio {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 720px) {
        .grid-mid-trio {
          grid-template-columns: 1fr;
        }
      }

      /* WEATHER CARD */
      .weather-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .weather-kpi-block {
        margin: var(--wit-space-1, 4px) 0;
      }

      .kpi-display {
        font-size: 32px;
        font-weight: 520;
        letter-spacing: -0.03em;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
      }

      .kpi-sub-label {
        font-size: var(--wit-space-3, 12px);
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .weather-week-strip {
        display: flex;
        justify-content: space-between;
        padding-top: var(--wit-space-2, 8px);
        border-top: 1px solid var(--wit-border-subtle);
        font-size: 11px;
        color: var(--wit-text-secondary);
      }

      .fc-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        font-variant-numeric: tabular-nums;
      }

      /* ENERGY CARD */
      .energy-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .energy-kpi-block {
        margin: var(--wit-space-1, 4px) 0;
      }

      .sparkline-bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 32px;
        padding-top: var(--wit-space-1, 4px);
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
        background: var(--wit-accent);
      }

      /* POWER GAUGE CARD */
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
        stroke: var(--wit-border-subtle);
        stroke-width: 8;
      }

      .gauge-indicator {
        fill: none;
        stroke-width: 8;
        stroke-linecap: round;
        transition: stroke-dasharray var(--wit-duration-modal, 300ms) var(--wit-ease-default);
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
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .gauge-sub {
        font-size: 10px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      .gauge-footer-note {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        text-align: center;
      }

      /* AMBIENCE CARD */
      .ambience-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .status-badge {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
        color: var(--wit-text-secondary);
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.06em;
      }

      .status-badge.is-preset {
        background: var(--wit-accent-muted, rgba(242, 101, 34, 0.12));
        border-color: var(--wit-border-accent);
        color: var(--wit-accent);
      }

      .ambience-center {
        margin: var(--wit-space-1, 4px) 0;
      }

      .ambience-title {
        font-size: 20px;
        font-weight: 720;
        color: var(--wit-text-primary);
      }

      .ambience-sub {
        font-size: var(--wit-space-3, 12px);
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .ambience-footer {
        padding-top: var(--wit-space-2, 8px);
        border-top: 1px solid var(--wit-border-subtle);
      }

      /* ROOMS CARD */
      .rooms-card {
        gap: var(--wit-space-3, 12px);
      }

      .rooms-stack {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .room-row {
        padding: 8px 12px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
      }

      .room-row:hover {
        border-color: var(--wit-border-accent);
      }

      .room-left {
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
      }

      .room-indicator {
        color: var(--wit-text-tertiary);
        display: flex;
      }

      .room-indicator.is-on {
        color: var(--wit-accent);
      }

      .room-title {
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .room-tag {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-border-subtle);
        font-size: 11px;
        font-weight: 640;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      .room-tag.is-on {
        background: var(--wit-accent-muted, rgba(242, 101, 34, 0.12));
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-accent);
      }

      /* SHORTCUTS CARD */
      .shortcuts-card {
        gap: var(--wit-space-3, 12px);
      }

      .shortcuts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--wit-space-2, 8px);
      }

      .sc-item {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-control, 14px);
        padding: var(--wit-space-2, 8px) var(--wit-space-3, 12px);
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        cursor: pointer;
        min-height: 48px;
        transition: all var(--wit-duration-fast);
      }

      .sc-item:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .sc-item.is-highlight {
        background: var(--wit-accent-muted, rgba(242, 101, 34, 0.12));
        border-color: var(--wit-border-accent);
      }

      .sc-item.is-dim {
        opacity: 0.9;
      }

      .sc-ico {
        display: flex;
        color: var(--wit-text-secondary);
      }

      .sc-text-col {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .sc-heading {
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .sc-sub-text {
        font-size: 11px;
        color: var(--wit-text-tertiary);
      }

      /* CALENDAR CARD */
      .calendar-card {
        gap: var(--wit-space-3, 12px);
      }

      .calendar-events-stack {
        display: flex;
        flex-direction: column;
        gap: var(--wit-space-2, 8px);
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
        color: var(--wit-text-tertiary);
      }

      .event-item {
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        padding: 6px 10px;
        background: var(--wit-surface-interactive);
        border-radius: 8px;
        border-left: 2px solid var(--wit-accent);
        font-size: 12px;
      }

      .event-hour {
        font-weight: 720;
        color: var(--wit-accent);
        font-variant-numeric: tabular-nums;
      }

      .event-title {
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ];

  private _detectActiveAmbience() {
    const states = this.hass?.states || {};
    const s1 = states["switch.interruptor_inteligente_switch_1"]?.state;
    const s2 = states["switch.interruptor_inteligente_switch_2"]?.state;
    const s3 = states["switch.interruptor_inteligente_switch_3"]?.state;
    const s4 = states["switch.interruptor_inteligente_switch_4"]?.state;
    const slims = states["switch.interruptor_inteligente_2_switch_3"]?.state;
    const count = Number(states[ENTITIES.lightCount]?.state ?? "0");

    if (count === 0) return { name: "Reposo", sub: "Todo apagado", isPreset: false };
    if (s1 === "on" && s4 === "on" && s2 === "off" && s3 === "off" && slims === "off") {
      return { name: "Presentación", sub: "Ventana + TV activas", isPreset: true };
    }
    if (s1 === "on" && s2 === "on" && s3 === "off" && s4 === "off" && slims === "off") {
      return { name: "Reunión", sub: "Spots 2×3 + Ventana", isPreset: true };
    }
    if (count === 9 || count === 10) return { name: "Encendido Total", sub: "Todos los circuitos", isPreset: true };
    return { name: "Personalizado", sub: `${count} luminarias activas`, isPreset: false };
  }

  private _callService(domain: string, service: string, data: Record<string, any> = {}) {
    if (this.hass?.callService) {
      this.hass.callService(domain, service, data);
    }
  }

  private _toggleSwitch(entityId: string) {
    const curr = this.hass?.states?.[entityId]?.state || "off";
    const desired = curr === "on" ? "turn_off" : "turn_on";
    this._callService("switch", desired, { entity_id: entityId });
  }

  private _handleLightsSheetOpen() {
    this.dispatchEvent(new CustomEvent("open-lights-sheet", {
      bubbles: true,
      composed: true
    }));
  }

  private _handleViewChange(view: string) {
    this.dispatchEvent(new CustomEvent("view-change", {
      detail: { view },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const states = this.hass?.states || {};

    let totalActive = 0;
    let powerWatts = 0;
    let spotsOn = 0;
    let samplesOn = 0;

    for (const s of SPOTS) {
      if (states[s.id]?.state === "on") {
        totalActive++;
        powerWatts += s.watts;
        spotsOn++;
      }
    }

    for (const s of SAMPLES) {
      if (states[s.id]?.state === "on") {
        totalActive++;
        powerWatts += s.watts;
        samplesOn++;
      }
    }

    const reflectorOn = states[REFLECTOR.id]?.state === "on" ? 1 : 0;
    if (reflectorOn) totalActive++;

    const weatherTemp = states[ENTITIES.weather]?.attributes?.temperature ?? "23.5";
    const weatherState = states[ENTITIES.weather]?.state ?? "sunny";
    const weatherHumidity = states[ENTITIES.weather]?.attributes?.humidity ?? "48";

    const energyKwh = Number(states[ENTITIES.energy]?.state ?? "26.11").toFixed(2);
    const isPlaying = states[ENTITIES.media]?.state === "playing";

    const pct = Math.min(100, Math.max(0, Math.round((powerWatts / TOTAL_NOMINAL_CAPACITY_W) * 100)));
    const strokeDash = `${pct * 2.51} 251.2`;
    const gaugeColor = pct > 85 ? "var(--wit-danger, #dc2626)" : pct > 60 ? "var(--wit-warning, #d97706)" : "var(--wit-accent, #f26522)";

    const activeAmbience = this._detectActiveAmbience();

    return html`
      <!-- HERO WIDGET -->
      <section class="card hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Iluminación de precisión</h1>
          <p class="hero-caption">
            ${totalActive} de ${ALL_CIRCUITS.length} luminarias activas • ${powerWatts} W de carga
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button class="nav-segment-btn is-selected" id="navSegHome" @click=${() => this._handleViewChange("home")}>
            Inicio
          </button>
          <button class="nav-segment-btn" id="navSegLights" @click=${this._handleLightsSheetOpen}>
            Luces
          </button>
          <button class="nav-segment-btn" id="navSegMore" @click=${() => this._handleViewChange("energy")}>
            Analítica
          </button>
        </div>
      </section>

      <!-- TOP QUAD GRID -->
      <div class="grid-top-quad">
        <!-- 1. Weather -->
        <div class="card weather-card interactive" id="widgetWeather" @click=${() => this._handleViewChange("energy")}>
          <div class="card-head">
            <span class="card-kicker">Clima</span>
            <span class="card-head-icon">${renderSvg(ICONS.sun)}</span>
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

        <!-- 2. Energy -->
        <div class="card energy-card interactive" id="widgetEnergy" @click=${() => this._handleViewChange("energy")}>
          <div class="card-head">
            <span class="card-kicker">Energía</span>
            <span class="card-head-icon">${renderSvg(ICONS.zap)}</span>
          </div>
          <div class="energy-kpi-block">
            <div class="kpi-display">${powerWatts} W</div>
            <div class="kpi-sub-label">${energyKwh} kWh consumidos</div>
          </div>
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
        </div>

        <!-- 3. Power Gauge -->
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

        <!-- 4. Active Ambience -->
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
      </div>

      <!-- MID TRIO GRID -->
      <div class="grid-mid-trio">
        <!-- 1. Zonas (5 rows) -->
        <div class="card rooms-card">
          <div class="card-head">
            <span class="card-kicker">Zonas</span>
            <span class="card-head-icon">${renderSvg(ICONS.layers)}</span>
          </div>
          <div class="rooms-stack">
            <div class="room-row interactive" id="rowSpots" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${spotsOn > 0 ? "is-on" : ""}">${renderSvg(ICONS.bulb)}</span>
                <span class="room-title">Spots</span>
              </div>
              <span class="room-tag ${spotsOn > 0 ? "is-on" : ""}">${spotsOn} / 4</span>
            </div>

            <div class="room-row interactive" id="rowSamples" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${samplesOn > 0 ? "is-on" : ""}">${renderSvg(ICONS.layers)}</span>
                <span class="room-title">Muestrarios & Paneles</span>
              </div>
              <span class="room-tag ${samplesOn > 0 ? "is-on" : ""}">${samplesOn} / 5</span>
            </div>

            <div class="room-row interactive" id="rowReflector" @click=${() => this._toggleSwitch(REFLECTOR.id)}>
              <div class="room-left">
                <span class="room-indicator ${reflectorOn > 0 ? "is-on" : ""}">${renderSvg(ICONS.bulb)}</span>
                <span class="room-title">Reflector Exterior</span>
              </div>
              <span class="room-tag ${reflectorOn > 0 ? "is-on" : ""}">${reflectorOn > 0 ? "On" : "Off"}</span>
            </div>

            <div class="room-row interactive" id="rowMedia" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
              <div class="room-left">
                <span class="room-indicator ${isPlaying ? "is-on" : ""}">${renderSvg(ICONS.music)}</span>
                <span class="room-title">Multimedia</span>
              </div>
              <span class="room-tag ${isPlaying ? "is-on" : ""}">${isPlaying ? "Playing" : "Paused"}</span>
            </div>

            <div class="room-row interactive" id="rowEnergy" @click=${() => this._handleViewChange("energy")}>
              <div class="room-left">
                <span class="room-indicator is-on">${renderSvg(ICONS.zap)}</span>
                <span class="room-title">Carga General</span>
              </div>
              <span class="room-tag is-on">${powerWatts} W</span>
            </div>
          </div>
        </div>

        <!-- 2. Accesos Rápidos (2x3 Grid) -->
        <div class="card shortcuts-card">
          <div class="card-head">
            <span class="card-kicker">Accesos Rápidos</span>
            <span class="card-head-meta">2 × 3</span>
          </div>
          <div class="shortcuts-grid">
            <div class="sc-item interactive" id="scPres" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.presentation })}>
              <span class="sc-ico">${renderSvg(ICONS.sparkles)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Presentación</span>
                <span class="sc-sub-text">Ventana + TV</span>
              </div>
            </div>

            <div class="sc-item interactive" id="scMeet" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.meeting })}>
              <span class="sc-ico">${renderSvg(ICONS.users)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Reunión</span>
                <span class="sc-sub-text">2×3 + Ventana</span>
              </div>
            </div>

            <div class="sc-item interactive is-highlight" id="scAllOn" @click=${() => this._callService("script", "showroom_encendido_general", { entity_id: ENTITIES.allOn })}>
              <span class="sc-ico active-accent">${renderSvg(ICONS.sun)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos ON</span>
                <span class="sc-sub-text">General</span>
              </div>
            </div>

            <div class="sc-item interactive is-dim" id="scAllOff" @click=${() => this._callService("script", "showroom_apagado_general", { entity_id: ENTITIES.allOff })}>
              <span class="sc-ico">${renderSvg(ICONS.moon)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos OFF</span>
                <span class="sc-sub-text">Apagado</span>
              </div>
            </div>

            <div class="sc-item interactive" id="scSpotsOnly" @click=${() => SPOTS.forEach((s) => this._callService("switch", "turn_on", { entity_id: s.id }))}>
              <span class="sc-ico">${renderSvg(ICONS.bulb)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Spots</span>
                <span class="sc-sub-text">4 circuitos</span>
              </div>
            </div>

            <div class="sc-item interactive" id="scSamplesOnly" @click=${() => SAMPLES.forEach((s) => this._callService("switch", "turn_on", { entity_id: s.id }))}>
              <span class="sc-ico">${renderSvg(ICONS.layers)}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Muestras</span>
                <span class="sc-sub-text">5 paneles</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Agenda (Calendar) -->
        <div class="card calendar-card">
          <div class="card-head">
            <span class="card-kicker">Agenda</span>
            <span class="card-head-icon">${renderSvg(ICONS.calendar)}</span>
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-home-view": WitHomeView;
  }
}
