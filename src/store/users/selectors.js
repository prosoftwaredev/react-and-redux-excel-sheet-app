import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getUsers = createSelector(
  state => state[NAME],
  session => session.users
)

export const getUserById = createSelector(
  getUsers,
  users => emailAddress => {
    return users.find((user) => user.email_address === emailAddress)
  }
)

export const getActiveCount = createSelector(
  getUsers,
  users => {
    return users.filter((user) => !user.is_disabled).length
  }
)

export const getInactiveCount = createSelector(
  getUsers,
  users => {
    return users.filter((user) => user.is_disabled).length
  }
)
