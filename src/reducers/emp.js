import produce from "immer";

import { LOGIN, LOGOUT, MODIFY_EMP_PW } from 'constants'


const initialState = {
    isLogin: false,
    empInfo: { empNo: null, empNm: null, isInitPw: 'true' },
}

function emp(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return produce(state, draft => {
                draft.isLogin = true;
                draft.empInfo = action.empInfo;
            });
        case LOGOUT:
            return produce(state, draft => {
                draft.isLogin = false;
                draft.empInfo = initialState.empInfo;
            });
        case MODIFY_EMP_PW:
            return produce(state, draft => {
                draft.isLogin = true;
                draft.empInfo = action.empInfo;
            });
        default:
            return state;
    }
};

export default emp;