import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";
import { renderIcon } from "../../utilities/icon.js";

@customElement("wit-sheet")
export class WitSheet extends LitElement {
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  @property({ type: String })
  heading: string = "";

  @property({ type: String })
  subtitle: string = "";

  @property({ type: String })
  icon: string = "";

  @property({ type: String })
  width: string = "680px";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: fixed;
        inset: 0;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--wit-duration-modal, 300ms) var(--wit-ease-default),
                    visibility var(--wit-duration-modal, 300ms) var(--wit-ease-default);
      }

      :host([open]) {
        pointer-events: auto;
        opacity: 1;
        visibility: visible;
      }

      .backdrop {
        position: absolute;
        inset: 0;
        background-color: var(--wit-surface-overlay);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        opacity: 0;
        transition: opacity var(--wit-duration-modal, 300ms) var(--wit-ease-default);
      }

      :host([open]) .backdrop {
        opacity: 1;
      }

      .sheet-dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-50% + 16px)) scale(0.985);
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 48px);
        background-color: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-medium);
        border-radius: var(--wit-radius-panel, 28px);
        box-shadow: var(--wit-shadow-sheet);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        opacity: 0;
        transition: transform var(--wit-duration-modal, 300ms) var(--wit-ease-default),
                    opacity var(--wit-duration-modal, 300ms) var(--wit-ease-default);
      }

      :host([open]) .sheet-dialog {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }

      .sheet-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid var(--wit-border-subtle);
        background: var(--wit-surface);
      }

      .sheet-title-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sheet-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background-color: var(--wit-accent-muted);
        color: var(--wit-accent);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sheet-heading {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 600;
        color: var(--wit-text-primary);
        line-height: 1.2;
      }

      .sheet-subtitle {
        font-size: var(--wit-type-label-size, 12px);
        color: var(--wit-text-tertiary);
        margin-top: 2px;
      }

      .close-btn {
        width: var(--wit-touch-min, 44px);
        height: var(--wit-touch-min, 44px);
        border-radius: 12px;
        border: 1px solid var(--wit-border-subtle);
        background-color: var(--wit-surface-interactive);
        color: var(--wit-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .close-btn:hover {
        background-color: var(--wit-accent-muted);
        color: var(--wit-accent);
        border-color: var(--wit-accent);
      }

      .close-btn:active {
        transform: scale(0.95);
      }

      .sheet-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
      }

      .sheet-footer {
        padding: 16px 24px;
        border-top: 1px solid var(--wit-border-subtle);
        background-color: var(--wit-surface);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }
    `
  ];

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent("close", {
      bubbles: true,
      composed: true
    }));
  }

  private _handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this._close();
    }
  }

  render() {
    return html`
      <div class="backdrop" @click=${this._handleBackdropClick}></div>
      <div class="sheet-dialog" style="width: ${this.width};">
        <div class="sheet-header">
          <div class="sheet-title-group">
            ${this.icon
              ? html`<div class="sheet-icon">${renderIcon(this.icon, { size: 20 })}</div>`
              : null}
            <div>
              <div class="sheet-heading">${this.heading}</div>
              ${this.subtitle ? html`<div class="sheet-subtitle">${this.subtitle}</div>` : null}
            </div>
          </div>
          <button class="close-btn" aria-label="Cerrar" @click=${this._close}>
            ${renderIcon("x", { size: 20 })}
          </button>
        </div>

        <div class="sheet-body">
          <slot></slot>
        </div>

        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-sheet": WitSheet;
  }
}
