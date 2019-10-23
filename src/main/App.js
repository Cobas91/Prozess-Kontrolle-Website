import React, {Component} from 'react';
import "../css/App.css"
import * as dgapi from '..//utils/API/dgapi'
import LoadingScreen from "./body/components/LoadingScreen"
import Body from "./body/index"

class App extends Component {
  constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
        loading: true,
        data: {
          systeme: {},
          kunden: {}
        }
      }
      this._handleChange = this._handleChange.bind(this)
  }
  async componentDidMount(){
    var kunden = {}
    var systeme = {}
      await dgapi.getAllKunden().then(async (responseKunden)=>{
      kunden = responseKunden
    }).then(async ()=>{
        await dgapi.getAllSystems().then((responseSysteme)=>{
        systeme = responseSysteme
          this.setState({ 
            data: {
              systeme: systeme,
              kunden: kunden
            },         
            loading: false
          })
      }) 
    })
  }
  _handleChange(event){
      var change = {}
      Object.assign(change,{[event.id]: { value: event.value}})
      this.setState({
        change: change
      })
  }
  _handleSubmit(event){

    event.preventDefault();
  }
  render() {
    console.log("App-State", this.state)
    if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" />
    return (
        <div>
          <Body App={this.state} handleChange={this._handleChange} handleSubmit={this._handleSubmit}/>
        </div>
      )

  }
}

export default App;
