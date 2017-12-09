import { call, take, put, fork, all } from 'redux-saga/effects';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    loginSuccess,
    loginFailure
} from './login.actions';
import { loginRequest } from '../../../services/Api'

export default function* watchLogin() {
    while(true) {
        const action = yield take(LOGIN_REQUEST);
        yield call(fetchLoginRequest, action.payload);
    }
}

export function* fetchLoginRequest(userData) {
    try {
        const response = yield call(loginRequest(userData));
        yield put(loginSuccess(response));
    } catch (error) {
        yield put(loginFailure());
    }
}