import React from "react";
import "zingchart/es6";
import Zingchart from "zingchart-react";
import "zingchart-react/dist/modules/zingchart-depth.min.js";
import configTemp from "./configTemplate.js";
import ZingChart from "zingchart-react";

class Histogram extends React.Component {
  constructor(props) {
    super(props);
    let config = configTemp;
    config.series = this.props.series;
    config.scaleX.labels = this.props.labels;
    config.title.text = this.props.title;
    config.subtitle.text = this.props.text;
    config.scaleX.label.text = this.props.scaleXName;
    config.scaleY.label.text = this.props.scaleYName;

    this.state = { config: config };
    this.chart = React.createRef();
  }

  render() {
    return (
      <div className="chartContainer">
        <ZingChart ref={this.chart} data={this.state.config} />
      </div>
    );
  }
}

export default Histogram;
