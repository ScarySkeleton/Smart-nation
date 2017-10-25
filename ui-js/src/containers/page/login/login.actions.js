export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


export const loginSuccess = (payload) => ({
     type: LOGIN_SUCCESS,
     payload,
});

export const loginRequest = () => {
    console.log("req");
    return {
        type: LOGIN_REQUEST,
    }
};

export const loginFailure = () => ({
    type: LOGIN_FAILURE,
});

export const logout = () => ({
     type: LOGOUT,
});
