import React ,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'

import Tabelle from '../../components/Table'
import Button from "../../components/Button"

import * as dgapi from '../../../../utils/API/dgapi'


class Auswertung extends Component {
    constructor(props) {
      super(props);

      this.state = {
          gotData: false,
          notify:{          //Object für die Benachrichtigung
            title: "",
            message: "",
            status: false,
            type: "default"
        },
      };
    }

    render() {
        const TableHeaderChecklisten = [
          {
              Header: "Seriennummer",
              accessor: "SN"
          },
          {
            Header: "Kunde",
            accessor: "Kunde"
          },
          {
            Header: "KHK Matchcode",
            accessor: "Kunde_KHK"
          },
          {
            Header: "Aktueller Status",
            accessor: "Status"
          },
          {
            Header: "Letzte Bemerkung",
            accessor: "Bemerkung"
          },
          {
            Header: "",
            accessor: "SN",
              Cell: row => 
              <div className="tabelle_feld">
                <Button className="tabelle_Feld" action={() => this.props.setSite("editsystem",{SN: row.value})} title="Editieren"/>
              </div>
          }
        ]
        return (
            <div className="form-group">
                <h2>Übersicht alle Systeme</h2>
                <div className="form-group">
                <Tabelle data={this.props.App.data.systeme} header={TableHeaderChecklisten} filter={true} TableName="Checklisten"/> 
                </div>
            </div>
        );
    }
  }
  export default Auswertung;