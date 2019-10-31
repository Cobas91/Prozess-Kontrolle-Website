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
            <Router>
                <Switch>
                <div className="row">
                <Navbar/>
                    <div className="col-md-11">

                        <Route name="newsystem" path="/system/new" >
                            
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
                                    <EditSystemForm sn={sn} {...this.props} />
                                </div>
                            );
                        }}
                        />
                        <Route path="/system/upload">
                            {/* <Navbar/> */}
                            <UploadForm {...this.props}/>
                        </Route>
                        
                        {/* Dashboard muss die letzte Route sein */}
                        <Route path="/">
                            {/* <Navbar/> */}
                            <Dashboard data={this.props.App.data} {... this.props}/>
                        </Route>
                    </div>  
                </div>
                </Switch>
            </Router>
            
        )

    }
}

export default Body;