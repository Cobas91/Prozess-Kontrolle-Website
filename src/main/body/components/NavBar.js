import React ,{Component} from 'react';
import { Link } from 'react-router-dom';



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
                <Link to="/">
                    <p>Dashboard</p>
                </Link>
                <Link to="/system/new">
                    <p>Neues System</p>
                </Link>
                <Link to="/system/edit">
                    <p>Edit System</p>
                </Link>
                <Link to="/system/upload">
                    <p>Upload</p>
                </Link>
            </div>
        )
    }
}
  
export default Navigation;