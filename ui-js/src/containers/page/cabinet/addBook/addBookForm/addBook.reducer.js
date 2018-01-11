import * as actions from './addBook.action';

const initState = {
    isFetching: false,
    isBookAddedSuccess: false,
}

export default function addBookReducer(state = initState, action) {
    switch(action.type) {
        
        case actions.FETCH_ADD_BOOK: 
            return {
                ...state, 
                isFetching: true,
                isBookAddedSuccess: false,
            }

        case actions.SUCCESS_ADD_BOOK: 
            return {
                ...state,
                isFetching: false,
                isBookAddedSuccess: true,
            }

        case actions.FAILURE_ADD_BOOK: 
            return {
                ...state,
                isFetching: false,
                isBookAddedSuccess: false,
            }

        default: 
            return state;
    }
}
