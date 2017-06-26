import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  showModal: false,
  showFieldModal: false,
  currentRecord: null,
  sortField: null,
  searchText: '',
  currentField: '',
  showFilters: false
}

export default createReducer(initialState, {
  [t.SHOW_CREATE_RECORD_MODAL]: (state, payload) => Object.assign({}, initialState, {
    showModal: true,
    currentRecord: null
  }),

  [t.HIDE_CREATE_RECORD_MODAL]: (state, payload) => Object.assign({}, state, {
    showModal: false,
    currentRecord: null
  }),

  [t.SHOW_EDIT_RECORD_MODAL]: (state, payload) => Object.assign({}, initialState, {
    showModal: true,
    currentRecord: payload
  }),

  [t.HIDE_EDIT_RECORD_MODAL]: (state, payload) => Object.assign({}, state, {
    showModal: false,
    currentRecord: null
  }),

  [t.SHOW_FIELD_MODAL]: (state, payload) => Object.assign({}, initialState, {
    showFieldModal: true,
    currentField: payload
  }),

  [t.HIDE_FIELD_MODAL]: (state, payload) => Object.assign({}, state, {
    showFieldModal: false,
    currentField: null
  }),

  [t.SORT_BY_FIELD]: (state, payload) => Object.assign({}, state, {
    sortField: payload
  }),

  [t.SET_SEARCH_TEXT]: (state, payload) => Object.assign({}, state, {
    searchText: payload
  }),

  [t.TOGGLE_FILTERS]: (state) => Object.assign({}, state, {
    showFilters: !state.showFilters
  }),

  [t.SET_CURRENT_FIELD]: (state, payload) => {
    return Object.assign({}, state, { currentField: payload })
  }
})
