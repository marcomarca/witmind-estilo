import type { EChartsOption } from "echarts";
import * as echarts from "echarts";

export interface SparklineOptions {
  data: number[];
  tone?: "accent" | "success" | "warning" | "danger" | "sky";
  smooth?: boolean;
  showPeak?: boolean;
}

export function buildSparklineOption(options: SparklineOptions): EChartsOption {
  const {
    data,
    tone = "accent",
    smooth = true
  } = options;

  let baseColor = "#f26522"; // default accent
  if (tone === "success") baseColor = "#10b981";
  else if (tone === "warning") baseColor = "#f59e0b";
  else if (tone === "danger") baseColor = "#ef4444";
  else if (tone === "sky") baseColor = "#0ea5e9";

  return {
    backgroundColor: "transparent",
    grid: {
      top: 4,
      bottom: 4,
      left: 2,
      right: 2,
      containLabel: false
    },
    xAxis: {
      type: "category",
      show: false,
      boundaryGap: false
    },
    yAxis: {
      type: "value",
      show: false,
      min: (value) => Math.floor(value.min * 0.95),
      max: (value) => Math.ceil(value.max * 1.05)
    },
    series: [
      {
        data,
        type: "line",
        smooth,
        symbol: "none",
        lineStyle: {
          color: baseColor,
          width: 2.2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: `${baseColor}40` },
            { offset: 1, color: `${baseColor}02` }
          ])
        },
        animationDuration: 500
      }
    ]
  };
}
