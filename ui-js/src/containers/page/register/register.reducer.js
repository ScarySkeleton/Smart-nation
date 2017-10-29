import * as actions from "./register.actions";

const initState = {

}

const registerReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.REGISTER_REQUEST:
            return {
                ...state, 
                registerData: {
                    phone: action.payload.phone,
                    password: action.payload.password,
                }
            }
        case action.REGISTER_SUCCESS: 
            return {
                ...state,
            }
        case action.REGISTER_FAILURE:
            return {
                ...state,
            }
        default: 
            return state;
    }
}

export default registerReducer;
