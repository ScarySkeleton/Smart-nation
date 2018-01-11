export const FETCHING_USER_INFO = 'FETCHING_USER_INFO';
export const FETCHING_USER_INFO_SUCCESS = 'FETCHING_USER_INFO_SUCCESS';
export const FETCHING_USER_INFO_FAILURE = 'FETCHING_USER_INFO_FAILURE';

export const fetchingUserInfo = () => {
    return {
        type: FETCHING_USER_INFO,
    }
}

export const fetchingUserInfoSuccess = (payload) => {
    return {
        type: FETCHING_USER_INFO_SUCCESS,
        payload,
    }
}

export const fetchingUserInfoFailure = () => {
    return {
        type: FETCHING_USER_INFO_FAILURE
    }
}
