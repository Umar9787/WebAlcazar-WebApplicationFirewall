import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  render() {
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Website Traffic",
      },
      data: [
        {
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            { y: 18, label: "XEE" },
            { y: 49, label: "SQL Injection" },
            { y: 9, label: "XSS" },
            { y: 5, label: "Broken Authentication" },
            { y: 19, label: "Broken Access Control" },
            { y: 19, label: "Insecure Deserialization" },
          ],
        },
      ],
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default PieChart;
