/* eslint.disable */
import React, {Component} from 'react';
import "../../../../css/App.css"
import * as dgapi from '../../../../utils/API/dgapi'
import Button from '../../components/Button'
class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              }
        }

    }

    async _save(){
        var fertigeSysteme = await dgapi.getVersandReady()
        var readyText = "Versand Ready:"
        fertigeSysteme.forEach(element => {
            readyText = `${readyText}\\r${element.SN}`
        });
        console.log(readyText)
        var data2 = {
            "themeColor": "0076D7",
            "text": "Testnachricht",
            "sections": [{
                "activityTitle": "Hier könnte ihr Werbung stehen",
                "activitySubtitle": "Nachrichten Untertitel",
                "activityImage": "",
                "text": "Diese Nachricht ist von der Website versendet wirden.",
                "markdown": true
            }
            ]
        }
        dgapi.sendTeams("versandReady", data2, "Dev");

    }

    async _handleInput(e){
        e.preventDefault();
    }

  render() {
    console.log("Checklisten State: ", this.state)
        return(
            <div >
            <h2>Template</h2>
            <div className="form-group">
                <Button
                action={this._save}
                type={"primary"}
                title={"Speichern"}
                /> 
            </div>
        </div> 
        )
    }
}
export default Teams;
