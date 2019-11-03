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
            data: {}
        };
    }

    componentDidMount(){
        axios.get('https://3977cebb.ngrok.io/api/v1/getdata')
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