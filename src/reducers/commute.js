import produce from "immer";

import * as constants from 'constants'

const initialState = {
    isProcessing: false,
    data: {},
}

function commute(state = initialState, action) {
    switch (action.type) {
        case constants.GET_WRK_PLC_LIST_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.data = initialState.data;
            });
        case constants.GET_WRK_PLC_LIST_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.data = action.data;
            });
        case constants.GET_WRK_PLC_LIST_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.data = initialState.data;
            });
        default:
            return state;
    }
};



export default commute;