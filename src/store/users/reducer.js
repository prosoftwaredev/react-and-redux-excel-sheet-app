import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  users: []
}

function sortUsers (a, b) {
  if (a.last_name < b.last_name) return -1
  if (a.last_name > b.last_name) return 1
  return 0
}

export default createReducer(initialState, {
  [t.LOAD_USER_LIST]: (state, payload) => {
    return Object.assign({}, state, { users: payload.sort(sortUsers) })
  },
  [t.ADD_USER]: (state, payload) => {
    let users = state.users.map((user) => user)
    users.push(payload)
    users.sort(sortUsers)
    return Object.assign({}, state, { users })
  },
  [t.DELETE_USER]: (state, payload) => {
    let users = state.users.reduce((prev, curr) => {
      if (curr.email_address === payload) {
        return prev
      }
      prev.push(curr)
      return prev
    }, [])

    return Object.assign({}, state, { users: users })
  },
  [t.UPDATE_USER]: (state, payload) => {
    return Object.assign({}, state, { users: state.users.map((user) => {
      if (user.email_address === payload.email_address) {
        return Object.assign({}, user, payload)
      }
      return user
    }) })
  },
  [t.UPDATE_USER_PROFILEIMAGE]: (state, { userEmailAdress, imageUrl, payload }) => {
    return Object.assign({}, state, { users: state.users.map((user) => {
      if (user.email_address === payload.email_address) {
        return Object.assign({}, user, { profile_image: imageUrl })
      }
      return user
    }) })
  }
})
