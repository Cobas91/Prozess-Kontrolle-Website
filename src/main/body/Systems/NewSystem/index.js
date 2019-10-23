import React ,{Component} from 'react';



import Dropdown from '../../components/Dropdown'
import TextField from '../../components/Textfield'
import Button from '../../components/Button'
//import Scanner from '../../components/BarCodeScanner'


class NewSystemForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          dropdown: null,
          input: "",
    };
      this._handleSubmit = this._handleSubmit.bind(this);
      this.setScanner = this.setScanner.bind(this);
      this._onDetected = this._onDetected.bind(this);
    }
    _handleSubmit(event) {
      this.props.handleSubmit()
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
        return (
          <div className="form-group">
            <h3>New System</h3>
            <form onSubmit={this.props.handleSubmit}>
                <label>Kunde</label>
                <Dropdown onSelectValue={this.props.handleChange} handleChange={this.props.handleChange} data={this.props.App.data} id="Kunden_Dropdown"/>
                <label>Seriennummer</label>
                <TextField handleChange={this.props.handleChange} className="Seriennummer" id="SN_Neu" value={this.state.input}/>
                <Button label="Speichern" className="btn-success" type="submit"/>
            </form>
          </div>
        ); 
    }
  }
  export default NewSystemForm;