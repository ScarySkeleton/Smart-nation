import {put, take, call} from 'redux-saga/effects';

import {FETCHING_USER_INFO,
    fetchingUserInfoSuccess,
    fetchingUserInfoFailure} from './info.actions';
// Global action
import {isFetching,
    isntFetching} from '../../../../services/store/globalState/global.actions';
// API
// import {
//     getUserInfo
// } from '../../../../services/Api';


export default function* watchUserInfo() {
    while(true) {
        //yield take(FETCHING_USER_INFO);
        //yield call(fetchUserInfo);
    }
}

// function* fetchUserInfo() {
//     try {
//         // Show, that we start to fetching books
//         yield put(isFetching());
//         // Fetching the books  
//         //const response = yield call(getUserInfo());
//         yield put(fetchingUserInfoSuccess(response));
//     } catch(err) {
//         yield put(fetchingUserInfoFailure());
//     } finally {
//        yield put(isntFetching());
//     }
// }
