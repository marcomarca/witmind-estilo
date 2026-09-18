import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { renderIcon } from "./utilities/icon.js";
import {
  BUILDING_ENTITIES,
  BUILDING_ZONES,
  BUILDING_ZONE_OVERLAYS,
  normalizePowerToWatts,
  type BuildingFloor,
  type BuildingZone,
} from "./building-config.js";
import type { WitmindEntity } from "./ha/WitmindHaClient.js";

type HassLike = {
  states?: Record<string, WitmindEntity>;
  callService?: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
  connection?: {
    sendMessagePromise?: (message: Record<string, unknown>) => Promise<unknown>;
  };
};

type PanelConfig = Record<string, any>;
type ActionState = "idle" | "loading" | "error";

const FLOOR_META: Record<BuildingFloor, { label: string; context: string; image: string }> = {
  ground: { label: "Planta Baja", context: "Showroom", image: "./building/planta-baja.png" },
  upper: { label: "Planta Alta", context: "Taller", image: "./building/planta-alta.png" },
};

const WEATHER_LABELS: Record<string, string> = {
  "clear-night": "Despejado de noche",
  cloudy: "Nublado",
  exceptional: "Condición excepcional",
  fog: "Niebla",
  hail: "Granizo",
  lightning: "Tormenta eléctrica",
  "lightning-rainy": "Tormenta y lluvia",
  partlycloudy: "Parcialmente nublado",
  pouring: "Lluvia intensa",
  rainy: "Lluvioso",
  snowy: "Nevado",
  "snowy-rainy": "Aguanieve",
  sunny: "Soleado",
  windy: "Ventoso",
  "windy-variant": "Viento y nubes",
};

const unavailableState = (state?: WitmindEntity) => !state || state.state === "unknown" || state.state === "unavailable";
const numericState = (state?: WitmindEntity, attribute?: string) => {
  if (unavailableState(state)) return null;
  const raw = attribute ? state?.attributes?.[attribute] : state?.state;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
};
const powerWattsState = (state?: WitmindEntity) => {
  const value = numericState(state);
  if (value === null) return null;
  return normalizePowerToWatts(value, String(state?.attributes?.unit_of_measurement || "W"));
};

class WitmindBuildingPanel extends LitElement {
  private _hass: HassLike | null = null;
  private _panel: PanelConfig = {};
  private _theme: "dark" | "light" = "dark";
  private _activeFloor: BuildingFloor = "ground";
  private _actionState: ActionState = "idle";
  private _actionMessage = "";
  private _clock = new Date();
  private _clockTimer?: number;
  private _history: number[] = [];
  private _historyTrend: number | null = null;
  private _historyState: "idle" | "loading" | "ready" | "unavailable" | "error" = "idle";
  private _historyRequested = false;
  private _touchStartX: number | null = null;
  private _touchLastX: number | null = null;
  private _mouseStartX: number | null = null;
  private _mouseLastX: number | null = null;

  set hass(value: HassLike | null) {
    const old = this._hass;
    this._hass = value;
    this.requestUpdate("hass", old);
    if (this.isConnected && !this._historyRequested) void this._loadHistory();
  }
  get hass() { return this._hass; }

  set panel(value: PanelConfig) {
    const old = this._panel;
    this._panel = value && typeof value === "object" ? value : {};
    this.requestUpdate("panel", old);
  }
  get panel() { return this._panel; }

