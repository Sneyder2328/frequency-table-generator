const HISTOGRAM = "Histograma";
const SECTORS = "Sectores";
const LINES = "Lineas";
const MIXED = "Columnas Con Lineas";

export const configGraphs = {
  [HISTOGRAM]: {
    type: "bar",
    scaleX: {
      labels: ["1", "2", "5"],
      guide: {
        lineColor: "#b5ddff",
        lineStyle: "solid",
        lineWidth: 1,
        visible: true,
      },
    },
    scaleY: {
      label: {
        text: "scale Y",
      },
    },
    plot: {
      aspect: "spline",
      animation: {
        delay: 350,
        effect: "ANIMATION_SLIDE_BOTTOM",
      }
    }
  },
  [SECTORS]: {
    type: "pie",
    scaleX: {
      labels: [1, 2, 3, 4],
      guide: {
        backgroundColor: "#ffe6e6 #ffcccc",
        lineColor: "red",
        lineStyle: "solid",
        lineWidth: 1,
        visible: true,
      },
    },
    legend: {
      x: "75%",
      y: "25%",
      "border-width": 1,
      "border-color": "#145da0",
      "border-radius": "8px",
      header: {
        text: "Leyenda",
        "font-family": "Arial",
        "font-size": 13,
        "font-color": "#145da0",
        "font-weight": "normal",
      },
      marker: {
        type: "circle",
      },
      "toggle-action": "remove",
      minimize: true,
      icon: {
        "line-color": "#145da0",
      },
      "max-items": 8,
      overflow: "scroll",
    }
  },
  [LINES]: {
    type: "line",
    "scale-y": {
      progression: "log",
      "log-base": 10,
    },
    scaleX: {
      guide: {
        lineColor: "#c7e5ff",
        lineStyle: "solid",
        lineWidth: 1,
        visible: true
      }
    },
    scaleY: {
      label: {
        text: "scale Y",
      },
    },
    crosshairX: {
      plotLabel: {
        visible: false,
      },
    },
    plot: {
      aspect: "spline",
      crosshairX: {
        plotLabel: {
          visible: false,
        },
      },
      tooltip: {
        text: "X: %kt<br>Y: %vt",
        "text-align": "center",
        "font-color": "black",
        "background-color": "white",
        "border-width": 1,
        "border-color": "gray",
        "border-radius": "7px",
        alpha: 0.5,
        padding: "7%",
      },
      animation: {
        delay: 350,
        effect: "ANIMATION_SLIDE_BOTTOM",
      },
      barWidth: "33px",
      hoverState: {
        visible: false
      },
    },
  },
  [MIXED]: {
    type: "mixed",
    scaleX: {
      labels: ["1", "2", "5"],
      guide: {
        lineColor: "#b5ddff",
        lineStyle: "solid",
        lineWidth: 1,
        visible: true
      },
    },
    scaleY: {
      label: {
        text: "scale Y",
      },
    },
    plot: {
      aspect: "spline",
      animation: {
        delay: 350,
        effect: "ANIMATION_SLIDE_BOTTOM",
      }
    }
  },
};
