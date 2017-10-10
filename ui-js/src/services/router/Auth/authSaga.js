import { call, take, put, fork } from 'redux-saga/effects';
import * as auth from './authActions';

export default function* authProccess() {
    //const isLogined = false;
    //while(!isLogined) {
        console.log('before login request');
        yield take(auth.LOGIN_REQUEST);
        console.log('after login request');
    //}
}