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

    componentDidMount = () => {
        console.log('描写完了');
        console.log('カレンダーが受け取ったデータ:');
        console.log(this.props.data);
    }

    render(){
        return(
            <div>
                <Calender data={this.props.data}/>
            </div>
        );
    }
}

export default withRouter(CalenderPage);