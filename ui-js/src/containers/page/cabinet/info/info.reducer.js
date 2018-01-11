import * as actions from './info.actions';

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
}

const infoReducer = (state = initState, action) => {
    switch(action.type) {

        case actions.FETCHING_USER_INFO: {
            return {
                ...state,
            }
        }
        
        case actions.FETCHING_USER_INFO_SUCCESS: {
            return {
                ...state, 
                ...action.payload
            }
        }

        case actions.FETCHING_USER_INFO_FAILURE:
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

export default infoReducer;
