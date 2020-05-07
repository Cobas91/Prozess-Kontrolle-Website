import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiEdit, FiUpload, FiDownload, FiBox, FiMenu, FiActivity, FiCodesandbox } from "react-icons/fi";
import logo from '../../../images/logo_dg.png'



class Navigation extends Component {
    constructor(props) {
        super(props)    //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          isOpen: this.props.App.window.isOpen,
          mobile: this.props.App.window.mobile
        }
        this._toggleMenu = this._toggleMenu.bind(this)
    }
    _toggleMenu(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    componentDidMount(){
        if(this.props.App.window.windowWidth <= 992){
            this.props.toggleMobile()
            this.props.toggleMenu()
            console.log("Mobile Version", this.props.App.window.windowWidth)
        }
    }
    render() {
        var sideBarClass = "";
        if(this.state.mobile === false){
            sideBarClass = "navi bd-links" 
        }
        if(this.state.mobile === true){
            sideBarClass = "navi bd-links closed"
        }
        if(this.state.isOpen === false){
            sideBarClass = "navi bd-links closed"
        }
        if(this.state.isOpen === true){
            sideBarClass = "navi bd-links"
        }
        if(this.props.App.user.admin){
            return (
                <div className="col-lg-1 sidebar">
                    <div className="logo">
                        <Link onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><img src={logo} alt="DG Logo"/></Link>
                    </div>
                    <FiMenu onClick={this._toggleMenu} className="sideBarToggle"/>
                    <ul className={sideBarClass}>
                        {/* Dashboard */}
                        <li>
                            <Link className="navIcon" onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><FiHome onClick={() => { this.props.setSite("dashboard", {SN: null}) }} className="navIcon"/>Dashboard</Link>
                        </li>
                        {/* Übersicht */}
                        <li> <FiCodesandbox className="navIcon"/>Übersicht
                            <ul className="sub-menu">
                                <li>
                                    <Link onClick={() => { this.props.setSite("uebersicht", {SN: null}) }}><FiActivity onClick={() => { this.props.setSite("uebersicht", {SN: null}) }} className="navIcon"/>Alle Geräte</Link>
                                </li>
                                <li>
                                    <Link onClick={() => { this.props.setSite("uebersicht_versand", {SN: null}) }}><FiActivity onClick={() => { this.props.setSite("uebersicht_versand", {SN: null}) }} className="navIcon"/>Versand</Link>
                                </li>    
                            </ul>
                        </li>
                        {/* Systeme */}
                        <li> <FiBox className="navIcon"/>Systeme
                            <ul className="sub-menu">
                                <li>
                                    <Link onClick={() => { this.props.setSite("masschange", {SN: null}) }} ><FiEdit onClick={() => { this.props.setSite("masschange", {}) }} className="navIcon"/>Massen Änderung</Link>
                                </li>
                                <li>
                                    <Link onClick={() => { this.props.setSite("newsystem", {}) }} ><FiPlusSquare onClick={() => { this.props.setSite("newsystem", {}) }} className="navIcon"/>New System</Link>
                                </li>    
                                <li>
                                    <Link onClick={() => { this.props.setSite("editsystem", {SN: null}) }} ><FiEdit onClick={() => { this.props.setSite("editsystem", {}) }} className="navIcon"/>Edit System</Link>
                                </li>
                            </ul>
                        </li>
                        {/* Administration */}
                        <li> <FiCodesandbox className="navIcon"/>Administration
                            <ul className="sub-menu">
                            <li>
                                <Link onClick={() => { this.props.setSite("config", {}) }}><FiDownload onClick={() => { this.props.setSite("config", {}) }} className="navIcon"/>App Konfiguration</Link>
                            </li> 
                            <li>
                                <Link onClick={() => { this.props.setSite("admin", {}) }}><FiDownload onClick={() => { this.props.setSite("admin", {}) }} className="navIcon"/>Admin Panel</Link>
                            </li>
                            <li>
                                <Link onClick={() => { this.props.setSite("upload", {}) }}><FiDownload onClick={() => { this.props.setSite("upload", {}) }} className="navIcon"/>KHK Import</Link>
                            </li>
                            <li>
                                <Link onClick={() => { this.props.setSite("dblogs", {}) }}><FiDownload onClick={() => { this.props.setSite("dblogs", {}) }} className="navIcon"/>DB Logs</Link>
                            </li>  
                            </ul>
                        </li>
    
                    </ul>
                </div>
    
            )
        }else{
            return (
                <div className="col-lg-1 sidebar">
                    <div className="logo">
                        <Link onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><img src={logo} alt="DG Logo"/></Link>
                    </div>
                    <FiMenu onClick={this._toggleMenu} className="sideBarToggle"/>
                    <ul className={sideBarClass}>
                        {/* Dashboard */}
                        <li>
                            <Link className="navIcon" onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><FiHome onClick={() => { this.props.setSite("dashboard", {SN: null}) }} className="navIcon"/>Dashboard</Link>
                        </li>
                        {/* Übersicht */}
                        <li> <FiCodesandbox className="navIcon"/>Übersicht
                            <ul className="sub-menu">
                                <li>
                                    <Link onClick={() => { this.props.setSite("uebersicht", {SN: null}) }}><FiActivity onClick={() => { this.props.setSite("uebersicht", {SN: null}) }} className="navIcon"/>Alle Geräte</Link>
                                </li>
                                <li>
                                    <Link onClick={() => { this.props.setSite("uebersicht_versand", {SN: null}) }}><FiActivity onClick={() => { this.props.setSite("uebersicht_versand", {SN: null}) }} className="navIcon"/>Versand</Link>
                                </li>    
                            </ul>
                        </li>
                        {/* Systeme */}
                        <li> <FiBox className="navIcon"/>Systeme
                            <ul className="sub-menu">
                                <li>
                                    <Link onClick={() => { this.props.setSite("masschange", {SN: null}) }} ><FiEdit onClick={() => { this.props.setSite("masschange", {}) }} className="navIcon"/>Massen Änderung</Link>
                                </li>
                                <li>
                                    <Link onClick={() => { this.props.setSite("newsystem", {}) }} ><FiPlusSquare onClick={() => { this.props.setSite("newsystem", {}) }} className="navIcon"/>New System</Link>
                                </li>    
                                <li>
                                    <Link onClick={() => { this.props.setSite("editsystem", {SN: null}) }} ><FiEdit onClick={() => { this.props.setSite("editsystem", {}) }} className="navIcon"/>Edit System</Link>
                                </li>
                            </ul>
                        </li>    
                    </ul>
                </div>
    
            )
        }
        
    }
}
  
export default Navigation;