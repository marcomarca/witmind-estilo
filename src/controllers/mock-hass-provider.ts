import type { HomeAssistant, HassEntities, HassEntityBase } from "../types/home-assistant.js";

const INITIAL_ENTITIES: HassEntities = {
  // Lights
  "light.salon_principal": {
    entity_id: "light.salon_principal",
    state: "on",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Luz General Salón",
      brightness: 215,
      color_temp: 320,
      supported_features: 43
    },
    context: { id: "ctx_1" }
  },
  "light.salon_ambiente": {
    entity_id: "light.salon_ambiente",
    state: "on",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Fosa Arquitectónica LED",
      brightness: 160,
      color_temp: 380,
      supported_features: 43
    },
    context: { id: "ctx_2" }
  },
  "light.comedor": {
    entity_id: "light.comedor",
    state: "off",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Lámpara Colgante Comedor",
      brightness: 0,
      supported_features: 43
    },
    context: { id: "ctx_3" }
  },
  "light.cocina": {
    entity_id: "light.cocina",
    state: "on",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Iluminación Técnica Cocina",
      brightness: 255,
      supported_features: 43
    },
    context: { id: "ctx_4" }
  },
  "light.master_suite": {
    entity_id: "light.master_suite",
    state: "off",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Master Suite DALI",
      brightness: 0,
      supported_features: 43
    },
    context: { id: "ctx_5" }
  },
  "light.terraza": {
    entity_id: "light.terraza",
    state: "on",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Balizas Exteriores Terraza",
      brightness: 180,
      supported_features: 43
    },
    context: { id: "ctx_6" }
  },

  // Energy & Power Sensors
  "sensor.potencia_total": {
    entity_id: "sensor.potencia_total",
    state: "432",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Consumo Activo Showroom",
      unit_of_measurement: "W",
      device_class: "power",
      state_class: "measurement"
    },
    context: { id: "ctx_7" }
  },
  "sensor.energia_diaria": {
    entity_id: "sensor.energia_diaria",
    state: "26.11",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Consumo Total Hoy",
      unit_of_measurement: "kWh",
      device_class: "energy"
    },
    context: { id: "ctx_8" }
  },
  "sensor.solar_produccion": {
    entity_id: "sensor.solar_produccion",
    state: "3420",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Producción Fotovoltaica",
      unit_of_measurement: "W",
      device_class: "power"
    },
    context: { id: "ctx_9" }
  },
  "sensor.bateria_soc": {
    entity_id: "sensor.bateria_soc",
    state: "88",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Batería Almacenamiento",
      unit_of_measurement: "%",
      device_class: "battery"
    },
    context: { id: "ctx_10" }
  },

  // Climate
  "climate.termostato_salon": {
    entity_id: "climate.termostato_salon",
    state: "heat",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Clima Salón Principal",
      current_temperature: 21.5,
      temperature: 22.0,
      current_humidity: 48,
      hvac_action: "heating",
      hvac_modes: ["off", "heat", "cool", "auto"]
    },
    context: { id: "ctx_11" }
  },

  // Media Player
  "media_player.sonos_salon": {
    entity_id: "media_player.sonos_salon",
    state: "playing",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Sonos Architectural Salón",
      media_title: "Modul 29_14",
      media_artist: "Nik Bärtsch's Ronin",
      media_album_name: "Awase (ECM Records)",
      source: "Tidal Master Lossless",
      volume_level: 0.42,
      is_volume_muted: false,
      media_duration: 382,
      media_position: 124
    },
    context: { id: "ctx_12" }
  },

  // Scenes
  "scene.showroom_confort": {
    entity_id: "scene.showroom_confort",
    state: "scenery",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Ambiente Confort",
      icon: "sun"
    },
    context: { id: "ctx_13" }
  },
  "scene.showroom_cine": {
    entity_id: "scene.showroom_cine",
    state: "scenery",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Modo Cine / Lounge",
      icon: "moon"
    },
    context: { id: "ctx_14" }
  },
  "scene.showroom_reunion": {
    entity_id: "scene.showroom_reunion",
    state: "scenery",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Presentación & Reunión",
      icon: "sparkles"
    },
    context: { id: "ctx_15" }
  },
  "scene.showroom_noche": {
    entity_id: "scene.showroom_noche",
    state: "scenery",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Apagado General",
      icon: "power"
    },
    context: { id: "ctx_16" }
  },

  // Weather
  "weather.showroom": {
    entity_id: "weather.showroom",
    state: "sunny",
    last_changed: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    attributes: {
      friendly_name: "Exterior Showroom",
      temperature: 22.4,
      humidity: 45,
      wind_speed: 11,
      pressure: 1018
    },
    context: { id: "ctx_17" }
  }
};

