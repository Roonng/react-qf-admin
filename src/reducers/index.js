import { combineReducers } from "redux"

import notify from './nofity'
import login from './login'

export default combineReducers({
  notify,
  login
})