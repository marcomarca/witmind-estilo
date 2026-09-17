import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderSvg, ICONS } from "../utilities/icons.js";

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
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--wit-space-5, 24px);
        animation: fadeIn var(--wit-duration-fast) ease-out;
      }

      :host([theme="light"]) .sheet-scrim {
        background: rgba(18, 32, 38, 0.4);
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
        padding: var(--wit-space-5, 24px);
        display: flex;
        flex-direction: column;
        gap: var(--wit-space-5, 24px);
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
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
        font-size: var(--wit-space-3, 12px);
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

      .sheet-group-label {
        font-size: 11px;
        font-weight: 720;
        letter-spacing: 0.08em;
        color: var(--wit-text-tertiary);
        margin-bottom: var(--wit-space-2, 8px);
        display: block;
        text-transform: uppercase;
      }

      .switches-stack {
        display: flex;
        flex-direction: column;
        gap: var(--wit-space-2, 8px);
      }

      .switch-row {
        height: 60px;
        padding: 0 var(--wit-space-4, 16px);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .switch-row:hover {
        border-color: var(--wit-border-accent);
      }

      .switch-row.is-on {
        border-color: var(--wit-border-accent);
        background: var(--wit-accent-muted, rgba(242, 101, 34, 0.12));
      }

      .switch-left {
        display: flex;
        align-items: center;
        gap: var(--wit-space-3, 12px);
      }

      .switch-icon {
        display: flex;
        color: var(--wit-text-tertiary);
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
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .switch-meta {
        font-size: 11px;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      .switch-toggle {
        width: 48px;
        height: 26px;
        border-radius: var(--wit-radius-pill, 999px);
        background: var(--wit-border-subtle);
        position: relative;
        transition: all var(--wit-duration-normal) var(--wit-ease-default);
        flex-shrink: 0;
      }

      .switch-toggle::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ffffff;
        top: 3px;
        left: 3px;
        transition: transform var(--wit-duration-normal) var(--wit-ease-default);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }

      .switch-row.is-on .switch-toggle {
        background: var(--wit-accent);
      }

      .switch-row.is-on .switch-toggle::after {
        transform: translateX(22px);
      }

      .sheet-actions {
        display: flex;
        gap: var(--wit-space-2, 8px);
        margin-top: var(--wit-space-2, 8px);
      }

      .sheet-action-btn {
        flex: 1;
        height: 44px;
        border-radius: var(--wit-radius-control, 14px);
        border: 1px solid var(--wit-border-subtle);
        font-size: var(--wit-space-3, 12px);
        font-weight: 640;
        cursor: pointer;
        font-family: inherit;
        transition: all var(--wit-duration-fast);
      }

      .sheet-action-btn.is-primary {
        background: var(--wit-accent);
        color: #ffffff;
        border: none;
      }

      .sheet-action-btn.is-danger {
        background: rgba(220, 38, 38, 0.15);
        color: var(--wit-danger, #dc2626);
        border-color: rgba(220, 38, 38, 0.3);
      }
    `
  ];

  private _toggle(entityId: string) {
    if (!this.hass) return;
    const currentState = this.hass.states[entityId]?.state || "off";
    const service = currentState === "on" ? "turn_off" : "turn_on";
    this.hass.callService("switch", service, { entity_id: entityId });
  }

  private _turnAll(action: "on" | "off") {
    if (!this.hass) return;
    if (action === "on") {
      this.hass.callService("script", "showroom_encendido_general", { entity_id: "script.showroom_encendido_general" });
    } else {
      this.hass.callService("script", "showroom_apagado_general", { entity_id: "script.showroom_apagado_general" });
    }
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
      <div class="sheet-scrim" id="sheetScrim" @click=${(e: MouseEvent) => {
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
            <button class="sheet-close-btn" id="sheetCloseBtn" @click=${this._close} aria-label="Cerrar">
              ${renderSvg(ICONS.close)}
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
                    data-entity-id="${s.id}"
                    @click=${() => this._toggle(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">
                        ${renderSvg(ICONS.bulb)}
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
                    data-entity-id="${s.id}"
                    @click=${() => this._toggle(s.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${isOn ? "active-accent" : ""}">
                        ${renderSvg(ICONS.bulb)}
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
                data-entity-id="${REFLECTOR.id}"
                @click=${() => this._toggle(REFLECTOR.id)}
              >
                <div class="switch-left">
                  <span class="switch-icon ${states[REFLECTOR.id]?.state === "on" ? "active-accent" : ""}">
                    ${renderSvg(ICONS.bulb)}
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

          <div class="sheet-actions">
            <button class="sheet-action-btn is-danger" id="modalTurnAllOff" @click=${() => this._turnAll("off")}>
              Apagar todo
            </button>
            <button class="sheet-action-btn is-primary" id="modalTurnAllOn" @click=${() => this._turnAll("on")}>
              Encender todo
            </button>
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
