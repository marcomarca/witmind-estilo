import { describe, expect, it } from "vitest";
import { BUILDING_ENTITIES, BUILDING_ENTITY_IDS, BUILDING_ZONES, BUILDING_ZONE_OVERLAYS, normalizePowerToWatts } from "../../building-config.js";

describe("building configuration", () => {
  it("keeps exactly the two master-plan floors", () => {
    expect([...new Set(BUILDING_ZONES.map((zone) => zone.floor))].sort()).toEqual(["ground", "upper"]);
  });

  it("keeps zone and subscribed entity identifiers unique", () => {
    const zoneIds = BUILDING_ZONES.map((zone) => zone.id);
    expect(new Set(zoneIds).size).toBe(zoneIds.length);
    expect(new Set(BUILDING_ENTITY_IDS).size).toBe(BUILDING_ENTITY_IDS.length);
  });

  it("uses the documented exterior weather source", () => {
    expect(BUILDING_ENTITIES.weather).toBe("weather.forecast_casa");
  });

  it("normalizes physical power measurements to watts", () => {
    expect(normalizePowerToWatts(1.0817, "kW")).toBeCloseTo(1081.7);
    expect(normalizePowerToWatts(135, "W")).toBe(135);
    expect(normalizePowerToWatts(2, "kWh")).toBeNull();
  });

  it("maps the real ground-floor meters and deterministic profiles", () => {
    const showroom = BUILDING_ZONES.find((zone) => zone.id === "ground.showroom");
    const lobby = BUILDING_ZONES.find((zone) => zone.id === "ground.lobby");
    const recording = BUILDING_ZONES.find((zone) => zone.id === "ground.grabacion");
    expect(showroom?.power).toBe("sensor.showroom_potencia_activa");
    expect(showroom?.action?.serviceEntity).toBe("scene.reunion");
    expect(showroom?.action?.onEntities).toHaveLength(2);
    expect(showroom?.action?.offEntities).toHaveLength(8);
    expect(lobby?.power).toBe("sensor.sensor_de_potencia_showroom_p");
    expect(lobby?.action?.onEntities).toHaveLength(4);
    expect(recording?.action?.onEntities).toHaveLength(4);
  });

  it("keeps both real environment sensors on their documented zones", () => {
    const witronixAdmin = BUILDING_ZONES.find((zone) => zone.id === "ground.witronix_admin");
    const officeLarge = BUILDING_ZONES.find((zone) => zone.id === "upper.office_large");
    expect([witronixAdmin?.temperature, witronixAdmin?.humidity]).toEqual([
      "sensor.t_h_sensor_temperature",
      "sensor.t_h_sensor_humidity",
    ]);
    expect([officeLarge?.temperature, officeLarge?.humidity]).toEqual([
      "sensor.t_h_sensor_2_temperature",
      "sensor.t_h_sensor_2_humidity",
    ]);
    expect(BUILDING_ZONE_OVERLAYS.ground.some((overlay) => overlay.zoneId === witronixAdmin?.id)).toBe(true);
    expect(BUILDING_ZONE_OVERLAYS.upper.some((overlay) => overlay.zoneId === officeLarge?.id)).toBe(true);
  });
});
