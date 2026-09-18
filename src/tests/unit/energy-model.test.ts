import { describe, expect, it } from "vitest";
import { buildDimmingCurve, buildEnergyReport, normalizeHistoryResponse, type EnergyCircuit } from "../../energy-model.js";

const circuits: EnergyCircuit[] = [
  { entity: "switch.a", name: "A", zone: "one", zoneLabel: "Uno", watts: 100 },
  { entity: "switch.b", name: "B", zone: "two", zoneLabel: "Dos", watts: null },
];

describe("energy model", () => {
  it("normalizes compact and full Home Assistant history", () => {
    const normalized = normalizeHistoryResponse({
      "switch.a": [
        { state: "off", last_changed: "2026-09-18T00:00:00Z" },
        { s: "on", lu: Date.parse("2026-09-18T01:00:00Z") / 1000 },
      ],
    });
    expect(normalized["switch.a"].map((point) => point.state)).toEqual(["off", "on"]);
  });

  it("splits on-time and energy across hourly buckets", () => {
    const start = Date.parse("2026-09-18T00:00:00Z");
    const report = buildEnergyReport(circuits, {
      "switch.a": [
        { state: "off", timestamp: start },
        { state: "on", timestamp: start + 30 * 60_000 },
        { state: "off", timestamp: start + 90 * 60_000 },
      ],
      "switch.b": [{ state: "on", timestamp: start }],
    }, start, start + 2 * 3_600_000, 3_600_000);

    expect(report.circuits[0].bucketHours).toEqual([0.5, 0.5]);
    expect(report.circuits[0].kwh).toBeCloseTo(0.1);
    expect(report.circuits[1].hours).toBeCloseTo(2);
    expect(report.circuits[1].kwh).toBeNull();
    expect(report.totalKwh).toBeCloseTo(0.1);
    expect(report.knownCircuits).toBe(1);
  });

  it("calculates dimming savings from 10 to 90 percent", () => {
    const curve = buildDimmingCurve(10);
    expect(curve).toHaveLength(9);
    expect(curve[0]).toEqual({ percent: 10, savedKwh: 1, remainingKwh: 9 });
    expect(curve[8]).toEqual({ percent: 90, savedKwh: 9, remainingKwh: 1 });
  });
});
