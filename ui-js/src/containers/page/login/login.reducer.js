import * as actions from './login.actions.js';

const initState = {
    userdata: {
        name: null,//,userDataMock.data[0].name,
        surname: null,//userDataMock.data[0].surname,
        userName: null,//userDataMock.data[0].login,
        role: null,//userDataMock.data[0].role,
    },
    isLogined: false,
    loginFetch: false,
};

const loginReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.LOGIN_REQUEST: 
            return {
                ...state, 
                userdata: {
                    name: null,
                    surname: null,
                    userName: null,
                    role: null,
                },
                isLogined: false,
                loginFetch: true,
            }
        case actions.LOGIN_SUCCESS:
            return {
                ...state, 
                userdata: {
                    name: action.payload.name,
                    surname: action.payload.surname,
                    userName: action.payload.username,
                    role: action.payload.role,
                },
                isLogined: true,
                loginFetch: false,
            };
        case actions.LOGIN_FAILURE:
            return {
                ...state, 
                userdata: {
                    name: null,
                    surname: null,
                    userName: null,
                    role: null,
                },
                isLogined: false,
                loginFetch: false,
            };
        case actions.LOGOUT:
            return {
                ...state, 
                userdata: {
                    name: null,
                    surname: null,
                    userName: null,
                    role: null,
                },
                isLogined: false,
                loginFetch: false,
            };
        default:
            return state;
    }
}

export default loginReducer;
