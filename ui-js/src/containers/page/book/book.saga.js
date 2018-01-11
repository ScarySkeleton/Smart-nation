import {call, take, put} from 'redux-saga/effects';
import {
    FETCH_BOOK,
    fetchBookSuccess,
    fetchBookFailure
} from './book.action';
import {isFetching, isntFetching} from '../../../services/store/globalState/global.actions';
import {getBookPageData} from '../../../services/Api';

export default function* watchFetchingBook() {
    while(true) {
        const action = yield take(FETCH_BOOK);
        yield call(fetchingBook, action.payload);
    }
}

function* fetchingBook(bookId) {
    try {
        yield put(isFetching());
        const reponse = yield call(getBookPageData(bookId));
        yield put(fetchBookSuccess(reponse));
    } catch(error) {
        yield put(fetchBookFailure());
    } finally {
        yield put(isntFetching());
    }
}
