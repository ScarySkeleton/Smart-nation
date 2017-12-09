import { call, take, put } from 'redux-saga/effects';
import {
    REGISTER_REQUEST,
    registerSuccess,
    registerFailure,
} from './register.actions';
import { registrationRequest } from '../../../services/Api'

export default function* watchRegistration() {
    while(true) {
        const action = yield take(REGISTER_REQUEST);
        yield call(fetchRegistrationRequest, action.payload);
    }
}

export function* fetchRegistrationRequest(userData) {
    try {
        yield call(registrationRequest(userData)); // const response = 
        yield put(registerSuccess());
    } catch (error) {
        yield put(registerFailure());
    }
}