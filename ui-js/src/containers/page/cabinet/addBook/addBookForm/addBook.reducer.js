import * as actions from './addBook.action';

const initState = {
    isFetching: false,
    addedBook: {
        id: null,
    }
}

export default function addBookReducer(state = initState, action) {
    switch(action.type) {
        case actions.FETCH_ADD_BOOK: 
            return {
                ...state, 
                isFetching: true,
                addedBook: {
                    id: null,
                }
            }
        case actions.SUCCESS_ADD_BOOK: 
            return {
                ...state,
                isFetching: false,
                addedBook: {
                    id: action.payload.id,
                }
            }
        case actions.FAILURE_ADD_BOOK: 
            return {
                ...state,
                isFetching: false,
                addedBook: {
                    id: null,
                }
            }
        default: 
            return state;
    }
}
