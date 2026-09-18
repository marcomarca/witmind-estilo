import "./showroom-panel.js";
import "./witmind-operations-panel.ts";
import "./witmind-admin-panel.ts";
import "./witmind-energy-panel.ts";
import "./witmind-workspace.ts";
import { PostMessageHaClient, type WitmindEntity } from "./ha/WitmindHaClient.js";

const ENTITY_IDS = [
  "weather.forecast_casa",
  "media_player.showroom_1",
  "sensor.showroom_luminarias_encendidas",
  "sensor.showroom_energia_estimada",
  "sensor.21051182g_battery_level",
  "switch.interruptor_inteligente_switch_1",
  "switch.interruptor_inteligente_switch_2",
  "switch.interruptor_inteligente_switch_3",
  "switch.interruptor_inteligente_switch_4",
  "switch.interruptor_inteligente_2_switch_1",
  "switch.interruptor_inteligente_2_switch_2",
  "switch.interruptor_inteligente_2_switch_3",
  "switch.interruptor_inteligente_2_switch_4",
  "switch.smart_relay_switch_3_switch",
  "switch.smart_relay_switch_4_switch",
  "switch.interruptor_inteligente_3_switch_1",
  "switch.interruptor_inteligente_3_switch_2",
  "switch.interruptor_inteligente_3_switch_3",
  "switch.interruptor_inteligente_3_switch_4",
  "scene.presentacion",
  "scene.reunion",
  "scene.visita",
  "scene.regular",
  "script.showroom_encendido_general",
  "script.showroom_apagado_general",
  "script.apagado_total_witmind",
  "switch.oficina_gerencial_interruptor_1",
  "switch.oficina_mindtec_interruptor_1",
  "switch.oficina_grande_interruptor_1",
  "switch.oficina_grande_interruptor_2",
  "switch.b2_gang_interruptor_1",
  "switch.b2_gang_interruptor_2",
  "switch.taller_interruptor_1",
  "sensor.t_h_sensor_temperature",
  "sensor.t_h_sensor_humidity",
  "sensor.t_h_sensor_2_temperature",
  "sensor.t_h_sensor_2_humidity",
  "switch.4gang_switch_sala_grabacion_interruptor_1",
  "switch.4gang_switch_sala_grabacion_interruptor_2",
  "switch.4gang_switch_sala_grabacion_interruptor_3",
  "switch.4gang_switch_sala_grabacion_interruptor_4",
];

const collectEntityIds = (value: unknown, result = new Set<string>()) => {
  if (typeof value === "string" && /^[a-z_]+\.[a-z0-9_]+$/i.test(value)) result.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectEntityIds(item, result));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectEntityIds(item, result));
  return [...result];
};

type PanelElement = HTMLElement & { hass?: Record<string, unknown>; config?: Record<string, unknown>; narrow?: boolean };

