import * as actions from './search.actions';

const initState = {
    searchedBooks: []
}

const searchBooksReducer = (state = initState, action) => {

    switch(action.type) {

        case actions.FETCH_SEARCH_BOOKS: 
            return {
                ...state,
                ...action.payload,
            }

        case actions.SUCCESS_SEARCH_BOOKS: 
            return {
                ...state, 
                ...action.payload,
            }

        case actions.FAILURE_SEARCH_BOOKS:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default searchBooksReducer;
