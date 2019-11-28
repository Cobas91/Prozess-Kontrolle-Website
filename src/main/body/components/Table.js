import React ,{Component} from 'react';
import ReactTable, {ReactTableDefaults}  from 'react-table';
import 'react-table/react-table.css'


class Tabelle extends Component {

    
    render() {
        //Set Defaults for Table
        Object.assign(ReactTableDefaults, {
            className: "-striped -highlight",
            filterable: this.props.filter,
            previousText: "Zurück",
            nextText: "Nächste",
            noDataText: "Keine Daten gefunden...",
            rowsText: "Datensätze",
            pageText: "Seite",
            defaultPageSize: 10
        })
        return (
            <div>
                <ReactTable data={this.props.data.systeme} columns={this.props.header} />
            </div>
          )
    }
}
  
export default Tabelle;