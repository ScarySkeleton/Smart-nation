import * as actions from './global.actions';

const initState = {
    isFetching: false,
}

const globalState = (state, action) => {
    switch(action.type) {
        case actions.IS_FETCHING: 
            return {
                ...state, 
                isFetching: true,
            }
        case actions.ISNT_FETCHING:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state;
    }
}

export default globalState;
