import { call, take, put, fork, all } from 'redux-saga/effects';
import {
    REGISTER_REQUEST,
    registerSuccess,
    registerFailure,
} from './register.actions';
import { registrationRequest } from '../../../services/Api'

export default function* watchRegistration() {
    while(true) {
        console.log("waiting for register");
        const action = yield take(REGISTER_REQUEST);
        console.log("register request, " , action.payload);
        yield call(fetchRegistrationRequest, action.payload);
    }
}

export function* fetchRegistrationRequest(userData) {
    try {
        const response = yield call(registrationRequest(userData));
        console.log("api result", response);
        yield put(registerSuccess());
    } catch (error) {
        yield put(registerFailure());
    }
}