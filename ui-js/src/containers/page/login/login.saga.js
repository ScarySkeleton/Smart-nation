import { call, take, put } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    loginSuccess,
    loginFailure
} from './login.actions';
import { loginRequest } from '../../../services/Api'

export default function* watchLogin() {
    const isLogined = false;
    while(!isLogined) {
        console.log('before login request');
        yield take(LOGIN_REQUEST);
        yield call(fetchLoginRequest);
        console.log('after login request');
    }
}

export function* fetchLoginRequest() {
    try {
        const response = yield call(loginRequest(), {});
        console.log("response",response);
        yield put(loginSuccess(response));
    } catch (error) {
        yield put(loginFailure());
    }
}