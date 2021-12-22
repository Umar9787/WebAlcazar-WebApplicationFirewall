import React from "react";
import "./defences.css";
import ButtonLoader from "./ButtonLoader";
export class Defences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [
        {
          id: 1,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 2,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 3,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 4,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 5,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 6,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 7,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 8,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 9,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
        {
          id: 10,
          url: "abc.com",
          header: "HTTP",
          port: 20,
          ip: "192.168.0.1",
        },
      ],
    };
  }

  render() {
    return (
      <div className="threats-container">
        <section>
          <h1>Network Traffic</h1>
          <div className="defence-refresh">
            <ButtonLoader />
          </div>
          <div className="example">
            <input type="text" placeholder="Search.." name="search" />
            <button type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <div className="tbl-header">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Url</th>
                  <th>Header</th>
                  <th>Port</th>
                  <th>Ip Address</th>
                  <th>Ip Address</th>
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
                      <td>{data.url}</td>
                      <td>{data.header}</td>
                      <td>{data.port} </td>
                      <td>{data.ip} </td>
                      <td>{data.ip} </td>
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

export default Defences;
