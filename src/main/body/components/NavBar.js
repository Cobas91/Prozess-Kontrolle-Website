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
                    <NavDropdown eventKey={3} title="Systeme" id="basic-nav-    dropdown">
                        <NavDropdown.Item href="/system/new" className="NavbarItem">New System</NavDropdown.Item>
                        <NavDropdown.Item href="/system/edit">Edit System</NavDropdown.Item>
                    </NavDropdown>
                    {/* <Link to="/system/new">
                        <p>Neues System</p>
                    </Link> */}
                    {/* <Link to="/system/edit">
                        <p>Edit System</p>
                    </Link> */}
                    <Link to="/system/upload">
                        <p>Upload</p>
                    </Link>
                </Navbar>
            </div>

        )
    }
}
  
export default Navigation;