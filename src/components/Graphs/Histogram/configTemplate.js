const configTemp = {
  type: "bar",
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
    label: {
      text: "scale X",
    },
  },
  scaleY: {
    label: {
      text: "scale Y",
    },
  },
  plot: {
    aspect: "histogram",
  },
  series: [{ values: [1, 2, 3] }],
};

export default configTemp;