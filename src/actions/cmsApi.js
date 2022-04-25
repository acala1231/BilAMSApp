import * as constants from 'constants'


// export const callCmsApi = (url, params) => {
//     return {
//         type: constants.CALL_API_REQUSET,
//         url,
//         params,
//     }
// }

export const login = (params) => {
    return {
        type: constants.LOGIN_REQUEST,
        url: 'login',
        method: 'post',
        params,
    }
}

export const logout = () => {
    return {
        type: constants.LOGOUT_REQUEST,
    }
}

export const modifyEmpPw = (params) => {
    return {
        type: constants.MODIFY_EMP_PW_REQUEST,
        url: 'modifyPw',
        method: 'post',
        params,
    }
}