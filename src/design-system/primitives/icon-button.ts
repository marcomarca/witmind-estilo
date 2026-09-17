import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";
import { renderIcon } from "../../utilities/icon.js";

export type IconButtonVariant = "default" | "primary" | "ghost" | "glass";
export type IconButtonSize = "sm" | "md" | "lg";

@customElement("wit-icon-button")
export class WitIconButton extends LitElement {
  @property({ type: String })
  icon: string = "power";

  @property({ type: String, reflect: true })
  variant: IconButtonVariant = "default";

  @property({ type: String, reflect: true })
  size: IconButtonSize = "md";

  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  @property({ type: Boolean, reflect: true })
  pending: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String })
  label: string = "";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--wit-radius-control, 14px);
        border: 1px solid transparent;
        cursor: pointer;
        user-select: none;
        transition: transform var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    background-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    border-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    box-shadow var(--wit-duration-fast, 140ms) var(--wit-ease-default);
      }

      button:focus-visible {
        outline: 2px solid var(--wit-accent);
        outline-offset: 2px;
      }

      button:active:not(:disabled) {
        transform: scale(0.95);
      }

      /* Sizes (Honoring 44-48px touch targets) */
      :host([size="sm"]) button {
        width: 36px;
        height: 36px;
        border-radius: 10px;
      }

      :host([size="md"]) button {
        width: var(--wit-touch-min, 44px);
        height: var(--wit-touch-min, 44px);
        border-radius: var(--wit-radius-control, 14px);
      }

      :host([size="lg"]) button {
        width: var(--wit-touch-target, 48px);
        height: var(--wit-touch-target, 48px);
        border-radius: 16px;
      }

      /* Default Variant */
      :host([variant="default"]) button {
        background-color: var(--wit-surface-interactive);
        border-color: var(--wit-border-interactive);
        color: var(--wit-text-secondary);
      }

      :host([variant="default"]) button:hover:not(:disabled) {
        border-color: var(--wit-accent);
        background-color: var(--wit-surface-interactive-hover);
        color: var(--wit-accent);
      }

      /* Primary / Accent Variant */
      :host([variant="primary"]) button {
        background-color: var(--wit-accent);
        border-color: var(--wit-accent);
        color: #ffffff;
        box-shadow: 0 4px 14px var(--wit-accent-glow);
      }

      :host([variant="primary"]) button:hover:not(:disabled) {
        background-color: var(--wit-accent-hover);
      }

      /* Ghost Variant */
      :host([variant="ghost"]) button {
        background-color: transparent;
        border-color: transparent;
        color: var(--wit-text-secondary);
      }

      :host([variant="ghost"]) button:hover:not(:disabled) {
        background-color: var(--wit-accent-muted);
        color: var(--wit-accent);
      }

      /* Glass Variant */
      :host([variant="glass"]) button {
        background-color: var(--wit-surface-glass);
        border-color: var(--wit-border-medium);
        color: var(--wit-text-primary);
        backdrop-filter: blur(12px);
      }

      :host([variant="glass"]) button:hover:not(:disabled) {
        border-color: var(--wit-accent);
        color: var(--wit-accent);
      }

      /* Active State (Emitted light) */
      :host([active]) button {
        background-color: var(--wit-accent);
        border-color: var(--wit-accent);
        color: #ffffff;
        box-shadow: 0 4px 16px var(--wit-accent-glow);
      }

      /* Disabled & Pending */
      :host([disabled]) button {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      :host([pending]) button {
        cursor: wait;
        opacity: 0.8;
      }

      .spinner {
        display: inline-block;
        width: 18px;
        height: 18px;
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
    const iconSize = this.size === "sm" ? 18 : this.size === "lg" ? 24 : 20;

    return html`
      <button
        ?disabled=${this.disabled || this.pending}
        aria-label=${this.label || this.icon}
        aria-pressed=${this.active ? "true" : "false"}
        title=${this.label || this.icon}
      >
        ${this.pending
          ? html`<span class="spinner"></span>`
          : renderIcon(this.icon, { size: iconSize })}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-icon-button": WitIconButton;
  }
}
