import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { renderIcon } from "../utilities/icon.js";
import type { HomeAssistant } from "../types/home-assistant.js";

@customElement("wit-app-header")
export class WitAppHeader extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String })
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
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
        gap: 16px;
      }

      .header-brand-wrap {
        display: flex;
        align-items: center;
        gap: 24px;
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
        gap: 8px;
        flex-wrap: wrap;
      }

      .status-pill {
        min-height: 48px;
        padding: 0 16px;
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        user-select: none;
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
        font-size: 12px;
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
        gap: 8px;
        margin-top: 4px;
      }

      .date-label {
        font-size: 12px;
        font-weight: 520;
        color: var(--wit-text-secondary);
      }

      .theme-toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 10px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 11px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        user-select: none;
      }

      .theme-toggle-btn:hover {
        color: var(--wit-text-primary);
        border-color: var(--wit-border-accent);
      }

      @media (max-width: 1024px) {
        .pills-strip {
          display: none;
        }
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
    const weatherTemp = states["weather.forecast_casa"]?.attributes?.temperature ?? "24";
    const weatherState = states["weather.forecast_casa"]?.state ?? "sunny";

    // Count active lights
    let activeLights = 0;
    const lightIds = [
      "switch.interruptor_inteligente_switch_1",
      "switch.interruptor_inteligente_switch_2",
      "switch.interruptor_inteligente_switch_3",
      "switch.interruptor_inteligente_switch_4",
      "switch.interruptor_inteligente_2_switch_1",
      "switch.interruptor_inteligente_2_switch_2",
      "switch.interruptor_inteligente_2_switch_3",
      "switch.interruptor_inteligente_2_switch_4",
      "switch.smart_relay_switch_4_switch",
      "switch.smart_relay_switch_3_switch"
    ];
    for (const id of lightIds) {
      if (states[id]?.state === "on") activeLights++;
    }

    const isPlaying = states["media_player.showroom_1"]?.state === "playing";
    const mediaTitle = states["media_player.showroom_1"]?.attributes?.media_title ?? "Ambient Lounge";

    const energyKwh = states["sensor.showroom_energia_estimada"]?.state ?? "4.8";

    return html`
      <header class="header">
        <div class="header-brand-wrap">
          <div class="brand-block">
            <span class="brand-name">WITMIND</span>
            <span class="brand-site">SHOWROOM</span>
          </div>

          <div class="pills-strip">
            <div class="status-pill" @click=${() => this._handlePillClick("weather")}>
              <span class="pill-icon">${renderIcon("sun", { size: 18 })}</span>
              <div class="pill-texts">
                <span class="pill-title">${weatherTemp}°C</span>
                <span class="pill-meta">${weatherState === "sunny" ? "Soleado" : weatherState}</span>
              </div>
            </div>

            <div class="status-pill is-active-pill" @click=${() => this._handlePillClick("lights")}>
              <span class="pill-icon active-accent">${renderIcon("lightbulb", { size: 18 })}</span>
              <div class="pill-texts">
                <span class="pill-title">${activeLights} / 10 On</span>
                <span class="pill-meta">Iluminación</span>
              </div>
            </div>

            <div class="status-pill" @click=${() => this._handlePillClick("media")}>
              <span class="pill-icon">${renderIcon("music", { size: 18 })}</span>
              <div class="pill-texts">
                <span class="pill-title">${isPlaying ? "Playing" : "Sonos"}</span>
                <span class="pill-meta">${mediaTitle}</span>
              </div>
            </div>

            <div class="status-pill" @click=${() => this._handlePillClick("energy")}>
              <span class="pill-icon">${renderIcon("zap", { size: 18 })}</span>
              <div class="pill-texts">
                <span class="pill-title">${energyKwh} kWh</span>
                <span class="pill-meta">Consumo hoy</span>
              </div>
            </div>
          </div>
        </div>

        <div class="header-clock-wrap">
          <div class="clock-digits">${this._timeStr}</div>
          <div class="clock-date-row">
            <span class="date-label">${this._dateStr}</span>
            <button class="theme-toggle-btn" @click=${this._toggleTheme}>
              ${renderIcon(this.theme === "dark" ? "sun" : "moon", { size: 12 })}
              <span>${this.theme === "dark" ? "Light" : "Dark"}</span>
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
