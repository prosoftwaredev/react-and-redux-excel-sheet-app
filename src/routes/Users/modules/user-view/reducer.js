import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  user: null,
  showModal: false,

  sendingInvite: false,
  sendInviteComplete: false,

  resettingPassword: false,
  resetPasswordComplete: false,
  changingUserActiveStatus: false,
  deactivateUserComplete: false,

  showCreateModal: false,
  showDeleteModal: false,

  showFilters: false,
  selectedGroups: []
}

export default createReducer(initialState, {
  [t.SHOW_USER_MODAL]: (state, payload) => {
    return Object.assign({}, initialState, {
      user: payload,
      showModal: true
    })
  },
  [t.HIDE_USER_MODAL]: (state, payload) => {
    return Object.assign({}, state, {
      user: null,
      showModal: false
    })
  },

  [t.SHOW_CREATE_USER_MODAL]: (state, payload) => {
    return Object.assign({}, state, {
      showCreateModal: true
    })
  },
  [t.HIDE_CREATE_USER_MODAL]: (state, payload) => {
    return Object.assign({}, state, {
      showCreateModal: false
    })
  },

  [t.SHOW_DELETE_USER_MODAL]: (state, payload) => {
    return Object.assign({}, state, {
      showDeleteModal: true
    })
  },
  [t.HIDE_DELETE_USER_MODAL]: (state, payload) => {
    return Object.assign({}, state, {
      showDeleteModal: false
    })
  },

  [t.SEND_INVITE_PROCESSING]: (state, payload) => {
    return Object.assign({}, state, {
      sendingInvite: true,
      sendInviteComplete: false
    })
  },
  [t.SEND_INVITE_COMPLETE]: (state, payload) => {
    return Object.assign({}, state, {
      sendingInvite: false,
      sendInviteComplete: true
    })
  },

  [t.RESET_PASSWORD_PROCESSING]: (state, payload) => {
    return Object.assign({}, state, {
      resettingPassword: true,
      resetPasswordComplete: false
    })
  },
  [t.RESET_PASSWORD_COMPLETE]: (state, payload) => {
    return Object.assign({}, state, {
      resettingPassword: false,
      resetPasswordComplete: true
    })
  },
  [t.CHANGING_USER_ACTIVE_STATUS_USER]: (state, payload) => {
    return Object.assign({}, state, {
      changingUserActiveStatus: true
    })
  },
  [t.DEACTIVATE_USER]: (state, payload) => {
    const user = Object.assign({}, state.user, { is_disabled: true })
    return Object.assign({}, state, {
      changingUserActiveStatus: false,
      user
    })
  },
  [t.ACTIVATE_USER]: (state, payload) => {
    const user = Object.assign({}, state.user, { is_disabled: false })
    return Object.assign({}, state, {
      changingUserActiveStatus: false,
      user
    })
  },

  [t.TOGGLE_FILTERS]: (state) => Object.assign({}, state, {
    showFilters: !state.showFilters
  }),

  [t.CHANGE_USER_IMAGE]: (state, payload) => {
    return Object.assign({}, state, {
      user: payload
    })
  }
})
