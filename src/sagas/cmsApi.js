import { takeEvery, put, call } from 'redux-saga/effects';
import _ from 'lodash';

import * as constants from '../constants'
import { common as commJs } from '../js';
import { cmsApi, common, location } from '../actions';


// api호출
function* cmsApiCallWrapper(action, logic, errorFn, alertMsg) {
    yield put(common.loaderStart()); // 로딩시작
    try {
        const response = yield call(commJs.callCmsApi, action);
        // console.log('response.data', response.data);

        // 토큰만료확인
        if (yield !commJs.validationToken(response.data.status, true)) {
            // 로그아웃처리
            yield put(cmsApi.logout());
            yield put(common.alertMsgShow('로그인 토큰이 만료되었습니다.'));
            return;
        }

        if (response.data.status !== 'success') { // 실패
            throw response.data.message;
        } else { // 성공
            yield logic(response.data.data);
        }
    } catch (e) {
        // console.log(e);
        if (errorFn) {
            yield put(errorFn());
        }
        yield put(common.alertMsgShow(alertMsg ? alertMsg : '에러가 발생했습니다.'));
    } finally {
        yield put(common.loaderEnd()); // 로딩종료
    }
}


// 로그인
function* login(action) {
    yield put(common.loaderStart()); // 로딩시작
    try {
        const response = yield call(commJs.callCmsApi, action);
        // console.log('response.data', response.data);

        if (!commJs.validationToken(response.data.status)) return; // 토큰만료확인

        if (response.data.status !== 'success') { // 실패
            yield put(common.alertMsgShow(response.data.message));
        } else { // 성공
            // 로그인처리
            yield put(cmsApi.login(response.data.data));

            // 토큰정보 저장
            commJs.setAsyncStore(constants.CMS_AUTH_TOKEN, response.data.data.token);
        }
    } catch (e) {
        yield put(common.alertMsgShow('에러가 발생했습니다.'));
    } finally {
        yield put(common.loaderEnd()); // 로딩종료
    }
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
        yield put(common.alertMsgShow('에러가 발생했습니다.'));
    } finally {
        yield put(common.loaderEnd()); // 로딩종료
    }
}


// 비밀번호변경
function* modifyEmpPw(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        // 직원정보 변경(초기 비밀번호 여부)
        yield put(cmsApi.login(data));
        yield put(common.alertMsgShow('비밀번호 변경이 완료되었습니다.'));
    });
}







// function* callCmsApi(action) {
//     yield cmsApiCallWrapper(function* () {
//         yield put(cmsApi.callCmsApiSucc(response.data.data));
//     }, cmsApi.callCmsApiFail);
// }

// 근무지 목록 조회
function* getWrkPlcList(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        yield put(cmsApi.getWrkPlcListSucc(data));
    }, cmsApi.getWrkPlcListFail);
}

// 근무지 신규등록 신청
function* aplyWrkPlc(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        yield put(cmsApi.aplyWrkPlcSucc(data));
        yield put(common.alertMsgShow('신규 근무지 등록 신청이 완료되었습니다.'));
        if (_.isFunction(action.params.callback)) action.params.callback();
    }, cmsApi.aplyWrkPlcFail);
}

// 근무지 등록
function* regWrkPlc(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        yield put(cmsApi.regWrkPlcSucc(data));
        yield put(common.alertMsgShow('근무지 변경이 완료되었습니다.'));
        yield put(cmsApi.getWrkPlcList({ pageNo: 1 }));
    }, cmsApi.regWrkPlcFail);
}


// 근무지 목록 조회
function* getEmpCmt(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        yield put(cmsApi.getEmpCmtSucc(data));
    }, cmsApi.getEmpCmtFail);
}


// 출퇴근등록
function* regEmpCmt(action) {
    yield cmsApiCallWrapper(action, function* (data) {
        yield put(cmsApi.regEmpCmtSucc(data));
        yield put(location.getCurLocation());
    }, cmsApi.regEmpCmtFail);
}


function* cmsApiSaga() {
    yield takeEvery(constants.LOGIN_REQUEST, login);
    yield takeEvery(constants.LOGOUT_REQUEST, logout);
    yield takeEvery(constants.MODIFY_EMP_PW_REQUEST, modifyEmpPw);


    yield takeEvery(constants.GET_WRK_PLC_LIST_REQUEST, getWrkPlcList);
    yield takeEvery(constants.APLY_WRK_PLC_REQUEST, aplyWrkPlc);
    yield takeEvery(constants.REG_WRK_PLC_REQUEST, regWrkPlc);
    yield takeEvery(constants.GET_EMP_CMT_REQUEST, getEmpCmt);
    yield takeEvery(constants.REG_EMP_CMT_REQUEST, regEmpCmt);

}

export default cmsApiSaga;