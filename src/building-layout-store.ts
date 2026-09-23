import {
  type BuildingFloor,
  BUILDING_ZONE_OVERLAYS,
} from "./building-config.js";

export interface FloorImageTransform {
  x: number; // Porcentaje de desplazamiento horizontal (-40% a 40%)
  y: number; // Porcentaje de desplazamiento vertical (-40% a 40%)
  scale: number; // Factor de escala (0.6x a 2.0x, normal 1.0)
}

export interface ZoneOverlayPosition {
  zoneId: string;
  left: number; // Porcentaje relativo al plano (-40% a 130%)
  top: number; // Porcentaje relativo al plano (-25% a 120%)
  width: number; // Porcentaje de ancho (10% a 60%)
  scale?: number; // Factor de escala (0.7x a 1.4x)
}

export interface FloorCustomization {
  image: FloorImageTransform;
  overlays: Record<string, ZoneOverlayPosition>;
}

export interface BuildingLayoutStore {
  ground: FloorCustomization;
  upper: FloorCustomization;
}

export const STORAGE_KEY_LAYOUT = "witmind_building_layout_v2";

export const DEFAULT_TRANSFORM: FloorImageTransform = {
  x: 0,
  y: 0,
  scale: 1,
};

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getDefaultOverlaysMap(floor: BuildingFloor): Record<string, ZoneOverlayPosition> {
  const result: Record<string, ZoneOverlayPosition> = {};
  const defaults = BUILDING_ZONE_OVERLAYS[floor] || [];
  for (const item of defaults) {
    result[item.zoneId] = {
      zoneId: item.zoneId,
      left: item.left,
      top: item.top,
      width: item.width || 21,
      scale: 1,
    };
  }
  return result;
}

export function getDefaultFloorConfig(floor: BuildingFloor): FloorCustomization {
  return {
    image: { ...DEFAULT_TRANSFORM },
    overlays: getDefaultOverlaysMap(floor),
  };
}

export function createInitialLayoutStore(): BuildingLayoutStore {
  return {
    ground: getDefaultFloorConfig("ground"),
    upper: getDefaultFloorConfig("upper"),
  };
}

export function sanitizeTransform(input?: Partial<FloorImageTransform>): FloorImageTransform {
  if (!input || typeof input !== "object") return { ...DEFAULT_TRANSFORM };
  const x = typeof input.x === "number" && Number.isFinite(input.x) ? clamp(Math.round(input.x * 10) / 10, -40, 40) : 0;
  const y = typeof input.y === "number" && Number.isFinite(input.y) ? clamp(Math.round(input.y * 10) / 10, -40, 40) : 0;
  const scale = typeof input.scale === "number" && Number.isFinite(input.scale) ? clamp(Math.round(input.scale * 100) / 100, 0.6, 2.0) : 1;
  return { x, y, scale };
}

export function sanitizeOverlay(zoneId: string, input?: Partial<ZoneOverlayPosition>, defaultWidth: number = 21): ZoneOverlayPosition {
  const width = typeof input?.width === "number" && Number.isFinite(input.width)
    ? clamp(Math.round(input.width * 10) / 10, 10, 60)
    : defaultWidth;
  const scale = typeof input?.scale === "number" && Number.isFinite(input.scale)
    ? clamp(Math.round(input.scale * 100) / 100, 0.7, 1.4)
    : 1;
  // Permite libre movimiento de los popups fuera de los muros del edificio y en márgenes circundantes
  const left = typeof input?.left === "number" && Number.isFinite(input.left)
    ? clamp(Math.round(input.left * 10) / 10, -40, 130)
    : 10;
  const top = typeof input?.top === "number" && Number.isFinite(input.top)
    ? clamp(Math.round(input.top * 10) / 10, -25, 120)
    : 10;
  return { zoneId, left, top, width, scale };
}

export function loadBuildingLayout(): BuildingLayoutStore {
  const store = createInitialLayoutStore();
  if (typeof localStorage === "undefined") return store;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAYOUT);
    if (!raw) return store;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return store;

    for (const floor of ["ground", "upper"] as const) {
      const floorData = parsed[floor];
      if (floorData && typeof floorData === "object") {
        store[floor].image = sanitizeTransform(floorData.image);
        if (floorData.overlays && typeof floorData.overlays === "object") {
          const defaults = getDefaultOverlaysMap(floor);
          for (const [zoneId, overlayData] of Object.entries(floorData.overlays)) {
            const def = defaults[zoneId];
            store[floor].overlays[zoneId] = sanitizeOverlay(zoneId, overlayData as Partial<ZoneOverlayPosition>, def?.width || 21);
          }
        }
      }
    }
  } catch (err) {
    console.warn("No se pudieron cargar las personalizaciones del plano:", err);
  }

  return store;
}

export function saveBuildingLayout(store: BuildingLayoutStore): void {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_LAYOUT, JSON.stringify(store));
  } catch (err) {
    console.warn("No se pudo guardar la personalización del plano en localStorage:", err);
  }
}

export function resetFloorLayout(store: BuildingLayoutStore, floor: BuildingFloor): BuildingLayoutStore {
  const updated: BuildingLayoutStore = {
    ...store,
    [floor]: getDefaultFloorConfig(floor),
  };
  saveBuildingLayout(updated);
  return updated;
}
