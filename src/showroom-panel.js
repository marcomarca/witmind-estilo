// Witmind Showroom Panel v1.6.0 - Architectural Signature Edition
// Compatible con Home Assistant Custom Panel & Mock Provider

const DEFAULT_SHOWROOM_CONFIG = Object.freeze({
  title: "Showroom",
  subtitle: "Control operativo",
  siteLabel: "WTX · MDTC",
  logo: "/local/logo-witmind.png?v=2.0.0",
  weather: "weather.forecast_casa",
  mediaPlayer: "media_player.showroom_1",
  lightCountSensor: "sensor.showroom_luminarias_encendidas",
  energySensor: "sensor.showroom_energia_estimada",
  batteryLevel: "sensor.21051182g_battery_level",
  historyHours: 12,
  chartHours: 24,
  showForecast: true,
  spots: [
    { entity: "switch.interruptor_inteligente_switch_1", name: "Spots ventana", subtitle: "Zona ventana", icon: "spot" },
    { entity: "switch.interruptor_inteligente_switch_2", name: "Spots 2x3", subtitle: "Muestra 2 × 3", icon: "spot" },
    { entity: "switch.interruptor_inteligente_switch_3", name: "Spots 3x3", subtitle: "Muestra 3 × 3", icon: "spot" },
    { entity: "switch.interruptor_inteligente_switch_4", name: "Spots TV", subtitle: "Zona audiovisual", icon: "spot" },
  ],
  samples: [
    { entity: "switch.interruptor_inteligente_2_switch_1", name: "Paneles 3k/6k", subtitle: "Temperaturas de color", icon: "panel" },
    { entity: "switch.interruptor_inteligente_2_switch_2", name: "Colgantes", subtitle: "Muestra suspendida", icon: "pendant" },
    { entity: "switch.interruptor_inteligente_2_switch_3", name: "Slims", subtitle: "Línea decorativa", icon: "strip" },
    { entity: "switch.interruptor_inteligente_2_switch_4", name: "Downlights", subtitle: "Iluminación empotrada", icon: "downlight" },
    { entity: "switch.smart_relay_switch_4_switch", name: "Paneles", subtitle: "Control por relé", icon: "screen" },
  ],
  reflector: {
    entity: "switch.smart_relay_switch_3_switch",
    name: "Reflector exterior",
    subtitle: "Control aislado",
    icon: "reflector",
  },
  scenes: [
    {
      entity: "scene.presentacion",
      name: "Presentación",
      subtitle: "Ventana + TV",
      icon: "presentation",
      onEntities: [
        "switch.interruptor_inteligente_switch_1",
        "switch.interruptor_inteligente_switch_4",
      ],
    },
    {
      entity: "scene.reunion",
      name: "Reunión",
      subtitle: "2x3 + Ventana",
      icon: "people",
      directOnly: true,
      onEntities: [
        "switch.interruptor_inteligente_switch_1",
        "switch.interruptor_inteligente_switch_2",
      ],
    },
  ],
  sampleScenes: [
    {
      id: "spots",
      name: "Spots",
      subtitle: "Todos los spots",
      icon: "spot",
      onEntities: [
        "switch.interruptor_inteligente_switch_1",
        "switch.interruptor_inteligente_switch_2",
        "switch.interruptor_inteligente_switch_3",
        "switch.interruptor_inteligente_switch_4",
      ],
    },
    {
      id: "paneles",
      name: "Paneles",
      subtitle: "Solo paneles",
      icon: "screen",
      onEntities: ["switch.smart_relay_switch_4_switch"],
    },
    {
      id: "slims",
      name: "Slims",
      subtitle: "Solo slims",
      icon: "strip",
      onEntities: ["switch.interruptor_inteligente_2_switch_3"],
    },
    {
      id: "downlights",
      name: "Downlights",
      subtitle: "Solo downlights",
      icon: "downlight",
      onEntities: ["switch.interruptor_inteligente_2_switch_4"],
    },
    {
      id: "paneles-3k-6k",
      name: "Paneles 3k/6k",
      subtitle: "Temperaturas de color",
      icon: "panel",
      onEntities: ["switch.interruptor_inteligente_2_switch_1"],
    },
    {
      id: "colgantes",
      name: "Colgantes",
      subtitle: "Todas las colgantes",
      icon: "pendant",
      onEntities: ["switch.interruptor_inteligente_2_switch_2"],
    },
  ],
  powerOnScript: "script.showroom_encendido_general",
  powerOffScript: "script.showroom_apagado_general",
});

const CONDITION_LABELS = {
  "clear-night": "Noche despejada",
  cloudy: "Nublado",
  exceptional: "Condición excepcional",
  fog: "Niebla",
  hail: "Granizo",
  lightning: "Tormenta eléctrica",
  "lightning-rainy": "Tormenta y lluvia",
  partlycloudy: "Parcialmente nublado",
  pouring: "Lluvia intensa",
  rainy: "Lluvia",
  snowy: "Nieve",
  "snowy-rainy": "Aguanieve",
  sunny: "Soleado",
  windy: "Ventoso",
  "windy-variant": "Viento y nubes",
};

const CONDITION_SYMBOLS = {
  "clear-night": "☾",
  cloudy: "☁",
  exceptional: "!",
  fog: "≋",
  hail: "◆",
  lightning: "ϟ",
  "lightning-rainy": "ϟ",
  partlycloudy: "◒",
  pouring: "☂",
  rainy: "☂",
  snowy: "❄",
  "snowy-rainy": "❄",
  sunny: "☀",
  windy: "≈",
  "windy-variant": "≈",
};

/* Iconos Lineales 1.8px Stroke de Alta Precisión (Witmind Signature Iconography) */
const ICON_PATHS = {
  spot: '<circle cx="12" cy="9" r="5"/><path d="M6 18h12M9 22h6M12 14v4"/>',
  panel: '<rect width="18" height="18" x="3" y="3" rx="3"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>',
  pendant: '<line x1="12" x2="12" y1="2" y2="8"/><path d="M7 16a5 5 0 0 0 10 0V8H7v8Z"/><line x1="8" x2="16" y1="20" y2="20"/><line x1="10" x2="14" y1="23" y2="23"/>',
  strip: '<rect width="20" height="8" x="2" y="8" rx="2.5"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',
  downlight: '<path d="M4 6h16l-3 8H7L4 6Z"/><path d="M9 18h6M10 21h4"/><path d="M12 2v4"/>',
  screen: '<rect width="20" height="14" x="2" y="3" rx="2.5"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  reflector: '<path d="M4 6h10l4 4v6l-4 4H4V6Z"/><line x1="18" x2="22" y1="10" y2="10"/><line x1="18" x2="22" y1="14" y2="14"/>',
  presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  power: '<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/>',
  bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',
  pause: '<rect width="4" height="16" x="6" y="4" rx="1.5" fill="currentColor" stroke="none"/><rect width="4" height="16" x="14" y="4" rx="1.5" fill="currentColor" stroke="none"/>',
  previous: '<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',
  next: '<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',
  volumeDown: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',
  volumeUp: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  refresh: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',
  battery: '<rect width="16" height="10" x="2" y="7" rx="2.5"/><line x1="22" x2="22" y1="11" y2="13"/>',
  health: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  thermometer: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  status: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  energy: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
};

const MENU_ICON = `
  <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="6" y2="6"></line>
    <line x1="3" x2="21" y1="12" y2="12"></line>
    <line x1="3" x2="21" y1="18" y2="18"></line>
  </svg>
`;

