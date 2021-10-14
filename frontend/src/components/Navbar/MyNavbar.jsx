import React from "react";
import logo from "../../images/WAC.png";
import "./navbar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Policies from "../Policies/Policies";
export default function MyNavbar() {
  let { path, url } = useRouteMatch();

  return (
    <div class="nav">
      <input type="checkbox" id="nav-check" />
      <div class="nav-header">
        <div class="nav-title">
          <img class="nav-title-logo" src={logo} alt="" srcset="" />
        </div>
      </div>
      <div class="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-links">
        <Link to={`${url}`}>Dashboard</Link>
        <Link to={`${url}/Policies`}>Policies</Link>
        <Link to={`${url}/defences`}>Defences</Link>
        <Link to={`${url}/logout`}>Logout</Link>
      </div>
      <Switch>
        <Route exact path={path}>
          <Dashboard />
        </Route>
        <Route path={`${path}/policies`}>
          <Policies />
        </Route>
      </Switch>
    </div>
  );
}
