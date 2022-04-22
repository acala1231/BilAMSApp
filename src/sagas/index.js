import { takeEvery, put, call } from "redux-saga/effects";
import * as constants from '../constants'
import axios from "axios";

function callPostAxios(url, params) {
    return axios.post(url, params);
}

function callGetAxios(url, params) {
    return axios.post(url, params);
}

function* getCmsApiData(action) {
    try {
        yield put({ type: constants.LOADER_START })
        const response = yield call(action.method == 'post' ? callPostAxios : callGetAxios, constants.CMS_API_HOST + action.url, action.params);

        yield put({ type: constants.LOADER_END })
        yield put({ type: constants.CALL_SUCCESS, data: response.data });
    } catch (e) {
        console.log('e', e);
        yield put({ type: constants.LOADER_END })
        yield put({ type: constants.CALL_FAILURE, data: e.response.data });
    }
}

function* login(action) {
    try {
        yield put({ type: constants.LOADER_START })
        const response = yield call(callPostAxios, constants.CMS_API_HOST + action.url, action.params);

        yield put({ type: constants.LOADER_END })
        yield put({ type: constants.LOGIN, emp: response.data });
    } catch (e) {
        console.log('e', e);
        yield put({ type: constants.LOADER_END })
        yield put({ type: constants.LOGOUT, data: e.response.data });
    }
}






function* rootSaga() {
    yield takeEvery(constants.CALL_CMS_API, getCmsApiData);
    yield takeEvery(constants.LOGIN_REQUEST, login);

}
export default rootSaga;