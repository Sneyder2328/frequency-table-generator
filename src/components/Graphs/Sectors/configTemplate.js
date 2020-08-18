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
  plot: {
    aspect: "histogram",
  },
  series: [{ values: [58] }, { values: 55 }],
};

export default configTemp;
