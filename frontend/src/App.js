import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./components/credentials/SignUp";
import Login from "./components/credentials/Login";
import MyNavbar from "./components/Navbar/MyNavbar";
import { connect } from "react-redux";
import { Component } from "react";
import * as actions from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={(props) => <Login {...props} {...this.props} />}
            ></Route>

            <Route
              path="/register"
              component={(props) => <SignUp {...props} {...this.props} />}
            ></Route>
            <Route
              path="/home"
              component={(props) => <MyNavbar {...props} {...this.props} />}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
