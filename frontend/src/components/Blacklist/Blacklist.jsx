import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./blacklist.css";
export default function Blacklist() {
  const [ip, setIp] = useState("");
  const [ipList, setIpList] = useState([]);
  function formSubmitted(e) {
    e.preventDefault();
    console.log(ip);
    if (ip === "") return;
    const user = localStorage.getItem("username");
    axios
      .post("http://127.0.0.1:8000/api/blacklistip/", { user: user, ip: ip })
      .then((res) => {
        console.log(res.data);
      });

    setIp("");
  }
  useEffect(() => {
    const user = localStorage.getItem("username");
    axios
      .post("http://127.0.0.1:8000/api/getblacklistip/", { user: user })
      .then((res) => {
        setIpList(JSON.parse(res.data));
      });
  }, [ip]);

  return (
    <div className="policies-container">
      <h1>Blacklist IP</h1>
      <form action="" onSubmit={formSubmitted}>
        <label htmlFor="input" className="blacklist-label">
          Blacklist IP
        </label>
        <input
          className="blacklist-name"
          type="text"
          name="ip"
          onChange={(e) => setIp(e.target.value)}
          value={ip}
          required
        />
        <button className="blacklist-button" type="submit">
          Blacklist
        </button>
      </form>

      <div className="tbl-header">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>IP</th>
              <th>Remove IP</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table>
          <tbody>
            {ipList.map((data) => {
              return (
                <tr key={data.pk}>
                  <td>{data.pk}</td>
                  <td>{data.fields.ip}</td>
                  <td
                    className="blacklist-cross"
                    onClick={() => {
                      const user = localStorage.getItem("username");
                      axios
                        .post("http://127.0.0.1:8000/api/removeblacklistip/", {
                          user: user,
                          ip: data.fields.ip,
                        })
                        .then((res) => {
                          console.log(res.data);
                        });
                      setIp("");
                      setIpList(
                        ipList.filter(
                          (item) => item.fields.ip === data.fields.ip
                        )
                      );
                      console.log(ipList);
                    }}
                  >
                    <span>X</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
