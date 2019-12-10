import React , {Component} from 'react';

class Footer extends Component {
    render() {
        return (
        <label>Version: {this.props.App.Version}</label>   
        )

    }
}

export default Footer;