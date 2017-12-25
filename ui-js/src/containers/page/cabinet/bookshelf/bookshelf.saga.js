import {
    put,
    take,
    call
} from 'redux-saga/effects';

import {
    FETCHING_BOOK_SHELF_BOOKS,
    fetchingBookShelfBooksSuccess,
    fetchingBookShelfBooksFailure } from './bookshelf.actions';
// Global action
import {
    isFetching,
    isntFetching } from '../../../../services/store/globalState/global.actions';
// API
import {
    getBookShelfBooks
} from '../../../../services/Api';


export default function* watchFetchingBookshelfBooks() {
    while(true) {
        yield take(FETCHING_BOOK_SHELF_BOOKS);
        yield call(fetchBookShelfBooks);
    }
}

function* fetchBookShelfBooks() {
    try {
        // Show, that we start to fetching books
        yield put(isFetching());
        // Fetching the books  
        const response = yield call(getBookShelfBooks());
        yield put(fetchingBookShelfBooksSuccess(response));
    } catch(err) {
        yield put(fetchingBookShelfBooksFailure());
    } finally {
       yield put(isntFetching());
    }
}
