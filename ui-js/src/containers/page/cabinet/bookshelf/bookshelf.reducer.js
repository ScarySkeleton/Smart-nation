import * as actions from './bookshelf.actions';

const initState = {
    bookShelfBooks: [],
}

const bookShelfReducer = (state = initState, action) => {
    switch(action.type) {

        case actions.FETCHING_BOOK_SHELF_BOOKS: {
            return {
                ...state,
                bookShelfBooks: [],
            }
        }
        
        case actions.FETCHING_BOOK_SHELF_BOOKS_SUCCESS: {
            return {
                ...state, 
                bookShelfBooks: [
                    ...action.payload
                ],
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
