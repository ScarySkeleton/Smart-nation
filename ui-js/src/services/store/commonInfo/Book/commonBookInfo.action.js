import {getBookGenres} from '../../../Api';

export const FETCH_BOOK_CATEGORY = 'FETCH_BOOK_CATEGORY';
export const FETCH_BOOK_CATEGORY_SUCCESS = 'FETCH_BOOK_CATEGORY_SUCCESS';
export const FETCH_BOOK_CATEGORY_FAILURE = 'FETCH_BOOK_CATEGORY_FAILURE';

export const fetchBookCategory = () => {
    const { response } = getBookGenres()()
        .then(response => {
            console.log(response);
            response;
        })
}
