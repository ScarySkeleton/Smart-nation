import React, {PureComponent} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import './content.scss';
import PrivateRoute from '../../services/router/PrivateRoute';

import {Spinner} from '../../components/spinner/Spinner';
import {Popup} from '../../components/popup/Popup';
import HomePage from '../../containers/page/home/Home';
import LoginPage from '../../containers/page/login/Login';
import Logout from '../../components/logout/Logout';
import RegistrationPage from '../../containers/page/register/Register';
import CabinetPage from '../../containers/page/cabinet/Cabinet';
import Book from '../../containers/page/book/Book';
import {fetchBookGenre} from '../../services/store/commonInfo/Book/commonBookInfo.action';


class Content extends PureComponent {

    componentDidMount() {
        this.props.fetchBookGenre();
    }

    render() {
        const {isLogined, isRegisteredSuccess} = this.props;
        return (
            <div className='body-content container'>
                <Spinner />
                <Popup />
        
                <Route exact path='/' component={HomePage} />
                <Route path='/login' component={() => (
                        isLogined 
                    ? ( <Redirect to="/" /> )
                    : ( <LoginPage /> )
                    )} />
                <Route path='/registration' component={() => (
                    isRegisteredSuccess
                    ? ( <Redirect to='/' />)
                    : ( <RegistrationPage /> )
                )} />
                <Route path='/logout' component={Logout} />
                
                <Route path='/book/:id' component={Book} /> 
                <PrivateRoute path='/cabinet' component={CabinetPage} />            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
        isRegisteredSuccess: state.Register.isRegisteredSuccess,
        isRegisteredFailure: state.Register.isRegisteredFailure,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBookGenre: () => fetchBookGenre(dispatch)
    }
}

export default Content = withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));   