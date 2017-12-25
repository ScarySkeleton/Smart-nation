import React from 'react';
import {connect} from 'react-redux';

import './spinner.scss';

let Spinner = (props) => (
    (props.isFetchingData === true) 
    ? <div className='wrap-spinner'><div className='spinner'></div></div>
    : null
)

const mapStateToProps = state => {
    return {
        // Some data is fetching on the site
        isFetchingData: state.globalState.isFetching,
    }
}

Spinner = connect(mapStateToProps, null)(Spinner);
export {Spinner};
