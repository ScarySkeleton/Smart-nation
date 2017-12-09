import * as actions from './cabinet.actions';

const initState = {
    userId: null,
}

const cabinetReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.LOAD_DATA: 
            return {
                ...state, 
                userId: action.userId,
            }
        case actions.LOAD_DATA_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case actions.LOAD_DATA_FAILURE: 
            return {
                ...state, 
                ...action.payload,
            }
        default: 
            return state;
    }
}

export default cabinetReducer;
