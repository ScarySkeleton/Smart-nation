import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PrivateRoute from '../../services/router/PrivateRoute';
import HomePage from '../../containers/page/home/Home';
import LoginPage from '../../containers/page/login/Login';
import RegistrationPage from '../../containers/page/register/Register';
import CabinetPage from '../../containers/page/cabinet/Cabinet';

let Content = (props) => {
    return (
        <div className='body-content'>
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={() => (
                    props.isLogined 
                ? ( <Redirect to="/" /> )
                : ( <LoginPage /> )
                )} />
            <Route path='/registration' component={() => (
                    props.isRegisteredSuccess
                    ? ( <Redirect to='/' />)
                    : ( <RegistrationPage /> )
                )} />

            <PrivateRoute component={CabinetPage} isLogined={props.isLogined} />            
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
        isRegisteredSuccess: state.Register.isRegisteredSuccess,
        isRegisteredFailure: state.Register.isRegisteredFailure,
    }
}

export default Content = withRouter(connect(mapStateToProps, null)(Content));