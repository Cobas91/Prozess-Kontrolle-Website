/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import Button from '../components/Button'
import * as dgapi from '../../../utils/API/dgapi'


class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }

    }

    async _handleInput(e){
        e.preventDefault();
    }

  render() {
    console.log("Admin State: ", this.state)
        return(
            <div >
            <h2>Admin Panel</h2>
            <div className="form-group">
                <label>Datenbank aktualisieren</label>
                <Button
                action={()=> {dgapi.startKHKImport_Lagerbestand()}}
                type={"primary"}
                title={"Aktualisieren"}
                />
            </div>
            
            </div> 
        )
    }
}
export default AdminPanel;
