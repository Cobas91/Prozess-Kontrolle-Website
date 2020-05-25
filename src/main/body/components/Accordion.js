import React, { Component } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import Button from "./Button";
import * as dgapi from "../../../utils/API/dgapi";
import * as time from "../../../utils/time";
class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      bemerkungen: [],
      loading: true,
    };
    this._handleClick = this._handleClick.bind(this);
  }

  async componentDidMount() {
    const bemerkungen = await dgapi.getComments(this.props.sn);
    this.setState({ bemerkungen: bemerkungen, loading: false });
  }
  _handleClick() {
    if (this.state.isOpen === true) {
      this.setState({ isOpen: false });
    } else {
      this.setState({ isOpen: true });
    }
  }
  render() {
    if (this.state.loading === true) {
      return <div></div>;
    } else {
      return (
        <>
          <Button
            action={this._handleClick}
            className="btn btn-outline-info"
            title={this.props.name}
          />
          <Collapse isOpen={this.state.isOpen}>
            <Card>
              <CardBody>
                <ul>
                  {this.state.bemerkungen.map((item, key) => (
                    <li>
                      {time.convert(item.timestamp, "DD MM HH mm")} -{" "}
                      {item.comment}
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </Collapse>
        </>
      );
    }
  }
}

export default Accordion;
