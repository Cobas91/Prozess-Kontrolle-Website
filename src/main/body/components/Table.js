import React ,{Component} from 'react';
import ReactTable, {ReactTableDefaults}  from 'react-table';
import 'react-table/react-table.css'
import Export from "../components/ExcelExport"
import * as Time from "../../../utils/time"
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
        if(this.props.export){
            return (
                <>
                    <Export csvData={this.props.data} fileName={this.props.TableName+"_"+Time.convert(Date.now())} Name={this.props.TableName + " Exportieren"}/>
                    <ReactTable data={this.props.data} columns={this.props.header} />
                </>
            )
        }else{
            return (
                <>
                    <ReactTable data={this.props.data} columns={this.props.header} />
                </>
            )
        }

    }
}
  
export default Tabelle;