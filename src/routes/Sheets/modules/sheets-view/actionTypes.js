import { namespaceActions } from 'modules/redux-utils'
import { NAME } from './constants'

const HIDE_CREATE_RECORD_MODAL = 'HIDE_CREATE_RECORD_MODAL'
const SHOW_CREATE_RECORD_MODAL = 'SHOW_CREATE_RECORD_MODAL'

const HIDE_EDIT_RECORD_MODAL = 'HIDE_EDIT_RECORD_MODAL'
const SHOW_EDIT_RECORD_MODAL = 'SHOW_EDIT_RECORD_MODAL'

const SORT_BY_FIELD = 'SORT_BY_FIELD'
const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

const TOGGLE_FILTERS = 'TOGGLE_FILTERS'

const SHOW_FIELD_MODAL = 'SHOW_FIELD_MODAL'
const HIDE_FIELD_MODAL = 'HIDE_FIELD_MODAL'

const SET_CURRENT_FIELD = 'SET_CURRENT_FIELD'

export default namespaceActions(NAME)([
  HIDE_CREATE_RECORD_MODAL,
  SHOW_CREATE_RECORD_MODAL,

  HIDE_EDIT_RECORD_MODAL,
  SHOW_EDIT_RECORD_MODAL,

  SORT_BY_FIELD,
  SET_SEARCH_TEXT,

  TOGGLE_FILTERS,

  SHOW_FIELD_MODAL,
  HIDE_FIELD_MODAL,

  SET_CURRENT_FIELD
])