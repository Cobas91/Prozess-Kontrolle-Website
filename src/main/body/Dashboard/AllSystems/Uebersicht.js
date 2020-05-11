import React, { Component } from "react";

import Tabelle from "../../components/Table";
import Button from "../../components/Button";
import * as tableView from "../../../../utils/tableView.js";
import * as dgapi from "../../../../utils/API/dgapi";

class Auswertung extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: [],
      versand: {},
      data: this.props.App.data.systeme,
    };
    this._setStandardView = this._setStandardView.bind(this);
    this._setLieferscheineView = this._setLieferscheineView.bind(this);
    this._setVersandReady = this._setVersandReady.bind(this);
    this._save = this._save.bind(this);
  }
  _handleFilterInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        system: {
          ...prevState.system,
          [name]: value,
        },
      }),
      () => console.log("Editform State aktualisiert: ", this.state)
    );
  }
  _isChecked(index) {
    if (this.state.versand[index] === undefined) {
      return false;
    } else {
      return this.state.versand[index];
    }
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
  async _save() {
    this.props.updateApp();
    await dgapi.setStatus(this.state.versand);
    this.setState({
      ...this.state,
      data: this.props.App.data.uebersichtVersand,
    });
  }
  componentDidMount() {
    var filterKunde = this.props.App.data.kunden;
    filterKunde.push("");
    var filterStatus = this.props.App.data.status;
    filterStatus.push("");

    var filter = {
      kundenFilter: filterKunde,
      statusFilter: filterStatus,
    };
    this.setState({
      ...this.state,
      filter: filter,
      view: tableView.standard(this),
    });
  }
  _setStandardView() {
    this.props.updateApp();
    this.setState({
      ...this.state,
      view: tableView.standard(this),
      data: this.props.App.data.systeme,
    });
  }
  _setLieferscheineView() {
    this.props.updateApp();
    this.setState({
      ...this.state,
      view: tableView.lieferscheine(this.state.filter),
      data: this.props.App.data.systeme,
    });
  }
  _setVersandReady() {
    this.props.updateApp();
    this.setState({
      ...this.state,
      view: tableView.versandReady(this),
      data: this.props.App.data.uebersichtVersand,
    });
  }
  render() {
    return (
      <div className="form-group">
        <h2>Übersicht alle Systeme</h2>
        <h3>Tabellenansicht ändern</h3>
        <Button
          action={this._setStandardView}
          type={"primary"}
          title={"Standard"}
        />
        <Button
          action={this._setLieferscheineView}
          type={"primary"}
          title={"Lieferscheine"}
        />
        <Button
          action={this._setVersandReady}
          type={"primary"}
          title={"Versand Ready"}
        />
        <div className="form-group">
          <Tabelle
            data={this.state.data}
            header={this.state.view ? this.state.view : []}
            DropdownFilter={true}
            TableName="Übersicht"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}
export default Auswertung;
