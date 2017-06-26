import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { selectors, actions } from '../modules/user-view'
import { actions as userActions } from 'store/users'
import { selectors as groupSelectors, actions as groupActions } from 'store/groups'
import { UserViewModal } from '../components'
import { modifyUser, addUserToGroups, removeUserFromGroup } from 'modules/api'
import validateUser from 'store/users/validate-user'

export default connect((state) => {
  const userView = selectors.getUser(state)
  let user = null
  let initialValues = {}
  let userIsDisabled = false

  if (userView) {
    user = selectors.getUser(state)
    const {
      id,
      first_name,
      last_name,
      email_address,
      is_admin,
      groups,
      base64Image,
      quota,
      storage_location
    } = user

    userIsDisabled = user.is_disabled
    let uploadImage = {}

    initialValues = {
      id,
      first_name,
      last_name,
      email_address,
      is_admin,
      groups: JSON.stringify(groups.map(group => ({ value: group.id, label: group.name }))),
      base64Image,
      quota,
      storage_location,
      uploadImage
    }
  }
  return {
    user,
    initialValues,
    userIsDisabled,
    showModal: !!user,
    sendingInvite: selectors.sendingInvite(state),
    sendInviteComplete: selectors.sendInviteComplete(state),
    resettingPassword: selectors.resettingPassword(state),
    resetPasswordComplete: selectors.resetPasswordComplete(state),
    changingUserActiveStatus: selectors.changingUserActiveStatus(state),
    groups: groupSelectors.getGroups(state)
  }
}, (dispatch) => {
  return {
    hideModal: () => {
      dispatch(actions.hideUserModal())
    },
    showDeleteUserModal: () => {
      dispatch(actions.showDeleteUserModal())
    },
    sendUserInvite: () => {
      dispatch(actions.sendInviteRequest())
    },
    resetUserPassword: () => {
      dispatch(actions.resetUserPasswordRequest())
    },
    deactivateUser: () => {
      const req = dispatch(actions.deactivateUserRequest())
      req.then(() => {
        const user = dispatch((dispatch, getState) => selectors.getUser(getState()))
        dispatch(userActions.updateUser(user))
      })
    },
    activateUser: () => {
      const req = dispatch(actions.activateUserRequest())
      req.then(() => {
        const user = dispatch((dispatch, getState) => selectors.getUser(getState()))
        dispatch(userActions.updateUser(user))
      })
    },
    changeImage: (user) => {
      dispatch(actions.changeUserImage(user))
    }
  }
})(reduxForm({
  form: 'user-form',
  enableReinitialize: true,
  validate: validateUser,
  onSubmit: (values, dispatch, props) => {
    return new Promise((resolve, reject) => {
      let user = {
        email_address: values.email_address,
        first_name: values.first_name,
        last_name: values.last_name,
        profile_image: values.profile_image,
        quota: values.quota,
        storage_location: values.storage_location
      }

      modifyUser(user).then((res) => {
        dispatch(userActions.updateUser(values))
        dispatch(actions.hideUserModal())
        // image uploading
        if (values.upload_image !== {}) {
          dispatch(userActions.uploadImage(values.email_address, values.upload_image))
        }

        // add or remove a user from groups
        let groupIds = JSON.parse(values.groups).map(group => group.value)
        let defaultGroupIds = JSON.parse(props.initialValues.groups).map(group => group.value)
        let removeGroupIds = groupIds.length > 0 ? defaultGroupIds.filter(group =>
          groupIds.indexOf(group) === -1) : defaultGroupIds
        let addGroupIds = defaultGroupIds.length > 0 ? groupIds.filter(group =>
          defaultGroupIds.indexOf(group) === -1) : groupIds

        let userId = values.id

        if (addGroupIds.length > 0) {
          let userGroupIds = addGroupIds
          addUserToGroups({ user_id: userId, user_group_ids: userGroupIds }).then(() => {
            dispatch(groupActions.addUserToGroups({ user, userGroupIds }))
          })
        }
        if (removeGroupIds.length > 0) {
          removeGroupIds.map((groupId) => {
            removeUserFromGroup({ id: groupId, user_id: userId }).then(() => {
              dispatch(groupActions.removeUserFromGroup({ userId, groupId }))
            })
          })
        }
      }).catch(reject)
    })
  }
})(UserViewModal))
