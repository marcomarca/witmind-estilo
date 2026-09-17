import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";
import { renderIcon } from "../../utilities/icon.js";

export type EmptyStateType = "loading" | "empty" | "unavailable" | "error" | "offline";

@customElement("wit-empty-state")
export class WitEmptyState extends LitElement {
  @property({ type: String, reflect: true })
  type: EmptyStateType = "empty";

  @property({ type: String })
  heading: string = "";

  @property({ type: String })
  message: string = "";

  @property({ type: String })
  icon: string = "";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 20px;
        text-align: center;
        border-radius: var(--wit-radius-card, 22px);
        background-color: var(--wit-surface);
        border: 1px dashed var(--wit-border-medium);
        min-height: 160px;
      }

      .icon-container {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background-color: var(--wit-surface-interactive);
        color: var(--wit-text-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12px;
      }

      :host([type="loading"]) .icon-container {
        color: var(--wit-accent);
        background-color: var(--wit-accent-muted);
      }

      :host([type="error"]) .icon-container {
        color: var(--wit-danger);
        background-color: var(--wit-danger-muted);
      }

      :host([type="unavailable"]) .icon-container {
        color: var(--wit-warning);
        background-color: var(--wit-warning-muted);
      }

      .heading {
        font-size: var(--wit-type-body-size, 14px);
        font-weight: 600;
        color: var(--wit-text-primary);
        margin-bottom: 4px;
      }

      .message {
        font-size: var(--wit-type-label-size, 12px);
        color: var(--wit-text-tertiary);
        max-width: 320px;
        line-height: 1.4;
      }

      .spinner {
        width: 24px;
        height: 24px;
        border: 2.5px solid var(--wit-border-medium);
        border-top-color: var(--wit-accent);
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
    let iconName = this.icon;
    if (!iconName) {
      if (this.type === "error") iconName = "alert-circle";
      else if (this.type === "unavailable") iconName = "wifi-off";
      else if (this.type === "offline") iconName = "wifi-off";
      else iconName = "info";
    }

    return html`
      <div class="icon-container">
        ${this.type === "loading"
          ? html`<div class="spinner"></div>`
          : renderIcon(iconName, { size: 24 })}
      </div>
      ${this.heading ? html`<div class="heading">${this.heading}</div>` : null}
      ${this.message ? html`<div class="message">${this.message}</div>` : null}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-empty-state": WitEmptyState;
  }
}
