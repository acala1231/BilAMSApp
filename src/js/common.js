import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from "lodash";
// import { resolve } from 'dns/promises';

import * as constants from 'constants'


export const callCmsApi = async (param) => {
    const method = _.isEmpty(param.method) ? 'get' : param.method;
    const url = param.url;
    const params = param.params
    const config = {
        baseURL: constants.HOST_CMS_API,
        headers: {
            'Content-Type': 'application/json',
            'CMS-AUTH-TOKEN': await getAsyncStore(constants.CMS_AUTH_TOKEN),
        },
        timeout: 5000,
    };

    // console.log('axios url', url);
    // console.log('axios params', params);
    // console.log('axios config', config);

    if (method == 'post') {
        return axios.post(url, params, config).catch(function (error) {
            if (error.response) {
                // 토큰만료
                if (error.response.status == 403) {
                    return Promise.resolve({ 'data': { 'status': 'inValidToken' } });
                }
            };
        });
    } else {
        return axios.get(url, params, config);
    }
};

export const showErrorMsg = (action, errorMsg) => {
    action({
        type: constants.ERROR_MSG_SHOW,
        message: errorMsg,
    });
}

export const hideErrorMsg = (action) => {
    action({
        type: constants.ERROR_MSG_HIDE,
    });
}

export const setAsyncStore = async (key, value) => {
    try {
        const json = JSON.stringify(value);
        await AsyncStorage.setItem(key, json);
    } catch (e) {
        console.log(e);
    }
}

export const getAsyncStore = async (key) => {
    try {
        const json = await AsyncStorage.getItem(key)
        if (!_.isEmpty(json)) {
            return JSON.parse(json);
        }
    } catch (e) {
        console.log(e);
    }
    return '';
}