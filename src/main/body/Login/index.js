/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import SweetAlert from 'react-bootstrap-sweetalert'
import Input from "../components/Input"
import Button from "../components/Button"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              },
            login: {
                username: "",
                password: ""
            }
        }
        this._handleInput = this._handleInput.bind(this)
        this._checkLogin = this._checkLogin.bind(this)
    }

    _handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
          prevState => ({
            login: {
                ...prevState.login,
                [name]: value
            }
          }),
          () => console.log("Login State aktualisiert: ",this.state)
        );
      }
    _checkLogin(){
        this.props.checkLogin(this.state.login)
    }
  render() {
    console.log("Login Props: ", this.props)
        return(
            <div >
            <SweetAlert title={this.props.App.notify.title} onConfirm={this.props.hideAlert} show={this.props.App.notify.status} type={this.props.App.notify.type}>
              {this.props.App.notify.message}
            </SweetAlert>
            <h2>Login</h2>
            <div className="form-group">
                    <Input
                        inputType={"text"}
                        title={"Username"}
                        name={"username"}
                        value={this.state.login.username}
                        placeholder={"vorname.nachname"}
                        handlechange={this._handleInput}
                    />
                    <Input
                        inputType={"text"}
                        title={"Passwort"}
                        name={"password"}
                        value={this.state.login.password}
                        placeholder={""}
                        handlechange={this._handleInput}
                    />
                    <Button
                        action={this._checkLogin}
                        type={"primary"}
                        title={"Login"}
                    />
            </div>
        </div> 
        )
    }
}
export default Login;
