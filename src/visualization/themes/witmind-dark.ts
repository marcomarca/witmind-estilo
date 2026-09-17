export const witmindDarkTheme = {
  color: [
    "#f26522", // Witmind Orange primary
    "#0ea5e9", // Sky blue secondary
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#8b5cf6", // Purple
    "#ec4899"  // Pink
  ],
  backgroundColor: "transparent",
  textStyle: {
    fontFamily: "Manrope, system-ui, sans-serif",
    color: "#adb4b6"
  },
  title: {
    textStyle: {
      color: "#f5f6f4",
      fontWeight: 600
    },
    subtextStyle: {
      color: "#747e82"
    }
  },
  grid: {
    top: 16,
    right: 16,
    bottom: 24,
    left: 40,
    containLabel: true,
    borderColor: "rgba(255, 255, 255, 0.05)"
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.08)"
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#747e82",
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
      color: "#747e82",
      fontFamily: "Manrope, system-ui, sans-serif",
      fontSize: 11
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255, 255, 255, 0.05)",
        type: "dashed"
      }
    }
  },
  tooltip: {
    backgroundColor: "rgba(16, 25, 30, 0.95)",
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: "#f5f6f4",
      fontFamily: "Manrope, system-ui, sans-serif",
      fontSize: 12
    },
    extraCssText: "box-shadow: 0 8px 24px rgba(0,0,0,0.6); border-radius: 10px; backdrop-filter: blur(12px);"
  }
};
