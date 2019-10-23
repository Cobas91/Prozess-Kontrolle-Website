import React, {Component} from 'react';
import "../../../../css/App.css"
import TextField from '../../components/Textfield'
import Button from '../../components/Button'


class EditSystemForm extends Component {

    // _handleSubmit(event) {
    //     this.props.handleSubmit(event.target)
    //     event.preventDefault();
    // }

  render() {
      return(
        <div className="form-group">
            <h3>Edit System</h3>
            <div className="form-group">
                <form onSubmit={this.props.handleSubmit}>
                    <label>Seriennummer</label>
                    <TextField className="Seriennummer" id="SN_Edit" placeholder="Bitte Seriennummer eingeben" handleChange={this.props.handleChange}/>
                    <Button label="Speichern" type="submit" className="btn-success"/>
                </form>
            </div>
        </div>
      )
  }
}

export default EditSystemForm;
