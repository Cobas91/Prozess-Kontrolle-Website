import React ,{Component} from 'react';
import ReactTable, {ReactTableDefaults}  from 'react-table';
import 'react-table/react-table.css'
import Export from "../components/ExcelExport"
import * as Time from "../../../utils/time"
import tableCount from "../components/tableCount";
import "react-table-filter/lib/styles.css";
class Tabelle extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            normalData: this.props.data,
            filteredData: this.props.data,
            selectedFilters:{
                filterKunden: null
            }
        }
    };
    componentDidMount(nextProps, nextState) {
        
    }
    onFilteredChangeKunden = (value, accessor) => {
        let filtered = this.state.filteredData;
        let insertNewFilter = 1;
    
        if (filtered.length) {
          filtered.forEach((filter, i) => {
            if (filter["id"] === accessor) {
              if (value === "" || !value.length) filtered.splice(i, 1);
              else filter["value"] = value;
    
              insertNewFilter = 0;
            }
          });
        }
    
        if (insertNewFilter) {
          filtered.push({ id: accessor, value: value });
        }
    
        this.setState({ filtered: filtered });
      };
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
            defaultPageSize: this.props.pageSize ? this.props.pageSize : 10
        })
        
        if(this.props.export){
            return (
                <>
                    <Export csvData={this.props.data} fileName={this.props.TableName+"_"+Time.convert(Date.now())} Name={this.props.TableName + " Exportieren"}/>
                    <ReactTable data={this.props.data} columns={this.props.header} />
                </>
            )
        }else if(this.props.DropdownFilter){
            return(
                <>                      
                    <ReactTable data={this.props.data} columns={this.props.header} filterable={true} showPagination={true} PaginationComponent={tableCount}/>
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