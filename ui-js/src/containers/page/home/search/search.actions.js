export const FETCH_SEARCH_BOOKS = 'FETCH_SEARCH_BOOKS';
export const SUCCESS_SEARCH_BOOKS = 'SUCCESS_SEARCH_BOOKS';
export const FAILURE_SEARCH_BOOKS = 'FAILURE_SEARCH_BOOKS';

export const fetchSearchBooks = (payload) => {
    return {
        type: FETCH_SEARCH_BOOKS,
        payload
    }
}

export const successSearchBooks = (payload) => {
    return {
        type: SUCCESS_SEARCH_BOOKS,
        payload,
    }
}

export const failureSeatchBooks = () => {
    return {
        type: FAILURE_SEARCH_BOOKS,
    }
}
