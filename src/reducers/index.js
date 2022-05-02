import { combineReducers } from 'redux'

import {
  loader,
  alertMsg,
  confirmMsg
} from './common'
import {
  emp,
  workPlcList,
  aplyWorkPlc,
  regWorkPlc,
} from './callApi'


const rootReducer = combineReducers({
  loader,
  alertMsg,
  confirmMsg,
  emp,
  workPlcList,
  aplyWorkPlc,
  regWorkPlc,
})

export default rootReducer
