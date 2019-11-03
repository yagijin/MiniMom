import React, { Component } from 'react';
import {  withRouter } from 'react-router-dom';
import Calender from './Calender';

class CalenderPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    handleChange = () => {
        this.props.history.push('/Rack');
    }

    render(){
        return(
            <div>
                <Calender/>
            </div>
        );
    }
}

export default withRouter(CalenderPage);