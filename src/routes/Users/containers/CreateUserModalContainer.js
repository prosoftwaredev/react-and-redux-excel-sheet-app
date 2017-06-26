import { connect } from 'react-redux'
import { reduxForm, destroy, SubmissionError } from 'redux-form'
import { selectors, actions } from '../modules/user-view'
import { selectors as groupSelectors } from 'store/groups'
import { actions as userActions } from 'store/users'
import { CreateUserModal } from '../components'
import { createUser, addUserToGroups } from 'modules/api'
import validateUser from 'store/users/validate-user'

const FORM_NAME = 'create-user-form'

export default connect((state) => ({
  showCreateUserModal: selectors.showCreateModal(state),
  groups: groupSelectors.getGroups(state)
}), (dispatch) => ({
  hideModal: () => {
    dispatch(actions.hideCreateUserModal())
  }
}))(reduxForm({
  form: FORM_NAME,
  validate: validateUser,
  onSubmit: (values, dispatch) => {
    return createUser(values)
      .then((res) => {
        let groups = JSON.parse(values.groups).map(group => group.value)

        if (values.upload_image !== {}) {
          dispatch(userActions.uploadImage(values.email_address, values.upload_image))
        }
        if (groups.length > 0) {
          addUserToGroups({
            user_id: res.data.id,
            user_group_ids: groups
          }).then(() => {
            let userGroupIds = groups
            dispatch(userActions.addUserToGroups({ user: values, userGroupIds }))
            dispatch(userActions.addUser(values))
            dispatch(destroy(FORM_NAME))
            dispatch(actions.hideCreateUserModal())
          })
        }
      }).catch((err) => {
        let message = 'Create user failed!'
        if (err.response.status === 422) {
          message = 'User already exists. Duplicate email address!'
        } else if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        }
        throw new SubmissionError({ _error: message })
      })
  }
})(CreateUserModal))
