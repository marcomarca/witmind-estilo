import {
  conditionSummary,
  conditionText,
  deriveRuleStatus,
  formatRemaining,
  getHelpTopic,
  normalizeDraft,
  reminderLabel,
  validateRuleDraft,
  validateStep,
} from "./notifications-model.js";
import type {
  ConditionType,
  NotificationCondition,
  NotificationHistoryEvent,
  NotificationMode,
  NotificationRule,
  NotificationRuleDraft,
  NotificationSensor,
  NotificationTarget,
} from "./notifications-types.js";

type AdminPanelConfig = Record<string, any>;
type HassLike = {
  user?: { is_admin?: boolean; name?: string };
  states?: Record<string, any>;
  connection?: {
    sendMessagePromise?: (message: Record<string, unknown>) => Promise<any>;
    subscribeEvents?: (callback: (event: any) => void, eventType?: string) => Promise<(() => void) | void>;
  };
};

const esc = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const asList = (value: any, keys: string[] = []) => {
  if (Array.isArray(value)) return value;
  for (const key of keys) if (Array.isArray(value?.[key])) return value[key];
  return [];
};

const MENU_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>`;
const THEME_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;
const BELL_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></svg>`;
const PHONE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h4"/></svg>`;
const SENSOR_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3v10m0 0a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm3-7h3M15 9h2"/></svg>`;
const EDIT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Zm9.5-12.5 3 3"/></svg>`;
const TRASH_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5"/></svg>`;
const SEND_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m3 11 18-8-8 18-2-8-8-2Zm8 2 5-5"/></svg>`;
const WARNING_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3 2.5 20h19L12 3Zm0 6v5m0 3h.01"/></svg>`;
const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`;

interface HolidayRecord {
  id?: string;
  record_id?: string;
  date: string;
  name: string;
  description?: string;
  active?: boolean;
}

interface CalendarModalState {
  mode: "add" | "edit";
  record_id?: string;
  date: string;
  name: string;
  description: string;
  active: boolean;
  error?: string;
}

class WitmindAdminPanel extends HTMLElement {
  private _hass: HassLike | null = null;
  private _panel: AdminPanelConfig = {};
  private _loaded = false;
  private _loading = false;
  private _busy = false;
  private _error = "";
  private _theme: "dark" | "light" = this._loadTheme();

  // Calendario
  private _calendar: HolidayRecord[] = [];
  private _todayPayload: Record<string, any> | null = null;
  private _year: string = "all";
  private _backendType: "witmind_calendar" | "calendario_laboral" = "witmind_calendar";
  private _modal: CalendarModalState | null = null;
  private _toast: string = "";
  private _toastAction: string = "";
  private _toastTimer: any = null;
  private _undoDeletedRecord: HolidayRecord | null = null;
  private _calendarUnsubscribe?: () => void;

  // Notificaciones
  private _notificationLoaded = false;
  private _notificationLoading = false;
  private _notificationTab: "rules" | "devices" | "history" = "rules";
  private _rules: NotificationRule[] = [];
  private _targets: NotificationTarget[] = [];
  private _sensors: NotificationSensor[] = [];
  private _history: NotificationHistoryEvent[] = [];
  private _historyTypeFilter: string = "all";
  private _historyStatusFilter: string = "all";
  private _historySearch: string = "";
  private _historyLimit: number = 50;

  private _notificationBusy = "";
  private _notificationEditorOpen = false;
  private _notificationEditorStep = 1;
  private _editingRuleId: string | null = null;
  private _ruleDraft: NotificationRuleDraft | null = null;
  private _deleteRuleId: string | null = null;
  private _renameTargetId: string | null = null;
  private _renameValue = "";
  private _renameError = "";
  private _editorError = "";
  private _deleteError = "";
  private _helpTopic: string | null = null;
  private _recoveryAccordionOpen = false;

  private _notificationToast: { message: string; type: "success" | "error" } | null = null;
  private _notificationToastTimer: any = null;
  private _notificationUnsubscribe?: () => void;
  private _notificationRefreshTimer: any = null;
  private _notificationCountdownTimer: any = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.addEventListener("click", (event) => this._click(event));
    this.shadowRoot!.addEventListener("submit", (event) => this._submit(event));
    this.shadowRoot!.addEventListener("input", (event) => this._input(event));
    this.shadowRoot!.addEventListener("change", (event) => this._change(event));
  }

  set hass(value: HassLike | null) {
    const prevSig = this._statesSignature(this._hass);
    this._hass = value;
    if (!this.isConnected) return;
    const nextSig = this._statesSignature(value);

    if (!this.shadowRoot?.querySelector(".admin-shell")) {
      this._render();
      this._applyThemeStyles();
    } else if (prevSig !== nextSig && !this._hasLiveInteraction()) {
      this._render();
      this._applyThemeStyles();
    }

    if (value && !this._isLoadedForKind()) void this._load();
  }
  get hass() { return this._hass; }

  set panel(value: AdminPanelConfig) {
    this._panel = value || {};
    this._loaded = false;
    this._notificationLoaded = false;
    if (this.isConnected) {
      this._render();
      this._applyThemeStyles();
      if (this._hass) void this._load();
    }
  }
  get panel() { return this._panel; }

  set theme(value: string) {
    if (value === "dark" || value === "light") {
      const changed = this._theme !== value;
      this._theme = value;
      this.setAttribute("data-theme", value);
      this._saveTheme();
      if (changed && this.isConnected) {
        this._render();
        this._applyThemeStyles();
      }
    }
  }
  get theme() { return this._theme; }

  connectedCallback() {
    this.setAttribute("data-theme", this._theme);
    this._startCountdownTimer();
    this._render();
    this._applyThemeStyles();
    if (this._hass && !this._isLoadedForKind()) void this._load();
  }

  disconnectedCallback() {
    this._calendarUnsubscribe?.();
    this._calendarUnsubscribe = undefined;
    if (this._notificationUnsubscribe) {
      this._notificationUnsubscribe();
      this._notificationUnsubscribe = undefined;
    }
    clearTimeout(this._toastTimer);
    clearTimeout(this._notificationToastTimer);
    clearTimeout(this._notificationRefreshTimer);
    clearInterval(this._notificationCountdownTimer);
    this._notificationRefreshTimer = null;
    this._notificationCountdownTimer = null;
  }

  private _kind() {
    return String(this._panel.panel_kind || this._panel.panelKind || "calendar").toLowerCase();
  }

  private _isLoadedForKind() {
    return this._kind() === "notifications" ? this._notificationLoaded : this._loaded;
  }

  private _loadTheme(): "dark" | "light" {
    try {
      return localStorage.getItem("witmind-showroom-panel-theme") === "light" ? "light" : "dark";
    } catch (_) {
      return "dark";
    }
  }

  private _saveTheme() {
    try {
      localStorage.setItem("witmind-showroom-panel-theme", this._theme);
    } catch (_) { /* storage optional */ }
  }

  private _toggleTheme() {
    this.theme = this._theme === "dark" ? "light" : "dark";
    this.dispatchEvent(new CustomEvent("witmind-theme-change", { detail: { theme: this._theme }, bubbles: true, composed: true }));
  }

  private _applyThemeStyles() {
    const light = this._theme === "light";
    this.style.color = light ? "#172129" : "";
    this.style.background = light ? "linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)" : "";
  }

  private _title() {
    return this._kind() === "notifications" ? "Notificaciones Witmind" : "Calendario laboral";
  }

  private _subtitle() {
    return this._kind() === "notifications" ? "Centro de avisos" : "Planificación operativa";
  }

  private _admin() {
    return this._hass?.user?.is_admin !== false;
  }

  private _hasLiveModal() {
    return Boolean(this._modal && this.shadowRoot?.querySelector(".modal-backdrop"));
  }

  private _hasLiveInteraction(): boolean {
    if (this._hasLiveModal()) return true;
    if (this._notificationEditorOpen) return true;
    if (this._deleteRuleId) return true;
    if (this._renameTargetId) return true;
    if (this._helpTopic) return true;
    return false;
  }

  private _statesSignature(hass: HassLike | null): string {
    if (!hass?.states) return "";
    if (this._kind() === "notifications") {
      const parts: string[] = [];
      for (const r of this._rules) {
        const s = hass.states[r.source.entity_id];
        if (s) parts.push(`${r.source.entity_id}:${s.state}`);
      }
      if (this._ruleDraft?.source?.entity_id) {
        const s = hass.states[this._ruleDraft.source.entity_id];
        if (s) parts.push(`draft:${this._ruleDraft.source.entity_id}:${s.state}`);
      }
      return parts.join("|");
    }
    const e1 = hass.states["binary_sensor.dia_no_laborable"]?.state || "";
    const e2 = hass.states["binary_sensor.bloqueo_automatizaciones_laborales"]?.state || "";
    const e3 = hass.states["automation.taller_ciclo_10s"]?.state || "";
    return `${e1}:${e2}:${e3}`;
  }

  private async _request(type: string, payload: Record<string, unknown> = {}) {
    const send = this._hass?.connection?.sendMessagePromise;
    if (!send) throw new Error("Conexión de Home Assistant no disponible");
    return send({ type, ...payload });
  }

  private _showToast(message: string, action: string = "") {
    clearTimeout(this._toastTimer);
    this._toast = message;
    this._toastAction = action;
    this._render();
    this._toastTimer = setTimeout(() => {
      this._toast = "";
      this._toastAction = "";
      this._render();
    }, 8000);
  }

  private _showNotificationToast(message: string, type: "success" | "error" = "success") {
    clearTimeout(this._notificationToastTimer);
    this._notificationToast = { message, type };
    if (!this._hasLiveInteraction()) this._render();
    this._notificationToastTimer = setTimeout(() => {
      this._notificationToast = null;
      if (!this._hasLiveInteraction()) this._render();
    }, 5200);
  }

  // -------------------------------------------------------------
  // CARGA Y CICLO DE VIDA DE DATOS
  // -------------------------------------------------------------

  private async _load() {
    if (this._kind() === "notifications") {
      await this._loadNotifications(true);
    } else {
      await this._loadCalendar();
    }
  }

  private async _loadCalendar() {
    if (this._loading) return;
    this._loading = true;
    this._error = "";
    if (!this._hasLiveModal()) this._render();

    try {
      let result: any = null;
      try {
        result = await this._request("witmind_calendar/get");
        this._backendType = "witmind_calendar";
      } catch (_) {
        result = await this._request("calendario_laboral/get");
        this._backendType = "calendario_laboral";
      }

      this._todayPayload = result || {};
      this._calendar = asList(result, ["holidays", "records", "items", "events"])
        .slice()
        .sort((a, b) => String(a?.date || "").localeCompare(String(b?.date || "")));

      if (!this._calendarUnsubscribe && this._hass?.connection?.subscribeEvents) {
        try {
          const unsub1 = await this._hass.connection.subscribeEvents(
            () => void this._loadCalendar(),
            "witmind_calendar_updated"
          );
          const unsub2 = await this._hass.connection.subscribeEvents(
            () => void this._loadCalendar(),
            "calendario_laboral_updated"
          );
          this._calendarUnsubscribe = () => {
            if (typeof unsub1 === "function") unsub1();
            if (typeof unsub2 === "function") unsub2();
          };
        } catch (_) { /* optional */ }
      }
      this._loaded = true;
    } catch (error) {
      this._error = error instanceof Error ? error.message : "No se pudieron cargar los datos del calendario";
    } finally {
      this._loading = false;
      if (!this._hasLiveModal()) this._render();
    }
  }

  private async _loadNotifications(initial = false) {
    if (this._notificationLoading) return;
    this._notificationLoading = true;
    this._error = "";
    if (initial && !this._hasLiveInteraction()) this._render();

    try {
      const [rules, targets, sensors, history] = await Promise.all([
        this._request("witmind_notifications/rules/list"),
        this._request("witmind_notifications/targets/list"),
        this._request("witmind_notifications/sensors/list"),
        this._request("witmind_notifications/history/list", { limit: 150 }),
      ]);
      this._rules = asList(rules, ["rules"]);
      this._targets = asList(targets, ["targets"]);
      this._sensors = asList(sensors, ["sensors"]);
      this._history = asList(history, ["history", "items"]);

      this._subscribeNotificationEvents();
      this._notificationLoaded = true;
    } catch (error) {
      this._error = error instanceof Error ? error.message : "No se pudo conectar con witmind_notifications";
    } finally {
      this._notificationLoading = false;
      if (!this._hasLiveInteraction()) this._render();
    }
  }

  private _subscribeNotificationEvents() {
    if (this._notificationUnsubscribe || !this._hass?.connection?.subscribeEvents) return;
    try {
      void this._hass.connection
        .subscribeEvents(() => this._scheduleNotificationRefresh(), "witmind_notifications_updated")
        .then((unsub) => {
          if (typeof unsub === "function") {
            this._notificationUnsubscribe = unsub;
          }
        });
    } catch (err) {
      console.warn("Witmind Notifications: suscripción de eventos no disponible", err);
    }
  }

  private _scheduleNotificationRefresh() {
    clearTimeout(this._notificationRefreshTimer);
    this._notificationRefreshTimer = setTimeout(() => {
      this._notificationRefreshTimer = null;
      void this._refreshNotificationRuntime();
    }, 80);
  }

  private async _refreshNotificationRuntime() {
    if (!this._hass) return;
    try {
      const [rules, history] = await Promise.all([
        this._request("witmind_notifications/rules/list"),
        this._request("witmind_notifications/history/list", { limit: 150 }),
      ]);
      this._rules = asList(rules, ["rules"]);
      this._history = asList(history, ["history", "items"]);
      if (!this._hasLiveInteraction()) this._render();
    } catch (err) {
      console.warn("Witmind Notifications: no se pudo refrescar el estado runtime", err);
    }
  }

  private _startCountdownTimer() {
    if (this._notificationCountdownTimer) return;
    this._notificationCountdownTimer = setInterval(() => this._updatePendingCountdowns(), 1000);
  }

  private _updatePendingCountdowns() {
    if (!this.shadowRoot) return;
    const now = Date.now();
    for (const node of this.shadowRoot.querySelectorAll<HTMLElement>("[data-pending-until]")) {
      node.textContent = formatRemaining(node.dataset.pendingUntil, now, "procesando…");
    }
    for (const node of this.shadowRoot.querySelectorAll<HTMLElement>("[data-reminder-at]")) {
      node.textContent = formatRemaining(node.dataset.reminderAt, now, "ahora");
    }
    for (const node of this.shadowRoot.querySelectorAll<HTMLElement>("[data-retry-at]")) {
      node.textContent = formatRemaining(node.dataset.retryAt, now, "ahora");
    }
  }

  // -------------------------------------------------------------
  // SENSORES Y DESTINATARIOS
  // -------------------------------------------------------------

  private _preferredSensors(): NotificationSensor[] {
    const rawConfig = this._panel.config || this._panel || {};
    const preferredList: Array<{ entity_id: string; name?: string }> = Array.isArray(rawConfig.preferred_sensors)
      ? rawConfig.preferred_sensors
      : [];
    const preferredMap = new Map(preferredList.map((item, idx) => [item.entity_id, { name: item.name, index: idx }]));

    return this._sensors
      .map((sensor) => {
        const pref = preferredMap.get(sensor.entity_id);
        return {
          ...sensor,
          display_name: pref?.name || sensor.display_name || sensor.name,
          preferred: Boolean(pref),
          preferredIndex: pref?.index ?? 9999,
        };
      })
      .sort((a, b) => {
        if (a.preferred !== b.preferred) return a.preferred ? -1 : 1;
        if (a.preferred && b.preferred) return (a.preferredIndex ?? 0) - (b.preferredIndex ?? 0);
        return String(a.display_name || a.name).localeCompare(String(b.display_name || b.name), "es");
      });
  }

  private _findSensor(entityId?: string): NotificationSensor | null {
    if (!entityId) return null;
    return this._preferredSensors().find((s) => s.entity_id === entityId) || null;
  }

  private _liveSensorValue(sensor: NotificationSensor | null) {
    if (!sensor) return { value: null, raw: "—", unit: "°C", available: false };
    const state = this._hass?.states?.[sensor.entity_id];
    if (!state) {
      return {
        value: sensor.value ?? null,
        raw: sensor.raw_value || "—",
        unit: sensor.unit || "°C",
        available: Boolean(sensor.available),
      };
    }
    const val = Number(state.state);
    const isValidNum = Number.isFinite(val) && !["unknown", "unavailable"].includes(String(state.state));
    return {
      value: isValidNum ? val : null,
      raw: String(state.state),
      unit: String(state.attributes?.unit_of_measurement || sensor.unit || "°C"),
      available: isValidNum,
    };
  }

  private _findTarget(keyOrId?: string): NotificationTarget | null {
    if (!keyOrId) return null;
    return (
      this._targets.find(
        (t) =>
          t.target_id === keyOrId ||
          t.key === keyOrId ||
          t.device_id === keyOrId ||
          t.notify_entity_id === keyOrId ||
          t.legacy_service === keyOrId
      ) || null
    );
  }

  private _isRecipientSelected(target: NotificationTarget): boolean {
    if (!this._ruleDraft?.recipients) return false;
    const targetId = target.target_id || target.key;
    return this._ruleDraft.recipients.some(
      (r) =>
        (r.target_id && r.target_id === targetId) ||
        (r.device_id && target.device_id && r.device_id === target.device_id) ||
        (r.notify_entity_id && target.notify_entity_id && r.notify_entity_id === target.notify_entity_id) ||
        (r.legacy_service && target.legacy_service && r.legacy_service === target.legacy_service)
    );
  }

  // -------------------------------------------------------------
  // BORRADOR DEL WIZARD (DRAFT)
  // -------------------------------------------------------------

  private _newDraft(): NotificationRuleDraft {
    const firstSensor = this._preferredSensors()[0] || null;
    return {
      name: firstSensor ? `Temperatura · ${firstSensor.display_name || firstSensor.name}` : "Alerta de temperatura",
      enabled: true,
      source: {
        entity_id: firstSensor?.entity_id || "",
        display_name: firstSensor?.display_name || firstSensor?.name || "",
        area_name: firstSensor?.area_name || null,
      },
      condition: {
        type: "above",
        threshold: 28.0,
        lower: 18.0,
        upper: 28.0,
        for_seconds: 300,
        hysteresis: 0.5,
      },
      recipients: [],
      message: {
        title: "Alerta de temperatura",
        body: "{sensor} alcanzó {value} {unit}. Umbral: {threshold} {unit}.",
        recovery_title: "",
        recovery_body: "",
      },
      behavior: {
        notification_mode: "once",
        reminder_interval_seconds: 1800,
        notify_recovery: false,
      },
    };
  }

  private _draftFromRule(rule: NotificationRule): NotificationRuleDraft {
    const c = rule.condition || ({} as NotificationCondition);
    const b = (rule.behavior || {}) as any;
    const m = (rule.message || {}) as any;

    let mode: NotificationMode = "once";
    if (["once", "repeat", "daily"].includes(b.notification_mode)) {
      mode = b.notification_mode;
    } else if (Number(b.reminder_interval_seconds ?? b.cooldown_seconds ?? 0) > 0) {
      mode = "repeat";
    }

    return {
      name: rule.name || "",
      enabled: rule.enabled !== false,
      source: {
        entity_id: rule.source?.entity_id || "",
        display_name: rule.source?.display_name || rule.source?.entity_id || "",
        area_name: rule.source?.area_name || null,
      },
      condition: {
        type: c.type || "above",
        threshold: c.threshold ?? 28,
        lower: c.lower ?? 18,
        upper: c.upper ?? 28,
        for_seconds: c.for_seconds ?? 300,
        hysteresis: c.hysteresis ?? 0.5,
      },
      recipients: Array.isArray(rule.recipients) ? JSON.parse(JSON.stringify(rule.recipients)) : [],
      message: {
        title: m.title || rule.name || "Alerta de temperatura",
        body: m.body || "{sensor}: {value} {unit}",
        recovery_title: m.recovery_title || "",
        recovery_body: m.recovery_body || "",
      },
      behavior: {
        notification_mode: mode,
        reminder_interval_seconds: Number(b.reminder_interval_seconds ?? b.cooldown_seconds ?? 1800) || 1800,
        notify_recovery: Boolean(b.notify_recovery),
      },
    };
  }

  // -------------------------------------------------------------
  // RENDERIZADO PRINCIPAL
  // -------------------------------------------------------------

  private _render() {
    if (!this.shadowRoot) return;
    const kind = this._kind();
    this.setAttribute("data-theme", this._theme);
    this.setAttribute("data-kind", kind);
    const now = new Intl.DateTimeFormat("es-BO", { hour: "numeric", minute: "2-digit", timeZone: "America/La_Paz" }).format(new Date());

    const signatureHeader = `
      <header class="topbar signature-topbar">
        <div class="signature-topbar-start">
          <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${MENU_ICON}</button>
          <div class="signature-brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div>
        </div>
        <div class="signature-topbar-end">
          <time class="signature-clock">${esc(now)}</time>
          <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${THEME_ICON}</button>
        </div>
      </header>
    `;

    const isNotifications = kind === "notifications";
    const workspaceHeading = `
      <section class="admin-heading">
        <div>
          <span class="eyebrow">${esc(this._subtitle())}</span>
          <h1>${esc(this._title())}</h1>
          <p>${esc(this._panel.description || (isNotifications ? "Alertas térmicas, destinatarios de la app móvil e historial de incidentes." : "Gestión de días no laborables y pausa de automatizaciones de la empresa."))}</p>
        </div>
        <div class="heading-actions">
          ${!isNotifications && this._admin() ? `<button class="primary" data-action="open-add-modal">+ Añadir feriado</button>` : ""}
          ${isNotifications && this._admin() && this._notificationTab === "rules" ? `<button class="primary" data-action="new-rule">+ Nueva regla</button>` : ""}
          <button class="refresh" data-action="refresh" ${this._loading || this._notificationLoading ? "disabled" : ""}>
            ${this._loading || this._notificationLoading ? "Cargando…" : "Actualizar"}
          </button>
        </div>
      </section>
    `;

    const isLoading = isNotifications ? this._notificationLoading && !this._notificationLoaded : this._loading && !this._calendar.length;

    this.shadowRoot.innerHTML = `
      <style>${this._styles()}</style>
      <div class="admin-shell">
        ${signatureHeader}
        <main class="dashboard">
          ${workspaceHeading}
          ${this._error ? `<div class="error">${esc(this._error)}</div>` : ""}
          ${isLoading ? `<section class="surface empty">Cargando datos de Home Assistant…</section>` : isNotifications ? this._renderNotifications() : this._renderCalendar()}
        </main>
        ${this._modal ? this._renderCalendarModal() : ""}
        ${this._notificationEditorOpen ? this._renderNotificationEditor() : ""}
        ${this._deleteRuleId ? this._renderDeleteRuleModal() : ""}
        ${this._renameTargetId ? this._renderRenameTargetModal() : ""}
        ${this._helpTopic ? this._renderHelpModal() : ""}
        ${this._toast ? `
          <div class="toast-banner">
            <span>${esc(this._toast)}</span>
            ${this._toastAction === "undo" ? `<button class="primary small" data-action="undo-delete">Deshacer</button>` : ""}
          </div>
        ` : ""}
        ${this._notificationToast ? `
          <div class="toast-banner ${this._notificationToast.type}">
            <span>${esc(this._notificationToast.message)}</span>
          </div>
        ` : ""}
      </div>
    `;

    this._updatePendingCountdowns();
  }

  // -------------------------------------------------------------
  // VISTA: NOTIFICACIONES (PARIDAD 1.0.7)
  // -------------------------------------------------------------

  private _renderNotifications() {
    const activeRulesCount = this._rules.filter((r) => r.enabled !== false).length;
    const inAlertCount = this._rules.filter((r) => r.enabled !== false && r.runtime?.active).length;
    const availableTargetsCount = this._targets.filter((t) => t.available).length;
    const totalTargetsCount = this._targets.length;

    const lastSentEvent = this._history.find((h) => h.status === "sent");
    const lastSentText = lastSentEvent
      ? `${this._formatHistoryDate(lastSentEvent.timestamp)} (${lastSentEvent.recipient || lastSentEvent.target || "Destino"})`
      : "Sin envíos recientes";

    return `
      <!-- Métricas de estado general -->
      <section class="hero-status-grid">
        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Reglas Operativas</span>
            <span class="status-badge ${inAlertCount > 0 ? "is-blocked" : "is-working"}">
              ${inAlertCount > 0 ? `${inAlertCount} en alerta` : "Normal"}
            </span>
          </div>
          <div class="status-value">${activeRulesCount} <span style="font-size:15px;font-weight:400;color:var(--wit-muted,#adb4b6);">/ ${this._rules.length} activas</span></div>
          <div class="status-sub">Vigilancia térmica continua</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Dispositivos Móviles</span>
            <span class="status-badge ${availableTargetsCount > 0 ? "is-working" : "is-muted"}">
              ${availableTargetsCount > 0 ? "Conectados" : "Sin canal"}
            </span>
          </div>
          <div class="status-value">${availableTargetsCount} <span style="font-size:15px;font-weight:400;color:var(--wit-muted,#adb4b6);">/ ${totalTargetsCount} disponibles</span></div>
          <div class="status-sub">Integración Mobile App</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Último Aviso</span>
            <span class="status-badge is-muted">Historial</span>
          </div>
          <div class="status-value" style="font-size:16px;line-height:1.3;margin-top:8px;">${esc(lastSentText)}</div>
          <div class="status-sub">${this._history.length} eventos registrados</div>
        </div>
      </section>

      <!-- Pestañas de Navegación -->
      <div class="tab-bar">
        <button class="tab-btn ${this._notificationTab === "rules" ? "active" : ""}" data-action="tab" data-tab="rules">
          Reglas (${this._rules.length})
        </button>
        <button class="tab-btn ${this._notificationTab === "devices" ? "active" : ""}" data-action="tab" data-tab="devices">
          Dispositivos (${this._targets.length})
        </button>
        <button class="tab-btn ${this._notificationTab === "history" ? "active" : ""}" data-action="tab" data-tab="history">
          Historial (${this._history.length})
        </button>
      </div>

      <!-- Contenido de la pestaña activa -->
      ${this._notificationTab === "rules" ? this._renderRulesTab() : ""}
      ${this._notificationTab === "devices" ? this._renderDevicesTab() : ""}
      ${this._notificationTab === "history" ? this._renderHistoryTab() : ""}
    `;
  }

  private _renderRulesTab() {
    if (!this._rules.length) {
      return `
        <section class="surface empty-card">
          <div class="empty-icon">${BELL_ICON}</div>
          <h3>No hay reglas configuradas</h3>
          <p>Crea una regla para vigilar la temperatura de salas técnicas, servidores u oficinas y recibir alertas automáticas en teléfonos autorizados.</p>
          ${this._admin() ? `<button class="primary" data-action="new-rule" style="margin-top:14px;">+ Crear primera regla</button>` : ""}
        </section>
      `;
    }

    return `
      <div class="rule-list">
        ${this._rules.map((rule) => {
          const id = esc(rule.id);
          const sensor = this._findSensor(rule.source?.entity_id);
          const live = this._liveSensorValue(sensor);
          const st = deriveRuleStatus(rule);
          const isBusy = this._notificationBusy === `toggle:${rule.id}`;

          let countdownMarkup = "";
          if (st.countdownType === "retry" && st.countdownValue) {
            countdownMarkup = ` · reintento <span class="runtime-countdown" data-retry-at="${esc(st.countdownValue)}"></span>`;
          } else if (st.countdownType === "reminder" && st.countdownValue) {
            countdownMarkup = ` · recordatorio <span class="runtime-countdown" data-reminder-at="${esc(st.countdownValue)}"></span>`;
          } else if (st.countdownType === "pending" && st.countdownValue) {
            countdownMarkup = ` <span class="runtime-countdown" data-pending-until="${esc(st.countdownValue)}"></span>`;
          }

          const hasStaleRecipient = (rule.recipients || []).some((r) => r.status === "stale_identity" || r.available === false);
          const recipientsList = (rule.recipients || []).map((r) => r.custom_name || r.name || r.notify_entity_id || r.legacy_service).join(" · ");

          return `
            <article class="surface rule-card ${st.status}">
              <div class="rule-card-head">
                <div class="rule-icon">${BELL_ICON}</div>
                <div class="rule-title">
                  <div class="rule-title-line">
                    <h3>${esc(rule.name)}</h3>
                    <span class="status-badge ${st.status}">
                      ${esc(st.label)}${countdownMarkup}
                    </span>
                  </div>
                  <p>${esc(rule.source?.display_name || rule.source?.entity_id)}</p>
                </div>
                <button
                  class="switch-button ${rule.enabled !== false ? "on" : ""}"
                  data-action="toggle-rule"
                  data-id="${id}"
                  data-enabled="${rule.enabled !== false}"
                  ${isBusy ? "disabled" : ""}
                  aria-label="Activar o desactivar regla"
                ><span></span></button>
              </div>

              <div class="rule-metrics">
                <div>
                  <small>Condición</small>
                  <strong>${esc(conditionText(rule.condition))}</strong>
                </div>
                <div>
                  <small>Actual</small>
                  <strong>${live.available ? `${Number(live.value).toFixed(1)} ${esc(live.unit)}` : "—"}</strong>
                </div>
                <div>
                  <small>Avisos</small>
                  <strong>${esc(reminderLabel(rule.behavior))}</strong>
                  <span>${rule.behavior?.notify_recovery ? "Avisa al normalizarse" : "Sin aviso de recuperación"}</span>
                </div>
              </div>

              <div class="rule-footer">
                <span class="recipient-line ${hasStaleRecipient ? "stale-warning" : ""}">
                  ${PHONE_ICON} ${hasStaleRecipient ? `<strong>[Acción Requerida]</strong> ` : ""}${esc(recipientsList || "Sin destinatarios asignados")}
                </span>
                <div class="card-actions">
                  ${this._admin() ? `
                    <button class="small secondary" data-action="edit-rule" data-id="${id}" title="Editar regla">${EDIT_ICON} <span>Editar</span></button>
                    <button class="small danger icon-btn" data-action="delete-rule" data-id="${id}" title="Eliminar regla" aria-label="Eliminar regla">${TRASH_ICON}</button>
                  ` : ""}
                </div>
              </div>

              ${rule.runtime?.last_error ? `
                <div class="inline-error">
                  ${WARNING_ICON}
                  <span>${esc(rule.runtime.last_error)}</span>
                </div>
              ` : ""}
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  private _renderDevicesTab() {
    if (!this._targets.length) {
      return `
        <section class="surface empty-card">
          <div class="empty-icon">${PHONE_ICON}</div>
          <h3>No se detectaron dispositivos de la App Móvil</h3>
          <p>Instala la aplicación oficial de Home Assistant en al menos un smartphone e inicia sesión para registrar un canal de notificación.</p>
        </section>
      `;
    }

    return `
      <div class="device-grid">
        ${this._targets.map((target) => {
          const isBusy = this._notificationBusy === `test:${target.key}`;
          const hardware = [target.manufacturer, target.model].filter(Boolean).join(" · ") || "Aplicación móvil";
          const firmware = target.sw_version ? `Firmware ${target.sw_version}` : "Firmware no informado";
          const endpoint = target.notify_entity_id || target.legacy_service || "Sin endpoint";

          return `
            <article class="surface device-card">
              <div class="device-card-head">
                <div class="device-icon">${PHONE_ICON}</div>
                <div class="device-title">
                  <h3>${esc(target.name)}</h3>
                  ${target.custom_name ? `<small>Home Assistant: ${esc(target.ha_name || "—")}</small>` : ""}
                  <span class="availability-badge ${target.available ? "ok" : "bad"}">
                    ${target.available ? "Disponible" : "No disponible"}
                  </span>
                </div>
                ${this._admin() ? `
                  <button class="small secondary icon-btn device-rename" data-action="rename-target" data-key="${esc(target.target_id || target.key)}" title="Cambiar nombre amigable" aria-label="Cambiar nombre amigable">
                    ${EDIT_ICON}
                  </button>
                ` : ""}
              </div>

              <dl class="device-data">
                <div><dt>Hardware</dt><dd>${esc(hardware)}</dd></div>
                <div><dt>Software</dt><dd>${esc(firmware)}</dd></div>
                ${target.area_name ? `<div><dt>Área</dt><dd>${esc(target.area_name)}</dd></div>` : ""}
                <div><dt>Notificador</dt><dd><code>${esc(endpoint)}</code></dd></div>
                ${target.legacy_service && target.notify_entity_id ? `<div><dt>Compatibilidad</dt><dd><code>${esc(target.legacy_service)}</code></dd></div>` : ""}
              </dl>

              <button
                class="secondary test-button"
                data-action="test-target"
                data-key="${esc(target.key)}"
                ${isBusy ? "disabled" : ""}
              >
                ${SEND_ICON} ${isBusy ? "Enviando prueba…" : "Enviar prueba individual"}
              </button>
            </article>
          `;
        }).join("")}
      </div>
    `;
  }

  private _renderHistoryTab() {
    if (!this._history.length) {
      return `
        <section class="surface empty-card">
          <div class="empty-icon">${BELL_ICON}</div>
          <h3>Sin actividad registrada</h3>
          <p>Las alertas térmicas, recordatorios periódicos, recuperaciones y pruebas de notificación se registrarán aquí.</p>
        </section>
      `;
    }

    const typeF = this._historyTypeFilter;
    const statusF = this._historyStatusFilter;
    const search = this._historySearch.toLowerCase().trim();

    const filtered = this._history.filter((item) => {
      if (typeF !== "all" && item.event_type !== typeF) return false;
      if (statusF !== "all" && item.status !== statusF) return false;
      if (search) {
        const text = `${item.rule_name || ""} ${item.recipient || ""} ${item.target || ""} ${item.error || ""}`.toLowerCase();
        if (!text.includes(search)) return false;
      }
      return true;
    });

    const visibleItems = filtered.slice(0, this._historyLimit);

    return `
      <section class="surface">
        <div class="history-filter-bar">
          <div class="filter-group">
            <span class="eyebrow" style="margin-right:4px;">Tipo:</span>
            <button class="filter-btn ${typeF === "all" ? "active" : ""}" data-action="filter-history-type" data-type="all">Todos</button>
            <button class="filter-btn ${typeF === "alert" ? "active" : ""}" data-action="filter-history-type" data-type="alert">Alertas</button>
            <button class="filter-btn ${typeF === "reminder" ? "active" : ""}" data-action="filter-history-type" data-type="reminder">Recordatorios</button>
            <button class="filter-btn ${typeF === "recovery" ? "active" : ""}" data-action="filter-history-type" data-type="recovery">Recuperaciones</button>
            <button class="filter-btn ${typeF === "test" ? "active" : ""}" data-action="filter-history-type" data-type="test">Pruebas</button>
          </div>

          <div class="filter-group">
            <span class="eyebrow" style="margin-right:4px;">Estado:</span>
            <button class="filter-btn ${statusF === "all" ? "active" : ""}" data-action="filter-history-status" data-status="all">Todos</button>
            <button class="filter-btn ${statusF === "sent" ? "active" : ""}" data-action="filter-history-status" data-status="sent">Enviados</button>
            <button class="filter-btn ${statusF === "error" ? "active" : ""}" data-action="filter-history-status" data-status="error">Errores</button>
          </div>

          <div class="history-search-wrapper">
            <input
              type="search"
              class="history-search-input"
              placeholder="Buscar regla, destinatario o error…"
              value="${esc(this._historySearch)}"
              data-field="history-search"
            />
          </div>
        </div>

        <div class="history-meta-line">
          <span>Mostrando <strong>${visibleItems.length}</strong> de <strong>${filtered.length}</strong> eventos filtrados (de ${this._history.length} en memoria)</span>
        </div>

        ${visibleItems.length ? `
          <div class="history-list">
            ${visibleItems.map((item) => {
              const ok = item.status === "sent";
              let typeLabel = "Alerta";
              if (item.event_type === "reminder") typeLabel = "Recordatorio";
              else if (item.event_type === "recovery") typeLabel = "Recuperación";
              else if (item.event_type === "test") typeLabel = "Prueba manual";

              return `
                <div class="history-row">
                  <span class="history-dot ${ok ? "ok" : "bad"}"></span>
                  <div class="history-main">
                    <div class="history-header-line">
                      <strong>${esc(item.rule_name || typeLabel)}</strong>
                      <span class="history-tag ${item.event_type}">${esc(typeLabel)}</span>
                      <span class="history-status-tag ${ok ? "ok" : "bad"}">${ok ? "Enviado" : "Error"}</span>
                    </div>
                    <small>Destinatario: ${esc(item.recipient || item.target || "Destino")}</small>
                    ${item.error ? `<div class="history-error-code">${esc(item.error)}</div>` : ""}
                  </div>
                  <div class="history-aside">
                    ${item.value != null ? `<strong>${Number(item.value).toFixed(1)} °C</strong>` : ""}
                    <time>${esc(this._formatHistoryDate(item.timestamp))}</time>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
          ${filtered.length > this._historyLimit ? `
            <div style="text-align:center;margin-top:16px;">
              <button class="secondary" data-action="load-more-history">Cargar 50 eventos más</button>
            </div>
          ` : ""}
        ` : `
          <div class="empty">No hay eventos que coincidan con los filtros aplicados.</div>
        `}
      </section>
    `;
  }

  private _formatHistoryDate(timestamp?: string | null): string {
    if (!timestamp) return "—";
    try {
      return new Intl.DateTimeFormat("es-BO", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/La_Paz",
      }).format(new Date(timestamp));
    } catch (_) {
      return String(timestamp);
    }
  }

  // -------------------------------------------------------------
  // MODALES Y DIÁLOGOS DE NOTIFICACIONES
  // -------------------------------------------------------------

  private _renderNotificationEditor() {
    if (!this._notificationEditorOpen || !this._ruleDraft) return "";
    const draft = this._ruleDraft;
    const step = this._notificationEditorStep;
    const isEdit = Boolean(this._editingRuleId);
    const sensor = this._findSensor(draft.source?.entity_id);
    const live = this._liveSensorValue(sensor);

    const stepTitles = ["Sensor", "Condición", "Destinatarios", "Mensaje"];

    return `
      <div class="modal-backdrop" data-action="close-editor-backdrop">
        <div class="modal-card wizard-card" data-editor-card>
          <div class="modal-head">
            <div>
              <span class="eyebrow">${isEdit ? "Editar Alerta" : "Nueva Alerta Térmica"}</span>
              <h3>${isEdit ? esc(draft.name) : "Configurar regla"}</h3>
            </div>
            <button class="small secondary icon-btn" data-action="close-editor" aria-label="Cerrar">✕</button>
          </div>

          <!-- Indicador de pasos del wizard -->
          <div class="wizard-steps">
            ${stepTitles.map((title, idx) => {
              const num = idx + 1;
              const isActive = num === step;
              const isPast = num < step;
              return `
                <div class="wizard-step-item ${isActive ? "active" : ""} ${isPast ? "past" : ""}">
                  <span class="step-num">${isPast ? "✓" : num}</span>
                  <span class="step-label">${title}</span>
                </div>
              `;
            }).join("")}
          </div>

          ${this._editorError ? `<div class="error" data-editor-error style="margin-bottom:14px;">${esc(this._editorError)}</div>` : ""}

          <!-- Cuerpo según el paso activo -->
          <div class="wizard-body">
            ${step === 1 ? this._renderEditorStep1(draft, sensor, live) : ""}
            ${step === 2 ? this._renderEditorStep2(draft) : ""}
            ${step === 3 ? this._renderEditorStep3(draft) : ""}
            ${step === 4 ? this._renderEditorStep4(draft, live) : ""}
          </div>

          <!-- Acciones del pie -->
          <div class="wizard-actions">
            <button type="button" class="secondary" data-action="close-editor">Cancelar</button>
            <div style="display:flex;gap:10px;">
              ${step > 1 ? `<button type="button" class="secondary" data-action="editor-back">Anterior</button>` : ""}
              ${step < 4 ? `<button type="button" class="primary" data-action="editor-next">Siguiente</button>` : `
                <button type="button" class="primary" data-action="save-rule" ${this._notificationBusy === "save" ? "disabled" : ""}>
                  ${CHECK_ICON} ${this._notificationBusy === "save" ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear regla"}
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderEditorStep1(draft: NotificationRuleDraft, sensor: NotificationSensor | null, live: any) {
    const sensors = this._preferredSensors();
    return `
      <div class="editor-section">
        <label class="field-label">Sensor de temperatura a vigilar</label>
        <select class="field-control" data-field="sensor">
          <option value="">Selecciona un sensor…</option>
          ${sensors.map((s) => `
            <option value="${esc(s.entity_id)}" ${s.entity_id === draft.source.entity_id ? "selected" : ""}>
              ${s.preferred ? "★ " : ""}${esc(s.display_name || s.name)} (${esc(s.entity_id)})
            </option>
          `).join("")}
        </select>

        ${sensor ? `
          <div class="sensor-preview-box">
            <div class="sensor-preview-icon">${SENSOR_ICON}</div>
            <div class="sensor-preview-copy">
              <small>${esc(sensor.area_name || sensor.device_name || "Área no asignada")}</small>
              <strong>${esc(sensor.display_name || sensor.name)}</strong>
              <code>${esc(sensor.entity_id)}</code>
            </div>
            <div class="sensor-live-pill">
              <small>Valor en vivo</small>
              <strong>${live.available ? `${Number(live.value).toFixed(1)} ${esc(live.unit)}` : "—"}</strong>
            </div>
          </div>
        ` : `
          <div class="empty" style="padding:16px;">Selecciona un sensor de la lista para previsualizar sus mediciones en tiempo real.</div>
        `}
      </div>
    `;
  }

  private _renderEditorStep2(draft: NotificationRuleDraft) {
    const c = draft.condition;
    const simple = ["above", "below"].includes(c.type);
    const mode = draft.behavior.notification_mode;
    const reminderMinutes = Math.max(1, Math.round(Number(draft.behavior.reminder_interval_seconds || 1800) / 60));
    const durationMinutes = Math.round(Number(c.for_seconds || 0) / 60);

    return `
      <div class="editor-section">
        <div class="field-grid two">
          <label>
            <span class="field-label">Tipo de condición</span>
            <select class="field-control" data-field="condition-type">
              <option value="above" ${c.type === "above" ? "selected" : ""}>Mayor o igual (≥)</option>
              <option value="below" ${c.type === "below" ? "selected" : ""}>Menor o igual (≤)</option>
              <option value="outside" ${c.type === "outside" ? "selected" : ""}>Fuera de rango seguro</option>
              <option value="inside" ${c.type === "inside" ? "selected" : ""}>Dentro de rango específico</option>
            </select>
          </label>

          ${simple ? `
            <label>
              <span class="field-label">Umbral de activación (°C)</span>
              <input type="number" step="0.1" class="field-control" data-field="threshold" value="${esc(c.threshold)}" />
            </label>
          ` : `
            <div class="field-grid two nested">
              <label>
                <span class="field-label">Límite Mín (°C)</span>
                <input type="number" step="0.1" class="field-control" data-field="lower" value="${esc(c.lower)}" />
              </label>
              <label>
                <span class="field-label">Límite Máx (°C)</span>
                <input type="number" step="0.1" class="field-control" data-field="upper" value="${esc(c.upper)}" />
              </label>
            </div>
          `}
        </div>

        <div class="field-grid two" style="margin-top:10px;">
          <div class="field-block">
            <div class="field-label-row">
              <label class="field-label">Durante (minutos)</label>
              <button type="button" class="help-btn" data-action="open-help" data-help="duration" title="Ayuda sobre Durante">?</button>
            </div>
            <input type="number" min="0" step="1" class="field-control" data-field="for-minutes" value="${esc(durationMinutes)}" />
          </div>

          <div class="field-block">
            <div class="field-label-row">
              <label class="field-label">Histéresis (°C)</label>
              <button type="button" class="help-btn" data-action="open-help" data-help="hysteresis" title="Ayuda sobre Histéresis">?</button>
            </div>
            <input type="number" min="0" max="50" step="0.1" class="field-control" data-field="hysteresis" value="${esc(c.hysteresis)}" />
          </div>
        </div>

        <div class="condition-divider"></div>

        <div class="section-mini-head">
          <div>
            <small class="eyebrow">Política de Avisos</small>
            <strong>¿Con qué frecuencia deseas recibir notificaciones?</strong>
          </div>
          <button type="button" class="help-btn" data-action="open-help" data-help="frequency" title="Ayuda sobre frecuencia">?</button>
        </div>

        <div class="field-grid ${mode === "repeat" ? "two" : "one"}" style="margin-top:8px;">
          <label>
            <span class="field-label">Frecuencia de alerta</span>
            <select class="field-control" data-field="notification-mode">
              <option value="once" ${mode === "once" ? "selected" : ""}>Una sola vez por incidencia</option>
              <option value="repeat" ${mode === "repeat" ? "selected" : ""}>Repetir mientras siga activa</option>
              <option value="daily" ${mode === "daily" ? "selected" : ""}>Cada 24 horas mientras siga activa</option>
            </select>
          </label>

          ${mode === "repeat" ? `
            <label>
              <span class="field-label">Repetir cada (minutos)</span>
              <input type="number" min="1" step="1" class="field-control" data-field="reminder-minutes" value="${esc(reminderMinutes)}" />
            </label>
          ` : ""}
        </div>

        <label class="checkbox-row" style="margin-top:14px;">
          <input type="checkbox" data-field="notify-recovery" ${draft.behavior.notify_recovery ? "checked" : ""} />
          <span>
            <strong>Avisarme cuando vuelva a la normalidad</strong>
            <small style="display:block;color:var(--wit-muted,#adb4b6);">Envía un mensaje de confirmación cuando la temperatura regrese al rango seguro.</small>
          </span>
          <button type="button" class="help-btn" data-action="open-help" data-help="recovery" title="Ayuda sobre recuperación">?</button>
        </label>

        <div class="logic-preview-box">
          <span style="color:#34d399;">${CHECK_ICON}</span>
          <span data-logic-preview-text>${esc(conditionSummary(draft))}</span>
        </div>
      </div>
    `;
  }

  private _renderEditorStep3(draft: NotificationRuleDraft) {
    if (!this._targets.length) {
      return `
        <div class="inline-error">
          ${WARNING_ICON}
          <span>No hay dispositivos de la app móvil registrados. No se puede crear o guardar la regla sin destinatarios.</span>
        </div>
      `;
    }

    return `
      <div class="editor-section">
        <label class="field-label">Selecciona los teléfonos autorizados para recibir esta alerta:</label>
        <div class="target-picker">
          ${this._targets.map((target) => {
            const selected = this._isRecipientSelected(target);
            const endpoint = target.notify_entity_id || target.legacy_service;
            const isStaleForDraft = draft.recipients.some(
              (r) => r.device_id === target.device_id && r.status === "stale_identity"
            );

            return `
              <label class="target-option ${selected ? "selected" : ""}">
                <input type="checkbox" data-field="recipient" value="${esc(target.key)}" ${selected ? "checked" : ""} />
                <span class="target-option-icon">${PHONE_ICON}</span>
                <span class="target-option-copy">
                  <strong>${esc(target.name)}</strong>
                  <small>${esc(target.custom_name ? `HA: ${target.ha_name || "—"}` : target.model || "Mobile App")}</small>
                  <code>${esc(endpoint)}</code>
                  ${isStaleForDraft ? `<span class="stale-identity-tag">Requiere confirmación de identidad</span>` : ""}
                </span>
                <span class="availability-dot ${target.available ? "ok" : "bad"}" title="${target.available ? "Disponible" : "No disponible"}"></span>
              </label>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  private _renderEditorStep4(draft: NotificationRuleDraft, live: any) {
    const liveVal = live.available ? Number(live.value).toFixed(1) : "28.5";
    const previewBody = (draft.message.body || "")
      .replaceAll("{sensor}", draft.source.display_name || "Sensor Rack")
      .replaceAll("{value}", liveVal)
      .replaceAll("{unit}", live.unit || "°C")
      .replaceAll("{threshold}", String(draft.condition.threshold ?? `${draft.condition.lower}–${draft.condition.upper}`))
      .replaceAll("{area}", draft.source.area_name || "Sistemas")
      .replaceAll("{time}", "14:30");

    return `
      <div class="editor-section">
        <div class="form-group">
          <label>Nombre interno de la regla</label>
          <input type="text" class="field-control" data-field="rule-name" value="${esc(draft.name)}" maxlength="120" required />
        </div>

        <div class="form-group" style="margin-top:10px;">
          <label>Título de la notificación push</label>
          <input type="text" class="field-control" data-field="message-title" value="${esc(draft.message.title)}" maxlength="240" />
        </div>

        <div class="form-group" style="margin-top:10px;">
          <label>Cuerpo del mensaje</label>
          <textarea class="field-control textarea" data-field="message-body" maxlength="2000" rows="3">${esc(draft.message.body)}</textarea>
        </div>

        <div class="variable-chips">
          <span class="eyebrow" style="font-size:9px;">Variables disponibles:</span>
          <code>{sensor}</code>
          <code>{value}</code>
          <code>{unit}</code>
          <code>{threshold}</code>
          <code>{area}</code>
          <code>{time}</code>
        </div>

        <!-- Vista previa en vivo -->
        <div class="message-preview-card">
          <small class="eyebrow">Vista previa en smartphone</small>
          <strong data-message-preview-title>${esc(draft.message.title || draft.name || "Alerta")}</strong>
          <p data-message-preview-body>${esc(previewBody)}</p>
        </div>

        <!-- Acordeón para mensaje de recuperación opcional -->
        <div class="recovery-accordion ${this._recoveryAccordionOpen ? "open" : ""}">
          <button type="button" class="accordion-head" data-action="toggle-recovery-accordion">
            <span>Mensaje opcional de normalización (recuperación)</span>
            <span>${this._recoveryAccordionOpen ? "▲" : "▼"}</span>
          </button>
          ${this._recoveryAccordionOpen ? `
            <div class="accordion-body">
              <div class="form-group">
                <label>Título al normalizarse</label>
                <input type="text" class="field-control" data-field="recovery-title" value="${esc(draft.message.recovery_title || "")}" placeholder="ej. Temperatura normalizada" maxlength="240" />
              </div>
              <div class="form-group" style="margin-top:8px;">
                <label>Mensaje al normalizarse</label>
                <textarea class="field-control textarea" data-field="recovery-body" rows="2" placeholder="ej. {sensor} regresó a valor seguro ({value} {unit})." maxlength="2000">${esc(draft.message.recovery_body || "")}</textarea>
              </div>
            </div>
          ` : ""}
        </div>

        <label class="checkbox-row" style="margin-top:14px;">
          <input type="checkbox" data-field="rule-enabled" ${draft.enabled ? "checked" : ""} />
          <span>Activar esta regla inmediatamente tras guardar</span>
        </label>
      </div>
    `;
  }

  private _renderDeleteRuleModal() {
    const rule = this._rules.find((r) => r.id === this._deleteRuleId);
    if (!rule) return "";

    return `
      <div class="modal-backdrop" data-action="cancel-delete-rule">
        <div class="modal-card dialog-card" data-delete-card>
          <div class="modal-head">
            <h3>¿Eliminar regla de notificación?</h3>
            <button class="small secondary icon-btn" data-action="cancel-delete-rule">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:14px;line-height:1.5;">
            Se eliminará la regla <strong>"${esc(rule.name)}"</strong>. Esta acción detendrá de inmediato su monitoreo y eliminará sus estados runtime en Home Assistant.
          </p>
          ${this._deleteError ? `<div class="error" data-delete-error>${esc(this._deleteError)}</div>` : ""}
          <div class="modal-actions" style="margin-top:20px;">
            <button class="secondary" data-action="cancel-delete-rule">Cancelar</button>
            <button class="danger" data-action="confirm-delete-rule" ${this._notificationBusy === "delete" ? "disabled" : ""}>
              ${this._notificationBusy === "delete" ? "Eliminando…" : "Eliminar regla"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private _renderRenameTargetModal() {
    const target = this._findTarget(this._renameTargetId || "");
    if (!target) return "";

    return `
      <div class="modal-backdrop" data-action="close-rename-backdrop">
        <div class="modal-card dialog-card" data-rename-card>
          <div class="modal-head">
            <h3>Cambiar nombre amigable</h3>
            <button class="small secondary icon-btn" data-action="close-rename-target">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:13px;line-height:1.5;margin-bottom:12px;">
            Asigna un nombre descriptivo para identificar este teléfono en Witmind (ej. "Teléfono Guardia" o "Móvil Mantenimiento"). No modifica la entidad en Home Assistant.
          </p>
          ${this._renameError ? `<div class="error" data-rename-error style="margin-bottom:12px;">${esc(this._renameError)}</div>` : ""}
          <div class="form-group">
            <label>Nombre amigable (máx 80 caracteres)</label>
            <input type="text" class="field-control" data-field="device-alias" value="${esc(this._renameValue)}" maxlength="80" required />
          </div>
          <div class="modal-actions" style="margin-top:18px;justify-content:space-between;">
            <button class="secondary" data-action="clear-target-alias">Restaurar nombre original</button>
            <div style="display:flex;gap:10px;">
              <button class="secondary" data-action="close-rename-target">Cancelar</button>
              <button class="primary" data-action="save-target-alias" ${this._notificationBusy.startsWith("alias:") ? "disabled" : ""}>
                ${this._notificationBusy.startsWith("alias:") ? "Guardando…" : "Guardar nombre"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderHelpModal() {
    if (!this._helpTopic) return "";
    const topic = getHelpTopic(this._helpTopic);
    if (!topic) return "";

    return `
      <div class="modal-backdrop" data-action="close-help">
        <div class="modal-card dialog-card">
          <div class="modal-head">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="help-symbol">?</span>
              <h3>${esc(topic.title)}</h3>
            </div>
            <button class="small secondary icon-btn" data-action="close-help">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:14px;line-height:1.6;margin:10px 0;">
            ${esc(topic.text)}
          </p>
          <div class="help-example-card">
            <strong>Ejemplo práctico:</strong>
            <p>${esc(topic.example)}</p>
          </div>
          <div class="modal-actions" style="margin-top:16px;">
            <button class="primary" data-action="close-help">Entendido</button>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // VISTA: CALENDARIO LABORAL (PRESERVADA 100%)
  // -------------------------------------------------------------

  private _years(): number[] {
    const rawYears = this._todayPayload?.years;
    if (Array.isArray(rawYears) && rawYears.length) return rawYears;
    const detected = new Set<number>();
    this._calendar.forEach((item) => {
      const y = parseInt(String(item.date || "").slice(0, 4), 10);
      if (!Number.isNaN(y)) detected.add(y);
    });
    return Array.from(detected).sort();
  }

  private _filteredHolidays(): HolidayRecord[] {
    if (this._year === "all") return this._calendar;
    return this._calendar.filter((item) => String(item.date || "").startsWith(`${this._year}-`));
  }

  private _formatDate(value: unknown) {
    const iso = String(value || "");
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(iso) ? new Date(`${iso}T12:00:00`) : new Date(iso);
    return Number.isNaN(parsed.getTime())
      ? iso || "Sin fecha"
      : new Intl.DateTimeFormat("es-BO", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/La_Paz" }).format(parsed);
  }

  private _renderCalendar() {
    const todayData = this._todayPayload || {};
    const isBlocked = Boolean(todayData.is_non_working_day);
    const reason = String(todayData.reason || (isBlocked ? "No laborable" : "Día laboral"));
    const nextH = todayData.next_holiday;

    const states = this._hass?.states || {};
    const tallerState = states["automation.taller_ciclo_10s"]?.state || "inactivo";
    const climaState = states["automation.witmind_bloqueo_laboral_apagado_seguro"]?.state || "activo";
    const centralBlockState = states["binary_sensor.bloqueo_automatizaciones_laborales"]?.state || (isBlocked ? "on" : "off");

    const years = this._years();
    const filtered = this._filteredHolidays();

    return `
      <!-- Tarjetas de estado operativo y observabilidad -->
      <section class="hero-status-grid">
        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Estado de Hoy</span>
            <span class="status-badge ${isBlocked ? "is-blocked" : "is-working"}">
              ${isBlocked ? "Pausado · No laborable" : "Operativo · Día laboral"}
            </span>
          </div>
          <div class="status-value">${esc(reason)}</div>
          <div class="status-sub">Fecha evaluada: ${esc(todayData.today || new Date().toISOString().slice(0, 10))}</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Próximo Feriado</span>
            <span class="status-badge ${nextH ? "is-blocked" : "is-muted"}">
              ${nextH ? esc(this._formatDate(nextH.date)) : "Ninguno"}
            </span>
          </div>
          <div class="status-value">${nextH ? esc(nextH.name) : "Sin feriados activos"}</div>
          <div class="status-sub">${nextH?.description ? esc(nextH.description) : "Pausará automatizaciones laborales"}</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Protección Laboral</span>
            <span class="status-badge ${centralBlockState === "on" ? "is-blocked" : "is-working"}">
              ${centralBlockState === "on" ? "Bloqueo Activo" : "Permisivo"}
            </span>
          </div>
          <div class="status-sub" style="font-size: 11px; line-height: 1.6; margin-top: 4px;">
            • Taller (ciclo 10s): <strong>${esc(tallerState)}</strong><br>
            • Apagado seguro: <strong>${esc(climaState)}</strong><br>
            • Sábado 13:00 / Domingo: <strong>regla activa</strong>
          </div>
        </div>
      </section>

      <!-- Lista de feriados con filtro por año -->
      <section class="surface">
        <div class="section-head">
          <div>
            <span class="eyebrow">Persistencia SQLite 3</span>
            <h3>Días festivos configurados</h3>
          </div>
          <div class="filter-group">
            <button class="filter-btn ${this._year === "all" ? "active" : ""}" data-action="filter-year" data-year="all">Todos (${this._calendar.length})</button>
            ${years.map((y) => `<button class="filter-btn ${this._year === String(y) ? "active" : ""}" data-action="filter-year" data-year="${y}">${y}</button>`).join("")}
          </div>
        </div>

        ${filtered.length ? `
          <div class="list">
            ${filtered.map((item) => {
              const id = esc(item.id ?? item.record_id);
              const isActive = item.active !== false;
              return `
                <article class="row">
                  <div class="row-details">
                    <strong>${esc(item.name || "Feriado")}</strong>
                    <small>${esc(this._formatDate(item.date))}${item.description ? ` · ${esc(item.description)}` : ""}</small>
                  </div>
                  <div class="row-actions">
                    <span class="status-badge ${isActive ? "is-blocked" : "is-muted"}" style="font-size: 10px; padding: 3px 8px;">
                      ${isActive ? "Bloquea" : "Inactivo"}
                    </span>
                    ${this._admin() ? `
                      <button class="small ${isActive ? "is-muted" : "is-active"}" data-action="toggle-calendar" data-id="${id}">
                        ${isActive ? "Desactivar" : "Activar"}
                      </button>
                      <button class="small secondary" data-action="open-edit-modal" data-id="${id}">Editar</button>
                      <button class="small danger" data-action="delete-calendar" data-id="${id}">Eliminar</button>
                    ` : ""}
                  </div>
                </article>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="empty">No hay registros configurados para el filtro seleccionado.</div>
        `}
      </section>
    `;
  }

  private _renderCalendarModal() {
    if (!this._modal) return "";
    const m = this._modal;
    const isAdd = m.mode === "add";
    return `
      <div class="modal-backdrop" data-action="close-modal-backdrop">
        <div class="modal-card">
          <div class="modal-head">
            <h3>${isAdd ? "Añadir feriado" : "Editar feriado"}</h3>
            <button class="small secondary" data-action="close-modal" aria-label="Cerrar">✕</button>
          </div>
          ${m.error ? `<div class="error" style="margin-bottom: 12px;">${esc(m.error)}</div>` : ""}
          <form class="modal-form" data-form="modal-calendar">
            <div class="form-group">
              <label>Fecha (YYYY-MM-DD)</label>
              <input type="date" name="date" value="${esc(m.date)}" required />
            </div>
            <div class="form-group">
              <label>Nombre del día festivo</label>
              <input type="text" name="name" value="${esc(m.name)}" placeholder="ej. Día del Trabajo" required maxlength="120" />
            </div>
            <div class="form-group">
              <label>Descripción o alcance</label>
              <textarea name="description" placeholder="Opcional: información adicional" maxlength="500">${esc(m.description)}</textarea>
            </div>
            <label class="checkbox-row">
              <input type="checkbox" name="active" ${m.active ? "checked" : ""} />
              <span>Activo (pausará las automatizaciones laborales de la empresa)</span>
            </label>
            <div class="modal-actions">
              <button type="button" class="secondary" data-action="close-modal">Cancelar</button>
              <button type="submit" class="primary" ${this._busy ? "disabled" : ""}>
                ${this._busy ? "Guardando…" : isAdd ? "Añadir feriado" : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------
  // MANEJADORES DE ENTRADA Y EVENTOS (INPUT / CHANGE)
  // -------------------------------------------------------------

  private _input(event: Event) {
    const target = event.target as HTMLElement & { value?: string };
    const field = target.dataset.field;
    if (!field) return;
    const value = target.value ?? "";

    if (field === "history-search") {
      this._historySearch = value;
      this._render();
      return;
    }

    if (field === "device-alias") {
      this._renameValue = value;
      this._renameError = "";
      return;
    }

    if (!this._ruleDraft) return;

    if (field === "rule-name") this._ruleDraft.name = value;
    if (field === "threshold") this._ruleDraft.condition.threshold = value;
    if (field === "lower") this._ruleDraft.condition.lower = value;
    if (field === "upper") this._ruleDraft.condition.upper = value;
    if (field === "for-minutes") this._ruleDraft.condition.for_seconds = Math.max(0, Number(value || 0) * 60);
    if (field === "hysteresis") this._ruleDraft.condition.hysteresis = value;
    if (field === "reminder-minutes") this._ruleDraft.behavior.reminder_interval_seconds = Math.max(0, Number(value || 0) * 60);
    if (field === "message-title") this._ruleDraft.message.title = value;
    if (field === "message-body") this._ruleDraft.message.body = value;
    if (field === "recovery-title") this._ruleDraft.message.recovery_title = value;
    if (field === "recovery-body") this._ruleDraft.message.recovery_body = value;

    this._editorError = "";
    this._syncEditorPreviewsInPlace();
  }

  private _change(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const field = target.dataset.field;
    if (!field || !this._ruleDraft) return;

    this._editorError = "";

    if (field === "sensor") {
      const s = this._findSensor(target.value);
      this._ruleDraft.source = {
        entity_id: s?.entity_id || target.value,
        display_name: s?.display_name || s?.name || target.value,
        area_name: s?.area_name || null,
      };
      if (!this._editingRuleId && s) {
        this._ruleDraft.name = `Temperatura · ${s.display_name || s.name}`;
      }
      this._render();
    } else if (field === "condition-type") {
      this._ruleDraft.condition.type = target.value as ConditionType;
      this._render();
    } else if (field === "recipient") {
      const checkbox = target as HTMLInputElement;
      const t = this._findTarget(checkbox.value);
      if (!t) return;
      const targetId = t.target_id || t.key;
      const existingIdx = this._ruleDraft.recipients.findIndex(
        (r) =>
          (r.target_id && r.target_id === targetId) ||
          (r.device_id && t.device_id && r.device_id === t.device_id) ||
          (r.notify_entity_id && t.notify_entity_id && r.notify_entity_id === t.notify_entity_id) ||
          (r.legacy_service && t.legacy_service && r.legacy_service === t.legacy_service)
      );

      if (checkbox.checked && existingIdx === -1) {
        this._ruleDraft.recipients.push({
          target_id: t.target_id || t.key,
          identity_keys: Array.isArray(t.identity_keys) ? [...t.identity_keys] : [],
          device_id: t.device_id,
          notify_entity_id: t.notify_entity_id,
          legacy_service: t.legacy_service,
          name: t.name,
          custom_name: t.custom_name || null,
        });
      } else if (!checkbox.checked && existingIdx !== -1) {
        this._ruleDraft.recipients.splice(existingIdx, 1);
      }

      checkbox.closest(".target-option")?.classList.toggle("selected", checkbox.checked);
    } else if (field === "notification-mode") {
      this._ruleDraft.behavior.notification_mode = ["once", "repeat", "daily"].includes(target.value)
        ? (target.value as NotificationMode)
        : "once";
      if (this._ruleDraft.behavior.notification_mode === "repeat" && Number(this._ruleDraft.behavior.reminder_interval_seconds || 0) <= 0) {
        this._ruleDraft.behavior.reminder_interval_seconds = 1800;
      }
      this._render();
    } else if (field === "notify-recovery") {
      this._ruleDraft.behavior.notify_recovery = (target as HTMLInputElement).checked;
      this._syncEditorPreviewsInPlace();
    } else if (field === "rule-enabled") {
      this._ruleDraft.enabled = (target as HTMLInputElement).checked;
    }
  }

  private _syncEditorPreviewsInPlace() {
    if (!this._ruleDraft || !this.shadowRoot) return;
    const logicNode = this.shadowRoot.querySelector("[data-logic-preview-text]");
    if (logicNode) logicNode.textContent = conditionSummary(this._ruleDraft);

    const titleNode = this.shadowRoot.querySelector("[data-message-preview-title]");
    const bodyNode = this.shadowRoot.querySelector("[data-message-preview-body]");
    if (titleNode) titleNode.textContent = this._ruleDraft.message.title || this._ruleDraft.name || "Alerta";
    if (bodyNode) {
      const sensor = this._findSensor(this._ruleDraft.source?.entity_id);
      const live = this._liveSensorValue(sensor);
      const liveVal = live.available ? Number(live.value).toFixed(1) : "28.5";
      bodyNode.textContent = (this._ruleDraft.message.body || "")
        .replaceAll("{sensor}", this._ruleDraft.source.display_name || "Sensor Rack")
        .replaceAll("{value}", liveVal)
        .replaceAll("{unit}", live.unit || "°C")
        .replaceAll("{threshold}", String(this._ruleDraft.condition.threshold ?? `${this._ruleDraft.condition.lower}–${this._ruleDraft.condition.upper}`))
        .replaceAll("{area}", this._ruleDraft.source.area_name || "Sistemas")
        .replaceAll("{time}", "14:30");
    }
  }

  // -------------------------------------------------------------
  // MANEJADOR DE CLICS (CLICK)
  // -------------------------------------------------------------

  private _click(event: Event) {
    const target = event.target as HTMLElement;

    // Cierre de modales por backdrop
    if (target.dataset.action === "close-modal-backdrop") {
      this._modal = null;
      this._render();
      return;
    }
    if (target.dataset.action === "close-editor-backdrop") {
      if (this._notificationBusy) return;
      this._notificationEditorOpen = false;
      this._ruleDraft = null;
      this._editingRuleId = null;
      this._render();
      return;
    }
    if (target.dataset.action === "cancel-delete-rule") {
      this._deleteRuleId = null;
      this._render();
      return;
    }
    if (target.dataset.action === "close-rename-backdrop" || target.dataset.action === "close-rename-target") {
      this._renameTargetId = null;
      this._renameValue = "";
      this._renameError = "";
      this._render();
      return;
    }
    if (target.dataset.action === "close-help") {
      this._helpTopic = null;
      this._render();
      return;
    }

    const button = target.closest<HTMLButtonElement>("button[data-action]");
    if (!button) return;
    const action = button.dataset.action;

    if (action === "toggle-menu") {
      this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
    } else if (action === "toggle-theme") {
      this._toggleTheme();
    } else if (action === "refresh") {
      void this._load();
    } else if (action === "tab") {
      this._notificationTab = (button.dataset.tab as any) || "rules";
      this._render();
    }

    // Acciones de Notificaciones
    else if (action === "new-rule") {
      this._editingRuleId = null;
      this._ruleDraft = this._newDraft();
      this._notificationEditorStep = 1;
      this._notificationEditorOpen = true;
      this._editorError = "";
      this._recoveryAccordionOpen = false;
      this._render();
    } else if (action === "edit-rule") {
      const id = button.dataset.id;
      const rule = this._rules.find((r) => r.id === id);
      if (rule) {
        this._editingRuleId = id || null;
        this._ruleDraft = this._draftFromRule(rule);
        this._notificationEditorStep = 1;
        this._notificationEditorOpen = true;
        this._editorError = "";
        this._recoveryAccordionOpen = Boolean(this._ruleDraft.message.recovery_title || this._ruleDraft.message.recovery_body);
        this._render();
      }
    } else if (action === "close-editor") {
      if (this._notificationBusy) return;
      this._notificationEditorOpen = false;
      this._ruleDraft = null;
      this._editingRuleId = null;
      this._render();
    } else if (action === "editor-back") {
      this._notificationEditorStep = Math.max(1, this._notificationEditorStep - 1);
      this._editorError = "";
      this._render();
    } else if (action === "editor-next") {
      const err = validateStep(this._notificationEditorStep, this._ruleDraft);
      if (err) {
        this._editorError = err;
        this._render();
        return;
      }
      this._notificationEditorStep = Math.min(4, this._notificationEditorStep + 1);
      this._editorError = "";
      this._render();
    } else if (action === "save-rule") {
      void this._saveNotificationRule();
    } else if (action === "toggle-rule") {
      void this._toggleNotificationRule(button.dataset.id || "", button.dataset.enabled !== "true");
    } else if (action === "delete-rule") {
      this._deleteRuleId = button.dataset.id || null;
      this._deleteError = "";
      this._render();
    } else if (action === "confirm-delete-rule") {
      void this._deleteNotificationRule();
    } else if (action === "test-target") {
      void this._testNotificationTarget(button.dataset.key || "");
    } else if (action === "rename-target") {
      const t = this._findTarget(button.dataset.key);
      if (t) {
        this._renameTargetId = t.target_id || t.key;
        this._renameValue = t.custom_name || "";
        this._renameError = "";
        this._render();
      }
    } else if (action === "save-target-alias") {
      void this._saveTargetAlias(false);
    } else if (action === "clear-target-alias") {
      void this._saveTargetAlias(true);
    } else if (action === "open-help") {
      this._helpTopic = button.dataset.help || null;
      this._render();
    } else if (action === "toggle-recovery-accordion") {
      this._recoveryAccordionOpen = !this._recoveryAccordionOpen;
      this._render();
    } else if (action === "filter-history-type") {
      this._historyTypeFilter = button.dataset.type || "all";
      this._render();
    } else if (action === "filter-history-status") {
      this._historyStatusFilter = button.dataset.status || "all";
      this._render();
    } else if (action === "load-more-history") {
      this._historyLimit += 50;
      this._render();
    }

    // Acciones de Calendario
    else if (action === "filter-year") {
      this._year = button.dataset.year || "all";
      this._render();
    } else if (action === "open-add-modal") {
      this._modal = {
        mode: "add",
        date: new Date().toISOString().slice(0, 10),
        name: "",
        description: "",
        active: true,
      };
      this._render();
    } else if (action === "open-edit-modal") {
      const id = button.dataset.id;
      const item = this._calendar.find((h) => String(h.id ?? h.record_id) === id);
      if (item) {
        this._modal = {
          mode: "edit",
          record_id: id,
          date: item.date,
          name: item.name,
          description: item.description || "",
          active: item.active !== false,
        };
        this._render();
      }
    } else if (action === "close-modal") {
      this._modal = null;
      this._render();
    } else if (action === "toggle-calendar") {
      void this._toggleCalendar(button.dataset.id || "", button);
    } else if (action === "delete-calendar") {
      void this._deleteCalendar(button.dataset.id || "");
    } else if (action === "undo-delete") {
      void this._undoDelete();
    }
  }

  // -------------------------------------------------------------
  // OPERACIONES ASÍNCRONAS DE NOTIFICACIONES
  // -------------------------------------------------------------

  private async _saveNotificationRule() {
    if (!this._ruleDraft || this._notificationBusy) return;
    const validation = validateRuleDraft(this._ruleDraft);
    if (!validation.valid) {
      this._notificationEditorStep = validation.step;
      this._editorError = validation.error;
      this._render();
      return;
    }

    this._notificationBusy = "save";
    this._editorError = "";
    this._render();

    try {
      const payload = normalizeDraft(this._ruleDraft);
      if (this._editingRuleId) {
        await this._request("witmind_notifications/rules/update", {
          rule_id: this._editingRuleId,
          rule: payload,
        });
        this._showNotificationToast(`Regla actualizada: ${payload.name}`);
      } else {
        await this._request("witmind_notifications/rules/create", { rule: payload });
        this._showNotificationToast(`Regla creada: ${payload.name}`);
      }
      this._notificationEditorOpen = false;
      this._ruleDraft = null;
      this._editingRuleId = null;
      await this._loadNotifications();
    } catch (err: any) {
      this._editorError = err.message || "No se pudo guardar la regla";
      this._render();
    } finally {
      this._notificationBusy = "";
      this._render();
    }
  }

  private async _toggleNotificationRule(id: string, enabled: boolean) {
    if (!id || this._notificationBusy) return;
    this._notificationBusy = `toggle:${id}`;
    this._render();
    try {
      await this._request("witmind_notifications/rules/toggle", { rule_id: id, enabled });
      await this._loadNotifications();
    } catch (err: any) {
      this._showNotificationToast(err.message || "No se pudo cambiar el estado de la regla", "error");
    } finally {
      this._notificationBusy = "";
      this._render();
    }
  }

  private async _deleteNotificationRule() {
    if (!this._deleteRuleId || this._notificationBusy) return;
    this._notificationBusy = "delete";
    this._deleteError = "";
    this._render();

    try {
      await this._request("witmind_notifications/rules/delete", { rule_id: this._deleteRuleId });
      this._showNotificationToast("Regla eliminada exitosamente.");
      this._deleteRuleId = null;
      await this._loadNotifications();
    } catch (err: any) {
      this._deleteError = err.message || "No se pudo eliminar la regla";
    } finally {
      this._notificationBusy = "";
      this._render();
    }
  }

  private async _testNotificationTarget(key: string) {
    const target = this._findTarget(key);
    if (!target || this._notificationBusy) return;

    this._notificationBusy = `test:${target.key}`;
    this._render();

    try {
      await this._request("witmind_notifications/test", {
        recipient: {
          device_id: target.device_id,
          notify_entity_id: target.notify_entity_id,
          legacy_service: target.legacy_service,
          name: target.name,
        },
        title: "Prueba Witmind",
        message: `Notificación de prueba enviada a ${target.name}.`,
      });
      this._showNotificationToast(`Prueba enviada a ${target.name}.`);
      await this._refreshNotificationRuntime();
    } catch (err: any) {
      this._showNotificationToast(err.message || `Falló la prueba para ${target.name}`, "error");
    } finally {
      this._notificationBusy = "";
      this._render();
    }
  }

  private async _saveTargetAlias(clear = false) {
    const target = this._findTarget(this._renameTargetId || "");
    if (!target || this._notificationBusy.startsWith("alias:")) return;

    const alias = clear ? "" : String(this._renameValue || "").trim().replace(/\s+/g, " ");
    if (!clear && !alias) {
      this._renameError = "Escribe un nombre o usa 'Restaurar nombre original'.";
      this._render();
      return;
    }
    if (alias.length > 80) {
      this._renameError = "El nombre puede tener como máximo 80 caracteres.";
      this._render();
      return;
    }

    this._notificationBusy = `alias:${target.target_id || target.key}`;
    this._render();

    try {
      await this._request("witmind_notifications/targets/alias/set", {
        target_id: target.target_id || target.key,
        alias,
      });
      this._renameTargetId = null;
      this._renameValue = "";
      this._renameError = "";
      this._showNotificationToast(clear ? "Nombre de Home Assistant restaurado." : "Nombre amigable guardado.");
      await this._loadNotifications();
    } catch (err: any) {
      this._renameError = err.message || "No se pudo guardar el alias";
    } finally {
      this._notificationBusy = "";
      this._render();
    }
  }

  // -------------------------------------------------------------
  // OPERACIONES ASÍNCRONAS DE CALENDARIO
  // -------------------------------------------------------------

  private async _submit(event: Event) {
    const form = event.target as HTMLFormElement;
    if (form.dataset.form !== "modal-calendar" || !this._modal || this._busy) return;
    event.preventDefault();

    const formData = new FormData(form);
    const dateVal = String(formData.get("date") || "").trim();
    const nameVal = String(formData.get("name") || "").trim();
    const descVal = String(formData.get("description") || "").trim();
    const activeVal = formData.get("active") === "on";

    if (!dateVal || !nameVal) {
      if (this._modal) this._modal.error = "Fecha y nombre son obligatorios";
      this._render();
      return;
    }

    this._busy = true;
    const prefix = this._backendType;
    try {
      if (this._modal.mode === "add") {
        await this._request(`${prefix}/add`, {
          date: dateVal,
          name: nameVal,
          description: descVal,
          active: activeVal,
        });
        this._showToast(`Feriado añadido: ${nameVal}`);
      } else {
        await this._request(`${prefix}/update`, {
          record_id: this._modal.record_id,
          date: dateVal,
          name: nameVal,
          description: descVal,
          active: activeVal,
        });
        this._showToast(`Feriado actualizado: ${nameVal}`);
      }
      this._modal = null;
      await this._loadCalendar();
    } catch (err: any) {
      if (this._modal) this._modal.error = err.message || "Error al guardar el feriado";
      this._render();
    } finally {
      this._busy = false;
    }
  }

  private async _toggleCalendar(id: string, button: HTMLButtonElement) {
    if (!id || !this._admin() || this._busy) return;
    const item = this._calendar.find((entry) => String(entry.id ?? entry.record_id) === id);
    if (!item) return;

    this._busy = true;
    button.disabled = true;
    const newActive = item.active === false;
    const prefix = this._backendType;

    try {
      await this._request(`${prefix}/update`, {
        record_id: id,
        active: newActive,
        date: item.date,
        name: item.name,
        description: item.description || "",
      });
      this._showToast(newActive ? `Feriado activado: ${item.name}` : `Feriado pausado: ${item.name}`);
      await this._loadCalendar();
    } catch (err: any) {
      this._showToast(err.message || "No se pudo actualizar");
    } finally {
      this._busy = false;
      button.disabled = false;
    }
  }

  private async _deleteCalendar(id: string) {
    if (!id || !this._admin() || this._busy) return;
    const item = this._calendar.find((entry) => String(entry.id ?? entry.record_id) === id);
    if (!item) return;

    if (!confirm(`¿Eliminar definitivamente el feriado "${item.name}" (${this._formatDate(item.date)})?`)) {
      return;
    }

    this._busy = true;
    const prefix = this._backendType;
    try {
      await this._request(`${prefix}/delete`, { record_id: id });
      this._undoDeletedRecord = item;
      this._showToast(`Eliminado: ${item.name}`, "undo");
      await this._loadCalendar();
    } catch (err: any) {
      this._showToast(err.message || "No se pudo eliminar");
    } finally {
      this._busy = false;
    }
  }

  private async _undoDelete() {
    if (!this._undoDeletedRecord || this._busy) return;
    const rec = this._undoDeletedRecord;
    this._busy = true;
    const prefix = this._backendType;
    try {
      await this._request(`${prefix}/add`, {
        date: rec.date,
        name: rec.name,
        description: rec.description || "",
        active: rec.active !== false,
      });
      this._undoDeletedRecord = null;
      this._showToast(`Feriado restaurado: ${rec.name}`);
      await this._loadCalendar();
    } catch (err: any) {
      this._showToast(err.message || "No se pudo restaurar");
    } finally {
      this._busy = false;
    }
  }

  // -------------------------------------------------------------
  // ESTILOS VISUALES (WITMIND SIGNATURE)
  // -------------------------------------------------------------

  private _styles(): string {
    return `
      :host {
        display: block;
        min-height: 100dvh;
        color: #f5f6f4;
        background: linear-gradient(155deg, #040a0f, #071118 62%, #10191e);
        font-family: Manrope, system-ui, sans-serif;
      }
      * { box-sizing: border-box; }
      button, input, textarea, select { font: inherit; color: inherit; }
      button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
        outline: 2px solid #f26522;
        outline-offset: 2px;
      }
      .admin-shell { min-height: 100dvh; position: relative; }
      .signature-topbar {
        min-height: 80px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        padding: 12px clamp(18px, 2.6vw, 48px);
        position: sticky;
        top: 0;
        z-index: 20;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(7, 17, 24, 0.84);
        backdrop-filter: blur(18px);
      }
      .signature-topbar-start, .signature-topbar-end { display: flex; align-items: center; gap: 12px; }
      .signature-topbar-end { justify-content: flex-end; }
      .signature-brand { display: flex; align-items: baseline; gap: 10px; }
      .signature-brand strong { font-size: 18px; letter-spacing: 0.06em; }
      .signature-brand span { color: #f26522; font-size: 9px; font-weight: 800; }
      .signature-clock { font-size: 28px; font-weight: 600; letter-spacing: -0.05em; }
      .menu-button, .theme-button {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        cursor: pointer;
      }
      .menu-button svg, .theme-button svg { width: 20px; height: 20px; }
      .dashboard { width: min(1200px, 100%); margin: auto; padding: clamp(16px, 3vw, 34px); }
      .admin-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 18px;
        margin: 8px 0 20px;
      }
      .admin-heading h1 { margin: 4px 0 0; font-size: clamp(28px, 4vw, 42px); letter-spacing: -0.04em; line-height: 1.05; }
      .admin-heading p { max-width: 650px; margin: 7px 0 0; color: #adb4b6; font-size: 13px; line-height: 1.55; }
      .heading-actions { display: flex; align-items: center; gap: 10px; }
      .eyebrow { color: #f26522; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }

      /* Tab bar */
      .tab-bar {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 10px;
      }
      .tab-btn {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.04);
        color: #adb4b6;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tab-btn:hover { background: rgba(255, 255, 255, 0.08); color: #f5f6f4; }
      .tab-btn.active {
        background: rgba(242, 101, 34, 0.16);
        border-color: rgba(242, 101, 34, 0.5);
        color: #f26522;
      }

      /* Métricas Hero */
      .hero-status-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr;
        gap: 14px;
        margin-bottom: 20px;
      }
      .status-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: rgba(16, 25, 30, 0.84);
        padding: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .status-card-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .status-badge.is-blocked, .status-badge.alert { background: rgba(242, 101, 34, 0.15); border: 1px solid rgba(242, 101, 34, 0.4); color: #f26522; }
      .status-badge.is-working, .status-badge.normal { background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.35); color: #34d399; }
      .status-badge.is-muted, .status-badge.disabled { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.14); color: #adb4b6; }
      .status-badge.sending, .status-badge.pending { background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; }
      .status-badge.retry { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; }
      .status-value { font-size: clamp(20px, 2.2vw, 28px); font-weight: 700; letter-spacing: -0.03em; margin: 4px 0 0; }
      .status-sub { color: #adb4b6; font-size: 12px; margin-top: 6px; }

      .surface {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: rgba(16, 25, 30, 0.84);
        padding: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        margin-bottom: 16px;
      }
      .section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      .section-head h3 { margin: 4px 0 0; font-size: 17px; }
      .filter-group { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
      .filter-btn {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.04);
        color: #adb4b6;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .filter-btn.active {
        background: rgba(242, 101, 34, 0.15);
        border-color: rgba(242, 101, 34, 0.45);
        color: #f26522;
      }

      /* Reglas Card */
      .rule-list { display: grid; gap: 14px; }
      .rule-card {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(27, 40, 46, 0.72);
        display: grid;
        gap: 16px;
        transition: border-color 0.2s ease;
      }
      .rule-card.alert { border-color: rgba(242, 101, 34, 0.4); box-shadow: 0 0 20px rgba(242, 101, 34, 0.12); }
      .rule-card.retry { border-color: rgba(239, 68, 68, 0.4); }
      .rule-card-head { display: flex; align-items: flex-start; gap: 14px; }
      .rule-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .rule-icon svg { width: 22px; height: 22px; color: #f26522; }
      .rule-title { flex: 1; min-width: 0; }
      .rule-title-line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
      .rule-title-line h3 { margin: 0; font-size: 17px; font-weight: 700; color: #f5f6f4; }
      .rule-title p { margin: 4px 0 0; color: #adb4b6; font-size: 13px; }

      /* Switch iOS-like */
      .switch-button {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.16);
        border: none;
        padding: 2px;
        cursor: pointer;
        position: relative;
        transition: background 0.2s ease;
        flex-shrink: 0;
      }
      .switch-button span {
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #ffffff;
        transition: transform 0.2s ease;
      }
      .switch-button.on { background: #34d399; }
      .switch-button.on span { transform: translateX(20px); }

      .rule-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.4);
      }
      .rule-metrics div { display: flex; flex-direction: column; gap: 2px; }
      .rule-metrics small { color: #adb4b6; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
      .rule-metrics strong { font-size: 14px; font-weight: 700; color: #f5f6f4; }
      .rule-metrics span { font-size: 11px; color: #adb4b6; }

      .rule-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding-top: 12px;
      }
      .recipient-line {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #adb4b6;
      }
      .recipient-line svg { width: 16px; height: 16px; flex-shrink: 0; }
      .card-actions { display: flex; gap: 8px; align-items: center; }
      .card-actions button { display: inline-flex; align-items: center; gap: 6px; }
      .card-actions button svg { width: 15px; height: 15px; flex-shrink: 0; }

      .inline-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        font-size: 12px;
      }
      .inline-error svg { width: 16px; height: 16px; flex-shrink: 0; }

      /* Dispositivos Card */
      .device-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 14px;
      }
      .device-card {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(27, 40, 46, 0.72);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
      }
      .device-card-head { display: flex; align-items: flex-start; gap: 12px; }
      .device-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .device-icon svg { width: 20px; height: 20px; color: #60a5fa; }
      .device-title { flex: 1; min-width: 0; }
      .device-title h3 { margin: 0; font-size: 16px; font-weight: 700; color: #f5f6f4; }
      .device-title small { display: block; color: #adb4b6; font-size: 11px; margin-top: 2px; }
      .availability-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .availability-badge.ok { background: rgba(52, 211, 153, 0.15); color: #34d399; }
      .availability-badge.bad { background: rgba(239, 68, 68, 0.15); color: #f87171; }

      .device-data {
        margin: 0;
        display: grid;
        gap: 6px;
        font-size: 12px;
        padding: 10px 12px;
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.35);
      }
      .device-data div { display: flex; justify-content: space-between; gap: 10px; }
      .device-data dt { color: #adb4b6; }
      .device-data dd { margin: 0; text-align: right; color: #f5f6f4; font-weight: 600; }
      .device-data code { font-size: 11px; color: #60a5fa; }
      .test-button { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; }
      .test-button svg { width: 16px; height: 16px; }

      /* Historial */
      .history-filter-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .history-search-wrapper { flex: 1; min-width: 200px; max-width: 320px; }
      .history-search-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.6);
        color: #f5f6f4;
        font-size: 12px;
      }
      .history-meta-line { font-size: 12px; color: #adb4b6; margin-bottom: 12px; }
      .history-list { display: grid; gap: 8px; }
      .history-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 12px;
        align-items: center;
        padding: 12px 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        background: rgba(27, 40, 46, 0.6);
      }
      .history-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .history-dot.ok { background: #34d399; box-shadow: 0 0 8px rgba(52, 211, 153, 0.5); }
      .history-dot.bad { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.5); }
      .history-main { min-width: 0; }
      .history-header-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .history-header-line strong { font-size: 14px; color: #f5f6f4; }
      .history-tag {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.08);
        color: #adb4b6;
        text-transform: uppercase;
      }
      .history-tag.alert { background: rgba(242, 101, 34, 0.15); color: #f26522; }
      .history-tag.reminder { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
      .history-tag.recovery { background: rgba(52, 211, 153, 0.15); color: #34d399; }
      .history-status-tag { font-size: 10px; font-weight: 700; }
      .history-status-tag.ok { color: #34d399; }
      .history-status-tag.bad { color: #f87171; }
      .history-main small { display: block; color: #adb4b6; font-size: 12px; margin-top: 2px; }
      .history-error-code {
        margin-top: 6px;
        padding: 6px 10px;
        border-radius: 6px;
        background: rgba(239, 68, 68, 0.12);
        color: #fca5a5;
        font-family: monospace;
        font-size: 11px;
        user-select: text;
      }
      .history-aside { text-align: right; }
      .history-aside strong { display: block; font-size: 13px; color: #f5f6f4; }
      .history-aside time { display: block; color: #adb4b6; font-size: 11px; margin-top: 2px; }

      /* Calendario lista */
      .list { display: grid; gap: 9px; }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        background: rgba(27, 40, 46, 0.72);
      }
      .row-details strong { display: block; font-size: 15px; color: #f5f6f4; }
      .row-details small { display: block; margin-top: 4px; color: #adb4b6; font-size: 12px; }
      .row-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }

      /* Botones comunes */
      .refresh, .primary, .danger, .secondary, .small {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 10px 15px;
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .primary { background: #f26522; border-color: #f26522; color: #040a0f; }
      .danger { border-color: rgba(239, 68, 68, 0.5); color: #ff9b9b; background: rgba(239, 68, 68, 0.1); }
      .secondary { background: rgba(255, 255, 255, 0.08); }
      .small { padding: 7px 11px; font-size: 12px; }
      .small.is-active { color: #34d399; border-color: rgba(52, 211, 153, 0.4); }
      .small.is-muted { color: #adb4b6; }
      .icon-btn {
        width: 34px;
        height: 34px;
        min-width: 34px;
        min-height: 34px;
        padding: 0;
        display: inline-grid;
        place-items: center;
        border-radius: 10px;
        flex-shrink: 0;
      }
      .icon-btn svg { width: 16px; height: 16px; display: block; }

      /* Modales */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(4, 10, 15, 0.82);
        backdrop-filter: blur(12px);
        display: grid;
        place-items: center;
        padding: 20px;
        overflow-y: auto;
      }
      .modal-card {
        width: min(540px, 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        background: #0d161d;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        padding: 24px;
        max-height: min(90vh, 90dvh);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .wizard-card { width: min(680px, 100%); }
      .dialog-card { width: min(480px, 100%); }
      .modal-head { flex-shrink: 0; display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
      .modal-head h3 { margin: 2px 0 0; font-size: 20px; color: #f5f6f4; }

      /* Wizard Steps */
      .wizard-steps {
        flex-shrink: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 12px;
      }
      .wizard-step-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #adb4b6;
        font-size: 12px;
        font-weight: 700;
      }
      .wizard-step-item .step-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        display: grid;
        place-items: center;
        font-size: 11px;
        flex-shrink: 0;
      }
      .wizard-step-item.active { color: #f26522; }
      .wizard-step-item.active .step-num { background: #f26522; color: #040a0f; border-color: #f26522; }
      .wizard-step-item.past { color: #34d399; }
      .wizard-step-item.past .step-num { background: rgba(52, 211, 153, 0.15); border-color: #34d399; color: #34d399; }

      .wizard-body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        display: grid;
        gap: 14px;
        padding-right: 4px;
      }
      .wizard-actions {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      /* Form controls */
      .form-group { display: grid; gap: 6px; }
      .form-group label, .field-label { font-size: 11px; font-weight: 700; color: #adb4b6; text-transform: uppercase; letter-spacing: 0.05em; }
      .field-control {
        width: 100%;
        padding: 11px 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.7);
        color: #f5f6f4;
        font-size: 14px;
      }
      .field-control.textarea { min-height: 80px; resize: vertical; }
      .field-grid { display: grid; gap: 12px; }
      .field-grid.two { grid-template-columns: 1fr 1fr; }
      .field-grid.one { grid-template-columns: 1fr; }
      .field-grid.two.nested { grid-template-columns: 1fr 1fr; }
      .field-label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
      .help-btn {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #adb4b6;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        display: inline-grid;
        place-items: center;
      }
      .condition-divider { height: 1px; background: rgba(255, 255, 255, 0.08); margin: 12px 0; }
      .section-mini-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .section-mini-head strong { font-size: 13px; color: #f5f6f4; }
      .checkbox-row { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; font-size: 13px; }
      .checkbox-row input { width: 18px; height: 18px; accent-color: #f26522; cursor: pointer; flex-shrink: 0; }
      .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }

      /* Sensor preview box */
      .sensor-preview-box {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
        margin-top: 10px;
      }
      .sensor-preview-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(242, 101, 34, 0.12); display: grid; place-items: center; flex-shrink: 0; }
      .sensor-preview-icon svg { width: 20px; height: 20px; color: #f26522; }
      .sensor-preview-copy { flex: 1; min-width: 0; }
      .sensor-preview-copy small { display: block; color: #adb4b6; font-size: 11px; }
      .sensor-preview-copy strong { display: block; color: #f5f6f4; font-size: 14px; }
      .sensor-preview-copy code { font-size: 11px; color: #60a5fa; }
      .sensor-live-pill { text-align: right; }
      .sensor-live-pill small { display: block; color: #adb4b6; font-size: 10px; text-transform: uppercase; }
      .sensor-live-pill strong { font-size: 16px; color: #34d399; }

      /* Logic preview box */
      .logic-preview-box {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(52, 211, 153, 0.08);
        border: 1px solid rgba(52, 211, 153, 0.25);
        color: #f5f6f4;
        font-size: 12px;
        line-height: 1.5;
        margin-top: 12px;
      }
      .logic-preview-box svg { width: 18px; height: 18px; flex-shrink: 0; }

      /* Target Picker */
      .target-picker { display: grid; gap: 8px; max-height: 320px; overflow-y: auto; padding-right: 4px; }
      .target-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(4, 10, 15, 0.5);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .target-option:hover { background: rgba(255, 255, 255, 0.04); }
      .target-option.selected { border-color: rgba(242, 101, 34, 0.5); background: rgba(242, 101, 34, 0.08); }
      .target-option input { width: 18px; height: 18px; accent-color: #f26522; cursor: pointer; flex-shrink: 0; }
      .target-option-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 255, 255, 0.06); display: grid; place-items: center; flex-shrink: 0; }
      .target-option-icon svg { width: 16px; height: 16px; color: #60a5fa; }
      .target-option-copy { flex: 1; min-width: 0; }
      .target-option-copy strong { display: block; font-size: 14px; color: #f5f6f4; }
      .target-option-copy small { display: block; color: #adb4b6; font-size: 11px; }
      .target-option-copy code { font-size: 10px; color: #60a5fa; }
      .stale-identity-tag { display: inline-block; font-size: 10px; color: #f87171; background: rgba(239, 68, 68, 0.12); padding: 1px 6px; border-radius: 4px; margin-top: 2px; }
      .availability-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .availability-dot.ok { background: #34d399; }
      .availability-dot.bad { background: #ef4444; }

      /* Variable chips */
      .variable-chips { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
      .variable-chips code {
        padding: 3px 6px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #f26522;
        font-size: 11px;
      }

      /* Smartphone Message Preview */
      .message-preview-card {
        padding: 14px 16px;
        border-radius: 14px;
        background: rgba(4, 10, 15, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 14px;
      }
      .message-preview-card strong { display: block; font-size: 14px; color: #f5f6f4; margin: 4px 0; }
      .message-preview-card p { margin: 0; font-size: 13px; color: #adb4b6; line-height: 1.45; }

      /* Acordeón recuperación */
      .recovery-accordion {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.35);
        margin-top: 14px;
        overflow: hidden;
      }
      .accordion-head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: none;
        border: none;
        color: #adb4b6;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .accordion-head:hover { color: #f5f6f4; }
      .accordion-body { padding: 14px; border-top: 1px solid rgba(255, 255, 255, 0.06); }

      /* Ayuda modal */
      .help-symbol {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(242, 101, 34, 0.15);
        border: 1px solid rgba(242, 101, 34, 0.4);
        color: #f26522;
        display: grid;
        place-items: center;
        font-weight: 800;
      }
      .help-example-card {
        padding: 12px 14px;
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 12px;
        line-height: 1.5;
        color: #adb4b6;
      }
      .help-example-card strong { color: #f26522; display: block; margin-bottom: 2px; }

      /* Toast */
      .toast-banner {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 20px;
        border: 1px solid rgba(242, 101, 34, 0.4);
        border-radius: 14px;
        background: #15222c;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        color: #f5f6f4;
        animation: slideUp 0.25s ease-out;
      }
      .toast-banner.error { border-color: rgba(239, 68, 68, 0.5); background: #2c1515; }
      @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .error { padding: 14px; border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 14px; color: #ff9b9b; background: rgba(100, 20, 20, 0.2); margin-bottom: 16px; }
      .empty { padding: 32px; text-align: center; color: #adb4b6; font-size: 14px; }
      .empty-card { text-align: center; padding: 48px 24px; }
      .empty-icon { width: 56px; height: 56px; border-radius: 50%; background: rgba(255, 255, 255, 0.05); display: grid; place-items: center; margin: 0 auto 16px; }
      .empty-icon svg { width: 28px; height: 28px; color: #adb4b6; }
      .empty-card h3 { font-size: 18px; margin: 0 0 6px; }
      .empty-card p { color: #adb4b6; font-size: 13px; max-width: 480px; margin: 0 auto; line-height: 1.5; }

      /* Light Theme */
      :host([data-theme=light]) { color: #172129; background: linear-gradient(155deg, #f4f7f7, #e9eeee 62%, #dde5e5); }
      :host([data-theme=light]) .signature-topbar { background: rgba(255, 255, 255, 0.9); border-color: rgba(23, 33, 41, 0.12); color: #172129; }
      :host([data-theme=light]) .status-card, :host([data-theme=light]) .surface, :host([data-theme=light]) .rule-card, :host([data-theme=light]) .device-card { background: rgba(255, 255, 255, 0.92); border-color: rgba(23, 33, 41, 0.12); color: #172129; box-shadow: 0 10px 30px rgba(23, 33, 41, 0.06); }
      :host([data-theme=light]) .row { background: rgba(247, 250, 250, 0.95); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .row-details strong, :host([data-theme=light]) .rule-title-line h3, :host([data-theme=light]) .device-title h3 { color: #172129; }
      :host([data-theme=light]) .row-details small, :host([data-theme=light]) .status-sub, :host([data-theme=light]) .admin-heading p, :host([data-theme=light]) .rule-title p { color: #556268; }
      :host([data-theme=light]) .filter-btn, :host([data-theme=light]) .tab-btn { border-color: rgba(23, 33, 41, 0.14); background: rgba(247, 250, 250, 0.96); color: #556268; }
      :host([data-theme=light]) .refresh, :host([data-theme=light]) .secondary { border-color: rgba(23, 33, 41, 0.14); background: rgba(247, 250, 250, 0.96); color: #172129; }
      :host([data-theme=light]) .modal-card { background: #ffffff; border-color: rgba(23, 33, 41, 0.16); color: #172129; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2); }
      :host([data-theme=light]) .field-control, :host([data-theme=light]) .modal-form input, :host([data-theme=light]) .modal-form textarea { background: #f7fafa; border-color: rgba(23, 33, 41, 0.18); color: #172129; }
      :host([data-theme=light]) .toast-banner { background: #ffffff; color: #172129; border-color: rgba(242, 101, 34, 0.4); }

      :host([data-theme=light]) .rule-metrics { background: rgba(235, 241, 242, 0.95); border: 1px solid rgba(23, 33, 41, 0.08); }
      :host([data-theme=light]) .rule-metrics strong { color: #172129; }
      :host([data-theme=light]) .rule-metrics small, :host([data-theme=light]) .rule-metrics span { color: #556268; }

      :host([data-theme=light]) .switch-button:not(.on) { background: rgba(23, 33, 41, 0.22); }
      :host([data-theme=light]) .switch-button:not(.on) span { background: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }

      :host([data-theme=light]) .device-data { background: rgba(235, 241, 242, 0.95); border: 1px solid rgba(23, 33, 41, 0.08); }
      :host([data-theme=light]) .device-data dt { color: #556268; }
      :host([data-theme=light]) .device-data dd { color: #172129; }
      :host([data-theme=light]) .device-data code { color: #1d4ed8; }

      :host([data-theme=light]) .target-option { background: rgba(240, 244, 244, 0.9); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .target-option:hover { background: rgba(230, 237, 237, 1); }
      :host([data-theme=light]) .target-option.selected { background: rgba(242, 101, 34, 0.1); border-color: rgba(242, 101, 34, 0.6); }
      :host([data-theme=light]) .target-option-copy strong { color: #172129; }
      :host([data-theme=light]) .target-option-copy small { color: #556268; }

      :host([data-theme=light]) .logic-preview-box { background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.4); color: #064e3b; }
      :host([data-theme=light]) .sensor-preview-box { background: rgba(235, 241, 242, 0.95); border-color: rgba(23, 33, 41, 0.1); }
      :host([data-theme=light]) .sensor-preview-copy strong { color: #172129; }
      :host([data-theme=light]) .sensor-preview-copy small { color: #556268; }
      :host([data-theme=light]) .sensor-live-pill strong { color: #047857; }

      :host([data-theme=light]) .message-preview-card { background: rgba(235, 241, 242, 0.95); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .message-preview-card strong { color: #172129; }
      :host([data-theme=light]) .message-preview-card p { color: #334155; }

      :host([data-theme=light]) .history-row { background: rgba(255, 255, 255, 0.95); border-color: rgba(23, 33, 41, 0.1); }
      :host([data-theme=light]) .history-header-line strong { color: #172129; }
      :host([data-theme=light]) .history-main small { color: #556268; }
      :host([data-theme=light]) .history-aside strong { color: #172129; }
      :host([data-theme=light]) .history-aside time { color: #556268; }
      :host([data-theme=light]) .history-search-input { background: #ffffff; color: #172129; border-color: rgba(23, 33, 41, 0.18); }
      :host([data-theme=light]) .history-meta-line { color: #556268; }
      :host([data-theme=light]) .help-btn { background: rgba(23, 33, 41, 0.08); border-color: rgba(23, 33, 41, 0.18); color: #556268; }

      @media (max-width: 860px) {
        .hero-status-grid { grid-template-columns: 1fr; }
        .wizard-steps { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 760px) {
        .signature-topbar { min-height: 68px; padding: 10px 14px; }
        .signature-brand { gap: 0; }
        .signature-brand span { display: none; }
        .signature-clock { font-size: 24px; }
        .dashboard { padding: 16px 14px 90px; }
        .admin-heading { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .heading-actions { justify-content: flex-start; }
        .row { grid-template-columns: 1fr; gap: 10px; }
        .row-actions { justify-content: flex-start; }
        .field-grid.two { grid-template-columns: 1fr; }
        .history-filter-bar { flex-direction: column; align-items: flex-start; }
        .history-search-wrapper { max-width: 100%; width: 100%; }
        .history-row { grid-template-columns: auto 1fr; }
        .history-aside { grid-column: 2; text-align: left; margin-top: 4px; }
        .modal-backdrop { padding: 12px 10px; }
        .modal-card { padding: 18px 16px; border-radius: 20px; }
        .device-grid { grid-template-columns: 1fr; }
        .rule-footer { flex-direction: column; align-items: flex-start; gap: 10px; }
        .card-actions { width: 100%; justify-content: flex-end; }
      }
    `;
  }
}

if (!customElements.get("witmind-admin-panel")) customElements.define("witmind-admin-panel", WitmindAdminPanel);
export { WitmindAdminPanel };
