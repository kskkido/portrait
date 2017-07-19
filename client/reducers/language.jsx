/* ====== DEFINE ACTION TYPES ====== */
const LANGUAGE_SELECT = 'LANGUAGE SELECT'

/* ====== DEFINE ACTION CREATORS ====== */
export const languageSelect = (language) => ({type: LANGUAGE_SELECT, language})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  language: '',
  selected: false
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case LANGUAGE_SELECT:
    return Object.assign({}, state, {language: action.language, selected: true})

  default:
    return state
  }
}

/* ====== DEFINE DISPATCHERS ====== */
