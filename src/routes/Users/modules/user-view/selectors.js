import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getUser = createSelector(
  state => state[NAME],
  userView => userView.user
)

export const showFilters = createSelector(
  state => state[NAME],
  userView => userView.showFilters
)

export const showModal = createSelector(
  state => state[NAME],
  userView => userView.showModal
)

export const showDeleteModal = createSelector(
  state => state[NAME],
  userView => userView.showDeleteModal
)

export const showCreateModal = createSelector(
  state => state[NAME],
  userView => userView.showCreateModal
)

export const sendingInvite = createSelector(
  state => state[NAME],
  userView => userView.sendingInvite
)

export const sendInviteComplete = createSelector(
  state => state[NAME],
  userView => userView.sendInviteComplete
)

export const resettingPassword = createSelector(
  state => state[NAME],
  userView => userView.resettingPassword
)

export const resetPasswordComplete = createSelector(
  state => state[NAME],
  userView => userView.resetPasswordComplete
)

export const changingUserActiveStatus = createSelector(
  state => state[NAME],
  userView => userView.changingUserActiveStatus
)

export const deactivateUserComplete = createSelector(
  state => state[NAME],
  userView => userView.deactivateUserComplete
)
