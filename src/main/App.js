/* eslint.disable */
import React, { Component } from "react";
import "../css/App.css";
import bean from "../images/mrbean.gif";
import * as dgapi from "../utils/API/dgapi";
import * as login from "../utils/login";
import LoadingScreen from "./body/components/LoadingScreen";
import Body from "./body/index";
import Footer from "./footer/index";
import Login from "./body/Login/index";
import Header from "./header/index";
import SweetAlert from "react-bootstrap-sweetalert/lib/dist/SweetAlert";
class App extends Component {
  constructor(props) {
    super(props);
    //State initialisieren
    this.state = {
      Version: "1.2",
      loading: true, //Loadingscreen anzeigen?
      notify: {
        //Object für die Benachrichtigung
        title: "",
        message: "",
        status: false,
        type: "default",
      },
      user: {
        name: "",
        admin: true,
      },
      site: "dashboard",
    };
    this._updateApp = this._updateApp.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._toggleMobile = this._toggleMobile.bind(this);
    this._hideAlert = this._hideAlert.bind(this);
    this._setAlert = this._setAlert.bind(this);
    this._setSite = this._setSite.bind(this);
    this._setUsername = this._setUsername.bind(this);
  }
  async _isDevelopment() {
    var result = await dgapi.getConfig();
    return result.development;
  }
  async componentDidMount() {
    var data = await dgapi.getAllData();
    var mobile = false;
    var isOpen = true;
    if (window.innerWidth <= 900) {
      mobile = true;
      isOpen = false;
    }
    this.setState({
      data: {
        systeme: data.systeme,
        kunden: data.kunden,
        status: data.status,
        checklisten: data.checklisten,
        uebersichtVersand: data.uebersichtVersand,
      },
      window: {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        isOpen: isOpen,
        mobile: mobile,
      },
      workData: { SN: null },
      loading: false,
      development: await this._isDevelopment(),
    });
  }
  async _updateApp() {
    var data = await dgapi.getAllData();
    this.setState({
      ...this.state,
      data: {
        systeme: data.systeme,
        kunden: data.kunden,
        status: data.status,
        checklisten: data.checklisten,
        uebersichtVersand: data.uebersichtVersand,
      },
      loading: false,
    });
    // this.componentDidMount();
  }
  _toggleMobile() {
    this.setState({
      mobile: !this.state.mobile,
    });
  }

  _toggleMenu() {
    this.setState({
      isOpen: !this.isOpen,
    });
  }

  _hideAlert() {
    this.setState((prevState) => ({
      ...prevState,
      notify: {
        title: "",
        message: "",
        status: false,
        type: "default",
      },
    }));
  }
  _setAlert(alert) {
    this.setState((prevState) => ({
      ...prevState,
      notify: alert,
    }));
  }
  _setSite(site, data) {
    this._hideAlert();
    if (site !== "") {
      this.setState(
        (prevState) => ({
          ...prevState,
          workData: data,
          site: site,
        }),
        () => console.log("Seitenanzeige aktualisiert", this.state)
      );
    }
  }
  async _setUsername(input) {
    var erg = await login.checkUser(input);
    var admin = false;
    if (erg.login === true) {
      if (erg.Berechtigung > 1) {
        admin = true;
      }
      this.setState(
        (prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            name: erg.User,
            admin: admin,
            berechtigung: erg.Berechtigung,
          },
        }),
        () => console.log("Setting Username", this.state)
      );
    } else {
      this._setAlert({
        title: "Login fehlgeschlagen!",
        message: <img src={bean} alt="Nope!...." />,
        status: true,
        type: "error",
      });
    }
  }
  render() {
    //Error´s ausblenden
    console.warning = () => {};
    console.error = () => {};
    if (this.state.user.berechtigung <= 2) {
      console.log = () => {};
    }
    // Auto Reload Page after 30 Minutes.
    setInterval(function () {
      window.location.reload(false);
    }, 1800000);

    if (this.state.development === false && this.state.user.name === "")
      return (
        <>
          <SweetAlert
            title={this.state.notify.title}
            onConfirm={this._hideAlert}
            show={this.state.notify.status}
            type={this.state.notify.type}
          >
            {this.state.notify.message}
          </SweetAlert>
          <Login App={this.state} setName={this._setUsername} />
        </>
      );
    if (this.state.loading === true)
      return (
        <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" />
      );
    return (
      <div className="container-fluid">
        <Header {...this.state} setSite={this._setSite} />
        <Body
          App={this.state}
          toggleMobile={this._toggleMobile}
          toggleMenu={this._toggleMenu}
          setSite={this._setSite}
          updateApp={this._updateApp}
          setAlert={this._setAlert}
          hideAlert={this._hideAlert}
        />
        <Footer App={this.state} />
      </div>
    );
  }
}

export default App;
