import { namespaceActions } from 'modules/redux-utils'
import { NAME } from './constants'

const RECEIVE_CREDENTIALS = 'RECEIVE_CREDENTIALS'
const REMOVE_CREDENTIALS = 'REMOVE_CREDENTIALS'

export default namespaceActions(NAME)([
  RECEIVE_CREDENTIALS,
  REMOVE_CREDENTIALS
])
