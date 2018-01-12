import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import './home.scss';
import {loadData} from './cabinet.actions.js';
import avatar from '../../../../img/cabinet/book.png';

class Home extends PureComponent {

    componentDidMount() {
        this.props.loadUserData();
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

const mapDispatchToProp = dispatch => {
    return {
        loadUserData: () => dispatch(loadData())
    }
}

Home = connect(null, mapDispatchToProp)(Home);

export default Home;
