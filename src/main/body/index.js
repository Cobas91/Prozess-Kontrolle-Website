import React , {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import NewSystemForm from "./Systems/NewSystem/index"
import EditSystemForm from "./Systems/EditSystem/index"
import Dashboard from "./Dashboard/index"
import Navbar from "./components/SideBar"
import UploadForm from "./Systems/Upload"
import Auswertung from "./Systems/Auswertung/index"
function getParams(location) {
    const searchParams = new URLSearchParams(location.search);
    return {
      sn: searchParams.get("sn") || ""
    };
  }

class Body extends Component {
    render() {
        return (
            <div className="row">
            <Router>
            <Navbar {...this.props}/>
            <div className="col-md-11">
                <Switch>
                        {/* Neues System */}
                        <Route name="newsystem" path="/system/new" >             
                            <NewSystemForm {...this.props} />
                        </Route>

                        {/* System Editieren */}
                        <Route
                        path="/system/edit"
                        render={({ location, history }) => {
                            const {sn} = getParams(location);
                            return (
                                <div>
                                    <EditSystemForm sn={sn} {...this.props} />
                                </div>
                            );
                        }}
                        />

                        {/* KHK Upload */}
                        <Route path="/system/upload">
                            <UploadForm {...this.props}/>
                        </Route>

                        {/* Auswertung */}
                        <Route path="/system/auswertung">
                            <Auswertung {...this.props}/>
                        </Route>
                        
                        <Route path="/">
                            <Dashboard {... this.props}/>
                        </Route> 
                </Switch>
                </div> 
            </Router>
            </div>
            
        )

    }
}

export default Body;