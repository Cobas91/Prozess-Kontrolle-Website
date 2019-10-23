import React ,{Component} from 'react';

import Alert from 'react-bootstrap-sweetalert';

import Dropdown from '../../components/Dropdown'
import TextField from '../../components/Textfield'
import Button from '../../components/Button'
import Scanner from '../../components/BarCodeScanner'

import * as dgapi from '../../../../utils/API/dgapi'

class NewSystemForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          dropdown: null,
          input: "",
          scanner: {
            active: false,
            scanned: false
          },
          notify: {
            title: "",
            message: "",
            status: false,
            type: "default"
          }
    };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setScanner = this.setScanner.bind(this);
      this._onDetected = this._onDetected.bind(this);
    }
    async handleSubmit(event) {
        if(this.state.dropdown === null || this.state.input === null){
          this.setState({
            notify: {
              title: "Daten fehlen",
              status: true,
              message: "Bitte alle benötigten Daten eingeben",
              type: "error"

            }
          })
        }else{
            dgapi.addNewSystem(this.state)
            this.setState({
              notify: {
                title: "Erfolg",
                status: true,
                message: "Gerät hinzugefügt",
                type: "success"

              }
            })
        }
      event.preventDefault();
    }

    handleDropdown = (value) =>{
        this.setState({
            dropdown: value
        })
    }

    setScanner(){
      this.setState({
        scanner: {
          active: true
        }
      });
    }
    _onDetected(result) {
      this.setState({ 
        input: result.codeResult.code,
        scanner: {
          active: false

        }
      });
      this.forceUpdate();
    }
    render() {
      console.log("New System-Data: ",this.props.App)
      // Return with Scanner
      if(this.state.scanner.active === true){
        return (
          <div className="form-group">
            <h3>New System</h3>
            <form onSubmit={this.handleSubmit}>
                <label>Kunde</label>
                <Dropdown onSelectValue={this.handleDropdown} data={this.props.App.data}/>
                <Scanner onDetected={this._onDetected}/>
                <label>Seriennummer</label>
                <TextField className="Seriennummer" id="SN_Neu" value={this.state.input}/>
                <Button label="Speichern" onSubmit={this.handleSubmit} className="btn-success"/>
            </form>
          </div>
        )
      }//Return without Scanner
      else{
        return (
          <div className="form-group">
            <Alert
                  title={this.state.notify.title}
                  show={this.state.notify.status === true}
                  text={this.state.notify.message}
                  type={this.state.notify.type}
                  onConfirm={() => this.setState({notify: {
                    status: false,
                    title: this.state.notify.title,
                  }})}>{this.state.notify.message}

              </Alert>

            <h3>New System</h3>
            <form onSubmit={this.props.handleSubmit}>
                <label>Kunde</label>
                <Dropdown onSelectValue={this.props.handleChange} handleChange={this.props.handleChange} data={this.props.App.data} id="Kunden_Dropdown"/>
                <label>Seriennummer</label>
                <Button label="Scannen" onClick={this.setScanner} className="btn-warning" type="button"/>
                <TextField handleChange={this.props.handleChange} className="Seriennummer" id="SN_Neu" value={this.state.input}/>
                <Button label="Speichern" className="btn-success" type="submit"/>
            </form>
          </div>
        );
      }  
    }
  }
  export default NewSystemForm;