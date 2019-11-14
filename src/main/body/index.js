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
            <Navbar/>
            <div className="col-md-11">
                <Switch>             
                        <Route name="newsystem" path="/system/new" >             
                            <NewSystemForm {...this.props} />
                        </Route>
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
                        <Route path="/system/upload">
                            <UploadForm {...this.props}/>
                        </Route>
                        {/* Dashboard muss die letzte Route sein */}
                        <Route path="/">
                            <Dashboard data={this.props.App.data} {... this.props}/>
                        </Route>  
                </Switch>
                </div> 
            </Router>
            </div>
            
        )

    }
}

export default Body;