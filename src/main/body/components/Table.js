import React ,{Component} from 'react';
import ReactTable, {ReactTableDefaults}  from 'react-table';
import 'react-table/react-table.css'


class Tabelle extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            data: this.props.data,
            load: false,
            header: this.props.header,
            filter: this.props.filter
        }
    }
    
    render() {
        console.log("Table-Data",this.state)
        //Set Defaults for Table
        Object.assign(ReactTableDefaults, {
            className: "-striped -highlight",
            filterable: this.state.filter,
            previousText: "Zurück",
            nextText: "Nächste",
            noDataText: "Keine Daten gefunden...",
            rowsText: "Datensätze",
            pageText: "Seite"
        })        
        return (
            <div>
            <ReactTable data={this.state.data.systeme} columns={this.state.header} />
            </div>
          )
    }
}
  
export default Tabelle;