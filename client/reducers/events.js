/* ====== DEFINE ACTION TYPES ====== */
const WHEEL_ROTATION = 'WHEEL_ROTATION'
const RESTART_ROTATION = 'RESTART ROTATION'
const VIEW_CHANGE = 'VIEW CHANGE'
const VIEW_RESTART = 'VIEW RESTART'

/* ====== DEFINE ACTION CREATORS ====== */
export const wheelRotation = (wheelDelta) => ({type: WHEEL_ROTATION, wheelDelta})
export const restartRotation = () => ({type: RESTART_ROTATION})
export const viewChange = (viewIndex) => ({type: VIEW_CHANGE, viewIndex})
export const viewRestart = () => ({type: VIEW_RESTART})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  rotation: 0,
  viewIndex: 0
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case WHEEL_ROTATION:
    return Object.assign({}, state, {rotation: (action.wheelDelta < 0 ? state.rotation + 0.005 : state.rotation - 0.005) % 1})

  case RESTART_ROTATION:
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
