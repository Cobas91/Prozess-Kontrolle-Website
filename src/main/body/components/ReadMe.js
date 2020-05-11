/* eslint.disable */
import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "../../../css/App.css";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this._handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    if (this.state.isOpen === true) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }
  render() {
    return (
      <div>
        <Button
          color="info"
          onClick={this._handleClick}
          style={{ marginBottom: "1rem" }}
        >
          {this.props.buttonName}
        </Button>
        <Collapse isOpen={this.state.isOpen}>
          <Card>
            <CardBody>
              <ul>
                {this.props.note.map((item, key) => (
                  <li>{item}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}
export default Template;
