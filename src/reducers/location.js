import produce from "immer";

import * as constants from '../constants'


// 현재 좌표 조회
const initLocation = {
    isProcessing: false,
    location: {
        coords: {
            accuracy: null,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: null,
            longitude: null,
            speed: null,
        },
        mocked: null,
        timestamp: null,
    }
}

export function location(state = initLocation, action) {
    switch (action.type) {
        case constants.GET_CUR_LOCA_REQUEST:
            return produce(state, draft => {
                draft.isProcessing = true;
                draft.location = initLocation.location;
            });
        case constants.GET_CUR_LOCA_SUCCESS:
            return produce(state, draft => {
                draft.isProcessing = initLocation.isProcessing;
                draft.location = action.location;
            });
        case constants.GET_CUR_LOCA_FAILURE:
            return produce(state, draft => {
                draft.isProcessing = initLocation.isProcessing;
                draft.location = initLocation.location;
            });
        default:
            return state;
    }
};