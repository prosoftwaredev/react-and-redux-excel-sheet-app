import { connect } from 'react-redux'
import { actions as userViewActions } from '../modules/user-view'
import { AddUserButton } from '../components'

export default connect(null, (dispatch) => {
  return {
    showCreateUserModal: () => {
      dispatch(userViewActions.showCreateUserModal())
    }
  }
})(AddUserButton)