export class MockHassProvider {
  private _hass: HomeAssistant;
  private _listeners: Set<(hass: HomeAssistant) => void> = new Set();

  constructor() {
    this._hass = {
      states: { ...INITIAL_ENTITIES },
      language: "es",
      selectedTheme: null,
      callService: this._callService.bind(this),
      callWS: this._callWS.bind(this),
      connection: {
        subscribeEvents: async () => () => {},
        sendMessagePromise: async () => ({})
      }
    };
  }

  public getHass(): HomeAssistant {
    return this._hass;
  }

  public subscribe(listener: (hass: HomeAssistant) => void): () => void {
    this._listeners.add(listener);
    listener(this._hass);
    return () => this._listeners.delete(listener);
  }

  private _notify() {
    // Create new immutable reference for reactive Lit consumers
    this._hass = {
      ...this._hass,
      states: { ...this._hass.states }
    };
    for (const listener of this._listeners) {
      listener(this._hass);
    }
  }

  private async _callService(
    domain: string,
    service: string,
    serviceData?: Record<string, any>
  ): Promise<any> {
    const entityId = serviceData?.entity_id;
    if (!entityId) return;

    const current = this._hass.states[entityId];
    if (!current) return;

    const updated: HassEntityBase = {
      ...current,
      last_updated: new Date().toISOString()
    };

    if (domain === "light") {
      if (service === "turn_on") {
        updated.state = "on";
        if (serviceData?.brightness !== undefined) {
          updated.attributes = { ...updated.attributes, brightness: serviceData.brightness };
        }
        if (serviceData?.color_temp !== undefined) {
          updated.attributes = { ...updated.attributes, color_temp: serviceData.color_temp };
        }
      } else if (service === "turn_off") {
        updated.state = "off";
        updated.attributes = { ...updated.attributes, brightness: 0 };
      } else if (service === "toggle") {
        const nextState = current.state === "on" ? "off" : "on";
        updated.state = nextState;
        if (nextState === "on" && !updated.attributes.brightness) {
          updated.attributes = { ...updated.attributes, brightness: 255 };
        }
      }
    } else if (domain === "media_player") {
      if (service === "media_play_pause") {
        updated.state = current.state === "playing" ? "paused" : "playing";
      } else if (service === "media_play") {
        updated.state = "playing";
      } else if (service === "media_pause") {
        updated.state = "paused";
      } else if (service === "volume_set" && serviceData?.volume_level !== undefined) {
        updated.attributes = { ...updated.attributes, volume_level: serviceData.volume_level };
      } else if (service === "volume_mute") {
        const isMuted = !current.attributes.is_volume_muted;
        updated.attributes = { ...updated.attributes, is_volume_muted: isMuted };
      }
    } else if (domain === "scene") {
      if (service === "turn_on") {
        // Adjust light scenes
        if (entityId === "scene.showroom_noche") {
          Object.keys(this._hass.states).forEach((k) => {
            if (k.startsWith("light.")) {
              this._hass.states[k] = { ...this._hass.states[k], state: "off" };
            }
          });
        } else if (entityId === "scene.showroom_confort") {
          if (this._hass.states["light.salon_principal"]) {
            this._hass.states["light.salon_principal"] = {
              ...this._hass.states["light.salon_principal"],
              state: "on",
              attributes: { ...this._hass.states["light.salon_principal"].attributes, brightness: 180 }
            };
          }
        }
      }
    }

    this._hass.states[entityId] = updated;
    this._notify();
    return { success: true };
  }

  private async _callWS<T>(_msg: Record<string, any>): Promise<T> {
    return { result: "ok" } as unknown as T;
  }
}

export const globalMockHass = new MockHassProvider();

// Register globally so window.registerMockHassConsumer works smoothly
if (typeof window !== "undefined") {
  (window as any).mockHassProvider = globalMockHass;
  (window as any).registerMockHassConsumer = (consumer: any) => {
    globalMockHass.subscribe((h) => {
      consumer.hass = h;
    });
  };
}
