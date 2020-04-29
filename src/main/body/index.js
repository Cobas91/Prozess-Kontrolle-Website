import React , {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import NewSystemForm from "./Systems/NewSystem/index"
import EditSystemForm from "./Systems/EditSystem/index"
import Dashboard from "./Dashboard/index"
import Navbar from "./components/Sidebar"
import UploadForm from "./Systems/Upload"
import Uebersicht from "./components/Uebersicht"
import UebersichtVersand from "./components/UebersichtVersand"
import Admin from "./Administration/index"

class Body extends Component {
    render() {
        //Dashboard anzeigen
        if(this.props.App.site === "dashboard"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <Dashboard {... this.props}/>
                    </div>
                </div>
            )   
        }
        //New System anzeigen
        if(this.props.App.site === "newsystem"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <NewSystemForm {... this.props}/>
                    </div>
                </div>
            )   
        }
        if(this.props.App.site === "editsystem"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <EditSystemForm {... this.props}/>
                    </div>
                </div>
            )   
        }
        if(this.props.App.site === "upload"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <UploadForm {... this.props}/>
                    </div>
                </div>
            )   
        }
        if(this.props.App.site === "uebersicht"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <Uebersicht {... this.props}/>
                    </div>
                </div>
            )   
        }
        if(this.props.App.site === "uebersicht_versand"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <UebersichtVersand {... this.props}/>
                    </div>
                </div>
            )   
        }
        if(this.props.App.site === "admin"){
            return(
                <div className="row">
                <Navbar {...this.props}/>
                    <div className="col-md-11">
                        <Admin {... this.props}/>
                    </div>
                </div>
            )   
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