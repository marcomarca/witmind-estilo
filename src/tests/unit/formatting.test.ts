import { describe, it, expect } from "vitest";

export function formatPower(watts: number): string {
  if (watts >= 1000) {
    return `${(watts / 1000).toFixed(2)} kW`;
  }
  return `${Math.round(watts)} W`;
}

export function formatEnergy(kwh: number): string {
  return `${kwh.toFixed(2)} kWh`;
}

export function calculateLoadPercent(watts: number, maxWatts: number = 5500): number {
  if (maxWatts <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((watts / maxWatts) * 100)));
}

describe("Formatting & Unit Normalization", () => {
  it("formats power in Watts and kW accurately", () => {
    expect(formatPower(432)).toBe("432 W");
    expect(formatPower(3420)).toBe("3.42 kW");
    expect(formatPower(0)).toBe("0 W");
  });

  it("formats energy in kWh", () => {
    expect(formatEnergy(26.112)).toBe("26.11 kWh");
  });

  it("calculates electrical load percentages correctly", () => {
    expect(calculateLoadPercent(2750, 5500)).toBe(50);
    expect(calculateLoadPercent(5500, 5500)).toBe(100);
    expect(calculateLoadPercent(6000, 5500)).toBe(100);
  });
});
