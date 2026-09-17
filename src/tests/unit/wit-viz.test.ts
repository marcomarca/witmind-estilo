import { describe, it, expect } from "vitest";
import { buildGaugeOption } from "../../visualization/presets/gauge.js";
import { buildSparklineOption } from "../../visualization/presets/sparkline.js";
import { buildEnergyBarsOption } from "../../visualization/presets/energy-bars.js";
import { buildAreaTrendOption } from "../../visualization/presets/area-trend.js";

describe("WitViz Presets Builder", () => {
  it("builds architectural semicircular gauge with correct angles and thresholds", () => {
    const opt: any = buildGaugeOption({
      value: 42,
      valueLabel: "42%",
      secondaryLabel: "432 W"
    });

    expect(opt.series).toBeDefined();
    const series = opt.series[0];
    expect(series.type).toBe("gauge");
    expect(series.startAngle).toBe(210);
    expect(series.endAngle).toBe(-30);
    expect(series.progress.roundCap).toBe(true);
    expect(series.pointer.show).toBe(false);
    expect(series.data[0].value).toBe(42);
    expect(series.data[0].name).toBe("432 W");
  });

  it("builds minimal contextual sparkline without noisy axes", () => {
    const opt: any = buildSparklineOption({
      data: [100, 200, 300, 400]
    });

    expect(opt.xAxis.show).toBe(false);
    expect(opt.yAxis.show).toBe(false);
    expect(opt.series[0].type).toBe("line");
    expect(opt.series[0].symbol).toBe("none");
  });

  it("builds comparative energy bars with highlighted active index", () => {
    const data = [
      { label: "Lun", value: 12 },
      { label: "Mar", value: 15 },
      { label: "Mié", value: 18 }
    ];
    const opt: any = buildEnergyBarsOption({
      data,
      currentIndex: 2
    });

    expect(opt.xAxis.data).toEqual(["Lun", "Mar", "Mié"]);
    expect(opt.series[0].data[2].itemStyle.color).toBe("#f26522");
  });

  it("builds multi-series area trend", () => {
    const opt: any = buildAreaTrendOption({
      categories: ["00h", "12h"],
      series: [
        { name: "Solar", data: [0, 3000] },
        { name: "Red", data: [500, 200] }
      ]
    });

    expect(opt.series.length).toBe(2);
    expect(opt.series[0].name).toBe("Solar");
    expect(opt.series[1].name).toBe("Red");
  });
});
