import {call, take, put} from 'redux-saga/effects';
import {
    FETCH_LEAVE_COMMENT,
    fetchCommentSuccess,
    fetchCommentFailure
} from './bookAddComment.action';
import {isFetching, isntFetching} from '../../../../services/store/globalState/global.actions';
import {setBookAddComment} from '../../../../services/Api';

export default function* watchFetchingBookAddComment() {
    while(true) {
        const action = yield take(FETCH_LEAVE_COMMENT);
        yield call(fetchingBookAddComment, action.payload);
    }
}

function* fetchingBookAddComment(commentData) {
    try {
        yield put(isFetching());
        const reponse = yield call(setBookAddComment(commentData));
        yield put(fetchCommentSuccess(reponse));
    } catch(error) {
        yield put(fetchCommentFailure());
    } finally {
        yield put(isntFetching());
    }
}
