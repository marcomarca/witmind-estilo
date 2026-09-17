import type { EChartsOption } from "echarts";

export interface EnergyBarDataPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface EnergyBarsOptions {
  data: EnergyBarDataPoint[];
  currentIndex?: number;
  unit?: string;
  theme?: "dark" | "light";
}

export function buildEnergyBarsOption(options: EnergyBarsOptions): EChartsOption {
  const {
    data,
    currentIndex = data.length - 1,
    unit = "kWh",
    theme = "dark"
  } = options;

  const isLight = theme === "light";
  const defaultBarColor = isLight ? "rgba(18, 32, 38, 0.14)" : "rgba(255, 255, 255, 0.12)";
  const activeBarColor = "#f26522";
  const labelColor = isLight ? "#92999c" : "#747e82";

  const categories = data.map((d) => d.label);
  const values = data.map((d, index) => {
    const isActive = index === currentIndex;
    return {
      value: d.value,
      itemStyle: {
        color: isActive ? activeBarColor : defaultBarColor,
        borderRadius: [4, 4, 0, 0],
        shadowBlur: isActive ? 8 : 0,
        shadowColor: isActive ? "rgba(242, 101, 34, 0.4)" : "transparent"
      }
    };
  });

  return {
    backgroundColor: "transparent",
    grid: {
      top: 10,
      bottom: 24,
      left: 10,
      right: 10,
      containLabel: false
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        const item = params[0];
        if (!item) return "";
        return `<div style="font-weight:600;margin-bottom:2px;">${item.name}</div><div>Consumo: <strong>${item.value} ${unit}</strong></div>`;
      }
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: labelColor,
        fontSize: 10,
        fontFamily: "Manrope, system-ui, sans-serif"
      }
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        type: "bar",
        data: values,
        barMaxWidth: 16,
        barMinWidth: 6,
        animationDuration: 500
      }
    ]
  };
}
