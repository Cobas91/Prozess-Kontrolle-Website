/* eslint.disable */
import React, {Component} from 'react';
import "../../../../css/App.css"
import SweetAlert from 'react-bootstrap-sweetalert'
import * as XLSX from 'xlsx';

import * as dgapi from '../../../../utils/API/dgapi'


import LoadingScreen from "../../components/LoadingScreen"
import Input from "../../components/Input"
import * as excelHandler from "../../../../utils/excelHandler"


class UploadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            excelData: {},
            gotData: false,
            notify:{          //Object für die Benachrichtigung
                title: "",
                message: "",
                status: false,
                type: "default"
            },
        }
        this._handleInput = this._handleInput.bind(this)
        this._hideAlert = this._hideAlert.bind(this)
    }

    _handleSubmit(e){
        e.preventDefault();

    }
    _HandleIncommingExcel(data){
        this.setState({

        })
    }
    async _handleInput(e){
        e.preventDefault();
        this.setState({
            loading: true
        })
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload =  async (e) => {
            var data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
    
            /* Convert array to json*/
            const excelData = XLSX.utils.sheet_to_json(ws, {header:1});
            // var result = excelData.find((system) => {
            //     if(system.SN === this.state.system.sn){
            //       return system
            //     }
            //     else{
            //       return null
            //     }
            // })
            var ergebnis = await excelHandler.excelImport(excelData)
            await dgapi.addExcelImport(ergebnis)
            this.setState({
                excelData: ergebnis,
                loading: false,
                gotData: true,
                notify:{        
                    title: "Erfolg",
                    message: "Daten wurden erfolgreich in die Datenbank übertragen",
                    status: true,
                    type: "success"
                }
            })
        }
        reader.readAsBinaryString(f)

    }
    _hideAlert(){
        this.setState(
          prevState => ({
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
  render() {
    console.log("UploadForm State: ", this.state)
        if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" /> //Loading Screen  
        return(
            <div className="form-group">
            <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
            </SweetAlert>
            <h3>Upload Excel</h3>
            <div className="form-group">
                <form onSubmit={this._handleSubmit}>
                    <Input
                    inputtype={"file"}
                    title={"Upload .xlsx"}
                    name={"upload"}
                    handlechange={this._handleInput}
                    />
                </form>
            </div>
        </div> 
        )
    }
}
export default UploadForm;
