import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Cabinet extends PureComponent {
    constructor(props) {
        super(props);
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

export default Cabinet;