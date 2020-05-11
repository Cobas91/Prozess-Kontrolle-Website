import React, { Component } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

class Login extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      user: {
        name: "",
      },
    };
    this._handleInput = this._handleInput.bind(this);
  }
  _handleInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({
        ...prevState,
        user: {
          [name]: value,
        },
      }),
      () => console.log("Login State:", this.state)
    );
  }
  render() {
    return (
      <div className="loading_main">
        <div className="LoadingScreen">
          <label>Wer benutzt dieses Tool gerade?</label>
          <Input
            inputtype={"text"}
            title={""}
            name={"name"}
            value={this.state.user.name}
            placeholder={"Bitte Initialien oder Name eintragen...."}
            handlechange={this._handleInput}
          />
          <Button
            action={() => {
              this.props.setName(this.state.user.name);
            }}
            type={"primary"}
            title={"Übernehmen"}
          />
        </div>
      </div>
    );
  }
}

export default Login;
