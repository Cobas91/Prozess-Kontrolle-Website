import React ,{Component} from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'
import {  FaBars } from 'react-icons/fa';

import Tabelle from '../components/Table'
import Button from '../components/Button.js'

import * as dgapi from '../../../utils/API/dgapi.js'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              }
        }
        this._resetPXE = this._resetPXE.bind(this)
        this._hideAlert = this._hideAlert.bind(this)
    }
    async _resetPXE(sn){
        await dgapi.pxeReset(sn).then((result)=>{
            this.setState({
                notify:{         
                    title: "Erfolg",
                    message: `${sn} wird zurückgesetzt.`,
                    status: true,
                    type: "default"
                  }
            })
            setTimeout(() => {
                this.setState(
                    {
                    notify: {
                      title: "",
                      message: "",
                      status: false,
                      type: "default"
                    }
                  }
                );
                this.props.updateApp()
              }, 800);
        })

        
    }
    _hideAlert(){
        this.setState({
            notify: {
              title: "",
              message: "",
              status: false,
              type: "default"
            }
          },
        );      
      }
    render() {
      const header = [
            {
                Header: "Seriennummer",
                accessor: "SN"
            },
            {
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
                Header: "Bearbeiten",
                accessor: "SN",
                Cell: row => <div>
                    <Link to={`/system/edit/?sn=${row.value}`}><FaBars/></Link>
                  </div>
            },
            {
                Header: "PXE Zurücksetzen",
                accessor: "SN",
                Cell: row => (<Button action={() => this._resetPXE(row.value)} title="Reset"/>) 
            },
        ]
      return (
            <div>
              <h2>Dashboard</h2>
              <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
              </SweetAlert>
              <Tabelle data={this.props.data} header={header} filter={true}/>
            </div>
      );
    }
  }
  export default Dashboard;