const THEME_ICON = `
  <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="theme-icon-sun">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </g>
    <path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;

class ShowroomPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this._hass = null;
    this._panel = null;
    this._narrow = false;
    this._started = false;
    this._renderQueued = false;
    this._forecast = [];
    this._history = [];
    this._historyError = "";
    this._liveStates = new Map();
    this._pendingSwitches = new Map();
    this._switchErrors = new Map();
    this._switchTimers = new Map();
    this._pendingAction = "";
    this._confirmAction = "";
    this._toast = null;
    this._toastTimer = null;
    this._clockTimer = null;
    this._historyTimer = null;
    this._unsubscribeStates = null;
    this._unsubscribeForecast = null;
    this._forecastEntity = "";
    this._energyRange = "day";
    this._energyDayOffset = 0;
    this._energyData = [];
    this._energyLoading = false;
    this._energyError = null;
    this._energyMonthTotal = null;
    this._energyRequestId = 0;
    this._energyRefreshTimer = null;
    this._energyLastLoadedAt = 0;
    this._energyAutoFollow = true;
    this._energyScrollLeft = null;
    this._themeStorageKey = "witmind-showroom-panel-theme";
    this._theme = this._loadTheme();
    this._activeView = "home";

    this.shadowRoot.addEventListener("click", (event) => this._handleClick(event));
    this.shadowRoot.addEventListener("scroll", (event) => this._handleEnergyScroll(event), true);
  }

  set hass(value) {
    const previous = this._hass;
    const config = this._config();
    const relevantChanged = this._relevantHassChanged(previous, value);
    const energyChanged =
      !previous || previous.states?.[config.energySensor] !== value?.states?.[config.energySensor];
    const energyAppeared =
      !previous?.states?.[config.energySensor] && Boolean(value?.states?.[config.energySensor]);

    this._hass = value;

    if (relevantChanged) this._syncStatesFromHass();

    if (!this._started) {
      this._started = true;
      this._start();
    } else if (energyChanged) {
      // The iframe receives entity states asynchronously. If the energy entity
      // arrives after the first render, load immediately instead of waiting for
      // the normal 30s refresh interval (which previously left the empty state
      // visible until the user pressed Refresh).
      if (energyAppeared) {
        this._loadEnergyStatistics();
      } else {
        this._scheduleEnergyRefresh();
      }
    }

    if (relevantChanged) this._requestRender();
  }

  get hass() {
    return this._hass;
  }

  set panel(value) {
    const previousWeather = this._config().weather;
    this._panel = value;
    const nextWeather = this._config().weather;

    if (this._started && previousWeather !== nextWeather) {
      this._resetForecastSubscription();
      this._subscribeWeather();
    }

    if (this._hass) {
      this._syncStatesFromHass();
      this._loadEnergyStatistics();
      this._requestRender();
    }
  }

  get panel() {
    return this._panel;
  }

  set narrow(value) {
    this._narrow = Boolean(value);
    this.toggleAttribute("narrow", this._narrow);
  }

  get narrow() {
    return this._narrow;
  }

  connectedCallback() {
    if (this._hass) {
      this._requestRender();
      this._scheduleEnergyRefresh(true);
    }
  }

  disconnectedCallback() {
    clearInterval(this._clockTimer);
    clearInterval(this._historyTimer);
    clearTimeout(this._toastTimer);
    clearTimeout(this._energyRefreshTimer);
    this._energyRequestId += 1;
    for (const timer of this._switchTimers.values()) clearTimeout(timer);
    this._switchTimers.clear();
    this._resetForecastSubscription();
    if (this._unsubscribeStates) {
      this._unsubscribeStates();
      this._unsubscribeStates = null;
    }
    this._started = false;
  }

  _requestRender() {
    if (this._renderQueued || !this._hass || !this.shadowRoot) return;
    this._renderQueued = true;
    requestAnimationFrame(() => {
      this._renderQueued = false;
      this.render();
    });
  }

  _handleClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target || !this._hass) return;

    const action = target.dataset.action;
    if (action === "toggle-menu") {
      this._toggleHomeAssistantMenu();
      return;
    }
    if (action === "toggle-theme") {
      this._toggleTheme();
      return;
    }
    if (action === "set-view") {
      const view = target.dataset.view;
      if (["home", "lights", "energy", "system"].includes(view)) {
        this._activeView = view;
        this._requestRender();
      }
      return;
    }
    if (action === "toggle-switch") {
      this._toggleSwitch(target.dataset.entity);
      return;
    }
    if (action === "run-scene") {
      this._runScene(target.dataset.sceneKey || target.dataset.entity, target.dataset.label);
      return;
    }
    if (action === "open-power-on") {
      if (!this._pendingAction) {
        this._confirmAction = "on";
        this._requestRender();
      }
      return;
    }
    if (action === "open-power-off") {
      if (!this._pendingAction) {
        this._confirmAction = "off";
        this._requestRender();
      }
      return;
    }
    if (action === "cancel-power-confirm") {
      const inside = event.target.closest("[data-dialog-card]");
      if (target.classList.contains("dialog-backdrop") && inside) return;
      if (!this._pendingAction) {
        this._confirmAction = "";
        this._requestRender();
      }
      return;
    }
    if (action === "confirm-power") {
      this._confirmGeneralPower();
      return;
    }
    if (action === "clear-scene") {
      this._clearScene();
      return;
    }
    if (action === "media") {
      this._mediaAction(target.dataset.service);
      return;
    }
    if (action === "energy-range") {
      this._setEnergyRange(target.dataset.range);
      return;
    }
    if (action === "energy-day-prev") {
      this._shiftEnergyDay(-1);
      return;
    }
    if (action === "energy-day-next") {
      this._shiftEnergyDay(1);
      return;
    }
    if (action === "energy-day-today") {
      this._resetEnergyDay();
      return;
    }
    if (action === "refresh-energy") {
      this._energyLastLoadedAt = 0;
      this._loadEnergyStatistics();
    }
  }

  _toggleHomeAssistantMenu() {
    this.dispatchEvent(
      new Event("hass-toggle-menu", {
        bubbles: true,
        composed: true,
      }),
    );
  }

  _loadTheme() {
    try {
      const stored = localStorage.getItem(this._themeStorageKey);
      return stored === "light" ? "light" : "dark";
    } catch (_error) {
      return "dark";
    }
  }

  _saveTheme() {
    try {
      localStorage.setItem(this._themeStorageKey, this._theme);
    } catch (error) {
      console.warn("No se pudo guardar el tema del showroom:", error);
    }
  }

  _toggleTheme() {
    this._theme = this._theme === "dark" ? "light" : "dark";
    this.setAttribute("data-theme", this._theme);
    this._saveTheme();
    this._requestRender();
  }

  _config() {
    const raw = this._panel?.config || {};
    const normalizeEntityIds = (items) => {
      if (!Array.isArray(items)) return [];
      return [...new Set(items.filter(Boolean).map((item) => String(item)))];
    };
    const normalizeDevices = (items, fallback) => {
      const source = Array.isArray(items) && items.length ? items : fallback;
      return source
        .filter((item) => item?.entity)
        .map((item, index) => ({
          entity: String(item.entity),
          name: item.name || `Dispositivo ${index + 1}`,
          subtitle: item.subtitle || "Iluminación",
          icon: item.icon || "bulb",
        }));
    };

    const spots = normalizeDevices(raw.spots, DEFAULT_SHOWROOM_CONFIG.spots);
    const samples = normalizeDevices(raw.samples || raw.muestras, DEFAULT_SHOWROOM_CONFIG.samples);
    const defaultControlEntities = [...spots, ...samples].map((item) => item.entity);
    const configuredControlEntities = normalizeEntityIds(
      raw.scene_control_entities || raw.sceneControlEntities,
    );
    const sceneControlEntities = configuredControlEntities.length
      ? configuredControlEntities
      : defaultControlEntities;

    const normalizeScenes = (items, fallback, groupName) => {
      const source = Array.isArray(items) && items.length ? items : fallback;
      return source
        .filter((item) => item?.entity || item?.id || item?.key)
        .map((item, index) => {
          const requestedEntity = item.entity ? String(item.entity) : "";
          const requestedId = String(item.id || item.key || requestedEntity || `${groupName}-${index + 1}`);
          const defaultScene = fallback.find((candidate) => {
            const candidateEntity = candidate.entity ? String(candidate.entity) : "";
            const candidateId = String(candidate.id || candidate.key || candidateEntity || "");
            return (requestedEntity && candidateEntity === requestedEntity) || candidateId === requestedId;
          });
          const entity = requestedEntity || (defaultScene?.entity ? String(defaultScene.entity) : "");
          const id = String(item.id || item.key || defaultScene?.id || entity || `${groupName}-${index + 1}`);
          const key = entity || `${groupName}:${id}`;
          const hasExplicitOn =
            Array.isArray(item.on_entities) || Array.isArray(item.onEntities);
          const hasExplicitOff =
            Array.isArray(item.off_entities) || Array.isArray(item.offEntities);
          const onEntities = normalizeEntityIds(
            hasExplicitOn
              ? (item.on_entities || item.onEntities)
              : defaultScene?.onEntities,
          );
          const explicitOff = normalizeEntityIds(
            hasExplicitOff ? (item.off_entities || item.offEntities) : [],
          );
          const offEntities = hasExplicitOff
            ? explicitOff.filter((entityId) => !onEntities.includes(entityId))
            : sceneControlEntities.filter((entityId) => !onEntities.includes(entityId));

          return {
            key,
            id,
            entity,
            name: item.name || defaultScene?.name || `Escena ${index + 1}`,
            subtitle: item.subtitle || defaultScene?.subtitle || "Escena del showroom",
            icon: item.icon || defaultScene?.icon || "presentation",
            directOnly:
              item.direct_only ?? item.directOnly ?? defaultScene?.directOnly ?? false,
            onEntities,
            offEntities,
          };
        });
    };

    const reflectorRaw = raw.reflector || DEFAULT_SHOWROOM_CONFIG.reflector;
    const historyHours = Number(raw.history_hours ?? raw.historyHours);
    const chartHours = Number(raw.chart_hours ?? raw.chartHours);

    return {
      title: raw.title || DEFAULT_SHOWROOM_CONFIG.title,
      subtitle: raw.subtitle || DEFAULT_SHOWROOM_CONFIG.subtitle,
      siteLabel: raw.site_label || raw.siteLabel || DEFAULT_SHOWROOM_CONFIG.siteLabel,
      logo: raw.logo || DEFAULT_SHOWROOM_CONFIG.logo,
      weather: raw.weather || DEFAULT_SHOWROOM_CONFIG.weather,
      mediaPlayer: raw.media_player || raw.mediaPlayer || DEFAULT_SHOWROOM_CONFIG.mediaPlayer,
      lightCountSensor:
        raw.light_count_sensor || raw.lightCountSensor || DEFAULT_SHOWROOM_CONFIG.lightCountSensor,
      energySensor:
        raw.energy_sensor || raw.energySensor || DEFAULT_SHOWROOM_CONFIG.energySensor,
      batteryLevel:
        raw.battery_level || raw.batteryLevel || DEFAULT_SHOWROOM_CONFIG.batteryLevel,
      powerOnScript:
        raw.power_on_script || raw.powerOnScript || DEFAULT_SHOWROOM_CONFIG.powerOnScript,
      powerOffScript:
        raw.power_off_script || raw.powerOffScript || DEFAULT_SHOWROOM_CONFIG.powerOffScript,
      historyHours:
        Number.isFinite(historyHours) && historyHours > 0
          ? Math.min(24, historyHours)
          : DEFAULT_SHOWROOM_CONFIG.historyHours,
      chartHours:
        Number.isFinite(chartHours) && chartHours > 0
          ? Math.min(72, chartHours)
          : DEFAULT_SHOWROOM_CONFIG.chartHours,
      showForecast:
        raw.show_forecast ?? raw.showForecast ?? DEFAULT_SHOWROOM_CONFIG.showForecast,
      spots,
      samples,
      sceneControlEntities,
      reflector: reflectorRaw?.entity
        ? {
            entity: String(reflectorRaw.entity),
            name: reflectorRaw.name || DEFAULT_SHOWROOM_CONFIG.reflector.name,
            subtitle: reflectorRaw.subtitle || DEFAULT_SHOWROOM_CONFIG.reflector.subtitle,
            icon: reflectorRaw.icon || DEFAULT_SHOWROOM_CONFIG.reflector.icon,
          }
        : null,
      scenes: normalizeScenes(raw.scenes, DEFAULT_SHOWROOM_CONFIG.scenes, "scene"),
      sampleScenes: normalizeScenes(
        raw.sample_scenes || raw.sampleScenes,
        DEFAULT_SHOWROOM_CONFIG.sampleScenes,
        "sample",
      ),
    };
  }

  _allDevices() {
    const config = this._config();
    return [
      ...config.spots,
      ...config.samples,
      ...(config.reflector ? [config.reflector] : []),
    ];
  }

  _allScenes(config = this._config()) {
    return [...config.scenes, ...config.sampleScenes];
  }

  _trackedEntities() {
    const config = this._config();
    return new Set([
      ...this._allDevices().map((item) => item.entity),
      ...config.sceneControlEntities,
      ...this._allScenes(config).flatMap((item) => [
        item.entity,
        ...item.onEntities,
        ...item.offEntities,
      ]),
      config.weather,
      config.mediaPlayer,
      config.lightCountSensor,
      config.energySensor,
      config.batteryLevel,
      config.powerOnScript,
      config.powerOffScript,
    ].filter(Boolean));
  }

  _relevantHassChanged(previous, current) {
    if (!previous || !current) return true;
    for (const entityId of this._trackedEntities()) {
      if (previous.states?.[entityId] !== current.states?.[entityId]) return true;
    }
    return false;
  }

  async _start() {
    this._clockTimer = setInterval(() => this._updateClock(), 30_000);

    await Promise.allSettled([
      this._fetchCurrentStates(),
      this._subscribeStateChanges(),
      this._subscribeWeather(),
      this._loadEnergyStatistics(),
    ]);
  }

  _syncStatesFromHass() {
    if (!this._hass?.states) return;
    for (const entityId of this._trackedEntities()) {
      const stateObject = this._hass.states[entityId];
      if (stateObject) this._applyLiveState(entityId, stateObject);
    }
  }

  _applyLiveState(entityId, stateObject) {
    if (!stateObject) {
      this._liveStates.delete(entityId);
      return;
    }
    this._liveStates.set(entityId, stateObject);

    const pending = this._pendingSwitches.get(entityId);
    if (pending && stateObject.state === pending.desired) {
      this._pendingSwitches.delete(entityId);
      this._switchErrors.delete(entityId);
      const timer = this._switchTimers.get(entityId);
      if (timer) clearTimeout(timer);
      this._switchTimers.delete(entityId);
    }
  }

  async _fetchCurrentStates() {
    if (!this._hass?.callWS) return;
    try {
      const states = await this._hass.callWS({ type: "get_states" });
      const tracked = this._trackedEntities();
      for (const stateObject of states || []) {
        if (tracked.has(stateObject.entity_id)) {
          this._applyLiveState(stateObject.entity_id, stateObject);
        }
      }
      this._requestRender();
    } catch (error) {
      console.error("No se pudieron sincronizar los estados del showroom:", error);
    }
  }

  async _subscribeStateChanges() {
    if (!this._hass?.connection || this._unsubscribeStates) return;
    try {
      this._unsubscribeStates = await this._hass.connection.subscribeEvents(
        (event) => {
          const entityId = event?.data?.entity_id;
          if (!entityId || !this._trackedEntities().has(entityId)) return;
          this._applyLiveState(entityId, event.data.new_state);
          if (entityId === this._config().energySensor) this._scheduleEnergyRefresh();
          this._requestRender();
        },
        "state_changed",
      );
    } catch (error) {
      console.error("No se pudo suscribir a state_changed:", error);
    }
  }

  _resetForecastSubscription() {
    if (this._unsubscribeForecast) {
      this._unsubscribeForecast();
      this._unsubscribeForecast = null;
    }
    this._forecastEntity = "";
  }

  async _subscribeWeather() {
    const config = this._config();
    if (!this._hass?.connection || !config.weather) return;
    if (this._unsubscribeForecast && this._forecastEntity === config.weather) return;
    this._resetForecastSubscription();

    try {
      this._forecastEntity = config.weather;
      this._unsubscribeForecast = await this._hass.connection.subscribeMessage(
        (event) => {
          this._forecast = Array.isArray(event?.forecast) ? event.forecast : [];
          this._requestRender();
        },
        {
          type: "weather/subscribe_forecast",
          forecast_type: "daily",
          entity_id: config.weather,
        },
      );
    } catch (error) {
      this._forecastEntity = "";
      console.error("No se pudo cargar el pronóstico:", error);
    }
  }

  _energyRefreshInterval() {
    if (this._energyRange === "day") return 30000;
    if (this._energyRange === "month") return 120000;
    return 300000;
  }

  _scheduleEnergyRefresh(immediate = false) {
    if (!this._hass || !this.isConnected) return;
    clearTimeout(this._energyRefreshTimer);
    if (this._energyRange === "day" && this._energyDayOffset !== 0) return;
    const interval = this._energyRefreshInterval();
    const elapsed = this._energyLastLoadedAt ? Date.now() - this._energyLastLoadedAt : 0;
    const delay = immediate ? 0 : this._energyLastLoadedAt ? Math.max(1000, interval - elapsed) : interval;
    this._energyRefreshTimer = setTimeout(() => this._loadEnergyStatistics(), delay);
  }

  _energyRangeDefinition(range = this._energyRange) {
    const now = new Date();
    let start;
    let end = now;
    let period;
    let title;
    let intervalLabel;
    let isToday = false;

    if (range === "year") {
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
      period = "month";
      title = `Año ${now.getFullYear()}`;
      intervalLabel = "mes";
    } else if (range === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
      period = "day";
      title = now.toLocaleDateString("es-BO", { month: "long", year: "numeric" });
      intervalLabel = "día";
    } else {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      start = new Date(
        todayStart.getFullYear(),
        todayStart.getMonth(),
        todayStart.getDate() + Math.min(0, Number(this._energyDayOffset) || 0),
        0, 0, 0, 0,
      );
      isToday = start.getTime() === todayStart.getTime();
      end = isToday
        ? now
        : new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1, 0, 0, 0, 0);
      period = "hour";
      title = start.toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long" });
      intervalLabel = "hora";
    }

    return { start, end, period, title, intervalLabel, isToday };
  }

  _energyValueToKWh(value, unit) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return null;
    const normalized = String(unit || "kWh").trim().toLowerCase().replaceAll(" ", "");
    if (normalized === "kwh") return numeric;
    if (normalized === "wh") return numeric / 1000;
    if (normalized === "mwh") return numeric * 1000;
    return null;
  }

  _deriveEnergyStateDeltas(rows, rangeStart, rangeEnd) {
    const startMs = Number(rangeStart instanceof Date ? rangeStart.getTime() : rangeStart);
    const endMs = Number(rangeEnd instanceof Date ? rangeEnd.getTime() : rangeEnd);
    const sorted = rows
      .filter((row) => Number.isFinite(Number(row.start)) && Number.isFinite(Number(row.state)))
      .sort((a, b) => Number(a.start) - Number(b.start));

    const derived = [];
    let previousState = null;
    for (const row of sorted) {
      const timestamp = Number(row.start);
      const state = Number(row.state);
      if (timestamp < startMs) {
        previousState = state;
        continue;
      }
      if (timestamp >= endMs) break;
      let change = 0;
      if (Number.isFinite(previousState)) {
        const delta = state - previousState;
        change = delta >= 0 ? delta : Math.max(0, state);
      }
      derived.push({ ...row, change });
      previousState = state;
    }
    return derived;
  }

  _aggregateEnergyDayRows(rows, definition, energyEntity) {
    const dayStart = new Date(definition.start);
    const dayEnd = new Date(definition.end);
    const lastHourStart = definition.isToday
      ? new Date(dayEnd.getFullYear(), dayEnd.getMonth(), dayEnd.getDate(), dayEnd.getHours(), 0, 0, 0)
      : new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate(), 23, 0, 0, 0);
    const buckets = new Map();

    for (let cursor = new Date(dayStart); cursor <= lastHourStart; cursor.setHours(cursor.getHours() + 1)) {
      const start = cursor.getTime();
      buckets.set(start, {
        start,
        end: new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), cursor.getHours() + 1, 0, 0, 0).getTime(),
        change: 0,
        samples: 0,
        partial: definition.isToday && start === lastHourStart.getTime(),
        live: false,
      });
    }

    let latestStateRow = null;
    for (const row of rows) {
      const rowDate = new Date(Number(row.start));
      if (!Number.isFinite(rowDate.getTime())) continue;
      const bucketStart = new Date(rowDate.getFullYear(), rowDate.getMonth(), rowDate.getDate(), rowDate.getHours(), 0, 0, 0).getTime();
      const bucket = buckets.get(bucketStart);
      if (!bucket) continue;
      bucket.change += Math.max(0, Number(row.change) || 0);
      bucket.samples += 1;
      if (Number.isFinite(row.state) && (!latestStateRow || Number(row.end || row.start) > Number(latestStateRow.end || latestStateRow.start))) {
        latestStateRow = row;
      }
    }

    if (definition.isToday) {
      const currentEnergy = this._energyValueToKWh(
        energyEntity?.state,
        energyEntity?.attributes?.unit_of_measurement,
      );
      const latestState = latestStateRow?.state;
      const latestTimestamp = Number(latestStateRow?.end || latestStateRow?.start);
      const currentBucket = buckets.get(lastHourStart.getTime());
      if (
        currentBucket && Number.isFinite(currentEnergy) && Number.isFinite(latestState) &&
        Number.isFinite(latestTimestamp) && latestTimestamp >= lastHourStart.getTime() &&
        dayEnd.getTime() - latestTimestamp >= 0 && dayEnd.getTime() - latestTimestamp <= 15 * 60 * 1000
      ) {
        const liveDelta = currentEnergy - latestState;
        if (Number.isFinite(liveDelta) && liveDelta >= 0) {
          currentBucket.change += liveDelta;
          currentBucket.live = liveDelta > 0;
        }
      }
    }
    return [...buckets.values()].filter((bucket) => bucket.samples > 0 || bucket.live);
  }

  _calculateCurrentMonthEnergy(rows, now, energyEntity) {
    const current = new Date(now);
    const monthStart = new Date(current.getFullYear(), current.getMonth(), 1, 0, 0, 0, 0).getTime();
    const normalized = rows
      .filter((row) => Number.isFinite(Number(row.start)) && Number(row.start) >= monthStart)
      .sort((a, b) => Number(a.start) - Number(b.start));
    let total = normalized.reduce((sum, row) => sum + Math.max(0, Number(row.change) || 0), 0);
    let latestStateRow = null;
    for (const row of normalized) {
      if (!Number.isFinite(Number(row.state))) continue;
      if (!latestStateRow || Number(row.end || row.start) > Number(latestStateRow.end || latestStateRow.start)) latestStateRow = row;
    }
    const currentEnergy = this._energyValueToKWh(energyEntity?.state, energyEntity?.attributes?.unit_of_measurement);
    const latestState = Number(latestStateRow?.state);
    const latestTimestamp = Number(latestStateRow?.end || latestStateRow?.start);
    if (
      Number.isFinite(currentEnergy) && Number.isFinite(latestState) && Number.isFinite(latestTimestamp) &&
      latestTimestamp >= monthStart && latestTimestamp <= current.getTime() &&
      current.getTime() - latestTimestamp <= 2 * 60 * 60 * 1000
    ) {
      const liveDelta = currentEnergy - latestState;
      if (Number.isFinite(liveDelta) && liveDelta >= 0) total += liveDelta;
    }
    return normalized.length || Number.isFinite(latestState) ? total : null;
  }

  _aggregateEnergyCalendarRows(rows, definition, energyEntity, range) {
    if (!["month", "year"].includes(range)) return [];
    const buckets = new Map();
    let latestStateRow = null;
    for (const row of rows) {
      const timestamp = Number(row.start);
      if (!Number.isFinite(timestamp)) continue;
      const date = new Date(timestamp);
      const bucketStart = range === "month"
        ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0).getTime()
        : new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0).getTime();
      const bucket = buckets.get(bucketStart) || { start: bucketStart, change: 0, samples: 0, partial: false, live: false };
      bucket.change += Math.max(0, Number(row.change) || 0);
      bucket.samples += 1;
      buckets.set(bucketStart, bucket);
      if (Number.isFinite(Number(row.state)) && (!latestStateRow || timestamp > Number(latestStateRow.start))) latestStateRow = row;
    }

    const currentEnergy = this._energyValueToKWh(energyEntity?.state, energyEntity?.attributes?.unit_of_measurement);
    const latestState = Number(latestStateRow?.state);
    const latestTimestamp = Number(latestStateRow?.start);
    const rangeEnd = new Date(definition.end);
    if (
      Number.isFinite(currentEnergy) && Number.isFinite(latestState) && Number.isFinite(latestTimestamp) &&
      latestTimestamp <= rangeEnd.getTime() && rangeEnd.getTime() - latestTimestamp <= 2 * 60 * 60 * 1000
    ) {
      const liveDelta = currentEnergy - latestState;
      if (Number.isFinite(liveDelta) && liveDelta >= 0) {
        const bucketStart = range === "month"
          ? new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate(), 0, 0, 0, 0).getTime()
          : new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), 1, 0, 0, 0, 0).getTime();
        const bucket = buckets.get(bucketStart) || { start: bucketStart, change: 0, samples: 0, partial: false, live: false };
        bucket.change += liveDelta;
        bucket.live = liveDelta > 0;
        buckets.set(bucketStart, bucket);
      }
    }
    return [...buckets.values()].sort((a, b) => Number(a.start) - Number(b.start));
  }

  _energyViewSignature() {
    return JSON.stringify([
      this._energyRange,
      this._energyDayOffset,
      this._energyMonthTotal,
      this._energyError || "",
      this._energyData.map((row) => [
        Number(row.start),
        Number(row.change) || 0,
        Number(row.samples) || 0,
        Boolean(row.partial),
        Boolean(row.live),
      ]),
    ]);
  }

  async _loadEnergyStatistics() {
    if (!this._hass?.connection) return;
    clearTimeout(this._energyRefreshTimer);
    const config = this._config();
    const entity = this._state(config.energySensor);
    const numericState = Number(entity?.state);
    if (!entity) {
      this._energyData = [];
      this._energyMonthTotal = null;
      this._energyError = `No existe ${config.energySensor} en Home Assistant.`;
      this._energyLoading = false;
      this._requestRender();
      return;
    }
    if (!Number.isFinite(numericState)) {
      this._energyData = [];
      this._energyMonthTotal = null;
      this._energyError = `${config.energySensor} no entrega un valor numérico.`;
      this._energyLoading = false;
      this._requestRender();
      return;
    }

    const requestId = ++this._energyRequestId;
    const previousViewSignature = this._energyViewSignature();
    const hadVisibleData = this._energyData.length > 0;
    const definition = this._energyRangeDefinition();
    const actualNow = new Date();
    const monthStart = new Date(actualNow.getFullYear(), actualNow.getMonth(), 1, 0, 0, 0, 0);
    const selectedQueryStart = new Date(definition.start.getTime() - 60 * 60 * 1000);
    const selectedStatisticsPeriod = this._energyRange === "year" ? "hour" : "5minute";
    const monthQueryStart = new Date(monthStart.getTime() - 60 * 60 * 1000);
    this._energyLoading = true;
    this._energyError = null;

    if (!hadVisibleData) this._requestRender();

    try {
      const metadataResult = await this._hass.connection.sendMessagePromise({
        type: "recorder/get_statistics_metadata",
        statistic_ids: [config.energySensor],
      });
      if (requestId !== this._energyRequestId) return;
      const metadataRows = Array.isArray(metadataResult) ? metadataResult : [];
      const energyMetadata = metadataRows.find((item) => item?.statistic_id === config.energySensor) || null;
      if (!energyMetadata || !energyMetadata.has_sum) {
        throw new Error("La entidad no dispone de estadísticas acumulables. Verifica device_class: energy y state_class total/total_increasing.");
      }

      const selectedPromise = this._hass.connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: selectedQueryStart.toISOString(),
        end_time: definition.end.toISOString(),
        statistic_ids: [config.energySensor],
        period: selectedStatisticsPeriod,
        units: { energy: "kWh" },
        types: ["state"],
      });
      const monthPromise = this._hass.connection.sendMessagePromise({
        type: "recorder/statistics_during_period",
        start_time: monthQueryStart.toISOString(),
        end_time: actualNow.toISOString(),
        statistic_ids: [config.energySensor],
        period: "hour",
        units: { energy: "kWh" },
        types: ["state"],
      });
      const [selectedResult, monthResult] = await Promise.all([selectedPromise, monthPromise]);
      if (requestId !== this._energyRequestId) return;

      const normalize = (result) => (Array.isArray(result?.[config.energySensor]) ? result[config.energySensor] : [])
        .map((row) => ({
          start: Number(row.start),
          end: Number(row.end),
          change: row.change === undefined || row.change === null ? null : Math.max(0, Number(row.change) || 0),
          state: row.state === undefined || row.state === null ? null : Number(row.state),
        }))
        .filter((row) => Number.isFinite(row.start) && (Number.isFinite(row.state) || Number.isFinite(row.change)));

      const normalizedRows = normalize(selectedResult);
      const selectedDeltaRows = this._deriveEnergyStateDeltas(normalizedRows, definition.start, definition.end);
      this._energyData = this._energyRange === "day"
        ? this._aggregateEnergyDayRows(selectedDeltaRows, definition, entity)
        : this._aggregateEnergyCalendarRows(selectedDeltaRows, definition, entity, this._energyRange);

      const normalizedMonthRows = normalize(monthResult);
      const monthRows = this._deriveEnergyStateDeltas(normalizedMonthRows, monthStart, actualNow);
      this._energyMonthTotal = this._calculateCurrentMonthEnergy(monthRows, actualNow, entity);

      if (this._energyRange === "month" && this._energyData.length) {
        this._energyMonthTotal = this._energyData.reduce((sum, row) => sum + Math.max(0, Number(row.change) || 0), 0);
      } else if (this._energyRange === "year" && Number.isFinite(this._energyMonthTotal)) {
        const currentMonthStart = new Date(actualNow.getFullYear(), actualNow.getMonth(), 1, 0, 0, 0, 0).getTime();
        const currentMonthBucket = this._energyData.find((row) => Number(row.start) === currentMonthStart);
        if (currentMonthBucket) currentMonthBucket.change = this._energyMonthTotal;
      }

      this._energyLastLoadedAt = Date.now();
      this._energyError = null;
    } catch (error) {
      if (requestId !== this._energyRequestId) return;
      this._energyData = [];
      this._energyMonthTotal = null;
      this._energyError = error?.message || "No se pudieron consultar las estadísticas energéticas.";
      console.error("Error cargando estadísticas de energía del showroom:", error);
    } finally {
      if (requestId === this._energyRequestId) {
        this._energyLoading = false;
        const viewChanged = previousViewSignature !== this._energyViewSignature();
        if (!hadVisibleData || viewChanged) this._requestRender();
        this._scheduleEnergyRefresh();
      }
    }
  }

  _setEnergyRange(range) {
    if (!["day", "month", "year"].includes(range) || range === this._energyRange) return;
    this._energyRange = range;
    this._energyData = [];
    this._energyError = null;
    this._energyLastLoadedAt = 0;
    this._energyAutoFollow = true;
    this._energyScrollLeft = null;
    this._loadEnergyStatistics();
  }

  _shiftEnergyDay(delta) {
    if (this._energyRange !== "day") return;
    const step = Number(delta);
    if (!Number.isFinite(step) || step === 0) return;
    const nextOffset = Math.min(0, this._energyDayOffset + step);
    if (nextOffset === this._energyDayOffset) return;
    this._energyDayOffset = nextOffset;
    this._energyData = [];
    this._energyError = null;
    this._energyLastLoadedAt = 0;
    this._energyAutoFollow = true;
    this._energyScrollLeft = null;
    this._loadEnergyStatistics();
  }

  _resetEnergyDay() {
    if (this._energyRange !== "day" || this._energyDayOffset === 0) return;
    this._energyDayOffset = 0;
    this._energyData = [];
    this._energyError = null;
    this._energyLastLoadedAt = 0;
    this._energyAutoFollow = true;
    this._energyScrollLeft = null;
    this._loadEnergyStatistics();
  }

  _formatEnergy(value, digits = 2) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return "--";
    return numeric.toLocaleString("es-BO", { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  _energyLabel(timestamp, range = this._energyRange) {
    const date = new Date(Number(timestamp));
    if (!Number.isFinite(date.getTime())) return "--";
    if (range === "year") return date.toLocaleDateString("es-BO", { month: "short" }).replace(".", "");
    if (range === "month") return String(date.getDate());
    return date.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  _captureEnergyChartScroll() {
    const wrap = this.shadowRoot?.querySelector("[data-energy-scroll]");
    if (!wrap) return;
    const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
    this._energyScrollLeft = wrap.scrollLeft;
    this._energyAutoFollow = maxScroll <= 0 || maxScroll - wrap.scrollLeft <= 8;
  }

  _handleEnergyScroll(event) {
    const wrap = event.target?.closest?.("[data-energy-scroll]");
    if (!wrap) return;
    const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
    this._energyScrollLeft = wrap.scrollLeft;
    this._energyAutoFollow = maxScroll <= 0 || maxScroll - wrap.scrollLeft <= 8;
  }

  _restoreEnergyChartScroll() {
    const wrap = this.shadowRoot?.querySelector("[data-energy-scroll]");
    if (!wrap) return;
    const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
    if (this._energyAutoFollow || this._energyScrollLeft === null) {
      wrap.scrollLeft = maxScroll;
      this._energyScrollLeft = wrap.scrollLeft;
      return;
    }
    wrap.scrollLeft = Math.max(0, Math.min(this._energyScrollLeft, maxScroll));
  }

  _energyChart() {
    const rows = this._energyData;
    if (this._energyLoading && !rows.length) return `<div class="energy-empty"><span class="energy-spinner"></span>Consultando estadísticas de Home Assistant…</div>`;
    if (this._energyError) return `<div class="energy-empty error">${this._icon("status")}<span>${this._escape(this._energyError)}</span></div>`;
    if (!rows.length) return `<div class="energy-empty">No hay estadísticas de consumo disponibles para este período.</div>`;

    const height = 280;
    const padLeft = 14;
    const padRight = 16;
    const padTop = 22;
    const padBottom = 42;
    const slotWidth = this._energyRange === "day" ? 64 : this._energyRange === "month" ? 36 : 58;
    const width = Math.max(620, rows.length * slotWidth + padLeft + padRight);
    const chartHeight = height - padTop - padBottom;
    const chartWidth = width - padLeft - padRight;
    const maxValue = Math.max(...rows.map((row) => row.change), 0.001);
    const gap = this._energyRange === "day" ? 10 : rows.length > 24 ? 4 : 7;
    const barWidth = Math.max(6, (chartWidth - gap * Math.max(0, rows.length - 1)) / rows.length);
    const labelEvery = this._energyRange === "month" ? Math.max(1, Math.ceil(rows.length / 10)) : this._energyRange === "day" ? 2 : 1;
    const ratios = [0, .25, .5, .75, 1];
    const grid = ratios.map((ratio) => {
      const y = padTop + chartHeight * (1 - ratio);
      return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}" class="energy-grid-line"/>`;
    }).join("");
    const axis = ratios.map((ratio) => {
      const y = padTop + chartHeight * (1 - ratio);
      const label = this._formatEnergy(maxValue * ratio, maxValue < 1 ? 2 : 1);
      return `<span class="energy-y-tick" style="top:${y.toFixed(1)}px">${this._escape(label)}</span>`;
    }).join("");
    const bars = rows.map((row, index) => {
      const x = padLeft + index * (barWidth + gap);
      const barHeight = row.change > 0 ? Math.max(2, (row.change / maxValue) * chartHeight) : 1;
      const y = padTop + chartHeight - barHeight;
      const showLabel = index % labelEvery === 0 || index === rows.length - 1;
      const label = this._energyLabel(row.start);
      const status = row.partial ? " · en curso" : "";
      const currentMarker = row.partial
        ? `<text x="${(x + barWidth / 2).toFixed(1)}" y="${(padTop + 10).toFixed(1)}" text-anchor="middle" class="energy-current-label">ahora</text>`
        : "";
      return `<g class="energy-bar-group ${row.partial ? "is-current" : ""}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${barHeight.toFixed(1)}" rx="${Math.min(4, barWidth / 2).toFixed(1)}" class="energy-bar ${row.partial ? "is-partial" : ""}"><title>${this._escape(label)} · ${this._formatEnergy(row.change)} kWh${status}</title></rect>${currentMarker}${showLabel ? `<text x="${(x + barWidth / 2).toFixed(1)}" y="${height - 14}" text-anchor="middle" class="energy-axis-text">${this._escape(label)}</text>` : ""}</g>`;
    }).join("");

    return `<div class="energy-chart-layout"><div class="energy-y-axis" aria-hidden="true"><span class="energy-y-unit">kWh</span>${axis}</div><div class="energy-chart-wrap" data-energy-scroll><svg class="energy-chart" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfica de consumo energético estimado en kWh">${grid}${bars}</svg></div></div>`;
  }

  async _loadHistory() {
    const config = this._config();
    if (!this._hass?.callApi) return;

    const hours = Math.max(config.historyHours, config.chartHours);
    const start = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    const end = new Date().toISOString();
    const entityIds = [
      config.lightCountSensor,
      ...config.spots.map((item) => item.entity),
      ...config.samples.map((item) => item.entity),
    ].filter(Boolean).join(",");

    if (!entityIds) return;

    const path =
      `history/period/${encodeURIComponent(start)}` +
      `?filter_entity_id=${encodeURIComponent(entityIds)}` +
      `&end_time=${encodeURIComponent(end)}` +
      "&minimal_response&no_attributes";

    try {
      this._history = await this._hass.callApi("GET", path);
      this._historyError = "";
    } catch (error) {
      this._history = [];
      this._historyError = "No se pudo cargar el historial.";
      console.error("No se pudo cargar el historial del showroom:", error);
    }
    this._requestRender();
  }

  _state(entityId) {
    return this._liveStates.get(entityId) || this._hass?.states?.[entityId];
  }

  _isUnavailable(entityId) {
    const state = this._state(entityId)?.state;
    return !state || state === "unknown" || state === "unavailable";
  }

  _visibleSwitchState(entityId) {
    return this._pendingSwitches.get(entityId)?.desired || this._state(entityId)?.state || "unavailable";
  }

  async _toggleSwitch(entityId) {
    if (!entityId || !this._hass) return;
    const stateObject = this._state(entityId);
    if (!stateObject || ["unknown", "unavailable"].includes(stateObject.state)) {
      this._switchErrors.set(entityId, "No disponible");
      this._requestRender();
      return;
    }

    const visibleState = this._visibleSwitchState(entityId);
    const desired = visibleState === "on" ? "off" : "on";
    const service = desired === "on" ? "turn_on" : "turn_off";
    const domain = entityId.split(".")[0] || "switch";

    this._pendingSwitches.set(entityId, { desired, startedAt: Date.now() });
    this._switchErrors.delete(entityId);
    this._requestRender();

    try {
      await this._hass.callService(domain, service, { entity_id: entityId });
      const previousTimer = this._switchTimers.get(entityId);
      if (previousTimer) clearTimeout(previousTimer);
      const timer = setTimeout(() => this._verifySwitchState(entityId, desired), 6000);
      this._switchTimers.set(entityId, timer);
    } catch (error) {
      this._pendingSwitches.delete(entityId);
      this._switchErrors.set(entityId, "La acción falló");
      this._requestRender();
      console.error(`Error ejecutando ${service} en ${entityId}:`, error);
    }
  }

  async _verifySwitchState(entityId, desired) {
    await this._fetchCurrentStates();
    const confirmed = this._state(entityId)?.state === desired;
    this._pendingSwitches.delete(entityId);
    this._switchTimers.delete(entityId);
    if (confirmed) this._switchErrors.delete(entityId);
    else this._switchErrors.set(entityId, "Sin confirmación");
    this._requestRender();
  }

  _sceneStatus(scene) {
    const expectations = [
      ...scene.onEntities.map((entityId) => ({ entityId, desired: "on" })),
      ...scene.offEntities.map((entityId) => ({ entityId, desired: "off" })),
    ];

    if (!expectations.length) {
      return { active: false, unavailable: false, mismatches: [] };
    }

    const unavailable = expectations.some(({ entityId }) => this._isUnavailable(entityId));
    const mismatches = expectations.filter(
      ({ entityId, desired }) => this._state(entityId)?.state !== desired,
    );

    return {
      active: !unavailable && mismatches.length === 0,
      unavailable,
      mismatches,
    };
  }

  _sceneExpectations(scene) {
    return [
      ...scene.offEntities.map((entityId) => ({ entityId, desired: "off" })),
      ...scene.onEntities.map((entityId) => ({ entityId, desired: "on" })),
    ];
  }

  _markExpectedStates(expectations) {
    const startedAt = Date.now();
    for (const { entityId, desired } of expectations) {
      this._pendingSwitches.set(entityId, { desired, startedAt });
      this._switchErrors.delete(entityId);
    }
  }

  _clearExpectedStates(expectations) {
    for (const { entityId } of expectations) {
      this._pendingSwitches.delete(entityId);
      const timer = this._switchTimers.get(entityId);
      if (timer) clearTimeout(timer);
      this._switchTimers.delete(entityId);
    }
  }

  async _setEntitiesState(entityIds, desired) {
    const ids = [...new Set((entityIds || []).filter(Boolean))];
    if (!ids.length) return;

    const groups = new Map();
    for (const entityId of ids) {
      const domain = entityId.split(".")[0];
      if (!domain) continue;
      if (!groups.has(domain)) groups.set(domain, []);
      groups.get(domain).push(entityId);
    }

    const service = desired === "on" ? "turn_on" : "turn_off";
    for (const [domain, domainEntities] of groups) {
      await this._hass.callService(domain, service, { entity_id: domainEntities });
    }
  }

  async _waitForExpectedStates(expectations, timeoutMs = 7000) {
    const deadline = Date.now() + timeoutMs;
    let mismatches = expectations;

    while (Date.now() < deadline) {
      await this._fetchCurrentStates();
      mismatches = expectations.filter(
        ({ entityId, desired }) => this._state(entityId)?.state !== desired,
      );
      if (!mismatches.length) return { ok: true, mismatches: [] };
      await new Promise((resolve) => setTimeout(resolve, 450));
    }

    return { ok: false, mismatches };
  }

  async _runScene(sceneKey, label) {
    if (!sceneKey || this._pendingAction) return;

    const config = this._config();
    const scene = this._allScenes(config).find(
      (item) => item.key === sceneKey || item.entity === sceneKey,
    );
    if (!scene) {
      this._notify("La escena no está configurada.", "error");
      return;
    }

    const expectations = this._sceneExpectations(scene);
    this._pendingAction = scene.key;
    this._markExpectedStates(expectations);
    this._requestRender();

    let sceneServiceError = null;

    try {
      if (scene.entity && !scene.directOnly) {
        try {
          await this._hass.callService("scene", "turn_on", {
            entity_id: scene.entity,
          });
        } catch (error) {
          sceneServiceError = error;
          console.warn(`La escena ${scene.entity} no respondió; se aplicará el perfil directo.`, error);
        }
      }

      await this._setEntitiesState(scene.offEntities, "off");
      await this._setEntitiesState(scene.onEntities, "on");

      const verification = await this._waitForExpectedStates(expectations);
      if (!verification.ok) {
        const failed = verification.mismatches.map((item) => item.entityId).join(", ");
        throw new Error(`No se confirmaron los estados de: ${failed}`);
      }

      const message = sceneServiceError
        ? `${label || "Modo"} aplicado mediante control directo.`
        : `${label || "Modo"} activo.`;
      this._notify(message, "success");
    } catch (error) {
      for (const { entityId: failedEntity, desired } of expectations) {
        if (this._state(failedEntity)?.state !== desired) {
          this._switchErrors.set(failedEntity, "No confirmó el modo");
        }
      }
      this._notify("No se pudo aplicar completamente el modo seleccionado.", "error");
      console.error("Error aplicando modo del showroom:", error);
    } finally {
      this._clearExpectedStates(expectations);
      this._pendingAction = "";
      await this._fetchCurrentStates();
      this._requestRender();
    }
  }

  async _executeGeneralPower(desired, options = {}) {
    if (!this._hass || this._pendingAction || !["on", "off"].includes(desired)) {
      return false;
    }

    const config = this._config();
    const scriptEntity = desired === "on" ? config.powerOnScript : config.powerOffScript;

    const expectations = config.sceneControlEntities.map((entityId) => ({
      entityId,
      desired,
    }));
    const successMessage = options.successMessage ||
      (desired === "on" ? "Iluminación general encendida." : "Iluminación general apagada.");
    const errorMessage = options.errorMessage ||
      (desired === "on"
        ? "No se pudo encender toda la iluminación."
        : "No se pudo apagar toda la iluminación.");

    this._pendingAction = scriptEntity || `direct-power-${desired}`;
    this._markExpectedStates(expectations);
    this._requestRender();

    let scriptError = null;

    try {
      if (scriptEntity) {
        try {
          await this._hass.callService("script", "turn_on", {
            entity_id: scriptEntity,
          });
        } catch (error) {
          scriptError = error;
          console.warn(`El script ${scriptEntity} no respondió; se aplicará el control directo.`, error);
        }
      }

      await this._setEntitiesState(config.sceneControlEntities, desired);
      const verification = await this._waitForExpectedStates(expectations);

      if (!verification.ok) {
        const failed = verification.mismatches.map((item) => item.entityId).join(", ");
        throw new Error(`No se confirmaron los estados de: ${failed}`);
      }

      this._confirmAction = "";
      this._notify(successMessage, "success");
      return true;
    } catch (error) {
      for (const { entityId, desired: expectedState } of expectations) {
        if (this._state(entityId)?.state !== expectedState) {
          this._switchErrors.set(entityId, "Sin confirmación");
        }
      }
      this._notify(errorMessage, "error");
      console.error("Error ejecutando el control general del showroom:", {
        error,
        scriptError,
        desired,
      });
      return false;
    } finally {
      this._clearExpectedStates(expectations);
      this._pendingAction = "";
      await this._fetchCurrentStates();
      this._requestRender();
    }
  }

  async _confirmGeneralPower() {
    const desired = this._confirmAction;
    if (!["on", "off"].includes(desired)) return;

    await this._executeGeneralPower(desired, {
      successMessage:
        desired === "on"
          ? "Toda la iluminación del showroom está encendida."
          : "Toda la iluminación del showroom está apagada.",
    });
  }

  async _clearScene() {
    if (this._pendingAction) return;

    await this._executeGeneralPower("off", {
      successMessage: "Escena apagada. La iluminación del showroom quedó apagada.",
      errorMessage: "No se pudo apagar completamente la escena.",
    });
  }

  async _mediaAction(service) {
    const entityId = this._config().mediaPlayer;
    if (!entityId || !service || this._isUnavailable(entityId)) return;
    try {
      await this._hass.callService("media_player", service, { entity_id: entityId });
    } catch (error) {
      this._notify("No se pudo controlar el reproductor.", "error");
      console.error(`Error ejecutando media_player.${service}:`, error);
    }
  }

  _notify(message, type = "success") {
    clearTimeout(this._toastTimer);
    this._toast = { message, type };
    this._requestRender();
    this._toastTimer = setTimeout(() => {
      this._toast = null;
      this._requestRender();
    }, 4200);
  }

  _historyMap() {
    const result = new Map();
    for (const group of this._history || []) {
      const entityId = group?.[0]?.entity_id;
      if (entityId) result.set(entityId, group);
    }
    return result;
  }

  _historySegments(group, startTime, endTime) {
    if (!Array.isArray(group) || !group.length) return [];
    const events = group
      .map((item) => ({
        state: item.state,
        time: new Date(item.last_changed || item.last_updated).getTime(),
      }))
      .filter((item) => Number.isFinite(item.time))
      .sort((a, b) => a.time - b.time);
    if (!events.length) return [];

    const segments = [];
    for (let index = 0; index < events.length; index += 1) {
      const current = events[index];
      const next = events[index + 1];
      const start = Math.max(startTime, current.time);
      const end = Math.min(endTime, next?.time ?? endTime);
      if (end <= start) continue;
      segments.push({
        state: current.state,
        left: ((start - startTime) / (endTime - startTime)) * 100,
        width: ((end - start) / (endTime - startTime)) * 100,
      });
    }
    return segments;
  }

  _sparkline(entityId, hours) {
    const group = this._historyMap().get(entityId) || [];
    const endTime = Date.now();
    const startTime = endTime - hours * 60 * 60 * 1000;
    const points = group
      .map((item) => ({
        value: Number(item.state),
        time: new Date(item.last_changed || item.last_updated).getTime(),
      }))
      .filter((item) => Number.isFinite(item.value) && Number.isFinite(item.time) && item.time >= startTime)
      .sort((a, b) => a.time - b.time);

    const current = Number(this._state(entityId)?.state);
    if (Number.isFinite(current)) points.push({ value: current, time: endTime });
    if (!points.length) return { path: "", min: "--", max: "--", avg: "--" };

    const values = points.map((item) => item.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
    const range = max - min || 1;
    const path = points
      .map((item, index) => {
        const x = ((item.time - startTime) / (endTime - startTime)) * 300;
        const y = 66 - ((item.value - min) / range) * 52;
        return `${index ? "L" : "M"}${Math.max(0, Math.min(300, x)).toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return {
      path,
      min: this._formatNumber(min),
      max: this._formatNumber(max),
      avg: this._formatNumber(avg),
    };
  }

  _formatNumber(value) {
    if (!Number.isFinite(value)) return "--";
    return new Intl.NumberFormat("es-BO", { maximumFractionDigits: 1 }).format(value);
  }

  _updateClock() {
    if (!this.shadowRoot) return;

    const now = new Date();
    const parts = new Intl.DateTimeFormat("es-BO", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).formatToParts(now);

    const hour = parts.find((part) => part.type === "hour")?.value || "--";
    const minute = parts.find((part) => part.type === "minute")?.value || "--";
    const period = (parts.find((part) => part.type === "dayPeriod")?.value || "")
      .replaceAll(".", "")
      .replaceAll(" ", "")
      .toUpperCase();

    for (const element of this.shadowRoot.querySelectorAll("[data-clock-time]")) {
      element.textContent = `${hour}:${minute}`;
    }

    for (const element of this.shadowRoot.querySelectorAll("[data-clock-period]")) {
      element.textContent = period || "";
    }

    const timeElement = this.shadowRoot.querySelector("[data-current-time]");
    if (timeElement) {
      timeElement.dateTime = now.toISOString();
      timeElement.setAttribute("aria-label", `${hour}:${minute} ${period}`.trim());
    }
  }

  _icon(name, className = "") {
    const path = ICON_PATHS[name] || ICON_PATHS.bulb;
    return `<svg class="icon ${this._escape(className)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  _escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  _renderDevice(item) {
    const stateObject = this._state(item.entity);
    const state = this._visibleSwitchState(item.entity);
    const isOn = state === "on";
    const unavailable = !stateObject || ["unknown", "unavailable"].includes(stateObject.state);
    const pending = this._pendingSwitches.has(item.entity);
    const error = this._switchErrors.get(item.entity);
    const status = error || (pending
      ? (state === "on" ? "Encendiendo…" : "Apagando…")
      : unavailable
        ? "No disponible"
        : isOn
          ? "Encendido"
          : "Apagado");

    return `
      <button
        class="device ${isOn ? "is-on" : ""} ${pending ? "is-pending" : ""} ${error ? "is-error" : ""}"
        data-action="toggle-switch"
        data-entity="${this._escape(item.entity)}"
        aria-pressed="${isOn}"
        aria-label="${this._escape(`${item.name}: ${status}`)}"
        ${unavailable ? "disabled" : ""}
      >
        <span class="device-icon">${this._icon(item.icon)}</span>
        <span class="device-copy">
          <strong>${this._escape(item.name)}</strong>
          <small>${this._escape(status)}</small>
        </span>
        <span class="device-switch" aria-hidden="true"><i></i></span>
      </button>
    `;
  }

  _renderDeviceGroup(title, eyebrow, items) {
    return `
      <section class="surface control-section">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">${this._escape(eyebrow)}</span>
            <h2>${this._escape(title)}</h2>
          </div>
        </div>
        <div class="device-grid">${items.map((item) => this._renderDevice(item)).join("")}</div>
      </section>
    `;
  }

  _renderWeather() {
    const config = this._config();
    const stateObject = this._state(config.weather);
    if (!stateObject) {
      return `
        <section class="surface weather-card is-unavailable">
          <span class="eyebrow">Clima</span>
          <h2>Entidad no encontrada</h2>
          <code>${this._escape(config.weather)}</code>
        </section>
      `;
    }

    const attrs = stateObject.attributes || {};
    const condition = stateObject.state;
    const forecast = this._forecast.slice(0, 3);
    return `
      <section class="surface weather-card">
        <div class="weather-main">
          <div class="weather-symbol">${this._escape(CONDITION_SYMBOLS[condition] || "·")}</div>
          <div class="weather-copy">
            <span class="eyebrow">Clima · Casa</span>
            <h2>${this._escape(CONDITION_LABELS[condition] || condition)}</h2>
            <p>Humedad ${this._escape(attrs.humidity ?? "Sin datos")}% · Viento ${this._escape(attrs.wind_speed ?? "Sin datos")} ${this._escape(attrs.wind_speed_unit ?? "")}</p>
          </div>
          <strong class="temperature">${this._escape(attrs.temperature ?? "--")}${this._escape(attrs.temperature_unit ?? "°")}</strong>
        </div>
        ${config.showForecast ? `
          <div class="forecast-row">
            ${forecast.length ? forecast.map((item) => {
              const date = new Date(item.datetime);
              const label = new Intl.DateTimeFormat("es-BO", { weekday: "short" }).format(date);
              return `
                <div class="forecast-item">
                  <span>${this._escape(label)}</span>
                  <b>${this._escape(CONDITION_SYMBOLS[item.condition] || "·")}</b>
                  <strong>${this._escape(item.temperature ?? item.native_temperature ?? "--")}°</strong>
                </div>
              `;
            }).join("") : '<span class="forecast-empty">Pronóstico no disponible</span>'}
          </div>
        ` : ""}
      </section>
    `;
  }

  _renderMedia() {
    const config = this._config();
    const stateObject = this._state(config.mediaPlayer);
    const unavailable = !stateObject || ["unknown", "unavailable"].includes(stateObject.state);
    const attrs = stateObject?.attributes || {};
    const isPlaying = stateObject?.state === "playing";
    const stateLabel = unavailable
      ? "No disponible"
      : isPlaying
        ? "Reproduciendo"
        : stateObject?.state === "paused"
          ? "En pausa"
          : stateObject?.state === "idle"
            ? "En espera"
            : stateObject?.state || "Detenido";
    const title = attrs.media_title || attrs.friendly_name || "Showroom 1";
    const artist = attrs.media_artist || attrs.source || "Música del showroom";
    const volume = Number(attrs.volume_level);

    const control = (service, icon, label, primary = false) => `
      <button
        class="media-button ${primary ? "primary" : ""}"
        data-action="media"
        data-service="${service}"
        aria-label="${this._escape(label)}"
        title="${this._escape(label)}"
        ${unavailable ? "disabled" : ""}
      >${this._icon(icon)}</button>
    `;

    return `
      <section class="surface media-card ${unavailable ? "is-unavailable" : ""}">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Multimedia</span>
            <h2>Música</h2>
          </div>
          <span class="media-state ${isPlaying ? "is-playing" : ""}">${this._escape(stateLabel)}</span>
        </div>
        <div class="media-body">
          <div class="media-art">${this._icon("music")}</div>
          <div class="media-copy">
            <strong>${this._escape(title)}</strong>
            <span>${this._escape(artist)}</span>
            <small>${Number.isFinite(volume) ? `Volumen ${Math.round(volume * 100)}%` : "Volumen no informado"}</small>
          </div>
        </div>
        <div class="media-controls">
          ${control("volume_down", "volumeDown", "Bajar volumen")}
          ${control("media_previous_track", "previous", "Pista anterior")}
          ${control("media_play_pause", isPlaying ? "pause" : "play", isPlaying ? "Pausar" : "Reproducir", true)}
          ${control("media_next_track", "next", "Pista siguiente")}
          ${control("volume_up", "volumeUp", "Subir volumen")}
        </div>
      </section>
    `;
  }

  _renderSceneButton(scene) {
    const pending = this._pendingAction === scene.key;
    const status = this._sceneStatus(scene);
    const stateText = pending
      ? "Aplicando..."
      : status.active
        ? "Activo"
        : status.unavailable
          ? "Sin datos"
          : "Inactivo";

    return `
      <button
        class="scene ${pending ? "is-pending" : ""} ${status.active ? "is-active" : ""} ${status.unavailable ? "is-unavailable" : ""}"
        data-action="run-scene"
        data-scene-key="${this._escape(scene.key)}"
        data-label="${this._escape(scene.name)}"
        aria-pressed="${status.active}"
        aria-label="${this._escape(`${scene.name}: ${stateText}`)}"
        ${this._pendingAction && !pending ? "disabled" : ""}
      >
        <span class="scene-icon">${this._icon(scene.icon)}</span>
        <span class="scene-copy">
          <strong>${this._escape(scene.name)}</strong>
          <small>${this._escape(scene.subtitle)}</small>
        </span>
        <span class="scene-state" aria-hidden="true">${this._escape(stateText)}</span>
      </button>
    `;
  }

  _renderSceneBlock({ eyebrow, title, scenes, className }) {
    const config = this._config();
    const activeScene = scenes.find((scene) => this._sceneStatus(scene).active);
    const clearPending = this._pendingAction === config.powerOffScript;
    const hasControlledLightsOn = config.sceneControlEntities.some(
      (entityId) => this._state(entityId)?.state === "on",
    );
    const clearDisabled = Boolean(this._pendingAction) || !hasControlledLightsOn;

    return `
      <section class="surface scenes-card ${this._escape(className)}">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="eyebrow">${this._escape(eyebrow)}</span>
            <h2>${this._escape(title)}</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${activeScene ? "is-active" : ""}">
              ${this._escape(clearPending ? "Apagando…" : activeScene ? activeScene.name : "Selección manual")}
            </span>
            <button
              class="clear-scene-button"
              data-action="clear-scene"
              aria-label="Apagar toda la iluminación de escenas"
              title="Apagar escena"
              ${clearDisabled && !clearPending ? "disabled" : ""}
            >
              <span>${this._icon("power")}</span>
              <strong>${clearPending ? "Apagando…" : "Apagar escena"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid">${scenes.map((scene) => this._renderSceneButton(scene)).join("")}</div>
      </section>
    `;
  }

  _renderScenes() {
    const config = this._config();
    const scenes = [...config.scenes, ...config.sampleScenes];
    const activeScene = scenes.find((scene) => this._sceneStatus(scene).active);
    const clearPending = this._pendingAction === config.powerOffScript;
    const hasControlledLightsOn = config.sceneControlEntities.some(
      (entityId) => this._state(entityId)?.state === "on",
    );
    const clearDisabled = Boolean(this._pendingAction) || !hasControlledLightsOn;

    return `
      <section class="surface scenes-card quick-scenes-card">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="section-kicker">Ambientes</span>
            <h2>Escenas rápidas</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${activeScene ? "is-active" : ""}">${this._escape(clearPending ? "Apagando..." : activeScene ? activeScene.name : "Manual")}</span>
            <button
              class="clear-scene-button"
              data-action="clear-scene"
              aria-label="Apagar toda la iluminación de escenas"
              title="Apagar escena"
              ${clearDisabled && !clearPending ? "disabled" : ""}
            >
              <span>${this._icon("power")}</span>
              <strong>${clearPending ? "Apagando..." : "Apagar"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid quick-scene-grid">${scenes.map((scene) => this._renderSceneButton(scene)).join("")}</div>
      </section>
    `;
  }

  _renderGeneralControl(includeReflector = true) {
    const config = this._config();
    const onPending = this._pendingAction === config.powerOnScript;
    const offPending = this._pendingAction === config.powerOffScript;
    return `
      <section class="surface general-card">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Acciones rápidas</span>
            <h2>Control general</h2>
          </div>
        </div>
        <div class="general-actions">
          <button class="general-action power-on" data-action="open-power-on" ${this._pendingAction ? "disabled" : ""}>
            <span>${this._icon("bulb")}</span>
            <strong>${onPending ? "Encendiendo…" : "Encender todo"}</strong>
          </button>
          <button class="general-action power-off" data-action="open-power-off" ${this._pendingAction ? "disabled" : ""}>
            <span>${this._icon("power")}</span>
            <strong>${offPending ? "Apagando…" : "Apagar todo"}</strong>
          </button>
        </div>
        ${includeReflector && config.reflector ? `
          <div class="isolated-control">
            <span class="isolated-label">Control aislado</span>
            ${this._renderDevice(config.reflector)}
          </div>
        ` : ""}
      </section>
    `;
  }

  _renderActivity() {
    const definition = this._energyRangeDefinition();
    const values = this._energyData.map((row) => Math.max(0, Number(row.change) || 0));
    const total = values.reduce((sum, value) => sum + value, 0);
    const average = values.length ? total / values.length : 0;
    const peak = values.length ? Math.max(...values) : 0;
    const monthStartLabel = new Date().toLocaleDateString("es-BO", { month: "short", year: "numeric" }).replace(".", "");
    const intervalStatus = this._energyRange === "day"
      ? `${values.length} ${values.length === 1 ? "hora" : "horas"}`
      : this._energyRange === "month"
        ? `${values.length} ${values.length === 1 ? "día" : "días"}`
        : `${values.length} ${values.length === 1 ? "mes" : "meses"}`;

    return `
      <section class="surface activity-card energy-shell">
        <div class="energy-header">
          <div class="energy-heading">
            <div class="energy-heading-icon">${this._icon("energy")}</div>
            <div>
              <span class="eyebrow">Estimación por estados ON/OFF</span>
              <h2>Consumo energético</h2>
            </div>
          </div>
          <div class="energy-current" title="Consumo estimado desde el inicio del mes actual hasta ahora">
            <small>Consumo del mes</small>
            <strong>${this._energyLoading && this._energyMonthTotal === null ? "..." : this._energyMonthTotal === null ? "Sin datos" : `${this._formatEnergy(this._energyMonthTotal)} kWh`}</strong>
            <span>${this._escape(monthStartLabel)} · hasta ahora</span>
          </div>
        </div>

        <div class="energy-toolbar">
          <div class="energy-tabs" role="tablist" aria-label="Período de consumo energético">
            ${[["day","Día"],["month","Mes"],["year","Año"]].map(([range,label]) => `<button class="energy-tab ${this._energyRange === range ? "is-active" : ""}" data-action="energy-range" data-range="${range}" role="tab" aria-selected="${this._energyRange === range}">${label}</button>`).join("")}
          </div>
          <div class="energy-toolbar-actions">
            ${this._energyRange === "day" ? `<div class="energy-day-nav" aria-label="Navegar por días"><button class="energy-day-step" data-action="energy-day-prev" title="Día anterior" aria-label="Día anterior">‹</button><button class="energy-day-current" data-action="energy-day-today" title="${this._energyDayOffset === 0 ? "Hoy" : "Volver a hoy"}">${this._energyDayOffset === 0 ? "Hoy" : this._energyDayOffset === -1 ? "Ayer" : `${Math.abs(this._energyDayOffset)} d`}</button><button class="energy-day-step" data-action="energy-day-next" title="Día siguiente" aria-label="Día siguiente" ${this._energyDayOffset === 0 ? "disabled" : ""}>›</button></div>` : ""}
            <button class="icon-button" data-action="refresh-energy" aria-label="Actualizar consumo" title="Actualizar consumo">${this._icon("refresh")}</button>
          </div>
        </div>

        <div class="energy-summary">
          <div class="energy-stat"><small>Total del período</small><strong>${this._energyLoading && !this._energyData.length ? "…" : `${this._formatEnergy(total)} kWh`}</strong><span>${this._escape(definition.title)}</span></div>
          <div class="energy-stat"><small>Promedio por ${this._escape(definition.intervalLabel)}</small><strong>${this._energyLoading && !this._energyData.length ? "…" : `${this._formatEnergy(average)} kWh`}</strong><span>${this._escape(intervalStatus)}</span></div>
          <div class="energy-stat"><small>Mayor intervalo</small><strong>${this._energyLoading && !this._energyData.length ? "…" : `${this._formatEnergy(peak)} kWh`}</strong><span>Pico estimado del período</span></div>
        </div>

        <div class="energy-note">9 circuitos incluidos. Potencia instalada conocida: 1.395 kW. Reflector exterior pendiente de potencia.</div>

        <div class="energy-chart-card">
          <div class="energy-chart-title"><strong>${this._energyRange === "day" ? "Consumo por hora" : this._energyRange === "month" ? "Consumo por día" : "Consumo por mes"}</strong><span>${this._escape(definition.title)}</span></div>
          ${this._energyChart()}
        </div>
      </section>
    `;
  }

  _renderSystem() {
    const config = this._config();
    const batteryState = this._state(config.batteryLevel);
    const battery = Number(batteryState?.state);
    const batteryClass = Number.isFinite(battery)
      ? battery > 60 ? "good" : battery > 25 ? "warning" : "danger"
      : "muted";

    return `
      <section class="surface system-card">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Infraestructura</span>
            <h2>Sistema</h2>
          </div>
        </div>
        <div class="system-grid">
          <article class="system-tile system-tile-wide ${batteryClass}">
            <span class="system-icon">${this._icon("battery")}</span>
            <div><small>Batería Pad</small><strong>${Number.isFinite(battery) ? `${this._escape(battery)}%` : "No disponible"}</strong></div>
          </article>
        </div>
      </section>
    `;
  }

  _renderConfirmDialog() {
    if (!["on", "off"].includes(this._confirmAction)) return "";

    const isPowerOn = this._confirmAction === "on";
    const config = this._config();
    const pendingEntity = isPowerOn ? config.powerOnScript : config.powerOffScript;
    const pending = this._pendingAction === pendingEntity;
    const title = isPowerOn
      ? "¿Encender toda la iluminación?"
      : "¿Apagar todo el showroom?";
    const description = isPowerOn
      ? "Se encenderán las luminarias generales del showroom. Después podrás elegir una escena o ajustar cada zona de forma individual."
      : "Se apagarán las luminarias generales del showroom y cualquier escena activa.";
    const confirmLabel = isPowerOn ? "Sí, encender" : "Sí, apagar";

    return `
      <div class="dialog-backdrop" data-action="cancel-power-confirm">
        <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="power-dialog-title" data-dialog-card>
          <div class="dialog-icon ${isPowerOn ? "is-power-on" : "is-power-off"}">${this._icon(isPowerOn ? "bulb" : "power")}</div>
          <span class="eyebrow">Confirmar acción</span>
          <h2 id="power-dialog-title">${this._escape(title)}</h2>
          <p>${this._escape(description)}</p>
          <div class="dialog-actions">
            <button class="secondary-button" data-action="cancel-power-confirm" ${pending ? "disabled" : ""}>Cancelar</button>
            <button class="primary-button ${isPowerOn ? "confirm-on" : ""}" data-action="confirm-power" ${pending ? "disabled" : ""}>${pending ? "Ejecutando…" : this._escape(confirmLabel)}</button>
          </div>
        </section>
      </div>
    `;
  }

  _renderNavigation() {
    const items = [
      ["home", "bulb", "Inicio"],
      ["lights", "spot", "Iluminación"],
      ["energy", "energy", "Energía"],
      ["system", "health", "Sistema"],
    ];

    return `
      <nav class="view-navigation" aria-label="Secciones del showroom">
        ${items.map(([view, icon, label]) => `
          <button
            class="view-navigation-button ${this._activeView === view ? "is-active" : ""}"
            data-action="set-view"
            data-view="${view}"
            aria-current="${this._activeView === view ? "page" : "false"}"
          >
            ${this._icon(icon)}
            <span>${label}</span>
          </button>
        `).join("")}
      </nav>
    `;
  }

  _renderActiveView(config) {
    if (this._activeView === "lights") {
      return `
        <section class="view-panel view-lights" aria-labelledby="lights-view-title">
          <header class="view-heading">
            <div><span class="section-kicker">Control directo</span><h1 id="lights-view-title">Iluminación</h1></div>
            <span>${config.spots.length + config.samples.length + (config.reflector ? 1 : 0)} circuitos</span>
          </header>
          <div class="lighting-layout">
            <section class="surface control-section spots-section">
              <div class="section-heading compact-heading"><div><h2>Spots</h2></div></div>
              <div class="device-grid">${config.spots.map((item) => this._renderDevice(item)).join("")}</div>
            </section>
            <section class="surface control-section samples-section">
              <div class="section-heading compact-heading"><div><h2>Muestras</h2></div></div>
              <div class="device-grid">${config.samples.map((item) => this._renderDevice(item)).join("")}</div>
            </section>
            ${config.reflector ? `<section class="surface control-section reflector-section"><div class="section-heading compact-heading"><div><h2>Exterior</h2></div></div>${this._renderDevice(config.reflector)}</section>` : ""}
          </div>
        </section>
      `;
    }

    if (this._activeView === "energy") {
      return `<section class="view-panel view-energy" aria-label="Energía">${this._renderActivity()}</section>`;
    }

    if (this._activeView === "system") {
      return `
        <section class="view-panel view-system" aria-labelledby="system-view-title">
          <header class="view-heading"><div><span class="section-kicker">Estado</span><h1 id="system-view-title">Sistema</h1></div></header>
          <div class="system-layout">${this._renderWeather()}${this._renderSystem()}</div>
        </section>
      `;
    }

    return `
      <section class="view-panel view-home" aria-label="Inicio">
        ${this._renderScenes()}
        <div class="home-layout">
          ${this._renderGeneralControl(false)}
          ${this._renderMedia()}
        </div>
      </section>
    `;
  }

  render() {
    if (!this.shadowRoot || !this._hass) return;
    this._captureEnergyChartScroll();
    this.setAttribute("data-theme", this._theme);

    const config = this._config();
    const weather = this._state(config.weather);
    const weatherAttrs = weather?.attributes || {};
    const condition = weather?.state;
    const nextTheme = this._theme === "dark" ? "claro" : "oscuro";
    const configuredLights = [...config.spots, ...config.samples, ...(config.reflector ? [config.reflector] : [])];
    const lightsOn = configuredLights.filter((item) => this._visibleSwitchState(item.entity) === "on").length;
    const mediaState = this._state(config.mediaPlayer)?.state;
    const mediaLabel = mediaState === "playing" ? "Reproduciendo" : mediaState === "paused" ? "En pausa" : "Detenido";
    const energyLabel = this._energyMonthTotal === null ? "Sin datos" : `${this._formatEnergy(this._energyMonthTotal)} kWh`;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary: #f26522;
          --primary-hover: #e05413;
          --primary-soft: rgba(242, 101, 34, 0.12);
          --primary-medium: rgba(242, 101, 34, 0.20);
          --primary-border: rgba(242, 101, 34, 0.38);
          --primary-glow: rgba(242, 101, 34, 0.25);
          
          --background: #071118;
          --background-secondary: #10191e;
          --background-deep: #040a0f;
          
          --surface: rgba(16, 25, 30, 0.88);
          --surface-strong: rgba(27, 40, 46, 0.94);
          --surface-hover: rgba(255, 255, 255, 0.06);
          --surface-active: rgba(242, 101, 34, 0.12);
          --surface-control: rgba(27, 40, 46, 0.70);
          
          --text-primary: #f5f6f4;
          --text-secondary: #adb4b6;
          --text-tertiary: #747e82;
          
          --border-subtle: rgba(255, 255, 255, 0.06);
          --border-default: rgba(255, 255, 255, 0.09);
          --border-emphasis: rgba(255, 255, 255, 0.16);
          
          --icon-muted: #747e82;
          --track: rgba(255, 255, 255, 0.06);
          --grid-line: rgba(255, 255, 255, 0.06);
          --header: rgba(16, 25, 30, 0.85);
          --overlay: rgba(4, 10, 15, 0.80);
          --modal: #10191e;
          --shadow: rgba(0, 0, 0, 0.40);
          --shadow-strong: rgba(0, 0, 0, 0.65);
          
          --success: #22c55e;
          --warning: #f59e0b;
          --error: #ef4444;
          --info: #38bdf8;
          
          --radius-sm: 10px;
          --radius-md: 16px;
          --radius-lg: 22px;
          --radius-pill: 999px;
          --motion: 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
          
          display: block;
          min-height: 100%;
          container-type: inline-size;
          container-name: showroom-panel;
          color: var(--text-primary);
          background:
            radial-gradient(circle at 10% 4%, rgba(242, 101, 34, 0.08), transparent 36%),
            radial-gradient(circle at 90% 0%, rgba(16, 32, 45, 0.6), transparent 30%),
            linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
          font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-feature-settings: "tnum" 1;
          font-variant-numeric: tabular-nums;
          -webkit-font-smoothing: antialiased;
        }

        :host([data-theme="light"]) {
          --background: #f3f3ef;
          --background-secondary: #e6e8e3;
          --background-deep: #ffffff;
          
          --surface: rgba(255, 255, 255, 0.90);
          --surface-strong: rgba(255, 255, 255, 0.98);
          --surface-hover: rgba(0, 0, 0, 0.04);
          --surface-active: rgba(242, 101, 34, 0.10);
          --surface-control: rgba(0, 0, 0, 0.035);
          
          --text-primary: #151b1e;
          --text-secondary: #586266;
          --text-tertiary: #8a9499;
          
          --border-subtle: rgba(0, 0, 0, 0.06);
          --border-default: rgba(0, 0, 0, 0.09);
          --border-emphasis: rgba(0, 0, 0, 0.16);
          
          --icon-muted: #8a9499;
          --track: rgba(0, 0, 0, 0.06);
          --grid-line: rgba(0, 0, 0, 0.07);
          --header: rgba(255, 255, 255, 0.88);
          --overlay: rgba(15, 20, 24, 0.50);
          --modal: #ffffff;
          --shadow: rgba(0, 0, 0, 0.08);
          --shadow-strong: rgba(0, 0, 0, 0.22);
          
          background:
            radial-gradient(circle at 10% 4%, rgba(242, 101, 34, 0.07), transparent 36%),
            radial-gradient(circle at 90% 0%, rgba(220, 230, 235, 0.5), transparent 30%),
            linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
        }

        * { box-sizing: border-box; }
        button, code { font: inherit; }
        button { color: inherit; }
        button:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
        button:disabled { cursor: not-allowed; opacity: 0.45; }

        .app-shell { min-height: 100vh; }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px clamp(16px, 2.4vw, 32px);
          border-bottom: 1px solid var(--border-subtle);
          background: var(--header);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .topbar-start { min-width: 0; display: flex; align-items: center; gap: 12px; }
        .brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
        .logo-frame {
          flex: 0 0 auto;
          width: 124px;
          height: 40px;
          padding: 4px 8px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          background: var(--surface-control);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background var(--motion), border-color var(--motion);
        }
        .brand-logo, .logo-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          mix-blend-mode: screen;
          transition: filter var(--motion);
        }
        :host([data-theme="light"]) .brand-logo,
        :host([data-theme="light"]) .logo-frame img {
          filter: none;
          mix-blend-mode: multiply;
        }
        .topbar-meta { display: flex; align-items: center; justify-content: flex-end; margin-left: auto; }
        .menu-button,
        .theme-button {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border-default);
          border-radius: 50%;
          background: var(--surface-control);
          cursor: pointer;
          transition: transform var(--motion), background var(--motion), border-color var(--motion);
        }
        .menu-button:hover,
        .theme-button:hover { background: var(--surface-hover); border-color: var(--primary-border); }
        .menu-icon, .theme-icon { width: 20px; height: 20px; }
        .theme-icon-sun, .theme-icon-moon { transform-origin: center; transition: opacity 220ms, transform 220ms; }
        .theme-icon-sun { opacity: 0; transform: rotate(-50deg) scale(0.65); }
        .theme-icon-moon { opacity: 1; transform: rotate(0) scale(1); }
        :host([data-theme="light"]) .theme-icon-sun { opacity: 1; transform: rotate(0) scale(1); }
        :host([data-theme="light"]) .theme-icon-moon { opacity: 0; transform: rotate(45deg) scale(0.65); }

        .dashboard { width: min(1480px, 100%); margin: 0 auto; padding: clamp(14px, 2vw, 28px); }
        .surface {
          min-width: 0;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--surface);
          box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .overview-grid { margin-top: 4px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        .hero-card {
          min-height: 104px;
          padding: 18px 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 24px;
          background:
            radial-gradient(circle at 92% 16%, rgba(242, 101, 34, 0.10), transparent 36%),
            var(--surface);
        }
        .hero-copy { min-width: 0; }
        .hero-card h1 {
          margin: 0;
          font-size: clamp(26px, 2.8vw, 36px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }
        .hero-card h1 span { color: var(--primary); }
        .hero-status {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        }
        .hero-clock {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .hero-clock strong {
          font-size: clamp(26px, 2.8vw, 34px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .hero-clock span {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .hero-weather {
          min-width: 130px;
          padding-left: 20px;
          display: grid;
          grid-template-columns: 36px auto;
          align-items: center;
          gap: 10px;
          border-left: 1px solid var(--border-default);
        }
        .hero-weather-symbol {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 19px;
        }
        .hero-weather-copy { min-width: 0; }
        .hero-weather-copy strong,
        .hero-weather-copy small {
          display: block;
          white-space: nowrap;
        }
        .hero-weather-copy strong {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.05;
        }
        .hero-weather-copy small {
          margin: 0 0 3px;
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 700;
          line-height: 1.1;
        }

        .eyebrow {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          margin: 0 0 4px;
          padding: 0 10px;
          border: 1px solid var(--primary-border);
          border-radius: var(--radius-pill);
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .primary-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 14px; margin-top: 14px; align-items: start; }
        .media-card { grid-column: 1 / -1; padding: 18px; }
        .control-section.spots-section,
        .control-section.samples-section { grid-column: 1 / -1; padding: 18px; }
        .scenes-card { grid-column: 1 / -1; padding: 18px; }
        .presentation-scenes-card .scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .sample-scenes-card .scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .general-card { grid-column: 1 / -1; padding: 18px; }
        .system-card { grid-column: span 4; padding: 18px; }
        .activity-card { grid-column: span 8; padding: 18px; }

        .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .compact-heading { margin-bottom: 12px; }
        .section-heading h2 { margin: 4px 0 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }

        .device-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .samples-section .device-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        
        .device {
          min-width: 0;
          min-height: 60px;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr) 32px;
          gap: 10px;
          align-items: center;
          border: 1px solid var(--border-default);
          border-radius: 14px;
          background: var(--surface-control);
          text-align: left;
          cursor: pointer;
          transition: transform var(--motion), background var(--motion), border-color var(--motion), box-shadow var(--motion);
        }
        .device:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
        .device.is-on { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
        .device.is-error { border-color: rgba(239, 68, 68, 0.5); }
        .device.is-pending { animation: pulse 1.1s ease-in-out infinite alternate; }

        .device-icon, .scene-icon, .system-icon, .media-art, .general-action > span {
          display: grid;
          place-items: center;
          color: var(--icon-muted);
        }
        .device-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--track); transition: color var(--motion), background var(--motion); }
        .device.is-on .device-icon { color: var(--primary); background: var(--primary-soft); }
        .icon { width: 20px; height: 20px; }

        .device-copy { min-width: 0; }
        .device-copy strong, .device-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .device-copy strong { font-size: 12px; font-weight: 700; }
        .device-copy small { margin-top: 2px; color: var(--text-secondary); font-size: 10px; font-weight: 600; }
        .device.is-on .device-copy small { color: var(--primary); }

        .device-switch { width: 32px; height: 18px; padding: 2px; display: flex; align-items: center; border: 1px solid var(--border-default); border-radius: 999px; background: var(--track); transition: background var(--motion), border-color var(--motion); }
        .device-switch i { width: 12px; height: 12px; border-radius: 50%; background: var(--icon-muted); transition: transform var(--motion), background var(--motion); }
        .device.is-on .device-switch { border-color: var(--primary-border); background: var(--primary-medium); }
        .device.is-on .device-switch i { transform: translateX(14px); background: var(--primary); }

        .media-body { min-height: 76px; display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 14px; align-items: center; }
        .media-art { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(145deg, var(--primary-medium), var(--surface-control)); color: var(--primary); border: 1px solid var(--primary-border); }
        .media-art .icon { width: 26px; height: 26px; }
        .media-copy { min-width: 0; }
        .media-copy strong, .media-copy span, .media-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .media-copy strong { font-size: 14px; font-weight: 700; }
        .media-copy span { margin-top: 3px; color: var(--text-secondary); font-size: 11px; }
        .media-copy small { margin-top: 6px; color: var(--text-tertiary); font-size: 10px; font-weight: 700; }
        .media-state { padding: 4px 10px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .media-state.is-playing { color: var(--success); border-color: rgba(34, 197, 94, 0.35); background: rgba(34, 197, 94, 0.10); }
        .media-controls { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 12px; }
        .media-button { min-height: 42px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .media-button:hover:not(:disabled) { background: var(--surface-hover); border-color: var(--primary-border); }
        .media-button.primary { color: white; background: var(--primary); border-color: transparent; box-shadow: 0 6px 20px var(--primary-glow); }
        .media-button.primary:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-1px); }

        .scenes-heading { align-items: center; }
        .scene-heading-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
        .scene-summary { min-height: 28px; padding: 0 10px; display: inline-flex; align-items: center; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .scene-summary.is-active { border-color: var(--primary-border); background: var(--primary-soft); color: var(--primary); }
        
        .clear-scene-button { min-height: 36px; padding: 0 12px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-primary); font: inherit; cursor: pointer; transition: all var(--motion); }
        .clear-scene-button:hover:not(:disabled) { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); color: var(--error); }
        .clear-scene-button:active:not(:disabled) { transform: scale(0.98); }
        .clear-scene-button:disabled { cursor: not-allowed; opacity: 0.45; }
        .clear-scene-button span { width: 18px; height: 18px; display: grid; place-items: center; }
        .clear-scene-button strong { font-size: 10px; font-weight: 700; white-space: nowrap; }

        .scene-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .scene { position: relative; min-height: 68px; padding: 10px 12px; display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; gap: 10px; align-items: center; overflow: hidden; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); text-align: left; cursor: pointer; transition: all var(--motion); }
        .scene:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
        .scene.is-pending { border-color: var(--primary-border); background: var(--surface-active); animation: pulse 1.1s ease-in-out infinite alternate; }
        .scene.is-active { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
        .scene.is-unavailable { opacity: 0.6; }
        
        .scene-icon { width: 38px; height: 38px; border-radius: 12px; background: var(--track); color: var(--icon-muted); transition: all var(--motion); }
        .scene.is-active .scene-icon, .scene.is-pending .scene-icon { background: var(--primary-soft); color: var(--primary); }
        .scene-copy { min-width: 0; }
        .scene strong, .scene small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .scene strong { font-size: 12px; font-weight: 700; }
        .scene small { margin-top: 2px; color: var(--text-secondary); font-size: 10px; }
        
        .scene-state { min-height: 24px; padding: 0 8px; display: inline-flex; align-items: center; border: 1px solid var(--border-default); border-radius: var(--radius-pill); color: var(--text-tertiary); font-size: 9px; font-weight: 700; white-space: nowrap; }
        .scene.is-active .scene-state { border-color: var(--primary-border); background: var(--primary-soft); color: var(--primary); }

        .general-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .general-action { min-height: 56px; padding: 8px 14px; display: flex; align-items: center; justify-content: center; gap: 10px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .general-action > span { width: 32px; height: 32px; border-radius: 10px; }
        .general-action strong { font-size: 11px; font-weight: 700; }
        .general-action.power-on > span { color: var(--success); background: rgba(34, 197, 94, 0.12); }
        .general-action.power-off > span { color: var(--error); background: rgba(239, 68, 68, 0.12); }
        .general-action:hover:not(:disabled) { background: var(--surface-hover); transform: translateY(-1px); border-color: var(--border-emphasis); }
        
        .isolated-control { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle); }
        .isolated-label { display: block; margin-bottom: 6px; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .isolated-control .device { width: 100%; }

        .energy-shell { grid-column: span 8; padding: 18px; }
        .energy-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .energy-heading { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .energy-heading-icon { width: 40px; height: 40px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 12px; background: var(--primary-soft); color: var(--primary); border: 1px solid var(--primary-border); }
        .energy-heading-icon .icon { width: 22px; height: 22px; }
        .energy-heading h2 { margin: 3px 0 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        
        .energy-current { min-width: 180px; padding: 10px 14px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); text-align: right; }
        .energy-current small, .energy-current strong, .energy-current span { display: block; }
        .energy-current small { color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
        .energy-current strong { margin-top: 3px; font-size: 20px; font-weight: 800; color: var(--primary); }
        .energy-current span { margin-top: 3px; color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        
        .energy-toolbar { margin-top: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .energy-tabs { display: inline-flex; padding: 3px; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); }
        .energy-tab { min-width: 60px; height: 32px; padding: 0 12px; border: 0; border-radius: 9px; background: transparent; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; transition: all var(--motion); }
        .energy-tab.is-active { background: var(--primary); color: white; box-shadow: 0 4px 14px var(--primary-glow); }
        
        .energy-toolbar-actions { display: flex; align-items: center; gap: 8px; }
        .energy-day-nav { display: inline-flex; align-items: center; gap: 4px; padding: 3px; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); }
        .energy-day-nav button { height: 32px; border: 0; border-radius: 9px; background: transparent; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; transition: all var(--motion); }
        .energy-day-nav button:hover:not(:disabled) { color: var(--text-primary); background: var(--surface-hover); }
        .energy-day-nav button:disabled { opacity: 0.35; cursor: default; }
        .energy-day-step { width: 32px; font-size: 16px !important; line-height: 1; }
        .energy-day-current { min-width: 60px; padding: 0 10px; color: var(--primary) !important; }
        
        .energy-summary { margin-top: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .energy-stat { min-width: 0; padding: 12px 14px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); }
        .energy-stat small { display: block; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
        .energy-stat strong { display: block; margin-top: 4px; font-size: 18px; font-weight: 800; }
        .energy-stat span { display: block; margin-top: 3px; color: var(--text-tertiary); font-size: 9px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .energy-note { margin-top: 10px; padding: 8px 12px; border: 1px solid var(--border-subtle); border-radius: 11px; color: var(--text-tertiary); background: var(--surface-control); font-size: 9px; line-height: 1.45; }
        .energy-chart-card { margin-top: 10px; padding: 14px 12px 8px; border: 1px solid var(--border-default); border-radius: 16px; background: var(--surface-control); }
        .energy-chart-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 4px 10px; }
        .energy-chart-title strong { font-size: 11px; font-weight: 700; }
        .energy-chart-title span { color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        
        .energy-chart-layout { width: 100%; display: flex; min-width: 0; align-items: stretch; }
        .energy-y-axis { position: relative; z-index: 2; flex: 0 0 54px; height: 280px; border-right: 1px solid var(--border-subtle); background: var(--surface-control); }
        .energy-y-unit { position: absolute; top: 2px; left: 6px; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.04em; }
        .energy-y-tick { position: absolute; right: 8px; transform: translateY(-50%); color: var(--text-tertiary); font-size: 10px; font-weight: 700; white-space: nowrap; }
        .energy-chart-wrap { min-width: 0; flex: 1 1 auto; overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; scrollbar-width: thin; scroll-behavior: smooth; }
        .energy-chart { display: block; width: auto; min-width: 100%; height: 280px; overflow: visible; }
        .energy-grid-line { stroke: var(--grid-line); stroke-width: 1; }
        .energy-axis-text { fill: var(--text-tertiary); font-family: "Manrope", sans-serif; font-size: 10px; font-weight: 600; }
        .energy-current-label { fill: var(--primary); font-family: "Manrope", sans-serif; font-size: 9px; font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; }
        .energy-bar { fill: var(--primary); opacity: 0.85; transition: opacity var(--motion), transform var(--motion); transform-box: fill-box; transform-origin: bottom; }
        .energy-bar.is-partial { opacity: 1; stroke: var(--primary); stroke-width: 1.4; stroke-dasharray: 4 3; }
        .energy-bar-group:hover .energy-bar { opacity: 1; filter: drop-shadow(0 0 8px var(--primary-glow)); }
        
        .energy-empty { min-height: 220px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 24px; color: var(--text-tertiary); text-align: center; font-size: 11px; line-height: 1.5; }
        .energy-empty.error { color: var(--error); }
        .energy-empty .icon { width: 20px; height: 20px; }
        .energy-spinner { width: 18px; height: 18px; border: 2px solid var(--border-default); border-top-color: var(--primary); border-radius: 50%; animation: energy-spin 0.8s linear infinite; }
        @keyframes energy-spin { to { transform: rotate(360deg); } }
        
        .icon-button { width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 11px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .icon-button:hover { border-color: var(--primary-border); color: var(--primary); }

        .system-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .system-tile { min-height: 60px; padding: 10px 12px; display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 10px; align-items: center; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); }
        .system-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--track); color: var(--icon-muted); }
        .system-tile.good .system-icon { color: var(--success); background: rgba(34, 197, 94, 0.12); }
        .system-tile.warning .system-icon { color: var(--warning); background: rgba(245, 158, 11, 0.12); }
        .system-tile.danger .system-icon { color: var(--error); background: rgba(239, 68, 68, 0.12); }
        .system-tile small, .system-tile strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .system-tile small { color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .system-tile strong { margin-top: 3px; font-size: 13px; font-weight: 700; }
        .system-tile-wide { grid-column: 1 / -1; }

        .dialog-backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: var(--overlay); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .dialog-card { width: min(440px, 100%); padding: 26px; border: 1px solid var(--primary-border); border-radius: 24px; background: var(--modal); box-shadow: 0 24px 70px var(--shadow-strong); text-align: center; }
        .dialog-icon { width: 56px; height: 56px; margin: 0 auto 14px; display: grid; place-items: center; border-radius: 50%; }
        .dialog-icon.is-power-off { background: rgba(239, 68, 68, 0.12); color: var(--error); }
        .dialog-icon.is-power-on { background: rgba(34, 197, 94, 0.12); color: var(--success); }
        .dialog-icon .icon { width: 28px; height: 28px; }
        .primary-button.confirm-on { background: var(--success); box-shadow: 0 8px 22px rgba(34, 197, 94, 0.25); }
        .dialog-card h2 { margin: 10px 0 8px; font-size: 22px; font-weight: 800; }
        .dialog-card p { margin: 0; color: var(--text-secondary); font-size: 12px; line-height: 1.55; }
        .dialog-card code { color: var(--primary); font-size: 11px; overflow-wrap: anywhere; }
        .dialog-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; }
        .dialog-actions button { min-height: 48px; border-radius: var(--radius-pill); font-weight: 800; cursor: pointer; transition: all var(--motion); }
        .secondary-button { border: 1px solid var(--border-default); background: var(--surface-control); color: var(--text-primary); }
        .secondary-button:hover { background: var(--surface-hover); border-color: var(--border-emphasis); }
        .primary-button { border: 0; background: var(--primary); color: white; box-shadow: 0 8px 24px var(--primary-glow); }
        .primary-button:hover { background: var(--primary-hover); transform: translateY(-1px); }
        
        .toast { position: fixed; right: 24px; bottom: 24px; z-index: 110; max-width: min(380px, calc(100vw - 32px)); padding: 14px 18px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--modal); box-shadow: 0 18px 45px var(--shadow-strong); font-size: 12px; font-weight: 700; backdrop-filter: blur(16px); }
        .toast.success { border-color: rgba(34, 197, 94, 0.4); color: var(--success); }
        .toast.error { border-color: rgba(239, 68, 68, 0.4); color: var(--error); }
        .is-unavailable { opacity: 0.65; }

        @keyframes pulse { 0% { opacity: 0.55; } 100% { opacity: 1; } }

        /* Responsive Layouts */
        @media (max-width: 1180px) {
          .presentation-scenes-card,
          .sample-scenes-card,
          .spots-section,
          .samples-section,
          .general-card,
          .media-card { grid-column: 1 / -1; }
          .presentation-scenes-card .scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sample-scenes-card .scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .samples-section .device-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @container showroom-panel (max-width: 1180px) {
          .presentation-scenes-card,
          .sample-scenes-card,
          .spots-section,
          .samples-section,
          .general-card,
          .media-card { grid-column: 1 / -1; }
          .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .samples-section .device-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 960px) {
          .spots-section .device-grid,
          .samples-section .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @container showroom-panel (max-width: 960px) {
          .spots-section .device-grid,
          .samples-section .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 768px) {
          .dashboard { padding: 12px 10px; }
          .hero-card { min-height: 0; padding: 16px 18px; grid-template-columns: 1fr !important; gap: 12px; }
          .hero-copy { border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; }
          .hero-card h1 { font-size: clamp(22px, 5.5vw, 30px); }
          .hero-status { justify-content: space-between; width: 100%; align-items: center; flex-direction: row; gap: 12px; }
          .hero-clock strong { font-size: 26px; }
          .hero-weather { border-left: 0; padding-left: 0; }
          .device-grid, .scene-grid, .system-grid { grid-template-columns: 1fr !important; }
          .system-card, .activity-card, .energy-shell { grid-column: 1 / -1; }
          .energy-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .energy-chart { min-width: 560px; }
        }

        @container showroom-panel (max-width: 768px) {
          .dashboard { padding: 12px 10px; }
          .hero-card { min-height: 0; padding: 16px 18px; grid-template-columns: 1fr !important; gap: 12px; }
          .hero-copy { border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; }
          .hero-card h1 { font-size: clamp(22px, 5.5vw, 30px); }
          .hero-status { justify-content: space-between; width: 100%; align-items: center; flex-direction: row; gap: 12px; }
          .hero-clock strong { font-size: 26px; }
          .hero-weather { border-left: 0; padding-left: 0; }
          .device-grid, .scene-grid, .system-grid { grid-template-columns: 1fr !important; }
          .system-card, .activity-card, .energy-shell { grid-column: 1 / -1; }
          .energy-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .energy-chart { min-width: 560px; }
        }

        @media (max-width: 520px) {
          .general-actions { grid-template-columns: 1fr; }
          .general-action { justify-content: flex-start; }
          .media-card .section-heading { align-items: flex-start; flex-direction: column; }
          .media-state { max-width: 100%; }
          .energy-header { display: grid; grid-template-columns: 1fr; }
          .energy-current { min-width: 0; width: 100%; text-align: left; }
          .energy-toolbar { align-items: stretch; flex-direction: column; }
          .energy-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
          .energy-toolbar-actions { justify-content: space-between; }
          .energy-summary { grid-template-columns: 1fr; }
        }

        @container showroom-panel (max-width: 520px) {
          .general-actions { grid-template-columns: 1fr; }
          .general-action { justify-content: flex-start; }
          .media-card .section-heading { align-items: flex-start; flex-direction: column; }
          .media-state { max-width: 100%; }
          .energy-header { display: grid; grid-template-columns: 1fr; }
          .energy-current { min-width: 0; width: 100%; text-align: left; }
          .energy-toolbar { align-items: stretch; flex-direction: column; }
          .energy-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
          .energy-toolbar-actions { justify-content: space-between; }
          .energy-summary { grid-template-columns: 1fr; }
        }

        /* Witmind Signature operational layout */
        :host {
          --background: var(--wit-canvas, #071118);
          --background-secondary: var(--wit-canvas, #071118);
          --background-deep: var(--wit-canvas, #071118);
          --surface: var(--wit-surface, rgba(16, 25, 30, 0.90));
          --surface-strong: var(--wit-surface-raised, #162126);
          --surface-control: var(--wit-surface-interactive, #1b282e);
          --surface-hover: var(--wit-surface-interactive-hover, #23333b);
          --surface-active: var(--wit-surface-active, rgba(242, 101, 34, 0.14));
          --text-primary: var(--wit-text-primary, #f5f6f4);
          --text-secondary: var(--wit-text-secondary, #adb4b6);
          --text-tertiary: var(--wit-text-tertiary, #747e82);
          --border-subtle: var(--wit-border-subtle, rgba(255, 255, 255, 0.06));
          --border-default: var(--wit-border-default, rgba(255, 255, 255, 0.09));
          --header: var(--wit-surface-glass, rgba(16, 25, 30, 0.88));
          min-height: 100dvh;
          background:
            radial-gradient(760px 460px at 88% -8%, rgba(242, 101, 34, 0.12), transparent 68%),
            var(--background);
        }
        :host([data-theme="light"]) {
          --background: var(--wit-canvas-light, #f3f3ef);
          --background-secondary: var(--wit-canvas-light, #f3f3ef);
          --background-deep: var(--wit-canvas-light, #f3f3ef);
          --surface: var(--wit-surface-light, rgba(255, 255, 255, 0.88));
          --surface-strong: var(--wit-surface-raised-light, #ffffff);
          --surface-control: var(--wit-surface-interactive-light, #f8fafc);
          --surface-hover: #f4f5f2;
          --surface-active: rgba(242, 101, 34, 0.10);
          --text-primary: #182126;
          --text-secondary: #667176;
          --text-tertiary: #92999c;
          --border-subtle: rgba(18, 32, 38, 0.06);
          --border-default: rgba(18, 32, 38, 0.09);
          --header: rgba(255, 255, 255, 0.88);
          background:
            radial-gradient(760px 460px at 88% -8%, rgba(242, 101, 34, 0.09), transparent 68%),
            var(--background);
        }
        .app-shell { min-height: 100dvh; }
        .topbar {
          position: relative;
          min-height: 80px;
          padding: 14px clamp(20px, 3vw, 44px);
          gap: 24px;
          border-bottom-color: var(--border-subtle);
          box-shadow: none;
        }
        .topbar-start { flex: 0 0 auto; gap: 14px; }
        .menu-button, .theme-button {
          width: 44px;
          height: 44px;
          flex-basis: 44px;
          background: transparent;
          border-color: var(--border-default);
        }
        .brand { display: grid; gap: 1px; line-height: 1; }
        .brand-wordmark { font-size: 17px; font-weight: 760; letter-spacing: 0.055em; }
        .brand > span { color: var(--primary); font-size: 9px; font-weight: 750; letter-spacing: 0.10em; }
        .status-strip { min-width: 0; display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1 1 auto; }
        .status-pill {
          min-height: 48px;
          padding: 0 14px;
          display: grid;
          grid-template-columns: 24px auto;
          align-items: center;
          gap: 9px;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-pill);
          color: var(--text-primary);
          background: var(--surface);
          text-align: left;
          cursor: pointer;
          transition: transform var(--motion), border-color var(--motion), background var(--motion);
        }
        .status-pill:hover { transform: translateY(-1px); border-color: var(--primary-border); }
        .status-pill:active { transform: scale(0.98); }
        .status-pill.is-active { border-color: var(--primary-border); background: var(--surface-active); }
        .status-pill-icon { display: grid; place-items: center; color: var(--text-tertiary); }
        .status-pill.is-active .status-pill-icon { color: var(--primary); }
        .status-pill strong, .status-pill small { display: block; white-space: nowrap; }
        .status-pill strong { font-size: 11px; font-weight: 680; }
        .status-pill small { margin-top: 2px; color: var(--text-tertiary); font-size: 9px; font-weight: 560; }
        .topbar-meta { gap: 14px; }
        .header-clock { display: inline-flex; align-items: baseline; gap: 5px; white-space: nowrap; }
        .header-clock strong { font-size: 30px; font-weight: 470; letter-spacing: -0.045em; }
        .header-clock span { color: var(--text-tertiary); font-size: 9px; font-weight: 720; letter-spacing: 0.08em; }
        .header-weather { min-width: 74px; padding-left: 14px; display: flex; align-items: center; gap: 7px; border-left: 1px solid var(--border-default); }
        .header-weather span { color: var(--primary); font-size: 18px; }
        .header-weather strong { font-size: 13px; font-weight: 700; }

        .dashboard { width: min(1480px, 100%); padding: clamp(20px, 2.6vw, 40px); }
        .workspace-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 22px; }
        .workspace-heading h1, .view-heading h1 { margin: 3px 0 0; font-size: clamp(26px, 2.6vw, 36px); font-weight: 720; letter-spacing: -0.035em; line-height: 1.05; }
        .section-kicker { color: var(--primary); font-size: 10px; font-weight: 720; letter-spacing: 0.09em; text-transform: uppercase; }
        .view-navigation {
          display: inline-grid;
          grid-template-columns: repeat(4, auto);
          gap: 3px;
          padding: 4px;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-pill);
          background: var(--surface);
        }
        .view-navigation-button {
          min-height: 44px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: var(--radius-pill);
          background: transparent;
          color: var(--text-secondary);
          font: inherit;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
          transition: color var(--motion), background var(--motion), transform var(--motion);
        }
        .view-navigation-button .icon { width: 17px; height: 17px; }
        .view-navigation-button:hover { color: var(--text-primary); }
        .view-navigation-button:active { transform: scale(0.97); }
        .view-navigation-button.is-active { color: #ffffff; background: var(--primary); }

        .view-panel { animation: view-enter 180ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes view-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        .view-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
        .view-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 620; }
        .surface {
          border-color: var(--border-default);
          border-radius: var(--radius-lg);
          background: var(--surface);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.025);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        :host([data-theme="light"]) .surface { box-shadow: 0 12px 34px rgba(18, 32, 38, 0.055); }

        .quick-scenes-card { padding: clamp(18px, 2vw, 26px); }
        .quick-scene-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .section-heading h2 { font-size: 19px; font-weight: 700; }
        .scene {
          min-height: 76px;
          padding: 12px;
          grid-template-columns: 40px minmax(0, 1fr);
          gap: 11px;
          border-radius: var(--radius-control, 14px);
          background: var(--surface-control);
          box-shadow: none;
        }
        .scene-icon { width: 40px; height: 40px; border-radius: 12px; }
        .scene strong { font-size: 12px; font-weight: 680; }
        .scene small { color: var(--text-tertiary); font-size: 9px; font-weight: 540; }
        .scene-state { display: none; }
        .scene.is-active { border-color: var(--primary-border); background: var(--surface-active); box-shadow: inset 3px 0 0 var(--primary); }
        .scene-summary { background: transparent; }
        .clear-scene-button { min-height: 40px; background: transparent; }
        .home-layout { margin-top: 14px; display: grid; grid-template-columns: minmax(300px, 0.85fr) minmax(420px, 1.15fr); gap: 14px; align-items: stretch; }
        .home-layout > .surface { min-height: 220px; padding: 20px; }
        .general-card, .media-card, .system-card, .activity-card, .energy-shell { grid-column: auto; }
        .general-actions { gap: 10px; }
        .general-action { min-height: 68px; background: var(--surface-control); }
        .general-action strong { font-size: 12px; font-weight: 680; }
        .media-body { min-height: 72px; }
        .media-controls { margin-top: 14px; }
        .media-button { min-height: 46px; }

        .lighting-layout { display: grid; grid-template-columns: 5fr 7fr; gap: 14px; align-items: start; }
        .lighting-layout .surface { padding: 22px; }
        .spots-section, .samples-section, .reflector-section { grid-column: auto; }
        .lighting-layout .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .samples-section .device:last-child { grid-column: 1 / -1; }
        .reflector-section { grid-column: 1 / 2; }
        .device {
          min-height: 70px;
          padding: 12px 14px;
          border-radius: var(--radius-control, 14px);
          background: var(--surface-control);
          box-shadow: none;
        }
        .device-copy strong { font-size: 12px; font-weight: 680; }
        .device-copy small { color: var(--text-tertiary); font-size: 9px; font-weight: 540; }
        .device.is-on { box-shadow: inset 3px 0 0 var(--primary); }

        .view-energy .energy-shell { padding: clamp(18px, 2.2vw, 28px); }
        .energy-heading .eyebrow, .general-card .eyebrow, .media-card .eyebrow, .system-card .eyebrow, .weather-card .eyebrow { padding: 0; min-height: 0; border: 0; background: transparent; color: var(--text-tertiary); }
        .energy-current, .energy-stat, .energy-note, .energy-chart-card { box-shadow: none; }
        .system-layout { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 14px; }
        .system-layout > .surface { min-height: 260px; padding: 24px; }
        .weather-main { display: grid; grid-template-columns: 48px minmax(0, 1fr) auto; gap: 14px; align-items: center; }
        .weather-symbol { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: var(--primary); background: var(--primary-soft); font-size: 22px; }
        .weather-copy h2 { margin: 3px 0 0; font-size: 20px; font-weight: 700; }
        .weather-copy p { margin: 5px 0 0; color: var(--text-tertiary); font-size: 10px; }
        .temperature { font-size: 30px; font-weight: 560; letter-spacing: -0.04em; }
        .forecast-row { margin-top: 24px; padding-top: 18px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; border-top: 1px solid var(--border-subtle); }
        .forecast-item { display: grid; gap: 5px; text-align: center; }
        .forecast-item span { color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        .forecast-item b { color: var(--primary); font-size: 18px; font-weight: 500; }
        .forecast-item strong { font-size: 12px; }
        .system-grid { margin-top: 18px; }
        .system-tile { min-height: 76px; }

        @container showroom-panel (max-width: 1080px) {
          .status-pill { padding: 0 11px; }
          .status-pill small { display: none; }
          .view-navigation-button { padding: 0 12px; }
          .quick-scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .home-layout, .lighting-layout, .system-layout { grid-template-columns: 1fr; }
          .reflector-section { grid-column: auto; }
        }
        @container showroom-panel (max-width: 860px) {
          .status-strip { display: none; }
        }
        @container showroom-panel (max-width: 760px) {
          .topbar { min-height: 68px; padding: 10px 14px; gap: 10px; }
          .brand > span, .status-strip, .header-weather { display: none; }
          .header-clock strong { font-size: 24px; }
          .dashboard { padding: 16px 14px 88px; }
          .workspace-heading { display: grid; gap: 16px; align-items: stretch; }
          .workspace-heading > div { display: none; }
          .view-navigation { width: 100%; grid-template-columns: repeat(4, 1fr); border-radius: 18px; }
          .view-navigation-button { padding: 0 8px; gap: 5px; }
          .view-navigation-button span { font-size: 9px; }
          .quick-scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .scene-heading-actions .scene-summary { display: none; }
          .home-layout { grid-template-columns: 1fr; }
          .lighting-layout .device-grid { grid-template-columns: 1fr; }
          .samples-section .device:last-child { grid-column: auto; }
          .system-layout > .surface { min-height: 0; }
          .energy-current { min-width: 0; text-align: left; }
        }
        @container showroom-panel (max-width: 460px) {
          .brand { display: none; }
          .topbar-meta { gap: 8px; }
          .quick-scene-grid { grid-template-columns: 1fr !important; }
          .view-navigation-button .icon { display: none; }
          .dialog-actions { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition-duration: 0.01ms !important; }
        }
      </style>

      <div class="app-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button
              class="menu-button"
              data-action="toggle-menu"
              aria-label="Abrir menú de navegación de Home Assistant"
              title="Abrir menú"
            >${MENU_ICON}</button>
            <div class="brand" aria-label="Witmind Showroom">
              <strong class="brand-wordmark">WITMIND</strong>
              <span>${this._escape(config.siteLabel)}</span>
            </div>
          </div>
          <div class="status-strip" aria-label="Resumen del showroom">
            <button class="status-pill ${lightsOn ? "is-active" : ""}" data-action="set-view" data-view="lights">
              <span class="status-pill-icon">${this._icon("bulb")}</span>
              <span><strong>${lightsOn} de ${configuredLights.length}</strong><small>Luces</small></span>
            </button>
            <button class="status-pill ${mediaState === "playing" ? "is-active" : ""}" data-action="set-view" data-view="home">
              <span class="status-pill-icon">${this._icon("music")}</span>
              <span><strong>${this._escape(mediaLabel)}</strong><small>Multimedia</small></span>
            </button>
            <button class="status-pill" data-action="set-view" data-view="energy">
              <span class="status-pill-icon">${this._icon("energy")}</span>
              <span><strong>${this._escape(energyLabel)}</strong><small>Este mes</small></span>
            </button>
          </div>
          <div class="topbar-meta">
            <time class="header-clock" data-current-time>
              <strong data-clock-time>--:--</strong>
              <span data-clock-period></span>
            </time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(CONDITION_LABELS[condition] || condition || "Sin datos")}, ${this._escape(weatherAttrs.temperature ?? "Sin datos")}${this._escape(weatherAttrs.temperature_unit ?? "°")}">
              <span aria-hidden="true">${this._escape(CONDITION_SYMBOLS[condition] || "·")}</span>
              <strong>${this._escape(weatherAttrs.temperature ?? "--")}${this._escape(weatherAttrs.temperature_unit ?? "°")}</strong>
            </div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar a tema ${nextTheme}" title="Cambiar a tema ${nextTheme}">${THEME_ICON}</button>
          </div>
        </header>

        <main class="dashboard">
          <section class="workspace-heading">
            <div>
              <span class="section-kicker">${this._escape(config.subtitle)}</span>
              <h1>${this._escape(config.title)}</h1>
            </div>
            ${this._renderNavigation()}
          </section>
          ${this._renderActiveView(config)}
        </main>
      </div>

      ${this._renderConfirmDialog()}
      ${this._toast ? `<div class="toast ${this._escape(this._toast.type)}" role="status">${this._escape(this._toast.message)}</div>` : ""}
    `;

    this._updateClock();
    requestAnimationFrame(() => this._restoreEnergyChartScroll());
  }
}

if (!customElements.get("showroom-panel")) {
  customElements.define("showroom-panel", ShowroomPanel);
}
