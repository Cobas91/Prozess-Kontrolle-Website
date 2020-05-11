import React, { Component } from "react";

import NewSystemForm from "./Systems/NewSystem/index";
import EditSystemForm from "./Systems/EditSystem/index";
import Dashboard from "./Dashboard/index";
import Navbar from "./components/SideBar";
import UploadForm from "./Administration/Upload";
import Uebersicht from "./Dashboard/AllSystems/Uebersicht";
import MassChange from "./MassChange/index";
import AppConfig from "./Administration/AppConfig/index";
import DBLogs from "./Administration/DBLogs/index";
import Teams from "./Administration/Teams/index";

class Body extends Component {
  render() {
    //Dashboard anzeigen
    if (this.props.App.site === "dashboard") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <Dashboard {...this.props} />
          </div>
        </div>
      );
    }
    //New System anzeigen
    if (this.props.App.site === "newsystem") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <NewSystemForm {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "editsystem") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <EditSystemForm {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "upload") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <UploadForm {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "uebersicht") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <Uebersicht {...this.props} />
          </div>
        </div>
      );
    }

    if (this.props.App.site === "masschange") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <MassChange {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "config") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <AppConfig {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "dblogs") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <DBLogs {...this.props} />
          </div>
        </div>
      );
    }
    if (this.props.App.site === "teams") {
      return (
        <div className="row">
          <Navbar {...this.props} />
          <div className="col-md-11">
            <Teams {...this.props} />
          </div>
        </div>
      );
    }

    // return (
    //     <div className="row">
    //     <Router>
    //     <Navbar {...this.props}/>
    //     <div className="col-md-11">
    //         <Switch>
    //                 {/* Neues System */}
    //                 <Route name="newsystem" path="/system/new" >
    //                     <NewSystemForm {...this.props} />
    //                 </Route>

    //                 {/* System Editieren */}
    //                 <Route
    //                 path="/system/edit"
    //                 render={({ location, history }) => {
    //                     const {sn} = getParams(location);
    //                     return (
    //                         <div>
    //                             <EditSystemForm sn={sn} {...this.props} />
    //                         </div>
    //                     );
    //                 }}
    //                 />

    //                 {/* KHK Upload */}
    //                 <Route path="/system/upload">
    //                     <UploadForm {...this.props}/>
    //                 </Route>

    //                 {/* Auswertung */}
    //                 {/* <Route path="/system/auswertung">
    //                     <Auswertung {...this.props}/>
    //                 </Route> */}

    //                 <Route path="/">
    //                     <Dashboard {... this.props}/>
    //                 </Route>
    //         </Switch>
    //         </div>
    //     </Router>
    //     </div>

    // )
  }
}

export default Body;
