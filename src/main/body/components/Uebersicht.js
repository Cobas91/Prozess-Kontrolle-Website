import React ,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'

import Tabelle from './Table'
import Button from "./Button"
import Dropdown from './Dropdown'
import matchSorter from 'match-sorter'
import * as dgapi from '../../../utils/API/dgapi'


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
          }
      };
    }

    render() {
      
        const TableHeaderChecklisten = [
          {
              Header: "Seriennummer",
              accessor: "SN",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["SN"] }),
              filterAll: true
          },
          {
            Header: "Computername",
            accessor: "Computername",
            filterMethod: (filter, rows) =>
                  matchSorter(rows, filter.value, { keys: ["Computername"] }),
            filterAll: true
          },
          {
              Header: "Modell",
              accessor: "Modell",
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Modell"] }),
              filterAll: true
          },
          {
            Header: "Kunde",
            accessor: "Kunde",
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Kunde"] }),
              filterAll: true  
          },
          {
            Header: "Aktueller Status",
            accessor: "Status",
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Status"] }),
            filterAll: true
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
              </div>,
            filterable: false,
            sortable: false
          }
        ]
        return (
            <div className="form-group">
                <h2>Übersicht alle Systeme</h2>
                <div className="form-group">
                <Tabelle data={this.props.App.data.systeme} header={TableHeaderChecklisten} DropdownFilter={true} TableName="Checklisten" {...this.props}/>
                </div>
            </div>
        );
    }
  }
  export default Auswertung;