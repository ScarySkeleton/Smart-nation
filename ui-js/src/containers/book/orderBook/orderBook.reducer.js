import * as actions from './orderBook.action';

const initState = {
    // About the book
    id: null,
    author: null,
    title: null,
    dateOfWriting: null,
    description: null,
    genre: null,
    type: null,
    image: null,
    // Contibutor info
    contributorAccount: null, // ID or Account nickname
    contributorName: null,
    contributorLastName: null,
    phoneNumber: null,
    dateOfAddedToTheSystem: null,
    price: null, 
    // Owner info
    ownerAccount: null,
}

const orderBookReducer = (state = initState, action) => { // ONLY FOR DEBUGGING
    switch(action.type) {

        case actions.ORDER_BOOK_GET_DATA_REQUEST:
            return {
                ...state,
                ...action.payload
            }

        case actions.ORDER_BOOK_GET_DATA_SUCCESS: 
            return {
                ...state,
                ...action.payload
            }

        case actions.ORDER_BOOK_GET_DATA_FAILURE:
            return {
                ...state,
                // About the book
                author: null,
                title: null,
                dateOfWriting: null,
                description: null,
                genre: null,
                type: null,
                // Contibutor info
                contributorAccount: null, // ID or Account nickname
                contributorName: null,
                contributorLastName: null,
                phoneNumber: null,
                dateOfAddedToTheSystem: null,
                price: null, 
                // Owner info
                ownerAccount: null,
            }

        default:
            return state;
    }
}

export default orderBookReducer;
