import * as actions from './actions.js';

const rootReducer = (state = null, action) => {
    switch(action.type) {
        case actions.LOGIN:
            return {
                isLogin: true
            };
        case actions.LOGOUT:
            return {
                isLogin: false
            };
        default:
            return state;
    }
}

export default rootReducer;
