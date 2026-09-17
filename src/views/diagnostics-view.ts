import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/surface.js";
import "../design-system/primitives/button.js";
import "../design-system/primitives/status-pill.js";
import type { HomeAssistant } from "../types/home-assistant.js";

@customElement("wit-diagnostics-view")
export class WitDiagnosticsView extends LitElement {
  @property({ type: Object })
  hass?: HomeAssistant;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        width: 100%;
        max-width: 1440px;
        margin: 0 auto;
        padding-bottom: 96px;
      }

      .diag-header {
        margin-bottom: 24px;
      }

      .page-title {
        font-size: var(--wit-type-hero-size, 36px);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--wit-text-primary);
      }

      .page-desc {
        font-size: var(--wit-type-body-size, 14px);
        color: var(--wit-text-secondary);
        margin-top: 4px;
      }

      .telemetry-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px;
        margin-bottom: 24px;
      }

      .telemetry-card {
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .telemetry-title {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--wit-text-tertiary);
      }

      .telemetry-val {
        font-size: 16px;
        font-weight: 600;
        color: var(--wit-text-primary);
        margin-top: 2px;
      }

      .entity-table-card {
        padding: 24px;
      }

      .table-title {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 700;
        margin-bottom: 16px;
        color: var(--wit-text-primary);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }

      th {
        text-align: left;
        padding: 10px 14px;
        border-bottom: 1px solid var(--wit-border-medium);
        color: var(--wit-text-tertiary);
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      td {
        padding: 12px 14px;
        border-bottom: 1px solid var(--wit-border-subtle);
        color: var(--wit-text-primary);
      }

      tr:hover td {
        background-color: var(--wit-surface-interactive);
      }

      .entity-id-cell {
        font-family: monospace;
        color: var(--wit-text-secondary);
      }

      .state-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 11px;
        background: var(--wit-surface-interactive);
      }

      .state-on {
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
      }
      .state-playing {
        background: var(--wit-success-muted);
        color: var(--wit-success);
      }
    `
  ];

  render() {
    const states = this.hass?.states || {};
    const entityList = Object.values(states);

    return html`
      <div>
        <div class="diag-header">
          <h1 class="page-title">Diagnóstico del Sistema & Telemetría</h1>
          <div class="page-desc">Supervisión técnica de entidades Home Assistant, buses KNX/DALI y latencias de red.</div>
        </div>

        <div class="telemetry-grid">
          <wit-surface level="1" class="telemetry-card">
            <div>
              <div class="telemetry-title">Estado de Pasarela</div>
              <div class="telemetry-val">KNX IP Router v3.2</div>
            </div>
            <wit-status-pill status="online" label="OK"></wit-status-pill>
          </wit-surface>

          <wit-surface level="1" class="telemetry-card">
            <div>
              <div class="telemetry-title">Total Entidades Activas</div>
              <div class="telemetry-val tnum">${entityList.length} sincronizadas</div>
            </div>
            <wit-status-pill status="accent" label="HA Link"></wit-status-pill>
          </wit-surface>

          <wit-surface level="1" class="telemetry-card">
            <div>
              <div class="telemetry-title">Latencia de Bus</div>
              <div class="telemetry-val tnum">4.2 ms (Local LAN)</div>
            </div>
            <wit-status-pill status="online" label="Óptimo"></wit-status-pill>
          </wit-surface>

          <wit-surface level="1" class="telemetry-card">
            <div>
              <div class="telemetry-title">Uptime Servidor</div>
              <div class="telemetry-val tnum">14 días, 8 horas</div>
            </div>
            <wit-status-pill status="idle" label="99.98%"></wit-status-pill>
          </wit-surface>
        </div>

        <wit-surface level="1" class="entity-table-card">
          <div class="table-title">Registro en Tiempo Real de Entidades</div>
          <table>
            <thead>
              <tr>
                <th>Entidad (entity_id)</th>
                <th>Nombre Amigable</th>
                <th>Estado Actual</th>
                <th>Última Actualización</th>
              </tr>
            </thead>
            <tbody>
              ${entityList.map((e) => {
                const isHighlight = e.state === "on" || e.state === "playing";
                return html`
                  <tr>
                    <td class="entity-id-cell">${e.entity_id}</td>
                    <td>${e.attributes.friendly_name || "—"}</td>
                    <td>
                      <span class="state-badge ${isHighlight ? `state-${e.state}` : ""}">
                        ${e.state} ${e.attributes.unit_of_measurement || ""}
                      </span>
                    </td>
                    <td class="tnum" style="color: var(--wit-text-tertiary); font-size: 11px;">
                      ${new Date(e.last_updated).toLocaleTimeString("es-ES")}
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        </wit-surface>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-diagnostics-view": WitDiagnosticsView;
  }
}
