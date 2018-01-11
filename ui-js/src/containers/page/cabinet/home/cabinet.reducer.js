import * as actions from './cabinet.actions';

const initState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    roleName: null,
    availableFrom: null,
    availableTill: null,
    birthDate: null,
    registeredOn: null,
    ratingStatusName: null,
    photoinBinary: null,
    availableFrom: null,
    availableTill: null,
}

const cabinetReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.LOAD_DATA: 
            return {
                ...state
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
                id: null,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                roleName: null,
                availableFrom: null,
                availableTill: null,
                birthDate: null,
                registeredOn: null,
                ratingStatusName: null,
                photoinBinary: null,
            }

        default: 
            return state;
    }
}

export default cabinetReducer;
