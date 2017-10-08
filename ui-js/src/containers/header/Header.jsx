import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Logo from '../../components/logo/Logo.jsx';
import Nav from './nav/Nav.jsx';
import Search from './search/Search.jsx';

class HeaderContainer extends PureComponent {
    render() {
        console.log(this.props.isLogined);
        return (
            <div className='container header'>
                <h3>Header</h3>
                <Logo />
                <Nav />
                <Search />

                <hr />
                <br />
                <br />

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
