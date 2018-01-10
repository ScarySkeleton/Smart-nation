import * as actions from './book.action';

const initState = {
    isBookFetching: false,
    isBookFetchedSuccess: false,
    isBookFetchedFailure: false,
}

const bookReducer = (state = initState, action) => {
    console.log(state, action);
    switch(action.type) {
        case actions.FETCH_BOOK:
            return {
                ...state,
                ...action.payload,
                isBookFetching: true,
                isBookFetchedSuccess: false,
                isBookFetchedFailure: false,
            }
        
        case actions.FETCH_BOOK_SUCCESS: 
            return {
                ...state,
                ...action.payload,
                isBookFetching: false,
                isBookFetchedSuccess: true,
                isBookFetchedFailure: false,
            }

        case actions.FETCH_BOOK_FAILURE:
            return {
                ...state,
                ...action.payload,
                isBookFetching: false,
                isBookFetchedSuccess: false,
                isBookFetchedFailure: true,
            }

        default: 
            return state;
    }
}

export default bookReducer;
