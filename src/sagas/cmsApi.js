import { takeEvery, put, call, select } from "redux-saga/effects";
import produce from "immer";
import _ from "lodash";

import * as constants from 'constants'
import { common } from "js";


// 로그인
function* login(action) {
    yield put({ type: constants.LOADER_START }); // 로딩시작
    try {
        // /login 호출
        const response = yield call(common.callCmsApi, action);
        console.log('response.data', response.data);

        if (response.data.status == 'inValidToken') { // 토큰만료
            // 만료토큰정보 삭제
            common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');

        } else if (response.data.status !== 'success') { // 로그인실패
            throw response.data.message;

        } else { // 로그인성공
            // 로그인처리
            yield put({ type: constants.LOGIN, empInfo: response.data.data });

            // 토큰정보 저장
            common.setAsyncStore(constants.CMS_AUTH_TOKEN, response.data.data.token);
        }

    } catch (e) {
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인중 에러가 발생했습니다.' });
    } finally {
        yield put({ type: constants.LOADER_END }); // 로딩종료
    }
}

// 로그아웃
function* logout() {
    yield put({ type: constants.LOADER_START }); // 로딩시작
    try {
        // 토큰정보 삭제
        common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        // 로그아웃처리
        yield put({ type: constants.LOGOUT });

    } catch (e) {
        yield put({ type: constants.ERROR_MSG_SHOW, message: '로그아웃중 에러가 발생했습니다.' });
    } finally {
        yield put({ type: constants.LOADER_END }); // 로딩종료
    }
}

// 비밀번호변경
function* modifyEmpPw(action) {
    yield put({ type: constants.LOADER_START }); // 로딩시작
    try {
        // /modifyPw 호출
        const response = yield call(common.callCmsApi, action);
        console.log('response.data', response.data);

        if (response.data.status == 'inValidToken') { // 토큰만료
            // 만료토큰정보 삭제
            common.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
            // 로그아웃처리
            yield put({ type: constants.LOGOUT });
            yield put({ type: constants.ERROR_MSG_SHOW, message: '로그인 토큰이 만료되었습니다.' });

        } else if (response.data.status !== 'success') { // 비밀번호변경실패
            throw response.data.message;

        } else { // 비밀번호변경성공
            // 직원정보 변경(초기 비밀번호 여부)
            yield put({ type: constants.LOGIN, empInfo: response.data.data });
            yield put({ type: constants.ERROR_MSG_SHOW, message: '비밀번호 변경이 완료되었습니다.' });
        }

    } catch (e) {
        yield put({ type: constants.ERROR_MSG_SHOW, message: '비밀번호 변경중 에러가 발생했습니다.' });
    } finally {
        yield put({ type: constants.LOADER_END }); // 로딩종료
    }
}


function* cmsApiSaga() {
    // yield takeEvery(constants.CALL_API_REQUSET, getCmsApiData);
    yield takeEvery(constants.LOGIN_REQUEST, login);
    yield takeEvery(constants.LOGOUT_REQUEST, logout);
    yield takeEvery(constants.MODIFY_EMP_PW_REQUEST, modifyEmpPw);

}

export default cmsApiSaga;