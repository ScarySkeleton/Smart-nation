import {put, take, call, fork} from 'redux-saga/effects';

import {CHANGE_USER_INFO,
    CHANGE_USER_PICTURE,
    changeUserInfoSuccess,
    changeUserInfoFailure,
    changeUserPictureSuccess,
    changeUserPictureFailure} from './info.actions';
// Global action
import {isFetching, isntFetching} from '../../../../services/store/globalState/global.actions';
// API
import {changeUserInfoData, changeUserInfoPicture} from '../../../../services/Api';


export default function* watchChangeUserInfo() {
    const changeUserInfoData = yield fork(watchChangeUserInfoData);
    const changeUserInfoPicture = yield fork(watchChangeUserInfoPicture);
}

function* watchChangeUserInfoData() {
    while(true) {
        const userInfoAtion = yield take(CHANGE_USER_INFO);
        yield call(fetchChangeUserInfo, 
            changeUserInfoData,
            userInfoAtion.payload,
            changeUserInfoSuccess,
            changeUserInfoFailure);
    }
}

function* watchChangeUserInfoPicture() {
    while(true) {
        const userPictureAction = yield take(CHANGE_USER_PICTURE);
        yield call(fetchChangeUserInfo,
            changeUserInfoPicture,
            userPictureAction.payload,
            changeUserPictureSuccess,
            changeUserPictureFailure);
    }
}

function* fetchChangeUserInfo(api, userData, onSuccess, onFailure) {
    try {
        // Show, that we start to fetching books
        yield put(isFetching());
        // Fetching the books  
        yield call(api(userData));
        yield put(onSuccess());
    } catch(err) {
        yield put(onFailure());
    } finally {
       yield put(isntFetching());
    }
}
