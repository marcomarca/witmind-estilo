import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sharedStyles } from "../design-system/styles.js";
import "../design-system/primitives/index.js";
import "../visualization/wit-chart.js";
import { renderIcon } from "../utilities/icon.js";

@customElement("wit-ui-lab")
export class WitUiLab extends LitElement {
  @property({ type: String, reflect: true })
  theme: "dark" | "light" = "dark";

  @state()
  private _sheetOpen: boolean = false;

  @state()
  private _activePeriod: string = "Día";

  @state()
  private _demoSwitch: boolean = true;

  @state()
  private _gaugeVal: number = 42;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        min-height: 100vh;
        background-color: var(--wit-canvas);
        color: var(--wit-text-primary);
        padding: 32px 40px 80px;
        box-sizing: border-box;
      }

      .lab-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        padding-bottom: 24px;
        border-bottom: 1px solid var(--wit-border-medium);
      }

      .lab-title-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .lab-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-accent);
        padding: 4px 10px;
        border-radius: var(--wit-radius-pill);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.05em;
        width: fit-content;
      }

      .lab-title {
        font-size: var(--wit-type-hero-size, 36px);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--wit-text-primary);
      }

      .lab-subtitle {
        font-size: var(--wit-type-body-size, 14px);
        color: var(--wit-text-secondary);
      }

      .theme-switch-bar {
        display: flex;
        align-items: center;
        gap: 12px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        padding: 6px 14px;
        border-radius: var(--wit-radius-control, 14px);
      }

      .section {
        margin-bottom: 48px;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }

      .section-icon {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .section-title {
        font-size: var(--wit-type-title-size, 18px);
        font-weight: 700;
        letter-spacing: -0.01em;
        color: var(--wit-text-primary);
      }

      .section-desc {
        font-size: 12px;
        color: var(--wit-text-tertiary);
      }

      .grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 20px;
      }

      .grid-3 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }

      .grid-4 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 16px;
      }

      .card-box {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .type-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 14px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .type-meta-info {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-family: monospace;
      }

      .state-row {
        display: flex;
        align-items: center;
        gap: 14px;
        flex-wrap: wrap;
      }

      .chart-card {
        min-height: 220px;
        height: 220px;
        padding: 18px;
      }

      .slider-control {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 12px;
        color: var(--wit-text-secondary);
        background: var(--wit-surface-interactive);
        padding: 10px 16px;
        border-radius: var(--wit-radius-control, 14px);
        border: 1px solid var(--wit-border-interactive);
      }

      .slider-control input[type="range"] {
        accent-color: var(--wit-accent);
        flex: 1;
      }
    `
  ];

  private _toggleTheme() {
    this.theme = this.theme === "dark" ? "light" : "dark";
    this.requestUpdate();
  }

  render() {
    const isDark = this.theme === "dark";

    return html`
      <!-- Laboratory Header -->
      <div class="lab-header">
        <div class="lab-title-group">
          <div class="lab-badge">
            ${renderIcon("sparkles", { size: 14 })} WITMIND SIGNATURE UI SYSTEM
          </div>
          <h1 class="lab-title">Component Laboratory & Design System</h1>
          <p class="lab-subtitle">
            Living architectural platform reference: tokens, typography, primitives, interactive states, and ECharts visualizations.
          </p>
        </div>

        <div class="theme-switch-bar">
          <span style="font-size: 12px; font-weight: 600;">
            ${isDark ? "🌙 Petroleum Dark" : "☀️ Porcelain Light"}
          </span>
          <wit-button
            variant="secondary"
            size="sm"
            @click=${this._toggleTheme}
            icon=${isDark ? "sun" : "moon"}
          >
            Cambiar a ${isDark ? "Claro" : "Oscuro"}
          </wit-button>
        </div>
      </div>

      <!-- SECTION 1: TYPOGRAPHIC SYSTEM -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">${renderIcon("layers", { size: 18 })}</div>
          <div>
            <div class="section-title">1. Typographic Hierarchy (Manrope Variable)</div>
            <div class="section-desc">Single typographic family with tabular numerals for all telemetry data.</div>
          </div>
        </div>

        <wit-surface level="1" class="card-box">
          <div class="type-row">
            <div>
              <div class="wit-type-display">56.4 kW</div>
              <div class="wit-type-label">Display Style</div>
            </div>
            <div class="type-meta-info">56px / 1.0 • 700 • tabular-nums</div>
          </div>

          <div class="type-row">
            <div>
              <div class="wit-type-hero">Witmind Signature OS</div>
              <div class="wit-type-label">Hero Style</div>
            </div>
            <div class="type-meta-info">36px / 1.08 • 600</div>
          </div>

          <div class="type-row">
            <div>
              <div class="wit-type-kpi">26.11 kWh • 21.4°C</div>
              <div class="wit-type-label">KPI Metric Style</div>
            </div>
            <div class="type-meta-info">32px / 1.05 • 600 • tabular-nums</div>
          </div>

          <div class="type-row">
            <div>
              <div class="wit-type-title">Lighting & Climate Distribution</div>
              <div class="wit-type-label">Card Title Style</div>
            </div>
            <div class="type-meta-info">18px / 1.2 • 600</div>
          </div>

          <div class="type-row">
            <div>
              <div class="wit-type-body">
                Premium architectural automation system for Savant and Crestron residential installations.
              </div>
              <div class="wit-type-label">Body Text Style</div>
            </div>
            <div class="type-meta-info">14px / 1.45 • 400</div>
          </div>

          <div class="type-row">
            <div>
              <div class="wit-type-label">SYSTEM TELEMETRY METRIC</div>
            </div>
            <div class="type-meta-info">12px / 1.35 • 600 • Uppercase</div>
          </div>

          <div class="type-row" style="border: none;">
            <div>
              <div class="wit-type-meta">LAST SYNC: 14:48:22 • HA PROD CLUSTER</div>
            </div>
            <div class="type-meta-info">11px / 1.35 • 600 • tabular-nums</div>
          </div>
        </wit-surface>
      </div>

      <!-- SECTION 2: COLOR SYSTEM & SURFACES -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">${renderIcon("grid", { size: 18 })}</div>
          <div>
            <div class="section-title">2. Color Semantics & Depth Surfaces</div>
            <div class="section-desc">Architectural palette: Level 0 (Canvas), Level 1 (Card), Level 2 (Raised/Dock).</div>
          </div>
        </div>

        <div class="grid-3">
          <wit-surface level="0" class="card-box" style="border: 1px solid var(--wit-border-medium); padding: 20px;">
            <div class="wit-type-title">Level 0: Canvas</div>
            <div class="wit-type-body" style="color: var(--wit-text-secondary)">
              The calm, deep floor: <code>var(--wit-canvas)</code>
            </div>
            <wit-status-pill status="idle" label="Deep Floor"></wit-status-pill>
          </wit-surface>

          <wit-surface level="1" class="card-box" style="padding: 20px;">
            <div class="wit-type-title">Level 1: Content Surface</div>
            <div class="wit-type-body" style="color: var(--wit-text-secondary)">
              Opaque, peaceful cards: <code>var(--wit-surface)</code>
            </div>
            <wit-status-pill status="accent" label="Card Standard"></wit-status-pill>
          </wit-surface>

          <wit-surface level="2" class="card-box" style="padding: 20px;">
            <div class="wit-type-title">Level 2: Floating / Dock</div>
            <div class="wit-type-body" style="color: var(--wit-text-secondary)">
              Elevated frosted depth: <code>var(--wit-surface-raised)</code>
            </div>
            <wit-status-pill status="online" label="Elevated"></wit-status-pill>
          </wit-surface>
        </div>
      </div>

      <!-- SECTION 3: UI PRIMITIVES & INTERACTION STATES -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">${renderIcon("sliders", { size: 18 })}</div>
          <div>
            <div class="section-title">3. Core UI Primitives & State Grammar</div>
            <div class="section-desc">Buttons, Icon Buttons, Switches, Segmented Controls, Status Pills, and KPI Stats.</div>
          </div>
        </div>

        <div class="grid-2">
          <!-- Buttons & States -->
          <wit-surface level="1" class="card-box">
            <div class="wit-type-title">Button Variants & Sizes</div>
            <div class="state-row">
              <wit-button variant="primary" icon="zap">Activar Escena</wit-button>
              <wit-button variant="secondary" icon="sliders">Ajustes</wit-button>
              <wit-button variant="ghost" icon="refresh-cw">Reset</wit-button>
              <wit-button variant="danger" icon="power">Apagar Todo</wit-button>
            </div>
            <div class="state-row">
              <wit-button size="sm">Small (36px)</wit-button>
              <wit-button size="md">Medium (44px)</wit-button>
              <wit-button size="lg">Large (48px Touch)</wit-button>
              <wit-button variant="secondary" pending>Cargando</wit-button>
              <wit-button variant="secondary" disabled>Desactivado</wit-button>
            </div>
          </wit-surface>

          <!-- Icon Buttons & Switches -->
          <wit-surface level="1" class="card-box">
            <div class="wit-type-title">Touch Targets & Switches (≥44px)</div>
            <div class="state-row">
              <wit-icon-button icon="power" variant="default" label="Power"></wit-icon-button>
              <wit-icon-button icon="lightbulb" variant="primary" label="Luces" active></wit-icon-button>
              <wit-icon-button icon="music" variant="glass" label="Música"></wit-icon-button>
              <wit-icon-button icon="settings" variant="ghost" label="Ajustes"></wit-icon-button>
              <wit-icon-button icon="power" disabled label="Disabled"></wit-icon-button>
            </div>

            <div class="state-row" style="margin-top: 8px;">
              <wit-switch
                ?checked=${this._demoSwitch}
                label="Automatización Nocturna"
                @change=${(e: CustomEvent) => this._demoSwitch = e.detail.checked}
              ></wit-switch>
              <wit-switch checked disabled label="Bloqueado"></wit-switch>
            </div>

            <div style="margin-top: 8px;">
              <wit-segmented-control
                .options=${["Día", "Semana", "Mes", "Año"]}
                .value=${this._activePeriod}
                @change=${(e: CustomEvent) => this._activePeriod = e.detail.value}
              ></wit-segmented-control>
            </div>
          </wit-surface>

          <!-- Status Pills -->
          <wit-surface level="1" class="card-box">
            <div class="wit-type-title">Status Pills & Semantic States</div>
            <div class="state-row">
              <wit-status-pill status="online" label="Online / Normal" pulse></wit-status-pill>
              <wit-status-pill status="accent" label="Witmind Activo"></wit-status-pill>
              <wit-status-pill status="warning" label="Carga Elevada"></wit-status-pill>
              <wit-status-pill status="danger" label="Sobrecarga Crítica"></wit-status-pill>
              <wit-status-pill status="offline" label="Desconectado"></wit-status-pill>
            </div>
          </wit-surface>

          <!-- KPI Stats -->
          <wit-surface level="1" class="card-box">
            <div class="wit-type-title">KPI Stat Displays (Tabular Numbers)</div>
            <div class="grid-2">
              <wit-stat
                label="POTENCIA TOTAL"
                value="432"
                unit="W"
                secondary="26.11 kWh hoy"
                trend="+3.2%"
                trendDirection="up"
                icon="zap"
              ></wit-stat>
              <wit-stat
                label="CLIMA SALÓN"
                value="21.5"
                unit="°C"
                secondary="Humedad 48%"
                trend="-0.4°C"
                trendDirection="down"
                icon="thermometer"
              ></wit-stat>
            </div>
          </wit-surface>
        </div>
      </div>

      <!-- SECTION 4: VISUALIZATION LAYER (ECHARTS + WITVIZ) -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">${renderIcon("gauge", { size: 18 })}</div>
          <div>
            <div class="section-title">4. Visualization Layer (WitViz + ECharts)</div>
            <div class="section-desc">Architectural Semicircular Gauge (210° to -30°), Context Sparkline, Comparative Energy Bars, and Analytics Area Chart.</div>
          </div>
        </div>

        <!-- Gauge live control -->
        <div style="margin-bottom: 16px; max-width: 440px;">
          <div class="slider-control">
            <span>Simular Carga Eléctrica:</span>
            <input
              type="range"
              min="0"
              max="100"
              .value=${this._gaugeVal}
              @input=${(e: any) => this._gaugeVal = Number(e.target.value)}
            />
            <strong style="color: var(--wit-text-primary); width: 40px; text-align: right;" class="tnum">${this._gaugeVal}%</strong>
          </div>
        </div>

        <div class="grid-4">
          <!-- Preset 1: Semicircular Architectural Gauge -->
          <wit-surface level="1" class="chart-card">
            <div class="wit-type-label" style="margin-bottom: 8px;">CARGA ELÉCTRICA</div>
            <div style="height: 160px;">
              <wit-chart
                type="gauge"
                .config=${{
                  value: this._gaugeVal,
                  valueLabel: `${this._gaugeVal}%`,
                  secondaryLabel: `${Math.round(this._gaugeVal * 12.5)} W`,
                  theme: this.theme
                }}
              ></wit-chart>
            </div>
          </wit-surface>

          <!-- Preset 2: Contextual Sparkline -->
          <wit-surface level="1" class="chart-card">
            <div class="wit-type-label" style="margin-bottom: 8px;">TENDENCIA SOLAR</div>
            <div class="wit-type-kpi" style="margin-bottom: 12px;">3,420 W</div>
            <div style="height: 80px;">
              <wit-chart
                type="sparkline"
                .config=${{
                  data: [120, 240, 480, 920, 1800, 2400, 3100, 3420, 3200, 3420],
                  tone: "accent"
                }}
              ></wit-chart>
            </div>
          </wit-surface>

          <!-- Preset 3: Comparative Energy Bars -->
          <wit-surface level="1" class="chart-card">
            <div class="wit-type-label" style="margin-bottom: 8px;">HISTÓRICO 7 DÍAS (kWh)</div>
            <div style="height: 160px;">
              <wit-chart
                type="energyBars"
                .config=${{
                  data: [
                    { label: "Lun", value: 18.4 },
                    { label: "Mar", value: 22.1 },
                    { label: "Mié", value: 19.8 },
                    { label: "Jue", value: 25.4 },
                    { label: "Vie", value: 21.0 },
                    { label: "Sáb", value: 28.6 },
                    { label: "Dom", value: 26.1 }
                  ],
                  currentIndex: 6,
                  theme: this.theme
                }}
              ></wit-chart>
            </div>
          </wit-surface>

          <!-- Preset 4: Analytical Area Trend -->
          <wit-surface level="1" class="chart-card">
            <div class="wit-type-label" style="margin-bottom: 8px;">RED vs SOLAR (24h)</div>
            <div style="height: 160px;">
              <wit-chart
                type="areaTrend"
                .config=${{
                  categories: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
                  series: [
                    { name: "Solar", data: [0, 0, 450, 3200, 2100, 120] },
                    { name: "Red", data: [650, 420, 380, 100, 400, 980] }
                  ],
                  unit: "W",
                  theme: this.theme
                }}
              ></wit-chart>
            </div>
          </wit-surface>
        </div>
      </div>

      <!-- SECTION 5: MODAL SHEETS & EMPTY STATES -->
      <div class="section">
        <div class="section-header">
          <div class="section-icon">${renderIcon("maximize", { size: 18 })}</div>
          <div>
            <div class="section-title">5. Depth Sheets & Empty States</div>
            <div class="section-desc">Depth transitions and graceful offline/unavailable fallbacks.</div>
          </div>
        </div>

        <div class="grid-2">
          <wit-surface level="1" class="card-box">
            <div class="wit-type-title">Depth Sheet Modal</div>
            <div class="wit-type-body" style="color: var(--wit-text-secondary)">
              Sheets provide progressive disclosure without cluttering the primary Home overview.
            </div>
            <div>
              <wit-button
                variant="primary"
                icon="sliders"
                @click=${() => this._sheetOpen = true}
              >
                Abrir Sheet de Ejemplo
              </wit-button>
            </div>
          </wit-surface>

          <wit-empty-state
            type="unavailable"
            heading="Dispositivo No Disponible"
            message="El sensor KNX del jardín exterior no responde a la pasarela principal."
          >
            <wit-button size="sm" variant="secondary" icon="refresh-cw" style="margin-top: 12px;">
              Reintentar Conexión
            </wit-button>
          </wit-empty-state>
        </div>
      </div>

      <!-- Demo Sheet -->
      <wit-sheet
        ?open=${this._sheetOpen}
        heading="Ajustes de Iluminación — Salón"
        subtitle="Control Circuito DALI Principal"
        icon="lightbulb"
        @close=${() => this._sheetOpen = false}
      >
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="wit-type-body">
            Control de intensidad y temperatura de color para las luminarias arquitectónicas integradas.
          </div>
          <wit-stat label="ESTADO ACTUAL" value="85" unit="%" secondary="Temperatura 3000K"></wit-stat>
          <div class="state-row">
            <wit-button variant="primary" icon="sun">Modo Confort</wit-button>
            <wit-button variant="secondary" icon="moon">Modo Cine</wit-button>
            <wit-button variant="ghost" icon="power">Apagar</wit-button>
          </div>
        </div>
      </wit-sheet>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "wit-ui-lab": WitUiLab;
  }
}
