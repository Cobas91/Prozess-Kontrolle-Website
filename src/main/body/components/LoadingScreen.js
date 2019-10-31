import React ,{Component} from 'react';
import ReactLoading from "react-loading";

class LoadingScreenClass extends Component {
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
                    <label>LOADING</label>
                    {/* <ReactLoading type={this.type} color={this.color} height={'20%'} width={'20%'} className={this.className} /> */}
                    <ReactLoading type="spinningBubbles" color="#A61609" className="loading_canvas" height={'200%'} width={'200%'}/>
                </div>
            </div>

        )
    }
}
  
export default LoadingScreenClass;