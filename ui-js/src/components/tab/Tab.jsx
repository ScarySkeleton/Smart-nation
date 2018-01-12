import React from 'react';
import propTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

let Tab = props => {
    const prevPath = props.match.url === '/' ? '' : props.match.url;
    const resolvePath = path => '/'.concat(path.toLowerCase().replace(" ", "-"));
    return (
        <li className={`tab__item ${props.customClass}`}>
            <NavLink
                className={'tab__link' + (props.isLogined) ? `-Logined ${props.customLinkClass}` : ` -unLogined ${props.customLinkClass}`}
                activeClassName='tab__link-active'
                to={prevPath + resolvePath(props.name.toLowerCase())}
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

export default Tab = withRouter(Tab);
