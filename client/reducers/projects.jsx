/* ====== DEFINE ACTION TYPES ====== */
const PROJECT_NAVIGATE = 'PROJECT NAVIGATE'

/* ====== DEFINE ACTION CREATORS ====== */
export const navigate = (projectName) => ({type: PROJECT_NAVIGATE, currentProject: projectName})

/* ====== DEFINE INITIAL STATE ====== */
const initialState = {
  currentProject: ''
}

/* ====== DEFINE REDUCER ====== */
export default (state = initialState, action) => {
  switch (action.type) {
  case PROJECT_NAVIGATE:
    return Object.assign({}, state, {currentProject: action.currentProject})

  default:
    return state
  }
}

/* ====== DEFINE DISPATCHERS ====== */
