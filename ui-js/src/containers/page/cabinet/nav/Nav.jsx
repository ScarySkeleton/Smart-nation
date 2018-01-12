import React from 'react';
import Tab from '../../../../components/tab/Tab';
import './nav.scss';
const link = [
    "Home",
    "Info",
    "My bookshelf",
    "Add Book"
]

const Nav = () => (
    <nav className='container nav-cabinet navbar navbar-expand-sm bg-light navbar-light'>
        <ul className='nav-cabinet__list navbar-nav col-md-12 nav-cabinet__list_items nav-fill'>
            {
                link.map(function(element, key) {
                    return <Tab
                        key={key}
                        name={element}
                        customClass={'nav-item tab__item__menu col-md-3'}
                        customLinkClass = {'navbar-brand'}
                        isLogined={true}
                        />
                }, this)
            }
        </ul>
    </nav>
);

export default Nav;
