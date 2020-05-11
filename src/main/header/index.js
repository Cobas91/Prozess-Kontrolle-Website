/* eslint.disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Avatar } from "../../images/avatar.svg";
import logo from "../../images/logo_dg.png";
import "../../css/App.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    console.log("Header State:", this.props);
    return (
      <div className="header">
        <div className="leftPos">
          <Link
            onClick={() => {
              this.props.setSite("dashboard", { SN: null });
            }}
          >
            <img src={logo} alt="DG Logo" className="logo" />
          </Link>
        </div>
        <div className="avatar">
          <Avatar />
        </div>
        <label>{this.props.user.name}</label>
      </div>
    );
  }
}
export default Header;
