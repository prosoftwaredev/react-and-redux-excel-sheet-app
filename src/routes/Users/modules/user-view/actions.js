import t from './actionTypes.js'
import * as selectors from './selectors'
import { resendUserInvite, resetUserPassword, deactivateUser, activateUser } from 'modules/api'

export const showUserModal = (user) => {
  return {
    type: t.SHOW_USER_MODAL,
    payload: user
  }
}

export const hideUserModal = () => {
  return {
    type: t.HIDE_USER_MODAL
  }
}

export const sendInviteSubmit = () => {
  return {
    type: t.SEND_INVITE_PROCESSING
  }
}

export const sendInviteComplete = () => {
  return {
    type: t.SEND_INVITE_COMPLETE
  }
}

export const resetPasswordSubmit = () => {
  return {
    type: t.RESET_PASSWORD_PROCESSING
  }
}

export const resetPasswordComplete = () => {
  return {
    type: t.RESET_PASSWORD_COMPLETE
  }
}

export const changeUserStatusRequested = () => {
  return {
    type: t.CHANGING_USER_ACTIVE_STATUS_USER
  }
}

export const deactivateUserComplete = () => {
  return {
    type: t.DEACTIVATE_USER
  }
}

export const activateUserComplete = () => {
  return {
    type: t.ACTIVATE_USER
  }
}

export const showCreateUserModal = () => {
  return {
    type: t.SHOW_CREATE_USER_MODAL
  }
}

export const hideCreateUserModal = () => {
  return {
    type: t.HIDE_CREATE_USER_MODAL
  }
}

export const showDeleteUserModal = () => {
  return {
    type: t.SHOW_DELETE_USER_MODAL
  }
}

export const hideDeleteUserModal = () => {
  return {
    type: t.HIDE_DELETE_USER_MODAL
  }
}

export const toggleFilters = () => ({
  type: t.TOGGLE_FILTERS
})

export const changeUserImage = (user) => {
  return {
    type: t.CHANGE_USER_IMAGE,
    payload: user
  }
}

export const sendInviteRequest = () => {
  return (dispatch, getState) => {
    dispatch(sendInviteSubmit())
    const user = selectors.getUser(getState())
    resendUserInvite(user.email_address)
      .then((res) => {
        dispatch(sendInviteComplete())
      })
      .catch(() => {})
  }
}

export const resetUserPasswordRequest = () => {
  return (dispatch, getState) => {
    dispatch(resetPasswordSubmit())
    const user = selectors.getUser(getState())
    resetUserPassword(user.email_address)
      .then((res) => {
        dispatch(resetPasswordComplete())
      })
      .catch(() => {})
  }
}

export const deactivateUserRequest = () => {
  return (dispatch, getState) => {
    dispatch(changeUserStatusRequested())
    const user = selectors.getUser(getState())
    const req = deactivateUser(user.email_address)
    req.then((res) => {
      dispatch(deactivateUserComplete())
    })
    .catch(() => {})

    return req
  }
}

export const activateUserRequest = () => {
  return (dispatch, getState) => {
    dispatch(changeUserStatusRequested())
    const user = selectors.getUser(getState())
    const req = activateUser(user.email_address)
    req.then((res) => {
      dispatch(activateUserComplete())
    })
    .catch(() => {})

    return req
  }
}
