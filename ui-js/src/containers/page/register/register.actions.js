export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export function registerRequest(payload) {
    return {
        type: REGISTER_REQUEST,
        payload,
    }
};

export function registerSuccess() {
    return {
        type: REGISTER_SUCCESS,
    }
}

export function registerFailure() {
    return {
        type: REGISTER_FAILURE,
    }
}
