import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Tab from '../../../components/tab/Tab';

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
            <div className='container nav'>
                <ul className='container ul nav__ul'>
                    <li> <Link to=''> Home </Link> </li>
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
                                isLogined={true} />
                        })
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