  set theme(value: string) {
    if (value !== "dark" && value !== "light") return;
    const old = this._theme;
    this._theme = value;
    this.setAttribute("data-theme", value);
    this.requestUpdate("theme", old);
  }
  get theme() { return this._theme; }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("data-theme", this._theme);
    this._clockTimer = window.setInterval(() => {
      this._clock = new Date();
      this.requestUpdate();
    }, 30_000);
    window.addEventListener("touchmove", this._onTouchMove, { passive: false });
    window.addEventListener("touchend", this._onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", this._onTouchCancel, { passive: true });
    window.addEventListener("pointermove", this._onPointerMove);
    window.addEventListener("pointerup", this._onPointerUp);
    window.addEventListener("pointercancel", this._onPointerCancel);
    if (!this._historyRequested) void this._loadHistory();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._clockTimer) window.clearInterval(this._clockTimer);
    window.removeEventListener("touchmove", this._onTouchMove);
    window.removeEventListener("touchend", this._onTouchEnd);
    window.removeEventListener("touchcancel", this._onTouchCancel);
    window.removeEventListener("pointermove", this._onPointerMove);
    window.removeEventListener("pointerup", this._onPointerUp);
    window.removeEventListener("pointercancel", this._onPointerCancel);
  }

  protected updated(changed: PropertyValues) {
    if (changed.has("theme")) this.setAttribute("data-theme", this._theme);
  }

  private _state(entity: string) { return this._hass?.states?.[entity]; }
  private _zones() { return BUILDING_ZONES.filter((zone) => zone.floor === this._activeFloor); }
  private _availableCircuits(zone: BuildingZone) { return zone.circuits.filter((circuit) => !unavailableState(this._state(circuit.entity))); }
  private _onCircuits(zone: BuildingZone) { return this._availableCircuits(zone).filter((circuit) => this._state(circuit.entity)?.state === "on"); }

  private _profileActive(zone: BuildingZone) {
    if (!zone.action) return this._onCircuits(zone).length > 0;
    const actionEntities = [...zone.action.onEntities, ...zone.action.offEntities];
    if (actionEntities.some((entity) => unavailableState(this._state(entity)))) return false;
    return zone.action.onEntities.every((entity) => this._state(entity)?.state === "on")
      && zone.action.offEntities.every((entity) => this._state(entity)?.state === "off");
  }

  private _zonePower(zone: BuildingZone) {
    const measured = zone.power ? powerWattsState(this._state(zone.power)) : null;
    if (measured !== null) return { value: measured, measured: true };
    const known = this._onCircuits(zone).filter((circuit) => typeof circuit.watts === "number");
    if (!known.length) return null;
    return { value: known.reduce((sum, circuit) => sum + Number(circuit.watts), 0), measured: false };
  }

  private _format(value: number | null, unit: string, digits = 0) {
    if (value === null) return "No disponible";
    return `${new Intl.NumberFormat("es-BO", { maximumFractionDigits: digits }).format(value)} ${unit}`;
  }

  private _weather() {
    const state = this._state(BUILDING_ENTITIES.weather);
    return {
      available: !unavailableState(state),
      temperature: numericState(state, "temperature"),
      condition: WEATHER_LABELS[String(state?.state || "")] || (unavailableState(state) ? "No disponible" : String(state?.state)),
    };
  }

  private _environment() {
    const temperatures = this._zones().map((zone) => zone.temperature && numericState(this._state(zone.temperature))).filter((value): value is number => typeof value === "number");
    const humidity = this._zones().map((zone) => zone.humidity && numericState(this._state(zone.humidity))).filter((value): value is number => typeof value === "number");
    const average = (values: number[]) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
    return { temperature: average(temperatures), humidity: average(humidity) };
  }

  private _activePower() {
    const measured = powerWattsState(this._state(BUILDING_ENTITIES.showroomPower));
    return measured === null ? null : measured;
  }

  private async _loadHistory() {
    const send = this._hass?.connection?.sendMessagePromise;
    if (!send || unavailableState(this._state(BUILDING_ENTITIES.showroomPower))) {
      this._historyState = "unavailable";
      this.requestUpdate();
      return;
    }
    this._historyRequested = true;
    this._historyState = "loading";
    this.requestUpdate();
    const end = Date.now();
    try {
      const raw = await send({
        type: "history/history_during_period",
        start_time: new Date(end - 48 * 3_600_000).toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: [BUILDING_ENTITIES.showroomPower],
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });
      const source = Array.isArray(raw) ? (Array.isArray(raw[0]) ? raw[0] : raw) : Object.values((raw || {}) as Record<string, unknown>)[0];
      const points = (Array.isArray(source) ? source : []).map((item: any) => ({
        value: Number(item?.state ?? item?.s),
        time: Date.parse(String(item?.last_changed ?? item?.last_updated ?? item?.lu ?? item?.lc ?? "")),
      })).filter((point) => Number.isFinite(point.value) && Number.isFinite(point.time));
      const hourly = new Map<number, number>();
      points.forEach((point) => hourly.set(Math.floor(point.time / 3_600_000), point.value));
      const currentHour = Math.floor(end / 3_600_000);
      const current = Array.from({ length: 24 }, (_, index) => hourly.get(currentHour - 23 + index)).filter((value): value is number => typeof value === "number");
      const previous = Array.from({ length: 24 }, (_, index) => hourly.get(currentHour - 47 + index)).filter((value): value is number => typeof value === "number");
      this._history = current;
      if (current.length && previous.length) {
        const currentAverage = current.reduce((sum, value) => sum + value, 0) / current.length;
        const previousAverage = previous.reduce((sum, value) => sum + value, 0) / previous.length;
        this._historyTrend = previousAverage > 0 ? ((currentAverage - previousAverage) / previousAverage) * 100 : null;
      }
      this._historyState = current.length ? "ready" : "unavailable";
    } catch (_) {
      this._historyState = "error";
    }
    this.requestUpdate();
  }

  private _setFloor(floor: BuildingFloor) {
    if (floor === this._activeFloor) return;
    this._activeFloor = floor;
    this.requestUpdate();
  }

  private _onTouchStart(event: TouchEvent) {
    const touch = event.changedTouches[0] || event.touches[0];
    if (!touch) return;
    this._touchStartX = touch.clientX;
    this._touchLastX = touch.clientX;
  }
  private _onTouchMove = (event: TouchEvent) => {
    if (this._touchStartX === null) return;
    const touch = event.touches[0];
    if (!touch) return;
    this._touchLastX = touch.clientX;
    if (Math.abs(touch.clientX - this._touchStartX) > 12) event.preventDefault();
  };
  private _onTouchEnd = () => {
    if (this._touchStartX !== null && this._touchLastX !== null) this._finishFloorSwipe(this._touchLastX - this._touchStartX);
    this._touchStartX = null;
    this._touchLastX = null;
  };
  private _onTouchCancel = () => { this._touchStartX = null; this._touchLastX = null; };

  private _onPointerDown(event: PointerEvent) {
    if (event.pointerType === "touch" || event.button !== 0) return;
    this._mouseStartX = event.clientX;
    this._mouseLastX = event.clientX;
  }
  private _onPointerMove = (event: PointerEvent) => {
    if (this._mouseStartX !== null) this._mouseLastX = event.clientX;
  };
  private _onPointerUp = () => {
    if (this._mouseStartX !== null && this._mouseLastX !== null) this._finishFloorSwipe(this._mouseLastX - this._mouseStartX);
    this._mouseStartX = null;
    this._mouseLastX = null;
  };
  private _onPointerCancel = () => { this._mouseStartX = null; this._mouseLastX = null; };
  private _finishFloorSwipe(dx: number) {
    if (Math.abs(dx) < 54) return;
    this._setFloor(dx < 0 ? "upper" : "ground");
  }

  private async _toggleZone(zone: BuildingZone) {
    if (!this._hass?.callService || this._actionState === "loading") return;
    const available = this._availableCircuits(zone);
    if (!available.length) return;
    const turnOn = zone.action ? !this._profileActive(zone) : this._onCircuits(zone).length !== available.length;
    this._actionState = "loading";
    this._actionMessage = `${turnOn ? "Encendiendo" : "Apagando"} ${zone.label}`;
    this.requestUpdate();
    try {
      if (zone.action) {
        if (!turnOn) {
          await this._hass.callService("switch", "turn_off", { entity_id: available.map((circuit) => circuit.entity) });
        } else {
          if (zone.action.serviceEntity && !unavailableState(this._state(zone.action.serviceEntity))) {
            await this._hass.callService("scene", "turn_on", { entity_id: zone.action.serviceEntity });
          }
          const offEntities = zone.action.offEntities.filter((entity) => !unavailableState(this._state(entity)));
          const onEntities = zone.action.onEntities.filter((entity) => !unavailableState(this._state(entity)));
          if (offEntities.length) await this._hass.callService("switch", "turn_off", { entity_id: offEntities });
          if (onEntities.length) await this._hass.callService("switch", "turn_on", { entity_id: onEntities });
        }
      } else {
        await this._hass.callService("switch", turnOn ? "turn_on" : "turn_off", { entity_id: available.map((circuit) => circuit.entity) });
      }
      this._actionState = "idle";
      this._actionMessage = turnOn && zone.action ? `${zone.action.label} aplicado en ${zone.label}` : `Orden enviada a ${zone.label}`;
    } catch (error) {
      this._actionState = "error";
      this._actionMessage = error instanceof Error ? error.message : "No se pudo ejecutar la acción";
    }
    this.requestUpdate();
  }

  private async _setAll(turnOn: boolean) {
    if (!this._hass?.callService || this._actionState === "loading") return;
    const entities = BUILDING_ZONES.flatMap((zone) => this._availableCircuits(zone).map((circuit) => circuit.entity));
    if (!entities.length) return;
    this._actionState = "loading";
    this._actionMessage = turnOn ? "Encendiendo circuitos disponibles" : "Apagando circuitos disponibles";
    this.requestUpdate();
    try {
      await this._hass.callService("switch", turnOn ? "turn_on" : "turn_off", { entity_id: entities });
      this._actionState = "idle";
      this._actionMessage = "Orden enviada. Esperando confirmación de Home Assistant";
    } catch (error) {
      this._actionState = "error";
      this._actionMessage = error instanceof Error ? error.message : "No se pudo ejecutar la acción";
    }
    this.requestUpdate();
  }

  private _scrollTo(id: string) {
    this.renderRoot.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  private _toggleMenu() {
    this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }));
  }

  private _renderZoneRow(zone: BuildingZone) {
    const available = this._availableCircuits(zone);
    const active = this._onCircuits(zone);
    const unavailable = zone.circuits.length - available.length;
    const power = this._zonePower(zone);
    const profileActive = this._profileActive(zone);
    const status = !available.length ? "unavailable" : unavailable ? "warning" : active.length ? "normal" : "off";
    const label = status === "unavailable" ? "No disponible" : status === "warning" ? "Parcial" : status === "normal" ? "Normal" : "Apagada";
    return html`
      <div class="circuit-row" role="row">
        <div class="zone-name" role="cell">${renderIcon("lightbulb", { size: 18 })}<strong>${zone.label}</strong></div>
        <div role="cell"><span class="status status-${status}"><i></i>${label}</span></div>
        <div role="cell" class="numeric">${power ? this._format(power.value, "W") : "No disponible"}${power && !power.measured ? html`<small>nominal</small>` : nothing}</div>
        <div role="cell" class="numeric">${available.length} / ${zone.circuits.length}</div>
        <div role="cell">
          <button class="toggle ${profileActive ? "is-on" : ""}" ?disabled=${!available.length || this._actionState === "loading"} @click=${() => this._toggleZone(zone)} aria-label="${profileActive ? "Apagar" : "Activar"} ${zone.action?.label || zone.label}" aria-pressed=${profileActive}><span></span></button>
        </div>
      </div>`;
  }

  private _renderFloorOverlays() {
    return BUILDING_ZONE_OVERLAYS[this._activeFloor].map((overlay) => {
      const zone = BUILDING_ZONES.find((candidate) => candidate.id === overlay.zoneId);
      if (!zone) return nothing;
      const available = this._availableCircuits(zone);
      const active = this._onCircuits(zone);
      const power = this._zonePower(zone);
      const temperature = zone.temperature ? numericState(this._state(zone.temperature)) : null;
      const humidity = zone.humidity ? numericState(this._state(zone.humidity)) : null;
      const hasLiveData = available.length || power || temperature !== null || humidity !== null;
      if (!hasLiveData) return nothing;
      return html`
        <div class="zone-overlay ${active.length ? "is-active" : ""}" style="left:${overlay.left}%;top:${overlay.top}%;width:${overlay.width || 21}%">
          <strong>${zone.label}</strong>
          <div class="overlay-metrics">
            ${available.length ? html`<span>${renderIcon("lightbulb", { size: 12 })}${active.length}/${available.length}</span>` : nothing}
            ${power ? html`<span>${renderIcon("zap", { size: 12 })}${this._format(power.value, "W")}</span>` : nothing}
            ${temperature !== null ? html`<span>${renderIcon("thermometer", { size: 12 })}${this._format(temperature, "°C", 1)}</span>` : nothing}
            ${humidity !== null ? html`<span>${renderIcon("droplets", { size: 12 })}${this._format(humidity, "%", 0)}</span>` : nothing}
          </div>
        </div>`;
    });
  }

  protected render() {
    const floor = FLOOR_META[this._activeFloor];
    const weather = this._weather();
    const environment = this._environment();
    const activePower = this._activePower();
    const historyMax = this._history.length ? Math.max(...this._history, 1) : 1;
    const alarmEntities = Array.isArray(this._panel.alarm_entities) ? this._panel.alarm_entities as string[] : [];
    const alarms = alarmEntities.map((entity) => this._state(entity)).filter((state) => state && !unavailableState(state) && state.state !== "off");
    const connectionReady = Boolean(this._hass?.states && Object.keys(this._hass.states).length);
    const time = new Intl.DateTimeFormat("es-BO", { hour: "2-digit", minute: "2-digit", hour12: false }).format(this._clock);
    const date = new Intl.DateTimeFormat("es-BO", { day: "2-digit", month: "short", year: "numeric" }).format(this._clock);

    return html`
      <div class="bms-shell">
        <header class="topbar">
          <button class="menu-button" @click=${this._toggleMenu} aria-label="Abrir menú de Home Assistant">${renderIcon("sliders", { size: 21 })}</button>
          <div class="brand-mark">${renderIcon("home", { size: 27 })}<div><strong>WITMIND</strong><span>CONTROL DE EDIFICIO</span></div></div>
          <div class="title-block"><h1>Control de Edificio</h1><p>Sistema de gestión y monitoreo</p></div>
          <div class="header-status"><div class="clock"><strong>${time}</strong><span>${date}</span></div><div class="weather-chip">${renderIcon("sun", { size: 22 })}<span><strong>${this._format(weather.temperature, "°C", 1)}</strong>${weather.condition}</span></div><div class="mode-chip ${connectionReady ? "ok" : "warn"}">${renderIcon(connectionReady ? "check" : "alert-circle", { size: 18 })}<span><small>Estado</small><strong>${connectionReady ? "Supervisión activa" : "Conexión pendiente"}</strong></span></div></div>
        </header>

        <aside class="sidebar" aria-label="Secciones del edificio">
          <div class="side-brand">${renderIcon("home", { size: 24 })}<span>WITMIND</span></div>
          <nav>
            <button class="active" @click=${() => this._scrollTo("floor-plan")}>${renderIcon("home")}<span>Inicio</span></button>
            <button @click=${() => this._scrollTo("consumption")}>${renderIcon("zap")}<span>Eléctrico</span></button>
            <button @click=${() => this._scrollTo("environment")}>${renderIcon("sun")}<span>Clima</span></button>
            <button @click=${() => this._scrollTo("circuits")}>${renderIcon("lightbulb")}<span>Iluminación</span></button>
            <button @click=${() => this._scrollTo("alerts")}>${renderIcon("shield")}<span>Seguridad</span></button>
            <button @click=${() => this._scrollTo("consumption")}>${renderIcon("activity")}<span>Energía</span></button>
            <button disabled>${renderIcon("layers")}<span>Reportes</span></button>
            <button disabled>${renderIcon("settings")}<span>Configuración</span></button>
          </nav>
          <div class="operator"><span class="operator-avatar">W</span><div><strong>Operación</strong><small>Home Assistant</small></div></div>
        </aside>

        <main class="dashboard-grid">
          <section class="main-column">
            <article id="floor-plan" class="panel floor-card">
              <div class="panel-head"><div class="panel-title">${renderIcon("home", { size: 19 })}<h2>PLANO DEL EDIFICIO <span>${floor.context}</span></h2></div><div class="floor-selector" role="group" aria-label="Seleccionar planta"><button class=${this._activeFloor === "ground" ? "selected" : ""} @click=${() => this._setFloor("ground")}>Planta Baja</button><button class=${this._activeFloor === "upper" ? "selected" : ""} @click=${() => this._setFloor("upper")}>Planta Alta</button></div></div>
              <div class="floor-viewport" data-no-swipe @touchstart=${this._onTouchStart} @pointerdown=${this._onPointerDown} aria-label="${floor.label}: ${floor.context}">
                <img src=${floor.image} alt="Plano arquitectónico real de ${floor.label}" draggable="false" />
                <div class="floor-overlays" aria-label="Datos en tiempo real de ${floor.label}">${this._renderFloorOverlays()}</div>
                <div class="floor-caption"><strong>${floor.label}</strong><span>${floor.context}</span></div>
                <div class="compass" aria-label="Norte">N<span>↑</span></div>
              </div>
            </article>

            <article id="circuits" class="panel circuits-card">
              <div class="panel-head"><div class="panel-title">${renderIcon("lightbulb", { size: 19 })}<h2>CIRCUITOS POR ZONA</h2></div><span class="head-meta">${floor.label}</span></div>
              <div class="circuit-table" role="table" aria-label="Circuitos por zona">
                <div class="circuit-header" role="row"><span role="columnheader">Zona</span><span role="columnheader">Estado</span><span role="columnheader">Potencia</span><span role="columnheader">Circuitos</span><span role="columnheader">Acciones</span></div>
                ${this._zones().filter((zone) => zone.showInTable !== false && zone.circuits.length).map((zone) => this._renderZoneRow(zone))}
              </div>
            </article>
          </section>

          <section class="side-column">
            <article id="alerts" class="panel side-card alerts-card">
              <div class="panel-head"><div class="panel-title warning-icon">${renderIcon("alert-triangle", { size: 19 })}<h2>ALARMAS / EVENTOS</h2></div><span class="head-meta">${alarms.length} activas</span></div>
              ${alarms.length ? html`<div class="alert-list">${alarms.map((alarm) => html`<div class="alert-row">${renderIcon("alert-triangle", { size: 20 })}<div><strong>${String(alarm?.attributes?.friendly_name || alarm?.entity_id)}</strong><span>${String(alarm?.state)}</span></div></div>`)}</div>` : html`<div class="empty-state">${renderIcon("shield", { size: 26 })}<div><strong>Sin alarmas configuradas</strong><span>Conecta entidades en <code>alarm_entities</code> para habilitar esta sección.</span></div></div>`}
            </article>

            <article id="environment" class="panel side-card">
              <div class="panel-head"><div class="panel-title">${renderIcon("sun", { size: 19 })}<h2>CONDICIONES AMBIENTALES</h2></div></div>
              <div class="environment-grid"><div>${renderIcon("thermometer", { size: 27 })}<strong>${this._format(environment.temperature, "°C", 1)}</strong><span>Interior promedio</span></div><div>${renderIcon("droplets", { size: 27 })}<strong>${this._format(environment.humidity, "%", 0)}</strong><span>Humedad promedio</span></div><div>${renderIcon("sun", { size: 27 })}<strong>${this._format(weather.temperature, "°C", 1)}</strong><span>Exterior</span></div><div>${renderIcon("activity", { size: 27 })}<strong class="condition">${weather.condition}</strong><span>WTX - MDTC</span></div></div>
            </article>

            <article id="consumption" class="panel side-card consumption-card">
              <div class="panel-head"><div class="panel-title">${renderIcon("zap", { size: 19 })}<h2>CONSUMO ELÉCTRICO</h2></div></div>
              <div class="power-reading">${renderIcon("zap", { size: 43 })}<div><strong>${this._format(activePower, "W")}</strong><span>${activePower === null ? "Medición no disponible" : "Showroom - potencia activa"}</span></div>${this._historyTrend !== null ? html`<b class=${this._historyTrend <= 0 ? "trend good" : "trend bad"}>${this._historyTrend > 0 ? "+" : ""}${this._historyTrend.toFixed(0)} %<small>vs. 24 h previas</small></b>` : nothing}</div>
              ${this._historyState === "ready" ? html`<div class="history-bars" aria-label="Histórico real de potencia de las últimas 24 horas">${this._history.map((value) => html`<i style="height:${Math.max(4, value / historyMax * 100)}%" title="${this._format(value, "W")}"></i>`)}</div>` : html`<div class="history-empty"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p>${this._historyState === "loading" ? "Cargando histórico real de Home Assistant" : this._historyState === "error" ? "No se pudo cargar el histórico" : "Histórico no disponible para esta medición"}.</p></div>`}
            </article>

            <article class="panel side-card quick-card">
              <div class="panel-head"><div class="panel-title">${renderIcon("settings", { size: 19 })}<h2>CONTROLES RÁPIDOS</h2></div></div>
              <div class="quick-grid"><button @click=${() => this._setAll(true)} ?disabled=${this._actionState === "loading"}>${renderIcon("lightbulb", { size: 25 })}<span><strong>Encender luces</strong><small>Circuitos disponibles</small></span></button><button @click=${() => this._setAll(false)} ?disabled=${this._actionState === "loading"}>${renderIcon("power", { size: 25 })}<span><strong>Apagar luces</strong><small>Circuitos disponibles</small></span></button><button disabled>${renderIcon("sparkles", { size: 25 })}<span><strong>Modo ahorro</strong><small>No configurado</small></span></button><button disabled>${renderIcon("settings", { size: 25 })}<span><strong>Mantenimiento</strong><small>No configurado</small></span></button></div>
              ${this._actionMessage ? html`<div class="action-feedback ${this._actionState}">${this._actionState === "loading" ? renderIcon("refresh-cw", { size: 15 }) : renderIcon(this._actionState === "error" ? "alert-circle" : "check", { size: 15 })}<span>${this._actionMessage}</span></div>` : nothing}
            </article>
          </section>
        </main>
      </div>`;
  }

  static styles = css`
    :host{display:block;min-height:100dvh;color:#eaf0f1;background:#061118;font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums;--line:rgba(128,183,200,.16);--surface:rgba(8,25,34,.92);--surface-2:rgba(11,33,43,.86);--muted:#8fa5ad;--orange:#f26522;--cyan:#42b9e8;--green:#22d98b;--amber:#ffb32c;--danger:#ff4d5f}:host([data-theme=light]){color:#14232a;background:#eaf0f1;--line:rgba(22,54,67,.16);--surface:rgba(255,255,255,.94);--surface-2:#f3f7f8;--muted:#667b84}*{box-sizing:border-box}button{font:inherit;color:inherit}:focus-visible{outline:2px solid var(--orange);outline-offset:2px}.bms-shell{min-height:100dvh;display:grid;grid-template:70px 1fr/200px 1fr;background:radial-gradient(circle at 62% 0,rgba(18,91,112,.13),transparent 36%),linear-gradient(145deg,#040c11,#071720 58%,#061118)}:host([data-theme=light]) .bms-shell{background:linear-gradient(145deg,#edf3f4,#dce7e9)}.topbar{grid-column:1/-1;position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:20px;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,18,25,.94);backdrop-filter:blur(18px)}:host([data-theme=light]) .topbar{background:rgba(247,250,250,.94)}.menu-button{display:none;width:42px;height:42px;border:1px solid var(--line);border-radius:10px;background:var(--surface-2);cursor:pointer}.brand-mark{display:flex;align-items:center;gap:11px;min-width:245px;color:var(--orange)}.brand-mark>svg{width:33px;height:33px}.brand-mark div{display:grid}.brand-mark strong{color:inherit;font-size:20px;letter-spacing:.08em}.brand-mark span{font-size:9px;font-weight:800;letter-spacing:.14em}.title-block{padding-left:22px;border-left:1px solid var(--line)}.title-block h1{margin:0;font-size:26px;letter-spacing:-.035em}.title-block p{margin:3px 0 0;color:var(--muted);font-size:11px}.header-status{display:flex;align-items:center;gap:10px;margin-left:auto}.clock{display:grid;padding-right:14px;border-right:1px solid var(--line);text-align:right}.clock strong{font-size:21px}.clock span{color:var(--muted);font-size:9px;text-transform:capitalize}.weather-chip,.mode-chip{display:flex;align-items:center;gap:9px;min-height:42px;padding:7px 12px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2)}.weather-chip>svg{color:var(--amber)}.weather-chip span,.mode-chip span{display:grid}.weather-chip strong,.mode-chip strong{font-size:11px}.weather-chip span{color:var(--muted);font-size:9px}.mode-chip small{color:var(--muted);font-size:8px}.mode-chip.ok{border-color:rgba(34,217,139,.35)}.mode-chip.ok>svg,.mode-chip.ok strong{color:var(--green)}.mode-chip.warn>svg{color:var(--amber)}.sidebar{position:sticky;top:70px;height:calc(100dvh - 70px);display:flex;flex-direction:column;padding:14px 10px;border-right:1px solid var(--line);background:rgba(5,19,27,.78)}:host([data-theme=light]) .sidebar{background:rgba(241,246,247,.84)}.side-brand{display:none}.sidebar nav{display:grid;gap:6px}.sidebar nav button{min-height:51px;display:flex;align-items:center;gap:14px;padding:0 14px;border:1px solid transparent;border-radius:9px;background:transparent;color:#a6bac1;text-align:left;cursor:pointer}.sidebar nav button:hover:not(:disabled){background:rgba(255,255,255,.04)}.sidebar nav button.active{border-color:rgba(242,101,34,.3);border-left:3px solid var(--orange);background:linear-gradient(90deg,rgba(242,101,34,.17),rgba(242,101,34,.05));color:#fff}.sidebar nav button.active svg{color:var(--orange)}.sidebar nav button:disabled{opacity:.4;cursor:not-allowed}.operator{display:flex;align-items:center;gap:10px;margin-top:auto;padding:12px;border-top:1px solid var(--line)}.operator-avatar{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:var(--surface-2);font-weight:800}.operator div{display:grid}.operator strong{font-size:11px}.operator small{color:var(--muted);font-size:9px}.dashboard-grid{min-width:0;display:grid;grid-template-columns:minmax(0,1.95fr) minmax(330px,1fr);gap:14px;padding:14px}.main-column,.side-column{min-width:0;display:grid;align-content:start;gap:14px}.panel{overflow:hidden;border:1px solid var(--line);border-radius:12px;background:linear-gradient(150deg,var(--surface),rgba(6,24,32,.94));box-shadow:inset 0 1px rgba(255,255,255,.025),0 12px 30px rgba(0,0,0,.18)}:host([data-theme=light]) .panel{background:var(--surface)}.panel-head{min-height:46px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;border-bottom:1px solid var(--line)}.panel-title{display:flex;align-items:center;gap:9px}.panel-title>svg{color:var(--orange)}.panel-title h2{margin:0;font-size:13px;letter-spacing:.055em}.panel-title h2 span{color:var(--muted);font-weight:500}.warning-icon>svg{color:var(--amber)}.head-meta{color:var(--muted);font-size:10px}.floor-selector{display:flex;padding:3px;border:1px solid var(--line);border-radius:8px;background:rgba(0,0,0,.18)}.floor-selector button{min-height:30px;padding:0 12px;border:0;border-radius:6px;background:transparent;color:var(--muted);font-size:10px;cursor:pointer}.floor-selector button.selected{background:rgba(242,101,34,.16);color:#fff;box-shadow:inset 0 0 0 1px rgba(242,101,34,.32)}.floor-viewport{position:relative;height:min(56vh,585px);min-height:360px;display:grid;place-items:center;overflow:hidden;padding:12px;background:radial-gradient(circle at center,rgba(21,88,110,.22),transparent 65%),#06131a;touch-action:pan-y;user-select:none}.floor-viewport img{width:100%;height:100%;object-fit:contain;filter:saturate(.88) contrast(1.04);transition:opacity .18s}.floor-caption{position:absolute;left:16px;bottom:14px;display:flex;gap:8px;align-items:baseline;padding:7px 10px;border:1px solid var(--line);border-radius:7px;background:rgba(5,18,25,.82);backdrop-filter:blur(8px)}.floor-caption strong{font-size:11px}.floor-caption span{color:var(--muted);font-size:9px}.compass{position:absolute;right:16px;top:16px;width:40px;height:52px;display:grid;place-items:center;border:1px solid var(--line);border-radius:20px;background:rgba(5,18,25,.78);font-size:9px}.compass span{display:block;color:#dbe8eb;font-size:22px;line-height:17px}.circuit-table{padding:3px 10px 8px}.circuit-header,.circuit-row{display:grid;grid-template-columns:minmax(150px,1.5fr) minmax(95px,.8fr) minmax(105px,.8fr) 75px 70px;align-items:center;gap:8px}.circuit-header{min-height:30px;color:var(--muted);font-size:9px}.circuit-row{min-height:43px;border-top:1px solid var(--line);font-size:10px}.zone-name{display:flex;align-items:center;gap:9px}.zone-name svg{color:var(--orange)}.status{display:inline-flex;align-items:center;gap:6px}.status i{width:8px;height:8px;border-radius:50%;background:var(--muted)}.status-normal{color:var(--green)}.status-normal i{background:var(--green);box-shadow:0 0 9px rgba(34,217,139,.55)}.status-off{color:var(--muted)}.status-warning{color:var(--amber)}.status-warning i{background:var(--amber)}.numeric{font-variant-numeric:tabular-nums}.numeric small{display:block;color:var(--muted);font-size:8px}.toggle{width:38px;height:22px;padding:2px;border:1px solid var(--line);border-radius:999px;background:#183039;cursor:pointer}.toggle span{display:block;width:16px;height:16px;border-radius:50%;background:#8ba1aa;transition:transform .16s,background .16s}.toggle.is-on{border-color:var(--orange);background:rgba(242,101,34,.25)}.toggle.is-on span{transform:translateX(16px);background:#fff}.toggle:disabled{opacity:.4;cursor:not-allowed}.side-card{min-height:0}.side-card>.panel-head{min-height:42px}.side-card .panel-title h2{font-size:12px}.empty-state{min-height:98px;display:flex;align-items:center;gap:13px;padding:18px;color:var(--muted)}.empty-state>svg{color:var(--green)}.empty-state div{display:grid;gap:4px}.empty-state strong{color:inherit;font-size:11px}.empty-state span{font-size:9px;line-height:1.45}.empty-state code{color:var(--orange)}.alert-list{padding:4px 12px}.alert-row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);color:var(--danger)}.alert-row div{display:grid}.alert-row strong{font-size:10px}.alert-row span{color:var(--muted);font-size:9px}.environment-grid{display:grid;grid-template-columns:repeat(4,1fr);padding:10px}.environment-grid>div{min-width:0;display:grid;place-items:center;gap:5px;padding:10px 5px;border-right:1px solid var(--line);text-align:center}.environment-grid>div:last-child{border-right:0}.environment-grid svg{color:var(--cyan)}.environment-grid strong{font-size:15px}.environment-grid .condition{max-width:95px;font-size:10px;line-height:1.25}.environment-grid span{color:var(--muted);font-size:8px}.power-reading{display:flex;align-items:center;gap:14px;padding:13px 18px}.power-reading>svg{color:var(--amber)}.power-reading div{display:grid}.power-reading strong{font-size:26px;line-height:1}.power-reading span{margin-top:5px;color:var(--muted);font-size:9px}.history-empty{position:relative;height:69px;display:flex;align-items:flex-end;gap:5px;margin:0 14px 12px;padding:0 0 22px;border-bottom:1px solid var(--line)}.history-empty>span{flex:1;max-width:22px;height:12px;background:rgba(242,101,34,.16);border:1px solid rgba(242,101,34,.2)}.history-empty>span:nth-child(2n){height:20px}.history-empty>span:nth-child(3n){height:8px}.history-empty p{position:absolute;left:0;bottom:1px;margin:0;color:var(--muted);font-size:8px}.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px}.quick-grid button{min-height:58px;display:flex;align-items:center;gap:10px;padding:9px 11px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);text-align:left;cursor:pointer}.quick-grid button:hover:not(:disabled){border-color:rgba(242,101,34,.45);background:rgba(242,101,34,.09)}.quick-grid button>svg{color:var(--orange)}.quick-grid button span{display:grid}.quick-grid strong{font-size:10px}.quick-grid small{margin-top:3px;color:var(--muted);font-size:8px}.quick-grid button:disabled{opacity:.42;cursor:not-allowed}.action-feedback{display:flex;align-items:center;gap:7px;margin:0 10px 10px;padding:7px 9px;border:1px solid var(--line);border-radius:7px;color:var(--muted);font-size:9px}.action-feedback.loading svg{animation:spin 1s linear infinite}.action-feedback.error{color:var(--danger)}@keyframes spin{to{transform:rotate(360deg)}}
    .floor-overlays{position:absolute;inset:0;pointer-events:none}.zone-overlay{position:absolute;z-index:2;display:grid;gap:4px;padding:6px 8px;border:1px solid rgba(66,185,232,.3);border-radius:7px;background:rgba(4,17,24,.86);box-shadow:0 5px 18px rgba(0,0,0,.28);backdrop-filter:blur(7px)}.zone-overlay.is-active{border-color:rgba(34,217,139,.48);box-shadow:0 0 16px rgba(34,217,139,.1)}.zone-overlay>strong{overflow:hidden;color:#edf6f7;font-size:9px;line-height:1.2;text-overflow:ellipsis;white-space:nowrap}.overlay-metrics{display:flex;flex-wrap:wrap;gap:3px 7px}.overlay-metrics span{display:inline-flex;align-items:center;gap:3px;color:#a9bec5;font-size:8px;white-space:nowrap}.overlay-metrics svg{color:var(--cyan)}.zone-overlay.is-active .overlay-metrics span:first-child svg{color:var(--green)}:host([data-theme=light]) .zone-overlay{background:rgba(247,251,251,.9)}:host([data-theme=light]) .zone-overlay>strong{color:#14232a}
    @media(max-width:1180px){.bms-shell{grid-template:64px 1fr/70px 1fr}.topbar{padding:0 14px}.brand-mark{min-width:auto}.brand-mark div,.title-block p,.weather-chip span:not(:first-child){display:none}.title-block{padding-left:14px}.sidebar{top:64px;height:calc(100dvh - 64px);padding:10px 7px}.sidebar nav button{justify-content:center;padding:0}.sidebar nav button span,.operator div{display:none}.operator{justify-content:center;padding:10px 0}.dashboard-grid{grid-template-columns:minmax(0,1.55fr) minmax(300px,1fr);padding:10px;gap:10px}.main-column,.side-column{gap:10px}.environment-grid{grid-template-columns:1fr 1fr}.environment-grid>div:nth-child(2){border-right:0}.environment-grid>div:nth-child(-n+2){border-bottom:1px solid var(--line)}.zone-overlay{padding:5px 6px}.zone-overlay>strong{font-size:8px}.overlay-metrics span{font-size:7px}}
    @media(max-width:820px){.bms-shell{display:block}.topbar{position:sticky;height:64px}.menu-button{display:grid;place-items:center}.brand-mark{display:none}.title-block{border-left:0;padding-left:0}.title-block h1{font-size:19px}.header-status .weather-chip,.mode-chip{display:none}.clock{border-right:0;padding-right:0}.sidebar{display:none}.dashboard-grid{display:flex;flex-direction:column;padding:8px}.main-column,.side-column{display:contents}.floor-card{order:1}.circuits-card{order:2}.alerts-card{order:3}#environment{order:4}#consumption{order:5}.quick-card{order:6}.floor-viewport{height:48vh;min-height:300px}.floor-selector button{padding:0 9px}.circuit-header{display:none}.circuit-row{grid-template-columns:minmax(120px,1.35fr) minmax(82px,.9fr) minmax(85px,.8fr) 55px;min-height:50px}.circuit-row>[role=cell]:nth-child(4){display:none}.panel{border-radius:10px}}
    @media(max-width:520px){.topbar{gap:10px}.clock strong{font-size:17px}.clock span{display:none}.floor-viewport{height:42vh;min-height:250px;padding:5px}.panel-head{padding:7px 10px}.panel-title h2{font-size:11px}.floor-selector button{font-size:9px}.circuit-table{padding:3px 8px 7px}.circuit-row{grid-template-columns:minmax(105px,1.2fr) minmax(80px,.9fr) 68px 44px;gap:4px}.circuit-row>[role=cell]:nth-child(3){font-size:9px}.zone-name{gap:5px}.zone-name svg{display:none}.environment-grid{grid-template-columns:1fr 1fr}.quick-grid{grid-template-columns:1fr}.floor-caption{left:8px;bottom:8px}.compass{right:8px;top:8px}.side-card .panel-title h2{font-size:10px}.zone-overlay{width:auto!important;max-width:34%;padding:4px}.zone-overlay>strong{font-size:7px}.overlay-metrics{gap:2px 5px}.overlay-metrics span{font-size:6px}.overlay-metrics svg{display:none}}
    @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
    .trend{display:grid;margin-left:auto;color:var(--muted);font-size:14px;text-align:right}.trend.good{color:var(--green)}.trend.bad{color:var(--danger)}.trend small{color:var(--muted);font-size:7px;font-weight:500}.history-bars{height:69px;display:flex;align-items:flex-end;gap:3px;margin:0 14px 12px;padding:4px 0 18px;border-bottom:1px solid var(--line)}.history-bars i{flex:1;min-width:2px;max-width:18px;background:var(--orange);box-shadow:0 0 7px rgba(242,101,34,.22)}
    .circuits-card{min-height:304px}.circuit-table{min-height:256px}
    @media(max-width:820px){.circuits-card{min-height:308px}.circuit-table{min-height:260px}}
  `;
}

if (!customElements.get("witmind-building-panel")) customElements.define("witmind-building-panel", WitmindBuildingPanel);

export { WitmindBuildingPanel };
