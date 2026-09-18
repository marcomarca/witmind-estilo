import "./showroom-panel.js";
import "./witmind-operations-panel.ts";
import "./witmind-admin-panel.ts";
import "./witmind-energy-panel.ts";
import { resolvePointerReleaseCoordinate, resolveSwipeAxis, resolveSwipeDirection, type SwipeAxis } from "./swipe-gesture.js";

type PanelConfig = Record<string, unknown>;
type HassAdapter = Record<string, unknown>;
type DragState = { pointerId: number; pointerType: string; startX: number; startY: number; lastX: number; lastY: number; time: number; ignored: boolean; axis: SwipeAxis };

const LOBBY_CONFIG: PanelConfig = {
  panel_kind: "lobby",
  title: "Lobby",
  subtitle: "Control operativo",
  site_label: "WTX · MDTC",
  weather: "weather.forecast_casa",
  light_count_sensor: "sensor.lobby_luminarias_encendidas",
  energy_sensor: "sensor.showroom_energia_estimada",
  history_hours: 4,
  chart_hours: 24,
  show_forecast: true,
  spots: [
    { entity: "switch.interruptor_inteligente_3_switch_1", name: "Central Colgante", subtitle: "Iluminación central", icon: "pendant" },
    { entity: "switch.interruptor_inteligente_3_switch_2", name: "Spots 5W Decorativos", subtitle: "Iluminación decorativa", icon: "spot" },
    { entity: "switch.interruptor_inteligente_3_switch_3", name: "Tira LED", subtitle: "Iluminación ambiental", icon: "strip" },
    { entity: "switch.interruptor_inteligente_3_switch_4", name: "Spots 10W", subtitle: "Iluminación principal", icon: "spot" },
  ],
  samples: [],
  reflector: { entity: "" },
  scene_control_entities: [
    "switch.interruptor_inteligente_3_switch_1",
    "switch.interruptor_inteligente_3_switch_2",
    "switch.interruptor_inteligente_3_switch_3",
    "switch.interruptor_inteligente_3_switch_4",
  ],
  scenes: [
    {
      id: "visita",
      name: "Visita",
      subtitle: "Todos los circuitos",
      icon: "presentation",
      on_entities: [
        "switch.interruptor_inteligente_3_switch_1",
        "switch.interruptor_inteligente_3_switch_2",
        "switch.interruptor_inteligente_3_switch_3",
        "switch.interruptor_inteligente_3_switch_4",
      ],
    },
    {
      id: "regular",
      name: "Regular",
      subtitle: "Solo Spots 10W",
      icon: "bulb",
      on_entities: ["switch.interruptor_inteligente_3_switch_4"],
      off_entities: [
        "switch.interruptor_inteligente_3_switch_1",
        "switch.interruptor_inteligente_3_switch_2",
        "switch.interruptor_inteligente_3_switch_3",
      ],
    },
  ],
  sample_scenes: [],
};

const GENERAL_CONFIG: PanelConfig = {
  panel_kind: "general",
  static_only: false,
  title: "Witmind General",
  subtitle: "Centro de control",
  site_label: "WTX · MDTC",
  weather: "weather.forecast_casa",
  show_forecast: true,
  spots: [
    { entity: "switch.oficina_gerencial_interruptor_1", name: "Witronix LED", subtitle: "Gerencia · 4×12 W nominal", icon: "bulb" },
    { entity: "switch.oficina_mindtec_interruptor_1", name: "Mindtec", subtitle: "Mindtec · 1×48 W nominal", icon: "bulb" },
    { entity: "switch.oficina_grande_interruptor_1", name: "Oficina grande 1", subtitle: "Oficinas grandes · 4×42 W nominal", icon: "office" },
    { entity: "switch.oficina_grande_interruptor_2", name: "Oficina grande 2", subtitle: "Oficinas grandes · 4×42 W nominal", icon: "office" },
    { entity: "switch.b2_gang_interruptor_1", name: "Multifuncional", subtitle: "Pasillos y multifuncional · 4×24 W nominal", icon: "office" },
    { entity: "switch.b2_gang_interruptor_2", name: "Pasillos", subtitle: "Pasillos · 3×24 W + 3×15 W nominal", icon: "corridor" },
    { entity: "switch.taller_interruptor_1", name: "Taller", subtitle: "Taller · 3×48 W nominal", icon: "workshop" },
  ],
  samples: [],
  reflector: { entity: "" },
  scenes: [],
  sample_scenes: [],
  scene_control_entities: [],
};

