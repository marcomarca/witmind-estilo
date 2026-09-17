import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { renderIcon } from "../utilities/icon.js";
import type { HomeAssistant } from "../types/home-assistant.js";

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
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        pointer-events: auto;
      }

      .wit-dock {
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: var(--wit-shadow-dock);
        padding: 6px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
      }

      .dock-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: var(--wit-radius-pill);
        font-size: 12px;
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
        color: var(--wit-accent);
      }

      .dock-dots-group {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 4px;
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
        border-radius: var(--wit-radius-pill);
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
      if (states[id]?.state === "on") totalActive++;
    }

    const powerWatts = states["sensor.showroom_potencia_estimada"]?.state ?? "432";
    const isPlaying = states["media_player.showroom_1"]?.state === "playing";
    const batteryVal = states["sensor.21051182g_battery_level"]?.state ?? "88";

    return html`
      <nav class="wit-dock" aria-label="Navegación rápida">
        <button class="dock-btn" @click=${() => this._handleAction("lights")}>
          <span class="active-accent">${renderIcon("lightbulb", { size: 18 })}</span>
          <span>Luces ${totalActive}</span>
        </button>

        <button class="dock-btn" @click=${() => this._handleAction("energy")}>
          <span>${renderIcon("zap", { size: 18 })}</span>
          <span>${powerWatts} W</span>
        </button>

        <button class="dock-btn" @click=${() => this._handleAction("media")}>
          <span>${renderIcon("music", { size: 18 })}</span>
          <span>${isPlaying ? "❚❚" : "▶"}</span>
        </button>

        <button class="dock-btn" @click=${() => this._handleAction("battery")}>
          <span>${renderIcon("battery-charging", { size: 16 })}</span>
          <span>${batteryVal}%</span>
        </button>

        <div class="dock-dots-group">
          <div
            class="dock-dot ${this.activePage === 0 ? "is-active" : ""}"
            title="Página 1: Operación"
            @click=${() => this._setPage(0)}
          ></div>
          <div
            class="dock-dot ${this.activePage === 1 ? "is-active" : ""}"
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
