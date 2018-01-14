import React from 'react';

import './logo.scss';

import logo from './logo.png';

const Logo = () => {
    return (
        <a className="logo col-md-2" href="/">
        	<img className="app-logo-img" src={logo} alt="Whitesquare logo"/>
        </a>
    );
};

export default Logo;
