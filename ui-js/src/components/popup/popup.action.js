export const POPUP_OPEN = 'POPUP_OPEN';
export const POPUP_CLOSE = 'POPUP_CLOSE';
export const POPUP_CANNOT_BE_CREATED = 'POPUP_CANNOT_BE_CREATED';

let index = 0;
export const popupOpen = (payload) => {

    console.log(payload);
    
    if(typeof payload !== 'object')
        return popupCannotBeCreated();

    if(!payload.id)
        payload.id = index++;

    return {
        type: POPUP_OPEN,
        payload
    }
}

export const popupClose = (payload) => {
    return {
        type: POPUP_CLOSE,
        payload
    }
}

export const popupCannotBeCreated = () => {
    return {
        type: POPUP_CANNOT_BE_CREATED
    }
}
