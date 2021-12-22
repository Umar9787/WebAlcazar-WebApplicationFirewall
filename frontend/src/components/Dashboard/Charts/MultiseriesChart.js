import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiseriesChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      title: {
        text: "Traffic Details",
      },
      axisY: {
        title: "Number of Customers",
        includeZero: false,
      },
      toolTip: {
        shared: true,
      },
      data: [
        {
          type: "spline",
          name: "Requests",
          showInLegend: true,
          dataPoints: [
            { label: 1, y: 64 },
            { label: 2, y: 61 },
            { label: 3, y: 64 },
            { label: 4, y: 62 },
            { label: 5, y: 64 },
            { label: 6, y: 60 },
            { label: 7, y: 58 },
          ],
        },
        {
          type: "spline",
          name: "Suspicious",
          showInLegend: true,
          dataPoints: [
            { label: 1, y: 20 },
            { label: 2, y: 21 },
            { label: 3, y: 24 },
            { label: 4, y: 22 },
            { label: 5, y: 24 },
            { label: 6, y: 20 },
            { label: 7, y: 28 },
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

export default MultiseriesChart;
