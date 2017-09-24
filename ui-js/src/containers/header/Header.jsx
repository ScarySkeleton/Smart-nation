import React, { PureComponent } from 'react';

import Logo from '../../components/logo/Logo.jsx';
import Nav from '../../components/header/nav/Nav.jsx';
import Search from './search/Search.jsx';

class HeaderContainer extends PureComponent {
    render() {
        return (
            <div className='container header'>
                <h3>Header</h3>
                <Logo />
                <Nav />
                <Search />
            </div>
        );
    };
};

export default HeaderContainer; 
