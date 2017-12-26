import {call, take, put} from 'redux-saga/effects';
import {LOAD_DATA,
    loadDataSuccess,
    loadDataFailure} from './cabinet.actions';

import {isFetching, isntFetching} from 'services/store/globalState/global.actions';
//import {isFetching, isntFetching} from 'services/'

import {getCabinetData} from '../../../services/Api';

export default function* watchFetchCabinetData() {
    while(true) {
        const action = yield take(LOAD_DATA);
        yield call(fetchCabinetData, action.payload);
    }
}

export function* fetchCabinetData(data) {
    try {
        yield put(isFetching());
        const response = yield call(getCabinetData(data));
        yield put(loadDataSuccess(response));
    } catch(e) {
        yield put(loadDataFailure());
    } finally {
        yield put(isntFetching());
    }
}
