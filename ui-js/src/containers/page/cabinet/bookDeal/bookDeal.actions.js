export const FETCHING_BOOK_DEAL_DATA = 'FETCHING_BOOK_DEAL_DATA';
export const FETCHING_BOOK_DEAL_DATA_SUCCESS = 'FETCHING_BOOK_DEAL_DATA_SUCCESS';
export const FETCHING_BOOK_DEAL_DATA_FAILURE = 'FETCHING_BOOK_DEAL_DATA_FAILURE';
export const FETCHING_BOOK_DEAL_CHANGE = 'FETCHING_BOOK_DEAL_CHANGE';
export const FETCHING_BOOK_DEAL_CHANGE_SUCCESS = 'FETCHING_BOOK_DEAL_CHANGE_SUCCESS';
export const FETCHING_BOOK_DEAL_CHANGE_FAILURE = 'FETCHING_BOOK_DEAL_CHANGE_FAILURE';

export const fetchingBookDealData = () => {
    return {
        type: FETCHING_BOOK_DEAL_DATA,
    }
}

export const fetchingBookDealDataSuccess = (payload) => {
    return {
        type: FETCHING_BOOK_DEAL_DATA_SUCCESS,
        payload,
    }
}

export const fetchingBookDealDataFailure = () => {
    return {
        type: FETCHING_BOOK_DEAL_DATA_FAILURE
    }
}

export const fetchingBookDealChange = (payload) => {
    return {
        type: FETCHING_BOOK_DEAL_CHANGE,
        payload
    }
}


export const fetchingBookDealChangeSuccess = (payload) => {
    return {
        type: FETCHING_BOOK_DEAL_CHANGE_SUCCESS,
        payload,
    }
}

export const fetchingBookDealChangeFailure = () => {
    return {
        type: FETCHING_BOOK_DEAL_CHANGE_FAILURE
    }
}
