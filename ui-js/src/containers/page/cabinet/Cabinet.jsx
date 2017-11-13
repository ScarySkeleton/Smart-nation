import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    loadData
} from './cabinet.actions';

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
                Cabinet
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

Cabinet = connect(null, mapDispatchToProps)(Cabinet);
export default Cabinet;