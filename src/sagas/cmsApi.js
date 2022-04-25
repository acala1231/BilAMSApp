import { takeEvery, put, call, select } from "redux-saga/effects";
import produce from "immer";
import _ from "lodash";

import * as constants from 'constants'
import { common } from "js";

function* valid() {
    try {
        console.log('valid');
        const response = yield call(common.callCmsApi, { method: 'post', url: 'validToken' });
        console.log('valid response', response);
        if (response.data.satus !== 'success') {
            throw 'token error';
        }
        return true;
    } catch (e) {
        common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        yield put({ type: constants.LOGOUT });
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인중 에러가 발생했습니다.' });
    }
    return false;
}

function* login(action) {
    yield put({ type: constants.LOADER_START });
    let response;
    try {
        // 토큰 로그인시 유효성 검사
        if (_.isEmpty(action.params.empNo)) {
            console.log('login before valid');

            const isValid = yield select(valid());

            console.log('login after valid', isValid);
            if (!isValid) throw 'token error';
        } else {
            common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        }
        // 토큰 로그인시 유효성 검사

        response = yield call(common.callCmsApi, action);
        console.log('response.data', response.data);

        if (response.data.status !== 'success') {
            throw response.data.message;
        }
        yield put({ type: constants.LOGIN, empInfo: response.data.data });

        common.setAsyncStore('empInfo', response.data.data);
        common.setAsyncStore(constants.CMS_AUTH_TOKEN, response.data.data.token);

    } catch (e) {
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인중 에러가 발생했습니다.' });

    } finally {
        yield put({ type: constants.LOADER_END });
    }
}

function* logout() {
    yield put({ type: constants.LOADER_START });
    try {
        common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        yield put({ type: constants.LOGOUT });

    } catch (e) {
        console.log(e);
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그아웃중 에러가 발생했습니다.' });

    } finally {
        yield put({ type: constants.LOADER_END });
    }
}

function* modifyEmpPw(action) {
    yield put({ type: constants.LOADER_START });
    let response;
    try {
        // 토큰 유효성 검사
        const isValid = yield call(valid());
        if (!isValid) throw 'token error';
        // 토큰 유효성 검사

        response = yield call(common.callCmsApi, action);
        console.log('response.data', response.data);
        if (response.data.status !== 'success') {
            throw response.data.message;
        }
        yield put({ type: constants.LOGIN, empInfo: response.data.data });

    } catch (e) {
        console.log(e);
        yield put({ type: constants.ERROR_MSG_SHOW, message: '비밀번호 변경중 에러가 발생했습니다.' });

    } finally {
        yield put({ type: constants.LOADER_END });
    }
}

function* cmsApiSaga() {
    // yield takeEvery(constants.CALL_API_REQUSET, getCmsApiData);
    yield takeEvery(constants.LOGIN_REQUEST, login);
    yield takeEvery(constants.LOGOUT_REQUEST, logout);
    yield takeEvery(constants.MODIFY_EMP_PW_REQUEST, modifyEmpPw);

}

export default cmsApiSaga;