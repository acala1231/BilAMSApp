import _ from 'lodash'

import * as constants from '../constants'

export const getCurLocation = (params) => {
    return {
        type: constants.GET_CUR_LOCA_REQUEST,
        url: '/emp-work',
        method: 'post',
        params,
    };
}

export const getCurLocationSucc = (location) => {
    return {
        type: constants.GET_CUR_LOCA_SUCCESS,
        location,
    };
}

export const getCurLocationFail = () => {
    return {
        type: constants.GET_CUR_LOCA_FAILURE,
    };
}
