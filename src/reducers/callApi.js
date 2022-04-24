import produce from "immer";

import { CALL_API_REQUSET, CALL_API_SUCCESS, CALL_API_FAILURE } from '../constants'

const initialState = {
    isProcessing: false,
    data: [],
}

function callApi(state = initialState, action) {
    switch (action.type) {
        case CALL_API_REQUSET:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.data = initialState.data;
            });
        case CALL_API_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.data = action.data;
            });
        case CALL_API_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.data = initialState.data;
            });
        default:
            return state;
    }
};

export default callApi;