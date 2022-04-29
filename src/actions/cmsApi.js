import * as constants from 'constants'


export const loginReuest = (params) => {
    return {
        type: constants.LOGIN_REQUEST,
        url: '/emp/auth',
        method: 'post',
        params,
    }
}

export const login = (data) => {
    return {
        type: constants.LOGIN,
        empInfo: data
    }
}

export const logoutRequest = () => {
    return {
        type: constants.LOGOUT_REQUEST,
    }
}

export const logout = () => {
    return {
        type: constants.LOGOUT,
    }
}

export const modifyEmpPw = (params) => {
    return {
        type: constants.MODIFY_EMP_PW_REQUEST,
        url: '/emp/pw',
        method: 'put',
        params,
    }
}

// export const callCmsApi = (url, params) => {
//     return {
//         type: constants.CALL_API_REQUSET,
//         url,
//         method: 'post',
//         params,
//     }
// }

// export const callCmsApiSucc = (data) => {
//     return {
//         type: constants.CALL_API_SUCCESS,
//         data,
//     }
// }

// export const callCmsApiFail = () => {
//     return {
//         type: constants.CALL_API_FAILURE,
//     }
// }




export const getWrkPlcList = (params) => {
    return {
        type: constants.GET_WRK_PLC_LIST_REQUEST,
        url: '/work-places',
        method: 'get',
        params,
    }
}

export const getWrkPlcListSucc = (data) => {
    return {
        type: constants.GET_WRK_PLC_LIST_SUCCESS,
        data,
    }
}

export const getWrkPlcListFail = () => {
    return {
        type: constants.GET_WRK_PLC_LIST_FAILURE,
    }
}