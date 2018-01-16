import {getBookGenres} from '../../../Api';

export const FETCH_BOOK_GENRE = 'FETCH_BOOK_GENRE';
export const FETCH_BOOK_GENRE_SUCCESS = 'FETCH_BOOK_GENRE_SUCCESS';
export const FETCH_BOOK_GENRE_FAILURE = 'FETCH_BOOK_GENRE_FAILURE';

export const fetchBookGenre = dispatch => {
    getBookGenres()()
        .then(response => dispatch(fetchBookGenreSuccess(response)))
        //.catch(error => dispatch(fetchBookCategoryFailure()))
}

export const fetchBookGenreSuccess = payload => {
    return {
        type: FETCH_BOOK_GENRE_SUCCESS,
        payload
    }
}

export const fetchBookGenreFailure = () => {
    return {
        type: FETCH_BOOK_GENRE_FAILURE
    }
}
