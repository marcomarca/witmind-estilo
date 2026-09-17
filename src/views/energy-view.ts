import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

@customElement("wit-energy-view")
export class WitEnergyView extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String })
  theme: "dark" | "light" = "dark";

  @state()
  private _recentActivity = [
    { text: "Spots ventana encendidos", time: "hace 2 min", type: "light" },
    { text: "Ambient Lounge reproducción iniciada", time: "hace 6 min", type: "media" },
    { text: "Escena Presentación aplicada", time: "hace 14 min", type: "scene" },
    { text: "Sincronización de telemetría OK", time: "hace 18 min", type: "system" }
  ];

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

      .card-head-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-tertiary);
      }

      .active-accent {
        color: var(--wit-accent);
      }

      /* PAGE 2 PAIR (Media + Lights) */
      .grid-page2-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      @media (max-width: 900px) {
        .grid-page2-pair {
          grid-template-columns: 1fr;
        }
      }

      /* MEDIA EXPANDED */
      .media-expanded-card {
        min-height: 210px;
        justify-content: space-between;
      }

      .media-body-row {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 8px 0;
      }

      .media-cover-box {
        width: 52px;
        height: 52px;
        border-radius: var(--wit-radius-control, 14px);
        background: linear-gradient(135deg, var(--wit-accent) 0%, #1a1a24 100%);
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
        font-size: 16px;
        font-weight: 720;
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .media-subhead {
        font-size: 12px;
        color: var(--wit-text-secondary);
      }

      .media-ctrl-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      .media-transport-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .transport-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
      }

      .transport-btn:hover {
        border-color: var(--wit-border-accent);
      }

      .transport-btn.is-play-action {
        background: var(--wit-accent);
        color: #ffffff;
        border: none;
      }

      .media-vol-group {
        display: flex;
        gap: 6px;
      }

      .vol-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: 640;
      }

      /* LIGHTS SUMMARY */
      .lights-card {
        min-height: 210px;
        justify-content: space-between;
      }

      .lights-kpi-block {
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

      .lights-breakdown-row {
        display: flex;
        gap: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
        flex-wrap: wrap;
      }

      .chip-label {
        padding: 4px 10px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        font-size: 11px;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      /* DETAILED ENERGY CHART */
      .energy-chart-track {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 140px;
        padding: 10px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .chart-col {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 6px;
      }

      .chart-col-fill {
        width: 100%;
        border-radius: 2px 2px 0 0;
        background: var(--wit-accent);
        opacity: 0.85;
        transition: height var(--wit-duration-modal) var(--wit-ease-default);
      }

      .chart-col-fill.is-peak {
        background: var(--wit-text-primary);
      }

      .chart-col-label {
        font-size: 9px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      /* QUAD GRID (Page 2) */
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

      /* SCENES 2x2 */
      .scenes-card {
        gap: 12px;
      }

      .scenes-quad-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .scene-box {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .scene-box:hover {
        border-color: var(--wit-border-accent);
      }

      .scene-box.is-accent {
        border-color: var(--wit-border-accent);
        background: var(--wit-accent-muted);
      }

      .scene-ico {
        display: flex;
      }

      /* ACTIVITY */
      .activity-card {
        gap: 8px;
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

      .activity-feed {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .activity-entry {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: var(--wit-surface-interactive);
        border-radius: 8px;
        font-size: 12px;
      }

      .entry-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--wit-accent);
      }

      .entry-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .entry-msg {
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .entry-time {
        font-size: 10px;
        color: var(--wit-text-tertiary);
      }

      /* DIAGNOSTICS */
      .diag-card {
        gap: 8px;
      }

      .diag-quad {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .diag-cell {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .cell-label {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-weight: 640;
      }

      .cell-val {
        font-size: 12px;
        font-weight: 720;
        color: var(--wit-success);
      }

      /* SYSTEM */
      .system-card {
        justify-content: space-between;
      }

      .system-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
      }

      .system-row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 6px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .system-row strong {
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
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

  private _toggleMedia() {
    if (!this.hass) return;
    this.hass.callService("media_player", "media_play_pause", {
      entity_id: "media_player.showroom_1"
    });
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

    const isPlaying = states["media_player.showroom_1"]?.state === "playing";
    const mediaTitle = states["media_player.showroom_1"]?.attributes?.media_title ?? "Ambient Lounge";
    const mediaArtist = states["media_player.showroom_1"]?.attributes?.media_artist ?? "Savant Sound Lab";
    const mediaVolume = states["media_player.showroom_1"]?.attributes?.volume_level
      ? Math.round(states["media_player.showroom_1"].attributes.volume_level * 100)
      : 45;

    const batteryVal = states["sensor.21051182g_battery_level"]?.state ?? "88";

    // Hourly energy telemetry bars (24 hours)
    const hourlyBars = [
      45, 30, 25, 20, 22, 35, 80, 140, 220, 310, 420, 480,
      510, 490, 440, 380, 410, 560, 680, 720, 640, 490, 280, 110
    ];
    const maxVal = Math.max(...hourlyBars);

    return html`
      <!-- HERO WIDGET -->
      <section class="hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Analítica & Control Extendido</h1>
          <p class="hero-caption">
            Telemetría de consumo eléctrico, automatización y control multimedia
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button class="nav-segment-btn" @click=${() => this._handleViewChange("home")}>
            Inicio
          </button>
          <button class="nav-segment-btn" @click=${this._handleLightsSheetOpen}>
            Luces
          </button>
          <button class="nav-segment-btn is-selected" @click=${() => this._handleViewChange("energy")}>
            Analítica
          </button>
        </div>
      </section>

      <!-- PAGE 2 PAIR -->
      <div class="grid-page2-pair">
        <!-- Media Expanded -->
        <div class="card media-expanded-card">
          <div class="card-head">
            <span class="card-kicker">Reproductor de Medios</span>
            <span class="card-head-meta">${mediaVolume}% Vol</span>
          </div>
          <div class="media-body-row">
            <div class="media-cover-box">${renderIcon("music", { size: 24 })}</div>
            <div class="media-title-col">
              <div class="media-headline">${mediaTitle}</div>
              <div class="media-subhead">${mediaArtist}</div>
            </div>
          </div>
          <div class="media-ctrl-row">
            <div class="media-transport-group">
              <button class="transport-btn">${renderIcon("skip-back", { size: 16 })}</button>
              <button class="transport-btn is-play-action" @click=${this._toggleMedia}>
                ${renderIcon(isPlaying ? "pause" : "play", { size: 18 })}
              </button>
              <button class="transport-btn">${renderIcon("skip-forward", { size: 16 })}</button>
            </div>
            <div class="media-vol-group">
              <button class="vol-btn">−</button>
              <button class="vol-btn">+</button>
            </div>
          </div>
        </div>

        <!-- Lights Summary Card -->
        <div class="card lights-card interactive" @click=${this._handleLightsSheetOpen}>
          <div class="card-head">
            <span class="card-kicker">Iluminación</span>
            <span class="card-head-icon active-accent">${renderIcon("lightbulb", { size: 18 })}</span>
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
      </div>

      <!-- DETAILED ENERGY CHART -->
      <div class="card">
        <div class="card-head">
          <span class="card-kicker">Perfil Horario de Demanda Energética</span>
          <span class="card-head-meta">24 Horas • Potencia Activa (W)</span>
        </div>
        <div class="energy-chart-track">
          ${hourlyBars.map((w, idx) => {
            const heightPercent = Math.max(8, Math.min(100, (w / maxVal) * 100));
            const isPeak = w > maxVal * 0.75;
            return html`
              <div class="chart-col" title="${idx}h: ${w} W">
                <div
                  class="chart-col-fill ${isPeak ? "is-peak" : ""}"
                  style="height: ${heightPercent}%;"
                ></div>
                <span class="chart-col-label">${idx % 3 === 0 ? `${idx}h` : ""}</span>
              </div>
            `;
          })}
        </div>
      </div>

      <!-- QUAD GRID (Page 2) -->
      <div class="grid-top-quad">
        <!-- 1. Escenas 2x2 -->
        <div class="card scenes-card">
          <div class="card-head">
            <span class="card-kicker">Escenas de Iluminación</span>
          </div>
          <div class="scenes-quad-grid">
            <div class="scene-box" @click=${() => this._applyScene("scene.presentacion")}>
              <span class="scene-ico">${renderIcon("sparkles", { size: 18 })}</span>
              <span>Presentación</span>
            </div>
            <div class="scene-box" @click=${() => this._applyScene("scene.reunion")}>
              <span class="scene-ico">${renderIcon("users", { size: 18 })}</span>
              <span>Reunión</span>
            </div>
            <div class="scene-box is-accent" @click=${() => this.hass?.callService("script", "showroom_encendido_general", {})}>
              <span class="scene-ico active-accent">${renderIcon("sun", { size: 18 })}</span>
              <span>Encender todo</span>
            </div>
            <div class="scene-box" @click=${() => this.hass?.callService("script", "showroom_apagado_general", {})}>
              <span class="scene-ico">${renderIcon("moon", { size: 18 })}</span>
              <span>Apagar todo</span>
            </div>
          </div>
        </div>

        <!-- 2. Actividad Reciente -->
        <div class="card activity-card">
          <div class="card-head">
            <span class="card-kicker">Actividad Reciente</span>
            <span class="status-badge" style="color: var(--wit-success);">${renderIcon("check", { size: 12 })} EN VIVO</span>
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

        <!-- 3. Diagnóstico -->
        <div class="card diag-card">
          <div class="card-head">
            <span class="card-kicker">Diagnóstico del Sistema</span>
            <span class="status-badge" style="color: var(--wit-success);">SISTEMA OK</span>
          </div>
          <div class="diag-quad">
            <div class="diag-cell">
              <span class="cell-label">Home Assistant</span>
              <span class="cell-val">Conectado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Weather API</span>
              <span class="cell-val">Suscrito</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Recorder</span>
              <span class="cell-val">Sincronizado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Circuitos</span>
              <span class="cell-val">${ALL_CIRCUITS.length} Online</span>
            </div>
          </div>
        </div>

        <!-- 4. Estado General -->
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
              <strong>En tiempo real</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-energy-view": WitEnergyView;
  }
}
