export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';


export const login = (data) => ({
     type: LOGIN,
     data,
});

export const loginRequest = ({
    type: LOGIN_REQUEST,
});

export const loginFailure = ({
    type: LOGIN_FAILURE,
});

export const logout = () => ({
     type: LOGOUT,
});
