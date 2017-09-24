import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='container nav'>
            <ul className='container ul nav__ul'>
                <li> <Link to=''> Home </Link> </li>
                <li> <Link to='/Login'> Login </Link> </li>
                <li> <Link to='/Register'> Register </Link> </li>
            </ul>
        </div>
    );
};

export default Nav;
