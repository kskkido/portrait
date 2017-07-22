/* ====== DEFINE ACTION TYPES ====== */
const LOAD_COMPLETE = 'LOAD COMPLETE'
const ROTATION_CHANGE = 'ROTATION CHANGE'
const ROTATION_RESTART = 'ROTATION RESTART'
const VIEW_CHANGE = 'VIEW CHANGE'
const VIEW_RESTART = 'VIEW RESTART'

/* ====== DEFINE ACTION CREATORS ====== */
export const loadComplete = () => ({type: LOAD_COMPLETE})
export const rotationChange = (wheelDelta) => ({type: ROTATION_CHANGE, wheelDelta})
export const rotationRestart = () => ({type: ROTATION_RESTART})
export const viewChange = (viewIndex) => ({type: VIEW_CHANGE, viewIndex})
export const viewRestart = () => ({type: VIEW_RESTART})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  loaded: false,
  rotation: 0,
  viewIndex: 0
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case LOAD_COMPLETE:
    return Object.assign({}, state, {loaded: true})

  case ROTATION_CHANGE:
    return Object.assign({}, state, {rotation: (action.wheelDelta < 0 ? state.rotation + 0.005 : state.rotation - 0.005) % 1})

  case ROTATION_RESTART:
    return Object.assign({}, state, {rotation: 0})

  case VIEW_CHANGE:
    return Object.assign({}, state, {viewIndex: action.viewIndex})

  case VIEW_RESTART:
    return Object.assign({}, state, {viewIndex: 0})

  default:
    return state
  }
}

/* ====== DEFINE DISPATCHERS ====== */
