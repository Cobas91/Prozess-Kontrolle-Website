import React ,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'


import Dropdown from '../../components/Dropdown'
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Input from "../../components/Input"

import * as dgapi from '../../../../utils/API/dgapi'


class NewSystemForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
          statusInsert: "",
          newSystem:{
            bemerkung: "",
            kunde: "",
            sn: this.props.App.workData.SN,
            modell: "",
            lieferschein: "",
            hersteller:""
          },
          options: this.props.App.data.kunden,
          notify:{          //Object für die Benachrichtigung
            title: "",
            message: "",
            status: false,
            type: "default"
        },
    };
      this._handleTextArea = this._handleTextArea.bind(this);
      this._handleClearForm = this._handleClearForm.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInput = this._handleInput.bind(this);

    }
    
    async _handleFormSubmit(e) {
      e.preventDefault();
      let newSystem = this.state.newSystem;
      await dgapi.addNewSystem(newSystem).then((anfrage)=>{
        if(anfrage.result.statusCode === 400){
          this.props.setAlert({
            title: "Fehler...",
            message: anfrage.result.message,
            type: "error",
            status: true
          })
        }else{
          this.props.setAlert({
            title: "Erfolg",
            message: "Gerät wurde erfolgreich hinzugefügt.",
            type: "success",
            status: true
          })
          //TODO Nach anlage in Edit Fenster gehen
          //this.props.setSite("editsystem", {SN: this.props.App.workData.SN})
          this.props.updateApp()
        }
        setTimeout(() => {
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
        }, 2000);
      })

    }

    _handleTextArea(e) {
      let value = e.target.value;
      this.setState(
        prevState => ({
          newSystem: {
            ...prevState.newSystem,
            bemerkung: value
          }
        }),
        () => console.log("NewSystemFormState State Aktualisiert: ",this.state)
      );
    }

    _handleClearForm(e) {
      e.preventDefault();
      this.setState({
        newSystem: {
          bemerkung: "",
          kunde: "",
          sn: null,
          modell: "",
          lieferschein: "",
          hersteller:""
        }
      });
    }

    _handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState(
        prevState => ({
          newSystem: {
            ...prevState.newSystem,
            [name]: value
          }
        }),
        () => console.log(this.state.newSystem)
      );
    }
    //Abfangen wenn Enter gedrückt wird
    _onKeyPress(event) {
      if (event.which === 13 /* Enter */) {
        event.preventDefault();
      }
    }
    render() {
        return (
          <div >
            <SweetAlert title={this.props.App.notify.title} onConfirm={this.props.hideAlert} showCancel onCancel={this._reset} show={this.props.App.notify.status} type={this.props.App.notify.type}>
              {this.props.App.notify.message}
            </SweetAlert>
            <div className="container-fluid" >
              <h2>New System</h2>
              <form onSubmit={this._handleFormSubmit} onKeyPress={this._onKeyPress}>
                  <Input
                    inputtype={"text"}
                    title={"Seriennummer"}
                    name={"sn"}
                    value={this.state.newSystem.sn}
                    placeholder={"Bitte Seriennummer eintragen...."}
                    handlechange={this._handleInput}
                  />
                  <Input
                    inputtype={"text"}
                    title={"Hersteller"}
                    name={"hersteller"}
                    value={this.state.newSystem.hersteller}
                    placeholder={"Bitte Hersteller eintragen...."}
                    handlechange={this._handleInput}
                  />
                  <Input
                    inputtype={"text"}
                    title={"Modellbezeichnung"}
                    name={"modell"}
                    value={this.state.newSystem.modell}
                    placeholder={"Bitte Modell eintragen...."}
                    handlechange={this._handleInput}
                  />
                  <Input
                    inputtype={"text"}
                    title={"Lieferschein Nummer"}
                    name={"lieferschein"}
                    value={this.state.newSystem.lieferschein}
                    placeholder={"Bitte Lieferscheinnummer eintragen...."}
                    handlechange={this._handleInput}
                  />
                  <Dropdown
                    title={"Kunden"}
                    name={"kunde"}
                    options={this.state.options}
                    value={this.state.newSystem.kunde}
                    placeholder={"Bitte Kunde wählen..."}
                    handlechange={this._handleInput}
                  />
                  <TextArea
                    title={"Bemerkung"}
                    rows={3}
                    value={this.state.newSystem.bemerkung}
                    name={"newSystemDescription"}
                    handlechange={this._handleTextArea}
                    placeholder={"Bemerkung hier eingeben"}
                  />  
                    <Button
                    action={this._handleFormSubmit}
                    type={"primary"}
                    title={"Speichern"}
                    />
                    <Button
                    action={this._handleClearForm}
                    type={"secondary"}
                    title={"Clear"}
                    />           
              </form>
            </div>
          </div>
        ); 
    }
  }
  export default NewSystemForm;