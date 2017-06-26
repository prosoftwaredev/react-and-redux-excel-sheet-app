import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { selectors, actions } from '../modules/user-view'
import { actions as userActions } from 'store/users'
import { DeleteUserModal } from '../components'
import { deleteUser } from 'modules/api'

export default connect((state) => {
  const user = selectors.getUser(state) || {}
  return {
    user,
    initialValues: {
      email_address: user.email_address
    },
    showDeleteModal: selectors.showDeleteModal(state)
  }
}, (dispatch) => {
  return {
    hideDeleteModal: () => {
      dispatch(actions.hideDeleteUserModal())
    }
  }
})(reduxForm({
  form: 'delete-user-form',
  enableReinitialize: true,
  onSubmit: (values, dispatch) => {
    return new Promise((resolve, reject) => {
      deleteUser(values.email_address)
        .then(() => {
          dispatch(actions.hideUserModal())
          dispatch(userActions.deleteUser(values.email_address))
          dispatch(actions.hideDeleteUserModal())
          resolve()
        })
        .catch(reject)
    })
  }
})(DeleteUserModal))
