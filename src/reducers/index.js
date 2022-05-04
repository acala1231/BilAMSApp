import { combineReducers } from 'redux';

import {
  loader,
  alertMsg,
  confirmMsg
} from './common';
import { location } from './location';
import {
  emp,
  workPlcList,
  aplyWorkPlc,
  regWorkPlc,
  empCmt,
  regEmpCmt,
} from './callApi';


const rootReducer = combineReducers({
  loader,
  alertMsg,
  confirmMsg,
  location,

  emp,
  workPlcList,
  aplyWorkPlc,
  regWorkPlc,
  empCmt,
  regEmpCmt,
})

export default rootReducer
