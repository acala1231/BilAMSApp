import * as constants from '../constants'


export function callCmsApi(url, params) {
    return {
        type: constants.CALL_API_REQUSET,
        url,
        params,
    }
}

export function login(params) {
    console.log('action login', params);
    return {
        type: constants.LOGIN_REQUEST,
        url: 'login',
        method: 'post',
        params,
    }
}