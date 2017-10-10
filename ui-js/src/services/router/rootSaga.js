import { all } from 'redux-saga/effects';

import authProccess from './Auth/authSaga';

export default function* rootSaga() {
    yield all([
        authProccess(),
    ]);
}
