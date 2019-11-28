/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import * as functions from '../../../utils/functions'
import SweetAlert from 'react-bootstrap-sweetalert'
import 'react-dropdown/style.css'

import Input from "../components/Input"
import TextArea from '../components/TextArea'
import DropdownOld from '../components/Dropdown'
import Dropdown from 'react-dropdown'
// import Dropdown from 'react-dropdown'
class ChecklisteNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
            },
            usedKunde: null
        }
        this._handleInputDropdown = this._handleInputDropdown.bind(this)
    }

    _handleSubmit(e){
        

    }

    async _handleInput(e){
        e.preventDefault();
    }
    _onSelectDropdown(e){
        console.log(e.target)
    }
    async _handleInputDropdown(e){
        console.log("target",e.target.value)
        var kundenName = e.target.value;
        var ergebnisKunde = functions.findArrayElementByName(this.props.App.data.kunden, kundenName);
        var ergebnisCheckliste = functions.findChecklistAttributWithID(this.props.App.data.checklistenTemplate, ergebnisKunde.Kunden_ID)

        this.setState({
            usedKunde: ergebnisKunde.Kunden_ID,
            checkListenAttribute: ergebnisCheckliste

        });
        
        e.preventDefault();
    }

    _renderFields(){
        var ergebnis = []
        this.state.checkListenAttribute.forEach(element => {
            const options = [
                {
                    value: "1",
                    label: "Ja"
                },
                {
                    value: "0",
                    label: "Nein"
                }
            ]
            ergebnis.push(
                <div>
                <label>{element.Att_Name}</label>
                <Dropdown options={options} onChange={this._onSelectDropdown} placeholder="Bitte wählen...." />
                </div> 
            ) 
        })
        ergebnis.push(
            <TextArea
            title={"Bemerkung"}
            rows={3}
            value={""}
            name={"checkListenBemerkung"}
            handlechange={this._handleTextArea}
            placeholder={"Bemerkung hier eingeben"}
            />
        )
        return ergebnis
    }
  render() {
    console.log("Checklisten State: ", this.state)
        if(this.state.usedKunde == null){
            return(
            <div >
            <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
            </SweetAlert>
            <h2>Checkliste New</h2>
            <div className="form-group">
                <form onSubmit={this._handleSubmit}>
                        <DropdownOld
                        title={"Kunde"}
                        name={"Kunde"}
                        options={this.props.App.data.kunden}
                        value={this.state.usedKunde}
                        placeholder={"Kunde wählen...."}
                        handlechange={this._handleInputDropdown}
                        />
                </form>
            </div>
        </div> 
        )
    }else{
        return(
            <div>
                <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
                {this.state.notify.message}
                </SweetAlert>
                {/* <h2>Checkliste für {this.props.App.data.kunden}</h2> */}
                <div className="form-group">
                    <form onSubmit={this._handleSubmit}>
                        {this._renderFields()}
                    </form>
                </div>
            </div>
        )
    }
    }
}
export default ChecklisteNew;
