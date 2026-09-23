import { describe, it, expect, beforeEach } from "vitest";
import {
  createInitialLayoutStore,
  sanitizeTransform,
  sanitizeOverlay,
  loadBuildingLayout,
  saveBuildingLayout,
  resetFloorLayout,
} from "../../building-layout-store.js";

// Ensure localStorage mock is present in headless test environments
if (typeof globalThis.localStorage === "undefined") {
  const memStore = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (k: string) => memStore.get(k) ?? null,
    setItem: (k: string, v: string) => { memStore.set(k, String(v)); },
    removeItem: (k: string) => { memStore.delete(k); },
    clear: () => { memStore.clear(); },
    key: (i: number) => Array.from(memStore.keys())[i] ?? null,
    get length() { return memStore.size; },
  } as any;
}

describe("Building Layout Customizer Store", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("creates initial store with all default zones and zero transform", () => {
    const store = createInitialLayoutStore();
    expect(store.ground.image).toEqual({ x: 0, y: 0, scale: 1 });
    expect(store.upper.image).toEqual({ x: 0, y: 0, scale: 1 });

    // Ground has 4 default zones
    expect(Object.keys(store.ground.overlays)).toContain("ground.showroom");
    expect(Object.keys(store.ground.overlays)).toContain("ground.lobby");
    expect(Object.keys(store.ground.overlays)).toContain("ground.grabacion");
    expect(Object.keys(store.ground.overlays)).toContain("ground.witronix_admin");

    // Upper has 5 default zones
    expect(Object.keys(store.upper.overlays)).toContain("upper.witronix");
    expect(Object.keys(store.upper.overlays)).toContain("upper.mindtec");
    expect(Object.keys(store.upper.overlays)).toContain("upper.office_large");
    expect(Object.keys(store.upper.overlays)).toContain("upper.sala_multiuso");
    expect(Object.keys(store.upper.overlays)).toContain("upper.taller");
  });

  it("clamps image transform within realistic boundaries", () => {
    const clampedUnder = sanitizeTransform({ x: -100, y: -90, scale: 0.2 });
    expect(clampedUnder.x).toBe(-40);
    expect(clampedUnder.y).toBe(-40);
    expect(clampedUnder.scale).toBe(0.6);

    const clampedOver = sanitizeTransform({ x: 100, y: 80, scale: 5 });
    expect(clampedOver.x).toBe(40);
    expect(clampedOver.y).toBe(40);
    expect(clampedOver.scale).toBe(2.0);
  });

  it("clamps overlay percentages within bounds to prevent falling outside viewport", () => {
    const overlay = sanitizeOverlay("ground.showroom", { left: 95, top: -10, width: 22 }, 22);
    // left cannot exceed 100 - width = 78
    expect(overlay.left).toBe(78);
    expect(overlay.top).toBe(0);
    expect(overlay.width).toBe(22);
  });

  it("saves, loads and resets floor layouts reliably in localStorage", () => {
    const store = createInitialLayoutStore();
    store.ground.image = { x: 5, y: -2, scale: 1.1 };
    store.ground.overlays["ground.showroom"] = {
      zoneId: "ground.showroom",
      left: 15,
      top: 55,
      width: 22,
    };

    saveBuildingLayout(store);

    const loaded = loadBuildingLayout();
    expect(loaded.ground.image).toEqual({ x: 5, y: -2, scale: 1.1 });
    expect(loaded.ground.overlays["ground.showroom"].left).toBe(15);
    expect(loaded.ground.overlays["ground.showroom"].top).toBe(55);

    // Reset ground floor
    const reset = resetFloorLayout(loaded, "ground");
    expect(reset.ground.image).toEqual({ x: 0, y: 0, scale: 1 });
    expect(reset.ground.overlays["ground.showroom"].left).toBe(8); // Default left for showroom
  });
});
