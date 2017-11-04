import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from './logout.action';

class LogoutCont extends PureComponent {
    
    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <div className='container logout'>
                <h1 className='logout__header'>
                    Logging out ...
                </h1>

                {
                    (!this.props.isLogined)
                    ? <Redirect to='/' />
                    : null
                }
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        isLogined: state.Login.isLogined,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
}

const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutCont);
export default Logout;
