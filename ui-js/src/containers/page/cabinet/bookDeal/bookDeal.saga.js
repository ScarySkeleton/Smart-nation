import {put,
    take,
    call,
    fork} from 'redux-saga/effects';

import {FETCHING_BOOK_DEAL_DATA,
    FETCHING_BOOK_DEAL_CHANGE,
    fetchingBookDealDataSuccess,
    fetchingBookDealDataFailure,
    fetchingBookDealChangeSuccess,
    fetchingBookDealChangeFailure} from './bookDeal.actions';
// Global action
import {
    isFetching,
    isntFetching } from '../../../../services/store/globalState/global.actions';
// API
import {getDealData, changeDealStatus} from '../../../../services/Api';


export default function* watchUserDeal() {
    const userDealData = yield fork(watchUserDealData);
    const userChangeDeal = yield fork(watchUserChangeDeal);
}

function* watchUserDealData() {
    while(true) {
        yield take(FETCHING_BOOK_DEAL_DATA);
        yield call(fetchUserDeal, 
            getDealData,
            null,
            fetchingBookDealDataSuccess,
            fetchingBookDealDataFailure);
    }
}

function* watchUserChangeDeal() {
    while(true) {
        const dealChangeData = yield take(FETCHING_BOOK_DEAL_CHANGE);
        yield call(fetchUserDeal,
            changeDealStatus,
            dealChangeData.payload,
            fetchingBookDealChangeSuccess,
            fetchingBookDealChangeFailure);
    }
}

function* fetchUserDeal(api, userData, onSuccess, onFailure) {
    try {
        // Show, that we start to fetching books
        yield put(isFetching());
        // Fetching the books  
        const response = yield call(api(userData));
        yield put(onSuccess(response));
    } catch(err) {
        yield put(onFailure());
    } finally {
       yield put(isntFetching());
    }
}