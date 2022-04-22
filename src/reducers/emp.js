import produce from "immer";
import { LOGIN, LOGOUT } from '../constants'

const initialState = {
    isLogin: false,
    emp: { empNo: null, empNm: null },
}

function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return produce(state, draft => {
                draft.isLogin = true;
                draft.emp = action.emp;
            });
        case LOGOUT:
            return produce(state, draft => {
                draft.isLogin = false;
                draft.emp = initialState.emp;
            });
        default:
            return state;
    }
};

export default user;