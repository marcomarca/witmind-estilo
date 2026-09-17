import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/surface.js";
import "../design-system/primitives/button.js";
import "../design-system/primitives/icon-button.js";
import "../design-system/primitives/status-pill.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderIcon } from "../utilities/icon.js";

@customElement("wit-lighting-summary")
export class WitLightingSummary extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .card-inner {
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .icon-box {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-accent);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px var(--wit-accent-glow);
      }

      .card-title {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 700;
        color: var(--wit-text-primary);
        letter-spacing: -0.01em;
      }

      .card-subtitle {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        margin-top: 1px;
      }

      .lights-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin: 4px 0;
      }

      .light-chip {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        border-radius: var(--wit-radius-control, 14px);
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .light-chip:hover {
        border-color: var(--wit-border-medium);
        background-color: var(--wit-surface-interactive-hover);
        transform: translateY(-1px);
      }

      .light-chip.active {
        background-color: var(--wit-accent-muted);
        border-color: var(--wit-accent);
        box-shadow: 0 2px 12px var(--wit-accent-glow);
      }

      .light-chip.active .chip-name {
        color: var(--wit-text-primary);
        font-weight: 700;
      }

      .chip-info {
        display: flex;
        flex-direction: column;
        gap: 4px;
        overflow: hidden;
      }

      .chip-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--wit-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .chip-bar-wrapper {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .chip-progress {
        width: 48px;
        height: 3px;
        background: var(--wit-border-subtle);
        border-radius: 999px;
        overflow: hidden;
      }

      .chip-progress-bar {
        height: 100%;
        background: var(--wit-accent);
        border-radius: 999px;
      }

      .chip-meta {
        font-size: 10px;
        font-weight: 600;
        color: var(--wit-text-tertiary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
      }

      .power-indicator {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        color: var(--wit-text-tertiary);
        transition: all var(--wit-duration-fast);
      }

      .light-chip.active .power-indicator {
        background: var(--wit-accent);
        color: #ffffff;
        border-color: var(--wit-accent);
        box-shadow: 0 2px 8px var(--wit-accent-glow);
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      .stats-text {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
      }
    `
  ];

  private _toggleLight(entityId: string, e: Event) {
    e.stopPropagation();
    if (!this.hass) return;
    this.hass.callService("light", "toggle", { entity_id: entityId });
  }

  private _openDetails() {
    this.dispatchEvent(new CustomEvent("open-lights-sheet", {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const states = this.hass?.states || {};
    const lightEntities = Object.values(states).filter((e) => e.entity_id.startsWith("light."));
    const activeCount = lightEntities.filter((e) => e.state === "on").length;

    return html`
      <wit-surface level="1" style="height: 100%;">
        <div class="card-inner">
          <div class="card-header">
            <div class="title-group">
              <div class="icon-box">
                ${renderIcon("lightbulb", { size: 20 })}
              </div>
              <div>
                <div class="card-title">Iluminación Showroom</div>
                <div class="card-subtitle">Pasarela DALI 2 / KNX • Control por circuito</div>
              </div>
            </div>
            <wit-status-pill
              status=${activeCount > 0 ? "accent" : "idle"}
              label=${activeCount > 0 ? `${activeCount} ACTIVAS` : "TODO APAGADO"}
            ></wit-status-pill>
          </div>

          <div class="lights-grid">
            ${lightEntities.slice(0, 4).map((light) => {
              const isOn = light.state === "on";
              const brightness = light.attributes.brightness ? Math.round((light.attributes.brightness / 255) * 100) : 0;
              return html`
                <div
                  class="light-chip ${isOn ? "active" : ""}"
                  @click=${(e: Event) => this._toggleLight(light.entity_id, e)}
                >
                  <div class="chip-info">
                    <span class="chip-name">${light.attributes.friendly_name || light.entity_id}</span>
                    <div class="chip-bar-wrapper">
                      ${isOn
                        ? html`
                            <div class="chip-progress">
                              <div class="chip-progress-bar" style="width: ${brightness}%;"></div>
                            </div>
                            <span class="chip-meta">${brightness}%</span>
                          `
                        : html`<span class="chip-meta">Apagado</span>`}
                    </div>
                  </div>
                  <div class="power-indicator">
                    ${renderIcon("power", { size: 14, strokeWidth: 2 })}
                  </div>
                </div>
              `;
            })}
          </div>

          <div class="card-footer">
            <span class="stats-text">${activeCount} de ${lightEntities.length} zonas encendidas</span>
            <wit-button
              variant="secondary"
              size="sm"
              icon="sliders"
              @click=${this._openDetails}
            >
              Control Detallado
            </wit-button>
          </div>
        </div>
      </wit-surface>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-lighting-summary": WitLightingSummary;
  }
}
