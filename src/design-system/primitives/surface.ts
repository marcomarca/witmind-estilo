import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";

export type SurfaceLevel = "0" | "1" | "2";
export type SurfaceVariant = "card" | "panel" | "glass" | "interactive";

@customElement("wit-surface")
export class WitSurface extends LitElement {
  @property({ type: String, reflect: true })
  level: SurfaceLevel = "1";

  @property({ type: String, reflect: true })
  variant: SurfaceVariant = "card";

  @property({ type: Boolean, reflect: true })
  interactive: boolean = false;

  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: relative;
        border-radius: var(--wit-radius-card, 22px);
        transition: transform var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    background-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    border-color var(--wit-duration-fast, 140ms) var(--wit-ease-default),
                    box-shadow var(--wit-duration-fast, 140ms) var(--wit-ease-default);
      }

      /* Level 0: Canvas Floor */
      :host([level="0"]) {
        background-color: var(--wit-canvas);
        border: none;
        box-shadow: none;
      }

      /* Level 1: Content Surface (Opaque, quiet, with ambient inner rim) */
      :host([level="1"]) {
        background-color: var(--wit-surface);
        background-image: var(--wit-surface-gradient);
        border: 1px solid var(--wit-border-subtle);
        box-shadow: var(--wit-shadow-card), inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      /* Level 2: Raised / Floating Surface (High blur, elevated rim) */
      :host([level="2"]) {
        background-color: var(--wit-surface-raised);
        background-image: var(--wit-surface-gradient);
        border: 1px solid var(--wit-border-medium);
        box-shadow: var(--wit-shadow-dock), inset 0 1px 0 rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
      }

      /* Panel Variant: Larger Radius */
      :host([variant="panel"]) {
        border-radius: var(--wit-radius-panel, 28px);
      }

      /* Glass Variant */
      :host([variant="glass"]) {
        background-color: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-medium);
        box-shadow: var(--wit-shadow-dock);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }

      /* Interactive Surface Hover & Active States */
      :host([interactive]) {
        cursor: pointer;
        user-select: none;
      }

      :host([interactive]:hover) {
        border-color: var(--wit-border-medium);
        background-color: var(--wit-surface-interactive-hover, var(--wit-surface-raised));
        box-shadow: var(--wit-shadow-card-hover);
        transform: translateY(-1px);
      }

      :host([interactive]:active) {
        transform: scale(0.99) translateY(0);
      }

      :host([active]) {
        border-color: var(--wit-border-accent);
        background-color: var(--wit-surface-active);
        box-shadow: 0 0 20px var(--wit-accent-glow), inset 0 1px 0 rgba(242, 101, 34, 0.2);
      }

      .surface-content {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    `
  ];

  render() {
    return html`
      <div class="surface-content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-surface": WitSurface;
  }
}
