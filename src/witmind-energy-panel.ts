import type { WitmindEntity } from "./ha/WitmindHaClient.js";
import { buildDimmingCurve, buildEnergyReport, normalizeHistoryResponse, type EnergyCircuit, type EnergyReport } from "./energy-model.js";

type HassLike = {
  states?: Record<string, WitmindEntity>;
  connection?: { sendMessagePromise?: (message: Record<string, unknown>) => Promise<unknown> };
};

type EnergyRange = "day" | "week" | "month";

const CIRCUITS: EnergyCircuit[] = [
  { entity: "switch.interruptor_inteligente_switch_1", name: "Spots ventana", zone: "showroom", zoneLabel: "Showroom", watts: 100 },
  { entity: "switch.interruptor_inteligente_switch_2", name: "Spots 2x3", zone: "showroom", zoneLabel: "Showroom", watts: 120 },
  { entity: "switch.interruptor_inteligente_switch_3", name: "Spots 3x3", zone: "showroom", zoneLabel: "Showroom", watts: 180 },
  { entity: "switch.interruptor_inteligente_switch_4", name: "Spots TV", zone: "showroom", zoneLabel: "Showroom", watts: 25 },
  { entity: "switch.interruptor_inteligente_2_switch_1", name: "Paneles 3k/6k", zone: "showroom", zoneLabel: "Showroom", watts: 96 },
  { entity: "switch.interruptor_inteligente_2_switch_2", name: "Colgantes", zone: "showroom", zoneLabel: "Showroom", watts: 10 },
  { entity: "switch.interruptor_inteligente_2_switch_3", name: "Slims", zone: "showroom", zoneLabel: "Showroom", watts: 432 },
  { entity: "switch.interruptor_inteligente_2_switch_4", name: "Downlights", zone: "showroom", zoneLabel: "Showroom", watts: 144 },
  { entity: "switch.smart_relay_switch_4_switch", name: "Paneles", zone: "showroom", zoneLabel: "Showroom", watts: 288 },
  { entity: "switch.smart_relay_switch_3_switch", name: "Reflector exterior", zone: "showroom", zoneLabel: "Showroom", watts: null },
  { entity: "switch.interruptor_inteligente_3_switch_1", name: "Central colgante", zone: "lobby", zoneLabel: "Lobby", watts: null },
  { entity: "switch.interruptor_inteligente_3_switch_2", name: "Spots 5W decorativos", zone: "lobby", zoneLabel: "Lobby", watts: null },
  { entity: "switch.interruptor_inteligente_3_switch_3", name: "Tira LED", zone: "lobby", zoneLabel: "Lobby", watts: null },
  { entity: "switch.interruptor_inteligente_3_switch_4", name: "Spots 10W", zone: "lobby", zoneLabel: "Lobby", watts: null },
  { entity: "switch.oficina_gerencial_interruptor_1", name: "Witronix LED", zone: "offices", zoneLabel: "Oficinas", watts: 48 },
  { entity: "switch.oficina_mindtec_interruptor_1", name: "Mindtec", zone: "offices", zoneLabel: "Oficinas", watts: 48 },
  { entity: "switch.oficina_grande_interruptor_1", name: "Oficina grande 1", zone: "offices", zoneLabel: "Oficinas", watts: 168 },
  { entity: "switch.oficina_grande_interruptor_2", name: "Oficina grande 2", zone: "offices", zoneLabel: "Oficinas", watts: 168 },
  { entity: "switch.b2_gang_interruptor_1", name: "Multifuncional", zone: "offices", zoneLabel: "Oficinas", watts: 96 },
  { entity: "switch.b2_gang_interruptor_2", name: "Pasillos", zone: "offices", zoneLabel: "Oficinas", watts: 117 },
  { entity: "switch.taller_interruptor_1", name: "Taller", zone: "offices", zoneLabel: "Oficinas", watts: 144 },
  { entity: "switch.4gang_switch_sala_grabacion_interruptor_1", name: "Tira LED", zone: "recording", zoneLabel: "Grabación", watts: 24 },
  { entity: "switch.4gang_switch_sala_grabacion_interruptor_2", name: "Paneles", zone: "recording", zoneLabel: "Grabación", watts: 96 },
  { entity: "switch.4gang_switch_sala_grabacion_interruptor_3", name: "Spots", zone: "recording", zoneLabel: "Grabación", watts: 50 },
  { entity: "switch.4gang_switch_sala_grabacion_interruptor_4", name: "Otras luces", zone: "recording", zoneLabel: "Grabación", watts: 30 },
];

