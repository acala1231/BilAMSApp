import produce from "immer";

import * as constants from '../constants'


// 로그인, 비밀번호 변경
const initEmpState = {
    isLogin: false,
    empInfo: { empNo: null, empNm: null, isInitPw: 'true' },
}

export function emp(state = initEmpState, action) {
    switch (action.type) {
        case constants.LOGIN:
            return produce(state, draft => {
                draft.isLogin = true;
                draft.empInfo = action.empInfo;
            });
        case constants.LOGOUT:
            return produce(state, draft => {
                draft.isLogin = false;
                draft.empInfo = initEmpState.empInfo;
            });
        case constants.MODIFY_EMP_PW:
            return produce(state, draft => {
                draft.isLogin = true;
                draft.empInfo = action.empInfo;
            });
        default:
            return state;
    }
};


// 근무지 조회
const initWorkPlcListState = {
    isProcessing: false,
    data: {},
}

export function workPlcList(state = initWorkPlcListState, action) {
    switch (action.type) {
        case constants.GET_WRK_PLC_LIST_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.data = initWorkPlcListState.data;
            });
        case constants.GET_WRK_PLC_LIST_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initWorkPlcListState.isProcessing;
                draft.data = action.data;
            });
        case constants.GET_WRK_PLC_LIST_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initWorkPlcListState.isProcessing;
                draft.data = initWorkPlcListState.data;
            });
        default:
            return state;
    }
};


// 근무지 신규등록 신청
const initAplyWorkPlcState = {
    isProcessing: false,
    isSuccess: false,
}

export function aplyWorkPlc(state = initAplyWorkPlcState, action) {
    switch (action.type) {
        case constants.APLY_WRK_PLC_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.isSuccess = initAplyWorkPlcState.isSuccess;
            });
        case constants.APLY_WRK_PLC_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initAplyWorkPlcState.isProcessing;
                draft.isSuccess = true;
            });
        case constants.APLY_WRK_PLC_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initAplyWorkPlcState.isProcessing;
                draft.isSuccess = initAplyWorkPlcState.isSuccess;
            });

        default:
            return state;
    }
};


// 근무지 등록
const initRegWorkPlcState = {
    isProcessing: false,
    isSuccess: false,
}

export function regWorkPlc(state = initRegWorkPlcState, action) {
    switch (action.type) {
        case constants.REG_WRK_PLC_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.isSuccess = initAplyWorkPlcState.isSuccess;
            });
        case constants.REG_WRK_PLC_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initAplyWorkPlcState.isProcessing;
                draft.isSuccess = true;
            });
        case constants.REG_WRK_PLC_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initAplyWorkPlcState.isProcessing;
                draft.isSuccess = initAplyWorkPlcState.isSuccess;
            });
        default:
            return state;
    }
};


// 출근정보 조회
const initEmpCmtState = {
    isProcessing: false,
    data: {},
}

export function empCmt(state = initEmpCmtState, action) {
    switch (action.type) {
        case constants.GET_EMP_CMT_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.data = initEmpCmtState.data;
            });
        case constants.GET_EMP_CMT_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initEmpCmtState.isProcessing;
                draft.data = produce(action.data, draft2 => {
                    draft2.cmtDd = draft2.cmtDd.substr(0, 4) + '.' + draft2.cmtDd.substr(4, 2) + '.' + draft2.cmtDd.substr(6, 2);
                    draft2.cmtStrDd = draft2.cmtStrDd.substr(0, 2) + ':' + draft2.cmtStrDd.substr(2, 2);
                    draft2.cmtEndDd = draft2.cmtEndDd.substr(0, 2) + ':' + draft2.cmtEndDd.substr(2, 2);
                });
            });
        case constants.GET_EMP_CMT_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initEmpCmtState.isProcessing;
                draft.data = initEmpCmtState.data;
            });
        default:
            return state;
    }
};


// 출퇴근 등록
const initRegEmpCmtState = {
    isProcessing: false,
    isSuccess: false,
}

export function regEmpCmt(state = initRegEmpCmtState, action) {
    switch (action.type) {
        case constants.REG_EMP_CMT_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.isSuccess = initRegEmpCmtState.isSuccess;
            });
        case constants.REG_EMP_CMT_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initRegEmpCmtState.isProcessing;
                draft.isSuccess = true;
            });
        case constants.REG_EMP_CMT_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initRegEmpCmtState.isProcessing;
                draft.isSuccess = initRegEmpCmtState.isSuccess;
            });
        default:
            return state;
    }
};