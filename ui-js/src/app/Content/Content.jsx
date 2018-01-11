import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import './content.scss';
import PrivateRoute from '../../services/router/PrivateRoute';

import {Spinner} from '../../components/spinner/Spinner';
import HomePage from '../../containers/page/home/Home';
import LoginPage from '../../containers/page/login/Login';
import Logout from '../../components/logout/Logout';
import RegistrationPage from '../../containers/page/register/Register';
import CabinetPage from '../../containers/page/cabinet/Cabinet';
import OrderBook from '../../containers/book/orderBook/OrderBook';
import Book from '../../containers/page/book/Book';

let Content = (props) => (
    <div className='body-content'>
        <Spinner />

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
        
        <Route path='/book/:id' component={Book} /> 
        <PrivateRoute path='/orderBook/:id' component={OrderBook} /> {/* "!"FOR DEBUGGING OFFLINE ONLY  */}
        <PrivateRoute path='/cabinet' component={CabinetPage} />            
    </div>
)

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
        isRegisteredSuccess: state.Register.isRegisteredSuccess,
        isRegisteredFailure: state.Register.isRegisteredFailure,
    }
}

export default Content = withRouter(connect(mapStateToProps, null)(Content));   