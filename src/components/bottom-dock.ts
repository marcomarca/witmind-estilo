import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
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

@customElement("wit-bottom-dock")
export class WitBottomDock extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: Number })
  activePage: number = 0;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: fixed;
        bottom: var(--wit-space-4, 16px);
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
      }

      .wit-dock {
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill, 999px);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        padding: 6px var(--wit-space-3, 12px);
        display: flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
      }

      :host([theme="light"]) .wit-dock {
        box-shadow: 0 16px 40px rgba(18, 32, 38, 0.12);
      }

      .dock-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--wit-space-2, 8px);
        padding: var(--wit-space-2, 8px) var(--wit-space-4, 16px);
        border-radius: var(--wit-radius-pill, 999px);
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-secondary);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        font-family: inherit;
        font-variant-numeric: tabular-nums;
      }

      .dock-btn:hover {
        color: var(--wit-text-primary);
        background: var(--wit-border-subtle);
      }

      .dock-btn:active {
        transform: scale(0.97);
      }

      .active-accent {
        color: var(--wit-accent) !important;
      }

      .dock-dots-group {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 var(--wit-space-1, 4px);
      }

      .dock-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--wit-border-subtle);
        cursor: pointer;
        transition: all var(--wit-duration-normal) var(--wit-ease-default);
      }

      .dock-dot.is-active {
        width: 20px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-accent);
      }
    `
  ];

  private _handleAction(action: string) {
    this.dispatchEvent(new CustomEvent("dock-action", {
      detail: { action },
      bubbles: true,
      composed: true
    }));
  }

  private _setPage(pageNum: number) {
    this.dispatchEvent(new CustomEvent("page-change", {
      detail: { page: pageNum },
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

    const powerWattsVal = states["sensor.showroom_potencia_estimada"]?.state ?? String(powerWatts);
    const isPlaying = states["media_player.showroom_1"]?.state === "playing";
    const batteryVal = states["sensor.21051182g_battery_level"]?.state ?? "98";

    return html`
      <nav class="wit-dock" aria-label="Navegación rápida">
        <button class="dock-btn" id="dockLights" @click=${() => this._handleAction("lights")}>
          <span class="active-accent">${renderSvg(ICONS.bulb)}</span>
          <span>Luces ${totalActive}</span>
        </button>

        <button class="dock-btn" id="dockPower" @click=${() => this._setPage(1)}>
          <span>${renderSvg(ICONS.zap)}</span>
          <span>${powerWattsVal} W</span>
        </button>

        <button class="dock-btn" id="dockMedia" @click=${() => this._handleAction("media")}>
          <span>${renderSvg(ICONS.music)}</span>
          <span>${isPlaying ? "❚❚" : "▶"}</span>
        </button>

        <button class="dock-btn" id="dockBattery" @click=${() => this._setPage(1)}>
          <span>${renderSvg(ICONS.battery)}</span>
          <span>${batteryVal}%</span>
        </button>

        <div class="dock-dots-group">
          <div
            class="dock-dot ${this.activePage === 0 ? "is-active" : ""}"
            id="dockDot0"
            title="Página 1: Operación"
            @click=${() => this._setPage(0)}
          ></div>
          <div
            class="dock-dot ${this.activePage === 1 ? "is-active" : ""}"
            id="dockDot1"
            title="Página 2: Analítica"
            @click=${() => this._setPage(1)}
          ></div>
        </div>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-bottom-dock": WitBottomDock;
  }
}
