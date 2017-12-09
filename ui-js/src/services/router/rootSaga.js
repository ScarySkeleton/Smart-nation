import { all } from 'redux-saga/effects';

import loginProccess from '../../containers/page/login/login.saga';
import registrationProcess from '../../containers/page/register/register.saga';

export default function* rootSaga() {
    yield all([
        loginProccess(),
        registrationProcess(),
    ]);
}
