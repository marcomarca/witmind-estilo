export type WitmindEntity = {
  entity_id: string;
  state: string;
  attributes?: Record<string, unknown>;
  [key: string]: unknown;
};

export type WitmindEntityListener = (states: Record<string, WitmindEntity>) => void;

export interface WitmindHaClient {
  subscribeEntities(entityIds: string[], listener: WitmindEntityListener): () => void;
  getEntity(entityId: string): WitmindEntity | undefined;
  callService(service: string, serviceData?: Record<string, unknown>, target?: Record<string, unknown>): Promise<unknown>;
  toggleMenu(): void;
  dbRequest<T = unknown>(command: string, payload?: Record<string, unknown>): Promise<T>;
  haRequest<T = unknown>(command: string, payload?: Record<string, unknown>): Promise<T>;
  haSubscribe<T = unknown>(command: string, payload: Record<string, unknown>, listener: (event: T) => void): Promise<() => void>;
}

const nextId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export class PostMessageHaClient implements WitmindHaClient {
  private states = new Map<string, WitmindEntity>();
  private listeners = new Set<WitmindEntityListener>();
  private pending = new Map<string, { resolve: (value: unknown) => void; reject: (error: Error) => void; timer: number; listener?: (event: unknown) => void }>();
  private subscriptions = new Map<string, (event: unknown) => void>();

  constructor(private readonly target: Window = window.parent) {
    window.addEventListener("message", (event) => this.onMessage(event));
    this.post({ type: "WITMIND_READY" });
  }

  subscribeEntities(entityIds: string[], listener: WitmindEntityListener) {
    this.listeners.add(listener);
    this.post({ type: "WITMIND_SUBSCRIBE_ENTITIES", entityIds: [...new Set(entityIds)] });
    listener(Object.fromEntries(this.states));
    return () => this.listeners.delete(listener);
  }
  getEntity(entityId: string) { return this.states.get(entityId); }
  callService(service: string, serviceData = {}, target?: Record<string, unknown>) {
    return this.request("WITMIND_CALL_SERVICE", "WITMIND_SERVICE_RESULT", { service, serviceData, target });
  }
  toggleMenu() { this.post({ type: "WITMIND_TOGGLE_MENU" }); }
  dbRequest<T>(command: string, payload = {}) { return this.request<T>("WITMIND_DB_REQUEST", "WITMIND_DB_RESULT", { command, payload }); }
  haRequest<T>(command: string, payload = {}) { return this.request<T>("WITMIND_HA_COMMAND", "WITMIND_HA_RESULT", { command, payload }); }
  haSubscribe<T>(command: string, payload: Record<string, unknown>, listener: (event: T) => void) {
    const requestId = nextId();
    const unsubscribe = () => {
      this.subscriptions.delete(requestId);
      this.post({ type: "WITMIND_HA_UNSUBSCRIBE", requestId });
    };
    return new Promise<() => void>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error("Timeout esperando suscripción HA"));
      }, 10000);
      this.pending.set(requestId, {
        resolve: () => { window.clearTimeout(timer); resolve(unsubscribe); },
        reject,
        timer,
      });
      this.subscriptions.set(requestId, listener as (event: unknown) => void);
      this.post({ type: "WITMIND_HA_SUBSCRIBE", requestId, command, payload });
    });
  }

  private post(message: Record<string, unknown>) { this.target.postMessage({ protocol: 1, source: "witmind-ui", ...message }, "*"); }
  private request<T>(type: string, responseType: string, payload: Record<string, unknown>) {
    const requestId = nextId();
    return new Promise<T>((resolve, reject) => {
      const timer = window.setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error(`Timeout esperando ${responseType}`));
      }, 10000);
      this.pending.set(requestId, { resolve: resolve as (value: unknown) => void, reject, timer });
      this.post({ type, requestId, ...payload });
    });
  }
  private onMessage(event: MessageEvent) {
    if (event.source !== this.target || event.data?.protocol !== 1 || event.data?.source !== "witmind-ha") return;
    const message = event.data;
    if (message.type === "WITMIND_HA_EVENT") {
      this.subscriptions.get(message.requestId)?.(message.result);
      return;
    }
    if (message.type === "WITMIND_ENTITY_UPDATE") {
      Object.entries(message.states || {}).forEach(([id, state]) => this.states.set(id, state as WitmindEntity));
      (message.removed || []).forEach((id: string) => this.states.delete(id));
      const snapshot = Object.fromEntries(this.states);
      this.listeners.forEach((listener) => listener(snapshot));
      return;
    }
    const pending = this.pending.get(message.requestId);
    if (!pending) return;
    this.pending.delete(message.requestId);
    window.clearTimeout(pending.timer);
    if (message.ok) pending.resolve(message.result);
    else pending.reject(new Error(String(message.error || "Witmind request failed")));
  }
}

export class MockHaClient implements WitmindHaClient {
  private listeners = new Set<WitmindEntityListener>();
  constructor(private states: Record<string, WitmindEntity> = {}) {}
  subscribeEntities(_entityIds: string[], listener: WitmindEntityListener) { this.listeners.add(listener); listener(this.states); return () => this.listeners.delete(listener); }
  getEntity(entityId: string) { return this.states[entityId]; }
  async callService(_service: string, _serviceData = {}, _target?: Record<string, unknown>) { return { ok: true, mock: true }; }
  toggleMenu() {}
  async dbRequest<T = unknown>(_command: string, _payload = {}) { return {} as T; }
  async haRequest<T = unknown>(_command: string, _payload = {}) { return {} as T; }
  async haSubscribe<T = unknown>(_command: string, _payload: Record<string, unknown>, _listener: (event: T) => void) { return () => undefined; }
}
