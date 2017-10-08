import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Nav extends PureComponent {

    render() {
        return (
            <div className='container nav'>
                <ul className='container ul nav__ul'>
                    <li> <Link to=''> Home </Link> </li>
                    {
                        (this.props.isLogined) 
                                                ? 
                        <li className='nav__li nav__li-notLogined'>
                            <Link className='nav__link nav__link-logout' to='/logout'> Logout </Link>
                        </li>
                                                :
                        <li className='nav__li nav__li-Logined'> 
                            <Link className='nav__link nav__link-register' to='/register'> Register </Link>
                            <Link className='nav__link nav__link-login' to='/login'> Login </Link>
                        </li>
                    }
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isLogined: state.Login.isLogined,
    }
};

Nav = connect(
    mapStateToProps,
    null,
)(Nav);

export default Nav;
