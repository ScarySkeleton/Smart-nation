import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../components/logo/Logo.jsx';
import Nav from './nav/Nav.jsx';
import Search from './search/Search.jsx';

class HeaderContainer extends PureComponent {
    render() {
        return (
            <div className='container header'>
                <h3>Header</h3>
                <Logo />
                <Nav />
                <Search />

                {
                    (this.props.isLogined)
                    ?   
                        <div className='user-header-bar_logined'>
                            Hello logined user
                        </div>
                    :
                        <div className='user-header-bar_unlogined'>
                            <Link to='/login'> Log In </Link>
                            <Link to='/register'> Register </Link>
                        </div>
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        isLogined: state.Login.isLogined,
    }
};

HeaderContainer = connect(
    mapStateToProps,
    null,
)(HeaderContainer);

export default HeaderContainer; 
