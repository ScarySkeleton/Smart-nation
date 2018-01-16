import * as actions from './commonBookInfo.action';

const initState = {
    bookGenre: []
}

const commonBookReducer = (state = initState, action) => {
    switch(action.type) {
        
        case actions.FETCH_BOOK_GENRE_SUCCESS:
            return {
                ...state,
                bookGenre: action.payload
            }

        case actions.FETCH_BOOK_GENRE_FAILURE:
            return {
                ...state,
                bookGenre: []
            }
    
        default: 
            return state;
    }
} 

export default commonBookReducer;
