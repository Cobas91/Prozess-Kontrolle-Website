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
      this._hideAlert = this._hideAlert.bind(this)
      this._handleChangeStart = this._handleChangeStart.bind(this)
      this._handleChangeEnde = this._handleChangeEnde.bind(this)
      this._createPDF = this._createPDF.bind(this)
    }

    _hideAlert(){
      this.setState(
        prevState => ({
            startDate: new Date(),
          notify: {
            title: "",
            message: "",
            status: false,
            type: "default"
          }
        }),
        () => console.log(this.state)
      );      
    }
    _handleChangeStart = date => {
        this.setState(
            prevState => ({
                ...prevState,
                startDate: date,
            }),
            () => console.log(this.state)
        );
    };
    _handleChangeEnde = date => {
        this.setState(
            prevState => ({
                ...prevState,
                endDate: date,
            }),
            () => console.log(this.state)
        );
    };

    _createPDF(){
      dgapi.askforPDF(this.props.App.auswertung.checklisten, "Testfile")
    }
    render() {
        const TableHeaderChecklisten = [
          {
              Header: "Seriennummer",
              accessor: "Seriennummer"
          },
          {
            Header: "In SCCM angelegt",
            accessor: "SCCM_Anlage"
          },
          {
              Header: "Bios Einstellungen",
              accessor: "BIOS"
          },
          {
            Header: "Start: Bootstick",
            accessor: "Bootstick_Start"
          },
          {
            Header: "Start: PXE",
            accessor: "PXE_Start"
          },
          {
            Header: "Computername aufgeklebt",
            accessor: "Computername"
          },
          {
            Header: "Software geprüft/installiert",
            accessor: "Software"
          },
          {
            Header: "Bemerkung",
            accessor: "Bemerkung"
          },
          {
            Header: "Datum",
            accessor: "timestamp"
          }
        ]
        return (
          <>
            <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
            </SweetAlert>
            <Tabelle data={this.props.App.auswertung.checklisten} header={TableHeaderChecklisten} filter={true} export={true} TableName="Checklisten"/>
            <Button
              action={this._createPDF}
              type={"secondary"}
              title={"PDF Erstellen"}
            /> 
          </>
        );
    }
  }
  export default Auswertung;