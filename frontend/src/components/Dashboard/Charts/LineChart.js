import React, { Component } from "react";
import CanvasJSReact from "../../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
  render() {
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Statistics Last 7 Days",
      },
      axisY: {
        title: "Requests",
        includeZero: false,
        suffix: "%",
      },
      axisX: {
        title: "Day of Week",
        prefix: "D",
        interval: 1,
      },

      data: [
        {
          type: "line",
          toolTipContent: "Day {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
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

export default LineChart;
