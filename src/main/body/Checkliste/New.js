/* eslint.disable */
import React, {Component} from 'react';
import "../../../css/App.css"
import SweetAlert from 'react-bootstrap-sweetalert'


class ChecklisteNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notify:{         
                title: "",
                message: "",
                status: false,
                type: "default"
              }
        }

    }

    _handleSubmit(e){
        

    }

    async _handleInput(e){
        e.preventDefault();
    }

  render() {
    console.log("Checklisten State: ", this.state)
        return(
            <div >
            <SweetAlert title={this.state.notify.title} onConfirm={this._hideAlert} show={this.state.notify.status} type={this.state.notify.type}>
              {this.state.notify.message}
            </SweetAlert>
            <h2>Checklisten Attribute erstellen</h2>
            <div className="form-group">
                <form onSubmit={this._handleSubmit}>
                    
                </form>
            </div>
        </div> 
        )
    }
}
export default ChecklisteNew;
