import React, { Component } from 'react';
import Maru from '../images/maru.png';
import Batsu from '../images/batsu.png';

class Date extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td>{this.props.days[0]}</td>
                <td>{this.props.days[1]}</td>
                <td>{this.props.days[2]}</td>
                <td>{this.props.days[3]}</td>
                <td>{this.props.days[4]}</td>
                <td>{this.props.days[5]}</td>
                <td>{this.props.days[6]}</td>
            </tr>
        );
    }
}

export default Date;