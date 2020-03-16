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
            var ergebnis = await excelHandler.excelImport(excelData)
            await dgapi.addExcelImport(ergebnis).then((anfrage)=>{
                var notify = {
                    title: "Erfolg",
                    message: "Daten erfolgreich eingespielt",
                    status: true,
                    type: "success"
                }
                var correctInsert = 0
                var errorInsert = 0
                for(var index in anfrage.erg){
                    if(anfrage.erg[index].statusCode === 400){
                        errorInsert++
                        notify = {
                            title: "Ergebnis Excel Import",
                            message: `Hinzugefügt: ${correctInsert} \nFehler: ${errorInsert}`,
                            status: true,
                            type: "warning" 
                        }
                    }else{
                        correctInsert++
                    }
                }
                this.setState({
                    excelData: ergebnis,
                    loading: false,
                    gotData: true
                })
                this.props.setAlert(notify)
            })
            
        }
        reader.readAsBinaryString(f)
    }
  render() {
    console.log("UploadForm State: ", this.state)
        if(this.state.loading === true) return <LoadingScreen type="balls" color="#A61609" className="LoadingScreen" /> //Loading Screen  
        return(
            <div >
            <SweetAlert title={this.props.App.notify.title} onConfirm={this.props.hideAlert} showCancel onCancel={this.props.hideAlert} show={this.props.App.notify.status} type={this.props.App.notify.type}>
                {this.props.App.notify.message}
            </SweetAlert>
            <h2>Upload Excel</h2>
            <div className="form-group">
                <form onSubmit={this._handleSubmit}>
                    <Input
                    inputtype={"file"}
                    title={"Upload .xlsx"}
                    name={"upload"}
                    handlechange={this._handleInput}
                    accept={"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}
                    />
                </form>
            </div>
        </div> 
        )
    }
}
export default UploadForm;
