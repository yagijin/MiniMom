import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CalenderImg from '../images/calender.png';
import Check from '../images/check.png';
import CalenderImgSelect from '../images/calender-selected.png';
import CheckSelected from '../images/check-selected.png';

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {
            iconSelect: true,
        }
    }

    handleChangeCalender = () => {
        this.setState({iconSelect: false})
        this.props.history.push('/CalenderPage');
    }

    handleChangeRack = () => {
        this.setState({iconSelect: true})
        this.props.history.push('/Rack');
    }
    
    render(){
        return(
            <footer>
                {this.state.iconSelect ? 
                    <div>
                        <div className="icon-wrapper" onClick={this.handleChangeCalender}>
                            <img id="icon1" src={CalenderImg}/>
                            <p className='no-select'>カレンダー</p>
                        </div>
                        <div className="icon-wrapper" onClick={this.handleChangeRack}>
                            <img id="icon2" src={CheckSelected}/>
                            <p className='select'>使用状況</p>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="icon-wrapper" onClick={this.handleChangeCalender}>
                            <img id="icon1" src={CalenderImgSelect}/>
                            <p className='select'>カレンダー</p>
                        </div>
                        <div className="icon-wrapper" onClick={this.handleChangeRack}>
                            <img id="icon2" src={Check}/>
                            <p className='no-select'>使用状況</p>
                        </div>
                    </div>
                }
            </footer>
        );
    }
}

export default withRouter(Footer);