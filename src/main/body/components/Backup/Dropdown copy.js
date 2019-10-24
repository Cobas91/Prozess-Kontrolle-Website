import React ,{Component} from 'react';
import Select from 'react-dropdown'
import 'react-dropdown/style.css'

var kunden = []
export class DropdownComp extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          kunden: this.props.data.kunden,
          value: 0
        }
        kunden = this.state.kunden.map(kunde => ({ label: kunde.Name, value: kunde.Kunden_ID }));
    }
    _handleChangeDropdown = (option)=> {
        Object.assign(option, {id: this.props.id})
        this.props.handleChange(option)
     }
    render() {
        return (
            <Select options={kunden} onChange={this._handleChangeDropdown} value={this.state.kunden[this.state.value].Name} className="dropdownmenu dropdown" id={this.props.id}/>
        )
    }
}
  
export default DropdownComp;