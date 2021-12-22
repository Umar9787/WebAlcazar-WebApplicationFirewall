import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ChartWithScaleBreaks extends Component {
  render() {
    const options = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Attacks",
      },
      axisY: {
        title: "Active Installations",
        scaleBreaks: {
          autoCalculate: true,
          type: "wavy",
          lineColor: "white",
        },
      },
      data: [
        {
          type: "column",
          indexLabel: "{y}",
          indexLabelFontColor: "white",
          dataPoints: [
            { label: "SQL Injections", y: 20 },
            { label: "XSS", y: 10 },
            { label: "Authentication", y: 20 },
            { label: "Insecure Deserialization", y: 30 },
            { label: "XEE", y: 20 },
            { label: "Broken Access Control", y: 20 },
          ],
        },
      ],
    };
    return (
      <div className="ChartWithScaleBreaks">
        <CanvasJSChart options={options} />
      </div>
    );
  }
}

export default ChartWithScaleBreaks;
