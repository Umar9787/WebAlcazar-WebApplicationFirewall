import logo from "../../images/WAC.png";
import "./credentials.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  loginSubmit() {
    // this.props.onAuth(this.state.email, this.state.password);
    // console.log(this.props.history);
    if (this.state.username == "" || this.state.password == "") {
      alert("Enter All fields");
      return;
    }
    this.props.onAuth(this.state.username, this.state.password);
    this.setState({ username: "", password: "" });
    this.loginCompleted();
  }

  componentDidMount() {
    if (this.props.isAuthenticated == true) {
      this.props.history.push("/home/dashboard/statistics");
    }
  }
  loginCompleted() {
    if (this.props.isAuthenticated == true) {
      this.props.history.push("/home/dashboard/statistics");
    } else if (!this.props.isAuthenticated && this.props.error) {
      if (this.props.error.message == "Request failed with status code 400") {
        alert("Invalid username or password");
      } else {
        this.loginCompleted();
      }
      this.setState({ username: "", password: "" });
    }
  }
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
      // alert(errorMessage);
      // console.log(errorMessage);
    }
    return (
      <div className="form-container">
        <div className="image-holder">
          <img className="credentials-logo" src={logo} alt="" />
          <p className="credentials-statement">
            WebAlcazar is the best solution for your web application security.
          </p>
          <p className="copy-right">&copy; Transcend Inc. Ltd.</p>
        </div>
        <div className="container">
          <a href="/register" className="register-login">
            New User? Register
          </a>
          <div className="login-box">
            <div className="login-title">Login</div>

            <form className="login-form">
              <div className="form-group">
                <label className="form-control-label">Username</label>
                <br></br>
                <input
                  type="text"
                  className="credentials-email"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  value={this.state.username}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Password</label>
                <br></br>
                <input
                  type="password"
                  className="credentials-password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  value={this.state.password}
                  required
                />
              </div>

              <div className="loginbttm">
                <button
                  type="button"
                  className="login-button"
                  onClick={() => this.loginSubmit()}
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
