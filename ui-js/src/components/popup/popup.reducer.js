import * as actions from './popup.action';

const initState = [];

const popupReducer = (state = initState, action) => {
    switch(action.type) {
        case actions.POPUP_OPEN:
            return [
                ...state,
                {
                    ...action.payload
                }
            ]

        case actions.POPUP_CLOSE: 
            const updPopup = [
                ...state
            ];

            const popupIndex = updPopup.indexOf(action.payload);
            if(popupIndex !== -1)
                updPopup.splice(popupIndex, 1);

            return [
                ...updPopup
            ];
        
        case actions.POPUP_CANNOT_BE_CREATED:
        default:
            return state
    }
} 

export default popupReducer;
