/*
 * Witmind UI Panel bridge for Home Assistant.
 * Keep this file dependency-free and stable: HA loads it from /local/www.
 * The visual application is versioned separately under releases/<version>/.
 */
(function () {
  "use strict";

  const PROTOCOL = 1;
  const DEV_TIMEOUT_MS = 4000;
  const READY_TIMEOUT_MS = 8000;
  const DEFAULT_CONFIG = Object.freeze({
    app_base: "/local/witmind-ui",
    dev_url: "http://192.168.20.44:5174/witmind-ui.html",
    mode: "STABLE",
    version: ""
  });

  const asOrigin = (url) => {
    try { return new URL(url, window.location.href).origin; } catch (_) { return window.location.origin; }
  };

  class WitmindUiPanel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._hass = null;
      this._panel = {};
      this._narrow = false;
      this._iframe = null;
      this._ready = false;
      this._stableUrl = "";
      this._mode = "STABLE";
      this._entityIds = new Set();
      this._lastSentStates = new Map();
      this._subscriptions = new Map();
      this._readyTimer = null;
      this._loadRequestId = 0;
      this._panelSignature = this._signature(this._panel);
      this._frameUrl = "";
      this._initSent = false;
      this._messageHandler = (event) => this._onMessage(event);
      this._render();
    }

    _render() {
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; width: 100%; min-height: 100dvh; background: var(--primary-background-color, #071118); }
          .frame { position: relative; width: 100%; min-height: 100dvh; }
          iframe { display: block; width: 100%; height: 100dvh; min-height: 640px; border: 0; background: var(--primary-background-color, #071118); }
          .status { position: fixed; inset: 50% auto auto 50%; width: min(640px, calc(100vw - 40px)); transform: translate(-50%, -50%); z-index: 2; color: var(--primary-text-color, #f5f6f4); font: 500 13px/1.5 Manrope, system-ui, sans-serif; text-align: center; white-space: pre-wrap; pointer-events: none; }
        </style>
        <div class="frame"><div class="status" aria-live="polite">Cargando Witmind UI…</div></div>`;
    }

    set hass(value) {
      this._hass = value || null;
      this._sendEntitySnapshot();
    }
    get hass() { return this._hass; }
    set panel(value) {
      const next = value || {};
      const signature = this._signature(next);
      if (signature === this._panelSignature) return;
      this._panel = next;
      this._panelSignature = signature;
      if (!this.isConnected) return;
      if (this._iframe && this._ready) {
        this._initSent = false;
        this._sendInit();
        return;
      }
      this._loadFrame();
    }
    get panel() { return this._panel; }
    set narrow(value) {
      this._narrow = Boolean(value);
      this.toggleAttribute("narrow", this._narrow);
    }
    get narrow() { return this._narrow; }

    _signature(value) {
      try { return JSON.stringify(value || {}); } catch (_) { return String(value); }
    }

    connectedCallback() {
      window.addEventListener("message", this._messageHandler);
      this._loadFrame();
    }
    disconnectedCallback() {
      window.removeEventListener("message", this._messageHandler);
      for (const unsubscribe of this._subscriptions.values()) if (typeof unsubscribe === "function") unsubscribe();
      this._subscriptions.clear();
      window.clearTimeout(this._readyTimer);
      if (this._iframe) this._iframe.src = "about:blank";
      this._frameUrl = "";
      this._initSent = false;
    }

    _config() {
      const panel = this._panel || {};
      const first = panel.config && typeof panel.config === "object" ? panel.config : panel;
      const config = first.config && typeof first.config === "object" ? first.config : first;
      const merged = { ...DEFAULT_CONFIG, ...config };
      // El tag propio del panel es la fuente de verdad si HA no conserva
      // `panel_kind` dentro de la configuración serializada.
      if (["witmind-lobby-panel", "witmind-lobby"].includes(this.localName)) merged.panel_kind = "lobby";
      if (["witmind-general-panel", "witmind-general"].includes(this.localName)) merged.panel_kind = "general";
      if (["oficinas-panel", "witmind-oficinas-panel"].includes(this.localName)) merged.panel_kind = "offices";
      if (["sala-grabacion-panel", "witmind-grabacion-panel"].includes(this.localName)) merged.panel_kind = "recording";
      if (["calendario-laboral-panel", "witmind-calendario-panel", "witmind-calendario-laboral-panel"].includes(this.localName)) merged.panel_kind = "calendar";
      if (["notifications-panel", "witmind-notifications-panel"].includes(this.localName)) merged.panel_kind = "notifications";
      if (["control-general-panel", "witmind-control-panel"].includes(this.localName)) merged.panel_kind = "control";
      if (["witmind-energy-panel", "witmind-energia-panel"].includes(this.localName)) merged.panel_kind = "energy";
      if (["witmind-lobby-panel", "witmind-lobby"].includes(this.localName)) merged.panel_id = "lobby";
      if (["witmind-general-panel", "witmind-general"].includes(this.localName)) merged.panel_id = "general";
      if (["oficinas-panel", "witmind-oficinas-panel"].includes(this.localName)) merged.panel_id = "offices";
      if (["sala-grabacion-panel", "witmind-grabacion-panel"].includes(this.localName)) merged.panel_id = "recording";
      if (["calendario-laboral-panel", "witmind-calendario-panel", "witmind-calendario-laboral-panel"].includes(this.localName)) merged.panel_id = "calendar";
      if (["notifications-panel", "witmind-notifications-panel"].includes(this.localName)) merged.panel_id = "notifications";
      if (["control-general-panel", "witmind-control-panel"].includes(this.localName)) merged.panel_id = "control";
      if (["witmind-energy-panel", "witmind-energia-panel"].includes(this.localName)) merged.panel_id = "energy";
      if (["witmind-ui-panel", "witmind-showroom-panel", "witmind-showroom"].includes(this.localName) && !merged.panel_id) merged.panel_id = "showroom";
      return merged;
    }
    _storage(key) {
      try { return window.localStorage.getItem(key) || ""; } catch (_) { return ""; }
    }
    _effectiveMode(config) {
    const selected = (this._storage("witmind_ui_mode") || config.default_mode || config.mode || "STABLE").toUpperCase();
      return ["STABLE", "DEV", "PREVIEW"].includes(selected) ? selected : "STABLE";
    }
    async _stableSource(config) {
      const base = String(config.app_base || DEFAULT_CONFIG.app_base).replace(/\/$/, "");
      const response = await fetch(`${base}/current.json`, { cache: "no-store" });
      if (!response.ok) throw new Error(`current.json HTTP ${response.status}`);
      const manifest = await response.json();
      const version = String(manifest.version || config.fallback_release || config.version || "").trim();
      if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(version)) throw new Error("Versión estable inválida");
      return `${base}/releases/${encodeURIComponent(version)}/index.html`;
    }
    async _loadFrame() {
      if (!this.isConnected) return;
      const loadRequestId = ++this._loadRequestId;
      const config = this._config();
      this._mode = this._effectiveMode(config);
      this._ready = false;
      window.clearTimeout(this._readyTimer);
      this._setStatus("Cargando Witmind UI…");
      console.info("[Witmind UI] Cargando panel", {
        title: config.title || config.panel_kind || "Witmind",
        mode: this._mode,
        appBase: config.app_base || DEFAULT_CONFIG.app_base,
      });
      try {
        this._stableUrl = await this._stableSource(config);
      } catch (error) {
        this._stableUrl = `${String(config.app_base || DEFAULT_CONFIG.app_base).replace(/\/$/, "")}/releases/${encodeURIComponent(config.fallback_release || config.version || "0.1.0")}/index.html`;
        this._setStatus("No se pudo leer current.json; usando versión configurada.");
        console.error("[Witmind UI] No se pudo leer current.json", error);
      }
      if (loadRequestId !== this._loadRequestId) return;
      const target = this._mode === "DEV"
        ? (this._storage("witmind_ui_dev_url") || config.dev_url)
        : this._mode === "PREVIEW"
          ? `${String(config.app_base || DEFAULT_CONFIG.app_base).replace(/\/$/, "")}/releases/${encodeURIComponent(this._storage("witmind_ui_preview_version") || config.fallback_release || config.version || "0.1.0")}/index.html`
          : this._stableUrl;
      if (this._mode === "DEV" && !(await this._probeDev(target))) {
        if (loadRequestId !== this._loadRequestId) return;
        this._mode = "STABLE";
        this._setStatus("DEV no disponible; usando STABLE.");
        console.warn("[Witmind UI] DEV no disponible; se usa STABLE", { target, stable: this._stableUrl });
        this._mountFrame(this._stableUrl, false);
        return;
      }
      console.info("[Witmind UI] Iframe seleccionado", { mode: this._mode, target });
      this._mountFrame(target, this._mode === "DEV");
    }
    async _probeDev(url) {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 1500);
      try {
        await fetch(url, { cache: "no-store", mode: "no-cors", signal: controller.signal });
        return true;
      } catch (_) {
        return false;
      } finally {
        window.clearTimeout(timeout);
      }
    }
    _mountFrame(url, allowFallback) {
      if (!this._iframe) {
        this._iframe = document.createElement("iframe");
        this._iframe.title = "Witmind UI";
        this._iframe.setAttribute("allow", "fullscreen");
        this._iframe.addEventListener("load", () => {
          this._sendInit();
          window.clearTimeout(this._readyTimer);
          this._readyTimer = window.setTimeout(() => {
            if (this._ready) return;
            const url = this._iframe?.src || this._stableUrl || "desconocida";
            const message = `La interfaz no respondió al bridge. Verifica que el HTML y sus assets carguen: ${url}`;
            this._setStatus(message);
            console.error("[Witmind UI] WITMIND_READY no recibido", { url, mode: this._mode });
          }, READY_TIMEOUT_MS);
        });
        this._iframe.addEventListener("error", () => {
          const url = this._iframe?.src || this._stableUrl || "desconocida";
          this._setStatus(`No se pudo cargar la interfaz Witmind: ${url}`);
          console.error("[Witmind UI] Error cargando iframe", { url });
        });
        this.shadowRoot.querySelector(".frame")?.append(this._iframe);
      }
      this._iframe.dataset.allowFallback = allowFallback ? "1" : "0";
      this._iframe.dataset.targetOrigin = asOrigin(url);
      this._frameUrl = url;
      this._initSent = false;
      this._iframe.src = url;
      if (allowFallback) window.setTimeout(() => {
        if (!this._ready && this._iframe?.dataset.allowFallback === "1") {
          this._iframe.dataset.allowFallback = "0";
          this._mode = "STABLE";
          this._setStatus("DEV no disponible; usando STABLE.");
          this._frameUrl = this._stableUrl;
          this._initSent = false;
          this._iframe.src = this._stableUrl;
        }
      }, DEV_TIMEOUT_MS);
    }
    _setStatus(text) {
      const node = this.shadowRoot.querySelector(".status");
      if (node) node.textContent = text;
    }
    _post(message) {
      if (!this._iframe?.contentWindow) return;
      this._iframe.contentWindow.postMessage({ protocol: PROTOCOL, source: "witmind-ha", ...message }, this._iframe.dataset.targetOrigin || "*");
    }
    _sendInit() {
      if (this._initSent) return;
      this._initSent = true;
      this._post({ type: "WITMIND_INIT", mode: this._mode, narrow: this._narrow, theme: this._hass?.selectedTheme || null, user: { is_admin: Boolean(this._hass?.user?.is_admin), name: this._hass?.user?.name || "" }, panelConfig: this._config() });
      this._sendEntitySnapshot();
    }
    _sendEntitySnapshot() {
      if (!this._ready || !this._hass?.states) return;
      const states = {};
      const removed = [];
      for (const id of this._entityIds) {
        const next = this._hass.states[id];
        const previous = this._lastSentStates.get(id);
        if (next && next !== previous) {
          states[id] = next;
          this._lastSentStates.set(id, next);
        } else if (!next && previous) {
          removed.push(id);
          this._lastSentStates.delete(id);
        }
      }
      if (Object.keys(states).length || removed.length) {
        this._post({ type: "WITMIND_ENTITY_UPDATE", states, removed });
        this._post({ type: "WITMIND_ENTITY_STATES", states, removed });
      }
    }
    _validSource(event) {
      if (!this._iframe || event.source !== this._iframe.contentWindow) return false;
      const target = this._iframe.dataset.targetOrigin;
      return target === "*" || event.origin === target;
    }
    async _onMessage(event) {
      if (!this._validSource(event)) return;
      const message = event.data || {};
      if (message.protocol !== PROTOCOL || message.source !== "witmind-ui") return;
      if (message.type === "WITMIND_READY") {
        this._ready = true;
        window.clearTimeout(this._readyTimer);
        this._setStatus("");
        console.info("[Witmind UI] Bridge conectado", { mode: this._mode });
        this._sendInit();
        return;
      }
      if (message.type === "WITMIND_SUBSCRIBE_ENTITIES") {
        this._entityIds = new Set(Array.isArray(message.entityIds) ? message.entityIds.filter((id) => typeof id === "string" && id.includes(".")) : []);
        this._lastSentStates.clear();
        this._sendEntitySnapshot();
        return;
      }
      if (message.type === "WITMIND_CALL_SERVICE") {
        const [domain, service] = String(message.service || "").split(".");
        const requestId = message.requestId;
        try {
          if (!domain || !service || !this._hass?.callService) throw new Error("Servicio HA no disponible");
          const result = await this._hass.callService(domain, service, message.serviceData || {}, message.target || undefined);
          this._post({ type: "WITMIND_SERVICE_RESULT", requestId, ok: true, result });
        } catch (error) {
          this._post({ type: "WITMIND_SERVICE_RESULT", requestId, ok: false, error: String(error?.message || error) });
        }
        return;
      }
      if (message.type === "WITMIND_DB_REQUEST") {
        await this._handleDbRequest(message);
        return;
      }
      if (message.type === "WITMIND_HA_COMMAND") {
        await this._handleHaCommand(message);
        return;
      }
      if (message.type === "WITMIND_HA_SUBSCRIBE") {
        await this._handleHaSubscribe(message);
        return;
      }
      if (message.type === "WITMIND_HA_UNSUBSCRIBE") {
        const unsubscribe = this._subscriptions.get(message.requestId);
        if (unsubscribe) unsubscribe();
        this._subscriptions.delete(message.requestId);
        return;
      }
      if (message.type === "WITMIND_TOGGLE_MENU") this.dispatchEvent(new CustomEvent("hass-toggle-menu", { bubbles: true, composed: true }));
      if (message.type === "WITMIND_SET_CONNECTION_MODE") this._mode = String(message.mode || this._mode).toUpperCase();
      if (message.type === "WITMIND_THEME_CHANGED") this._post({ type: "WITMIND_THEME", theme: message.theme || null });
    }
    async _handleDbRequest(message) {
      const requestId = message.requestId;
      try {
        if (!this._hass?.connection?.sendMessagePromise) throw new Error("DB bridge no disponible");
        const command = String(message.command || "");
        const allowed = /^(witmind_core\/(ping|db\/info|kv\/(get|set|delete|list)|doc\/(get|upsert|delete|list)))$/;
        if (!allowed.test(command)) throw new Error("Comando DB no permitido");
        const result = await this._hass.connection.sendMessagePromise({ type: command, ...message.payload });
        this._post({ type: "WITMIND_DB_RESULT", requestId, ok: true, result });
      } catch (error) {
        this._post({ type: "WITMIND_DB_RESULT", requestId, ok: false, error: String(error?.message || error) });
      }
    }
    async _handleHaCommand(message) {
      const requestId = message.requestId;
      try {
        if (!this._hass?.connection?.sendMessagePromise) throw new Error("Conexión HA no disponible");
        const type = String(message.command || "");
        const allowed = [
          "recorder/get_statistics_metadata", "recorder/statistics_during_period",
          "history/history_during_period",
          "calendario_laboral/get", "calendario_laboral/update", "calendario_laboral/delete", "calendario_laboral/add",
          "witmind_notifications/rules/list", "witmind_notifications/targets/list", "witmind_notifications/sensors/list", "witmind_notifications/history/list",
          "witmind_notifications/targets/alias/set", "witmind_notifications/rules/create", "witmind_notifications/rules/update", "witmind_notifications/rules/toggle", "witmind_notifications/rules/delete", "witmind_notifications/test",
        ];
        if (!allowed.includes(type)) throw new Error("Comando HA no permitido");
        const result = await this._hass.connection.sendMessagePromise({ type, ...(message.payload || {}) });
        this._post({ type: "WITMIND_HA_RESULT", requestId, ok: true, result });
      } catch (error) {
        this._post({ type: "WITMIND_HA_RESULT", requestId, ok: false, error: String(error?.message || error) });
      }
    }
    async _handleHaSubscribe(message) {
      const requestId = message.requestId;
      try {
        if (!this._hass?.connection?.subscribeMessage) throw new Error("Suscripciones HA no disponibles");
        const type = String(message.command || "");
        if (type !== "weather/subscribe_forecast") throw new Error("Suscripción HA no permitida");
        const unsubscribe = await this._hass.connection.subscribeMessage(
          (event) => this._post({ type: "WITMIND_HA_EVENT", requestId, result: event }),
          { type, ...(message.payload || {}) },
        );
        this._subscriptions.set(requestId, unsubscribe);
        this._post({ type: "WITMIND_HA_SUBSCRIBED", requestId, ok: true });
      } catch (error) {
        this._post({ type: "WITMIND_HA_SUBSCRIBED", requestId, ok: false, error: String(error?.message || error) });
      }
    }
  }

  // Home Assistant usa el valor `name` de cada entrada panel_custom como tag
  // del elemento. El Lobby conserva su nombre propio, pero comparte el mismo
  // bridge y la misma UI aislada que Witmind Next.
  if (!customElements.get("witmind-ui-panel")) customElements.define("witmind-ui-panel", WitmindUiPanel);
  const defineAlias = (tag) => {
    if (!customElements.get(tag)) customElements.define(tag, class WitmindUiPanelAlias extends WitmindUiPanel {});
  };
  [
    "witmind-showroom-panel", "witmind-showroom",
    "witmind-lobby-panel", "witmind-lobby",
    "witmind-general-panel", "witmind-general",
    "oficinas-panel", "witmind-oficinas-panel",
    "sala-grabacion-panel", "witmind-grabacion-panel",
    "calendario-laboral-panel", "witmind-calendario-panel", "witmind-calendario-laboral-panel",
    "notifications-panel", "witmind-notifications-panel",
    "control-general-panel", "witmind-control-panel",
    "witmind-energy-panel", "witmind-energia-panel",
  ].forEach(defineAlias);
})();
