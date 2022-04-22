import { takeEvery, put, call } from "redux-saga/effects";
import { Alert } from "react-native";

import * as constants from '../constants'
import axios from "axios";


function callPostAxios(url, params) {
    return axios.post(url, params, { headers: { "Content-Type": `application/json` } });
}

function callGetAxios(url, params) {
    return axios.get(url, params, { headers: { "Content-Type": `application/json` } });
}

function* getCmsApiData(action) {
    try {
        yield put({ type: constants.LOADER_START });
        const response = yield call(action.method == 'post' ? callPostAxios : callGetAxios, constants.CMS_API_HOST + action.url, action.params);

        yield put({ type: constants.LOADER_END });
        yield put({ type: constants.CALL_SUCCESS, data: response.data.data });
    } catch (e) {
        yield put({ type: constants.LOADER_END });
        yield put({ type: constants.ERROR_MSG_SHOW, message: 'API 호출중 에러가 발생했습니다.' });
    }
}

function* login(action) {
    try {
        yield put({ type: constants.LOADER_START });
        const response = yield call(callPostAxios, constants.CMS_API_HOST + 'login', action.params);

        if (response.data.status == 'fail') {
            throw '로그인실패';
        }

        yield put({ type: constants.LOADER_END });
        yield put({ type: constants.LOGIN, empInfo: response.data.data });
    } catch (e) {
        yield put({ type: constants.LOADER_END });
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인중 에러가 발생했습니다.' });
        yield put({ type: constants.LOGOUT });
    }
}
function showErrorMsg() {
    Alert.alert('에러가 발생하였습니다.');
}

function* rootSaga() {
    yield takeEvery(constants.CALL_CMS_API, getCmsApiData);
    yield takeEvery(constants.LOGIN_REQUEST, login);
    yield takeEvery(constants.CALL_FAILURE, showErrorMsg);

}
export default rootSaga;