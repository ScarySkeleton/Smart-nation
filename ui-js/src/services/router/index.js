import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

import { loadState, saveState } from '../localStorage/localStorage';

const savedState = loadState();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, savedState, applyMiddleware(sagaMiddleware));
store.subscribe(() => {
    saveState({
        Login: store.getState().Login,
    })
})
sagaMiddleware.run(rootSaga);

export default store;
