import "./showroom-panel.js";
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
  "scene.presentacion",
  "scene.reunion",
  "script.showroom_encendido_general",
  "script.showroom_apagado_general",
];

const collectEntityIds = (value: unknown, result = new Set<string>()) => {
  if (typeof value === "string" && /^[a-z_]+\.[a-z0-9_]+$/i.test(value)) result.add(value);
  else if (Array.isArray(value)) value.forEach((item) => collectEntityIds(item, result));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectEntityIds(item, result));
  return [...result];
};

type PanelElement = HTMLElement & { hass?: Record<string, unknown>; panel?: Record<string, unknown>; narrow?: boolean };

class WitmindApp extends HTMLElement {
  private client?: PostMessageHaClient;
  private panel?: PanelElement;
  private unsubscribe?: () => void;
  private states: Record<string, WitmindEntity> = {};
  private previousStates: Record<string, WitmindEntity> = {};
  private eventListeners = new Set<(event: unknown) => void>();
  private panelConfig: Record<string, unknown> = {};
  private messageHandler = (event: MessageEvent) => {
    if (event.source !== window.parent || event.data?.protocol !== 1 || event.data?.source !== "witmind-ha") return;
    if (event.data.type === "WITMIND_INIT" && event.data.panelConfig) {
      this.panelConfig = event.data.panelConfig as Record<string, unknown>;
      this.applyPanelConfig();
      this.resubscribeWithConfig();
    }
    const theme = event.data.theme;
    if ((theme === "light" || theme === "dark") && this.panel) this.panel.setAttribute("theme", theme);
  };

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    window.addEventListener("message", this.messageHandler);
    this.shadowRoot!.innerHTML = `<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)} showroom-panel{display:block;min-height:100dvh}</style><showroom-panel></showroom-panel>`;
    this.panel = this.shadowRoot!.querySelector("showroom-panel") as PanelElement;
    this.panel.addEventListener("hass-toggle-menu", () => this.client?.toggleMenu());
    this.client = new PostMessageHaClient(window.parent);
    this.applyPanelConfig();
    this.subscribe(ENTITY_IDS);
    this.panel.hass = this.createHassAdapter();
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
    const panelKind = String(this.panelConfig.panel_kind || this.panelConfig.panelKind || "").toLowerCase();
    const baseEntityIds = ["weather.forecast_casa"];
    const entityIds = panelKind === "lobby" || panelKind === "general"
      ? [...new Set([...baseEntityIds, ...collectEntityIds(this.panelConfig)])]
      : [...new Set([...ENTITY_IDS, ...collectEntityIds(this.panelConfig)])];
    this.subscribe(entityIds);
  }

  private applyPanelConfig() {
    if (!this.panel) return;
    const raw = this.panelConfig;
    const panelKind = String(raw.panel_kind || raw.panelKind || "").toLowerCase();
    if (panelKind !== "lobby" && panelKind !== "general") return;
    const isGeneral = panelKind === "general";
    const devices = Array.isArray(raw.devices) ? raw.devices : [];
    const scenes = Array.isArray(raw.scenes) ? raw.scenes : [];
    this.panel.panel = {
      config: {
        panel_kind: panelKind,
        static_only: isGeneral || raw.static_only === true || raw.staticOnly === true,
        title: raw.title || (isGeneral ? "Witmind General" : "Lobby"),
        subtitle: raw.subtitle || (isGeneral ? "Centro de control" : "Control operativo"),
        site_label: raw.site_label || raw.siteLabel || "WTX · MDTC",
        logo: raw.logo || "/local/logo-witmind.png?v=2.0.0",
        weather: raw.weather || "weather.forecast_casa",
        light_count_sensor: isGeneral ? "" : raw.light_count_sensor || "sensor.lobby_luminarias_encendidas",
        energy_sensor: isGeneral ? "" : raw.energy_sensor || "sensor.showroom_energia_estimada",
        history_hours: raw.history_hours || 4,
        chart_hours: raw.chart_hours || 24,
        show_forecast: raw.show_forecast ?? true,
        spots: isGeneral ? [] : devices,
        samples: [],
        reflector: { entity: "" },
        scene_control_entities: isGeneral ? [] : raw.scene_control_entities || raw.sceneControlEntities || devices.map((item: any) => item.entity),
        scenes: isGeneral ? [] : scenes.map((scene: any) => ({
          ...scene,
          onEntities: scene.on_entities || scene.onEntities || [],
          offEntities: scene.off_entities || scene.offEntities || [],
          directOnly: true,
        })),
        sample_scenes: [],
        power_on_script: "",
        power_off_script: "",
        general_off_script: raw.general_off_script || raw.generalOffScript || "",
      },
    };
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
