import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getAuthState = createSelector(
  state => state[NAME],
  auth => {
    return auth
  }
)

export const getUser = createSelector(
  state => state[NAME],
  auth => auth.user
)

export const getToken = createSelector(
  state => state[NAME],
  auth => auth.token
)

export const isLoggedIn = createSelector(
  state => state[NAME],
  auth => auth.token
)
