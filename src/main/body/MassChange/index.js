/* eslint.disable */
import React, { Component } from "react";
import "../../../css/App.css";
import SweetAlert from "react-bootstrap-sweetalert";

import Input from "../components/Input";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import * as dgapi from "../../../utils/API/dgapi";

class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snCount: 0,
      status: "",
      Eingabe: "",
      sn: {},
      bemerkung: "",
    };
    this._save = this._save.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._delete = this._delete.bind(this);
    this._save = this._save.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    var newCount = this.state.snCount + 1;
    this.setState(
      (prevState) => ({
        sn: {
          ...prevState.sn,
          [this.state.snCount]: this.state.Eingabe,
        },
        Eingabe: "",
        snCount: newCount,
      }),
      () => console.log("Editform  State aktualisiert: ", this.state)
    );
  }
  _handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      {
        [name]: value,
      },
      () => console.log("MassChange State aktualisiert: ", this.state)
    );
  }
  _delete(index) {
    delete this.state.sn[index];
    this.setState({});
    console.log(this.state.sn);
  }
  createInput() {
    var erg = [];
    for (var seriennummer in this.state.sn) {
      erg.push(
        <div className="row massImport">
          <label className="form-label col-md-6">
            {this.state.sn[seriennummer]}
          </label>
          <Button
            action={() => {
              this._delete(seriennummer);
            }}
            type={"btn btn-danger col-md-4"}
            title={"Löschen"}
          />
        </div>
      );
    }
    return erg;
  }

  _save() {
    dgapi.massenStatus(this.state).then((erg) => {
      if (erg.message === "success") {
        this.setState({
          snCount: 0,
          Eingabe: "",
          sn: {},
          bemerkung: "",
        });
        this.props.setAlert({
          title: "Status geändert",
          message: `Es wurden ${erg.success.length} Systeme aktualisiert, ${erg.error.length} Fehler sind aufgetreten`,
          status: true,
          type: "success",
        });
        this.props.updateApp();
      } else {
        this.props.setAlert({
          title: "Fehler",
          message: erg.message,
          status: true,
          type: "error",
        });
      }
    });
  }
  render() {
    return (
      <div>
        <SweetAlert
          title={this.props.App.notify.title}
          onConfirm={this.props.hideAlert}
          showCancel
          onCancel={this.props.hideAlert}
          show={this.props.App.notify.status}
          type={this.props.App.notify.type}
        >
          {this.props.App.notify.message}
        </SweetAlert>
        <h2>Massen Status Änderung</h2>
        <div className="form-group">
          <Button action={this._save} type={"primary"} title={"Speichern"} />

          <Dropdown
            title={"Status"}
            name={"status"}
            options={this.props.App.data.status}
            value={this.state.status}
            placeholder={"Status wählen"}
            handlechange={this._handleInput}
          />
          <Dropdown
            title={"Betankungsstraße"}
            name={"Straße"}
            options={this.props.App.data.straßen}
            value={this.state.straße}
            placeholder={"Straße wählen......"}
            handlechange={this._handleInput}
          />
          <Input
            inputType={"text"}
            title={"Bemerkung"}
            name={"bemerkung"}
            value={this.state.bemerkung}
            placeholder={"Bemerkung eingeben...."}
            handlechange={this._handleInput}
          />
          <br />
          <hr />
          <form onSubmit={this._handleSubmit}>
            <Input
              inputType={"text"}
              title={"Seriennummer"}
              name={"Eingabe"}
              value={this.state.Eingabe}
              placeholder={"Bitte Seriennummer eintragen...."}
              handlechange={this._handleInput}
            />
          </form>
          {this.createInput()}
        </div>
      </div>
    );
  }
}
export default Template;
