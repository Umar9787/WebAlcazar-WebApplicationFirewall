import React from "react";
import "./threats.css";
import axios from "axios";
export class XSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      XSS: [],
    };
  }
  newFunction() {}

  componentDidMount() {
    const user = localStorage.getItem("username");

    axios
      .post("http://127.0.0.1:8000/api/getxss/", { user: user })
      .then((res) => this.setState({ Data: JSON.parse(res.data) }))
      .catch((err) => console.log(err));
  }

  quarantineThreat(id) {
    // let tempData = this.state.Data;

    // tempData[tempData.findIndex((obj) => obj.pk === id)].fields.quarantine =
    //   !tempData[tempData.findIndex((obj) => obj.pk === id)].fields.quarantine;
    // this.setState(tempData);

    const user = localStorage.getItem("username");
    axios
      .post("http://127.0.0.1:8000/api/quarantinexss/", { id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    axios
      .post("http://127.0.0.1:8000/api/getxss/", { user: user })
      .then((res) => {
        this.setState({ Data: JSON.parse(res.data) });
        // axios
        //   .post("http://127.0.0.1:8000/api/getxss/", { user: user })
        //   .then((res) => this.setState({ XSS: JSON.parse(res.data) }))
        //   .catch((err) => console.log(err));
        this.props.history.push("/home/dashboard/threats/xss");
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="threats-container">
        <section>
          <h1>XSS</h1>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Query</th>
                  <th>XSS</th>
                  <th>Time</th>
                  <th>IP</th>
                  <th>Quarantine</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="tbl-content">
            <table>
              <tbody>
                {this.state.Data.map((data) => {
                  return (
                    <tr key={data.pk}>
                      <td>{data.pk}</td>
                      <td>{data.fields.query}</td>
                      <td>{data.fields.xss ? "Yes" : "No"}</td>
                      <td>{data.fields.time}</td>
                      <td>{data.fields.ip}</td>
                      {/* <td>{data.fields.quarantine ? "Yes" : "No"} </td> */}
                      <td>
                        <div onClick={() => this.quarantineThreat(data.pk)}>
                          {data.fields.quarantine ? (
                            <div className="check-container">
                              <input type="checkbox" defaultChecked />
                              <span className="checkmark"></span>
                            </div>
                          ) : (
                            <div className="check-container">
                              <input type="checkbox" />
                              <span className="checkmark"></span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

export default XSS;
