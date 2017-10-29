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
                    <blockquote className='header-title-blockquote'>“A room without books is like a body without a soul.”
                    <br/>
                    <span className='header-title-author'>― Marcus Tullius Cicero</span>
                    </blockquote>
                </div>
                <div className='header-nav'>
                    {
                        (this.props.isLogined)
                        ?   
                            <div className='user-header-bar user-header-bar_logined '>
                                Hello {this.props.surname} {this.props.name}
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
