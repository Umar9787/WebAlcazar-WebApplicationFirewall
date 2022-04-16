import React from "react";
import { useState, useEffect } from "react";
import logo from "../../images/WAC.png";
import "./navbar.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import Dashboard from "../Dashboard/Dashboard";
import Policies from "../Policies/Policies";
import Profile from "../Profile/Profile";
import Defences from "../Defences/Defences";
import SQLi from "../Dashboard/Threats/SQLi/SQLi";
import XSS from "../Dashboard/Threats/XSS/XSS";
import Blacklist from "../Blacklist/Blacklist";
function MyNavbar(props) {
  const [displayNav, setDisplayNav] = useState(true);

  let { path, url } = useRouteMatch();
  let navHeight = displayNav ? "nav-links" : "nav-links-height";
  return (
    <div className="nav-container">
      {!props.isAuthenticated ? props.history.push("/") : console.log("")}
      <div className="nav">
        <img className="nav-title-logo" src={logo} alt="" />
        <div
          className="nav-btn"
          onClick={() => {
            setDisplayNav(!displayNav);
          }}
        >
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className={navHeight}>
          <div className="dropdown">
            <a className="dropbtn">Dashboard</a>
            <div className="dropdown-content">
              <Link
                to={`${url}/dashboard/statistics`}
                onClick={() => setDisplayNav(!displayNav)}
              >
                Statistics
              </Link>
              <Link
                to={`${url}/dashboard/threats/sqli`}
                onClick={() => setDisplayNav(!displayNav)}
              >
                SQLi
              </Link>
              <Link
                to={`${url}/dashboard/threats/xss`}
                onClick={() => setDisplayNav(!displayNav)}
              >
                XSS
              </Link>
            </div>
          </div>
          <Link
            to={`${url}/policies`}
            onClick={() => setDisplayNav(!displayNav)}
          >
            Policies
          </Link>
          <Link
            to={`${url}/defences`}
            onClick={() => setDisplayNav(!displayNav)}
          >
            Defences
          </Link>
          {/* <Link
            to={`${url}/profile`}
            onClick={() => setDisplayNav(!displayNav)}
          >
            Profile
          </Link> */}
          <Link to={`${url}/ips`} onClick={() => setDisplayNav(!displayNav)}>
            Blacklist Ips
          </Link>
          <Link
            to="/"
            onClick={() => {
              props.logout();
            }}
          >
            Logout
          </Link>
        </div>
      </div>
      <Switch>
        <Route exact path={`${path}/dashboard/statistics`}>
          <Dashboard />
        </Route>
        <Route
          exact
          path={`${path}/dashboard/threats/sqli`}
          component={(prop) => <SQLi {...prop} {...props} />}
        ></Route>
        <Route
          exact
          path={`${path}/dashboard/threats/xss`}
          component={(prop) => <XSS {...prop} {...props} />}
        ></Route>
        <Route
          exact
          path={`${path}/policies`}
          component={(prop) => <Policies {...prop} {...props} />}
        ></Route>
        <Route path={`${path}/defences`}>
          <Defences />
        </Route>
        {/* <Route path={`${path}/profile`}>
          <Profile />
        </Route> */}
        <Route path={`${path}/ips`}>
          <Blacklist />
        </Route>
      </Switch>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     loading: state.loading,
//     error: state.error,
//   };
// };
// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.token != null,
//   };
// };
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(MyNavbar);
