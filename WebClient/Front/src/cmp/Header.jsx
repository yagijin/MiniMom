import React, { Component } from 'react';
import Logo from '../images/header-logo.png';

class Header extends Component {
    render(){
        return(
            <header>
                <img className="header-logo" src={Logo}/>
            </header>
        );
    }
}

export default Header;