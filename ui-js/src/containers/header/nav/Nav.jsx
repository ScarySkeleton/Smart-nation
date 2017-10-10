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
                        <li className='nav__li nav__li-Logined'>
                            For logined 
                        </li>
                                                :
                        <li className='nav__li nav__li-unLogined'> 
                            For unlogined
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
