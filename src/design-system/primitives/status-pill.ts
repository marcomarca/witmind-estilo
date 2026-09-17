import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";

export type StatusType = "online" | "offline" | "warning" | "danger" | "accent" | "idle";

@customElement("wit-status-pill")
export class WitStatusPill extends LitElement {
  @property({ type: String, reflect: true })
  status: StatusType = "online";

  @property({ type: String })
  label: string = "";

  @property({ type: Boolean, reflect: true })
  pulse: boolean = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: var(--wit-radius-pill, 999px);
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-subtle);
        font-size: var(--wit-type-meta-size, 11px);
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--wit-text-secondary);
        user-select: none;
      }

      .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: var(--wit-text-tertiary);
        transition: background-color var(--wit-duration-normal) var(--wit-ease-default);
      }

      /* Status Themes */
      :host([status="online"]) .dot {
        background-color: var(--wit-success);
        box-shadow: 0 0 8px var(--wit-success-glow);
      }
      :host([status="online"]) .pill {
        color: var(--wit-success);
        background-color: var(--wit-success-muted);
        border-color: rgba(16, 185, 129, 0.25);
      }

      :host([status="accent"]) .dot {
        background-color: var(--wit-accent);
        box-shadow: 0 0 8px var(--wit-accent-glow);
      }
      :host([status="accent"]) .pill {
        color: var(--wit-accent);
        background-color: var(--wit-accent-muted);
        border-color: var(--wit-border-accent);
      }

      :host([status="warning"]) .dot {
        background-color: var(--wit-warning);
        box-shadow: 0 0 8px var(--wit-warning-glow);
      }
      :host([status="warning"]) .pill {
        color: var(--wit-warning);
        background-color: var(--wit-warning-muted);
        border-color: rgba(245, 158, 11, 0.25);
      }

      :host([status="danger"]) .dot {
        background-color: var(--wit-danger);
        box-shadow: 0 0 8px var(--wit-danger-glow);
      }
      :host([status="danger"]) .pill {
        color: var(--wit-danger);
        background-color: var(--wit-danger-muted);
        border-color: rgba(239, 68, 68, 0.25);
      }

      :host([status="offline"]) .dot {
        background-color: var(--wit-text-tertiary);
      }
      :host([status="offline"]) .pill {
        color: var(--wit-text-tertiary);
        opacity: 0.8;
      }

      /* Subtle Pulse */
      :host([pulse]) .dot {
        animation: pulse-ring 2s infinite ease-in-out;
      }

      @keyframes pulse-ring {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.85); }
      }
    `
  ];

  render() {
    return html`
      <div class="pill">
        <span class="dot"></span>
        <span class="label"><slot>${this.label}</slot></span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-status-pill": WitStatusPill;
  }
}
