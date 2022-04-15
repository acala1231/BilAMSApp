import produce from 'immer';

const LOGIN = 'user/LOGIN';
const LOGOUT = 'user/LOGOUT';

export const login = (user) => ({ type: LOGIN, user: user });
export const logout = () => ({ type: LOGOUT });

const initialState = {
    isLogin: false,
    user: { email: null, uid: null },
};

export default function user(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log('user login');
            return produce(state, draft => {
                draft.isLogin = true;
                draft.user = action.user;
            });
        case LOGOUT:
            console.log('user logout');
            return produce(state, draft => {
                draft.isLogin = false;
                draft.user = initialState.user;
            });
        default:
            return state;
    }
}