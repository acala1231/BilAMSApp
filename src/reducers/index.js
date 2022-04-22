import { combineReducers } from 'redux'
import loader from './loader'
import callApi from './callApi'
import emp from './emp'


const rootReducer = combineReducers({
  loader,
  callApi,
  emp,
})

export default rootReducer
