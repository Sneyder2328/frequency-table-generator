import React from "react";
import "zingchart/es6";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import configTemp from "./configTemplate.js";
// @ts-ignore
import ZingChart from "zingchart-react";

// class Histogram extends React.Component {
//   // @ts-ignore
//   constructor(props) {
//     super(props);
//     let config = configTemp;
//     // @ts-ignore
//     config.scaleX.labels = this.props.labels;
//     config.title.text = this.props.title;
//     config.subtitle.text = this.props.text;
//     config.scaleX.label.text = this.props.scaleXName;
//     config.scaleY.label.text = this.props.scaleYName;
//     config.series[0].values = this.props.barValues;
//     config.series[1].values = this.props.lineValues;
//     this.state = { config: config };
//     this.chart = React.createRef();
//   }
//
//   render() {
//     return (
//       <div className="chartContainer">
//         <ZingChart ref={this.chart} data={this.state.config} />
//       </div>
//     );
//   }
// }
