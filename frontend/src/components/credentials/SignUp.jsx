import logo from "../../images/WAC.png";
import "./credentials.css";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/auth";
import { useEffect } from "react";
import axios from "axios";
function SignUp(props) {
  const [credentails, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  function formSubmitted() {
    if (
      credentails.username == "" ||
      credentails.email == "" ||
      credentails.password == ""
    ) {
      alert("Enter All fields");
      return;
    }
    credentails.password2 = credentails.password;
    props.onAuth(
      credentails.username,
      credentails.email,
      credentails.password,
      credentails.password2
    );
    setCredentials({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
    registerCompleted();
    // props.history.push("/home/dashboard/statistics");
  }
  useEffect(() => {
    if (props.isAuthenticated == true) {
      const user = localStorage.getItem("username");
      axios
        .post("http://127.0.0.1:8000/admin/api/policies/", { user: user })
        .then((res) => console.log(res));
      props.history.push("/home/dashboard/statistics");
    }
  }, []);
  function registerCompleted() {
    if (props.isAuthenticated == true) {
      const user = localStorage.getItem("username");
      axios
        .post("http://127.0.0.1:8000/admin/api/policies/", { user: user })
        .then((res) => console.log(res));
      props.history.push("/home/dashboard/statistics");
    } else if (!props.isAuthenticated && props.error) {
      if (props.error.message == "Request failed with status code 400") {
        alert("Username already exist");
      }
      setCredentials({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    }
  }

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
                <label className="form-control-label">User Name</label>
                <br></br>
                <input
                  type="text"
                  className="credentials-name"
                  value={credentails.username}
                  onChange={(e) =>
                    setCredentials({ ...credentails, username: e.target.value })
                  }
                  value={credentails.username}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Email</label>
                <br></br>
                <input
                  type="email"
                  className="credentials-email"
                  value={credentails.email}
                  onChange={(e) =>
                    setCredentials({ ...credentails, email: e.target.value })
                  }
                  value={credentails.email}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Password</label>
                <br></br>
                <input
                  type="password"
                  className="credentials-password"
                  value={credentails.password}
                  onChange={(e) =>
                    setCredentials({ ...credentails, password: e.target.value })
                  }
                  value={credentails.password}
                  required
                />
              </div>

              <div className="registerbttm">
                <button
                  type="button"
                  className="register-button"
                  onClick={() => formSubmitted()}
                >
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
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, email, password, password2) =>
      dispatch(actions.authSignup(username, email, password, password2)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
