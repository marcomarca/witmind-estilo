import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/surface.js";
import "../design-system/primitives/button.js";
import "../design-system/primitives/status-pill.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderIcon } from "../utilities/icon.js";

interface SceneDef {
  id: string;
  name: string;
  icon: string;
  desc: string;
}

const SCENES: SceneDef[] = [
  { id: "scene.showroom_confort", name: "Confort", icon: "sun", desc: "Luz cálida 3000K" },
  { id: "scene.showroom_cine", name: "Cine", icon: "moon", desc: "Fosas tenues 15%" },
  { id: "scene.showroom_reunion", name: "Reunión", icon: "sparkles", desc: "Brillo 100% 4000K" },
  { id: "scene.showroom_noche", name: "Apagado", icon: "power", desc: "Todo off" }
];

@customElement("wit-scene-shortcuts")
export class WitSceneShortcuts extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  @property({ type: String })
  activeSceneId: string = "scene.showroom_confort";

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
        background: var(--wit-surface-interactive);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-interactive);
        display: flex;
        align-items: center;
        justify-content: center;
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

      .scenes-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin: 4px 0;
      }

      .scene-btn {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: var(--wit-radius-control, 14px);
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .scene-btn:hover {
        border-color: var(--wit-border-medium);
        background-color: var(--wit-surface-interactive-hover);
        transform: translateY(-1px);
      }

      .scene-btn:active {
        transform: scale(0.97) translateY(0);
      }

      .scene-btn.active {
        background-color: var(--wit-accent-muted);
        border-color: var(--wit-accent);
        box-shadow: 0 2px 12px var(--wit-accent-glow);
      }

      .scene-icon {
        width: 34px;
        height: 34px;
        border-radius: 10px;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--wit-text-secondary);
        transition: all var(--wit-duration-fast);
      }

      .scene-btn.active .scene-icon {
        background: var(--wit-accent);
        border-color: var(--wit-accent);
        color: #ffffff;
        box-shadow: 0 2px 8px var(--wit-accent-glow);
      }

      .scene-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow: hidden;
      }

      .scene-name {
        font-size: 12px;
        font-weight: 600;
        color: var(--wit-text-primary);
      }

      .scene-btn.active .scene-name {
        color: var(--wit-text-primary);
        font-weight: 700;
      }

      .scene-desc {
        font-size: 10px;
        color: var(--wit-text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        color: var(--wit-text-tertiary);
        border-top: 1px solid var(--wit-border-subtle);
        padding-top: 10px;
      }
    `
  ];

  private _activateScene(sceneId: string) {
    this.activeSceneId = sceneId;
    if (this.hass) {
      this.hass.callService("scene", "turn_on", { entity_id: sceneId });
    }
  }

  render() {
    return html`
      <wit-surface level="1" style="height: 100%;">
        <div class="card-inner">
          <div class="card-header">
            <div class="title-group">
              <div class="icon-box">
                ${renderIcon("sliders", { size: 20 })}
              </div>
              <div>
                <div class="card-title">Escenas Rápidas</div>
                <div class="card-subtitle">Atmósferas Programadas • 1-Touch</div>
              </div>
            </div>
            <wit-status-pill status="online" label="4 Escenas"></wit-status-pill>
          </div>

          <div class="scenes-grid">
            ${SCENES.map((scene) => {
              const isActive = this.activeSceneId === scene.id;
              return html`
                <div
                  class="scene-btn ${isActive ? "active" : ""}"
                  @click=${() => this._activateScene(scene.id)}
                >
                  <div class="scene-icon">
                    ${renderIcon(scene.icon, { size: 16, color: "currentColor" })}
                  </div>
                  <div class="scene-info">
                    <span class="scene-name">${scene.name}</span>
                    <span class="scene-desc">${scene.desc}</span>
                  </div>
                </div>
              `;
            })}
          </div>

          <div class="card-footer">
            <span>Fosas LED + Suelo Radiante</span>
            <span class="tnum">Latencia KNX: 8ms</span>
          </div>
        </div>
      </wit-surface>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-scene-shortcuts": WitSceneShortcuts;
  }
}
