/* eslint.disable */
import React, { Component } from "react";
import * as dgapi from "../../../utils/API/dgapi";
import * as time from "../../../utils/time";
import "../../../css/App.css";

class Hierachie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  async componentDidMount() {
    this.setState({
      data: await dgapi.getHierarchie(this.props.sn),
    });
  }
  _createElements(data) {
    var erg = [];
    data.forEach((element) => {
      erg.push(
        <>
          <label>
            {time.convert(element.timestamp, "DD MM HH mm")} - {element.Status}
          </label>
          <br />
        </>
      );
    });
    if (erg.length <= 0) {
      erg.push(<label>Keine Einträge vorhanden</label>);
    }
    return erg;
  }

  render() {
    return (
      <div>
        <h3>Hierachie</h3>
        {this._createElements(this.state.data)}
      </div>
    );
  }
}
export default Hierachie;
