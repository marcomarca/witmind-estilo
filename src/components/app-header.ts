import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { renderSvg, ICONS } from "../utilities/icons.js";
import type { HomeAssistant } from "../types/home-assistant.js";

const SPOTS_IDS = [
  "switch.interruptor_inteligente_switch_1",
  "switch.interruptor_inteligente_switch_2",
  "switch.interruptor_inteligente_switch_3",
  "switch.interruptor_inteligente_switch_4"
];

const SAMPLES_IDS = [
  "switch.interruptor_inteligente_2_switch_1",
  "switch.interruptor_inteligente_2_switch_2",
  "switch.interruptor_inteligente_2_switch_3",
  "switch.interruptor_inteligente_2_switch_4",
  "switch.smart_relay_switch_4_switch"
];

const REFLECTOR_ID = "switch.smart_relay_switch_3_switch";
const ALL_CIRCUITS_IDS = [...SPOTS_IDS, ...SAMPLES_IDS, REFLECTOR_ID];

@customElement("wit-app-header")
export class WitAppHeader extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String, reflect: true })
  theme: "dark" | "light" = "dark";

  @state()
  private _timeStr: string = "";

  @state()
  private _dateStr: string = "";

  private _timer?: number;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        user-select: none;
        -webkit-user-select: none;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--wit-space-1, 4px) 0;
        gap: var(--wit-space-4, 16px);
      }

      .header-brand-wrap {
        display: flex;
        align-items: center;
        gap: var(--wit-space-5, 24px);
      }

      .brand-block {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }

      .brand-name {
        font-size: 18px;
        font-weight: 720;
        letter-spacing: 0.02em;
        color: var(--wit-text-primary);
      }

      .brand-site {
        font-size: 11px;
        font-weight: 640;
        letter-spacing: 0.08em;
        color: var(--wit-accent);
        text-transform: uppercase;
      }

      .pills-strip {
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        flex-wrap: wrap;
      }

      .status-pill {
        min-height: 48px;
        padding: 0 var(--wit-space-4, 16px);
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill, 999px);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: inline-flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .status-pill:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .status-pill:active {
        transform: scale(0.985);
      }

      .status-pill.is-active-pill {
        border-color: var(--wit-border-accent);
      }

      .status-pill.is-warning {
        border-color: rgba(217, 119, 6, 0.4);
        background: rgba(217, 119, 6, 0.1);
      }

      .pill-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--wit-text-secondary);
      }

      .pill-icon.active-accent {
        color: var(--wit-accent);
      }

      .pill-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .pill-title {
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .pill-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-secondary);
      }

      .header-clock-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        line-height: 1;
      }

      .clock-digits {
        font-size: clamp(48px, 5vw, 60px);
        font-weight: 450;
        letter-spacing: -0.04em;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .clock-date-row {
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        margin-top: var(--wit-space-1, 4px);
      }

      .date-label {
        font-size: var(--wit-space-3, 12px);
        font-weight: 520;
        color: var(--wit-text-secondary);
      }

      .theme-toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--wit-space-1, 4px);
        padding: 3px 10px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 11px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .theme-toggle-btn:hover {
        color: var(--wit-text-primary);
        border-color: var(--wit-border-accent);
      }
    `
  ];

  connectedCallback() {
    super.connectedCallback();
    this._updateClock();
    this._timer = window.setInterval(() => this._updateClock(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timer) clearInterval(this._timer);
  }

  private _updateClock() {
    const now = new Date();
    this._timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    this._dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  }

  private _toggleTheme() {
    const nextTheme = this.theme === "dark" ? "light" : "dark";
    this.dispatchEvent(new CustomEvent("theme-change", {
      detail: { theme: nextTheme },
      bubbles: true,
      composed: true
    }));
  }

  private _handlePillClick(action: string) {
    this.dispatchEvent(new CustomEvent("pill-action", {
      detail: { action },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const states = this.hass?.states || {};

    let totalActive = 0;
    let powerWatts = 0;

    const circuitWatts: Record<string, number> = {
      "switch.interruptor_inteligente_switch_1": 100,
      "switch.interruptor_inteligente_switch_2": 120,
      "switch.interruptor_inteligente_switch_3": 180,
      "switch.interruptor_inteligente_switch_4": 25,
      "switch.interruptor_inteligente_2_switch_1": 96,
      "switch.interruptor_inteligente_2_switch_2": 10,
      "switch.interruptor_inteligente_2_switch_3": 432,
      "switch.interruptor_inteligente_2_switch_4": 144,
      "switch.smart_relay_switch_4_switch": 288,
      "switch.smart_relay_switch_3_switch": 0
    };

    for (const id of ALL_CIRCUITS_IDS) {
      if (states[id]?.state === "on") {
        totalActive++;
        powerWatts += circuitWatts[id] || 0;
      }
    }

    const energyKwh = Number(states["sensor.showroom_energia_estimada"]?.state ?? "26.11").toFixed(2);
    const batteryVal = Number(states["sensor.21051182g_battery_level"]?.state ?? "98");
    const isBatteryLow = batteryVal < 25;

    const mediaState = states["media_player.showroom_1"]?.state ?? "paused";
    const isPlaying = mediaState === "playing";

    const isLight = this.theme === "light";

    return html`
      <header class="header">
        <div class="header-brand-wrap">
          <div class="brand-block">
            <span class="brand-name">WITMIND</span>
            <span class="brand-site">SHOWROOM · WTX MDTC</span>
          </div>

          <div class="pills-strip">
            ${isBatteryLow
              ? html`
                  <div class="status-pill is-warning" id="pillBatWarn" @click=${() => this._handlePillClick("battery")}>
                    <span class="pill-icon">${renderSvg(ICONS.alertTriangle)}</span>
                    <div class="pill-texts">
                      <span class="pill-title">Batería baja</span>
                      <span class="pill-meta">${batteryVal}%</span>
                    </div>
                  </div>
                `
              : ""}

            <div class="status-pill is-active-pill" id="pillLights" @click=${() => this._handlePillClick("lights")}>
              <span class="pill-icon active-accent">${renderSvg(ICONS.bulb)}</span>
              <div class="pill-texts">
                <span class="pill-title">${totalActive} luces</span>
                <span class="pill-meta">${powerWatts} W</span>
              </div>
            </div>

            <div class="status-pill" id="pillMedia" @click=${() => this._handlePillClick("media")}>
              <span class="pill-icon ${isPlaying ? "active-accent" : ""}">${renderSvg(ICONS.music)}</span>
              <div class="pill-texts">
                <span class="pill-title">${isPlaying ? "Ambient Lounge" : "Audio en pausa"}</span>
                <span class="pill-meta">Witmind Studio</span>
              </div>
            </div>

            <div class="status-pill" id="pillEnergy" @click=${() => this._handlePillClick("energy")}>
              <span class="pill-icon">${renderSvg(ICONS.zap)}</span>
              <div class="pill-texts">
                <span class="pill-title">${energyKwh} kWh</span>
                <span class="pill-meta">Consumo hoy</span>
              </div>
            </div>
          </div>
        </div>

        <div class="header-clock-wrap">
          <div class="clock-digits" id="witClockDigits">${this._timeStr}</div>
          <div class="clock-date-row">
            <span class="date-label" id="witDateLabel">${this._dateStr}</span>
            <button class="theme-toggle-btn" id="btnThemeToggle" @click=${this._toggleTheme} title="Cambiar tema claro/oscuro">
              ${isLight ? "☀️ Claro" : "🌙 Oscuro"}
            </button>
          </div>
        </div>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-app-header": WitAppHeader;
  }
}
