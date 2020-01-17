/* eslint.disable */
import React, { Component } from 'react';
import "../css/App.css"
import * as dgapi from '../utils/API/dgapi'
import LoadingScreen from "./body/components/LoadingScreen"
import Body from "./body/index"
import Footer from "./footer/index"

class App extends Component {

  constructor(props) {
      super(props) 
      this.state = {
        Version: "1.0",
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
        this._updateApp = this._updateApp.bind(this)
        this._toggleMenu = this._toggleMenu.bind(this)
        this._toggleMobile = this._toggleMobile.bind(this)
    }

    async componentDidMount() {
            var data = await dgapi.getAllData()
            var mobile = false
            var isOpen = true
            if(window.innerWidth <= 900){
              mobile = true
              isOpen = false
            }
            this.setState({
              data:{ 
                systeme: data.systeme,
                kunden: data.kunden,
                status: data.status
              },
              auswertung:{
                checklisten: data.auswertung.checklisten
              },
              window: {
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                isOpen: isOpen,
                mobile: mobile
              },
              loading: false
            })  
    }
  _updateApp(){
    this.componentDidMount()
  }
  _toggleMobile(){
    this.setState({
      mobile: !this.state.mobile
    })
  }
  _toggleMenu(){
    this.setState({
      isOpen: !this.isOpen
    })
  }
  render() {
    // setTimeout(() => {
    //   this.componentDidMount()
    // }, 5000);
    //Error´s ausblenden
    console.warning = () =>{}
    console.error = () =>{}
    // console.log = () =>{}
    console.log("App-State", this.state)
    if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" />
    return (
        <div className="container-fluid">
          <Body App={this.state} toggleMobile={this._toggleMobile} toggleMenu={this._toggleMenu} updateApp={this._updateApp}/>
          <Footer App={this.state}/>
        </div>
      )
    }
}

export default App;