import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/surface.js";
import "../design-system/primitives/stat.js";
import "../design-system/primitives/status-pill.js";
import type { HomeAssistant } from "../types/home-assistant.js";
import { renderIcon } from "../utilities/icon.js";

@customElement("wit-weather-summary")
export class WitWeatherSummary extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }

      .card-inner {
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 16px;
      }

      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .icon-box {
        width: 42px;
        height: 42px;
        border-radius: 14px;
        background: var(--wit-surface-interactive);
        color: var(--wit-info, #0ea5e9);
        border: 1px solid var(--wit-border-interactive);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-title {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 700;
        color: var(--wit-text-primary);
        letter-spacing: -0.01em;
      }

      .card-subtitle {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        margin-top: 1px;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }

      .metric-box {
        background-color: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .metric-label-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .metric-label {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--wit-text-tertiary);
      }

      .metric-val {
        font-size: 26px;
        font-weight: 600;
        color: var(--wit-text-primary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
        letter-spacing: -0.02em;
        line-height: 1.1;
      }

      .metric-sub {
        font-size: 11px;
        color: var(--wit-text-secondary);
        font-feature-settings: "tnum" 1;
        font-variant-numeric: tabular-nums;
      }

      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11px;
        color: var(--wit-text-secondary);
        border-top: 1px solid var(--wit-border-subtle);
        padding-top: 12px;
      }

      .air-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        color: var(--wit-success);
        font-weight: 600;
      }
    `
  ];

  render() {
    const states = this.hass?.states || {};
    const climate = states["climate.termostato_salon"];
    const weather = states["weather.showroom"];

    const currentTemp = climate?.attributes.current_temperature ?? 21.5;
    const targetTemp = climate?.attributes.temperature ?? 22.0;
    const humidity = climate?.attributes.current_humidity ?? 48;
    const extTemp = weather?.attributes.temperature ?? 22.4;

    return html`
      <wit-surface level="1" style="height: 100%;">
        <div class="card-inner">
          <div class="card-header">
            <div class="title-group">
              <div class="icon-box">
                ${renderIcon("thermometer", { size: 20 })}
              </div>
              <div>
                <div class="card-title">Clima & Confort</div>
                <div class="card-subtitle">HVAC Daikin VRV Integrado • Salón</div>
              </div>
            </div>
            <wit-status-pill status="online" label="Calefacción"></wit-status-pill>
          </div>

          <div class="metrics-grid">
            <div class="metric-box">
              <div class="metric-label-row">
                <span class="metric-label">Interior Salón</span>
                ${renderIcon("flame", { size: 13, color: "var(--wit-accent)" })}
              </div>
              <div class="metric-val">${currentTemp}°C</div>
              <div class="metric-sub">Objetivo ${targetTemp}°C</div>
            </div>

            <div class="metric-box">
              <div class="metric-label-row">
                <span class="metric-label">Exterior & Aire</span>
                ${renderIcon("sun", { size: 13, color: "var(--wit-warning)" })}
              </div>
              <div class="metric-val">${extTemp}°C</div>
              <div class="metric-sub">Humedad ${humidity}% • Soleado</div>
            </div>
          </div>

          <div class="card-footer">
            <span class="air-badge">
              ${renderIcon("check", { size: 13, strokeWidth: 2.5 })} Aire Óptimo (CO₂ 420 ppm)
            </span>
            <span class="tnum" style="color: var(--wit-text-tertiary);">Suelo radiante 35%</span>
          </div>
        </div>
      </wit-surface>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-weather-summary": WitWeatherSummary;
  }
}
