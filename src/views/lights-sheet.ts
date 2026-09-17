import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderIcon } from "../utilities/icon.js";

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

@customElement("wit-lights-sheet")
export class WitLightsSheet extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: Object })
  hass?: HomeAssistant;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: contents;
      }

      .sheet-scrim {
        position: fixed;
        inset: 0;
        background: var(--wit-surface-overlay, rgba(0, 0, 0, 0.65));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fadeIn var(--wit-duration-fast) ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .sheet-modal {
        background: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-panel, 28px);
        width: min(620px, calc(100vw - 40px));
        max-height: 85dvh;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        box-shadow: var(--wit-shadow-sheet);
        animation: scaleUp var(--wit-duration-normal) var(--wit-ease-default);
      }

      @keyframes scaleUp {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .sheet-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .sheet-title {
        font-size: 20px;
        font-weight: 720;
        color: var(--wit-text-primary);
      }

      .sheet-meta {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
        font-variant-numeric: tabular-nums;
      }

      .sheet-close-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
      }

      .sheet-close-btn:hover {
        color: var(--wit-text-primary);
        border-color: var(--wit-border-accent);
      }

      .sheet-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sheet-group-label {
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.08em;
        color: var(--wit-text-tertiary);
        text-transform: uppercase;
      }

      .switches-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .switch-row {
        padding: 10px 14px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .switch-row:hover {
        border-color: var(--wit-border-accent);
        background: var(--wit-surface-interactive-hover, var(--wit-surface-interactive));
      }

      .switch-row.is-on {
        border-color: var(--wit-border-accent);
      }

      .switch-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .switch-icon {
        color: var(--wit-text-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .switch-icon.active-accent {
        color: var(--wit-accent);
      }

      .switch-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .switch-name {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .switch-meta {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      .switch-toggle {
        width: 44px;
        height: 24px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-border-subtle);
        position: relative;
        transition: background-color var(--wit-duration-fast) var(--wit-ease-default);
        flex-shrink: 0;
      }

      .switch-row.is-on .switch-toggle {
        background: var(--wit-accent);
      }

      .switch-toggle::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        top: 3px;
        left: 3px;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default);
      }

      .switch-row.is-on .switch-toggle::after {
        transform: translateX(20px);
      }
    `
  ];

  private _toggle(entityId: string) {
    if (!this.hass) return;
    const currentState = this.hass.states[entityId]?.state || "off";
    const service = currentState === "on" ? "turn_off" : "turn_on";
    this.hass.callService("switch", service, { entity_id: entityId });
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  render() {
    if (!this.open) return null;

    const states = this.hass?.states || {};

    let totalActive = 0;
    let powerWatts = 0;
    for (const c of ALL_CIRCUITS) {
      if (states[c.id]?.state === "on") {
        totalActive++;
        powerWatts += c.watts;
      }
    }

    return html`
      <div class="sheet-scrim" @click=${(e: MouseEvent) => {
        if (e.target === e.currentTarget) this._close();
      }}>
        <div class="sheet-modal" role="dialog" aria-modal="true">
          <div class="sheet-header">
            <div>
              <h2 class="sheet-title">Control de Luminarias</h2>
              <p class="sheet-meta">
                ${totalActive} de ${ALL_CIRCUITS.length} encendidas • ${powerWatts} W de carga
              </p>
            </div>
            <button class="sheet-close-btn" @click=${this._close} aria-label="Cerrar">
              ${renderIcon("x", { size: 16 })}
            </button>
          </div>

          <!-- SPOTS -->
          <div class="sheet-group">
            <span class="sheet-group-label">SPOTS</span>
            <div class="switches-stack">
              ${SPOTS.map((s) => {
                const isOn = states[s.id]?.state === "on";
                return html`
                  <div
                    class="switch-row ${isOn ? "is-on" : ""}"
                    @click=${() => this._toggle(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">
                        ${renderIcon("lightbulb", { size: 18 })}
                      </span>
                      <div class="switch-texts">
                        <span class="switch-name">${s.name}</span>
                        <span class="switch-meta">${s.subtitle} • ${s.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- MUESTRARIOS & PANELES -->
          <div class="sheet-group">
            <span class="sheet-group-label">MUESTRARIOS & PANELES</span>
            <div class="switches-stack">
              ${SAMPLES.map((s) => {
                const isOn = states[s.id]?.state === "on";
                return html`
                  <div
                    class="switch-row ${isOn ? "is-on" : ""}"
                    @click=${() => this._toggle(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">
                        ${renderIcon("layers", { size: 18 })}
                      </span>
                      <div class="switch-texts">
                        <span class="switch-name">${s.name}</span>
                        <span class="switch-meta">${s.subtitle} • ${s.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `;
              })}
            </div>
          </div>

          <!-- REFLECTOR EXTERIOR -->
          <div class="sheet-group">
            <span class="sheet-group-label">REFLECTOR EXTERIOR</span>
            <div class="switches-stack">
              <div
                class="switch-row ${states[REFLECTOR.id]?.state === "on" ? "is-on" : ""}"
                @click=${() => this._toggle(REFLECTOR.id)}
              >
                <div class="switch-left">
                  <span class="switch-icon ${states[REFLECTOR.id]?.state === "on" ? "active-accent" : ""}">
                    ${renderIcon("lightbulb", { size: 18 })}
                  </span>
                  <div class="switch-texts">
                    <span class="switch-name">${REFLECTOR.name}</span>
                    <span class="switch-meta">${REFLECTOR.subtitle}</span>
                  </div>
                </div>
                <div class="switch-toggle"></div>
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
    "wit-lights-sheet": WitLightsSheet;
  }
}
