import React, { Component } from "react";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import * as dgapi from '../../../utils/API/dgapi'
class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            bemerkungen: [],
            loading: true
        }
        this._handleClick = this._handleClick.bind(this)
    }

  async componentDidMount(){
    const bemerkungen = await dgapi.getComments(this.props.sn)
    this.setState({bemerkungen: bemerkungen, loading: false})
  }
  _handleClick(){
    if(this.state.isOpen === true){
        this.setState({isOpen: false})
    }else{
        this.setState({isOpen: true})
    }
  } 
  render(){
      if(this.state.loading === true){
          return <div></div>
      }else{
        return (
            <div>
            <Button color="info" onClick={this._handleClick} style={{ marginBottom: '1rem' }}>{this.props.name}</Button>
            <Collapse isOpen={this.state.isOpen}>
                <Card>
                <CardBody>
                    <ul>
                        {
                            this.state.bemerkungen.map((item, key) =>
                            <li>{item.comment}</li>
                            )
                        }
                    </ul>
                    
                </CardBody>
                </Card>
            </Collapse>
            </div>
        );
      }
    }
}

export default Accordion;
