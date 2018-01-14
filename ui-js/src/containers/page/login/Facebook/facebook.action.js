import {loginWithFacebookRequest} from '../../../../services/Api';

export const FACEBOOK_LOGIN_FETCH = 'FACEBOOK_LOGIN_FETCH';
export const FACEBOOK_LOGIN_FETCH_SUCCESS = 'FACEBOOK_LOGIN_FETCH_SUCCESS';
export const FACEBOOK_LOGIN_FETCH_FAILURE = 'FACEBOOK_LOGIN_FETCH_FAILURE';

export const facebookLoginFetch = (payload) => {
    return {
        type: FACEBOOK_LOGIN_FETCH,
        payload,
    }
}


