import React, { Component } from "react";

export class Template extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      status: false,
    };
  }

  render() {
    return <></>;
  }
}

export default Template;
