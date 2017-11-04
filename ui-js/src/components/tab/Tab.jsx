import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Tab = props => {
    const resolvePath = path => '/'.concat(path.toLowerCase().replace(" ", "-"));
    return (
        <li className='tab__item'>
            <NavLink
                className={'tab__link' + (props.isLogined) ? '-Logined' : '-unLogined'}
                activeClassName='tab__link-active'
                to={resolvePath(props.name.toLowerCase())}
                >
                {props.name}
            </NavLink>
        </li>
    )
}

Tab.defaultProps = {
    name: '',
    isLogined: false,
};

Tab.propTypes = {
    name: propTypes.string,
    isLogined: propTypes.bool,
}

export default Tab;