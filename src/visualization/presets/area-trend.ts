import type { EChartsOption } from "echarts";
import * as echarts from "echarts";

export interface AreaTrendSeries {
  name: string;
  data: number[];
  color?: string;
  areaGradient?: boolean;
}

export interface AreaTrendOptions {
  categories: string[];
  series: AreaTrendSeries[];
  unit?: string;
  theme?: "dark" | "light";
}

export function buildAreaTrendOption(options: AreaTrendOptions): EChartsOption {
  const {
    categories,
    series,
    unit = "W",
    theme = "dark"
  } = options;

  const isLight = theme === "light";
  const defaultColors = ["#f26522", "#0ea5e9", "#10b981", "#f59e0b"];

  const echartsSeries = series.map((s, idx) => {
    const col = s.color || defaultColors[idx % defaultColors.length];
    return {
      name: s.name,
      type: "line" as const,
      smooth: true,
      showSymbol: false,
      symbolSize: 6,
      lineStyle: {
        width: 2.2,
        color: col
      },
      itemStyle: {
        color: col
      },
      areaStyle: s.areaGradient !== false ? {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: `${col}35` },
          { offset: 1, color: `${col}02` }
        ])
      } : undefined,
      data: s.data
    };
  });

  return {
    backgroundColor: "transparent",
    legend: {
      show: series.length > 1,
      top: 0,
      right: 12,
      textStyle: {
        color: isLight ? "#667176" : "#adb4b6",
        fontSize: 11,
        fontFamily: "Manrope, system-ui, sans-serif"
      },
      icon: "roundRect",
      itemWidth: 12,
      itemHeight: 6
    },
    grid: {
      top: series.length > 1 ? 32 : 16,
      bottom: 24,
      left: 36,
      right: 16,
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      valueFormatter: (val: any) => `${val} ${unit}`
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: categories,
      axisLine: {
        lineStyle: {
          color: isLight ? "rgba(18, 32, 38, 0.08)" : "rgba(255, 255, 255, 0.08)"
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: isLight ? "#92999c" : "#747e82",
        fontSize: 10,
        fontFamily: "Manrope, system-ui, sans-serif"
      }
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: isLight ? "#92999c" : "#747e82",
        fontSize: 10,
        fontFamily: "Manrope, system-ui, sans-serif",
        formatter: `{value}`
      },
      splitLine: {
        lineStyle: {
          color: isLight ? "rgba(18, 32, 38, 0.05)" : "rgba(255, 255, 255, 0.05)",
          type: "dashed"
        }
      }
    },
    series: echartsSeries
  };
}
