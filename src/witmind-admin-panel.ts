type AdminPanelConfig = Record<string, any>;
type HassLike = {
  user?: { is_admin?: boolean; name?: string };
  connection?: {
    sendMessagePromise?: (message: Record<string, unknown>) => Promise<any>;
    subscribeEvents?: (callback: (event: any) => void, eventType?: string) => Promise<(() => void) | void>;
  };
};

const esc = (value: unknown) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const asList = (value: any, keys: string[] = []) => {
  if (Array.isArray(value)) return value;
  for (const key of keys) if (Array.isArray(value?.[key])) return value[key];
  return [];
};
const MENU_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`;
const THEME_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;

class WitmindAdminPanel extends HTMLElement {
  private _hass: HassLike | null = null;
  private _panel: AdminPanelConfig = {};
  private _loaded = false;
  private _loading = false;
  private _error = "";
  private _calendar: any[] = [];
  private _rules: any[] = [];
  private _targets: any[] = [];
  private _sensors: any[] = [];
  private _history: any[] = [];
  private _unsubscribe?: () => void;
  private _theme: "dark" | "light" = this._loadTheme();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.addEventListener("click", (event) => this._click(event));
    this.shadowRoot!.addEventListener("submit", (event) => this._submit(event));
  }

  set hass(value: HassLike | null) {
    this._hass = value;
    if (!this.isConnected) return;
    if (!this.shadowRoot?.querySelector(".admin-shell")) this._render();
    this._applyThemeStyles();
    if (value && !this._loaded) void this._load();
  }
  get hass() { return this._hass; }
  set panel(value: AdminPanelConfig) { this._panel = value || {}; this._loaded = false; if (this.isConnected) { this._render(); this._applyThemeStyles(); if (this._hass) void this._load(); } }
  get panel() { return this._panel; }
  set theme(value: string) { if (value === "dark" || value === "light") { const changed = this._theme !== value; this._theme = value; this.setAttribute("data-theme", value); this._saveTheme(); if (changed && this.isConnected) { this._render(); this._applyThemeStyles(); } } }
  get theme() { return this._theme; }

  connectedCallback() { this.setAttribute("data-theme", this._theme); this._render(); this._applyThemeStyles(); if (this._hass && !this._loaded) void this._load(); }

  disconnectedCallback() { this._unsubscribe?.(); }

  private _kind() { return String(this._panel.panel_kind || this._panel.panelKind || "calendar").toLowerCase(); }
  private _loadTheme(): "dark" | "light" { try { return localStorage.getItem("witmind-showroom-panel-theme") === "light" ? "light" : "dark"; } catch (_) { return "dark"; } }
  private _saveTheme() { try { localStorage.setItem("witmind-showroom-panel-theme", this._theme); } catch (_) { /* storage optional */ } }
  private _toggleTheme() { this.theme = this._theme === "dark" ? "light" : "dark"; this.dispatchEvent(new CustomEvent("witmind-theme-change", { detail: { theme: this._theme }, bubbles: true, composed: true })); }
  private _applyThemeStyles() { const light = this._theme === "light"; this.style.color = light ? "#172129" : ""; this.style.background = light ? "linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)" : ""; const topbar = this.shadowRoot?.querySelector<HTMLElement>(".topbar"); if (topbar && !topbar.querySelector("[data-action=toggle-theme]")) topbar.insertAdjacentHTML("beforeend", `<button class="menu" data-action="toggle-theme" aria-label="Cambiar tema">${this._theme === "dark" ? "☼" : "☾"}</button>`); this.shadowRoot?.querySelectorAll<HTMLElement>(".topbar,.hero,.surface,.row").forEach((node) => { node.style.background = light ? "rgba(255,255,255,.92)" : ""; node.style.borderColor = light ? "rgba(23,33,41,.12)" : ""; node.style.color = light ? "#172129" : ""; }); }
  private _title() { return this._kind() === "notifications" ? "Notificaciones Witmind" : "Calendario laboral"; }
  private _subtitle() { return this._kind() === "notifications" ? "Centro de avisos" : "Planificación operativa"; }
  private _admin() { return this._hass?.user?.is_admin !== false; }

  private async _request(type: string, payload: Record<string, unknown> = {}) {
    const send = this._hass?.connection?.sendMessagePromise;
    if (!send) throw new Error("Conexión de Home Assistant no disponible");
    return send({ type, ...payload });
  }

  private async _load() {
    if (this._loading) return;
    this._loading = true; this._error = ""; this._render();
    try {
      if (this._kind() === "notifications") {
        const [rules, targets, sensors, history] = await Promise.all([
          this._request("witmind_notifications/rules/list"),
          this._request("witmind_notifications/targets/list"),
          this._request("witmind_notifications/sensors/list"),
          this._request("witmind_notifications/history/list", { limit: 150 }),
        ]);
        this._rules = asList(rules, ["rules"]); this._targets = asList(targets, ["targets"]); this._sensors = asList(sensors, ["sensors"]); this._history = asList(history, ["history", "items"]);
        try { this._unsubscribe = await this._hass?.connection?.subscribeEvents?.(() => void this._load(), "witmind_notifications_updated") as (() => void) | undefined; } catch (_) { /* event is optional */ }
      } else {
        const result = await this._request("calendario_laboral/get");
        // calendario_laboral/get returns its canonical collection as `holidays`.
        // Keep the legacy aliases for older installs, but prefer the real HA
        // payload so the preloaded records are visible on first render.
        this._calendar = asList(result, ["holidays", "records", "items", "events"])
          .slice()
          .sort((a, b) => String(a?.date || "").localeCompare(String(b?.date || "")));
      }
      this._loaded = true;
    } catch (error) { this._error = error instanceof Error ? error.message : "No se pudieron cargar los datos"; }
    finally { this._loading = false; this._render(); }
  }

  private _render() {
    if (!this.shadowRoot) return;
    const kind = this._kind();
    this.setAttribute("data-theme", this._theme);
    this.setAttribute("data-kind", kind);
    const now = new Intl.DateTimeFormat("es-BO", { hour: "numeric", minute: "2-digit", timeZone: "America/La_Paz" }).format(new Date());
    const signatureHeader = `<header class="topbar signature-topbar"><div class="signature-topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${MENU_ICON}</button><div class="signature-brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="signature-topbar-end"><time class="signature-clock">${esc(now)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${THEME_ICON}</button></div></header>`;
    const workspaceHeading = `<section class="admin-heading"><div><span class="eyebrow">${esc(this._subtitle())}</span><h1>${esc(this._title())}</h1><p>${esc(this._panel.description || (kind === "calendar" ? "Días laborables gestionados desde Home Assistant." : "Información conectada a Home Assistant."))}</p></div><button class="refresh" data-action="refresh">Actualizar</button></section>`;
    this.shadowRoot.innerHTML = `<style>
      :host{display:block;min-height:100dvh;color:#f5f6f4;background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif}*{box-sizing:border-box}button,input,textarea{font:inherit;color:inherit}button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #f26522;outline-offset:2px}.admin-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.eyebrow{color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.dashboard{width:min(1200px,100%);margin:auto;padding:clamp(16px,3vw,34px)}.hero,.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.84);box-shadow:0 16px 40px rgba(0,0,0,.2)}.hero{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:24px;margin-bottom:16px}.hero h2{margin:5px 0 0;font-size:clamp(26px,4vw,42px);letter-spacing:-.04em}.hero p{margin:8px 0 0;color:#adb4b6}.refresh,.primary,.danger,.small{border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:11px 14px;background:rgba(255,255,255,.05);cursor:pointer}.primary{background:#f26522;border-color:#f26522;color:#111}.danger{border-color:rgba(239,68,68,.5);color:#ff9b9b}.small{padding:7px 10px;font-size:11px}.surface{padding:18px}.surface+.surface{margin-top:14px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:4px 0 0;font-size:16px}.muted{color:#adb4b6;font-size:12px}.list{display:grid;gap:9px}.row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:14px;padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(27,40,46,.72)}.row strong,.row small{display:block}.row strong{color:#f5f6f4}.row small{margin-top:4px;color:#adb4b6;font-size:11px}.row-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.small.is-active{color:#f26522;border-color:rgba(242,101,34,.42)}.small.is-muted{color:#adb4b6}.form{display:grid;grid-template-columns:repeat(3,1fr) auto;gap:9px;margin-top:14px}.form input,.form textarea{width:100%;padding:11px 12px;border:1px solid rgba(255,255,255,.12);border-radius:11px;background:rgba(7,17,24,.75)}.form textarea{min-height:42px;resize:vertical}.error{padding:12px;border:1px solid rgba(239,68,68,.5);border-radius:12px;color:#ff9b9b;background:rgba(100,20,20,.18)}.empty{padding:28px;text-align:center;color:#adb4b6}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .row{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12)}:host([data-theme=light]) .row strong{color:#172129}:host([data-theme=light]) .row small,:host([data-theme=light]) .hero p,:host([data-theme=light]) .muted,:host([data-theme=light]) .empty{color:#5f6b70}:host([data-theme=light]) .form input,:host([data-theme=light]) .form textarea{background:#f7fafa;border-color:rgba(23,33,41,.16);color:#172129}@media(max-width:700px){.hero{align-items:flex-start;flex-direction:column;padding:18px}.form{grid-template-columns:1fr}.row{grid-template-columns:1fr}.row-actions{justify-content:flex-start}}:host([data-kind=calendar]) .calendar-topbar{min-height:80px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:12px clamp(18px,2.6vw,48px)}.calendar-topbar-start,.calendar-topbar-end{display:flex;align-items:center;gap:12px}.calendar-topbar-end{justify-content:flex-end}.menu-button,.theme-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);color:inherit;cursor:pointer}.menu-button svg,.theme-button svg{width:20px;height:20px}.calendar-brand{display:flex;align-items:baseline;gap:10px}.calendar-brand strong{font-size:18px;letter-spacing:.06em}.calendar-brand span{color:#f26522;font-size:9px;font-weight:800}.calendar-clock{font-size:28px;font-weight:600;letter-spacing:-.05em}.calendar-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:8px 0 18px}.calendar-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em;line-height:1.05}.calendar-heading p{max-width:650px;margin:7px 0 0;color:#adb4b6;font-size:12px;line-height:1.55}:host([data-theme=light]) .menu-button,:host([data-theme=light]) .theme-button{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96)}:host([data-theme=light]) .calendar-heading p{color:#526066}:host([data-theme=light]) .calendar-heading .refresh{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96);color:#172129}:host([data-kind=calendar]) .calendar-surface{margin-top:0}@media(max-width:760px){:host([data-kind=calendar]) .calendar-topbar{min-height:68px;padding:10px 14px}.menu-button,.theme-button{width:44px;height:44px}.calendar-brand{gap:0}.calendar-brand span{display:none}.calendar-clock{font-size:24px}.dashboard{padding:16px 14px 90px}.calendar-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.calendar-heading h1{font-size:26px}.calendar-heading p{max-width:none}.calendar-heading .refresh{justify-self:end}}
      .signature-topbar{min-height:80px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:12px clamp(18px,2.6vw,48px)}
      .signature-topbar-start,.signature-topbar-end{display:flex;align-items:center;gap:12px}
      .signature-topbar-end{justify-content:flex-end}
      .signature-brand{display:flex;align-items:baseline;gap:10px}
      .signature-brand strong{font-size:18px;letter-spacing:.06em}
      .signature-brand span{color:#f26522;font-size:9px;font-weight:800}
      .signature-clock{font-size:28px;font-weight:600;letter-spacing:-.05em}
      .admin-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:8px 0 18px}
      .admin-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em;line-height:1.05}
      .admin-heading p{max-width:650px;margin:7px 0 0;color:#adb4b6;font-size:12px;line-height:1.55}
      :host([data-theme=light]) .admin-heading p{color:#526066}
      :host([data-theme=light]) .admin-heading .refresh{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96);color:#172129}
      @media(max-width:760px){
        .signature-topbar{min-height:68px;padding:10px 14px}
        .signature-brand{gap:0}
        .signature-brand span{display:none}
        .signature-clock{font-size:24px}
        .admin-heading{display:grid;grid-template-columns:minmax(0,1fr);align-items:stretch;justify-content:stretch;gap:12px;margin:4px 0 18px}
        .admin-heading h1{font-size:26px}
        .admin-heading p{max-width:none}
        .admin-heading .refresh{justify-self:end}
      }
    </style><div class="admin-shell">${signatureHeader}<main class="dashboard">${workspaceHeading}${this._error ? `<div class="error">${esc(this._error)}</div>` : this._loading ? `<section class="surface empty">Cargando datos de Home Assistant…</section>` : kind === "notifications" ? this._renderNotifications() : this._renderCalendar()}</main></div>`;
  }

  private _renderCalendar() {
    const formatDate = (value: unknown) => {
      const iso = String(value || "");
      const parsed = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00`) : new Date(iso);
      return Number.isNaN(parsed.getTime()) ? iso || "Sin fecha" : new Intl.DateTimeFormat("es-BO", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/La_Paz" }).format(parsed);
    };
    return `<section class="surface calendar-surface"><div class="section-head"><div><span class="eyebrow">Días laborables</span><h3>Calendario</h3></div><span class="muted">${this._calendar.length} registros precargados</span></div>${this._calendar.length ? `<div class="list">${this._calendar.map((item) => `<article class="row"><div><strong>${esc(item.name || item.title || "Día laboral")}</strong><small>${esc(formatDate(item.date))}${item.description ? ` · ${esc(item.description)}` : ""}</small></div><div class="row-actions"><button class="small ${item.active === false ? "is-muted" : "is-active"}" data-action="toggle-calendar" data-id="${esc(item.id ?? item.record_id)}">${item.active === false ? "Activar" : "Activo"}</button>${this._admin() ? `<button class="small danger" data-action="delete-calendar" data-id="${esc(item.id ?? item.record_id)}">Eliminar</button>` : ""}</div></article>`).join("")}</div>` : `<div class="empty">No hay registros configurados.</div>`}<form class="form" data-form="calendar"><input name="date" type="date" required><input name="name" placeholder="Nombre del día" required><input name="description" placeholder="Descripción"><button class="primary" type="submit">Añadir</button></form></section>`;
  }

  private _renderNotifications() {
    return `<section class="surface"><div class="section-head"><div><span class="eyebrow">Reglas activas</span><h3>Notificaciones</h3></div><span class="muted">${this._rules.length} reglas · ${this._targets.length} destinos · ${this._sensors.length} sensores</span></div>${this._rules.length ? `<div class="list">${this._rules.map((rule) => { const id = rule.id ?? rule.rule_id; const enabled = rule.enabled !== false; const target = this._targets[0]; return `<article class="row"><div><strong>${esc(rule.name || rule.title || rule.id || "Regla")}</strong><small>${esc(rule.description || rule.sensor || rule.entity_id || (enabled ? "Activa" : "Desactivada"))}</small></div><div class="row-actions"><button class="small" data-action="toggle-rule" data-id="${esc(id)}" data-enabled="${String(enabled)}">${enabled ? "Desactivar" : "Activar"}</button>${target ? `<button class="small" data-action="test-target" data-key="${esc(target.key ?? target.id ?? target.device_id ?? "")}">Probar</button>` : ""}${this._admin() ? `<button class="small danger" data-action="delete-rule" data-id="${esc(id)}">Eliminar</button>` : ""}</div></article>`; }).join("")}</div>` : `<div class="empty">No hay reglas disponibles.</div>`}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Destinos</span><h3>Canales de aviso</h3></div></div>${this._targets.length ? `<div class="list">${this._targets.map((target) => `<div class="row"><div><strong>${esc(target.name || target.alias || target.key || target.device_id || "Destino")}</strong><small>${esc(target.notify_entity_id || target.legacy_service || target.device_id || "Canal configurado")}</small></div><button class="small" data-action="test-target" data-key="${esc(target.key ?? target.id ?? target.device_id ?? "")}">Enviar prueba</button></div>`).join("")}</div>` : `<div class="empty">No hay destinos configurados.</div>`}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Actividad reciente</span><h3>Historial</h3></div><span class="muted">${this._history.length} eventos</span></div>${this._history.length ? `<div class="list">${this._history.slice(0, 12).map((item) => `<div class="row"><div><strong>${esc(item.title || item.message || item.rule_name || "Aviso")}</strong><small>${esc(item.created_at || item.timestamp || item.date || "")}</small></div></div>`).join("")}</div>` : `<div class="empty">Sin eventos recientes.</div>`}</section>`;
  }

  private _click(event: Event) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-action]"); if (!button) return;
    const action = button.dataset.action;
    if (action === "toggle-menu") this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
    else if (action === "toggle-theme") this._toggleTheme();
    else if (action === "refresh") void this._load();
    else if (action === "toggle-calendar") void this._calendarAction(button.dataset.id || "", button);
    else if (action === "delete-calendar") void this._calendarAction(button.dataset.id || "", button, true);
    else if (action === "toggle-rule") void this._ruleAction("toggle", button.dataset.id || "", button.dataset.enabled === "true");
    else if (action === "test-target") void this._testTarget(button.dataset.key || "");
    else if (action === "delete-rule") void this._ruleAction("delete", button.dataset.id || "");
  }

  private _submit(event: Event) {
    const form = event.target as HTMLFormElement; if (form.dataset.form !== "calendar") return;
    event.preventDefault(); const data = new FormData(form); void this._request("calendario_laboral/add", { date: data.get("date"), name: data.get("name"), description: data.get("description"), active: true }).then(() => this._load()).catch((error) => { this._error = error instanceof Error ? error.message : "No se pudo añadir"; this._render(); });
  }

  private async _calendarAction(id: string, button: HTMLButtonElement, remove = false) {
    if (!id || !this._admin()) return;
    try { const item = this._calendar.find((entry) => String(entry.id ?? entry.record_id) === id); if (remove) await this._request("calendario_laboral/delete", { record_id: id }); else await this._request("calendario_laboral/update", { record_id: id, active: item?.active === false, date: item?.date, name: item?.name || item?.title, description: item?.description || "" }); await this._load(); } catch (error) { this._error = error instanceof Error ? error.message : "No se pudo actualizar"; this._render(); } finally { button.disabled = false; }
  }

  private async _ruleAction(action: "toggle" | "test" | "delete", id: string, enabled = true) {
    if (!id || !this._hass) return;
    try {
      if (action === "toggle") await this._request("witmind_notifications/rules/toggle", { rule_id: id, enabled: !enabled });
      if (action === "test") await this._testTarget("");
      if (action === "delete") { if (!this._admin()) return; await this._request("witmind_notifications/rules/delete", { rule_id: id }); }
      await this._load();
    } catch (error) { this._error = error instanceof Error ? error.message : "No se pudo ejecutar la acción"; this._render(); }
  }

  private async _testTarget(key: string) {
    const target = this._targets.find((item) => String(item.key ?? item.id ?? item.device_id ?? "") === key) || this._targets[0];
    if (!target) return;
    try { await this._request("witmind_notifications/test", { recipient: { device_id: target.device_id, notify_entity_id: target.notify_entity_id, legacy_service: target.legacy_service, name: target.name }, title: "Prueba Witmind", message: `Notificación de prueba para ${target.name || "destino configurado"}.` }); await this._load(); } catch (error) { this._error = error instanceof Error ? error.message : "No se pudo enviar la prueba"; this._render(); }
  }
}

if (!customElements.get("witmind-admin-panel")) customElements.define("witmind-admin-panel", WitmindAdminPanel);
export { WitmindAdminPanel };
