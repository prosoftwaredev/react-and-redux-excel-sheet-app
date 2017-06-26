import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {}

export default createReducer(initialState, {
  [t.LOAD_COMPANY]: (state, payload) => {
    return Object.assign({}, state, payload)
  }
})
