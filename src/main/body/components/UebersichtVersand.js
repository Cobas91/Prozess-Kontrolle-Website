import React ,{Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert'

import Tabelle from './Table'
import Button from "./Button"
import Dropdown from './Dropdown'
import matchSorter from 'match-sorter'
import * as dgapi from '../../../utils/API/dgapi'
import Switch from './Switch.js';


class Auswertung extends Component {
    constructor(props) {
      super(props);

      this.state = {
          versand:{

          }
      };
      this._save = this._save.bind(this)
      console.log("Versand State", this.state)
    }

    _handleSwitchChange(value, row){
      this.setState(
          prevState => ({
              versand:{
                  ...prevState.versand,
                  [row.row.SN]: value
              }
          }
      ),
      () => console.log("Versand aktualisiert: ",this.state)
     );
    }
    _isChecked(index){
      
      if(this.state.versand[index] === undefined){
        return false
      }else{
        return this.state.versand[index]
      }
    }
    _save(){
      dgapi.setStatus(this.state.versand)
      this.props.updateApp()
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
            Header: <Button
                    action={this._save}
                    type={"primary"}
                    title={"Status Versand setzen"}
                    /> ,
              Cell: row => 
              <div className="tabelle_feld">
                <Switch  title="Versenden" onChange={(e) => this._handleSwitchChange(e, row)} checked={this._isChecked(row.row.SN)} />
              </div>,
              filterable: false,
              sortable: false
          }
        ]
        
        return (
            <div className="form-group">
                <h2>Übersicht Systeme mit Status Versand Ready</h2>
                <div className="form-group">
                  <Tabelle data={this.props.App.data.uebersichtVersand} header={TableHeaderChecklisten} DropdownFilter={true} TableName="Checklisten" {...this.props}/>

                </div>
            </div>
        );
    }
  }
  export default Auswertung;