import React , {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import NewSystemForm from "./Systems/NewSystem/index"
import EditSystemForm from "./Systems/EditSystem/index"
import Home from "./Home/index"
import Navbar from "./components/NavBar"




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
                    <Route path="/system/edit/">
                        <Navbar/>
                        <EditSystemForm {...this.props} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
                    </Route>
                    <Route path="/">
                        <Navbar/>
                        <Home data={this.props.App.data}/>
                    </Route>
                </Switch>
            </Router>   
            </div>
            
        )

    }
}

export default Body;