import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: false,
  };

  fetchData = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };

  render() {
    const { loading } = this.state;

    return (
      <div style={{ marginTop: "60px" }}>
        <button
          className="button-quarantine"
          onClick={this.fetchData}
          disabled={loading}
        >
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Quarantining</span>}
          {!loading && <span>Quarantine</span>}
        </button>
      </div>
    );
  }
}
