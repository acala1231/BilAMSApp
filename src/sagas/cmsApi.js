import { takeEvery, put, call } from "redux-saga/effects";
import produce from "immer";
import axios from "axios";

import * as constants from '../constants'
import { callCmsApi } from "../js/common";


// function* getCmsApiData(action, callback) {

//     yield put({ type: constants.LOADER_START });
//     try {
//         const response = callCmsApi(action);
//         yield put({ type: constants.CALL_API_SUCCESS, data: response.data.data });

//     } catch (e) {
//         yield put({ type: constants.CALL_API_FAILURE });
//         yield put({ type: constants.ERROR_MSG_SHOW, message: '에러가 발생했습니다.' });

//     } finally {
//         yield put({ type: constants.LOADER_END });
//     }
// }


function* login(action) {
    yield put({ type: constants.LOADER_START });
    try {
        const response = yield call(callCmsApi, action);
        console.log('saga login', response.data);
        if (response.data.status !== 'success') {
            throw '로그인실패';
        }

        yield put({ type: constants.LOGIN, empInfo: response.data.data });
        yield put({ type: constants.CALL_API_SUCCESS });

    } catch (e) {
        yield put({ type: constants.CALL_API_FAILURE });
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인중 에러가 발생했습니다.' });

    } finally {
        yield put({ type: constants.LOADER_END });
    }
}



function* cmsApiSaga() {
    // yield takeEvery(constants.CALL_API_REQUSET, getCmsApiData);
    yield takeEvery(constants.LOGIN_REQUEST, login);
}

export default cmsApiSaga;