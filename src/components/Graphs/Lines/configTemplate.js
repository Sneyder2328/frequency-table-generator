const configTemp = {
  type: "line",
  title: {
    text: "this is the title",
  },
  subtitle: {
    text: "this is the details",
  },
  "scale-y": {
    progression: "log",
    "log-base": 10,
  },
  scaleX: {
    guide: {
      lineColor: "gray",
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
  series: [
    {
      values: [
        [1, 2],
        [2, 3],
        [3, 4],
      ],
    },
  ],
};

export default configTemp;
