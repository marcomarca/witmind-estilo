import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../styles.js";
import { renderIcon } from "../../utilities/icon.js";

export type StatSize = "sm" | "md" | "lg" | "hero";

@customElement("wit-stat")
export class WitStat extends LitElement {
  @property({ type: String })
  label: string = "";

  @property({ type: String })
  value: string = "0";

  @property({ type: String })
  unit: string = "";

  @property({ type: String })
  secondary: string = "";

  @property({ type: String })
  icon: string = "";

  @property({ type: String, reflect: true })
  size: StatSize = "md";

  @property({ type: String })
  trend: string = "";

  @property({ type: String })
  trendDirection: "up" | "down" | "neutral" = "neutral";

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .stat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      .stat-label {
        font-size: var(--wit-type-meta-size, 11px);
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--wit-text-tertiary);
      }

      .stat-icon {
        color: var(--wit-text-secondary);
        display: flex;
        align-items: center;
      }

      .stat-main {
        display: flex;
        align-items: baseline;
        gap: 6px;
      }

      .stat-value {
        font-weight: 600;
        color: var(--wit-text-primary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }

      .stat-unit {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 500;
        color: var(--wit-text-secondary);
      }

      /* Sizes */
      :host([size="sm"]) .stat-value {
        font-size: 24px;
      }
      :host([size="sm"]) .stat-unit {
        font-size: 14px;
      }

      :host([size="md"]) .stat-value {
        font-size: var(--wit-type-kpi-size, 32px);
      }

      :host([size="lg"]) .stat-value {
        font-size: var(--wit-type-hero-size, 36px);
      }

      :host([size="hero"]) .stat-value {
        font-size: var(--wit-type-display-size, 56px);
        letter-spacing: -0.03em;
      }
      :host([size="hero"]) .stat-unit {
        font-size: 24px;
      }

      .stat-footer {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: var(--wit-type-label-size, 12px);
        color: var(--wit-text-secondary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
      }

      .trend-pill {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-size: 11px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 6px;
      }

      .trend-up {
        background-color: var(--wit-success-muted);
        color: var(--wit-success);
      }

      .trend-down {
        background-color: var(--wit-danger-muted);
        color: var(--wit-danger);
      }

      .trend-neutral {
        background-color: var(--wit-surface-interactive);
        color: var(--wit-text-secondary);
      }
    `
  ];

  render() {
    return html`
      ${this.label || this.icon
        ? html`
            <div class="stat-header">
              ${this.label ? html`<span class="stat-label">${this.label}</span>` : null}
              ${this.icon
                ? html`<span class="stat-icon">${renderIcon(this.icon, { size: 16 })}</span>`
                : null}
            </div>
          `
        : null}

      <div class="stat-main">
        <span class="stat-value">${this.value}</span>
        ${this.unit ? html`<span class="stat-unit">${this.unit}</span>` : null}
      </div>

      ${this.secondary || this.trend
        ? html`
            <div class="stat-footer">
              ${this.trend
                ? html`
                    <span class="trend-pill trend-${this.trendDirection}">
                      ${this.trendDirection === "up"
                        ? renderIcon("arrow-up-right", { size: 12, strokeWidth: 2.2 })
                        : this.trendDirection === "down"
                        ? renderIcon("arrow-down-right", { size: 12, strokeWidth: 2.2 })
                        : null}
                      ${this.trend}
                    </span>
                  `
                : null}
              ${this.secondary ? html`<span class="stat-secondary">${this.secondary}</span>` : null}
            </div>
          `
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-stat": WitStat;
  }
}
