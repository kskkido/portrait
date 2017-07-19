import { combineReducers } from 'redux'

import events from './events'
import language from './language'

export default combineReducers({
  events,
  language
})
