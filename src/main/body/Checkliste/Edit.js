/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import SweetAlert from 'react-bootstrap-sweetalert'

import Switch from '../../body/components/Switch.js';
import Input from '../../body/components/Input.js'
import TextArea from '../../body/components/TextArea.js'
import Button from '../../body/components/Button.js'

import * as dgapi from '../../../utils/API/dgapi'


class ChecklistenEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SN: this.props.SN,
            Input:{
                Seriennummer: this.props.SN,
                SCCM_Anlage: false,
                PXE_Start: false,
                Bootstick_Start: false,
                Bemerkung: "",
                Computername: false,
                Software: false,
                BIOS: false
            },
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default",
                okButton: "Ja, speichern!",
                cancleButton: "Nein, ich überlege nochmal..."
              }
        }
        this._handleSwitchChange = this._handleSwitchChange.bind(this)
        this._handleInput = this._handleInput.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._hideAlert = this._hideAlert.bind(this)
        this._save = this._save.bind(this)
        this._cancelAlert = this._cancelAlert.bind(this)
    }

    _handleSubmit(e){
        e.preventDefault();
        
        

    }

    _handleInput(e){
        let name = e.target.name
        let value = e.target.value
        this.setState(
            prevState => ({
                Input:{
                    ...prevState.Input,
                    [name]: value
                }
            }
            )
          );
    }
    _handleSwitchChange(value, Name){
        this.setState(
            prevState => ({
                Input:{
                    ...prevState.Input,
                    [Name]: value
                }
            }
            )
          );

    }
    _hideAlert(){
        this.setState(
            prevState => ({
                ...prevState,
                notify:{         
                    title: "",
                    message: "",
                    status: false,
                    type: "default"
                  }
            }
            )
          );
    }

    async _save(){
        if(!this.state.Input.Seriennummer){
            this.setState(
                prevState => ({
                    ...prevState,
                    notify:{         
                        title: "Bitte Seriennummer eingeben",
                        message: "Keine Seriennummer gefunden",
                        status: true,
                        type: "warning",
                        okButton: "Ja, is ja gut...!",
                        cancleButton: "Mach die Augen auf!"
                      }
                }
                )
              );
        }else{
            this.setState(
                prevState => ({
                    ...prevState,
                    notify:{         
                        title: "S/N: "+this.state.Input.Seriennummer,
                        message: "Das Gerät "+this.state.Input.Seriennummer+" speichern?",
                        status: true,
                        type: "default",
                        okButton: "Ja, speichern!",
                        cancleButton: "Nein, ich überlege nochmal...",
                        onConfirm: dgapi.addChecklisteToSystem(this.state.Input)
                      }
                }
                )
              );
        }
    }
    _cancelAlert(){
        this.setState(
            prevState => ({
                ...prevState,
                notify:{         
                    title: "",
                    message: "",
                    status: false,
                    type: "default"
                  }
            }
            )
          );
    }
  render() {
    console.log("Checklisten State: ", this.state)
        return(
            <div >
            <SweetAlert custom showCancel title={this.state.notify.title} customIcon={this.state.notify.icon} confirmBtnText={this.state.notify.okButton} cancelBtnText={this.state.notify.cancleButton} onCancel={this._cancelAlert} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
            </SweetAlert>
            <h2>Checkliste</h2>
                    {/* Gerät in SCCM angelegt */}
                    <Switch  title="Gerät in SCCM angelegt" onChange={(e) => this._handleSwitchChange(e, "SCCM_Anlage")} checked={this.state.Input.SCCM_Anlage} />
                    {/* BIOS geprüft */}
                    <Switch  title="Bios Settings" onChange={(e) => this._handleSwitchChange(e, "BIOS")} checked={this.state.Input.BIOS} />
                    {/* Gerät via PXE gestartet */}
                    <Switch  title="Gerät via PXE gestartet" onChange={(e) => this._handleSwitchChange(e, "PXE_Start")} checked={this.state.Input.PXE_Start} />
                    {/* Gerät via Boot Stick gestartet */}
                    <Switch  title="Gerät via Boot Stick gestartet" onChange={(e) => this._handleSwitchChange(e, "Bootstick_Start")} checked={this.state.Input.Bootstick_Start} />
                    {/* Gerät mit Computernamen versehen */}
                    <Switch  title="Computername aufgeklebt" onChange={(e) => this._handleSwitchChange(e, "Computername")} checked={this.state.Input.Computername} />
                    {/* Software geprüft */}
                    <Switch  title="Software geprüft falls nötig" onChange={(e) => this._handleSwitchChange(e, "Software")} checked={this.state.Input.Software} />
                    {/* Bemerkung */}
                    <TextArea
                    title={"Bemerkung"}
                    rows={3}
                    value={this.state.Input.Bemerkung}
                    name={"Bemerkung"}
                    handlechange={this._handleInput}
                    placeholder={"Bemerkung hier eingeben"}
                    />
                    <Button
                    action={this._save}
                    type={"primary"}
                    title={"Checkliste Speichern"}
                    /> 
        </div> 
        )
    }
}
export default ChecklistenEdit;
