export const LOAD_DATA = 'LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'LOAD_DATA_SUCCESS';
export const LOAD_DATA_FAILURE = 'LOAD_DATA_FAILURE';

export const loadData = (payload) => {
    return {
        type: LOAD_DATA,
        payload,
    }
};

export const loadDataSuccess = (payload) => {
    return {
        type: LOAD_DATA_SUCCESS,
        payload,
    }
}

export const loadDataFailure = () => {
    return {
        type: LOAD_DATA_FAILURE,
    }
}
