import React, {Component} from 'react';
import Alert from 'react-bootstrap-sweetalert';
import "../css/App.css"
import * as dgapi from '..//utils/API/dgapi'
import LoadingScreen from "./body/components/LoadingScreen"
import Body from "./body/index"

class App extends Component {
  constructor(props) {
      super(props) 
      this.state = {
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
      this._handleChange = this._handleChange.bind(this)
      this._handleSubmit = this._handleSubmit.bind(this)
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
    console.log("Submit Detected: ", event)
    event.preventDefault();
    this.setState({
      notify:{
        status: true
      }
    })
    
  }
  render() {
    console.log("App-State", this.state)
    if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" />
    return (
        <div>
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
          <Body App={this.state} handleChange={this._handleChange} handleSubmit={this._handleSubmit}/>
        </div>
      )

  }
}

export default App;
