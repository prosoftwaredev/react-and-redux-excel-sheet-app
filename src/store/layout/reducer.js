import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  showUserMenu: false,
  showSheetList: false
}

export default createReducer(initialState, {
  [t.TOGGLE_USER_MENU]: (state, payload) => {
    return Object.assign({}, state, {
      showUserMenu: payload
    })
  },

  [t.TOGGLE_SHEET_LIST]: (state, payload) => {
    return Object.assign({}, state, {
      showSheetList: payload
    })
  }
})
