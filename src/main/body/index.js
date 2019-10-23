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
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(event){
        this.props.handleChange(event)
    }
    _handleSubmit(event){
        this.props.handleSubmit(event)
        event.preventDefault();
    }

    render() {
        console.log("Body-State: ",this.props.App)
        return (
            <div>
            <Router>
                <Switch>
                    <Route path="/system/new">
                        <Navbar/>
                        <NewSystemForm {...this.props} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
                    </Route>
                    <Route path="/system/edit/:id">
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