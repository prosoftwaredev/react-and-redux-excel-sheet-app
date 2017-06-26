import { connect } from 'react-redux'
import componentDispatch from 'modules/component-dispatch'
import { selectors, actions } from 'store/users'
import { actions as groupActions } from 'store/groups'
import { actions as userViewActions } from '../modules/user-view'
import { UserList } from '../components'
import { getUserInfo } from 'modules/api'

export default componentDispatch({
  willMount: (props, dispatch) => {
    dispatch(actions.getUserList())
  }
})(
  connect((state) => ({
    users: selectors.getUsers(state)
  }), (dispatch) => {
    return {
      createUser: (e) => {
        dispatch(userViewActions.showCreateUserModal())
      },
      selectUser: (user) => (e) => {
        getUserInfo(user.email_address).then((res) => {
          dispatch(userViewActions.showUserModal(res.data))
        })
      },
      deleteUser: (user) => (e) => {
        dispatch(groupActions.removeUserFromAllGroups(user))
        dispatch(actions.deleteUser(user.email_address))
      }
    }
  })(UserList))
