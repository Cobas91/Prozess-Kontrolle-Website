import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
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
                    <NavDropdown eventKey={1} title="Systeme" id="basic-nav-    dropdown">
                        <NavDropdown.Item href="/system/new" className="NavbarItem">New System</NavDropdown.Item>
                        <NavDropdown.Item href="/system/edit">Edit System</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown eventKey={2} title="Import" id="basic-nav-    dropdown">
                        <NavDropdown.Item href="/system/upload" className="NavbarItem">Import Seriennummer auskunft</NavDropdown.Item>
                    </NavDropdown>
                </Navbar>
            </div>

        )
    }
}
  
export default Navigation;