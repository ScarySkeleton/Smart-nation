import { call, take, put } from 'redux-saga/effects';
import {
    FETCH_SEARCH_BOOKS,
    successSearchBooks,
    failureSeatchBooks } from './search.actions';
import {
    isFetching,
    isntFetching } from '../../../../services/store/globalState/global.actions';
import {
    searchBooks } from '../../../../services/Api';

export default function* watchSearchBooks() {
    while(true) {
        const action = yield take(FETCH_SEARCH_BOOKS);
        yield call(fetchSearchBooks, action.payload);
    }
}

export function* fetchSearchBooks(data) {
    try {
        yield put(isFetching());
        const response = yield call(searchBooks(data));
        yield put(successSearchBooks(response));
    } catch(e) {
        yield put(failureSeatchBooks());
    } finally {
        yield put(isntFetching());
    }
}
