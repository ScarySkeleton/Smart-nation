import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import './home.scss';
import avatar from '../../../../img/cabinet/book.png';

class Home extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='container home-cabinet'>
                <img src={avatar} className='avatar' alt='avatar' />
                Home cabinet page
            </div>
        );
    }
}


export default Home;
