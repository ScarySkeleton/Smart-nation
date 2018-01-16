import store from '../../../../services/store/index';
import {loginWithFacebookRequest} from '../../../../services/Api';
import {loginSuccess, loginFailure} from '../login.actions';
import {fetchingError} from '../../../../services/ApiUserInfo';

export const FACEBOOK_LOGIN_FETCH = 'FACEBOOK_LOGIN_FETCH';
export const FACEBOOK_LOGIN_FETCH_SUCCESS = 'FACEBOOK_LOGIN_FETCH_SUCCESS';
export const FACEBOOK_LOGIN_FETCH_FAILURE = 'FACEBOOK_LOGIN_FETCH_FAILURE';

export const facebookLoginFetch = () => {
    return {
        type: FACEBOOK_LOGIN_FETCH,
    }
}

export const facebookLoginSuccess = (payload) => {
    loginWithFacebookRequest(payload)()
        .then(response => {
            if(!response)
                throw Error("Error while fetch Facebook data to our server.");

            store.dispatch(loginSuccess(response));
        })
        .catch(error => {
            fetchingError(error);
            loginFailure();
        })
}

export const facebookLoginFailure = () => {
    return {
        type: FACEBOOK_LOGIN_FETCH_FAILURE
    }
}
