import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { loadState, saveState } from '../localStorage/localStorage';

const savedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, savedState, applyMiddleware(sagaMiddleware));
store.subscribe(throttle(() => {
    saveState({
        Login: store.getState().Login,
    })
}, 1000));
sagaMiddleware.run(rootSaga);

export default store;
