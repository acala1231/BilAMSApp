import produce from "immer";

import { LOGIN, LOGOUT } from 'constants'


const initialState = {
    isLogin: false,
    empInfo: { empNo: null, empNm: null },
}

function emp(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log('reducer login', action);
            return produce(state, draft => {
                draft.isLogin = true;
                draft.empInfo = action.empInfo;
            });
        case LOGOUT:
            return produce(state, draft => {
                draft.isLogin = false;
                draft.empInfo = initialState.emp;
            });
        default:
            return state;
    }
};

export default emp;