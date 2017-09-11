import axios from 'axios'
import { initialValue } from '../components/main/Contact/utils'

const FORM_FETCH = 'FORM FETCH'
const FORM_UPDATE = 'FORM UPDATE'
const FORM_RESTART = 'FORM RESTART'
const FORM_SENDING = 'FORM SENDING'

export const formFetch = (data) => ({type: FORM_FETCH, data})
export const formUpdate = (prop, payload) => ({type: FORM_UPDATE, data: {prop, payload}})
export const formRestart = () => ({type: FORM_RESTART})
export const formSending = (bool) => ({type: FORM_SENDING, bool})

export const sending = Symbol('sending')

const initialState = {
  name: {
    value: initialValue,
    isValid: false,
  },
  email: {
    value: initialValue,
    isValid: false,
  },
  message: {
    value: initialValue,
    isValid: false,
  },
  [sending]: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FORM_FETCH:
      return Object.assign({}, action.data)

    case FORM_UPDATE:
      return Object.assign({}, state, {[action.data.prop]: action.data.payload})

    case FORM_RESTART:
      return Object.assign({}, initialState)

    case FORM_SENDING:
      return Object.assign({}, state, {[sending]: action.bool})

    default:
      return state
  }
}

const migrateProps = (data, fallback) => (
  Object.keys(data).reduce((acc, prop) => (
    Object.assign({}, acc, {[prop]: {
      value: data[prop].value === undefined ? fallback : data[prop].value,
      isValid: data[prop].isValid
    }})
  ), {})
)

export const asyncFormFetch = () => dispatch => (
  axios.get('/api')
    .then(({ data }) => dispatch(formFetch(migrateProps(data, initialValue))))
)

const pendingSubmit = (dispatch) => {
  dispatch(formSending(true))
  setTimeout(() => dispatch(formSending(false)) && dispatch(formRestart()), 1600)
}

export const asyncFormRestart = () => (dispatch, getState) => (
  (axios.post('/api', {
    contact: getState().form
  }), pendingSubmit(dispatch))
)
