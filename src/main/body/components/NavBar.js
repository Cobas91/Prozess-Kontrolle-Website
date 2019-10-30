import React ,{Component} from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, NavDropdown } from 'react-bootstrap';



class Navigation extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          load: false
        }
    }
    
    render() {
        return (
            <div className="navbar">
                <Navbar bg="light" expand="lg">
                    <Link to="/">
                        <p>Dashboard</p>
                    </Link>
                    <NavDropdown eventKey={1} title="Systeme" id="basic-nav-dropdown">
                        <NavLink to="/system/new">New System</NavLink>
                        <NavLink to="/system/edit">Edit System</NavLink>
                    </NavDropdown>
                    <NavDropdown eventKey={2} title="Import" id="basic-nav-dropdown">
                        <NavLink to="/system/upload">KHK Import</NavLink>
                    </NavDropdown>
                </Navbar>
            </div>

        )
    }
}
  
export default Navigation;