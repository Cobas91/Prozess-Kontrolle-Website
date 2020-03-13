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
              manual: ["Wenn das System bereits in der Datenbank zu finden ist wird das Editierfenster geladen.", "Falls das System nicht im System gefunden wird, kann nach bestätigung das System angelegt werden."]
            },
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              },
              system:{
                SN: ""
              },
              side:{
                dashboard: true,
                editform: false,
                newform: false
              }
        }
        this._hideAlert = this._hideAlert.bind(this)
        this._handleInput = this._handleInput.bind(this)
        this._handleSubmit = this._handleSubmit.bind(this)
        this._reset = this._reset.bind(this)
    }

    _hideAlert(){
        this.setState({
            notify: {
              title: "",
              message: "",
              status: false,
              type: "default"
            },
            side: {
              dashboard: false,
              editform: false,
              newform: true
            }
          },
        );      
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
          () => console.log("Dashboard State aktualisiert: ", this.props)
        );
      }
      _reset(){
        this.setState(
          prevState => ({
            ...prevState,
            notify: {         
              title: "",
              message: "",
              status: false,
              type: "default"
            },
            side: {
              dashboard: true,
              editform: false,
              newform: false
            }
          })
        )
      }
      _handleSubmit(e){
        e.preventDefault();
        var result = this.props.App.data.systeme.find((system) => {
            if(system.SN === this.state.system.SN){
              this.setState(
                prevState => ({
                  ...prevState,
                  side: {
                    dashboard: false,
                    editform: true,
                    newform: false
                  }
                })
              )
            }
            else{
              this.setState(
                prevState => ({
                  ...prevState,
                  notify: {
                    title: "Gerät anlegen?",
                    message: `Möchten sie das Gerät mit der Seriennummer ${this.state.system.SN} anlegen?`,
                    status: true,
                    type: "default"
                  }
                })
              )
            }
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
      if(this.state.side.dashboard){
        return (
          <div>
            <h2>Dashboard</h2>
            <ReadMe buttonName="Read me" note={this.state.readme.manual}/>
            <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} showCancel onCancel={this._reset} show={this.state.notify.status} type={this.state.notify.type}>
            {this.state.notify.message}
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
      if(this.state.side.editform){
        return(
          <div>
            <EditSystemForm sn={this.state.system.SN} {...this.props} />
          </div>
        )
      }
      if(this.state.side.newform){
        return(
          <div>
            <NewSystemForm {...this.props} />
          </div>
        )      
      }
    }
  }
  export default Dashboard;