const ZONES = [
  { id: "showroom", label: "Showroom", opacity: 1 },
  { id: "offices", label: "Oficinas", opacity: .74 },
  { id: "recording", label: "Grabación", opacity: .50 },
  { id: "lobby", label: "Lobby", opacity: .28 },
];

const MENU_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`;
const ENERGY_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"></path></svg>`;
const THEME_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;

class WitmindEnergyPanel extends HTMLElement {
  private _hass: HassLike | null = null;
  private _panel: Record<string, unknown> = {};
  private _range: EnergyRange = "day";
  private _report: EnergyReport | null = null;
  private _loading = false;
  private _error = "";
  private _requestId = 0;
  private _dimming = 30;
  private _theme: "dark" | "light" = this._loadTheme();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.addEventListener("click", (event) => this._handleClick(event));
    this.shadowRoot!.addEventListener("input", (event) => this._handleInput(event));
  }

  set hass(value: HassLike | null) {
    const firstConnection = !this._hass?.connection?.sendMessagePromise && Boolean(value?.connection?.sendMessagePromise);
    this._hass = value;
    if (!this.isConnected) return;
    if (!this.shadowRoot?.querySelector(".energy-panel")) this._render();
    else this._updateLiveMetrics();
    if (firstConnection || (!this._report && !this._loading && value?.connection?.sendMessagePromise)) void this._loadHistory();
  }
  get hass() { return this._hass; }

  set panel(value: Record<string, unknown>) {
    this._panel = value || {};
    this._report = null;
    if (this.isConnected) {
      this._render();
      if (this._hass) void this._loadHistory();
    }
  }
  get panel() { return this._panel; }

  set theme(value: string) {
    if (value !== "dark" && value !== "light") return;
    const changed = this._theme !== value;
    this._theme = value;
    this.setAttribute("data-theme", value);
    this._saveTheme();
    if (changed && this.isConnected) this._render();
  }
  get theme() { return this._theme; }

  connectedCallback() {
    this.setAttribute("data-theme", this._theme);
    this._render();
    if (this._hass && !this._report) void this._loadHistory();
  }

  disconnectedCallback() { this._requestId += 1; }

  private _loadTheme(): "dark" | "light" { try { return localStorage.getItem("witmind-showroom-panel-theme") === "light" ? "light" : "dark"; } catch (_) { return "dark"; } }
  private _saveTheme() { try { localStorage.setItem("witmind-showroom-panel-theme", this._theme); } catch (_) { /* optional */ } }
  private _escape(value: unknown) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  private _formatEnergy(value: number) { return new Intl.NumberFormat("es-BO", { minimumFractionDigits: value < 10 ? 2 : 1, maximumFractionDigits: value < 10 ? 2 : 1 }).format(value); }
  private _formatPower(value: number) { return value >= 1000 ? `${new Intl.NumberFormat("es-BO", { maximumFractionDigits: 2 }).format(value / 1000)} kW` : `${Math.round(value)} W`; }

  private _circuits(): EnergyCircuit[] {
    const configured = this._panel.energy_circuits ?? this._panel.energyCircuits;
    if (!Array.isArray(configured)) return CIRCUITS;
    const overrides = new Map(configured.filter((item) => item && typeof item === "object").map((item) => [String((item as Record<string, unknown>).entity || ""), item as Record<string, unknown>]));
    return CIRCUITS.map((circuit) => {
      const override = overrides.get(circuit.entity);
      if (!override) return circuit;
      const rawWatts = override.watts;
      const numeric = Number(rawWatts);
      const watts = rawWatts === null ? null : Number.isFinite(numeric) && numeric >= 0 ? numeric : circuit.watts;
      return { ...circuit, ...override, watts } as EnergyCircuit;
    });
  }

  private _definition() {
    const end = Date.now();
    if (this._range === "week") return { start: end - 7 * 86_400_000, end, bucketMs: 86_400_000, title: "Últimos 7 días", bucketLabel: "día" };
    if (this._range === "month") return { start: end - 30 * 86_400_000, end, bucketMs: 86_400_000, title: "Últimos 30 días", bucketLabel: "día" };
    return { start: end - 24 * 3_600_000, end, bucketMs: 3_600_000, title: "Últimas 24 horas", bucketLabel: "hora" };
  }

  private async _loadHistory() {
    const send = this._hass?.connection?.sendMessagePromise;
    if (!send || this._loading) return;
    const requestId = ++this._requestId;
    const definition = this._definition();
    this._loading = true;
    this._error = "";
    this._render();
    try {
      const raw = await send({
        type: "history/history_during_period",
        start_time: new Date(definition.start).toISOString(),
        end_time: new Date(definition.end).toISOString(),
        entity_ids: this._circuits().map((circuit) => circuit.entity),
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: true,
      });
      if (requestId !== this._requestId) return;
      this._report = buildEnergyReport(this._circuits(), normalizeHistoryResponse(raw), definition.start, definition.end, definition.bucketMs);
    } catch (error) {
      if (requestId !== this._requestId) return;
      this._error = error instanceof Error ? error.message : "No se pudo cargar el historial";
      this._report = null;
    } finally {
      if (requestId === this._requestId) {
        this._loading = false;
        this._render();
      }
    }
  }

  private _currentPower() { return this._circuits().reduce((sum, circuit) => sum + (circuit.watts !== null && this._hass?.states?.[circuit.entity]?.state === "on" ? circuit.watts : 0), 0); }
  private _activeCount() { return this._circuits().filter((circuit) => this._hass?.states?.[circuit.entity]?.state === "on").length; }
  private _installedPower() { return this._circuits().reduce((sum, circuit) => sum + (circuit.watts || 0), 0); }

  private _updateLiveMetrics() {
    const active = this.shadowRoot?.querySelector("[data-live-active]");
    const power = this.shadowRoot?.querySelector("[data-live-power]");
    if (active) active.textContent = `${this._activeCount()} de ${this._circuits().length}`;
    if (power) power.textContent = this._formatPower(this._currentPower());
  }

  private _handleClick(event: Event) {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    if (action === "toggle-menu") this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
    if (action === "toggle-theme") {
      this.theme = this._theme === "dark" ? "light" : "dark";
      this.dispatchEvent(new CustomEvent("witmind-theme-change", { detail: { theme: this._theme }, bubbles: true, composed: true }));
    }
    if (action === "range") {
      const range = target.dataset.range;
      if (range === "day" || range === "week" || range === "month") {
        this._range = range;
        this._report = null;
        void this._loadHistory();
      }
    }
    if (action === "refresh") void this._loadHistory();
  }

  private _handleInput(event: Event) {
    const input = (event.target as HTMLElement).closest<HTMLInputElement>("[data-dimming]");
    if (!input) return;
    this._dimming = Math.min(90, Math.max(10, Number(input.value) || 10));
    this._updateDimmingPresentation();
  }

  private _updateDimmingPresentation() {
    if (!this._report) return;
    const saved = this._report.totalKwh * (this._dimming / 100);
    const remaining = Math.max(0, this._report.totalKwh - saved);
    const percent = this.shadowRoot?.querySelector("[data-dim-percent]");
    const savedNode = this.shadowRoot?.querySelector("[data-dim-saved]");
    const remainingNode = this.shadowRoot?.querySelector("[data-dim-remaining]");
    if (percent) percent.textContent = `${this._dimming} %`;
    if (savedNode) savedNode.textContent = `${this._formatEnergy(saved)} kWh`;
    if (remainingNode) remainingNode.textContent = `${this._formatEnergy(remaining)} kWh`;
    this.shadowRoot?.querySelectorAll<HTMLElement>("[data-dim-point]").forEach((point) => point.classList.toggle("is-selected", Number(point.dataset.dimPoint) === this._dimming));
  }

  private _bucketLabel(timestamp: number, index: number) {
    const date = new Date(timestamp);
    if (this._range === "day") return index % 3 === 0 ? new Intl.DateTimeFormat("es-BO", { hour: "2-digit", minute: "2-digit", timeZone: "America/La_Paz" }).format(date) : "";
    return index % (this._range === "month" ? 4 : 1) === 0 ? new Intl.DateTimeFormat("es-BO", { day: "2-digit", month: "short", timeZone: "America/La_Paz" }).format(date) : "";
  }

  private _renderZoneChart(report: EnergyReport) {
    const width = 960;
    const height = 250;
    const left = 54;
    const top = 16;
    const bottom = 34;
    const chartHeight = height - top - bottom;
    const chartWidth = width - left - 12;
    const max = Math.max(.001, ...report.buckets.map((bucket) => bucket.totalKwh));
    const slot = chartWidth / report.buckets.length;
    const barWidth = Math.max(5, Math.min(34, slot * .66));
    const grid = Array.from({ length: 5 }, (_, index) => {
      const y = top + (chartHeight * index) / 4;
      const value = max * (1 - index / 4);
      return `<line x1="${left}" y1="${y}" x2="${width - 12}" y2="${y}" class="chart-grid"></line><text x="${left - 8}" y="${y + 4}" text-anchor="end" class="chart-label">${this._formatEnergy(value)}</text>`;
    }).join("");
    const bars = report.buckets.map((bucket, index) => {
      let consumedHeight = 0;
      const x = left + slot * index + (slot - barWidth) / 2;
      const stacks = ZONES.map((zone) => {
        const value = bucket.zones[zone.id] || 0;
        const segmentHeight = (value / max) * chartHeight;
        consumedHeight += segmentHeight;
        return `<rect x="${x}" y="${top + chartHeight - consumedHeight}" width="${barWidth}" height="${Math.max(0, segmentHeight)}" rx="3" class="zone-bar" style="opacity:${zone.opacity}"><title>${zone.label}: ${this._formatEnergy(value)} kWh</title></rect>`;
      }).join("");
      const label = this._bucketLabel(bucket.start, index);
      return `${stacks}${label ? `<text x="${x + barWidth / 2}" y="${height - 10}" text-anchor="middle" class="chart-label">${this._escape(label)}</text>` : ""}`;
    }).join("");
    return `<div class="chart-scroll" data-no-swipe><svg class="zone-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Consumo estimado por zona y período">${grid}${bars}</svg></div>`;
  }

  private _renderUsage(report: EnergyReport) {
    const bucketHours = this._definition().bucketMs / 3_600_000;
    return `<div class="usage-list">${report.circuits.map((circuit) => `<div class="usage-row"><div class="usage-name"><strong>${this._escape(circuit.name)}</strong><span>${this._escape(circuit.zoneLabel)} · ${circuit.watts === null ? "Potencia pendiente" : this._formatPower(circuit.watts)}</span></div><div class="usage-cells" style="--usage-columns:${circuit.bucketHours.length}">${circuit.bucketHours.map((hours, index) => `<i style="--usage:${Math.min(1, hours / bucketHours)}" title="${this._escape(this._bucketLabel(report.buckets[index].start, index) || `Intervalo ${index + 1}`)}: ${hours.toFixed(2)} h"></i>`).join("")}</div><div class="usage-value"><strong>${circuit.hours.toFixed(1)} h</strong><span>${circuit.kwh === null ? "Sin kWh" : `${this._formatEnergy(circuit.kwh)} kWh`}</span></div></div>`).join("")}</div>`;
  }

  private _renderDimming(report: EnergyReport) {
    const curve = buildDimmingCurve(report.totalKwh);
    const width = 760;
    const height = 220;
    const left = 48;
    const top = 20;
    const bottom = 34;
    const max = Math.max(.001, curve[curve.length - 1].savedKwh);
    const points = curve.map((point, index) => ({ ...point, x: left + index * ((width - left - 20) / (curve.length - 1)), y: top + (1 - point.savedKwh / max) * (height - top - bottom) }));
    const path = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
    const selected = curve.find((point) => point.percent === this._dimming) || curve[2];
    return `<div class="dimming-layout"><div class="dimming-controls"><label for="building-dimming">Reducción de potencia <strong data-dim-percent>${this._dimming} %</strong></label><input id="building-dimming" data-dimming type="range" min="10" max="90" step="10" value="${this._dimming}" aria-label="Porcentaje de dimerización"><div class="dimming-metrics"><div><small>Ahorro estimado</small><strong data-dim-saved>${this._formatEnergy(selected.savedKwh)} kWh</strong></div><div><small>Consumo restante</small><strong data-dim-remaining>${this._formatEnergy(selected.remainingKwh)} kWh</strong></div></div><p>Modelo lineal sobre circuitos con potencia documentada. No representa una medición física ni confirma compatibilidad eléctrica con dimmers.</p></div><div class="chart-scroll" data-no-swipe><svg class="dimming-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Ahorro estimado por porcentaje de dimerización"><line x1="${left}" y1="${height - bottom}" x2="${width - 20}" y2="${height - bottom}" class="chart-grid"></line><path d="${path}" class="saving-line"></path>${points.map((point) => `<g><circle cx="${point.x}" cy="${point.y}" r="5" class="saving-point ${point.percent === this._dimming ? "is-selected" : ""}" data-dim-point="${point.percent}"><title>${point.percent}%: ${this._formatEnergy(point.savedKwh)} kWh</title></circle><text x="${point.x}" y="${height - 10}" text-anchor="middle" class="chart-label">${point.percent}%</text></g>`).join("")}</svg></div></div>`;
  }

  private _renderReport(report: EnergyReport) {
    const definition = this._definition();
    const peakLabel = this._bucketLabel(report.buckets[report.peakIndex]?.start || definition.start, report.peakIndex) || `Intervalo ${report.peakIndex + 1}`;
    return `<div class="metrics-grid"><article><small>Consumo estimado</small><strong>${this._formatEnergy(report.totalKwh)} kWh</strong><span>${this._escape(definition.title)}</span></article><article><small>Promedio por ${definition.bucketLabel}</small><strong>${this._formatEnergy(report.totalKwh / report.buckets.length)} kWh</strong><span>${report.buckets.length} intervalos</span></article><article><small>Mayor intervalo</small><strong>${this._formatEnergy(report.peakKwh)} kWh</strong><span>${this._escape(peakLabel)}</span></article><article><small>Cobertura nominal</small><strong>${report.knownCircuits} de ${report.totalCircuits}</strong><span>${this._formatPower(this._installedPower())} documentados</span></article></div><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Consumo por zona</span><h2>Historial energético</h2></div><div class="legend">${ZONES.map((zone) => `<span style="--legend-opacity:${zone.opacity}"><i></i>${zone.label}</span>`).join("")}</div></div>${this._renderZoneChart(report)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Uso por iluminación</span><h2>Horas por circuito</h2></div><span class="section-meta">${report.totalCircuits} circuitos</span></div>${this._renderUsage(report)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Escenario de eficiencia</span><h2>Ahorro por dimerización</h2></div><span class="section-meta">10 % a 90 %</span></div>${this._renderDimming(report)}</section>`;
  }

  private _render() {
    if (!this.shadowRoot) return;
    this.setAttribute("data-theme", this._theme);
    const definition = this._definition();
    const now = new Intl.DateTimeFormat("es-BO", { hour: "numeric", minute: "2-digit", timeZone: "America/La_Paz" }).format(new Date());
    const report = this._report;
    this.shadowRoot.innerHTML = `<style>
      :host{--primary:#f26522;--primary-soft:rgba(242,101,34,.12);--primary-border:rgba(242,101,34,.36);--canvas:#071118;--surface:rgba(16,25,30,.88);--surface-control:rgba(27,40,46,.72);--surface-hover:rgba(255,255,255,.07);--text-primary:#f5f6f4;--text-secondary:#adb4b6;--text-tertiary:#747e82;--border:rgba(255,255,255,.1);--border-subtle:rgba(255,255,255,.07);--shadow:rgba(0,0,0,.24);display:block;min-height:100dvh;color:var(--text-primary);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){--canvas:#eef2f1;--surface:rgba(255,255,255,.92);--surface-control:rgba(247,250,250,.96);--surface-hover:#fff;--text-primary:#172129;--text-secondary:#526066;--text-tertiary:#7a868b;--border:rgba(23,33,41,.14);--border-subtle:rgba(23,33,41,.09);--shadow:rgba(50,65,68,.12);background:linear-gradient(155deg,#f5f1ed,#eef2f1 52%,#e8edec)}*{box-sizing:border-box}button,input{font:inherit}.energy-panel{min-height:100dvh}.topbar{position:sticky;top:0;z-index:20;min-height:80px;padding:12px clamp(18px,2.6vw,48px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;border-bottom:1px solid var(--border-subtle);background:color-mix(in srgb,var(--canvas) 88%,transparent);backdrop-filter:blur(18px)}.topbar-start,.topbar-end,.status-strip{display:flex;align-items:center;gap:10px}.topbar-end{justify-content:flex-end}.menu-button,.theme-button,.icon-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--border);border-radius:50%;background:var(--surface-control);color:var(--text-primary);cursor:pointer}.menu-button svg,.theme-button svg,.icon-button svg{width:20px;height:20px}.brand{display:flex;align-items:baseline;gap:10px}.brand strong{font-size:18px;letter-spacing:.06em}.brand span{color:var(--primary);font-size:9px;font-weight:800}.status-pill{min-width:112px;height:52px;padding:7px 14px;display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:999px;background:var(--surface-control)}.status-pill svg{width:18px;height:18px;color:var(--primary)}.status-pill strong,.status-pill small{display:block}.status-pill strong{font-size:11px}.status-pill small{margin-top:2px;color:var(--text-tertiary);font-size:8px}.clock{font-size:28px;font-weight:500;letter-spacing:-.05em}.dashboard{width:min(1540px,100%);margin:auto;padding:clamp(18px,2.4vw,34px);padding-bottom:100px}.workspace-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin:8px 0 18px}.eyebrow{display:block;color:var(--primary);font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.workspace-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em}.workspace-heading p{max-width:650px;margin:7px 0 0;color:var(--text-secondary);font-size:12px;line-height:1.55}.toolbar{display:flex;align-items:center;gap:8px}.range-tabs{display:flex;padding:4px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}.range-tabs button{min-width:70px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--text-secondary);font-size:10px;font-weight:800;cursor:pointer}.range-tabs button.is-active{background:var(--primary);color:#fff;box-shadow:0 5px 16px rgba(242,101,34,.22)}.surface{border:1px solid var(--border-subtle);border-radius:22px;background:var(--surface);box-shadow:0 16px 40px var(--shadow)}.metrics-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.metrics-grid article{min-width:0;padding:15px 17px;border:1px solid var(--border);border-radius:16px;background:var(--surface-control)}.metrics-grid small,.metrics-grid strong,.metrics-grid span{display:block}.metrics-grid small{color:var(--text-tertiary);font-size:9px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.metrics-grid strong{margin-top:6px;font-size:20px;letter-spacing:-.03em}.metrics-grid span{margin-top:4px;color:var(--text-tertiary);font-size:9px}.chart-card{margin-top:12px;padding:20px}.section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}.section-head h2{margin:4px 0 0;font-size:18px;letter-spacing:-.025em}.section-meta{color:var(--text-tertiary);font-size:10px}.legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.legend span{display:flex;align-items:center;gap:5px;color:var(--text-tertiary);font-size:9px}.legend i{width:8px;height:8px;border-radius:3px;background:var(--primary);opacity:var(--legend-opacity)}.chart-scroll{width:100%;overflow-x:auto;overscroll-behavior-x:contain}.zone-chart,.dimming-chart{display:block;width:100%;min-width:720px;height:auto}.chart-grid{stroke:var(--border-subtle);stroke-width:1}.chart-label{fill:var(--text-tertiary);font:600 9px Manrope,sans-serif}.zone-bar{fill:var(--primary)}.usage-list{max-height:590px;display:grid;gap:6px;overflow:auto;padding-right:4px}.usage-row{display:grid;grid-template-columns:minmax(170px,1.1fr) minmax(320px,3fr) 88px;align-items:center;gap:12px;padding:9px 11px;border:1px solid var(--border-subtle);border-radius:13px;background:var(--surface-control)}.usage-name,.usage-value{min-width:0}.usage-name strong,.usage-name span,.usage-value strong,.usage-value span{display:block}.usage-name strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}.usage-name span,.usage-value span{margin-top:3px;color:var(--text-tertiary);font-size:8px}.usage-value{text-align:right}.usage-value strong{font-size:11px}.usage-cells{height:23px;display:grid;grid-template-columns:repeat(var(--usage-columns),minmax(4px,1fr));align-items:stretch;gap:2px}.usage-cells i{border-radius:3px;background:color-mix(in srgb,var(--primary) calc(12% + var(--usage) * 88%),var(--surface-control));box-shadow:inset 0 0 0 1px var(--border-subtle)}.dimming-layout{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(520px,1.6fr);align-items:center;gap:28px}.dimming-controls label{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:11px;font-weight:700}.dimming-controls label strong{color:var(--primary);font-size:20px}.dimming-controls input{width:100%;margin:18px 0;accent-color:var(--primary)}.dimming-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dimming-metrics div{padding:12px;border:1px solid var(--border);border-radius:14px;background:var(--surface-control)}.dimming-metrics small,.dimming-metrics strong{display:block}.dimming-metrics small{color:var(--text-tertiary);font-size:8px;text-transform:uppercase}.dimming-metrics strong{margin-top:5px;font-size:15px}.dimming-controls p{margin:12px 0 0;color:var(--text-tertiary);font-size:9px;line-height:1.5}.saving-line{fill:none;stroke:var(--primary);stroke-width:3}.saving-point{fill:var(--surface);stroke:var(--primary);stroke-width:2;transition:r 160ms,fill 160ms}.saving-point.is-selected{r:8px;fill:var(--primary)}.state-card{min-height:300px;margin-top:12px;display:grid;place-items:center;padding:36px;text-align:center}.state-card strong{display:block;font-size:16px}.state-card span{display:block;max-width:560px;margin-top:8px;color:var(--text-tertiary);font-size:11px;line-height:1.5}.loader{width:34px;height:34px;margin:0 auto 14px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}button:focus-visible,input:focus-visible{outline:2px solid var(--primary);outline-offset:2px}button:active{transform:translateY(1px)}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media(max-width:1100px){.topbar{grid-template-columns:1fr auto}.status-strip{display:none}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dimming-layout{grid-template-columns:1fr}.usage-row{grid-template-columns:minmax(150px,1fr) minmax(280px,2fr) 80px}}@media(max-width:760px){.topbar{min-height:68px;padding:10px 14px}.brand span{display:none}.menu-button,.theme-button{width:44px;height:44px}.clock{font-size:24px}.dashboard{padding:16px 14px 90px}.workspace-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.workspace-heading h1{font-size:26px}.workspace-heading p{max-width:none}.toolbar{justify-content:space-between}.range-tabs{flex:1}.range-tabs button{min-width:0;flex:1}}@media(max-width:700px){.metrics-grid{grid-template-columns:1fr}.chart-card{padding:16px}.section-head{display:grid}.legend{gap:8px}.usage-row{grid-template-columns:1fr 70px}.usage-cells{grid-column:1/-1;grid-row:2}.dimming-metrics{grid-template-columns:1fr}.zone-chart,.dimming-chart{min-width:620px}}
    </style><div class="energy-panel"><header class="topbar"><div class="topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${MENU_ICON}</button><div class="brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="status-strip"><div class="status-pill">${ENERGY_ICON}<span><strong data-live-active>${this._activeCount()} de ${this._circuits().length}</strong><small>Circuitos activos</small></span></div><div class="status-pill">${ENERGY_ICON}<span><strong data-live-power>${this._formatPower(this._currentPower())}</strong><small>Potencia actual</small></span></div><div class="status-pill">${ENERGY_ICON}<span><strong>${this._formatPower(this._installedPower())}</strong><small>Potencia conocida</small></span></div></div><div class="topbar-end"><time class="clock">${this._escape(now)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${THEME_ICON}</button></div></header><main class="dashboard"><section class="workspace-heading"><div><span class="eyebrow">Analítica del edificio</span><h1>Gestión de energía</h1><p>Consumo estimado, horas de uso y escenarios de ahorro para Showroom, Lobby, Oficinas y Sala de grabación.</p></div><div class="toolbar"><div class="range-tabs" role="tablist" aria-label="Período de análisis">${(["day", "week", "month"] as EnergyRange[]).map((range) => `<button data-action="range" data-range="${range}" class="${this._range === range ? "is-active" : ""}" role="tab" aria-selected="${this._range === range}">${range === "day" ? "24 h" : range === "week" ? "7 días" : "30 días"}</button>`).join("")}</div><button class="icon-button" data-action="refresh" aria-label="Actualizar historial" title="Actualizar">${ENERGY_ICON}</button></div></section>${this._loading ? `<section class="surface state-card"><div><div class="loader"></div><strong>Cargando historial energético</strong><span>Consultando ${this._circuits().length} circuitos para ${this._escape(definition.title.toLowerCase())}.</span></div></section>` : this._error ? `<section class="surface state-card"><div><strong>No se pudo cargar el historial</strong><span>${this._escape(this._error)}. Usa Actualizar para volver a intentarlo.</span></div></section>` : report ? this._renderReport(report) : `<section class="surface state-card"><div><strong>Sin datos disponibles</strong><span>Home Assistant todavía no devolvió historial para este período.</span></div></section>`}</main></div>`;
  }
}

if (!customElements.get("witmind-energy-panel")) customElements.define("witmind-energy-panel", WitmindEnergyPanel);

export { WitmindEnergyPanel, CIRCUITS as WITMIND_ENERGY_CIRCUITS };
