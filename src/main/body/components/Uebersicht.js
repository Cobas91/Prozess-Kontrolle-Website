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
          filter:{
            kunde: [],
            status: []
          }
          
      };
    }
    _handleFilterInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState(
        prevState => ({
          system: {
            ...prevState.system,
            [name]: value
          }
        }),
        () => console.log("Editform State aktualisiert: ",this.state)
      );
  }
  componentDidMount(){
    var filterKunde = this.props.App.data.kunden
    filterKunde.push("")

    var filterStatus = this.props.App.data.status
    filterStatus.push("")
    this.setState({
      filter:{
        kunde: filterKunde,
        status: filterStatus
      }
    })
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
              filterAll: true, 
              Filter: ({ filter, onChange }) => (
                <Dropdown
                title={""}
                name={"Kunde"}
                options={this.state.filter.kunde}
                value={filter ? filter.value : ''}
                placeholder={"Kunde wählen...."}
                handlechange={event => onChange(event.target.value)}
                />
            )
          },
          {
            Header: "Aktueller Status",
            accessor: "Status",
            filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["Status"] }),
            filterAll: true,
            Filter: ({ filter, onChange }) => (
              <Dropdown
              title={""}
              name={"Status"}
              options={this.props.App.data.status}
              value={filter ? filter.value : ''}
              placeholder={"Status wählen..."}
              handlechange={event => onChange(event.target.value)}
              />
          )
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