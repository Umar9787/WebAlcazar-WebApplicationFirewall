import React from "react";
import "./policies.css";
import ButtonLoader from "./ButtonLoader";
import axios from "axios";
export class Policies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      Data: [],
    };
  }
  componentDidMount() {
    let temp = [];
    const user = localStorage.getItem("username");
    axios
      .post("http://127.0.0.1:8000/api/getpolicies/", { user: user })
      .then((res) => {
        temp = JSON.parse(res.data);
        let Data = [
          {
            id: 1,
            name: "SQL Injection",
            status: temp[0].fields.sqli,
            quarantine: temp[0].fields.sqli,
          },
          {
            id: 2,
            name: "XSS",
            status: temp[0].fields.xss,
            quarantine: temp[0].fields.xss,
          },
          {
            id: 3,
            name: "XML",
            status: temp[0].fields.xml,
            quarantine: temp[0].fields.xml,
          },
        ];
        this.setState({ Data: Data });
      })
      .catch((err) => console.log(err));
  }

  quarantineThreat(id) {
    let tempData = this.state.Data;
    // console.log(id);
    tempData[id - 1].status = !tempData[id - 1].status;
    tempData[id - 1].quarantine = !tempData[id - 1].quarantine;
    console.log(tempData[id - 1].status);
    this.setState(tempData);
  }
  checkBox() {
    let temp = this.state.checked;
    this.setState((st) => (st.checked = !temp));
  }
  ChangePolicies() {
    if (this.state.checked == false) {
      alert("Agree to policies");
    } else {
      let temp = [];
      const user = localStorage.getItem("username");
      console.log(this.state.Data[0]);
      axios
        .post("http://127.0.0.1:8000/api/updatepolicies/", {
          user: user,
          sqli: this.state.Data[0].status,
          xss: this.state.Data[1].status,
          xml: this.state.Data[2].status,
        })
        .then((res) => console.log(res));
      axios
        .post("http://127.0.0.1:8000/api/getpolicies/", { user: user })
        .then((res) => {
          temp = JSON.parse(res.data);
          let Data = [
            {
              id: 1,
              name: "SQL Injection",
              status: temp[0].fields.sqli,
              quarantine: temp[0].fields.sqli,
            },
            {
              id: 2,
              name: "XSS",
              status: temp[0].fields.xss,
              quarantine: temp[0].fields.xss,
            },
            {
              id: 3,
              name: "XML",
              status: temp[0].fields.xml,
              quarantine: temp[0].fields.xml,
            },
          ];
          this.setState({ Data: Data });
          this.setState({ checked: false });
          this.props.history.push("/home/policies");
        })
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <div className="policies-container">
        <section>
          <h1>Policies</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>status</th>
                  <th>Activate</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table>
              <tbody>
                {this.state.Data.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>{data.name}</td>
                      <td>{data.status ? "Protected" : "Not Active"}</td>
                      <td>
                        <div onClick={() => this.quarantineThreat(data.id)}>
                          <div className="check-container">
                            <input
                              type="checkbox"
                              checked={data.status ? "checked" : ""}
                            />
                            <span className="checkmark"></span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="policy-text">
            A ‘'’web application firewall (WAF)’’’ is an application firewall
            for HTTP applications. It applies a set of rules to an HTTP
            conversation. Generally, these rules cover common attacks such as
            Cross-site Scripting (XSS) and SQL Injection. While proxies
            generally protect clients, WAFs protect servers. A WAF is deployed
            to protect a specific web application or set of web applications. A
            WAF can be considered a reverse proxy. WAFs may come in the form of
            an appliance, server plugin, or filter, and may be customized to an
            application. The effort to perform this customization can be
            significant and needs to be maintained as the application is
            modified.
          </p>
          <div className="policy-check-container">
            <h4 className="policy-agree">Do you Agree to privacy Policies</h4>
            <div className="check-container">
              <input
                type="checkbox"
                checked={this.state.checked ? "checked" : ""}
              />
              <span
                className="checkmark"
                onClick={() => this.checkBox()}
              ></span>
            </div>
          </div>
          <button
            type="button"
            className="btn-submit"
            onClick={() => this.ChangePolicies()}
          >
            Submit
          </button>
        </section>
      </div>
    );
  }
}

export default Policies;
