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
})

export default rootReducer
