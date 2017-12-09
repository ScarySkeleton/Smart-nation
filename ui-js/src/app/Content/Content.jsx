import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import './content.scss';
import PrivateRoute from '../../services/router/PrivateRoute';
import HomePage from '../../containers/page/home/Home';
import LoginPage from '../../containers/page/login/Login';
import Logout from '../../components/logout/Logout';
import RegistrationPage from '../../containers/page/register/Register';
import CabinetPage from '../../containers/page/cabinet/Cabinet';

let Content = (props) => {
    return (
        <div className='body-content'>

            {
                (props.isFetchingData === true) 
                ? <div className='spinner'></div>
                : null
            }

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
            <Route path='/logout' component={Logout} />

            <PrivateRoute path='/cabinet' component={CabinetPage} isLogined={props.isLogined} />            
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
        isRegisteredSuccess: state.Register.isRegisteredSuccess,
        isRegisteredFailure: state.Register.isRegisteredFailure,
        // Some data is fetching on the site
        isFetchingData: state.globalState.isFetching,
    }
}

export default Content = withRouter(connect(mapStateToProps, null)(Content));   