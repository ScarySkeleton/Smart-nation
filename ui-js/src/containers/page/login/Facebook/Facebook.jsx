import {facebookLoginSuccess} from './facebook.action';

import React from 'react';
import FacebookLogin from 'react-facebook-login';
import './facebook.scss'

const responseFacebook = response => {
    facebookLoginSuccess(response);
  }

const Facebook = () => {
    
    return <FacebookLogin
        appId="603345156664342"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class btn btn-primary"
        icon="fa-facebook"
    />
}

export {Facebook};