class WitmindApp extends HTMLElement {
  private client?: PostMessageHaClient;
  private panel?: PanelElement;
  private unsubscribe?: () => void;
  private states: Record<string, WitmindEntity> = {};
  private previousStates: Record<string, WitmindEntity> = {};
  private eventListeners = new Set<(event: unknown) => void>();
  private panelConfig: Record<string, unknown> = {};
  private user = { is_admin: false, name: "" };
  private panelConfigSignature = "";
  private appliedTheme = "";
  private pendingNarrow = false;
  private messageHandler = (event: MessageEvent) => {
    if (event.source !== window.parent || event.data?.protocol !== 1 || event.data?.source !== "witmind-ha") return;
    if (event.data.type === "WITMIND_INIT" && event.data.panelConfig) {
      const nextConfig = event.data.panelConfig as Record<string, unknown>;
      const nextSignature = JSON.stringify(nextConfig);
      const configChanged = nextSignature !== this.panelConfigSignature;
      const initialTheme = event.data.theme;
      if (!this.panel && (initialTheme === "light" || initialTheme === "dark")) {
        this.appliedTheme = initialTheme;
        try { localStorage.setItem("witmind-showroom-panel-theme", initialTheme); } catch (_) { /* storage optional */ }
      }
      this.panelConfig = nextConfig;
      this.panelConfigSignature = nextSignature;
      this.user = { is_admin: Boolean(event.data.user?.is_admin), name: String(event.data.user?.name || "") };
      this.pendingNarrow = Boolean(event.data.narrow);
      const created = this.ensurePanel();
      if (!created && configChanged) this.applyPanelConfig();
      if (this.panel) this.panel.narrow = this.pendingNarrow;
      if (created || configChanged) this.resubscribeWithConfig();
    }
    const theme = event.data.theme;
    if ((theme === "light" || theme === "dark") && this.panel && theme !== this.appliedTheme) {
      this.appliedTheme = theme;
      this.panel.setAttribute("data-theme", theme);
      this.panel.dispatchEvent(new CustomEvent("witmind-theme-change", { detail: { theme }, bubbles: true, composed: true }));
    }
  };

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    window.addEventListener("message", this.messageHandler);
    this.shadowRoot!.innerHTML = `<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)}.boot{min-height:100dvh;background:var(--wit-surface,#071118)}witmind-workspace{display:block;min-height:100dvh}</style><div class="boot" aria-label="Cargando panel Witmind"></div>`;
    this.client = new PostMessageHaClient(window.parent);
    // In Home Assistant the parent INIT is the source of truth. Waiting for it
    // avoids mounting Showroom first and replacing it with the requested panel.
    if (window.parent === window) {
      this.panelConfigSignature = JSON.stringify(this.panelConfig);
      this.ensurePanel();
      this.subscribe(ENTITY_IDS);
    }
  }

  private ensurePanel() {
    if (this.panel) return false;
    const panel = document.createElement("witmind-workspace") as PanelElement;
    panel.config = this.panelConfig;
    panel.narrow = this.pendingNarrow;
    panel.hass = this.createHassAdapter();
    panel.addEventListener("hass-toggle-menu", () => this.client?.toggleMenu());
    this.panel = panel;
    this.shadowRoot!.querySelector(".boot")?.replaceWith(panel);
    return true;
  }

  private subscribe(entityIds: string[]) {
    this.unsubscribe?.();
    this.unsubscribe = this.client!.subscribeEntities(entityIds, (states) => {
      this.previousStates = this.states;
      this.states = states;
      this.panel!.hass = this.createHassAdapter();
      this.emitStateChanges();
    });
  }

  private resubscribeWithConfig() {
    // El workspace conserva las tres vistas montadas para que el gesto sea
    // instantáneo; por eso suscribimos la unión de entidades de las vistas
    // conocidas y cualquier entidad declarada por paneles futuros.
    const entityIds = [...new Set([...ENTITY_IDS, ...collectEntityIds(this.panelConfig)])];
    this.subscribe(entityIds);
  }

  private applyPanelConfig() {
    if (!this.panel) return;
    this.panel.config = this.panelConfig;
  }

  disconnectedCallback() {
    this.unsubscribe?.();
    window.removeEventListener("message", this.messageHandler);
  }

  private createHassAdapter() {
    const client = this.client!;
    const states = this.states;
    return {
      states,
      language: "es",
      user: this.user,
      selectedTheme: null,
      callService: (domain: string, service: string, serviceData: Record<string, unknown> = {}, target?: Record<string, unknown>) =>
        client.callService(`${domain}.${service}`, serviceData, target),
      callWS: async <T>(message: Record<string, unknown>): Promise<T> => {
        if (message.type === "get_states") return Object.values(this.states) as T;
        return client.haRequest<T>(String(message.type || ""), message);
      },
      callApi: async <T>(_method: string, _path: string): Promise<T> => [] as T,
      connection: {
        subscribeEvents: async (callback: (event: unknown) => void, eventType?: string) => {
          const listener = (event: unknown) => {
            if (!eventType || eventType === "state_changed") callback(event);
          };
          this.eventListeners.add(listener);
          return () => this.eventListeners.delete(listener);
        },
        sendMessagePromise: (message: Record<string, unknown>) =>
          client.haRequest(String(message.type || ""), message),
        subscribeMessage: (callback: (event: unknown) => void, message: Record<string, unknown>) =>
          client.haSubscribe(String(message.type || ""), message, callback),
      },
    };
  }

  private emitStateChanges() {
    Object.entries(this.states).forEach(([entityId, newState]) => {
      if (this.previousStates[entityId] === newState) return;
      this.eventListeners.forEach((callback) => callback({
        event_type: "state_changed",
        data: { entity_id: entityId, new_state: newState, old_state: this.previousStates[entityId] || null },
      }));
    });
  }
}

customElements.define("witmind-ui-app", WitmindApp);
