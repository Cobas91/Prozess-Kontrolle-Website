import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import Tabelle from '../components/Table'
import {  FaBars } from 'react-icons/fa';
import { MdDeleteSweep } from "react-icons/md";
class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
          data: this.props.data
    };
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
                accessor: "Kunden_ID"
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
                  <Link to={"system/edit/"+this.state.data.systeme[row.index].ID} data={row}> <FaBars/> </Link>
                  <MdDeleteSweep/>
                  </div>
            }
        ]
        console.log(this.state.data)
      return (
            <Tabelle data={this.state.data} header={header} filter={true}/>
      );
    }
  }
  export default Home;