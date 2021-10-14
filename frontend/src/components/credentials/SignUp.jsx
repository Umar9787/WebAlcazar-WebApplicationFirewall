import logo from "../../images/WAC.png";
import "./credentials.css";
import React, { Component } from "react";

export class SignUp extends Component {
  render() {
    return (
      <div className="register-form-container">
        <div className="image-holder">
          <img className="credentials-logo" src={logo} alt="" />
          <p className="credentials-statement">
            WebAlcazar is the best solution for your web application security.
          </p>
          <p className="copy-right">&copy; Transcend Inc. Ltd.</p>
        </div>
        <div className="register-container">
          <a href="/" className="register-login">
            Already a User? Login
          </a>
          <div className="register-box">
            <div className="register-title">Register</div>
            <div className="register-form">
              <form>
                <div className="form-group">
                  <label className="form-control-label">Name</label>
                  <br></br>
                  <input type="text" className="credentials-name" required />
                </div>
                <div className="form-group">
                  <label className="form-control-label">Email</label>
                  <br></br>
                  <input type="text" className="credentials-email" required />
                </div>
                <div className="form-group">
                  <label className="form-control-label">Password</label>
                  <br></br>
                  <input
                    type="password"
                    className="credentials-password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">Confirm Password</label>
                  <br></br>
                  <input
                    type="password"
                    className="credentials-password"
                    required
                  />
                </div>

                <div className="registerbttm">
                  <button type="submit" className="register-button">
                    SignUp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
