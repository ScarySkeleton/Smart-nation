import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './nav.scss';

const loginedNav = [
    "Cabinet",
    "Bookshelf"
];

const unLoginedNav = [
    "Some", 
    "Some2"
]

class Nav extends PureComponent {

    constructor(props) {
        super(props);

        this.cabinet = this.cabinet.bind(this);
        this.bookshelf = this.bookshelf.bind(this);
    }

    cabinet() {
        
    }

    bookshelf() {

    }

    render() {
        return (
                <ul className='container ul nav__ul'>
                    {
                        (this.props.isLogined) 
                                                ? 
                        <div>
                             <li className='nav__li nav__li-Logined'>
                             <a href="" onClick={this.cabinet}>Cabinet</a>  
                            </li>
                            <li className='nav__li nav__li-Logined'>
                            <a href="" onClick={this.bookshelf}>Bookshelf</a>  
                            </li> 
                        </div>
                                                :
                        <div>
                            <li className='nav__li nav__li-unLogined'> 
                                <a href='/login'> LOGIN </a>
                            </li>
                            <li className='nav__li nav__li-unLogined'> 
                                <a href='/register'> REGISTRATION </a>
                            </li>
                        </div>
                    }
                </ul>
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
