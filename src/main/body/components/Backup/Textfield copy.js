import React ,{Component} from 'react';


export class TextField extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            value: '',
            className: this.props.className,
            id: this.props.id,
            placeholder: this.props.placeholder
        }
        this._handleChange = this._handleChange.bind(this);
    }
    _handleChange(event) {
        this.setState({value: event.target.value});
        this.props.handleChange(event.target)
        event.preventDefault()        
    }

    render() {
        return (
            <input onKeyPress={e => {if (e.key === 'Enter') e.preventDefault();}} placeholder={this.state.placeholder} id={this.state.id} onChange={this._handleChange} className={this.state.className + " form-control"}/>
        )
    }
}
  
export default TextField;