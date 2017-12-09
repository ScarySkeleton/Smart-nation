import * as actions from './bookshelf.actions';

const initState = {
    bookShelfBooks: [],
}

const bookShelfReducer = (state = initState, action) => {
    switch(action.type) {

        case actions.FETCHING_BOOK_SHELF_BOOKS: {
            return {
                ...state
            }
        }
        
        case actions.FETCHING_BOOK_SHELF_BOOKS_SUCCESS: {
            return {
                ...state, 
                ...action.payload,
            }
        }

        case actions.FETCHING_BOOK_SHELF_BOOKS_FAILURE:
            return {
                ...state,
                bookShelfBooks: [],
            }

        default: 
            return state;
    }
}

export default bookShelfReducer;
