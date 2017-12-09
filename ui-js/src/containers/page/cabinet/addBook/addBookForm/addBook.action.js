export const FETCH_ADD_BOOK = 'FETCH_ADD_BOOK';
export const SUCCESS_ADD_BOOK = 'SUCCESS_ADD_BOOK';
export const FAILURE_ADD_BOOK = 'FAILURE_ADD_BOOK';

export function fetchAddBook(payload) {
    return {
        type: FETCH_ADD_BOOK,
        payload
    }
}

export function successAddBook(payload) {
    return {
        type: SUCCESS_ADD_BOOK,
        payload
    }
}

export function failureAddBook() {
    return {
        type: FAILURE_ADD_BOOK
    }
}
