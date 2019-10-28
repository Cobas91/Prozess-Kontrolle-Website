/* eslint.disable */
import React, { Component } from 'react';
import "../css/App.css"
import * as dgapi from '../utils/API/dgapi'
import LoadingScreen from "./body/components/LoadingScreen"
import Body from "./body/index"
import devData from "../utils/API/devData"

class App extends Component {

  constructor(props) {
      super(props) 
      this.state = {
        devMode: false,    //Entwickler Modus -> Entwickler Daten
        loading: true,    //Loadingscreen anzeigen?
        notify:{          //Object für die Benachrichtigung
            title: "",
            message: "",
            status: false,
            type: "default"
        },
        data: {
          systeme: {},
          kunden: {}
        }
      }
        this._handleSubmit = this._handleSubmit.bind(this)
    }
    async componentDidMount() {
        if (this.state.devMode === true) {
            this.setState({
                loading: false,
                data: {
                    systeme: devData.systeme,
                    kunden: devData.kunden
                }
            })
        } else {
            var data = await dgapi.getAllData()
            this.setState({
              data:{
                systeme: data.systeme,
                kunden: data.kunden
              },
              loading: false
            })
        }  
    }
  _handleSubmit(event){
    console.log("Submit Detected: ", event)
    event.preventDefault();
    this.setState({
      notify:{
        status: true
      }
    })
  }
  render() {
    //Error´s ausblenden
    console.error = () =>{}
    console.log("App-State", this.state)
    if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" />
    return (
        <div>
          <Body App={this.state} />
        </div>
      )
    }
}

export default App;