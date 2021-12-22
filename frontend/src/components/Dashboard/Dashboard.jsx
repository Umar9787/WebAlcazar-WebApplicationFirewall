import React, { Component } from "react";
import LineChart from "./Charts/LineChart";
import MultiseriesChart from "./Charts/MultiseriesChart";
import "./dashboard.css";
import PieChart from "./Charts/PieChart";
import ChartWithScaleBreaks from "./Charts/ChartWithScaleBreaks";
export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboardItem">
          <LineChart />
        </div>
        <div className="dashboardItem">
          <MultiseriesChart />
        </div>
        <div className="dashboardItem">
          <ChartWithScaleBreaks />
        </div>
        <div className="dashboardItem">
          <PieChart />
        </div>
      </div>
    );
  }
}

export default Dashboard;
