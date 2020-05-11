import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <label>Version: {this.props.App.Version}</label>
      </div>
    );
  }
}

export default Footer;