const OFFICES_CONFIG: PanelConfig = {
  panel_kind: "offices", title: "Oficinas", subtitle: "Control operativo", description: "Circuitos de oficinas con potencia nominal instalada.", weather: "weather.forecast_casa",
  power_watts: {
    "switch.oficina_gerencial_interruptor_1": 48, "switch.oficina_mindtec_interruptor_1": 48,
    "switch.oficina_grande_interruptor_1": 168, "switch.oficina_grande_interruptor_2": 168,
    "switch.b2_gang_interruptor_1": 96, "switch.b2_gang_interruptor_2": 117, "switch.taller_interruptor_1": 144,
  },
  areas: [
    { id: "gerencia", name: "Gerencia", environment: { temperature: "sensor.t_h_sensor_temperature", humidity: "sensor.t_h_sensor_humidity" }, devices: [{ entity: "switch.oficina_gerencial_interruptor_1", name: "Witronix LED", subtitle: "4×12 W nominal", watts: 48 }] },
    { id: "mindtec", name: "Mindtec", devices: [{ entity: "switch.oficina_mindtec_interruptor_1", name: "Mindtec", subtitle: "1×48 W nominal", watts: 48 }] },
    { id: "general", name: "Oficinas grandes", environment: { temperature: "sensor.t_h_sensor_2_temperature", humidity: "sensor.t_h_sensor_2_humidity" }, devices: [
      { entity: "switch.oficina_grande_interruptor_1", name: "Oficina grande 1", subtitle: "4×42 W nominal", watts: 168 },
      { entity: "switch.oficina_grande_interruptor_2", name: "Oficina grande 2", subtitle: "4×42 W nominal", watts: 168 },
    ] },
    { id: "pasillos", name: "Pasillos y multifuncional", devices: [
      { entity: "switch.b2_gang_interruptor_1", name: "Multifuncional", subtitle: "4×24 W nominal", watts: 96, icon: "office" },
      { entity: "switch.b2_gang_interruptor_2", name: "Pasillos", subtitle: "3×24 W + 3×15 W nominal", watts: 117, icon: "corridor" },
    ] },
    { id: "taller", name: "Taller", devices: [{ entity: "switch.taller_interruptor_1", name: "Taller", subtitle: "3×48 W nominal", watts: 144, icon: "workshop" }] },
  ],
};

const RECORDING_CONFIG: PanelConfig = {
  panel_kind: "recording", title: "Sala de grabación", subtitle: "Control operativo", description: "Cuatro circuitos con potencia nominal configurada.", weather: "weather.forecast_casa",
  power_watts: {
    "switch.4gang_switch_sala_grabacion_interruptor_1": 24, "switch.4gang_switch_sala_grabacion_interruptor_2": 96,
    "switch.4gang_switch_sala_grabacion_interruptor_3": 50, "switch.4gang_switch_sala_grabacion_interruptor_4": 30,
  },
  switches: [
    { entity: "switch.4gang_switch_sala_grabacion_interruptor_1", name: "Tira LED", subtitle: "1×24 W nominal", watts: 24, icon: "strip" },
    { entity: "switch.4gang_switch_sala_grabacion_interruptor_2", name: "Paneles", subtitle: "2×48 W nominal", watts: 96, icon: "panel" },
    { entity: "switch.4gang_switch_sala_grabacion_interruptor_3", name: "Spots", subtitle: "5×10 W nominal", watts: 50, icon: "spot" },
    { entity: "switch.4gang_switch_sala_grabacion_interruptor_4", name: "Otras luces", subtitle: "3×10 W nominal", watts: 30, icon: "bulb" },
  ],
};

