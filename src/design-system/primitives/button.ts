import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";
import { renderIcon } from "../../utilities/icon.js";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

@customElement("wit-button")
export class WitButton extends LitElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = "secondary";

  @property({ type: String, reflect: true })
  size: ButtonSize = "md";

  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  @property({ type: Boolean, reflect: true })
  pending: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String })
  icon: string = "";

  @property({ type: String })
  iconPosition: "left" | "right" = "left";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-block;
        vertical-align: middle;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-family: inherit;
        font-weight: 600;
        border-radius: var(--wit-radius-control, 14px);
        border: 1px solid transparent;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        text-decoration: none;
        transition: transform var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    background-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    border-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    box-shadow var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    opacity var(--wit-duration-fast, 140ms) var(--wit-ease-default);
      }

      button:focus-visible {
        outline: 2px solid var(--wit-accent);
        outline-offset: 2px;
      }

      button:active:not(:disabled) {
        transform: scale(0.97);
      }

      /* Sizes */
      :host([size="sm"]) button {
        min-height: 36px;
        padding: 6px 12px;
        font-size: var(--wit-type-label-size, 12px);
        border-radius: 10px;
      }

      :host([size="md"]) button {
        min-height: var(--wit-touch-min, 44px);
        padding: 10px 18px;
        font-size: var(--wit-type-body-size, 14px);
        border-radius: var(--wit-radius-control, 14px);
      }

      :host([size="lg"]) button {
        min-height: var(--wit-touch-target, 48px);
        padding: 12px 24px;
        font-size: var(--wit-type-headline-size, 16px);
        border-radius: 16px;
      }

      /* Secondary (Default architectural surface button) */
      :host([variant="secondary"]) button {
        background-color: var(--wit-surface-interactive);
        border-color: var(--wit-border-medium);
        color: var(--wit-text-primary);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      :host([variant="secondary"]) button:hover:not(:disabled) {
        border-color: var(--wit-accent);
        background-color: var(--wit-surface-interactive-hover);
        color: var(--wit-accent);
      }

      /* Primary (Solid Accent) */
      :host([variant="primary"]) button {
        background-color: var(--wit-accent);
        border-color: var(--wit-accent);
        color: #ffffff;
        box-shadow: 0 4px 14px var(--wit-accent-glow);
      }

      :host([variant="primary"]) button:hover:not(:disabled) {
        background-color: var(--wit-accent-hover);
        border-color: var(--wit-accent-hover);
        box-shadow: 0 6px 20px var(--wit-accent-glow);
      }

      /* Ghost */
      :host([variant="ghost"]) button {
        background-color: transparent;
        border-color: transparent;
        color: var(--wit-text-secondary);
      }

      :host([variant="ghost"]) button:hover:not(:disabled) {
        background-color: var(--wit-accent-muted);
        color: var(--wit-accent);
      }

      /* Danger */
      :host([variant="danger"]) button {
        background-color: var(--wit-danger-muted);
        border-color: var(--wit-danger);
        color: var(--wit-danger);
      }

      :host([variant="danger"]) button:hover:not(:disabled) {
        background-color: var(--wit-danger);
        color: #ffffff;
      }

      /* Active state */
      :host([active]) button {
        background-color: var(--wit-accent-muted);
        border-color: var(--wit-accent);
        color: var(--wit-accent);
        font-weight: 700;
      }

      /* Disabled & Pending */
      :host([disabled]) button {
        opacity: 0.45;
        cursor: not-allowed;
        pointer-events: none;
      }

      :host([pending]) button {
        cursor: wait;
        opacity: 0.8;
      }

      .spinner {
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `
  ];

  render() {
    const iconSize = this.size === "sm" ? 16 : this.size === "lg" ? 22 : 18;

    return html`
      <button
        ?disabled=${this.disabled || this.pending}
        aria-pressed=${this.active ? "true" : "false"}
        aria-busy=${this.pending ? "true" : "false"}
      >
        ${this.pending
          ? html`<span class="spinner"></span>`
          : this.icon && this.iconPosition === "left"
          ? renderIcon(this.icon, { size: iconSize })
          : null}
        <slot></slot>
        ${!this.pending && this.icon && this.iconPosition === "right"
          ? renderIcon(this.icon, { size: iconSize })
          : null}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-button": WitButton;
  }
}
