
import produce from "immer";

import * as constants from '../constants'


const initLoaderState = {
    isLoading: false
}

export function loader(state = initLoaderState, action) {
    switch (action.type) {
        case constants.LOADER_START:
            return {
                isLoading: true,
            }
        case constants.LOADER_END:
            return {
                isLoading: false,
            }
        default:
            return state;
    }
};


const initAlertMsgState = {
    isShow: false,
    message: null
}

export function alertMsg(state = initAlertMsgState, action) {
    switch (action.type) {
        case constants.ALERT_MSG_SHOW:
            return produce(state, draft => {
                draft.isShow = true;
                draft.message = action.message;
            });
        case constants.ALERT_MSG_HIDE:
            return produce(state, draft => {
                draft.isShow = initAlertMsgState.isShow;
                draft.message = initAlertMsgState.message;
            });
        default:
            return state;
    }
};


const initConfirmMsgState = {
    isShow: false,
    message: null,
    callback: undefined,
}

export function confirmMsg(state = initConfirmMsgState, action) {
    switch (action.type) {
        case constants.CONFIRM_MSG_SHOW:
            return produce(state, draft => {
                draft.isShow = true;
                draft.message = action.message;
                draft.callback = action.callback;
                
            });
        case constants.CONFIRM_MSG_HIDE:
            return produce(state, draft => {
                draft.isShow = initConfirmMsgState.isShow;
                draft.message = initConfirmMsgState.message;
                draft.callback = initConfirmMsgState.callback;
            });
        default:
            return state;
    }
};


