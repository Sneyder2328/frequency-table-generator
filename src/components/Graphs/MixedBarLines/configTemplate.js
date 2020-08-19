const configTemp = {
  type: "mixed",
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
  series: [
    {
      type: "bar",
      values: [59, 70, 40, 75, 33, 50, 65],
      "bar-width": "50%",
    },
    {
      type: "line",
      values: [49, 30, 21, 15, 59, 51, 69],
      aspect: "spline",
    },
  ],
};

export default configTemp;
