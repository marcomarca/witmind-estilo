import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
  subtitle: "Control aislado",
  watts: 0
};

const ALL_CIRCUITS = [...SPOTS, ...SAMPLES, REFLECTOR];

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

@customElement("wit-energy-view")
export class WitEnergyView extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String, reflect: true })
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

      /* PAGE 2 PAIR GRIDS */
      .grid-page2-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--wit-space-5, 24px);
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
        gap: var(--wit-space-4, 16px);
        margin: var(--wit-space-2, 8px) 0;
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
        font-size: var(--wit-space-4, 16px);
        font-weight: 720;
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .media-subhead {
        font-size: var(--wit-space-3, 12px);
        color: var(--wit-text-secondary);
      }

      .media-ctrl-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--wit-space-3, 12px);
        border-top: 1px solid var(--wit-border-subtle);
      }

      .media-transport-group {
        display: flex;
        align-items: center;
        gap: var(--wit-space-3, 12px);
      }

      .transport-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
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
        border: 1px solid var(--wit-border-subtle);
        color: var(--wit-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
      }

      /* LIGHTS SUMMARY */
      .lights-card {
        min-height: 210px;
        justify-content: space-between;
      }

      .lights-kpi-block {
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

      .lights-breakdown-row {
        display: flex;
        gap: var(--wit-space-2, 8px);
        padding-top: var(--wit-space-2, 8px);
        border-top: 1px solid var(--wit-border-subtle);
      }

      .chip-label {
        padding: 4px 10px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-surface-interactive);
        font-size: 11px;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      /* SCENES 2x2 */
      .scenes-card {
        gap: var(--wit-space-3, 12px);
      }

      .scenes-quad-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--wit-space-2, 8px);
      }

      .scene-box {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-control, 14px);
        padding: var(--wit-space-4, 16px);
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        cursor: pointer;
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-primary);
        transition: all var(--wit-duration-fast);
      }

      .scene-box:hover {
        border-color: var(--wit-border-accent);
      }

      .scene-box.is-accent {
        border-color: var(--wit-border-accent);
        background: var(--wit-accent-muted, rgba(242, 101, 34, 0.12));
      }

      .scene-ico {
        display: flex;
      }

      /* RECENT ACTIVITY */
      .activity-card {
        gap: var(--wit-space-2, 8px);
      }

      .activity-feed {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .activity-entry {
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
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

      /* DIAGNOSTICS */
      .diag-card {
        gap: var(--wit-space-2, 8px);
      }

      .diag-quad {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--wit-space-2, 8px);
      }

      .diag-cell {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
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
        font-size: var(--wit-space-3, 12px);
        font-weight: 720;
      }

      /* SYSTEM CARD */
      .system-card {
        justify-content: space-between;
      }

      .system-list {
        display: flex;
        flex-direction: column;
        gap: var(--wit-space-2, 8px);
        margin-top: var(--wit-space-1, 4px);
      }

      .system-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--wit-space-3, 12px);
        padding: 6px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .system-row strong {
        color: var(--wit-text-primary);
      }
    `
  ];

  private _callService(domain: string, service: string, data: Record<string, any> = {}) {
    if (this.hass?.callService) {
      this.hass.callService(domain, service, data);
    }
  }

  private _handleLightsSheetOpen() {
    this.dispatchEvent(new CustomEvent("open-lights-sheet", {
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

    const mediaState = states[ENTITIES.media]?.state ?? "paused";
    const isPlaying = mediaState === "playing";
    const mediaTitle = states[ENTITIES.media]?.attributes?.media_title ?? "Ambient Lounge Experience";
    const mediaArtist = states[ENTITIES.media]?.attributes?.media_artist ?? "Witmind Studio";
    const mediaVolume = Math.round((states[ENTITIES.media]?.attributes?.volume_level ?? 0.65) * 100);

    const batteryVal = states[ENTITIES.battery]?.state ?? "98";

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    return html`
      <!-- GRID PAIR 1: Media + Lights -->
      <div class="grid-page2-pair">
        <!-- 1. Media Expanded -->
        <div class="card media-expanded-card">
          <div class="card-head">
            <span class="card-kicker">Reproductor de Medios</span>
            <span class="card-head-meta">${mediaVolume}% Vol</span>
          </div>
          <div class="media-body-row">
            <div class="media-cover-box">${renderSvg(ICONS.music)}</div>
            <div class="media-title-col">
              <div class="media-headline">${mediaTitle}</div>
              <div class="media-subhead">${mediaArtist}</div>
            </div>
          </div>
          <div class="media-ctrl-row">
            <div class="media-transport-group">
              <button class="transport-btn" id="btnMediaPrev" @click=${() => this._callService("media_player", "media_previous_track", { entity_id: ENTITIES.media })}>
                ${renderSvg(ICONS.skipBack)}
              </button>
              <button class="transport-btn is-play-action" id="btnMediaPlay" @click=${() => this._callService("media_player", "media_play_pause", { entity_id: ENTITIES.media })}>
                ${isPlaying ? renderSvg(ICONS.pause) : renderSvg(ICONS.play)}
              </button>
              <button class="transport-btn" id="btnMediaNext" @click=${() => this._callService("media_player", "media_next_track", { entity_id: ENTITIES.media })}>
                ${renderSvg(ICONS.skipForward)}
              </button>
            </div>
            <div class="media-vol-group">
              <button class="vol-btn" id="btnVolDown" @click=${() => this._callService("media_player", "volume_down", { entity_id: ENTITIES.media })}>">−</button>
              <button class="vol-btn" id="btnVolUp" @click=${() => this._callService("media_player", "volume_up", { entity_id: ENTITIES.media })}>+</button>
            </div>
          </div>
        </div>

        <!-- 2. Lights Summary -->
        <div class="card lights-card interactive" id="widgetLights" @click=${this._handleLightsSheetOpen}>
          <div class="card-head">
            <span class="card-kicker">Iluminación</span>
            <span class="card-head-icon active-accent">${renderSvg(ICONS.bulb)}</span>
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

      <!-- GRID PAIR 2: Scenes + Activity -->
      <div class="grid-page2-pair">
        <!-- 3. Scenes 2x2 -->
        <div class="card scenes-card">
          <div class="card-head">
            <span class="card-kicker">Escenas de Iluminación</span>
          </div>
          <div class="scenes-quad-grid">
            <div class="scene-box interactive" id="scenePres" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.presentation })}>
              <span class="scene-ico">${renderSvg(ICONS.sparkles)}</span>
              <span>Presentación</span>
            </div>
            <div class="scene-box interactive" id="sceneMeet" @click=${() => this._callService("scene", "turn_on", { entity_id: ENTITIES.meeting })}>
              <span class="scene-ico">${renderSvg(ICONS.users)}</span>
              <span>Reunión</span>
            </div>
            <div class="scene-box interactive is-accent" id="sceneAllOn" @click=${() => this._callService("script", "showroom_encendido_general", { entity_id: ENTITIES.allOn })}>
              <span class="scene-ico">${renderSvg(ICONS.sun)}</span>
              <span>Encender todo</span>
            </div>
            <div class="scene-box interactive" id="sceneAllOff" @click=${() => this._callService("script", "showroom_apagado_general", { entity_id: ENTITIES.allOff })}>
              <span class="scene-ico">${renderSvg(ICONS.moon)}</span>
              <span>Apagar todo</span>
            </div>
          </div>
        </div>

        <!-- 4. Recent Activity -->
        <div class="card activity-card">
          <div class="card-head">
            <span class="card-kicker">Actividad Reciente</span>
            <span class="status-badge" style="color: var(--wit-success, #16a34a);">${renderSvg(ICONS.checkCircle)} EN VIVO</span>
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
      </div>

      <!-- GRID PAIR 3: Diagnostics + System -->
      <div class="grid-page2-pair">
        <!-- 5. Diagnostics -->
        <div class="card diag-card">
          <div class="card-head">
            <span class="card-kicker">Diagnóstico del Sistema</span>
            <span class="status-badge" style="color: var(--wit-success, #16a34a);">SISTEMA OK</span>
          </div>
          <div class="diag-quad">
            <div class="diag-cell">
              <span class="cell-label">Home Assistant</span>
              <span class="cell-val" style="color: var(--wit-success, #16a34a);">Conectado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Weather API</span>
              <span class="cell-val" style="color: var(--wit-success, #16a34a);">Suscrito</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Recorder</span>
              <span class="cell-val" style="color: var(--wit-success, #16a34a);">Sincronizado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Circuitos</span>
              <span class="cell-val">${ALL_CIRCUITS.length} Online</span>
            </div>
          </div>
        </div>

        <!-- 6. System -->
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
              <strong>${timeStr}</strong>
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
