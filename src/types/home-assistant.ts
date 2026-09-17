export interface HassEntityAttributeBase {
  friendly_name?: string;
  unit_of_measurement?: string;
  icon?: string;
  entity_picture?: string;
  supported_features?: number;
  hidden?: boolean;
  assumed_state?: boolean;
  device_class?: string;
  state_class?: string;
  restored?: boolean;
}

export interface HassEntityBase {
  entity_id: string;
  state: string;
  last_changed: string;
  last_updated: string;
  attributes: HassEntityAttributeBase & Record<string, any>;
  context: {
    id: string;
    parent_id?: string | null;
    user_id?: string | null;
  };
}

export type HassEntities = Record<string, HassEntityBase>;

export interface HomeAssistant {
  states: HassEntities;
  language: string;
  selectedTheme?: string | null;
  themes?: Record<string, any>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, any>,
    target?: Record<string, any>
  ) => Promise<any>;
  callWS: <T>(msg: Record<string, any>) => Promise<T>;
  connection?: {
    subscribeEvents: (callback: (event: any) => void, eventType?: string) => Promise<() => void>;
    sendMessagePromise: (msg: Record<string, any>) => Promise<any>;
  };
}
