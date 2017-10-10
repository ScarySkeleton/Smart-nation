import * as actions from './authActions.js';
import initState from './authInit.js';

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.LOGIN:
            console.log("login");
            return {
                ...state, 
                userdata: {
                    name: action.data.name,
                    surname: action.data.surname,
                },
                isLogined: true,
                loginFetch: false,
                role: action.data.role,
            };
        case actions.LOGIN_REQUEST: 
            console.log("login request");
            return {
                ...state, 
                userdata: {
                    name: null,
                    surname: null,
                },
                isLogined: false,
                loginFetch: true,
                role: null,
            }
        case actions.LOGOUT:
            console.log("logout");
            return {
                ...state, 
                userdata: {
                    name: null,
                    surname: null,
                },
                isLogined: false,
                loginFetch: false,
                role: null,
            };
        default:
            return state;
    }
}

export default authReducer;
