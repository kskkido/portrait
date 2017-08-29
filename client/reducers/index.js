import { combineReducers } from 'redux'

import events from './events'
import form from './form'
import language from './language'

export default combineReducers({
  events,
  form,
  language
})
