import { call, take, put, fork } from 'redux-saga/effects';
import { login, loginRequest, loginFailure, logout } from './authActions';

export default function* authProccess() {
    const isLogined = false;
    //while(!isLogined) {
        yield take('')
    //}
}