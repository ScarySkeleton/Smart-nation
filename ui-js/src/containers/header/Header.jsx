import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './header.scss';

import Logo from '../../components/logo/Logo.jsx';
import Nav from '../../components/nav/Nav.jsx';

class HeaderContainer extends PureComponent {
    render() {

        return (
            <div className='container header'>
                <Logo />
                <div className='header-title'>
                    
                </div>
                <div className='header-nav'>
                    {
                        (this.props.isLogined)
                        ?   
                            <div className='user-header-bar user-header-bar_logined '>
                                Hello <span>{this.props.surname} </span> {this.props.name}
                            </div>
                        :
                            <div className='user-header-bar user-header-bar_unlogined'>
                                Hello guest!
                            </div>
                    }
                    <Nav />
                </div>
                

               
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        name: state.Login.userdata.name,
        surname: state.Login.userdata.surname,
        userName: state.Login.userdata.username,
        role: state.Login.userdata.role,
        isLogined: state.Login.isLogined,
    }
};

HeaderContainer = connect(
    mapStateToProps,
    null,
)(HeaderContainer);

export default HeaderContainer; 
