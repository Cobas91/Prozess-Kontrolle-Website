import React, { Component } from "react";

import Tabelle from "../../components/Table";
import Button from "../../components/Button";
import matchSorter from "match-sorter";
import * as dgapi from "../../../../utils/API/dgapi";
import * as tableView from "../../../../utils/tableView.js";

class Auswertung extends Component {
  constructor(props) {
    super(props);

    this.state = {
      versand: {},
    };
    this._save = this._save.bind(this);
    console.log("Versand State", this.state);
  }

  _handleSwitchChange(value, row) {
    this.setState(
      (prevState) => ({
        versand: {
          ...prevState.versand,
          [row.row.SN]: value,
        },
      }),
      () => console.log("Versand aktualisiert: ", this.state)
    );
  }
  _isChecked(index) {
    if (this.state.versand[index] === undefined) {
      return false;
    } else {
      return this.state.versand[index];
    }
  }
  _save() {
    this.props.updateApp();
    dgapi.setStatus(this.state.versand);
    this.componentDidMount();
  }
  render() {
    console.log("Übersicht State:", this.state);
    return (
      <div className="form-group">
        <h2>Übersicht Systeme mit Status Versand Ready</h2>
        <div className="form-group">
          <Tabelle
            data={this.props.App.data.uebersichtVersand}
            header={tableView.versandReady(this)}
            DropdownFilter={true}
            TableName="Checklisten"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
export default Auswertung;
