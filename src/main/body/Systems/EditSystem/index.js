/* eslint.disable */
import React, { Component } from "react";
import SweetAlert from "react-bootstrap-sweetalert";

import * as dgapi from "../../../../utils/API/dgapi";

import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Accordion from "../../components/Accordion";
import Checkliste from "../../components/checkliste";
import Switch from "../../components/Switch.js";

class EditSystemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getData: false, //Steuert die anzeige, ob nur SN zu sehen ist.
      system: {
        SN: this.props.App.workData.SN,
      },
      checkliste: {
        Seriennummer: this.props.App.workData.SN,
        SCCM_Anlage: false,
        BIOS: false,
        PXE_Start: false,
        Bootstick_Start: false,
        Computername: false,
        Software: false,
      },
      status: this.props.App.data.status,
      kunden: this.props.App.data.kunden,
      notify: {
        //Object für die Benachrichtigung
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    };
    this._handleInput = this._handleInput.bind(this);
    this._save = this._save.bind(this);
    this._reset = this._reset.bind(this);
    this._insertNewUSer = this._insertNewUSer.bind(this);
  }
  async _insertNewUSer() {
    this.setState(
      (prevState) => ({
        system: {
          ...prevState.system,
          Bearbeiter: this.props.App.user.name,
        },
      }),
      () =>
        console.log("Editform: Changing Akt_Bearbeiter: ", this.state.system)
    );

    return true;
  }
  _getCheckliste(input) {
    console.log("Suche checkliste für", input);
    this.props.App.data.checklisten.find((system) => {
      console.log("checking entry", system.Seriennummer);
      if (system.Seriennummer === input.SN) {
        this.setState({
          checkliste: {
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
  componentDidMount() {
    if (this.props.App.workData.SN !== null) {
      this.setState({
        system: this.props.App.WorkData,
      });
      var result = this.props.App.data.systeme.find((system) => {
        if (system.SN === this.state.system.SN) {
          this._getCheckliste(system);
          this.setState(
            (prevState) => ({
              ...prevState,
              getData: true,
              system: result,
            }),
            () => console.log("Editform  State aktualisiert: ", this.state)
          );
          return system;
        }
      });
    } else if (this.props.App.workData.SN === null) {
      this.props.hideAlert();
    } else {
      this.props.setAlert({
        title: "Nicht gefunden",
        message: `Seriennummer ${this.state.system.SN} konnte nicht gefunden werden!`,
        status: true,
        type: "error",
      });
    }
  }
  _handleInput(e) {
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
  _handleTextArea(e) {
    let value = e.target.value;
    this.setState(
      {
        bemerkung: value,
      },
      () => console.log("Editform State aktualisiert: ", this.state)
    );
  }
  async _save(e) {
    e.preventDefault();
    if (this.state.system.Bearbeiter !== this.props.App.user.name) {
      await this._insertNewUSer();
      await dgapi.updateSystem(this.state.system);
      await dgapi.addChecklisteToSystem(this.state.checkliste);
      this.props.updateApp();
      this.props.hideAlert();
    } else {
      await dgapi.updateSystem(this.state.system);
      await dgapi.addChecklisteToSystem(this.state.checkliste);
      this.props.updateApp();
      this.props.hideAlert();
    }
  }
  _reset() {
    this.props.hideAlert();
    this.setState({
      getData: false,
    });
  }
  _handleSwitchChange(value, Name) {
    this.setState(
      (prevState) => ({
        checkliste: {
          ...prevState.checkliste,
          [Name]: value,
        },
      }),
      () => console.log("Checkliste aktualisiert: ", this.state)
    );
  }
  render() {
    if (this.state.getData === false) {
      return (
        <div className="form-group">
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
          <h2>Edit System</h2>
          <div className="form-group">
            <form onSubmit={this._handleSubmit}>
              <Input
                inputType={"text"}
                title={"Seriennummer"}
                name={"SN"}
                value={this.state.system.SN}
                placeholder={"Bitte Seriennummer eintragen...."}
                handlechange={this._handleInput}
              />
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Edit System</h2>
        <Button action={this._reset} type={"error"} title={"Neues Gerät"} />
        <div className="jumbotron">
          <p>Status: {this.state.system.Status}</p>
          <p>Seriennummer: {this.state.system.SN}</p>
          <p>Modell: {this.state.system.Modell}</p>
          <p>KHK Lager: {this.state.system.Lager_KHK}</p>
          <p>KHK Kunde: {this.state.system.Kunde_KHK}</p>
          <Accordion name="Bemerkungen anzeigen" sn={this.state.system.ID} />
        </div>
        <Input
          inputType={"text"}
          title={"Hersteller"}
          name={"Hersteller"}
          value={this.state.system.Hersteller}
          placeholder={"Hersteller eintragen...."}
          handlechange={this._handleInput}
        />
        <Dropdown
          title={"Kunde"}
          name={"Kunde"}
          options={this.state.kunden}
          value={this.state.system.Kunde}
          placeholder={"Kunde wählen...."}
          handlechange={this._handleInput}
        />
        <Input
          inputType={"text"}
          title={"Computername"}
          name={"Computername"}
          value={this.state.system.Computername}
          placeholder={"Computername eingeben...."}
          handlechange={this._handleInput}
        />
        <Input
          inputType={"text"}
          title={"Assetnummer"}
          name={"Assetnummer"}
          value={this.state.system.Assetnummer}
          placeholder={"Assetnummer eingeben...."}
          handlechange={this._handleInput}
        />
        {/* Grunddaten */}
        <Dropdown
          title={"Status"}
          name={"Status"}
          options={this.state.status}
          value={this.state.system.Status}
          placeholder={"Status wählen"}
          handlechange={this._handleInput}
        />
        <Input
          inputType={"text"}
          title={"Lieferschein"}
          name={"LSNummer"}
          value={this.state.system.LSNummer}
          placeholder={"Lieferscheinnummer"}
          handlechange={this._handleInput}
        />
        <TextArea
          title={"Letzte Bemerkung"}
          rows={3}
          value={this.state.system.Bemerkung}
          name={"Bemerkung"}
          handlechange={this._handleInput}
          placeholder={"Bemerkung hier eingeben"}
        />

        {/* Checkliste */}
        <h2>Checkliste</h2>
        {/* Gerät in SCCM angelegt */}
        <Switch
          title="Gerät in SCCM angelegt"
          onChange={(e) => this._handleSwitchChange(e, "SCCM_Anlage")}
          checked={this.state.checkliste.SCCM_Anlage}
        />
        {/* BIOS geprüft */}
        <Switch
          title="Bios Settings"
          onChange={(e) => this._handleSwitchChange(e, "BIOS")}
          checked={this.state.checkliste.BIOS}
        />
        {/* Gerät via PXE gestartet */}
        <Switch
          title="Gerät via PXE gestartet"
          onChange={(e) => this._handleSwitchChange(e, "PXE_Start")}
          checked={this.state.checkliste.PXE_Start}
        />
        {/* Gerät via Boot Stick gestartet */}
        <Switch
          title="Gerät via Boot Stick gestartet"
          onChange={(e) => this._handleSwitchChange(e, "Bootstick_Start")}
          checked={this.state.checkliste.Bootstick_Start}
        />
        {/* Gerät mit Computernamen versehen */}
        <Switch
          title="Computername aufgeklebt"
          onChange={(e) => this._handleSwitchChange(e, "Computername")}
          checked={this.state.checkliste.Computername}
        />
        {/* Software geprüft */}
        <Switch
          title="Software geprüft falls nötig"
          onChange={(e) => this._handleSwitchChange(e, "Software")}
          checked={this.state.checkliste.Software}
        />
        {/* Bemerkung */}
        <label>
          {"Letzte Ändernung am: " + this.state.checkliste.timestamp}
        </label>
        <Input
          disabled
          inputType={"text"}
          title={"Änderungen vorgenommen von:"}
          name={"Bearbeiter"}
          value={this.state.system.Bearbeiter}
          placeholder={""}
          handlechange={this._handleInput}
        />
        {/*  */}
        <Button action={this._save} type={"primary"} title={"Speichern"} />
      </div>
    );
  }
}
export default EditSystemForm;
