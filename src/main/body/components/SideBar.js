import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlusSquare, FiEdit, FiUpload, FiDownload, FiBox, FiMenu, FiActivity } from "react-icons/fi";
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
        return (
            <div className="col-lg-1 sidebar">
                <div className="logo">
                    <Link onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><img src={logo} alt="DG Logo"/></Link>
                </div>
                <FiMenu onClick={this._toggleMenu} className="sideBarToggle"/>
                <ul className={sideBarClass}>
                    <li>
                        <Link className="navIcon" onClick={() => { this.props.setSite("dashboard", {SN: null}) }}><FiHome onClick={() => { this.props.setSite("dashboard", {SN: null}) }} className="navIcon"/>Dashboard</Link>
                    </li>
                    <li>
                        <Link className="navIcon" onClick={() => { this.props.setSite("uebersicht", {SN: null}) }}><FiActivity onClick={() => { this.props.setSite("uebersicht", {SN: null}) }} className="navIcon"/>Übersicht</Link>
                    </li>
                    <li> <FiBox className="navIcon"/>Systeme
                        <ul className="sub-menu">
                            <li>
                                <Link onClick={() => { this.props.setSite("newsystem", {}) }} ><FiPlusSquare onClick={() => { this.props.setSite("newsystem", {}) }} className="navIcon"/>New System</Link>
                            </li>    
                            <li>
                                <Link onClick={() => { this.props.setSite("editsystem", {SN: null}) }} ><FiEdit onClick={() => { this.props.setSite("editsystem", {}) }} className="navIcon"/>Edit System</Link>
                            </li>
                        </ul>

                    </li>
                    <li> <FiUpload className="navIcon"/>Upload
                        <ul className="sub-menu">
                        <li>
                            <Link onClick={() => { this.props.setSite("upload", {}) }}><FiDownload onClick={() => { this.props.setSite("upload", {}) }} className="navIcon"/>KHK Import</Link>
                        </li>    
                        </ul>
                    </li>

                </ul>
            </div>

        )
    }
}
  
export default Navigation;