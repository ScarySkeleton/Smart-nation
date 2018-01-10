import * as actions from './bookAddComment.action';

const initState = {
    isCommentFetching: false,
    isCommentFetchedSuccess: false,
    isCommentFetchedFailure: false,
}

const commentReducer = (state = initState, action) => {

    switch(action.type) {
        case actions.FETCH_LEAVE_COMMENT:
            return {
                ...state,
                ...action.payload,
                isCommentFetching: true,
                isCommentFetchedSuccess: false,
                isCommentFetchedFailure: false,
            }
        
        case actions.FETCH_LEAVE_COMMENT_SUCCESS: 
            return {
                ...state,
                ...action.payload,
                isCommentFetching: false,
                isCommentFetchedSuccess: true,
                isCommentFetchedFailure: false,
            }

        case actions.FETCH_LEAVE_COMMENT_FAILURE:
            return {
                ...state,
                ...action.payload,
                isCommentFetching: false,
                isCommentFetchedSuccess: false,
                isCommentFetchedFailure: true,
            }

        default: 
            return state;
    }
}

export default commentReducer;