const CONTROL_CONFIG: PanelConfig = {
  panel_kind: "control", title: "Control general", subtitle: "Centro de control", description: "Escenas y rutinas conectadas a Home Assistant.", weather: "weather.forecast_casa",
  device_watts: { ...(OFFICES_CONFIG.power_watts as Record<string, number>), ...(RECORDING_CONFIG.power_watts as Record<string, number>),
    "switch.interruptor_inteligente_switch_1": 48, "switch.interruptor_inteligente_switch_2": 48, "switch.interruptor_inteligente_switch_3": 48, "switch.interruptor_inteligente_switch_4": 48,
    "switch.interruptor_inteligente_2_switch_1": 48, "switch.interruptor_inteligente_2_switch_2": 48, "switch.interruptor_inteligente_2_switch_3": 48, "switch.interruptor_inteligente_2_switch_4": 48,
    "switch.smart_relay_switch_3_switch": 48, "switch.smart_relay_switch_4_switch": 48,
    "switch.interruptor_inteligente_3_switch_1": 0, "switch.interruptor_inteligente_3_switch_2": 0, "switch.interruptor_inteligente_3_switch_3": 0, "switch.interruptor_inteligente_3_switch_4": 0,
  },
  zones: [
    { id: "showroom", name: "Showroom", entities: ["switch.interruptor_inteligente_switch_1", "switch.interruptor_inteligente_switch_2", "switch.interruptor_inteligente_switch_3", "switch.interruptor_inteligente_switch_4", "switch.interruptor_inteligente_2_switch_1", "switch.interruptor_inteligente_2_switch_2", "switch.interruptor_inteligente_2_switch_3", "switch.interruptor_inteligente_2_switch_4", "switch.smart_relay_switch_4_switch", "switch.smart_relay_switch_3_switch"] },
    { id: "lobby", name: "Lobby", entities: ["switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3", "switch.interruptor_inteligente_3_switch_4"] },
    { id: "oficinas", name: "Oficinas", entities: Object.keys(OFFICES_CONFIG.power_watts as Record<string, number>) },
    { id: "grabacion", name: "Sala de grabación", entities: Object.keys(RECORDING_CONFIG.power_watts as Record<string, number>) },
  ],
  main_actions: [
    { id: "showroom-reunion", name: "Reunión showroom", subtitle: "Escena de reunión", service_entities: ["scene.reunion"], tone: "accent" },
    { id: "showroom-presentacion", name: "Presentación showroom", subtitle: "Escena de presentación", service_entities: ["scene.presentacion"], tone: "accent" },
    { id: "showroom-apagado", name: "Apagar showroom", subtitle: "Apaga los circuitos del showroom", service_entities: ["script.showroom_apagado_general"], tone: "danger" },
    { id: "lobby-regular", name: "Lobby regular", subtitle: "Solo iluminación principal", on_entities: ["switch.interruptor_inteligente_3_switch_4"], off_entities: ["switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3"] },
    { id: "lobby-visita", name: "Lobby visita", subtitle: "Todos los circuitos", on_entities: ["switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3", "switch.interruptor_inteligente_3_switch_4"] },
    { id: "lobby-apagado", name: "Apagar lobby", subtitle: "Apaga los cuatro circuitos", off_entities: ["switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3", "switch.interruptor_inteligente_3_switch_4"] },
  ],
  daily_actions: [
    { id: "inicio-dia", name: "Inicio del día", subtitle: "Rutina de apertura", on_entities: ["switch.interruptor_inteligente_3_switch_4", "switch.oficina_gerencial_interruptor_1", "switch.b2_gang_interruptor_1"], off_entities: ["switch.interruptor_inteligente_switch_1", "switch.interruptor_inteligente_switch_2", "switch.interruptor_inteligente_switch_3", "switch.interruptor_inteligente_switch_4", "switch.interruptor_inteligente_2_switch_1", "switch.interruptor_inteligente_2_switch_2", "switch.interruptor_inteligente_2_switch_3", "switch.interruptor_inteligente_2_switch_4", "switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3", "switch.b2_gang_interruptor_2"] },
    { id: "fin-dia", name: "Fin del día", subtitle: "Rutina de cierre", service_entities: ["script.showroom_apagado_general"], off_entities: ["switch.interruptor_inteligente_3_switch_1", "switch.interruptor_inteligente_3_switch_2", "switch.interruptor_inteligente_3_switch_3", "switch.interruptor_inteligente_3_switch_4"] },
  ],
  danger_action: { id: "apagado-total", name: "Apagado total Witmind", subtitle: "Apaga showroom, lobby, oficinas y grabación", service_entities: ["script.apagado_total_witmind"], tone: "danger" },
};

