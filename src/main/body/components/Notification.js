import React ,{Component} from 'react';
import Alert from 'sweetalert-react';

export class Notify extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            status: this.props.status,
            title: this.props.title,
            message: this.props.message,
        }
    }

    render() {
        return (
            <div className="col-md-3">
                <div className="card">
                    <div className="content text-center"></div>
                    <Alert
                        title={this.state.title}
                        show={this.state.status === true}
                        text={this.state.message}
                        onConfirm={() => this.setState({ status: false })} />  
                </div>
            </div>
        )
    }
}
  
export default Notify;