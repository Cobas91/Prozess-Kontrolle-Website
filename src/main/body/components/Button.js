import React ,{Component} from 'react';


export class Button extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          label: this.props.label,
          className: this.props.className,
          type: this.props.type,
          onClick: this.props.onClick
        }
    }
    render() {
        return (
            <button type={this.state.type} className={this.state.className} onClick={this.props.onClick}>{this.state.label}</button>
        )
    }
}
  
export default Button;