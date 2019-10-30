import React , {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import NewSystemForm from "./Systems/NewSystem/index"
import EditSystemForm from "./Systems/EditSystem/index"
import Dashboard from "./Dashboard/index"
import Navbar from "./components/NavBar"
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
            <div>
            <Router>
                <Switch>
                    <Route name="newsystem" path="/system/new" >
                        <Navbar/>
                        <NewSystemForm {...this.props} />
                    </Route>
                    {/* <Route name="editsystem" path="/system/edit/">
                        <Navbar/>
                        <EditSystemForm {...this.props}/>
                    </Route>
                    <Route name="editsystem" path="/system/edit/:sn" component={<EditSystemForm/>}>
                        <Navbar/>
                        <EditSystemForm {...this.props}/>
                    </Route> */}
                    <Route
                    path="/system/edit"
                    render={({ location, history }) => {
                        const {sn} = getParams(location);
                        console.log("SN=",sn)
                        return (
                            <div>
                                <Navbar/>
                                <EditSystemForm sn={sn} {...this.props} />
                            </div>
                        );
                    }}
                    />
                    <Route path="/system/upload">
                        <Navbar/>
                        <UploadForm {...this.props}/>
                    </Route>
                    
                    {/* Dashboard muss die letzte Route sein */}
                    <Route path="/">
                        <Navbar/>
                        <Dashboard data={this.props.App.data} {... this.props}/>
                    </Route>

                </Switch>
            </Router>   
            </div>
            
        )

    }
}

export default Body;