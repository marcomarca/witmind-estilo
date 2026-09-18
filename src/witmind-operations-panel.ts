import type { WitmindEntity } from "./ha/WitmindHaClient.js";

type Device = { entity: string; name: string; subtitle?: string; icon?: string; watts?: number };
type Area = { id: string; name: string; subtitle?: string; descriptor?: string; devices: Device[]; environment?: { temperature?: string; humidity?: string } };
type Action = { id: string; name: string; subtitle?: string; icon?: string; tone?: string; service_entities?: string[]; on_entities?: string[]; off_entities?: string[] };
type OperationConfig = Record<string, any>;
type HassLike = {
  states?: Record<string, WitmindEntity>;
  callService?: (domain: string, service: string, data?: Record<string, unknown>, target?: Record<string, unknown>) => Promise<unknown>;
};

const CONDITION_LABELS: Record<string, string> = {
  "clear-night": "Noche despejada", cloudy: "Nublado", exceptional: "Condición excepcional", fog: "Niebla",
  hail: "Granizo", lightning: "Tormenta eléctrica", "lightning-rainy": "Tormenta y lluvia", partlycloudy: "Parcialmente nublado",
  pouring: "Lluvia intensa", rainy: "Lluvia", snowy: "Nieve", "snowy-rainy": "Aguanieve", sunny: "Soleado", windy: "Ventoso", "windy-variant": "Viento y nubes",
};

const CONDITION_SYMBOLS: Record<string, string> = {
  "clear-night": "☾", cloudy: "☁", exceptional: "!", fog: "≋", hail: "◆", lightning: "ϟ",
  "lightning-rainy": "ϟ", partlycloudy: "◒", pouring: "☂", rainy: "☂", snowy: "❄",
  "snowy-rainy": "❄", sunny: "☀", windy: "≈", "windy-variant": "≈",
};

