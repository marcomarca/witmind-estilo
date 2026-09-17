import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { HomeAssistant, HassEntityBase } from "../types/home-assistant.js";

export class HassController implements ReactiveController {
  private _host: ReactiveControllerHost;
  private _hass?: HomeAssistant;

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    // Initial connection hook
  }

  hostDisconnected() {
    // Cleanup hook
  }

  public setHass(hass: HomeAssistant) {
    this._hass = hass;
    this._host.requestUpdate();
  }

  public getHass(): HomeAssistant | undefined {
    return this._hass;
  }

  public getEntity(entityId: string): HassEntityBase | undefined {
    return this._hass?.states[entityId];
  }

  public getState(entityId: string): string {
    return this._hass?.states[entityId]?.state ?? "unavailable";
  }

  public getAttribute<T = any>(entityId: string, attr: string, fallback?: T): T {
    return (this._hass?.states[entityId]?.attributes?.[attr] as T) ?? (fallback as T);
  }

  public async callService(
    domain: string,
    service: string,
    serviceData?: Record<string, any>
  ): Promise<boolean> {
    if (!this._hass) return false;
    try {
      await this._hass.callService(domain, service, serviceData);
      return true;
    } catch (e) {
      console.error(`[Witmind] Failed calling ${domain}.${service}`, e);
      return false;
    }
  }

  public async toggleEntity(entityId: string): Promise<boolean> {
    const domain = entityId.split(".")[0];
    return this.callService(domain, "toggle", { entity_id: entityId });
  }
}