const CALENDAR_CONFIG: PanelConfig = { panel_kind: "calendar", title: "Calendario laboral", subtitle: "Planificación operativa", description: "Días laborales gestionados desde Home Assistant." };
const NOTIFICATIONS_CONFIG: PanelConfig = { panel_kind: "notifications", title: "Notificaciones Witmind", subtitle: "Centro de avisos", description: "Reglas, destinos e historial de notificaciones." };
const ENERGY_CONFIG: PanelConfig = { panel_kind: "energy", title: "Gestión de energía", subtitle: "Analítica del edificio", description: "Consumo, historial de uso y simulación de dimerización." };

const PANEL_META = [
  { id: "general", label: "General", icon: "⌂" },
  { id: "showroom", label: "Showroom", icon: "✦" },
  { id: "lobby", label: "Lobby", icon: "⌂" },
  { id: "offices", label: "Oficinas", icon: "▦" },
  { id: "recording", label: "Grabación", icon: "◈" },
  { id: "energy", label: "Energía", icon: "ϟ" },
  { id: "calendar", label: "Calendario", icon: "▣" },
  { id: "notifications", label: "Notificaciones", icon: "◉" },
  { id: "control", label: "Control", icon: "⚡" },
] as const;

const safePanelId = (value: unknown) => {
  const raw = String(value || "").trim().toLowerCase();
  const aliases: Record<string, string> = { "oficinas-control": "offices", oficinas: "offices", "sala-grabacion": "recording", grabacion: "recording", energia: "energy", "gestion-energia": "energy", "calendario-laboral": "calendar", calendario: "calendar", notificaciones: "notifications", "control-general": "control" };
  const id = aliases[raw] || raw;
  return PANEL_META.some((panel) => panel.id === id) ? id : "showroom";
};

const cloneConfig = (config: PanelConfig) => JSON.parse(JSON.stringify(config)) as PanelConfig;

class WitmindWorkspace extends HTMLElement {
  private _config: PanelConfig = {};
  private _hass: HassAdapter | null = null;
  private _narrow = false;
  private _activeId = "showroom";
  private _pages: HTMLElement[] = [];
  private _track: HTMLElement | null = null;
  private _drag: DragState | null = null;
  private _touchDrag: DragState | null = null;
  private _dragging = false;
  private _suppressClickUntil = 0;
  private _theme: "dark" | "light" = this._loadTheme();
  private _boundResize = () => {
    if (this._drag || this._touchDrag) return;
    this._snap(false);
  };
  private _boundTouchMove = (event: TouchEvent) => this._onTouchMove(event);
  private _boundTouchEnd = (event: TouchEvent) => this._onTouchEnd(event);
  private _boundTouchCancel = (event: TouchEvent) => this._onTouchEnd(event);
  private _boundTheme = (event: Event) => {
    const theme = (event as CustomEvent<{ theme?: string }>).detail?.theme;
    if (theme === "dark" || theme === "light") this._setTheme(theme);
  };

  set config(value: PanelConfig) {
    this._config = value && typeof value === "object" ? value : {};
    this._activeId = safePanelId(this._config.panel_id || this._config.panelId || this._config.panel_kind);
    if (this.isConnected) this._mountPages();
  }

  get config() { return this._config; }

  set hass(value: HassAdapter | null) {
    this._hass = value;
    this._pages.forEach((page) => {
      const panel = page.firstElementChild as (HTMLElement & { hass?: HassAdapter }) | null;
      if (panel) panel.hass = value || undefined;
    });
  }

  get hass() { return this._hass; }

