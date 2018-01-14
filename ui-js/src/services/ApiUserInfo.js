import {Error} from '../components/popup/Error/Error';
import {popupOpen} from '../components/popup/popup.action';
import store from './store/index';
import React from 'react';
import {connect} from 'react-redux';

/*
    ================================================
                    USER INFO
    ================================================
*/
const errorTitleMessage = 'Error was occured.'
const errorBodyMessage = `Error was occured while
    fetching data from server.`;



let fetchingError = (error) => {
    const errorPopup = {
        title: errorTitleMessage,
        body: <Error message={`${errorBodyMessage}
        Error message: ${error}`} /> 
    }
    
    return store.dispatch(popupOpen(errorPopup));
}


export {fetchingError};
