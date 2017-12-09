import { all } from 'redux-saga/effects';

import loginProccess from '../../containers/page/login/login.saga';
import registrationProcess from '../../containers/page/register/register.saga';
import cabinetProcess from '../../containers/page/cabinet/cabinet.saga';
import addingBookProcess from '../../containers/page/cabinet/addBook/addBookForm/addBook.saga';

export default function* rootSaga() {
    yield all([
        loginProccess(),
        registrationProcess(),
        cabinetProcess(),
        addingBookProcess()
    ]);
}
