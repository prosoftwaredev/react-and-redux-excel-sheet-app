import { namespaceActions } from 'modules/redux-utils'
import { NAME } from './constants'

const TOGGLE_USER_MENU = 'TOGGLE_USER_MENU'
const TOGGLE_SHEET_LIST = 'TOGGLE_SHEET_LIST'

export default namespaceActions(NAME)([
  TOGGLE_USER_MENU,
  TOGGLE_SHEET_LIST
])
