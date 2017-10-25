import * as actions from './login.actions.js';

const initState = {
    userdata: {
        name: null,
        surname: null,
    },
    isLogined: false,
    loginFetch: false,
    role: null,
};

const loginReducer = (state = initState, action) => {
    switch(action.type) {
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
        case actions.LOGIN_SUCCESS:
            console.log("login s");
            return {
                ...state, 
                userdata: {
                    name: action.name,
                    surname: action.surname,
                },
                isLogined: true,
                loginFetch: false,
                role: action.role,
            };
        case actions.LOGIN_FAILURE:
            console.log("login f");
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

export default loginReducer;
