import * as actions from './logout.action';

const initState = {
    userdata: {
        name: null,
        surname: null,
        userName: null,
        role: null,
    },
    isLogined: false,
    loginFetch: false,
};

const logoutReducer = (state = initState, action) => {
    switch(action.type) {
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
         }
        default: 
         return {
             ...state,
         }
    }
}

export default logoutReducer;