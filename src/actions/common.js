import _ from 'lodash'

import * as constants from 'constants'


// export function errorMsgHide() {
//     return {
//         type: constants.ERROR_MSG_HIDE,
//     }
// }

export function errorMsgShow(errorMsg) {
    return {
        type: constants.ERROR_MSG_SHOW,
        message: errorMsg,
    }
}

export function loaderStart() {
    return { type: constants.LOADER_START };
}

export function loaderEnd() {
    return { type: constants.LOADER_END };
}

