import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, Switch } from 'react-router-dom';
import CalenderPage from './CalenderPage';
import Rack from './Rack';
import Header from './Header';
import Footer from './Footer';

class MainContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                '9': ['15', '20', '21'],
                '11': ['1', '2', '3']
            }
        };
    }

    componentDidMount(){
        axios.get('https://b8eaa01a.ngrok.io/api/v1/getdata')
        .then((results) => {
          console.log(results)
          this.setState({data: results.data})
        })
        .catch((data) =>{
          console.log(data)
        })
    }

    render(){
        return(
            <div>
                <Header/>
                <Switch>
                    <Route path='/CalenderPage' render={({match}) => <CalenderPage match={match} data={this.state.data}/>}/>
                    <Route path='/Rack' render={({match}) => <Rack match={match} data={this.state.data}/>}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(MainContainer);