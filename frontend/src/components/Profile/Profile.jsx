import React, { Component } from "react";
import "./profile.css";
import { FiEdit } from "react-icons/fi";
export class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <div className="container-1">
          <nav className="profile-nav">
            <a href="#details">Account Details</a>
            <a href="#address">Address</a>
            <a href="#firewall-details">Firwall</a>
          </nav>
        </div>
        <div className="container-2">
          <section className="details" id="details">
            <div className="account-flex">
              <h2>Account</h2>
              <FiEdit />
            </div>

            <hr />
            <div className="name">
              <h3> Name </h3>
              <h4> John Doe</h4>
            </div>
            <div className="email">
              <h3> Email</h3>
              <h4>email@gmail.com</h4>
            </div>
            <div className="password">
              <h3> Password</h3>
              <h4> ********</h4>
            </div>
            <div className="plan">
              <h3> Subscription Plan</h3>
              <h4> 1 month</h4>
            </div>
          </section>
          <section className="address" id="address">
            <div className="account-flex">
              <h2>Address</h2>
              <FiEdit />
            </div>
            <hr />
            <div className="country">
              <h3> Country</h3>
              <h4> Pakistan</h4>
            </div>
            <div className="city">
              <h3> City</h3>
              <h4> Islamabad</h4>
            </div>
            <div className="house">
              <h3> House</h3>
              <h4> 12434</h4>
            </div>
          </section>
          <section className="firewall-details" id="firewall-details">
            <div className="account-flex">
              <h2>Firwall Details</h2>
              <a href="/home/dashboard/statistics">
                <FiEdit />
              </a>
            </div>
            <hr />
            <div className="attack-protection">
              <h3> Attacks</h3>
              <h4> sql, xxs, xee</h4>
            </div>
            <div className="city">
              <h3> Configured</h3>
              <h4> No</h4>
            </div>
            <div className="house">
              <h3> DDos</h3>
              <h4> No</h4>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Profile;
