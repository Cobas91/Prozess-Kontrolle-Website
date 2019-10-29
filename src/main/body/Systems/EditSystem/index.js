/* eslint.disable */
import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'

import * as dgapi from '../../../../utils/API/dgapi'

import Input from "../../components/Input"
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'

class EditSystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: false,   //Steuert die anzeige, ob nur SN zu sehen ist.
            system:{
              SN: ""
            },
            status:this.props.App.data.status,
            kunden: this.props.App.data.kunden,
            notify:{          //Object für die Benachrichtigung
              title: "",
              message: "",
              status: false,
              type: "default"
            },
        }
        this._handleInput = this._handleInput.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
        this._hideAlert = this._hideAlert.bind(this)
    }

    _handleSubmit(e){
        e.preventDefault();
        var result = this.props.App.data.systeme.find((system) => {
            if(system.SN === this.state.system.SN){
              this.setState(
                prevState => ({
                    getData: true,
                    system: result}
                ),
                () => console.log("Editform  State aktualisiert: ",this.state.system)
              );
              return system
            }
            else{
              this.setState({
                notify:{  
                  title: "Nicht gefunden",
                  message: `Seriennummer ${this.state.system.SN} konnte nicht gefunden werden`,
                  status: true,
                  type: "error"
              },
              })
              return null
            }
        })

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
          () => console.log("Editform State aktualisiert: ",this.state.system)
        );
      }
    _handleTextArea(e){
      let value = e.target.value;
      this.setState({
          bemerkung: value
        },
        () => console.log("Editform State aktualisiert: ",this.state.system)
      );
    }
    async _handleFormSubmit(e){
      e.preventDefault();

      await dgapi.updateSystem(this.state.system)
      this.props.updateApp()
      
    }

    _hideAlert(){
      this.setState(
        prevState => ({
          notify: {
            title: "",
            message: "",
            status: false,
            type: "default"
          }
        }),
        () => console.log(this.state)
      );      
    }
  render() {
    console.log("Editform State: ", this.state)
      if(this.state.getData === false){
          return(
            <div className="form-group">
              <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
              </SweetAlert>
                <h3>Edit System</h3>
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
          )
      }
      return(
        <div className="form-group">
                <h2>Edit System</h2>
                <h4>Seriennummer: {this.state.system.SN}</h4>
                <h4>Modell: {this.state.system.Modell}</h4>
                <h4>KHK Lager: {this.state.system.Lager_KHK}</h4>
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
                <div className="form-group">
                    <form onSubmit={this._handleFormSubmit}>
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
                        title={"Bemerkung"}
                        rows={3}
                        value={this.state.system.Bemerkung}
                        name={"Bemerkung"}
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
