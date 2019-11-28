import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiEdit, FiUpload, FiDownload, FiBox, FiDatabase, FiList } from "react-icons/fi";



class Navigation extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          load: false
        }
    }
    
    render() {
        return (
            <div className="col-md-1 sidebar">
                <div className="logo">
                    <img src="logo_dg.png" alt="DG Logo"/>
                </div>
                <ul className="navi bd-links">
                    <li>
                        <Link to="/">
                        <FiHome className="navIcon"/>Dashboard
                        </Link>
                    </li>
                    <li> <FiBox className="navIcon"/>Systeme
                        <ul className="sub-menu">
                        <li>
                            <Link to="/system/new"><FiPlusSquare className="navIcon"/>New System</Link>
                        </li>    
                        <li>
                            <Link to="/system/edit"><FiEdit className="navIcon"/>Edit System</Link>
                        </li>  
                        </ul>

                    </li>
                    <li> <FiUpload className="navIcon"/>Upload
                        <ul className="sub-menu">
                        <li>
                            <Link to="/system/upload"><FiDownload className="navIcon"/>KHK Import</Link>
                        </li>    
                        </ul>

                    </li>
                    <li> <FiDatabase className="navIcon"/>Administration
                        <ul className="sub-menu">
                        <li>
                            <Link to="/admin/checkliste/new"><FiList className="navIcon"/>Checkliste erstellen</Link>
                        </li>
                        <li>
                            <Link to="/admin/checkliste/edit"><FiList className="navIcon"/>Checkliste bearbeiten</Link>
                        </li>     
                        </ul>

                    </li>
                </ul>
            </div>

        )
    }
}
  
export default Navigation;