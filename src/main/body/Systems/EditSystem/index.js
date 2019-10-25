/* eslint.disable */
import React, {Component} from 'react';
import "../../../../css/App.css"

import Input from "../../components/Input"
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'

class EditSystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: false,
            system:{
              sn: null,
              bemerkung: "",
              kunde: "",
              status: ""
            },
            options:[
              "Versendet", 
              "Neu Angelegt",
              "zurückgesetzt",
              "Support Fall",
              "Support angefragt",
              "Ausgemustert",
              "Defekt",
              "DOA"
            ]
        }
        this._handleInput = this._handleInput.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e){
        e.preventDefault();
        var result = this.props.App.data.systeme.find((system) => {
            if(system.SN === this.state.system.sn){
              return system
            }
            else{
              return null
            }
        })
        console.log(result)
        this.setState(
            prevState => ({
                getData: true,
                system: result}
            ),
            () => console.log("State aktualisiert: ",this.state.system)
          );
    }
    _handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            system: {
              ...prevState.system,
              [name]: value
            }
          }),
          () => console.log("State aktualisiert: ",this.state.system)
        );
      }
    _handleTextArea(e){
      let value = e.target.value;
      this.setState({
          bemerkung: value
        },
        () => console.log("State aktualisiert: ",this.state.system)
      );
    }
    _handleFormSubmit(e){
      e.preventDefault();
      console.log("Form Submit")
    }
  render() {
    console.log("Editform State: ", this.state)
      if(this.state.getData === false){
          return(
            <div className="form-group">
                <h3>Edit System</h3>
                <div className="form-group">
                    <form onSubmit={this._handleSubmit}>
                        <Input
                        inputType={"text"}
                        title={"Seriennummer"}
                        name={"sn"}
                        value={this.state.system.sn}
                        placeholder={"Bitte Seriennummer eintragen...."}
                        handlechange={this._handleInput}
                        />
                    </form>
                </div>
            </div>
          )
      }
      return(
        <div className="form-group">
                <h2>Edit System</h2>
                <h4>Seriennummer: {this.state.system.SN}</h4>
                <h4>Hersteller: {this.state.system.Hersteller}</h4>
                <h4>Modell: {this.state.system.Modell}</h4>
                <h4>Kunde: {this.state.system.Kunde}</h4>
                <div className="form-group">
                    <form onSubmit={this._handleFormSubmit}>
                        <Dropdown
                        title={"Status"}
                        name={"status"}
                        options={this.state.options}
                        value={this.state.system.Status}
                        placeholder={"Status wählen"}
                        handleChange={this._handleInput}
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
                        title={"Bemerkung"}
                        rows={3}
                        value={this.state.system.bemerkung}
                        name={"bemerkung"}
                        handlechange={this._handleInput}
                        placeholder={"Bemerkung hier eingeben"}
                        />
                        <Button
                        action={this._handleFormSubmit}
                        type={"primary"}
                        title={"Speichern"}
                        /> 
                    </form>
                </div>
            </div>
      )
  }
}
export default EditSystemForm;
