
import produce from "immer";

import { ERROR_MSG_SHOW, ERROR_MSG_HIDE } from 'constants'


const initialState = {
    error: false,
    message: null
}

function errorMsg(state = initialState, action) {
    switch (action.type) {
        case ERROR_MSG_SHOW:
            return produce(state, draft => {
                draft.error = true;
                draft.message = action.message;
            });
        case ERROR_MSG_HIDE:
            return produce(state, draft => {
                draft.error = initialState.error;
                draft.message = initialState.message;
            });
        default:
            return state;
    }
};

export default errorMsg;