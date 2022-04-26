import { all, takeEvery, put, call, takesAll } from "redux-saga/effects";

import * as constants from 'constants'
import cmsApiSaga from "./cmsApi";

export default function* rootSaga() {
    yield all([
        cmsApiSaga(),
    ]);
}