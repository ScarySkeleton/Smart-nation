import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import HomePage from '../../containers/page/home/Home';
import LoginPage from '../../containers/page/login/Login';
import RegistrationPage from '../../containers/page/register/Register';

let Content = (props) => {
    return (
        <div className='body-content'>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={() => (
                props.isLogined 
            ? ( <Redirect to="/" /> )
            : ( <LoginPage /> )
            )} />
            <Route path='/register' component={RegistrationPage} />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
    }
}

export default Content = withRouter(connect(mapStateToProps, null)(Content));