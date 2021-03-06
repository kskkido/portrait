/* ====== DEFINE ACTION TYPES ====== */
const LOAD_COMPLETE = 'LOAD COMPLETE'
const ROTATION_CHANGE = 'ROTATION CHANGE'
const ROTATION_RESTART = 'ROTATION RESTART'
const VIEW_CHANGE = 'VIEW CHANGE'
const VIEW_RESTART = 'VIEW RESTART'
const VIEW_TOGGLE = 'VIEW TOGGLE'
const PATH_CHANGE = 'PATH CHANGE'

/* ====== DEFINE ACTION CREATORS ====== */
export const loadComplete = () => ({type: LOAD_COMPLETE})
export const rotationChange = (rotation) => ({type: ROTATION_CHANGE, rotation})
export const rotationRestart = () => ({type: ROTATION_RESTART})
export const viewChange = (viewIndex) => ({type: VIEW_CHANGE, viewIndex})
export const viewRestart = () => ({type: VIEW_RESTART})
export const viewToggle = (bool) => ({type: VIEW_TOGGLE, bool})
export const pathChange = (pathIndex) => ({type: PATH_CHANGE, pathIndex})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  loaded: false,
  rotation: 0,
  viewIndex: 0,
  viewToggle: false,
  pathIndex: 0,
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case LOAD_COMPLETE:
    return Object.assign({}, state, {loaded: true})

  case ROTATION_CHANGE:
    return Object.assign({}, state, {rotation: action.rotation}) // patch it up

  case ROTATION_RESTART:
    return Object.assign({}, state, {rotation: 0})

  case VIEW_CHANGE:
    return Object.assign({}, state, {viewIndex: action.viewIndex})

  case VIEW_RESTART:
    return Object.assign({}, state, {viewIndex: 0})

  case VIEW_TOGGLE:
    return Object.assign({}, state, {viewToggle: action.bool})

  case PATH_CHANGE:
    return Object.assign({}, state, {pathIndex: action.pathIndex})

  default:
    return state
  }
}

/* ====== DEFINE DISPATCHERS ====== */
