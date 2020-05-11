/* eslint.disable */
import React, { Component } from "react";
import "../../../css/App.css";
import SweetAlert from "react-bootstrap-sweetalert";

import Switch from "../components/Switch.js";
import TextArea from "../components/TextArea.js";
import Button from "../components/Button.js";

import * as dgapi from "../../../utils/API/dgapi";

class ChecklistenEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SN: this.props.App.workData.SN,
      Input: {
        Seriennummer: this.props.App.workData.SN,
        SCCM_Anlage: false,
        PXE_Start: false,
        Bootstick_Start: false,
        Bemerkung: "",
        Computername: false,
        Software: false,
        BIOS: false,
        timestamp: "Keine Checkliste gefunden",
      },
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
        okButton: "Ja, speichern!",
        cancleButton: "Nein, ich überlege nochmal...",
      },
    };
    this._handleSwitchChange = this._handleSwitchChange.bind(this);
    this._handleInput = this._handleInput.bind(this);
    this._hideAlert = this._hideAlert.bind(this);
    this._save = this._save.bind(this);
    this._cancelAlert = this._cancelAlert.bind(this);
  }
  componentDidMount() {
    this._checkExist();
    this.props.hideAlert();
  }
  _checkExist() {
    this.props.App.data.checklisten.find((system) => {
      if (system.Seriennummer === this.props.SN) {
        this.setState({
          Input: {
            Seriennummer: system.Seriennummer,
            SCCM_Anlage: system.SCCM_Anlage,
            PXE_Start: system.PXE_Start,
            Bootstick_Start: system.Bootstick_Start,
            Bemerkung: system.Bemerkung,
            Computername: system.Computername,
            Software: system.Software,
            BIOS: system.BIOS,
            timestamp: system.timestamp,
          },
        });
        return true;
      } else {
        console.log("Kein Gerät gefunden für Checkliste");
        return false;
      }
    });
  }
  _handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({
      Input: {
        ...prevState.Input,
        [name]: value,
      },
    }));
  }
  _handleSwitchChange(value, Name) {
    this.setState((prevState) => ({
      Input: {
        ...prevState.Input,
        [Name]: value,
      },
    }));
  }
  _hideAlert() {
    this.setState((prevState) => ({
      ...prevState,
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    }));
  }

  async _save() {
    dgapi.addChecklisteToSystem(this.state.Input);
    this.props.updateApp();
  }
  _cancelAlert() {
    this.setState((prevState) => ({
      ...prevState,
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    }));
  }
  render() {
    console.log("Checklisten Props: ", this.state);
    return (
      <div>
        <SweetAlert
          showCancel
          title={this.props.App.notify.title}
          onCancel={this.props.hideAlert}
          onConfirm={this._save}
          show={this.props.App.notify.status}
          type={this.props.App.notify.type}
        >
          {this.props.App.notify.message}
        </SweetAlert>
        <h2>Checkliste</h2>
        {/* Gerät in SCCM angelegt */}
        <Switch
          title="Gerät in SCCM angelegt"
          onChange={(e) => this._handleSwitchChange(e, "SCCM_Anlage")}
          checked={this.state.Input.SCCM_Anlage}
        />
        {/* BIOS geprüft */}
        <Switch
          title="Bios Settings"
          onChange={(e) => this._handleSwitchChange(e, "BIOS")}
          checked={this.state.Input.BIOS}
        />
        {/* Gerät via PXE gestartet */}
        <Switch
          title="Gerät via PXE gestartet"
          onChange={(e) => this._handleSwitchChange(e, "PXE_Start")}
          checked={this.state.Input.PXE_Start}
        />
        {/* Gerät via Boot Stick gestartet */}
        <Switch
          title="Gerät via Boot Stick gestartet"
          onChange={(e) => this._handleSwitchChange(e, "Bootstick_Start")}
          checked={this.state.Input.Bootstick_Start}
        />
        {/* Gerät mit Computernamen versehen */}
        <Switch
          title="Computername aufgeklebt"
          onChange={(e) => this._handleSwitchChange(e, "Computername")}
          checked={this.state.Input.Computername}
        />
        {/* Software geprüft */}
        <Switch
          title="Software geprüft falls nötig"
          onChange={(e) => this._handleSwitchChange(e, "Software")}
          checked={this.state.Input.Software}
        />
        {/* Bemerkung */}
        <TextArea
          title={"Bemerkung"}
          rows={3}
          value={this.state.Input.Bemerkung}
          name={"Bemerkung"}
          handlechange={this._handleInput}
          placeholder={"Bemerkung hier eingeben"}
        />
        <label>
          {"Checkliste bearbeitet am: " + this.state.Input.timestamp}
        </label>
        <Button
          action={this._save}
          type={"primary"}
          title={"Checkliste Speichern"}
        />
      </div>
    );
  }
}
export default ChecklistenEdit;
