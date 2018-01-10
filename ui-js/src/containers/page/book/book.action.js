export const FETCH_BOOK = 'FETCH_BOOK';
export const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
export const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

export const fetchBook= (payload) => {
    return {
        type: FETCH_BOOK,
        payload
    }
}

export const fetchBookSuccess= (payload) => {
    return {
        type: FETCH_BOOK_SUCCESS,
        payload
    }   
}

export const fetchBookFailure = () => {
    return {
        type: FETCH_BOOK_FAILURE
    }
}
