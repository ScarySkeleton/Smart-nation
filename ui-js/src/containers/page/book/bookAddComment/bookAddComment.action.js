export const FETCH_LEAVE_COMMENT = 'FETCH_LEAVE_COMMENT';
export const FETCH_LEAVE_COMMENT_SUCCESS = 'FETCH_LEAVE_COMMENT_SUCCESS';
export const FETCH_LEAVE_COMMENT_FAILURE = 'FETCH_LEAVE_COMMENT_FAILURE';

export const fetchComment = (payload) => {
    return {
        type: FETCH_LEAVE_COMMENT,
        payload
    }
}

export const fetchCommentSuccess = (payload) => {
    return {
        type: FETCH_LEAVE_COMMENT_SUCCESS,
        payload
    }   
}

export const fetchCommentFailure = () => {
    return {
        type: FETCH_LEAVE_COMMENT_FAILURE
    }
}
