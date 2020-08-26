/* eslint.disable */
import React, { Component } from "react";
import "../../../../css/App.css";
import * as dgapi from "../../../../utils/API/dgapi";
import Button from "../../components/Button";
class ClearDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    };
  }

  async _clearDB() {
    console.log(await dgapi.clearUpDatabase());
  }

  async _handleInput(e) {
    e.preventDefault();
  }

  render() {
    console.log("Checklisten State: ", this.state);
    return (
      <div>
        <h2>ClearUpDatabase</h2>
        <label>
          Bereinigung der Datenbank anhand einer Datei! Diese Datei muss 100%
          korrekt sein! Alle Einträge in der Datenbank werden anhand dieser
          Datei überschrieben!
        </label>
        <div className="form-group">
          <Button action={this._clearDB} type={"primary"} title={"Starten"} />
        </div>
      </div>
    );
  }
}
export default ClearDB;
