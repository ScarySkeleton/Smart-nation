import * as actions from './bookDeal.actions';

const initState = {
    bookDealData: [],
    dealIdToChange: null,
}

const bookDealReducer = (state = initState, action) => {
    switch(action.type) {

        case actions.FETCHING_BOOK_DEAL_DATA: {
            return {
                ...state,
                bookDealData: [],
                dealIdToChange: null,
            }
        }

        case actions.FETCHING_BOOK_DEAL_DATA_SUCCESS: {
            return {
                ...state, 
                bookDealData: [
                    ...action.payload
                ],
                dealIdToChange: null,
            }
        }

        case actions.FETCHING_BOOK_DEAL_DATA_FAILURE:
            return {
                ...state,
                bookDealData: [],
                dealIdToChange: null,
            }

        case actions.FETCHING_BOOK_DEAL_CHANGE: {
            return {
                ...state,
                dealIdToChange: action.payload
            }
        }
        
        case actions.FETCHING_BOOK_DEAL_CHANGE_SUCCESS: {
            return {
                ...state, 
                dealIdToChange: null,
            }
        }

        case actions.FETCHING_BOOK_DEAL_CHANGE_FAILURE:
            return {
                ...state,
                dealIdToChange: null,
            }

        default: 
            return state;
    }
}

export default bookDealReducer;
