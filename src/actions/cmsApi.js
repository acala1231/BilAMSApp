import * as constants from '../constants'


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

export const getWrkPlcList = (params) => {
    return {
        type: constants.GET_WRK_PLC_LIST_REQUEST,
        url: '/work-places/' + params.pageNo,
        method: 'get',
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

export const aplyWrkPlc = (params) => {
    return {
        type: constants.APLY_WRK_PLC_REQUEST,
        url: '/work-place-apply',
        method: 'post',
        params: params
    }
}

export const aplyWrkPlcSucc = (data) => {
    return {
        type: constants.APLY_WRK_PLC_SUCCESS,
        data,
    }
}

export const aplyWrkPlcFail = () => {
    return {
        type: constants.APLY_WRK_PLC_FAILURE,
    }
}

export const regWrkPlc = (params) => {
    console.log('action regWrkPlc', params);
    return {
        type: constants.REG_WRK_PLC_REQUEST,
        url: '/emp-work',
        method: 'post',
        params,
    }
}

export const regWrkPlcSucc = (data) => {
    return {
        type: constants.REG_WRK_PLC_SUCCESS,
        data,
    }
}

export const regWrkPlcFail = () => {
    return {
        type: constants.REG_WRK_PLC_FAILURE,
    }
}


