export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';
export const CHANGE_USER_INFO_FAILURE = 'CHANGE_USER_INFO_FAILURE';

export const CHANGE_USER_PICTURE = 'CHANGE_USER_PICTURE';
export const CHANGE_USER_PICTURE_SUCCESS = 'CHANGE_USER_PICTURE_SUCCESS';
export const CHANGE_USER_PICTURE_FAILURE = 'CHANGE_USER_PICTURE_FAILURE';

export const changeUserInfo = (payload) => {
    return {
        type: CHANGE_USER_INFO,
        payload
    }
}

export const changeUserInfoSuccess = () => {
    return {
        type: CHANGE_USER_INFO_SUCCESS,
    }
}

export const changeUserInfoFailure = () => {
    return {
        type: CHANGE_USER_INFO_FAILURE
    }
}

export const changeUserPicture = (payload) => {
    return {
        type: CHANGE_USER_PICTURE,
        payload
    }
}

export const changeUserPictureSuccess = () => {
    return {
        type: CHANGE_USER_PICTURE_SUCCESS
    }
}

export const changeUserPictureFailure = () => {
    return {
        type: CHANGE_USER_PICTURE_FAILURE
    }
}
