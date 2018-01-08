import {call, take, put} from 'redux-saga/effects';
import {LOAD_DATA,
    loadDataSuccess,
    loadDataFailure} from './cabinet.actions';

import {isFetching, isntFetching} from 'services/store/globalState/global.actions';
//import {isFetching, isntFetching} from 'services/'

import {getCabinetData} from '../../../services/Api';

export default function* watchFetchCabinetData() {
    while(true) {
        yield take(LOAD_DATA);
        yield call(fetchCabinetData);
    }
}

export function* fetchCabinetData() {
    try {
        yield put(isFetching());
        const response = yield call(getCabinetData());
        yield put(loadDataSuccess(response));
    } catch(e) {
        yield put(loadDataFailure());
    } finally {
        yield put(isntFetching());
    }
}
