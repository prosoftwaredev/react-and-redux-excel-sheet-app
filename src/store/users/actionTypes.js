import { namespaceActions } from 'modules/redux-utils'
import { NAME } from './constants'

const LOAD_USER_LIST = 'LOAD_USER_LIST'
const UPDATE_USER = 'UPDATE_USER'
const ADD_USER = 'ADD_USER'
const DELETE_USER = 'DELETE_USER'
const UPDATE_USER_PROFILEIMAGE = 'UPDATE_USER_PROFILEIMAGE'

export default namespaceActions(NAME)([
  LOAD_USER_LIST,
  UPDATE_USER,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER_PROFILEIMAGE
])
