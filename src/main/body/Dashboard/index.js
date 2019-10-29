import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import Tabelle from '../components/Table'
import {  FaBars } from 'react-icons/fa';
import { MdDeleteSweep } from "react-icons/md";
class Dashboard extends Component {
    constructor(props) {
      super(props);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {

    }

    handleDropdown = (value) =>{

    }
    handleInput = (value) =>{

    }
    render() {
      const header = [{
        Header: "Seriennummer",
        accessor: "SN"
          },{
                Header: "Kunde",
                accessor: "Kunde"
            },
            {
                Header: "Lieferschein",
                accessor: "LSNummer"
            },
            {
                Header: "Modell",
                accessor: "Modell"
            },
            {
                Header: "Status",
                accessor: "Status"
            },
            {
                Header: "",
                Cell: row => <div>
                  <Link to={"system/edit"}> <FaBars/> </Link>
                  <MdDeleteSweep/>
                  </div>
            }
        ]
      return (
            <Tabelle data={this.props.data} header={header} filter={true}/>
      );
    }
  }
  export default Dashboard;