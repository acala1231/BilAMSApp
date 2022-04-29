import { combineReducers } from 'redux'

import loader from './loader'
import callApi from './callApi'
import emp from './emp'
import errorMsg from './errorMsg'
import commute from './commute'


const rootReducer = combineReducers({
  loader,
  // callApi,
  emp,
  errorMsg,
  commute,
})

export default rootReducer
