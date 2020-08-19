const configTemp = {
  type: "pie",
  title: {
    text: "this is the title",
  },
  subtitle: {
    text: "this is the details",
  },
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
      text: "Legend",
      "font-family": "Georgia",
      "font-size": 12,
      "font-color": "#3333cc",
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
  series: [{ values: [58], text: "Alpha" }, { values: 55 }],
};

export default configTemp;
