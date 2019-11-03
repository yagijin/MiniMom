import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Shelf from '../images/shelf.png';
import Mom from '../images/mom-icon.png';

class Rack extends Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
            <div>
                <div className="legend-wrapper">
                    <img src={Mom}/>
                    <div className="legend">
                        <div className="squares square1"></div>
                        <span>半年以上</span>
                    </div>
                    <div className="legend">
                        <div className="squares square2"></div>
                        <span>3ヶ月</span>
                    </div>
                    <div className="legend">
                        <div className="squares square3"></div>
                        <span>1ヶ月</span>
                    </div>
                </div>
                <div className="shelf-wrapper">
                    <img className="shelf-img" src={Shelf}/>
                    <div className="circle1">
                    </div>
                    <div className="circle2">
                    </div>
                    <div className="circle3">
                    </div>
                    <div className="circle4">
                    </div>
                    <div className="circle5">
                    </div>
                    <div className="circle6">
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Rack);