  set narrow(value: boolean) {
    this._narrow = Boolean(value);
    this.toggleAttribute("narrow", this._narrow);
    this._pages.forEach((page) => {
      const panel = page.firstElementChild as (HTMLElement & { narrow?: boolean }) | null;
      if (panel) panel.narrow = this._narrow;
    });
  }

  get narrow() { return this._narrow; }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this._renderShell();
    this._mountPages();
    window.addEventListener("resize", this._boundResize, { passive: true });
    window.addEventListener("touchmove", this._boundTouchMove, { passive: false });
    window.addEventListener("touchend", this._boundTouchEnd, { passive: true });
    window.addEventListener("touchcancel", this._boundTouchCancel, { passive: true });
    this.addEventListener("witmind-theme-change", this._boundTheme as EventListener);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._boundResize);
    window.removeEventListener("touchmove", this._boundTouchMove);
    window.removeEventListener("touchend", this._boundTouchEnd);
    window.removeEventListener("touchcancel", this._boundTouchCancel);
    this.removeEventListener("witmind-theme-change", this._boundTheme as EventListener);
  }

  private _renderShell() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host { display:block; height:100dvh; min-height:100dvh; overflow:hidden; background:var(--wit-canvas,#071118); }
        .workspace { position:relative; width:100%; height:100%; min-height:0; overflow:hidden; }
        .track { display:flex; width:100%; height:100%; min-height:0; touch-action:pan-y pinch-zoom; transition:transform 280ms cubic-bezier(.2,.8,.2,1); will-change:transform; }
        .track.is-dragging { transition:none; cursor:grabbing; }
        .page { flex:0 0 100%; width:100%; min-width:100%; height:100%; min-height:0; overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain; background:var(--wit-canvas,#071118); contain:layout paint; }
        .workspace-nav { position:fixed; z-index:80; left:50%; bottom:max(16px, env(safe-area-inset-bottom)); transform:translateX(-50%); display:flex; align-items:center; gap:6px; padding:5px; border:1px solid var(--wit-border-medium,rgba(255,255,255,.12)); border-radius:var(--wit-radius-pill,999px); background:var(--wit-surface-glass,rgba(7,17,24,.78)); box-shadow:var(--wit-shadow-dock,0 12px 32px rgba(0,0,0,.28)); backdrop-filter:blur(18px); }
        .workspace-nav button { width:var(--wit-touch-min,44px); height:var(--wit-touch-min,44px); display:grid; place-items:center; border:0; border-radius:var(--wit-radius-pill,999px); color:var(--wit-text-primary,#f5f6f4); background:transparent; cursor:pointer; font:inherit; }
        .workspace-nav button:hover:not(:disabled), .workspace-nav button:focus-visible { background:var(--wit-surface-interactive-hover,rgba(255,255,255,.1)); outline:2px solid var(--wit-accent,#f26522); outline-offset:1px; }
        .workspace-nav button:disabled { opacity:.35; cursor:not-allowed; }
        .workspace-nav .dot { width:9px; height:9px; padding:0; border:1px solid rgba(255,255,255,.5); background:transparent; }
        .workspace-nav .dot[aria-current="page"] { width:24px; border-color:var(--wit-accent,#f26522); background:var(--wit-accent,#f26522); }
        @media (prefers-reduced-motion:reduce) { .track { transition:none; } }
      </style>
      <div class="workspace" data-workspace>
        <div class="track" data-track></div>
        <nav class="workspace-nav" aria-label="Paneles Witmind" data-nav></nav>
      </div>
    `;
    const track = this.shadowRoot!.querySelector("[data-track]") as HTMLElement;
    this._track = track;
    track.addEventListener("pointerdown", (event) => this._onPointerDown(event));
    track.addEventListener("pointermove", (event) => this._onPointerMove(event));
    track.addEventListener("pointerup", (event) => this._onPointerUp(event));
    track.addEventListener("pointercancel", (event) => this._onPointerUp(event));
    track.addEventListener("touchstart", (event) => this._onTouchStart(event), { passive: true });
    track.addEventListener("click", (event) => this._onTrackClick(event), true);
    this.shadowRoot!.querySelector("[data-nav]")?.addEventListener("click", (event) => this._onNavClick(event));
  }

  private _panelConfigs() {
    const rawWorkspace = this._config.workspace_panels || this._config.workspacePanels;
    const configured = Array.isArray(rawWorkspace) ? rawWorkspace : [];
    const configuredById = new Map(configured.map((item) => {
      const value = item && typeof item === "object" ? item as PanelConfig : {};
      return [safePanelId(value.id || value.panel_id || value.panelId || value.panel_kind), value];
    }));
    const initial = safePanelId(this._config.panel_id || this._config.panelId || this._config.panel_kind);

    return PANEL_META.map((meta) => {
      const fallback = meta.id === "general" ? GENERAL_CONFIG : meta.id === "lobby" ? LOBBY_CONFIG : meta.id === "offices" ? OFFICES_CONFIG : meta.id === "recording" ? RECORDING_CONFIG : meta.id === "energy" ? ENERGY_CONFIG : meta.id === "calendar" ? CALENDAR_CONFIG : meta.id === "notifications" ? NOTIFICATIONS_CONFIG : meta.id === "control" ? CONTROL_CONFIG : {};
      const explicit = configuredById.get(meta.id) || {};
      const current = meta.id === initial ? this._config : {};
      const panelConfig = { ...cloneConfig(fallback), ...cloneConfig(explicit), ...cloneConfig(current) };
      // Las entradas antiguas de Lobby usan `devices`; la vista nueva trabaja
      // con la misma forma `spots` que ShowroomPanel.
      if (meta.id === "lobby" && Array.isArray(current.devices) && !Array.isArray(current.spots)) {
        panelConfig.spots = current.devices;
      }
      if (meta.id === "general") {
        panelConfig.panel_kind = "general";
        panelConfig.static_only = false;
      } else if (meta.id === "lobby") {
        panelConfig.panel_kind = "lobby";
      } else if (["offices", "recording", "control", "energy", "calendar", "notifications"].includes(meta.id)) {
        panelConfig.panel_kind = meta.id;
      } else {
        delete panelConfig.panel_kind;
        delete panelConfig.static_only;
      }
      return { ...meta, config: panelConfig };
    });
  }

  private _mountPages() {
    if (!this._track) return;
    this._track.innerHTML = "";
    this._pages = [];
    this._panelConfigs().forEach((definition, index) => {
      const page = document.createElement("section");
      page.className = "page";
      page.dataset.panelId = definition.id;
      page.setAttribute("aria-label", definition.label);
      page.setAttribute("aria-hidden", String(definition.id !== this._activeId));
      (page as HTMLElement & { inert?: boolean }).inert = definition.id !== this._activeId;

      if (definition.id === this._activeId) this._attachPanel(page, definition);
      this._track!.append(page);
      this._pages.push(page);
      if (index === 0) page.dataset.first = "true";
    });
    this._renderNav();
    this._snap(false);
  }

  private _attachPanel(page: HTMLElement, definition: { id: string; config: PanelConfig }) {
    if (page.firstElementChild) return;
    const tag = definition.id === "energy" ? "witmind-energy-panel" : ["offices", "recording", "control"].includes(definition.id) ? "witmind-operations-panel" : ["calendar", "notifications"].includes(definition.id) ? "witmind-admin-panel" : "showroom-panel";
    const panel = document.createElement(tag) as HTMLElement & { panel?: PanelConfig | { config: PanelConfig }; hass?: HassAdapter; narrow?: boolean; theme?: string };
    panel.panel = tag === "showroom-panel" ? { config: definition.config } : definition.config;
    panel.theme = this._theme;
    panel.narrow = this._narrow;
    if (this._hass) panel.hass = this._hass;
    page.append(panel);
  }

  private _activeIndex() {
    const index = this._pages.findIndex((page) => page.dataset.panelId === this._activeId);
    return index >= 0 ? index : 0;
  }

  private _renderNav() {
    const nav = this.shadowRoot?.querySelector("[data-nav]");
    if (!nav) return;
    const index = this._activeIndex();
    nav.innerHTML = `
      <button type="button" data-direction="prev" aria-label="Panel anterior" ${index === 0 ? "disabled" : ""}>‹</button>
      ${PANEL_META.map((panel) => `<button type="button" class="dot" data-panel="${panel.id}" aria-label="Abrir ${panel.label}" aria-current="${panel.id === this._activeId ? "page" : "false"}"></button>`).join("")}
      <button type="button" data-direction="next" aria-label="Panel siguiente" ${index === this._pages.length - 1 ? "disabled" : ""}>›</button>
    `;
  }

  private _onNavClick(event: Event) {
    const target = (event.target as HTMLElement).closest("button") as HTMLButtonElement | null;
    if (!target) return;
    if (target.dataset.panel) this._goTo(target.dataset.panel);
    else this._goTo(this._activeIndex() + (target.dataset.direction === "next" ? 1 : -1));
  }

  private _onPointerDown(event: PointerEvent) {
    // Touch Events are the canonical path for fingers. Some Android WebViews
    // cancel Pointer Events inside an iframe when its contents rerender.
    if (event.pointerType === "touch" || !event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
    const ignored = this._isSwipeIgnored(event);
    this._drag = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      time: performance.now(),
      ignored,
      axis: "pending",
    };
    this._dragging = false;
  }

  private _onPointerMove(event: PointerEvent) {
    if (!this._drag || this._drag.ignored || this._drag.pointerId !== event.pointerId || !this._track) return;
    const coalesced = event.getCoalescedEvents?.() || [];
    const latest = coalesced[coalesced.length - 1] || event;
    this._drag.lastX = latest.clientX;
    this._drag.lastY = latest.clientY;
    const dx = this._drag.lastX - this._drag.startX;
    const dy = this._drag.lastY - this._drag.startY;
    if (this._drag.axis === "pending") this._drag.axis = resolveSwipeAxis(dx, dy);
    if (this._drag.axis !== "horizontal") return;
    if (!this._dragging) {
      this._dragging = true;
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    }
    this._track.classList.add("is-dragging");
    this._track.style.transform = `translate3d(calc(${this._activeIndex() * -100}% + ${dx}px), 0, 0)`;
    event.preventDefault();
  }

  private _onPointerUp(event: PointerEvent) {
    if (!this._drag || this._drag.pointerId !== event.pointerId) return;
    const drag = this._drag;
    const cancelled = event.type === "pointercancel";
    if (!cancelled) {
      drag.lastX = resolvePointerReleaseCoordinate({ pointerType: drag.pointerType, lastMove: drag.lastX, release: event.clientX });
      drag.lastY = resolvePointerReleaseCoordinate({ pointerType: drag.pointerType, lastMove: drag.lastY, release: event.clientY });
    }
    const dx = drag.lastX - drag.startX;
    const elapsed = Math.max(1, performance.now() - this._drag.time);
    const direction = resolveSwipeDirection({ axis: drag.axis, cancelled, dx, elapsedMs: elapsed });
    const wasHorizontalDrag = this._dragging && drag.axis === "horizontal";
    const target = event.currentTarget as HTMLElement;
    if (target.hasPointerCapture?.(event.pointerId)) target.releasePointerCapture?.(event.pointerId);
    this._track?.classList.remove("is-dragging");
    this._drag = null;
    this._dragging = false;
    // El click sintetizado por Android llega después de pointerup. Si el dedo
    // estaba arrastrando, se consume para no activar la tarjeta subyacente.
    if (wasHorizontalDrag) this._suppressClickUntil = performance.now() + 500;
    if (direction) this._goTo(this._activeIndex() + direction);
    else this._snap(true);
  }

  private _isSwipeIgnored(event: Event) {
    const ignoredSelector = "input,textarea,select,[data-no-swipe]";
    const target = event.target;
    return event.composedPath().some((node) =>
      node instanceof HTMLElement && Boolean(node.closest(ignoredSelector)),
    ) || (target instanceof HTMLElement && Boolean(target.closest(ignoredSelector)));
  }

  private _onTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1 || this._drag) return;
    const touch = event.changedTouches[0] || event.touches[0];
    if (!touch) return;
    const ignored = this._isSwipeIgnored(event);
    this._touchDrag = {
      pointerId: touch.identifier,
      pointerType: "touch",
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      time: performance.now(),
      ignored,
      axis: "pending",
    };
    this._dragging = false;
  }

  private _onTouchMove(event: TouchEvent) {
    const drag = this._touchDrag;
    if (!drag || drag.ignored || !this._track) return;
    const touch = Array.from(event.touches).find((item) => item.identifier === drag.pointerId);
    if (!touch) return;
    drag.lastX = touch.clientX;
    drag.lastY = touch.clientY;
    const dx = drag.lastX - drag.startX;
    const dy = drag.lastY - drag.startY;
    if (drag.axis === "pending") drag.axis = resolveSwipeAxis(dx, dy);
    if (drag.axis !== "horizontal") return;
    this._dragging = true;
    this._track.classList.add("is-dragging");
    this._track.style.transform = `translate3d(calc(${this._activeIndex() * -100}% + ${dx}px), 0, 0)`;
    event.preventDefault();
  }

  private _onTouchEnd(event: TouchEvent) {
    const drag = this._touchDrag;
    if (!drag) return;
    const cancelled = event.type === "touchcancel";
    const touch = Array.from(event.changedTouches).find((item) => item.identifier === drag.pointerId);
    if (!cancelled && touch) {
      drag.lastX = touch.clientX;
      drag.lastY = touch.clientY;
    }
    const dx = drag.lastX - drag.startX;
    const elapsed = Math.max(1, performance.now() - drag.time);
    const direction = resolveSwipeDirection({ axis: drag.axis, cancelled, dx, elapsedMs: elapsed });
    const wasHorizontalDrag = this._dragging && drag.axis === "horizontal";
    this._track?.classList.remove("is-dragging");
    this._touchDrag = null;
    this._dragging = false;
    if (wasHorizontalDrag) this._suppressClickUntil = performance.now() + 500;
    if (direction) this._goTo(this._activeIndex() + direction);
    else this._snap(true);
  }

  private _onTrackClick(event: MouseEvent) {
    if (performance.now() > this._suppressClickUntil) return;
    this._suppressClickUntil = 0;
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  private _goTo(target: number | string) {
    const index = typeof target === "string"
      ? this._pages.findIndex((page) => page.dataset.panelId === target)
      : target;
    if (index < 0 || index >= this._pages.length) {
      this._snap(true);
      return;
    }
    this._activeId = this._pages[index].dataset.panelId || this._activeId;
    const definition = this._panelConfigs().find((item) => item.id === this._activeId);
    if (definition) this._attachPanel(this._pages[index], definition);
    this._pages.forEach((page) => {
      const active = page.dataset.panelId === this._activeId;
      page.setAttribute("aria-hidden", String(!active));
      (page as HTMLElement & { inert?: boolean }).inert = !active;
    });
    this._renderNav();
    this._snap(true);
    this.dispatchEvent(new CustomEvent("witmind-panel-change", {
      detail: { panelId: this._activeId },
      bubbles: true,
      composed: true,
    }));
  }

  private _loadTheme(): "dark" | "light" {
    try { return localStorage.getItem("witmind-showroom-panel-theme") === "light" ? "light" : "dark"; } catch (_) { return "dark"; }
  }

  private _setTheme(theme: "dark" | "light") {
    if (this._theme === theme) return;
    this._theme = theme;
    try { localStorage.setItem("witmind-showroom-panel-theme", theme); } catch (_) { /* storage optional */ }
    this._pages.forEach((page) => { const panel = page.firstElementChild as (HTMLElement & { theme?: string }) | null; if (panel) { panel.setAttribute("data-theme", theme); panel.theme = theme; } });
  }

  private _snap(animate = true) {
    if (!this._track) return;
    this._track.classList.toggle("is-dragging", !animate);
    this._track.style.transform = `translate3d(${this._activeIndex() * -100}%, 0, 0)`;
  }
}

if (!customElements.get("witmind-workspace")) customElements.define("witmind-workspace", WitmindWorkspace);

export { WitmindWorkspace };
