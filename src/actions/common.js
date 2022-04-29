import _ from 'lodash'

import * as constants from '../constants'


export function loaderStart() {
    return { type: constants.LOADER_START };
}

export function loaderEnd() {
    return { type: constants.LOADER_END };
}

export function alertMsgHide() {
    return { type: constants.ALERT_MSG_HIDE }
}

export function alertMsgShow(messsage) {
    return {
        type: constants.ALERT_MSG_SHOW,
        message: messsage,
    }
}

export function confirmMsgHide() {
    return { type: constants.CONFIRM_MSG_HIDE }
}

export function confirmMsgShow(messsage, callback) {
    console.log('action callback', callback);
    return {
        type: constants.CONFIRM_MSG_SHOW,
        message: messsage,
        callback: callback,
    }
}