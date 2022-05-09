import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import * as Device from 'expo-device';

import * as constants from '../constants'
import { common } from '../actions';


export const callCmsApi = async (param) => {
    const config = {
        method: _.isEmpty(param.method) ? 'get' : param.method,
        url: constants.HOST_CMS_API + param.url,
        data: param.params,
        headers: {
            'Content-Type': 'application/json',
            'CMS-AUTH-TOKEN': await getAsyncStore(constants.CMS_AUTH_TOKEN),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'x-access-token, Origin, X-Requested-With, Content-Type, Accept',
            'device-model-name': Device.modelName,
        },
        timeout: 5000,
    };

    // console.log('config', config);

    return axios(config);
}

export const showAlertMsg = (action, message) => {
    action(common.alertMsgShow(message));
}

export const hideAlertMsg = (action) => {
    action(common.alertMsgHide());
}

export const showConfirmMsg = (action, message, callback) => {
    action(common.confirmMsgShow(message, callback));
}

export const hideConfirmMsg = (action) => {
    action(common.confirmMsgHide());
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

// 토큰만료여부확인
export const validationToken = (status) => {
    if (status == 'inValidToken') { // 토큰만료
        // 만료토큰정보 삭제
        setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        return false;
    }
    return true;
}

// 비밀번호유형체크
export const chkPwReg = (empPw) => {
    //  8 ~ 10자 영문, 숫자 조합
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
    return reg.test(empPw);
}