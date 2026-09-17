import { LitElement, html, css, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import { WitViz } from "./wit-viz.js";

@customElement("wit-chart")
export class WitChart extends LitElement {
  @property({ type: String })
  type: "gauge" | "sparkline" | "energyBars" | "areaTrend" = "sparkline";

  @property({ type: Object })
  config: Record<string, any> = {};

  @property({ type: String })
  theme: "dark" | "light" = "dark";

  private _containerRef?: HTMLDivElement;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        min-height: 48px;
      }

      .chart-viewport {
        width: 100%;
        height: 100%;
        min-height: inherit;
      }
    `
  ];

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._containerRef) {
      WitViz.dispose(this._containerRef);
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._renderChart();
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has("config") || changedProperties.has("type") || changedProperties.has("theme")) {
      this._renderChart();
    }
  }

  private _renderChart() {
    if (!this._containerRef) return;

    // Detect theme from ancestor if not explicitly specified
    let effectiveTheme = this.theme;
    const parentWithTheme = this.closest("[theme]");
    if (parentWithTheme) {
      const t = parentWithTheme.getAttribute("theme");
      if (t === "light" || t === "dark") effectiveTheme = t;
    }

    const options = {
      ...this.config,
      theme: effectiveTheme
    };

    switch (this.type) {
      case "gauge":
        WitViz.gauge(this._containerRef, options as any);
        break;
      case "sparkline":
        WitViz.sparkline(this._containerRef, options as any);
        break;
      case "energyBars":
        WitViz.energyBars(this._containerRef, options as any);
        break;
      case "areaTrend":
        WitViz.areaTrend(this._containerRef, options as any);
        break;
    }
  }

  render() {
    return html`
      <div
        class="chart-viewport"
        ${(el: HTMLDivElement) => {
          this._containerRef = el;
        }}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-chart": WitChart;
  }
}
