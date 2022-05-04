import { takeEvery, put, call } from 'redux-saga/effects';
import * as Location from 'expo-location';

import * as constants from '../constants'
import { common, location } from '../actions';


const asyncGetPosition = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw 'Permission to access location was denied';
    }
    const result = await Location.getCurrentPositionAsync({});
    return result;
}

function* callLocation() {
    yield put(common.loaderStart()); // 로딩시작
    try {
        const result = yield call(asyncGetPosition);
        // console.log('location', result);
        yield put(location.getCurLocationSucc(result));
    } catch (e) {
        yield put(location.getCurLocationFail());
        yield put(common.alertMsgShow('에러가 발생했습니다.'));
    } finally {
        yield put(common.loaderEnd()); // 로딩종료
    }
}


function* locationSaga() {
    yield takeEvery(constants.GET_CUR_LOCA_REQUEST, callLocation);

}

export default locationSaga;