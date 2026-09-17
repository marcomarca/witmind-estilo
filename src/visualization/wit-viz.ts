import * as echarts from "echarts";
import { witmindDarkTheme } from "./themes/witmind-dark.js";
import { witmindLightTheme } from "./themes/witmind-light.js";
import { buildGaugeOption, type GaugeOptions } from "./presets/gauge.js";
import { buildSparklineOption, type SparklineOptions } from "./presets/sparkline.js";
import { buildEnergyBarsOption, type EnergyBarsOptions } from "./presets/energy-bars.js";
import { buildAreaTrendOption, type AreaTrendOptions } from "./presets/area-trend.js";

// Register custom themes
let themesRegistered = false;
export function registerWitThemes() {
  if (themesRegistered) return;
  echarts.registerTheme("witmind-dark", witmindDarkTheme);
  echarts.registerTheme("witmind-light", witmindLightTheme);
  themesRegistered = true;
}

// Chart instance tracking & automated resize observation
const chartInstances = new WeakMap<HTMLElement, echarts.ECharts>();
const resizeObservers = new WeakMap<HTMLElement, ResizeObserver>();

export class WitViz {
  private static ensureThemeRegistered() {
    registerWitThemes();
  }

  public static getOrCreateInstance(
    element: HTMLElement,
    theme: "dark" | "light" = "dark"
  ): echarts.ECharts {
    this.ensureThemeRegistered();

    let chart = chartInstances.get(element);
    const themeName = theme === "light" ? "witmind-light" : "witmind-dark";

    if (chart) {
      // If chart exists, check if theme changed
      // ECharts does not support runtime theme switching on the same instance without re-init
      // so if the theme attribute changed we recreate cleanly
      return chart;
    }

    chart = echarts.init(element, themeName, {
      renderer: "svg"
    });
    chartInstances.set(element, chart);

    // Attach ResizeObserver to container
    if (!resizeObservers.has(element)) {
      const observer = new ResizeObserver(() => {
        chart?.resize();
      });
      observer.observe(element);
      resizeObservers.set(element, observer);
    }

    return chart;
  }

  public static gauge(element: HTMLElement, options: GaugeOptions): echarts.ECharts {
    const theme = options.theme || "dark";
    const chart = this.getOrCreateInstance(element, theme);
    const option = buildGaugeOption(options);
    chart.setOption(option, true);
    return chart;
  }

  public static sparkline(element: HTMLElement, options: SparklineOptions): echarts.ECharts {
    const chart = this.getOrCreateInstance(element);
    const option = buildSparklineOption(options);
    chart.setOption(option, true);
    return chart;
  }

  public static energyBars(element: HTMLElement, options: EnergyBarsOptions): echarts.ECharts {
    const theme = options.theme || "dark";
    const chart = this.getOrCreateInstance(element, theme);
    const option = buildEnergyBarsOption(options);
    chart.setOption(option, true);
    return chart;
  }

  public static areaTrend(element: HTMLElement, options: AreaTrendOptions): echarts.ECharts {
    const theme = options.theme || "dark";
    const chart = this.getOrCreateInstance(element, theme);
    const option = buildAreaTrendOption(options);
    chart.setOption(option, true);
    return chart;
  }

  public static resize(element: HTMLElement) {
    const chart = chartInstances.get(element);
    chart?.resize();
  }

  public static dispose(element: HTMLElement) {
    const observer = resizeObservers.get(element);
    if (observer) {
      observer.disconnect();
      resizeObservers.delete(element);
    }

    const chart = chartInstances.get(element);
    if (chart) {
      chart.dispose();
      chartInstances.delete(element);
    }
  }
}
