import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './nav.scss';
import Tab from '../tab/Tab.jsx';

const loginedNav = [
    "Cabinet",
    "Bookshelf"
];

const unLoginedNav = [
    "LOGIN", 
    "REGISTRATION"
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

                        loginedNav.map((el, index) => {
                            return <Tab
                                key={index}
                                name={el}
                                isLogined={true} />
                        })
                        
                                                :
                        unLoginedNav.map((el, index) => {
                            return <Tab 
                                key={index}
                                name={el}
                                isLogined={false} />
                        })
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
