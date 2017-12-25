import { call, take, put } from 'redux-saga/effects';
import {ORDER_BOOK_GET_DATA_REQUEST,
    orderBookSuccess,
    orderBookFailure} from './orderBook.action';
import {isFetching,
    isntFetching} from '../../../services/store/globalState/global.actions';
import {getOrderBookData} from '../../../services/Api';

export default function* watchOrderBookGetDataRequest() {
    while(true) {
        const action = yield take(ORDER_BOOK_GET_DATA_REQUEST);
        yield call(fetchOrderBookGetDataRequest, action.payload);
    }
}

function* fetchOrderBookGetDataRequest(bookData) {
    try {
        yield put(isFetching());
        const response = yield call(getOrderBookData(bookData));
        yield put(orderBookSuccess(response));
    } catch(error) {
        yield put(orderBookFailure());
    } finally {
        yield put(isntFetching());
    }
}