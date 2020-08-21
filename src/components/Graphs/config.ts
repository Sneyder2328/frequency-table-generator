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
        backgroundColor: "#e6fcff #96efff",
        lineColor: "red",
        lineStyle: "solid",
        lineWidth: 1,
        visible: false,
      },
    },
    scaleY: {
      label: {
        text: "scale Y",
      },
    },
    plot: {
      aspect: "spline",
    },
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
      "border-color": "gray",
      "border-radius": "5px",
      header: {
        text: "Leyenda",
        "font-family": "Georgia",
        "font-size": 12,
        "font-color": "#0075ff",
        "font-weight": "normal",
      },
      marker: {
        type: "circle",
      },
      "toggle-action": "remove",
      minimize: true,
      icon: {
        "line-color": "#9999ff",
      },
      "max-items": 8,
      overflow: "scroll",
    },
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
        visible: true,
      },
      label: {
        text: "scale X",
      },
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
        delay: 500,
        effect: "ANIMATION_SLIDE_BOTTOM",
      },
      barWidth: "33px",
      hoverState: {
        visible: false,
      },
    },
  },
  [MIXED]: {
    type: "mixed",
    scaleX: {
      labels: ["1", "2", "5"],
      guide: {
        backgroundColor: "#e6fcff #96efff",
        lineColor: "red",
        lineStyle: "solid",
        lineWidth: 1,
        visible: false,
      },
    },
    scaleY: {
      label: {
        text: "scale Y",
      },
    },
    plot: {
      aspect: "spline",
    },
  },
};
