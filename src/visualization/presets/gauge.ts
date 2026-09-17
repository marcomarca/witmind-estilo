import type { EChartsOption } from "echarts";

export interface GaugeOptions {
  value: number; // 0 to 100
  min?: number;
  max?: number;
  valueLabel?: string;
  secondaryLabel?: string;
  theme?: "dark" | "light";
  color?: string;
}

export function buildGaugeOption(options: GaugeOptions): EChartsOption {
  const {
    value,
    min = 0,
    max = 100,
    valueLabel = `${Math.round(value)}%`,
    secondaryLabel = "",
    theme = "dark",
    color
  } = options;

  // Determine threshold color if not explicitly provided
  let progressColor = color;
  if (!progressColor) {
    if (value >= 85) {
      progressColor = "#ef4444"; // Danger
    } else if (value >= 60) {
      progressColor = "#f59e0b"; // Warning
    } else {
      progressColor = "#f26522"; // Witmind Accent
    }
  }

  const isLight = theme === "light";
  const trackColor = isLight ? "rgba(18, 32, 38, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const primaryTextColor = isLight ? "#182126" : "#f5f6f4";
  const secondaryTextColor = isLight ? "#667176" : "#adb4b6";

  return {
    backgroundColor: "transparent",
    animationDuration: 600,
    animationEasing: "cubicOut",
    series: [
      {
        type: "gauge",
        startAngle: 210,
        endAngle: -30,
        min,
        max,
        radius: "95%",
        center: ["50%", "58%"],
        progress: {
          show: true,
          roundCap: true,
          width: 8,
          itemStyle: {
            color: progressColor,
            shadowBlur: 10,
            shadowColor: `${progressColor}44`
          }
        },
        pointer: {
          show: false
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 8,
            color: [[1, trackColor]]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: Boolean(secondaryLabel),
          offsetCenter: [0, "32%"],
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "Manrope, system-ui, sans-serif",
          color: secondaryTextColor
        },
        detail: {
          show: true,
          offsetCenter: [0, "-6%"],
          valueAnimation: true,
          formatter: () => valueLabel,
          fontSize: 32,
          fontWeight: 600,
          fontFamily: "Manrope, system-ui, sans-serif",
          color: primaryTextColor
        },
        data: [
          {
            value,
            name: secondaryLabel
          }
        ]
      }
    ]
  };
}
