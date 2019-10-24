import React, {Component} from 'react';
import "../../../../css/App.css"

import Input from "../../components/Input"
import TextArea from '../../components/TextArea'


class EditSystemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getData: false,
            system:{
              sn: "",
              bemerkung: "",
              kunde: ""
            }
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
  render() {
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
                        handleChange={this._handleInput}
                        />
                    </form>
                </div>
            </div>
          )
      }
      return(
        <div className="form-group">
                <h3>Edit System S/N: {this.state.system.SN}</h3>
                <h4>Kunde: {this.props.App.data.kunden[this.state.system.Kunden_ID-1].Name}</h4>
                <div className="form-group">
                    <form onSubmit={this._handleInput}>
                        <Input
                        inputType={"text"}
                        title={"Lieferschein"}
                        name={"LSNummer"}
                        value={this.state.system.LSNummer}
                        placeholder={"Lieferscheinnummer"}
                        handleChange={this._handleInput}
                        />
                        <TextArea
                        title={"Bemerkung"}
                        rows={3}
                        value={this.state.system.bemerkung}
                        name={"newSystemDescription"}
                        handleChange={this._handleTextArea}
                        placeholder={"Bemerkung hier eingeben"}
                        /> 
                    </form>
                </div>
            </div>
      )
  }
}

export default EditSystemForm;
