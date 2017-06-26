import t from './actionTypes.js'

export const showCreateRecordModal = () => ({
  type: t.SHOW_CREATE_RECORD_MODAL
})

export const hideCreateRecordModal = () => ({
  type: t.HIDE_CREATE_RECORD_MODAL
})

export const showEditRecordModal = (record) => ({
  type: t.SHOW_EDIT_RECORD_MODAL,
  payload: record
})

export const hideEditRecordModal = () => ({
  type: t.HIDE_EDIT_RECORD_MODAL
})

export const showFieldModal = (field) => ({
  type: t.SHOW_FIELD_MODAL,
  payload: field
})

export const hideFieldModal = () => ({
  type: t.HIDE_FIELD_MODAL
})

export const sortByField = (field) => ({
  type: t.SORT_BY_FIELD,
  payload: field
})

export const setSearchText = (text) => ({
  type: t.SET_SEARCH_TEXT,
  payload: text
})

export const toggleFilters = () => ({
  type: t.TOGGLE_FILTERS
})

export const setCurrentField = (field) => ({
  type: t.SET_CURRENT_FIELD,
  payload: field
})
