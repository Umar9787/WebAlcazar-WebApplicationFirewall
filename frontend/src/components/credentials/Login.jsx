import logo from "../../images/WAC.png";
import "./credentials.css";
import React, { Component } from "react";

export class Login extends Component {
  loginSubmit(e) {
    e.preventDefault();
    window.location.href = "/home";
  }
  render() {
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
                <label className="form-control-label">Email</label>
                <br></br>
                <input type="text" className="credentials-email" required />
              </div>
              <div className="form-group">
                <label className="form-control-label">PASSWORD</label>
                <br></br>
                <input
                  type="password"
                  className="credentials-password"
                  required
                />
              </div>

              <div className="loginbttm">
                <button
                  type="submit"
                  className="login-button"
                  onClick={this.loginSubmit}
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

export default Login;
