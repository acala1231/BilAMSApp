import * as constants from 'constants'


export function callPostCmsApi(url, params) {
    return {
        type: constants.CALL_POST_API,
        url,
        params,
    }
}

export function callGetCmsApi(url, params) {
    return {
        type: constants.CALL_GET_API,
        url,
        params,
    }
}

export function login(params) {
    return {
        type: constants.LOGIN_REQUEST,
        params,
    }
}