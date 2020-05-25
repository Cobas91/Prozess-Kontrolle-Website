/* eslint.disable */
import React, { Component } from "react";
import "../../../../css/App.css";
import * as dgapi from "../../../../utils/API/dgapi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Switch from "../../components/Switch.js";
import SweetAlert from "react-bootstrap-sweetalert";
class AppConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      config: {},
    };
    this._handleInput = this._handleInput.bind(this);
    this._save = this._save.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
  }
  async componentDidMount() {
    var config = await dgapi.getConfig();
    var teamschannels = [];
    for (var name in config.teams.channels) {
      teamschannels.push({ Name: name });
    }
    this.setState(
      (prevState) => ({
        ...prevState,
        config: {
          Daily_Job_Uhrzeit: `${config.Daily_Job_Uhrzeit.stunde}:${config.Daily_Job_Uhrzeit.minute}:${config.Daily_Job_Uhrzeit.sekunde}`,
          Lagerbestand_Import: `${config.Lagerbestand_Import.pfad}${config.Lagerbestand_Import.file}`,
          Lieferschein_Import: `${config.Lieferschein_Import.pfad}${config.Lieferschein_Import.file}`,
          PowerBI_Uhrzeit: `${config.PowerBI.time.stunde}:${config.PowerBI.time.minute}:${config.PowerBI.time.sekunde}`,
          powerbi_checklisten_pfad: `${config.PowerBI.checklisten.pfad}${config.PowerBI.checklisten.powerBIFile}`,
          powerbi_checklisten_active: config.PowerBI.checklisten.active,
          powerbi_systeme_pfad: `${config.PowerBI.systeme.pfad}${config.PowerBI.systeme.powerBIFile}`,
          powerbi_systeme_active: config.PowerBI.systeme.active,
          powerbi_status_pfad: `${config.PowerBI.status.pfad}${config.PowerBI.status.powerBIFile}`,
          powerbi_status_active: config.PowerBI.status.active,
          teams_daily_channel: config.teams.dailyFeedback.channel,
          teams_daily_time: `${config.teams.dailyFeedback.time.stunde}:${config.teams.dailyFeedback.time.minute}:${config.teams.dailyFeedback.time.sekunde}`,
          teams_avaiable_channels: teamschannels,
        },
      }),
      () => console.log("AppConfig  State aktualisiert: ", this.state)
    );
  }
  _handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        config: {
          ...prevState.config,
          [name]: value,
        },
      }),
      () => console.log("AppConfig State aktualisiert: ", this.state)
    );
  }
  async _save() {
    var result = await dgapi.saveConfig(this.state.config);
    console.log(result);
    if (result.success) {
      this.props.setAlert({
        title: "Daten gespeichert!",
        message: result.success,
        type: "success",
        status: true,
      });
    } else {
      this.props.setAlert({
        title: "Etwas lief schief!",
        message: "Daten konnten nicht gespeichert werden",
        type: "error",
        status: true,
      });
    }
  }
  async _startUpdate() {
    this.props.setAlert({
      title: "Update wird ausgeführt",
      message: `Die Datenbank wird aktualisiert, das kann einen moment dauern.....`,
      status: true,
      type: "success",
    });
    await dgapi.startKHKImport_Lagerbestand();
    this.props.updateApp();
  }
  _handleSwitchChange(value, name) {
    this.setState(
      (prevState) => ({
        config: {
          ...prevState.config,
          [name]: value,
        },
      }),
      () => console.log("AppConfig State aktualisiert: ", this.state)
    );
  }
  render() {
    console.log("AppConfig State: ", this.state);
    return (
      <div>
        <SweetAlert
          title={this.props.App.notify.title}
          onConfirm={this.props.hideAlert}
          show={this.props.App.notify.status}
          type={this.props.App.notify.type}
        >
          {this.props.App.notify.message}
        </SweetAlert>
        <h2>App Konfiguration</h2>
        <div className="form-group">
          <label>Datenbank aktualisieren</label>
          <Button
            action={() => {
              this._startUpdate();
            }}
            type={"primary"}
            title={"Aktualisieren"}
          />
        </div>
        <div className="jumbotron">
          <div className="form-group">
            <h3>Daily KHK Import KHK -> SYSTOOL</h3>
            <Input
              inputType={"text"}
              title={"Uhrzeit"}
              name={"Daily_Job_Uhrzeit"}
              value={
                this.state.config.Daily_Job_Uhrzeit
                  ? this.state.config.Daily_Job_Uhrzeit
                  : ""
              }
              placeholder={"Daily Job Uhrzeit eingeben...."}
              handlechange={this._handleInput}
            />
            <Input
              inputType={"text"}
              title={"Speicherpfad Lagerbestandsliste"}
              name={"Lagerbestand_Import"}
              value={
                this.state.config.Lagerbestand_Import
                  ? this.state.config.Lagerbestand_Import
                  : ""
              }
              placeholder={"Speicherort der Lagerbestands Datei"}
              handlechange={this._handleInput}
            />
            <Input
              inputType={"text"}
              title={"Speicherpfad Lieferscheinliste"}
              name={"Lieferschein_Import"}
              value={
                this.state.config.Lieferschein_Import
                  ? this.state.config.Lieferschein_Import
                  : ""
              }
              placeholder={"Speicherort der Lieferschein Datei"}
              handlechange={this._handleInput}
            />
          </div>
        </div>
        <div className="jumbotron">
          <div className="form-group">
            <h3>Export PowerBI</h3>
            {/* PowerBI Uhrzeit */}
            <Input
              inputType={"text"}
              title={"Uhrzeit"}
              name={"PowerBI_Uhrzeit"}
              value={
                this.state.config.PowerBI_Uhrzeit
                  ? this.state.config.PowerBI_Uhrzeit
                  : ""
              }
              placeholder={"Uhrzeit für PowerBI Export eingeben....."}
              handlechange={this._handleInput}
            />
            <hr />
            {/* PowerBI Export Checklisten*/}
            <Switch
              title="Aktiv"
              onChange={(e) =>
                this._handleSwitchChange(e, "powerbi_checklisten_active")
              }
              checked={
                this.state.config.powerbi_checklisten_active
                  ? this.state.config.powerbi_checklisten_active
                  : ""
              }
            />
            <Input
              inputType={"text"}
              title={"Checklisten speicherort"}
              name={"powerbi_checklisten_pfad"}
              value={
                this.state.config.powerbi_checklisten_pfad
                  ? this.state.config.powerbi_checklisten_pfad
                  : ""
              }
              placeholder={"Pfad für Datei eingeben...."}
              handlechange={this._handleInput}
            />

            <hr />
            {/* PowerBI Export Systeme*/}
            <Switch
              title="Aktiv"
              onChange={(e) =>
                this._handleSwitchChange(e, "powerbi_systeme_active")
              }
              checked={
                this.state.config.powerbi_systeme_active
                  ? this.state.config.powerbi_systeme_active
                  : ""
              }
            />
            <Input
              inputType={"text"}
              title={"Systeme speicherort"}
              name={"powerbi_systeme_pfad"}
              value={
                this.state.config.powerbi_systeme_pfad
                  ? this.state.config.powerbi_systeme_pfad
                  : ""
              }
              placeholder={"Pfad für Datei eingeben...."}
              handlechange={this._handleInput}
            />

            <hr />
            {/* PowerBI Export Status*/}
            <Switch
              title="Aktiv"
              onChange={(e) =>
                this._handleSwitchChange(e, "powerbi_status_active")
              }
              checked={
                this.state.config.powerbi_status_active
                  ? this.state.config.powerbi_status_active
                  : ""
              }
            />
            <Input
              inputType={"text"}
              title={"Status speicherort"}
              name={"powerbi_status_pfad"}
              value={
                this.state.config.powerbi_status_pfad
                  ? this.state.config.powerbi_status_pfad
                  : ""
              }
              placeholder={"Pfad für Datei eingeben...."}
              handlechange={this._handleInput}
            />
          </div>
        </div>
        <div className="jumbotron">
          <div className="form-group">
            <h3>Daily Status Message || Teams</h3>
            <Dropdown
              title={"Channel"}
              name={"teams_daily_channel"}
              options={this.state.config.teams_avaiable_channels}
              value={
                this.state.config.teams_daily_channel
                  ? this.state.config.teams_daily_channel
                  : ""
              }
              placeholder={"Kunde wählen...."}
              handlechange={this._handleInput}
            />
            <Input
              inputType={"text"}
              title={"Uhrzeit"}
              name={"teams_daily_time"}
              value={
                this.state.config.teams_daily_time
                  ? this.state.config.teams_daily_time
                  : ""
              }
              placeholder={"Uhrzeit für PowerBI Export eingeben....."}
              handlechange={this._handleInput}
            />
          </div>
        </div>
        <Button action={this._save} type={"primary"} title={"Speichern"} />
      </div>
    );
  }
}
export default AppConfig;
