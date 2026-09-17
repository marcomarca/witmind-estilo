import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { renderIcon } from "../utilities/icon.js";
import type { HomeAssistant } from "../types/home-assistant.js";

const SPOTS = [
  { id: "switch.interruptor_inteligente_switch_1", name: "Spots ventana", subtitle: "Zona ventana", watts: 100 },
  { id: "switch.interruptor_inteligente_switch_2", name: "Spots 2×3", subtitle: "Muestra 2 × 3", watts: 120 },
  { id: "switch.interruptor_inteligente_switch_3", name: "Spots 3×3", subtitle: "Muestra 3 × 3", watts: 180 },
  { id: "switch.interruptor_inteligente_switch_4", name: "Spots TV", subtitle: "Zona audiovisual", watts: 25 }
];

const SAMPLES = [
  { id: "switch.interruptor_inteligente_2_switch_1", name: "Paneles 3k/6k", subtitle: "Temperaturas color", watts: 96 },
  { id: "switch.interruptor_inteligente_2_switch_2", name: "Colgantes", subtitle: "Muestra suspendida", watts: 10 },
  { id: "switch.interruptor_inteligente_2_switch_3", name: "Slims", subtitle: "Línea decorativa", watts: 432 },
  { id: "switch.interruptor_inteligente_2_switch_4", name: "Downlights", subtitle: "Iluminación empotrada", watts: 144 },
  { id: "switch.smart_relay_switch_4_switch", name: "Paneles", subtitle: "Control por relé", watts: 288 }
];

const REFLECTOR = {
  id: "switch.smart_relay_switch_3_switch",
  name: "Reflector exterior",
  subtitle: "Control aislado",
  watts: 0
};

const ALL_CIRCUITS = [...SPOTS, ...SAMPLES, REFLECTOR];
const TOTAL_NOMINAL_CAPACITY_W = 1395;

