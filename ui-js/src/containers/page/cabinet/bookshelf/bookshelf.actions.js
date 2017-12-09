export const FETCHING_BOOK_SHELF_BOOKS = 'FETCHING_BOOK_SHELF_BOOKS';
export const FETCHING_BOOK_SHELF_BOOKS_SUCCESS = 'FETCHING_BOOK_SHELF_BOOKS_SUCCESS';
export const FETCHING_BOOK_SHELF_BOOKS_FAILURE = 'FETCHING_BOOK_SHELF_BOOKS_FAILURE';

export const fetchingBookShelfBooks = () => {
    return {
        type: FETCHING_BOOK_SHELF_BOOKS,
    }
}

export const fetchingBookShelfBooksSuccess = (payload) => {
    return {
        type: FETCHING_BOOK_SHELF_BOOKS_SUCCESS,
        payload,
    }
}

export const fetchingBookShelfBooksFailure = () => {
    return {
        type: FETCHING_BOOK_SHELF_BOOKS_FAILURE
    }
}
