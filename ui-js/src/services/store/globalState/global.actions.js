export const IS_FETCHING = 'IS_FETCHING';
export const ISNT_FETCHING = 'ISNT_FETCHING';

export const isFetching = () => {
    return {
        type: IS_FETCHING,
    }
}

export const isntFetching = () => {
    return {
        type: ISNT_FETCHING,
    }
}