const MENU_ICON = `<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`;
const THEME_ICON = `<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><g class="theme-icon-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></g><path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

const ICONS: Record<string, string> = {
  bulb: "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4\"/>",
  panel: "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"3\"/><path d=\"M3 9h18M3 15h18M9 3v18M15 3v18\"/>",
  corridor: "<path d=\"M4 3h16v18H4V3Zm2 2v14h5V5H6Zm7 0v14h5V5h-5Z\"/>",
  workshop: "<path d=\"M3 7l9-5 9 5v14H3V7Zm2 1.2V19h4v-6h6v6h4V8.2l-7-3.9-7 3.9Z\"/>",
  power: "<path d=\"M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0\"/>",
  energy: "<path d=\"M13 2 5 13h6l-1 9 8-11h-6l1-9Z\"/>",
  shield: "<path d=\"M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z\"/>",
  office: "<path d=\"M3 4h18v16H3V4Zm4 4h4v3H7V8Zm6 0h4v3h-4V8ZM7 13h4v3H7v-3Zm6 0h4v3h-4v-3Z\"/>",
};

const formatWatts = (value: number) => `${new Intl.NumberFormat("es-BO", { maximumFractionDigits: 0 }).format(value)} W`;

class WitmindOperationsPanel extends HTMLElement {
  private _hass: HassLike | null = null;
  private _panel: OperationConfig = {};
  private _started = false;
  private _renderQueued = false;
  private _pending = new Map<string, "on" | "off">();
  private _errors = new Map<string, string>();
  private _pendingAction = "";
  private _confirmAction = "";
  private _toast = "";
  private _toastTimer: number | null = null;
  private _theme: "dark" | "light" = this._loadTheme();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.addEventListener("click", (event) => this._handleClick(event));
  }

  set hass(value: HassLike | null) {
    this._hass = value;
    if (!this._started) this._started = true;
    if (!this.shadowRoot?.querySelector(".operations-shell")) this._render();
    else this._updatePresentation();
  }

  get hass() { return this._hass; }

  set panel(value: OperationConfig) {
    this._panel = value && typeof value === "object" ? value : {};
    this._render();
  }

  get panel() { return this._panel; }

  set theme(value: string) { if (value === "dark" || value === "light") { this._theme = value; this.setAttribute("data-theme", value); this._saveTheme(); this._queueRender(); } }
  get theme() { return this._theme; }

  connectedCallback() {
    if (this._hass) this._render();
  }

  disconnectedCallback() {
    if (this._toastTimer) window.clearTimeout(this._toastTimer);
  }

  private _kind() { return String(this._panel.panel_kind || this._panel.panelKind || "offices").toLowerCase(); }
  private _loadTheme(): "dark" | "light" { try { return localStorage.getItem("witmind-showroom-panel-theme") === "light" ? "light" : "dark"; } catch (_) { return "dark"; } }
  private _saveTheme() { try { localStorage.setItem("witmind-showroom-panel-theme", this._theme); } catch (_) { /* storage optional */ } }
  private _toggleTheme() { this.theme = this._theme === "dark" ? "light" : "dark"; this.dispatchEvent(new CustomEvent("witmind-theme-change", { detail: { theme: this._theme }, bubbles: true, composed: true })); }
  private _state(entity: string) { return this._hass?.states?.[entity]; }
  private _isOn(entity: string) { return this._state(entity)?.state === "on" || this._pending.get(entity) === "on"; }
  private _unavailable(entity: string) { const state = this._state(entity)?.state; return !state || state === "unknown" || state === "unavailable"; }
  private _escape(value: unknown) { return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  private _icon(name: string) { return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.bulb}</svg>`; }

  private _devices(): Device[] {
    const kind = this._kind();
    const watts = this._panel.power_watts || this._panel.powerWatts || this._panel.device_watts || {};
    const withPower = (device: Device): Device => ({ ...device, watts: device.watts ?? (Number(watts[device.entity] || 0) || undefined) });
    if (kind === "offices") return (this._panel.areas || []).flatMap((area: Area) => (area.devices || []).map(withPower));
    if (kind === "recording") return (this._panel.switches || []).map(withPower);
    return (this._panel.zones || []).flatMap((zone: { entities?: string[]; devices?: Device[] }) => (zone.devices || (zone.entities || []).map((entity) => ({ entity, name: entity }))).map(withPower));
  }

  private _powerTotal(devices = this._devices()) { return devices.reduce((sum, device) => sum + Number(device.watts || 0), 0); }
  private _powerActive(devices = this._devices()) { return devices.filter((device) => this._isOn(device.entity)).reduce((sum, device) => sum + Number(device.watts || 0), 0); }

  private _weather() {
    const state = this._state(this._panel.weather || "weather.forecast_casa");
    const attributes = state?.attributes || {};
    return { temperature: attributes.temperature ?? "—", condition: CONDITION_LABELS[String(state?.state || "")] || String(state?.state || "Sin datos") };
  }

  private _queueRender() {
    if (this._renderQueued) return;
    this._renderQueued = true;
    requestAnimationFrame(() => { this._renderQueued = false; this._render(); });
  }

  private _render() {
    if (!this.shadowRoot) return;
    const weather = this._weather();
    const devices = this._devices();
    const kind = this._kind();
    const title = this._panel.title || (kind === "recording" ? "Sala de grabación" : kind === "control" ? "Control general" : "Oficinas");
    const subtitle = this._panel.subtitle || "Control operativo";
    const activeCount = devices.filter((device) => this._isOn(device.entity)).length;
    const activePower = this._powerActive(devices);
    const installedPower = this._powerTotal(devices);
    const now = new Date();
    const time = new Intl.DateTimeFormat("es-BO", { hour: "numeric", minute: "2-digit" }).format(now);
    this.setAttribute("data-kind", this._kind());
    this.setAttribute("data-theme", this._theme);
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:block;min-height:100dvh;color:var(--wit-text-primary,#f5f6f4);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar,:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device,:host([data-theme=light]) .action,:host([data-theme=light]) .area{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device-copy small,:host([data-theme=light]) .action small,:host([data-theme=light]) .area-head small,:host([data-theme=light]) .section-head small,:host([data-theme=light]) .hero p{color:#5f6b70}:host([data-theme=light]) .metric,:host([data-theme=light]) .weather{color:#526066;background:rgba(23,33,41,.06);border-color:rgba(23,33,41,.12)}
        *{box-sizing:border-box}button{font:inherit;color:inherit}button:focus-visible{outline:2px solid var(--wit-accent,#f26522);outline-offset:2px}.operations-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand{min-width:0}.eyebrow{display:block;color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.top-meta{display:flex;align-items:center;gap:10px;margin-left:auto}.weather,.metric{padding:9px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);font-size:12px;color:#adb4b6}.weather strong,.metric strong{color:#f5f6f4;margin-right:5px}.dashboard{width:min(1480px,100%);margin:auto;padding:clamp(16px,2.5vw,32px)}.hero{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-bottom:18px;padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.86);box-shadow:0 16px 40px rgba(0,0,0,.24)}.hero h2{margin:4px 0 0;font-size:clamp(25px,4vw,40px);letter-spacing:-.04em}.hero p{margin:7px 0 0;color:#adb4b6}.metrics{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.82);box-shadow:0 16px 40px rgba(0,0,0,.2);overflow:hidden}.section{margin-top:16px;padding:18px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:0;font-size:15px}.section-head small{color:#747e82}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.device{min-height:78px;padding:13px;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:11px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer;transition:transform 160ms,background 160ms,border-color 160ms}.device:hover:not(:disabled){transform:translateY(-1px);background:rgba(255,255,255,.07);border-color:rgba(242,101,34,.42)}.device.is-on{border-color:rgba(242,101,34,.5);background:rgba(242,101,34,.12)}.device.is-error{border-color:#ef4444}.device:disabled{cursor:not-allowed;opacity:.55}.device-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.06);color:#747e82}.is-on .device-icon{color:#f26522;background:rgba(242,101,34,.14)}.device-copy strong,.device-copy small{display:block}.device-copy strong{font-size:12px}.device-copy small{margin-top:4px;color:#747e82;font-size:10px}.device-state{text-align:right;color:#adb4b6;font-size:10px}.is-on .device-state{color:#f26522}.area{padding:16px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(7,17,24,.2)}.area+.area{margin-top:12px}.area-head{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.area-head strong{font-size:14px}.area-head small{display:block;margin-top:4px;color:#747e82}.env{display:flex;gap:8px;flex-wrap:wrap;color:#adb4b6;font-size:11px}.env span{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.05)}.action{min-height:70px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer}.action:hover:not(:disabled){border-color:rgba(242,101,34,.42);background:rgba(255,255,255,.07)}.action.danger{border-color:rgba(239,68,68,.32)}.action strong,.action small{display:block}.action strong{font-size:12px}.action small{margin-top:5px;color:#747e82;font-size:10px}.action .action-state{margin-top:7px;color:#f26522;font-size:10px}.toast{position:fixed;z-index:20;right:18px;bottom:18px;max-width:min(420px,calc(100vw - 36px));padding:13px 16px;border:1px solid rgba(242,101,34,.45);border-radius:14px;background:#162126;color:#f5f6f4;box-shadow:0 16px 42px rgba(0,0,0,.38);font-size:12px}@media(max-width:700px){.topbar{align-items:flex-start}.top-meta{display:none}.hero{grid-template-columns:1fr;padding:18px}.metrics{justify-content:flex-start}.dashboard{padding:14px}.grid{grid-template-columns:1fr}}
      </style>
      <div class="operations-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de navegación de Home Assistant" title="Abrir menú">${MENU_ICON}</button>
            <div class="brand" aria-label="Witmind ${this._escape(title)}"><strong class="brand-wordmark">WITMIND</strong><span>WTX · MDTC</span></div>
          </div>
          <div class="status-strip" aria-label="Resumen de ${this._escape(title)}">
            <button class="status-pill ${activeCount ? "is-active" : ""}" type="button"><span class="status-pill-icon">${this._icon("bulb")}</span><span><strong><span data-total-on>${activeCount}</span> de ${devices.length}</strong><small>Circuitos</small></span></button>
            <button class="status-pill ${activePower ? "is-active" : ""}" type="button"><span class="status-pill-icon">${this._icon("power")}</span><span><strong data-active-power>${formatWatts(activePower)}</strong><small>Activos</small></span></button>
            <button class="status-pill" type="button"><span class="status-pill-icon">${this._icon("energy")}</span><span><strong data-installed-power>${formatWatts(installedPower)}</strong><small>Instalados</small></span></button>
          </div>
          <div class="topbar-meta">
            <time class="header-clock"><strong>${this._escape(time)}</strong></time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(weather.condition)}, ${this._escape(weather.temperature)}°"><span aria-hidden="true">${this._escape(CONDITION_SYMBOLS[String(this._state(this._panel.weather || "weather.forecast_casa")?.state || "") ] || "·")}</span><strong>${this._escape(weather.temperature)}°</strong></div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema" title="Cambiar tema">${THEME_ICON}</button>
          </div>
        </header>
        <main class="dashboard">
          <section class="workspace-heading"><div><span class="section-kicker">${this._escape(subtitle)}</span><h1>${this._escape(title)}</h1></div><span class="workspace-summary">${devices.length} circuitos · ${formatWatts(installedPower)}</span></section>
          ${kind === "offices" ? this._renderOffices() : kind === "recording" ? this._renderRecording() : this._renderControl()}
        </main>
        ${this._toast ? `<div class="toast" role="status">${this._escape(this._toast)}</div>` : ""}
      </div>
    `;

    // Keep the operations views on the same visual contract as Showroom/Lobby.
    // The base component still owns the markup and interaction states; this
    // token layer only aligns its presentation with the canonical panel.
    const visualStyle = document.createElement("style");
    visualStyle.textContent = `
      :host {
        --primary: #f26522;
        --primary-hover: #e05413;
        --primary-soft: rgba(242, 101, 34, .12);
        --primary-border: rgba(242, 101, 34, .38);
        --primary-glow: rgba(242, 101, 34, .22);
        --background: #071118;
        --background-secondary: #10191e;
        --background-deep: #040a0f;
        --surface: rgba(16, 25, 30, .88);
        --surface-strong: rgba(27, 40, 46, .94);
        --surface-hover: rgba(255, 255, 255, .06);
        --surface-active: rgba(242, 101, 34, .12);
        --surface-control: rgba(27, 40, 46, .70);
        --text-primary: #f5f6f4;
        --text-secondary: #adb4b6;
        --text-tertiary: #747e82;
        --border-subtle: rgba(255, 255, 255, .06);
        --border-default: rgba(255, 255, 255, .09);
        --border-emphasis: rgba(255, 255, 255, .16);
        --header: rgba(16, 25, 30, .85);
        --shadow: rgba(0, 0, 0, .40);
        --radius-sm: 10px;
        --radius-md: 16px;
        --radius-lg: 22px;
        --radius-pill: 999px;
        display: block;
        min-height: 100%;
        color: var(--text-primary);
        background:
          radial-gradient(circle at 10% 4%, rgba(242, 101, 34, .08), transparent 36%),
          radial-gradient(circle at 90% 0%, rgba(16, 32, 45, .6), transparent 30%),
          linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
        font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      :host([data-theme="light"]) {
        --background: #f3f3ef;
        --background-secondary: #e6e8e3;
        --background-deep: #fff;
        --surface: rgba(255, 255, 255, .90);
        --surface-strong: rgba(255, 255, 255, .98);
        --surface-hover: rgba(0, 0, 0, .04);
        --surface-active: rgba(242, 101, 34, .10);
        --surface-control: rgba(0, 0, 0, .035);
        --text-primary: #151b1e;
        --text-secondary: #586266;
        --text-tertiary: #8a9499;
        --border-subtle: rgba(0, 0, 0, .06);
        --border-default: rgba(0, 0, 0, .09);
        --border-emphasis: rgba(0, 0, 0, .16);
        --header: rgba(255, 255, 255, .88);
        --shadow: rgba(0, 0, 0, .08);
        background:
          radial-gradient(circle at 10% 4%, rgba(242, 101, 34, .07), transparent 36%),
          radial-gradient(circle at 90% 0%, rgba(220, 230, 235, .5), transparent 30%),
          linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
      }
      .operations-shell { min-height: 100%; background: transparent; }
      .topbar-start { min-width: 0; display: flex; align-items: center; gap: 12px; }
      .brand { min-width: 0; display: flex; align-items: baseline; gap: 12px; }
      .brand-wordmark { color: var(--text-primary); font-size: 17px; font-weight: 850; letter-spacing: .08em; line-height: 1; }
      .brand > span { color: var(--primary); font-size: 9px; font-weight: 800; letter-spacing: .08em; }
      .menu-button, .theme-button { width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 50%; background: var(--surface-control); cursor: pointer; transition: transform 180ms, background 180ms, border-color 180ms; }
      .menu-button:hover, .theme-button:hover { background: var(--surface-hover); border-color: var(--primary-border); }
      .menu-icon { width: 20px; height: 20px; display: block; }
      .theme-icon { width: 20px; height: 20px; }
      .theme-icon-sun, .theme-icon-moon { transform-origin: center; transition: opacity 220ms, transform 220ms; }
      .theme-icon-sun { opacity: 0; transform: rotate(-50deg) scale(.65); }
      .theme-icon-moon { opacity: 1; transform: rotate(0) scale(1); }
      :host([data-theme="light"]) .theme-icon-sun { opacity: 1; transform: rotate(0) scale(1); }
      :host([data-theme="light"]) .theme-icon-moon { opacity: 0; transform: rotate(45deg) scale(.65); }
      .status-strip { display: flex; align-items: center; gap: 8px; margin-left: auto; }
      .status-pill { min-height: 42px; padding: 0 13px; display: inline-flex; align-items: center; gap: 9px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-secondary); text-align: left; cursor: default; }
      .status-pill-icon { width: 22px; height: 22px; display: grid; place-items: center; color: var(--text-tertiary); }
      .status-pill-icon .icon { width: 18px; height: 18px; }
      .status-pill span:last-child { display: grid; gap: 2px; }
      .status-pill strong, .status-pill small { display: block; white-space: nowrap; }
      .status-pill strong { color: var(--text-primary); font-size: 11px; font-weight: 800; }
      .status-pill small { color: var(--text-tertiary); font-size: 9px; font-weight: 700; }
      .status-pill.is-active { border-color: var(--primary-border); background: var(--primary-soft); }
      .status-pill.is-active .status-pill-icon, .status-pill.is-active strong { color: var(--primary); }
      .header-clock { display: inline-flex; align-items: baseline; color: var(--text-primary); white-space: nowrap; font-variant-numeric: tabular-nums; }
      .header-clock strong { font-size: 26px; font-weight: 800; letter-spacing: -.04em; }
      .header-weather { min-height: 32px; display: inline-flex; align-items: center; gap: 7px; margin-left: 8px; padding-left: 12px; border-left: 1px solid var(--border-default); color: var(--text-secondary); }
      .header-weather > span { width: 20px; height: 20px; display: grid; place-items: center; color: var(--primary); }
      .header-weather .icon { width: 17px; height: 17px; }
      .header-weather strong { color: var(--text-primary); font-size: 13px; }
      .topbar {
        min-height: 64px;
        padding: 10px clamp(16px, 2.4vw, 32px);
        gap: 16px;
        border-bottom: 1px solid var(--border-subtle);
        background: var(--header);
        box-shadow: 0 1px 0 rgba(255,255,255,.02);
      }
      .menu {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        border-color: var(--border-default);
        background: var(--surface-control);
        color: var(--text-secondary);
      }
      .menu:hover { background: var(--surface-hover); border-color: var(--primary-border); }
      .brand { display: flex; align-items: baseline; gap: 10px; }
      .eyebrow { color: var(--primary); letter-spacing: .13em; }
      .brand h1 { color: var(--text-primary); font-weight: 800; }
      :host([data-kind="offices"]) .topbar-meta,
      :host([data-kind="recording"]) .topbar-meta,
      :host([data-kind="control"]) .topbar-meta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        margin-left: auto;
      }
      .top-meta { gap: 8px; }
      .weather, .metric {
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        padding: 0 12px;
        border-color: var(--border-default);
        background: var(--surface-control);
        color: var(--text-secondary);
      }
      .weather strong, .metric strong { color: var(--text-primary); }
      .dashboard { width: min(1480px, 100%); padding: clamp(14px, 2vw, 28px); }
      .workspace-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
      .section-kicker { display: block; color: var(--primary); font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
      .workspace-heading h1, .view-heading h1 { margin: 4px 0 0; color: var(--text-primary); font-size: clamp(28px, 3.2vw, 40px); font-weight: 800; letter-spacing: -.04em; line-height: 1.05; }
      .workspace-summary, .view-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 700; }
      .view-panel { animation: view-enter 180ms cubic-bezier(.2,.8,.2,1); }
      .view-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
      .lighting-layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; align-items: start; }
      .offices-section-heading { margin-bottom: 14px; }
      .offices-section-heading h2 { margin: 4px 0 0; color: var(--text-primary); font-size: 19px; font-weight: 800; letter-spacing: -.02em; }
      .offices-section-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 700; }
      .office-section { min-width: 0; padding: 18px; }
      .office-section .section-heading {
        min-height: 46px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        gap: 12px;
        margin-bottom: 12px;
      }
      .office-section .section-heading > div:first-child { min-width: 0; }
      .office-section .section-heading h2 { margin: 4px 0 0; color: var(--text-primary); font-size: 18px; font-weight: 800; letter-spacing: -.02em; }
      .area-meta { min-height: 25px; display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 6px; color: var(--text-tertiary); font-size: 10px; font-weight: 700; }
      .area-meta:empty { display: none; }
      .area-meta span { min-height: 25px; display: inline-flex; align-items: center; padding: 5px 9px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); white-space: nowrap; line-height: 1; }
      .area-description { margin: -4px 0 12px; color: var(--text-tertiary); font-size: 10px; line-height: 1.4; }
      .device-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .hero {
        min-height: 104px;
        margin: 0 0 14px;
        padding: 18px 24px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        background:
          radial-gradient(circle at 92% 16%, rgba(242, 101, 34, .10), transparent 36%),
          var(--surface);
        box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,.03);
        backdrop-filter: blur(20px);
      }
      .hero h2 { color: var(--text-primary); font-weight: 800; }
      .hero p { color: var(--text-secondary); line-height: 1.5; }
      .metrics { gap: 8px; }
      .surface {
        margin-top: 14px;
        border-color: var(--border-subtle);
        border-radius: var(--radius-lg);
        background: var(--surface);
        box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,.03);
        backdrop-filter: blur(20px);
      }
      .section { padding: 20px; }
      .section-head { margin-bottom: 16px; }
      .section-head h3 { color: var(--text-primary); font-size: 18px; letter-spacing: -.02em; }
      .section-head small, .area-head small, .device-copy small, .action small { color: var(--text-tertiary); }
      .area {
        padding: 18px 0 0;
        border: 0;
        border-top: 1px solid var(--border-subtle);
        border-radius: 0;
        background: transparent;
      }
      .area:first-of-type { padding-top: 2px; border-top: 0; }
      .area + .area { margin-top: 18px; }
      .area-head { margin-bottom: 12px; }
      .area-head strong { color: var(--text-primary); font-size: 14px; }
      .env span { border: 1px solid var(--border-default); background: var(--surface-control); color: var(--text-secondary); }
      .grid { gap: 10px; }
      .device, .action {
        min-height: 70px;
        padding: 12px 14px;
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) 32px;
        align-items: center;
        gap: 10px;
        border-color: var(--border-default);
        border-radius: 14px;
        background: var(--surface-control);
        color: var(--text-primary);
        transition: transform 180ms cubic-bezier(.2,.8,.2,1), background 180ms, border-color 180ms, box-shadow 180ms;
      }
      .device:hover:not(:disabled), .action:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
      .device.is-on { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
      .device.is-on { box-shadow: inset 3px 0 0 var(--primary); }
      .device.is-pending { animation: pulse 1.1s ease-in-out infinite alternate; }
      .device-icon { background: var(--surface-control); color: var(--text-tertiary); }
      .is-on .device-icon { color: var(--primary); background: var(--primary-soft); }
      .device-copy strong, .action strong { color: var(--text-primary); }
      .device-copy strong, .device-copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .device-copy strong { font-size: 12px; font-weight: 680; }
      .device-copy small { margin-top: 2px; font-size: 9px; font-weight: 540; }
      .device.is-on .device-copy small { color: var(--primary); }
      .device-state { color: var(--text-secondary); }
      .is-on .device-state, .action .action-state { color: var(--primary); }
      .device-switch { width: 32px; height: 18px; padding: 2px; display: flex; align-items: center; border: 1px solid var(--border-default); border-radius: 999px; background: var(--surface-control); }
      .device-switch i { width: 12px; height: 12px; border-radius: 50%; background: var(--text-tertiary); transition: transform 180ms, background 180ms; }
      .device.is-on .device-switch { border-color: var(--primary-border); background: rgba(242,101,34,.20); }
      .device.is-on .device-switch i { transform: translateX(14px); background: var(--primary); }
      .action.danger { border-color: rgba(239, 68, 68, .34); }
      /* Actions use the same readable card pattern as Showroom's quick actions.
         They must not inherit the three-column circuit grid. */
      .control-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .control-actions .action { min-height: 78px; padding: 12px 14px; display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; align-items: center; gap: 10px; text-align: left; }
      .action-icon { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 11px; color: var(--primary); background: var(--primary-soft); }
      .action-icon .icon { width: 18px; height: 18px; }
      .action-icon.is-danger { color: #ef4444; background: rgba(239,68,68,.12); }
      .action-copy { min-width: 0; }
      .action-copy strong, .action-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: normal; }
      .action-copy strong { font-size: 12px; line-height: 1.2; }
      .action-copy small { margin-top: 4px; font-size: 10px; line-height: 1.3; }
      .control-actions .action-state { margin: 0; max-width: 72px; color: var(--primary); font-size: 10px; font-weight: 700; line-height: 1.25; text-align: right; }
      .control-actions .danger .action-state { color: #ef4444; }
      .section-head > .compact-action, .compact-action { min-height: 42px; padding: 8px 14px; display: inline-flex; grid-template-columns: none; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
      .compact-action .action-icon { width: 22px; height: 22px; border-radius: 7px; }
      .compact-action .action-icon .icon { width: 14px; height: 14px; }
      .section-footnote { margin-top: 18px; margin-bottom: 0; }
      .section-footnote small { line-height: 1.45; }
      .toast .compact-action { min-height: 36px; margin-left: 8px; padding: 7px 10px; }
      .toast { border-color: var(--primary-border); background: var(--surface-strong); color: var(--text-primary); box-shadow: 0 16px 42px var(--shadow); }
      @keyframes view-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
      @keyframes pulse { from { opacity: .65; } to { opacity: 1; } }
      @media (max-width: 960px) { .status-strip { display: none; } .lighting-layout { grid-template-columns: 1fr; } }
      @media (max-width: 760px) {
        :host([data-kind="offices"]) .topbar,
        :host([data-kind="recording"]) .topbar,
        :host([data-kind="control"]) .topbar {
          min-height: 68px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
        }
        :host([data-kind="offices"]) .topbar-start,
        :host([data-kind="recording"]) .topbar-start,
        :host([data-kind="control"]) .topbar-start {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        :host([data-kind="offices"]) .brand,
        :host([data-kind="recording"]) .brand,
        :host([data-kind="control"]) .brand { display: flex; align-items: baseline; gap: 0; }
        :host([data-kind="offices"]) .brand > span,
        :host([data-kind="recording"]) .brand > span,
        :host([data-kind="control"]) .brand > span,
        :host([data-kind="offices"]) .header-weather,
        :host([data-kind="recording"]) .header-weather,
        :host([data-kind="control"]) .header-weather { display: none; }
        :host([data-kind="offices"]) .menu-button,
        :host([data-kind="recording"]) .menu-button,
        :host([data-kind="control"]) .menu-button,
        :host([data-kind="offices"]) .theme-button,
        :host([data-kind="recording"]) .theme-button,
        :host([data-kind="control"]) .theme-button { width: 44px; height: 44px; }
        :host([data-kind="offices"]) .header-clock strong,
        :host([data-kind="recording"]) .header-clock strong,
        :host([data-kind="control"]) .header-clock strong { font-size: 24px; }
        :host([data-kind="offices"]) .workspace-heading,
        :host([data-kind="recording"]) .workspace-heading,
        :host([data-kind="control"]) .workspace-heading {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          margin-bottom: 16px;
        }
        :host([data-kind="offices"]) .workspace-heading h1,
        :host([data-kind="recording"]) .workspace-heading h1,
        :host([data-kind="control"]) .workspace-heading h1 { font-size: 26px; }
        :host([data-kind="offices"]) .workspace-summary,
        :host([data-kind="recording"]) .workspace-summary,
        :host([data-kind="control"]) .workspace-summary { margin-left: auto; text-align: right; }
      }
      @media (max-width: 700px) {
        .brand { display: block; }
        .brand-wordmark { font-size: 16px; }
        .brand > span { display: none; }
        .topbar { min-height: 68px; padding: 10px 14px; gap: 10px; }
        .topbar-meta { gap: 6px; }
        .header-clock strong { font-size: 22px; }
        .header-weather { display: none; }
        .workspace-heading { display: grid; gap: 14px; align-items: stretch; }
        .view-heading { align-items: flex-start; }
        .section { padding: 16px; }
        .dashboard { padding: 14px; }
        .device-grid { grid-template-columns: 1fr; }
        .control-actions { grid-template-columns: 1fr; }
      }
      @media (max-width: 420px) {
        .office-section .section-heading { grid-template-columns: 1fr; gap: 8px; }
        .area-meta { justify-content: flex-start; }
      }
      @media (min-width: 701px) and (max-width: 1100px) { .control-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    `;
    this.shadowRoot.append(visualStyle);
  }

  private _renderOffices() {
    const areas = this._panel.areas || [];
    const total = areas.reduce((sum: number, area: Area) => sum + (area.devices || []).length, 0);
    return `<section class="view-panel offices-view" aria-label="Zonas operativas"><div class="section-heading compact-heading offices-section-heading"><div><span class="section-kicker">Zonas operativas</span><h2>Distribución de circuitos</h2></div><span>${total} circuitos</span></div><div class="lighting-layout offices-layout">${areas.map((area: Area) => {
      const devices = area.devices || [];
      const environment = area.environment || {};
      const temp = environment.temperature ? this._state(environment.temperature)?.state : "";
      const humidity = environment.humidity ? this._state(environment.humidity)?.state : "";
      return `<section class="surface control-section office-section"><div class="section-heading compact-heading"><div><span class="eyebrow">Zona</span><h2>${this._escape(area.name)}</h2></div><div class="area-meta">${temp ? `<span>${this._escape(temp)} °C</span>` : ""}${humidity ? `<span>${this._escape(humidity)} % HR</span>` : ""}</div></div>${area.subtitle || area.descriptor ? `<p class="area-description">${this._escape(area.subtitle || area.descriptor)}</p>` : ""}<div class="device-grid">${devices.map((device) => this._renderDevice(device)).join("")}</div></section>`;
    }).join("")}</div></section>`;
  }

  private _renderRecording() {
    const devices = this._panel.switches || [];
    return `<section class="surface section"><div class="section-head"><div><span class="eyebrow">Cuatro circuitos</span><h3>Sala de grabación</h3></div><button class="action compact-action danger" data-action="run-action" data-action-id="recording-off"><span class="action-icon">${this._icon("power")}</span><span>Apagar todo</span></button></div><div class="grid">${devices.map((device: Device) => this._renderDevice(device)).join("")}</div><div class="section-head section-footnote"><small>Estimación instalada: ${formatWatts(this._powerTotal(devices))}. El valor representa potencia nominal, no consumo medido.</small></div></section>`;
  }

  private _renderControl() {
    const actions: Action[] = [...(this._panel.main_actions || []), ...(this._panel.daily_actions || []), ...(this._panel.danger_action ? [this._panel.danger_action] : [])];
    return `<section class="surface section"><div class="section-head"><div><span class="eyebrow">Escenas y rutinas</span><h3>Control general</h3></div><small>Acciones verificadas</small></div><div class="control-actions">${actions.map((action) => `<button class="action ${action.tone === "danger" ? "danger" : ""}" data-action="run-action" data-action-id="${this._escape(action.id)}" ${this._pendingAction && this._pendingAction !== action.id ? "disabled" : ""}><span class="action-icon ${action.tone === "danger" ? "is-danger" : ""}">${this._icon(action.icon || (action.tone === "danger" ? "power" : "bulb"))}</span><span class="action-copy"><strong>${this._escape(action.name)}</strong><small>${this._escape(action.subtitle || "Rutina operativa")}</small></span><span class="action-state">${this._pendingAction === action.id ? "Aplicando…" : action.tone === "danger" ? "Confirmar" : "Lista"}</span></button>`).join("")}</div></section><section class="surface section"><div class="section-head"><div><span class="eyebrow">Resumen de zonas</span><h3>Estado actual</h3></div></div>${(this._panel.zones || []).map((zone: any) => { const entities = zone.entities || []; const active = entities.filter((entity: string) => this._isOn(entity)).length; return `<div class="area"><div class="area-head"><div><strong>${this._escape(zone.name)}</strong><small>${active} de ${entities.length} circuitos activos</small></div><span class="device-state">${active ? "Activo" : "Apagado"}</span></div></div>`; }).join("")}</section>${this._confirmAction ? `<div class="toast" role="alert"><strong>¿Confirmar ${this._escape(this._confirmAction)}?</strong><button class="action compact-action" data-action="confirm-action" data-action-id="${this._escape(this._confirmAction)}">Confirmar</button><button class="action compact-action" data-action="cancel-action">Cancelar</button></div>` : ""}`;
  }

  private _renderDevice(device: Device) {
    const on = this._isOn(device.entity);
    const unavailable = this._unavailable(device.entity);
    const pending = this._pending.has(device.entity);
    const error = this._errors.get(device.entity);
    const status = error || (pending ? (on ? "Encendiendo…" : "Apagando…") : unavailable ? "No disponible" : on ? "Encendido" : "Apagado");
    return `<button class="device ${on ? "is-on" : ""} ${pending ? "is-pending" : ""} ${error ? "is-error" : ""}" data-action="toggle-switch" data-entity="${this._escape(device.entity)}" aria-pressed="${String(on)}" aria-label="${this._escape(`${device.name}: ${status}`)}" ${unavailable || pending ? "disabled" : ""}><span class="device-icon">${this._icon(device.icon || "bulb")}</span><span class="device-copy"><strong>${this._escape(device.name)}</strong><small><span data-device-status="${this._escape(device.entity)}">${this._escape(status)}</span>${device.watts ? ` · ${formatWatts(device.watts)}` : ""}</small></span><span class="device-switch" aria-hidden="true"><i></i></span></button>`;
  }

  private _updatePresentation() {
    this.shadowRoot?.querySelectorAll<HTMLElement>("[data-action=toggle-switch]").forEach((button) => {
      const entity = button.dataset.entity || "";
      const on = this._isOn(entity);
      const unavailable = this._unavailable(entity);
      const pending = this._pending.has(entity);
      const error = this._errors.get(entity);
      button.classList.toggle("is-on", on); button.classList.toggle("is-error", Boolean(error)); (button as HTMLButtonElement).disabled = unavailable || pending;
      button.setAttribute("aria-pressed", String(on));
      const state = button.querySelector<HTMLElement>("[data-device-status]");
      if (state) state.textContent = error || (pending ? (on ? "Encendiendo…" : "Apagando…") : unavailable ? "No disponible" : on ? "Encendido" : "Apagado");
    });
    const devices = this._devices();
    const total = this.shadowRoot?.querySelector("[data-total-on]");
    const active = this.shadowRoot?.querySelector("[data-active-power]");
    if (total) total.textContent = String(devices.filter((device) => this._isOn(device.entity)).length);
    if (active) active.textContent = formatWatts(this._powerActive(devices));
    total?.closest(".status-pill")?.classList.toggle("is-active", devices.some((device) => this._isOn(device.entity)));
    active?.closest(".status-pill")?.classList.toggle("is-active", this._powerActive(devices) > 0);
  }

  private _handleClick(event: Event) {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-action]");
    if (!target || !this._hass) return;
    const action = target.dataset.action;
    if (action === "toggle-menu") { this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true })); return; }
    if (action === "toggle-theme") { this._toggleTheme(); return; }
    if (action === "toggle-switch") { void this._toggleSwitch(target.dataset.entity || ""); return; }
    if (action === "run-action") { const id = target.dataset.actionId || ""; const configAction = this._findAction(id); if (configAction?.tone === "danger") this._confirmAction = id; else void this._executeAction(configAction); this._queueRender(); return; }
    if (action === "confirm-action") { const configAction = this._findAction(target.dataset.actionId || this._confirmAction); this._confirmAction = ""; void this._executeAction(configAction); this._queueRender(); return; }
    if (action === "cancel-action") { this._confirmAction = ""; this._queueRender(); }
  }

  private _findAction(id: string): Action | null {
    const actions = [...(this._panel.main_actions || []), ...(this._panel.daily_actions || []), ...(this._panel.danger_action ? [this._panel.danger_action] : [])];
    if (id === "recording-off") return { id, name: "Apagar todo", subtitle: "Apaga los cuatro circuitos", tone: "danger", off_entities: (this._panel.switches || []).map((item: Device) => item.entity) };
    return actions.find((action: Action) => action.id === id) || null;
  }

  private async _toggleSwitch(entity: string) {
    if (!entity || this._pending.has(entity) || !this._hass?.callService) return;
    const desired = this._isOn(entity) ? "off" : "on";
    this._pending.set(entity, desired); this._errors.delete(entity); this._updatePresentation();
    try { const [domain] = entity.split("."); await this._hass.callService(domain, desired === "on" ? "turn_on" : "turn_off", { entity_id: entity }); const ok = await this._waitForState(entity, desired); if (!ok) throw new Error("Home Assistant no confirmó el estado solicitado"); }
    catch (error) { this._errors.set(entity, error instanceof Error ? error.message : "No se pudo cambiar el circuito"); this._showToast(this._errors.get(entity) || "No se pudo cambiar el circuito"); }
    finally { this._pending.delete(entity); this._updatePresentation(); }
  }

  private async _executeAction(action: Action | null) {
    if (!action || this._pendingAction || !this._hass?.callService) return;
    this._pendingAction = action.id; this._queueRender();
    const desired = new Map<string, "on" | "off">();
    (action.on_entities || []).forEach((entity: string) => desired.set(entity, "on"));
    (action.off_entities || []).forEach((entity: string) => desired.set(entity, "off"));
    try {
      for (const serviceEntity of action.service_entities || []) { const [domain] = serviceEntity.split("."); await this._hass.callService(domain, "turn_on", { entity_id: serviceEntity }); }
      for (const [entity, state] of desired) { const [domain] = entity.split("."); await this._hass.callService(domain, state === "on" ? "turn_on" : "turn_off", { entity_id: entity }); }
      const confirmed = await Promise.all([...desired].map(([entity, state]) => this._waitForState(entity, state)));
      if (confirmed.some((value) => !value)) throw new Error("No todos los circuitos confirmaron el cambio");
      this._showToast(`${action.name} aplicado.`);
    } catch (error) { this._showToast(error instanceof Error ? error.message : "No se pudo ejecutar la acción"); }
    finally { this._pendingAction = ""; this._queueRender(); }
  }

  private async _waitForState(entity: string, expected: "on" | "off") {
    for (let attempt = 0; attempt < 20; attempt += 1) { if (this._state(entity)?.state === expected) return true; await new Promise((resolve) => window.setTimeout(resolve, 250)); }
    return false;
  }

  private _showToast(message: string) { this._toast = message; if (this._toastTimer) window.clearTimeout(this._toastTimer); this._toastTimer = window.setTimeout(() => { this._toast = ""; this._queueRender(); }, 4200); this._queueRender(); }
}

if (!customElements.get("witmind-operations-panel")) customElements.define("witmind-operations-panel", WitmindOperationsPanel);

export { WitmindOperationsPanel };
