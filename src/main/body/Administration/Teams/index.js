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
            "text": "Text",
            "sections": [{
                "activityTitle": "Folgende Geräte sind Versandbereit",
                "activitySubtitle": "Geräte an den Versand zur Kommisionierung übergeben.",
                "activityImage": "https://image.flaticon.com/icons/png/512/1932/1932893.png",
                "text": readyText,
                "markdown": true
            }
            ]
        }
        var result = await dgapi.sendTeams("versandReady", data2, "Dev");

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
