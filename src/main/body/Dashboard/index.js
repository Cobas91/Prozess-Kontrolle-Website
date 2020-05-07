import React ,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'
import EditSystemForm from "../Systems/EditSystem/index"
import NewSystemForm from "../Systems/NewSystem/index"
import ReadMe from "../components/ReadMe"
import Input from "../components/Input"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readme:{
              manual: ["Dropdown Filter in Übersicht eingefügt"]
            },
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              },
              system:{
                SN: ""
              }
        }
        this._handleInput = this._handleInput.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._reset = this._reset.bind(this)
        this._addNewSystem = this._addNewSystem.bind(this)
    }
      
      _handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            system: {
              ...prevState.system,
              [name]: value
            }
          }),
          () => console.log("Dashboard State aktualisiert: ", this.state)
        );
      }
      _reset(){
        this.props.hideAlert({})
      }
      _addNewSystem(){
        this.props.hideAlert({})
        this.props.setSite("newsystem", {SN: this.state.system.SN})
      }
      _handleSubmit(e){
        e.preventDefault();
        var result = this.props.App.data.systeme.find((system) => {
            if(system.SN.toLowerCase() === this.state.system.SN.toLowerCase()){
              this.props.setSite("editsystem", {SN: system.SN})
              return null
            }
            else{
              this.props.setAlert(
                {
                  title: "Gerät anlegen?",
                  message: `Möchten sie das Gerät mit der Seriennummer ${this.state.system.SN} anlegen?`,
                  status: true,
                  type: "default"
                }
              )
            }
            return null
        })
        if(result){
          try {
            console.log(result)
          } catch (error) {
            //Write error in Log
          }
        }
    }
    _handleAccordion(){
      if(this.state.isOpen === true){
          this.setState({isOpen: false})
      }else{
          this.setState({isOpen: true})
      }
    }
    render() {
        return (
          <div>
            <h2>Dashboard</h2>
            <ReadMe buttonName="New Features" note={this.state.readme.manual}/>
            <SweetAlert title={this.props.App.notify.title} onConfirm={this._addNewSystem} showCancel onCancel={this._reset} show={this.props.App.notify.status} type={this.props.App.notify.type}>
            {this.props.App.notify.message}
            </SweetAlert>
            <form onSubmit={this._handleSubmit}>
              <Input
                inputType={"text"}
                title={"Seriennummer"}
                name={"SN"}
                value={this.state.system.SN}
                placeholder={"Bitte Seriennummer eintragen...."}
                handlechange={this._handleInput}
              />
            </form>
          </div>
        );
      }
  }
  export default Dashboard;