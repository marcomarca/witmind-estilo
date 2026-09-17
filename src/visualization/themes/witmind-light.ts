export const witmindLightTheme = {
  color: [
    "#f26522", // Witmind Orange primary
    "#0284c7", // Sky blue secondary
    "#059669", // Emerald
    "#d97706", // Amber
    "#7c3aed", // Purple
    "#db2777"  // Pink
  ],
  backgroundColor: "transparent",
  textStyle: {
    fontFamily: "Manrope, system-ui, sans-serif",
    color: "#667176"
  },
  title: {
    textStyle: {
      color: "#182126",
      fontWeight: 600
    },
    subtextStyle: {
      color: "#92999c"
    }
  },
  grid: {
    top: 16,
    right: 16,
    bottom: 24,
    left: 40,
    containLabel: true,
    borderColor: "rgba(18, 32, 38, 0.05)"
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(18, 32, 38, 0.08)"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#92999c",
      fontFamily: "Manrope, system-ui, sans-serif",
      fontSize: 11
    },
    splitLine: {
      show: false
    }
  },
  valueAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#92999c",
      fontFamily: "Manrope, system-ui, sans-serif",
      fontSize: 11
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(18, 32, 38, 0.06)",
        type: "dashed"
      }
    }
  },
  tooltip: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderColor: "rgba(18, 32, 38, 0.10)",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: "#182126",
      fontFamily: "Manrope, system-ui, sans-serif",
      fontSize: 12
    },
    extraCssText: "box-shadow: 0 8px 24px rgba(18,32,38,0.12); border-radius: 10px; backdrop-filter: blur(12px);"
  }
};
