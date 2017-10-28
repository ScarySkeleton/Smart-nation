import { all } from 'redux-saga/effects';

import authProccess from '../../containers/page/login/login.saga';

export default function* rootSaga() {
    yield all([
        authProccess(),
    ]);
}
