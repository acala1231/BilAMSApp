import produce from "immer";

import { CALL_REQUEST, CALL_SUCCESS, CALL_FAILURE } from 'constants'


const initialState = {
    isLoading: false,
    data: [],
}

function callApi(state = initialState, action) {
    switch (action.type) {
        case CALL_REQUEST:
            return produce(state, draft => {
                draft.data = initialState.data;
                draft.isLoading = true;
            });
        case CALL_SUCCESS:
            return produce(state, draft => {
                draft.data = action.data;
                draft.isLoading = initialState.isLoading;
            });
        case CALL_FAILURE:
            return produce(state, draft => {
                draft.data = initialState.data;
                draft.isLoading = initialState.isLoading;
            });
        default:
            return state;
    }
};

export default callApi;