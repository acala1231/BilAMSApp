import produce from "immer";

import {
    GET_WRK_PLC_LIST_REQUEST,
    GET_WRK_PLC_LIST_SUCCESS,
    GET_WRK_PLC_LIST_FAILURE,
} from 'constants'


// APLY_WRK_PLC_REQUEST
// APLY_WRK_PLC_SUCCESS
// APLY_WRK_PLC_FAILURE


const initialState = {
    isProcessing: false,
    wrkPlcList: [],
}

function getWrkPlcList(state = initialState, action) {
    switch (action.type) {
        case GET_WRK_PLC_LIST_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.wrkPlcList = initialState.wrkPlcList;
            });
        case GET_WRK_PLC_LIST_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.wrkPlcList = action.wrkPlcList;
            });
        case GET_WRK_PLC_LIST_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initialState.isProcessing;
                draft.wrkPlcList = initialState.wrkPlcList;
            });
        default:
            return state;
    }
};

export default emp;