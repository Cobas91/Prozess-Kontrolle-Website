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



class Body extends Component {
    render() {
        return (
            <div>
            <Router>
                <Switch>
                    <Route path="/system/new">
                        <Navbar/>
                        <NewSystemForm {...this.props} />
                    </Route>
                    <Route path="/system/edit">
                        <Navbar/>
                        <EditSystemForm {...this.props}/>
                    </Route>
                    <Route path="/system/upload">
                        <Navbar/>
                        <UploadForm/>
                    </Route>
                    
                    {/* Dashboard muss die letzte Route sein */}
                    <Route path="/">
                        <Navbar/>
                        <Dashboard data={this.props.App.data}/>
                    </Route>

                </Switch>
            </Router>   
            </div>
            
        )

    }
}

export default Body;