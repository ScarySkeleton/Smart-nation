import React from 'react';
import Tab from '../../../../components/tab/Tab';

const link = [
    "Home",
    "Info",
    "My bookshelf",
    "Add Book"
]

const Nav = () => (
    <div className='container nav-cabinet'>
        <ul className='nav-cabinet__list'>
            {
                link.map(function(element, key) {
                    return <Tab
                        key={key}
                        name={element}
                        isLogined={true}
                        />
                }, this)
            }
        </ul>
    </div>
);

export default Nav;
