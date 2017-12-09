import {
    take,
    call,
    put
} from 'redux-saga/effects';


import { 
    FETCH_ADD_BOOK,
    successAddBook,
    failureAddBook,
} from './addBook.action';
import {
    isntFetching
} from '../../../../../services/store/globalState/global.actions';

import {
    addBook
} from '../../../../../services/Api';
import { setTimeout } from 'timers';

export default function* watchAddingBook() {
    while(true) {
        const action = yield take(FETCH_ADD_BOOK);
        yield call(callAddingBook, action.payload);
    }
}

function* callAddingBook(data) {
    try {
        const response = yield call(addBook(data));
        yield put(successAddBook(response));
    } catch(err) {
        yield put(failureAddBook());
    } finally {
        yield put(isntFetching());
    }
}