/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import * as functions from '../../../utils/functions'
import SweetAlert from 'react-bootstrap-sweetalert'
import 'react-dropdown/style.css'

import * as dgapi from '../../../utils/API/dgapi'


import Input from "../components/Input"
import TextArea from '../components/TextArea'
import Dropdown from 'react-dropdown'
import Button from "../components/Button"

// import Dropdown from 'react-dropdown'
class ChecklisteEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
            },
            system: functions.findSystemWithSN(this.props.App.data.systeme, this.props.seriennummer),
        }
        this._handleNewInput = this._handleNewInput.bind(this)
        this._keinKundeGefunden = this._keinKundeGefunden.bind(this)
        this._hideAlert = this._hideAlert.bind(this)
        this._handleDropdownInput = this._handleDropdownInput.bind(this)
        this._onChangeInput = this._onChangeInput.bind(this)
        this._handleFormSubmit = this._handleFormSubmit.bind(this)
    }

    _handleFormSubmit(e){
        e.preventDefault();
        console.log(this.state)
        dgapi.addChecklistenAttributForSN(this.state.system);
        this.props.updateApp()

    }

    _handleDropdownInput(e){
        var name = e.value
        var value = e.label
        this.setState(
            prevState => ({
              system: {
                ...prevState.system,
                checkliste:{
                    ...prevState.system.checkliste,
                    [name]: value
                }
              }
            })
          );
    }

    _handleNewInput(e){
        this.setState({
            system: functions.findSystemWithSN(this.props.App.data.systeme, e.target.value)
        })
    }
    _onChangeInput(e){
        var name = e.target.name
        var value = e.target.value
        this.setState(
            prevState => ({
              system: {
                ...prevState.system,
                checkliste:{
                    ...prevState.system.checkliste,
                    [name]: value
                }
              }
            })
          );
          
    }
    _checkDropDownValue(name){
        try {
            if(this.state.checkliste[name]){
                return this.state.checkliste[name]
            }
        } catch (error) {
            return "Bitte wählen...."
        }
        
        
    }
    _renderFields(kundenName){
        var ergebnis = []
        var kunde = functions.findKundeWithName(this.props.App.data.kunden, kundenName)
        var attributes = functions.findChecklistAttributWithID(this.props.App.data.checklistenTemplate, kunde[0].Kunden_ID)
        attributes.forEach(element => {
            var type = element.Att_Typ
            if(type === "Input"){
                ergebnis.push(<Input handlechange={this._onChangeInput} name={element.Att_Name} title={element.Att_Name}/>)
            }
            if(type === "Dropdown"){
                const options = [
                    {
                        value: element.Att_Name,
                        label: "Ja",
                    },
                    {
                        value: element.Att_Name,
                        label: "Nein",
                    }
                ]
                ergebnis.push(<label>{element.Att_Name}</label>)
                ergebnis.push(<Dropdown options={options} onChange={this._handleDropdownInput} name={element.Att_Name} title={element.Att_Name} value={this._checkDropDownValue(element.Att_Name)} placeholder="Bitte auswählen..."/>)
            }
        });
        //Bemerkungsfeld
        ergebnis.push(
            <TextArea
            title={"Bemerkung"}
            rows={3}
            name={"Bemerkung"}
            handlechange={this._onChangeInput}
            placeholder={"Bemerkung hier eingeben"}
            />
        )
        //Submit Button
        ergebnis.push(
        <Button
        action={this._handleFormSubmit}
        type={"primary"}
        title={"Speichern"}
        />
        ) 
        return ergebnis
    }
    _keinKundeGefunden(){
        this.setState({
            notify:{         
                title: "Kein Kunde gefunden!",
                message: "Wenn dem Gerät kein Kunde zugewiesen ist kann keine Checkliste ausgefüllt werden",
                status: true,
                type: "default"
            }
        })
    }
    _hideAlert(){
        this.setState({
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
            },
            system: []
        })
    }
  render() {
    console.log("Checklisten State: ", this.state)
    if(this.state.system.length <= 0 ){
        return(
            <div className="form-group">
                    <form onSubmit={this._handleSubmit}>
                        <Input
                        inputType={"text"}
                        title={"Seriennummer"}
                        name={"SN"}
                        value={this.state.system.SN}
                        placeholder={"Bitte Seriennummer eintragen...."}
                        handlechange={this._handleNewInput}
                        />
                    </form>
            </div>
        )
    }else{
        if(this.state.system[0].Kunde === "Unbekannt" && this.state.notify.status === false){
            this._keinKundeGefunden();
        }
        return(
            <div>
                <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
                {this.state.notify.message}
                </SweetAlert>
                <h2>Checkliste für {this.state.system[0].Kunde}</h2>
                <p>Kunde: {this.state.system[0].Kunde}</p>
                <p>Seriennummer: {this.state.system[0].SN}</p>
                <p>Modell: {this.state.system[0].Modell}</p>
                <div className="form-group">
                    <form onSubmit={this._handleSubmit}>
                        {this._renderFields(this.state.system[0].Kunde)}
                    </form>
                </div>
            </div>
        )
    }      
    }
}
export default ChecklisteEdit;
