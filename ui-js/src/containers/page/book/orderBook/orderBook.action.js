export const ORDER_BOOK_GET_DATA_REQUEST = 'ORDER_BOOK_GET_DATA_REQUEST';
export const ORDER_BOOK_GET_DATA_SUCCESS = 'ORDER_BOOK_GET_DATA_SUCCESS';
export const ORDER_BOOK_GET_DATA_FAILURE = 'ORDER_BOOK_GET_DATA_FAILURE';

export const orderBookRequest = (payload) => ({
    type: ORDER_BOOK_GET_DATA_REQUEST,
    payload
})

export const orderBookSuccess = (payload) => ({
    type: ORDER_BOOK_GET_DATA_SUCCESS,
    payload
})

export const orderBookFailure = () => ({
    type: ORDER_BOOK_GET_DATA_FAILURE
})
