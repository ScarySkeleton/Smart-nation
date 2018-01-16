import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { loadState, saveState } from '../localStorage/localStorage';

const savedState = loadState();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;    

const store = createStore(
    rootReducer
    , savedState
    , composeEnhancers(applyMiddleware(sagaMiddleware)
    , applyMiddleware(thunk)));

store.subscribe(throttle(() => {
    saveState({
        Login: store.getState().Login,
    })
}, 1000));
sagaMiddleware.run(rootSaga);

export default store;
