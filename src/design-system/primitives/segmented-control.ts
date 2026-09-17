import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";

export interface SegmentOption {
  value: string;
  label: string;
  icon?: string;
}

@customElement("wit-segmented-control")
export class WitSegmentedControl extends LitElement {
  @property({ type: Array })
  options: (string | SegmentOption)[] = [];

  @property({ type: String })
  value: string = "";

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        padding: 4px;
        border-radius: var(--wit-radius-control, 14px);
        position: relative;
        user-select: none;
      }

      .control-container {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 2px;
      }

      button {
        flex: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-height: 36px;
        padding: 6px 14px;
        border-radius: 10px;
        border: none;
        background: transparent;
        color: var(--wit-text-secondary);
        font-family: inherit;
        font-size: var(--wit-type-label-size, 12px);
        font-weight: 600;
        cursor: pointer;
        transition: color var(--wit-duration-fast) var(--wit-ease-default),
                    background-color var(--wit-duration-fast) var(--wit-ease-default),
                    transform var(--wit-duration-fast) var(--wit-ease-default);
      }

      button:hover:not(:disabled):not(.active) {
        color: var(--wit-text-primary);
        background-color: rgba(255, 255, 255, 0.04);
      }

      button.active {
        background-color: var(--wit-accent);
        color: #ffffff;
        box-shadow: 0 2px 8px var(--wit-accent-glow);
        font-weight: 700;
      }

      button:focus-visible {
        outline: 2px solid var(--wit-accent);
        outline-offset: 1px;
      }

      :host([disabled]) {
        opacity: 0.4;
        pointer-events: none;
      }
    `
  ];

  private _selectOption(val: string) {
    if (this.disabled || this.value === val) return;
    this.value = val;
    this.dispatchEvent(new CustomEvent("change", {
      detail: { value: val },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="control-container" role="tablist">
        ${this.options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          const isActive = this.value === val;

          return html`
            <button
              type="button"
              role="tab"
              aria-selected=${isActive ? "true" : "false"}
              class=${isActive ? "active" : ""}
              @click=${() => this._selectOption(val)}
            >
              ${label}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-segmented-control": WitSegmentedControl;
  }
}
