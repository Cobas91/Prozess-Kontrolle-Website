import React ,{Component} from 'react';
class Username extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
          type: this.props.type,
          color: this.props.color,
          className: this.props.className

        }
      }
    render() {
        return (
            <div className="loading_main">
                <div className="LoadingScreen">
                <label>{this.props.App.user.name}</label>
                    
                </div>
            </div>

        )
    }
}
  
export default Username;