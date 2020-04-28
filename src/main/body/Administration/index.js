/* eslint.disable */
import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'
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
    async _startUpdate(){
        this.props.setAlert(
            {  
                title: "Update wird ausgeführt",
                message: `Die Datenbank wird aktualisiert, das kann einen moment dauern.....`,
                status: true,
                type: "success"
            }
        )
        await dgapi.startKHKImport_Lagerbestand()
        this.props.updateApp()
        
    }
    async _handleInput(e){
        e.preventDefault();
    }

  render() {
    console.log("Admin State: ", this.state)
        return(
            <div >
            <SweetAlert title={this.props.App.notify.title} onConfirm={this.props.hideAlert} showCancel onCancel={this.props.hideAlert} show={this.props.App.notify.status} type={this.props.App.notify.type}>
              {this.props.App.notify.message}
            </SweetAlert>
            <h2>Admin Panel</h2>
            <div className="form-group">
                <label>Datenbank aktualisieren</label>
                <Button
                action={()=> {this._startUpdate()}}
                type={"primary"}
                title={"Aktualisieren"}
                />
            </div>
            
            </div> 
        )
    }
}
export default AdminPanel;
