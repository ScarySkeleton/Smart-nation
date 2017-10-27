import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
                        <div>
                             <li className='nav__li nav__li-Logined'
                             onClick={this.cabinet}>
                                Cabinet
                            </li>
                            <li className='nav__li nav__li-Logined'
                            onClick={this.bookshelf}>
                                Bookshelf
                            </li> 
                        </div>
                                                :
                        <div>
                            <li className='nav__li nav__li-unLogined'> 
                                Some
                            </li>
                            <li className='nav__li nav__li-unLogined'> 
                                Some2
                            </li>
                        </div>
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
