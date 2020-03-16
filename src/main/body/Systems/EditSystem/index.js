/* eslint.disable */
import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'

import * as dgapi from '../../../../utils/API/dgapi'

import Input from "../../components/Input"
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Dropdown from '../../components/Dropdown'
import Accordion from '../../components/Accordion'
import Checkliste from '../../Checkliste'

class EditSystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: false,   //Steuert die anzeige, ob nur SN zu sehen ist.
            system:{
              SN: this.props.sn
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
        this._reset = this._reset.bind(this);
    }
    componentDidMount(){
      if(this.props.sn !== ""){
        this.setState({
          system: this.props.sn,
        })
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
          }else{
            this.props.setAlert({  
              title: "Nicht gefunden",
              message: `Seriennummer ${this.state.system.SN} konnte nicht gefunden werden`,
              status: true,
              type: "error"
            })
            return null
          }
      })
      }
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
              this.props.setAlert({  
                  title: "Nicht gefunden",
                  message: `Seriennummer ${this.state.system.SN} konnte nicht gefunden werden`,
                  status: true,
                  type: "error"
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

    _reset(){
      this.setState({
        getData: false,
        system:{
          SN: null
        }
      })
    }
  render() {
      if(this.state.getData === false){
          return(
            <div className="form-group">
              <SweetAlert title={this.props.App.notify.title} onConfirm={this.props.hideAlert} showCancel onCancel={this.props.hideAlert} show={this.props.App.notify.status} type={this.props.App.notify.type}>
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
          )
      }
      return(
        <div >
                <h2>Edit System</h2>
                <Button
                  action={this._reset}
                  type={"error"}
                  title={"Neues Gerät"}
                />
                <div className="jumbotron">
                <p>Seriennummer: {this.state.system.SN}</p>
                <p>Modell: {this.state.system.Modell}</p>
                <p>KHK Lager: {this.state.system.Lager_KHK}</p>
                <Accordion name="Bemerkungen anzeigen" sn={this.state.system.ID}/>
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
                <div className="form-group">
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
                        <Button
                        action={this._handleFormSubmit}
                        type={"primary"}
                        title={"Grunddaten Speichern"}
                        /> 
                </div>
              <Checkliste SN={this.state.system.SN} {...this.props}/>
            </div>
      )
  }
}
export default EditSystemForm;
