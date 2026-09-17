export type SignatureView =
  | "home"
  | "lights"
  | "climate"
  | "energy"
  | "media"
  | "scenes"
  | "diagnostics";

export interface LightEntityInfo {
  id: string;
  name: string;
  state: "on" | "off" | "unavailable";
  brightness?: number; // 0-255
  colorTemp?: number;
  area: string;
}

export interface SceneInfo {
  id: string;
  name: string;
  icon: string;
  area: string;
  active?: boolean;
}

export interface MediaStateInfo {
  id: string;
  title: string;
  artist: string;
  source: string;
  state: "playing" | "paused" | "idle" | "off";
  volume: number; // 0-1
  isMuted: boolean;
  mediaImage?: string;
}

export interface EnergyMetrics {
  currentPower: number; // Watts
  dailyConsumption: number; // kWh
  monthlyConsumption: number; // kWh
  solarProduction: number; // Watts
  batteryLevel: number; // %
  gridStatus: "importing" | "exporting" | "neutral";
}
