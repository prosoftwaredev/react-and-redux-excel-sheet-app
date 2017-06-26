import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  token: null,
  user: null,
  isAuthenticating: false,
  isAuthenticated: false
}

export default createReducer(initialState, {
  [t.RECEIVE_CREDENTIALS]: (state, payload) => {
    const { token, user } = payload
    return Object.assign({}, state, {
      token,
      user,
      isAuthenticated: true
    })
  },
  [t.REMOVE_CREDENTIALS]: (state) => {
    return initialState
  }
})
