import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";

@customElement("wit-switch")
export class WitSwitch extends LitElement {
  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String })
  label: string = "";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
      }

      :host([disabled]) {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .switch-track {
        width: 48px;
        height: 28px;
        border-radius: 999px;
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        position: relative;
        transition: background-color var(--wit-duration-normal) var(--wit-ease-default),
                    border-color var(--wit-duration-normal) var(--wit-ease-default),
                    box-shadow var(--wit-duration-normal) var(--wit-ease-default);
      }

      :host(:hover:not([disabled])) .switch-track {
        border-color: var(--wit-border-medium);
      }

      .switch-thumb {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: var(--wit-text-secondary);
        position: absolute;
        top: 2px;
        left: 2px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        transition: transform var(--wit-duration-normal) var(--wit-ease-default),
                    background-color var(--wit-duration-normal) var(--wit-ease-default);
      }

      /* Checked State (Witmind Emitted Light) */
      :host([checked]) .switch-track {
        background-color: var(--wit-accent);
        border-color: var(--wit-accent);
        box-shadow: 0 0 14px var(--wit-accent-glow);
      }

      :host([checked]) .switch-thumb {
        transform: translateX(20px);
        background-color: #ffffff;
      }

      .switch-label {
        font-size: var(--wit-type-body-size, 14px);
        font-weight: 500;
        color: var(--wit-text-primary);
      }

      button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
      }

      button:focus-visible .switch-track {
        outline: 2px solid var(--wit-accent);
        outline-offset: 3px;
      }
    `
  ];

  private _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <button
        type="button"
        role="switch"
        aria-checked=${this.checked ? "true" : "false"}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <span class="switch-track">
          <span class="switch-thumb"></span>
        </span>
      </button>
      ${this.label ? html`<span class="switch-label" @click=${this._toggle}>${this.label}</span>` : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-switch": WitSwitch;
  }
}
