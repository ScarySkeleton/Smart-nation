import * as actions from "./register.actions";

const initState = {
    isFetching: false,
    isRegisteredSuccess: false,
    isRegisteredFailure: false,
}

const registerReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.REGISTER_REQUEST:
            return {
                ...state, 
                isFetching: true,
                isRegisteredSuccess: false,
                isRegisteredFailure: false,
                registerData: {
                    phone: action.payload.phone,
                    password: action.payload.password,
                }
            }
        case action.REGISTER_SUCCESS: 
            return {
                ...state,
                isFetching: false,
                isRegisteredSuccess: true,
                isRegisteredFailure: false,
            }
        case action.REGISTER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isRegisteredSuccess: false,
                isRegisteredFailure: true,
            }
        default: 
            return state;
    }
}

export default registerReducer;
