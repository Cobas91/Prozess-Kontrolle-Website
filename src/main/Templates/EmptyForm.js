/* eslint.disable */
import React, { Component } from "react";
import "../../../../css/App.css";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  async _handleInput(e) {
    e.preventDefault();
  }

  render() {
    console.log("Checklisten State: ", this.state);
    return (
      <div>
        <h2>Template</h2>
        <div className="form-group">
          <form onSubmit={this._handleSubmit}></form>
        </div>
      </div>
    );
  }
}
export default Template;
