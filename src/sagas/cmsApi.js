import { takeEvery, put, call, select } from 'redux-saga/effects';
import produce from 'immer';
import _ from 'lodash';

import * as constants from 'constants'
import { common as commJs } from 'js';
import { cmsApi, common } from 'actions';


// api호출
function* cmsApiCallWrapper(logic, errorFn, errorMsg) {
    yield put(common.loaderStart()); // 로딩시작
    try {
        console.log('cmsApiCallWrapper');
        const response = yield call(commJs.callCmsApi, action);
        console.log('response.data', response.data);

        // 토큰만료확인
        if (yield !commJs.validationToken(response.data.status, true)) {
            // 로그아웃처리
            yield put(cmsApi.logout());
            yield put(common.errorMsgShow('로그인 토큰이 만료되었습니다.'));
            return;
        }

        if (response.data.status !== 'success') { // 실패
            throw response.data.message;

        } else { // 성공
            yield logic();

        }
    } catch (e) {
        if (errorFn) {
            yield put(errorFn());
        }
        yield put(common.errorMsgShow(errorMsg ? errorMsg : '에러가 발생했습니다.'));
    }
    yield put(common.loaderEnd()); // 로딩종료
}


// 로그인
function* login(action) {
    yield put(common.loaderStart()); // 로딩시작
    try {
        const response = yield call(commJs.callCmsApi, action);
        // console.log('response.data', response.data);

        if (!commJs.validationToken(response.data.status)) return; // 토큰만료확인

        if (response.data.status !== 'success') { // 실패
            throw response.data.message;

        } else { // 성공
            // 로그인처리
            yield put(cmsApi.login(response.data.data));

            // 토큰정보 저장
            commJs.setAsyncStore(constants.CMS_AUTH_TOKEN, response.data.data.token);

        }
    } catch (e) {
        yield put(common.errorMsgShow('에러가 발생했습니다.'));
    }
    yield put(common.loaderEnd()); // 로딩종료
}


// 로그아웃
function* logout() {
    yield put(common.loaderStart()); // 로딩시작
    try {
        // 토큰정보 삭제
        commJs.setAsyncStore(constants.CMS_AUTH_TOKEN, '');
        // 로그아웃처리
        yield put(cmsApi.logout());
    } catch (e) {
        yield put(common.errorMsgShow('에러가 발생했습니다.'));
    }
    yield put(common.loaderEnd()); // 로딩종료
}


// 비밀번호변경
function* modifyEmpPw(action) {
    yield cmsApiCallWrapper(function* () {
        // 직원정보 변경(초기 비밀번호 여부)
        yield put(cmsApi.login(response.data.data));
        yield put(common.errorMsgShow('비밀번호 변경이 완료되었습니다.'));
    });
}







// function* callCmsApi(action) {
//     yield cmsApiCallWrapper(function* () {
//         yield put(cmsApi.callCmsApiSucc(response.data.data));
//     }, cmsApi.callCmsApiFail);
// }

// 근무지 목록 조회
function* getWrkPlcList(action) {
    console.log('getWrkPlcList');
    yield cmsApiCallWrapper(function* () {
                yield put(cmsApi.getWrkPlcListSucc(response.data.data));
            }, cmsApi.getWrkPlcListFail);
}





function* cmsApiSaga() {
    yield takeEvery(constants.LOGIN_REQUEST, login);
    yield takeEvery(constants.LOGOUT_REQUEST, logout);
    yield takeEvery(constants.MODIFY_EMP_PW_REQUEST, modifyEmpPw);


    // yield takeEvery(constants.CALL_API_REQUSET, callCmsApi);
    yield takeEvery(constants.GET_WRK_PLC_LIST_REQUEST, getWrkPlcList);

}

export default cmsApiSaga;