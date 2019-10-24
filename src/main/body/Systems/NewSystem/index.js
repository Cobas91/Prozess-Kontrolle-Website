import React ,{Component} from 'react';



import Dropdown from '../../components/Dropdown'
import TextArea from '../../components/TextArea'
import Button from '../../components/Button'
import Input from "../../components/Input"

import * as dgapi from '../../../../utils/API/dgapi'

class NewSystemForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          newSystem:{
            bemerkung: "",
            kunde: "",
            sn: "",
            modell: "",
            lieferschein: ""
          },
          options: [
            "Jungheinrich",
            "Minimax",
            "NRW Bank",
            "BHL"
          ]
    };
      this._handleTextArea = this._handleTextArea.bind(this);
      this._handleClearForm = this._handleClearForm.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleInput = this._handleInput.bind(this);
      this._handleDropdown = this._handleDropdown.bind(this)
    }

    findArrayElement(array, search) {
      return array.find((element) => {
        if(element.Name === search){
          return element
        }
      })
    }
    _handleFormSubmit(e) {
      e.preventDefault();
      let newSystem = this.state.newSystem;
      dgapi.addNewSystem(newSystem)
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
        () => console.log("State Aktualisiert: ",this.state.newSystem)
      );
    }

    _handleClearForm(e) {
      e.preventDefault();
      this.setState({
        newSystem: {
          bemerkung: "",
            kunde: "",
            sn: ""
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

    _handleDropdown(e) {
      let value = this.findArrayElement(this.props.App.data.kunden, e.target.value).Kunden_ID
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
    _onKeyPress(event) {
      if (event.which === 13 /* Enter */) {
        event.preventDefault();
      }
    }
    render() {
        return (
          <div className="container-fluid" >
            <h3>New System</h3>
            <form onSubmit={this._handleFormSubmit} onKeyPress={this._onKeyPress}>
                <Input
                  inputType={"text"}
                  title={"Seriennummer"}
                  name={"sn"}
                  value={this.state.newSystem.sn}
                  placeholder={"Bitte Seriennummer eintragen...."}
                  handleChange={this._handleInput}
                />
                <Input
                  inputType={"text"}
                  title={"Modellbezeichnung"}
                  name={"modell"}
                  value={this.state.newSystem.modell}
                  placeholder={"Bitte Modell eintragen...."}
                  handleChange={this._handleInput}
                />
                <Input
                  inputType={"text"}
                  title={"Lieferschein Nummer"}
                  name={"lieferschein"}
                  value={this.state.newSystem.lieferschein}
                  placeholder={"Bitte Lieferscheinnummer eintragen...."}
                  handleChange={this._handleInput}
                />
                <Dropdown
                  title={"Kunden"}
                  name={"kunde"}
                  options={this.state.options}
                  value={this.state.newSystem.kunde}
                  placeholder={"Bitte Kunde wählen..."}
                  handleChange={this._handleDropdown}
                />
                <TextArea
                  title={"Bemerkung"}
                  rows={3}
                  value={this.state.newSystem.bemerkung}
                  name={"newSystemDescription"}
                  handleChange={this._handleTextArea}
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
        ); 
    }
  }
  export default NewSystemForm;