@customElement("wit-home-view")
export class WitHomeView extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String })
  theme: "dark" | "light" = "dark";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }

      /* HERO WIDGET */
      .hero-card {
        padding: 24px 32px;
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
        font-size: 16px;
        color: var(--wit-text-secondary);
        margin: 0;
        font-variant-numeric: tabular-nums;
      }

      .hero-segmented-nav {
        display: flex;
        gap: 4px;
        background: var(--wit-surface-interactive);
        padding: 4px;
        border-radius: var(--wit-radius-pill);
        border: 1px solid var(--wit-border-interactive);
      }

      .nav-segment-btn {
        background: transparent;
        border: none;
        color: var(--wit-text-secondary);
        padding: 8px 16px;
        border-radius: var(--wit-radius-pill);
        font-size: 12px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
        font-family: inherit;
        user-select: none;
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
        gap: 24px;
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
        gap: 24px;
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

      /* CARDS */
      .card {
        position: relative;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-card, 22px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default),
                    border-color var(--wit-duration-fast) var(--wit-ease-default);
        overflow: hidden;
      }

      .card.interactive {
        cursor: pointer;
        user-select: none;
      }

      .card.interactive:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .card.interactive:active {
        transform: scale(0.985);
      }

      .card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .card-kicker {
        font-size: 12px;
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
        color: var(--wit-accent);
      }

      /* WEATHER CARD */
      .weather-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .weather-kpi-block {
        margin: 4px 0;
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
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .weather-week-strip {
        display: flex;
        justify-content: space-between;
        padding-top: 8px;
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

      .sparkline-bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 32px;
        padding-top: 4px;
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
        transition: stroke-dasharray var(--wit-duration-modal) var(--wit-ease-default);
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
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.06em;
      }

      .status-badge.is-preset {
        background: var(--wit-accent-muted);
        border-color: var(--wit-border-accent);
        color: var(--wit-accent);
      }

      .ambience-center {
        margin: 4px 0;
      }

      .ambience-title {
        font-size: 20px;
        font-weight: 720;
        color: var(--wit-text-primary);
      }

      .ambience-sub {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .ambience-footer {
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      /* ROOMS CARD */
      .rooms-card {
        gap: 12px;
      }

      .rooms-stack {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .room-row {
        padding: 8px 12px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .room-row:hover {
        border-color: var(--wit-border-accent);
        background: var(--wit-surface-interactive-hover, var(--wit-surface-interactive));
      }

      .room-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .room-indicator {
        color: var(--wit-text-tertiary);
        display: flex;
      }

      .room-indicator.is-on {
        color: var(--wit-accent);
      }

      .room-title {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .room-tag {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-border-subtle);
        font-size: 11px;
        font-weight: 640;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      .room-tag.is-on {
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-accent);
      }

      /* SHORTCUTS CARD */
      .shortcuts-card {
        gap: 12px;
      }

      .shortcuts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .sc-item {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        min-height: 48px;
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .sc-item:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .sc-item.is-highlight {
        background: var(--wit-accent-muted);
        border-color: var(--wit-border-accent);
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
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .sc-sub-text {
        font-size: 11px;
        color: var(--wit-text-tertiary);
      }

      /* CALENDAR CARD */
      .calendar-card {
        gap: 12px;
      }

      .calendar-events-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
        gap: 8px;
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

  private _applyScene(sceneId: string) {
    if (!this.hass) return;
    this.hass.callService("scene", "turn_on", { entity_id: sceneId });
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

    const weatherTemp = states["weather.forecast_casa"]?.attributes?.temperature ?? "24";
    const weatherState = states["weather.forecast_casa"]?.state ?? "sunny";
    const weatherHumidity = states["weather.forecast_casa"]?.attributes?.humidity ?? "45";

    const energyKwh = states["sensor.showroom_energia_estimada"]?.state ?? "4.8";
    const isPlaying = states["media_player.showroom_1"]?.state === "playing";

    // Power gauge calculation
    const pct = Math.min(100, Math.max(0, Math.round((powerWatts / TOTAL_NOMINAL_CAPACITY_W) * 100)));
    const strokeDash = `${pct * 2.51} 251.2`;
    const gaugeColor = pct > 85 ? "var(--wit-danger)" : pct > 60 ? "var(--wit-warning)" : "var(--wit-accent)";

    return html`
      <!-- HERO WIDGET -->
      <section class="hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Iluminación de precisión</h1>
          <p class="hero-caption">
            ${totalActive} de ${ALL_CIRCUITS.length} luminarias activas • ${powerWatts} W de carga
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button class="nav-segment-btn is-selected" @click=${() => this._handleViewChange("home")}>
            Inicio
          </button>
          <button class="nav-segment-btn" @click=${this._handleLightsSheetOpen}>
            Luces
          </button>
          <button class="nav-segment-btn" @click=${() => this._handleViewChange("energy")}>
            Analítica
          </button>
        </div>
      </section>

      <!-- TOP QUAD GRID -->
      <div class="grid-top-quad">
        <!-- 1. Clima -->
        <div class="card weather-card interactive" @click=${() => this._handleViewChange("weather")}>
          <div class="card-head">
            <span class="card-kicker">Clima</span>
            <span class="card-head-icon">${renderIcon("sun", { size: 18 })}</span>
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

        <!-- 2. Energía -->
        <div class="card energy-card interactive" @click=${() => this._handleViewChange("energy")}>
          <div class="card-head">
            <span class="card-kicker">Energía</span>
            <span class="card-head-icon">${renderIcon("zap", { size: 18 })}</span>
          </div>
          <div class="weather-kpi-block">
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

        <!-- 4. Ambiente Activo -->
        <div class="card ambience-card">
          <div class="card-head">
            <span class="card-kicker">Ambiente Activo</span>
            <span class="status-badge is-preset">PRESET</span>
          </div>
          <div class="ambience-center">
            <div class="ambience-title">Presentación</div>
            <div class="ambience-sub">Spots ventana + TV</div>
          </div>
          <div class="ambience-footer">
            <span class="active-accent" style="font-size: 11px; font-weight: 520;">Control dinámico del showroom</span>
          </div>
        </div>
      </div>

      <!-- MID TRIO GRID -->
      <div class="grid-mid-trio">
        <!-- 1. Zonas -->
        <div class="card rooms-card">
          <div class="card-head">
            <span class="card-kicker">Zonas</span>
            <span class="card-head-icon">${renderIcon("layers", { size: 18 })}</span>
          </div>
          <div class="rooms-stack">
            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${spotsOn > 0 ? "is-on" : ""}">
                  ${renderIcon("lightbulb", { size: 18 })}
                </span>
                <span class="room-title">Spots</span>
              </div>
              <span class="room-tag ${spotsOn > 0 ? "is-on" : ""}">${spotsOn} / 4</span>
            </div>

            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${samplesOn > 0 ? "is-on" : ""}">
                  ${renderIcon("layers", { size: 18 })}
                </span>
                <span class="room-title">Muestrarios & Paneles</span>
              </div>
              <span class="room-tag ${samplesOn > 0 ? "is-on" : ""}">${samplesOn} / 5</span>
            </div>

            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${reflectorOn > 0 ? "is-on" : ""}">
                  ${renderIcon("lightbulb", { size: 18 })}
                </span>
                <span class="room-title">Reflector Exterior</span>
              </div>
              <span class="room-tag ${reflectorOn > 0 ? "is-on" : ""}">${reflectorOn > 0 ? "On" : "Off"}</span>
            </div>

            <div class="room-row" @click=${() => this._handleViewChange("media")}>
              <div class="room-left">
                <span class="room-indicator ${isPlaying ? "is-on" : ""}">
                  ${renderIcon("music", { size: 18 })}
                </span>
                <span class="room-title">Multimedia</span>
              </div>
              <span class="room-tag ${isPlaying ? "is-on" : ""}">${isPlaying ? "Playing" : "Paused"}</span>
            </div>

            <div class="room-row" @click=${() => this._handleViewChange("energy")}>
              <div class="room-left">
                <span class="room-indicator is-on">
                  ${renderIcon("zap", { size: 18 })}
                </span>
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
            <div class="sc-item" @click=${() => this._applyScene("scene.presentacion")}>
              <span class="sc-ico">${renderIcon("sparkles", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Presentación</span>
                <span class="sc-sub-text">Ventana + TV</span>
              </div>
            </div>

            <div class="sc-item" @click=${() => this._applyScene("scene.reunion")}>
              <span class="sc-ico">${renderIcon("users", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Reunión</span>
                <span class="sc-sub-text">2×3 + Ventana</span>
              </div>
            </div>

            <div class="sc-item is-highlight" @click=${() => this.hass?.callService("script", "showroom_encendido_general", {})}>
              <span class="sc-ico active-accent">${renderIcon("sun", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos ON</span>
                <span class="sc-sub-text">General</span>
              </div>
            </div>

            <div class="sc-item" @click=${() => this.hass?.callService("script", "showroom_apagado_general", {})}>
              <span class="sc-ico">${renderIcon("moon", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos OFF</span>
                <span class="sc-sub-text">Apagado</span>
              </div>
            </div>

            <div class="sc-item" @click=${this._handleLightsSheetOpen}>
              <span class="sc-ico">${renderIcon("lightbulb", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Spots</span>
                <span class="sc-sub-text">4 circuitos</span>
              </div>
            </div>

            <div class="sc-item" @click=${this._handleLightsSheetOpen}>
              <span class="sc-ico">${renderIcon("layers", { size: 18 })}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Muestras</span>
                <span class="sc-sub-text">5 paneles</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Agenda Calendar -->
        <div class="card calendar-card">
          <div class="card-head">
            <span class="card-kicker">Agenda</span>
            <span class="card-head-icon">${renderIcon("calendar", { size: 18 })}</span>
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
