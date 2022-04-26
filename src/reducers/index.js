import { combineReducers } from 'redux'

import loader from './loader'
// import callApi from './callApi'
import emp from './emp'
import errorMsg from './errorMsg'


const rootReducer = combineReducers({
  loader,
  // callApi,
  emp,
  errorMsg,
})

export default rootReducer
