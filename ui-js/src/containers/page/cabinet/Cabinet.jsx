import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
    loadData
} from './cabinet.actions';
import './cabinet.scss';
import CabinetNav from './nav/Nav';
import CabinetHome from './home/Home';
import CabinetInfo from './info/Info';
import CabinetBookshelf from './bookshelf/Bookshelf';
import CabinetAddBook from './addBook/AddBook';

class Cabinet extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadCabinetData({userId: 1});
    }

    render() {
        return (
            <div className='container cabinet'>
                <CabinetNav />

                <Switch>
                    <Route exact path='/cabinet/info' component={CabinetInfo} />
                    <Route exact path='/cabinet/my-bookshelf' component={CabinetBookshelf} />
                    <Route exact path='/cabinet/add-book' component={CabinetAddBook} />
                    <Route path='/cabinet/' component={CabinetHome} />
                </Switch>
            </div>
        )
    }
};

Cabinet.propTypes = {

};

Cabinet.defultProps = {

};

const mapDispatchToProps = dispatch => {
    return {
        loadCabinetData: (data) => dispatch(loadData(data)),
    }
}

Cabinet = withRouter(connect(null, mapDispatchToProps)(Cabinet));
export default Cabinet;
