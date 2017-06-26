import { connect } from 'react-redux'
import { actions as usersViewActions } from '../modules/user-view'
import componentDispatch from 'modules/component-dispatch'
import { selectors, actions } from 'store/groups'
import { selectors as userSelectors, actions as userActions } from 'store/users'
import Filters from '../components/Filters'

export default componentDispatch({
  willMount: (props, dispatch) => {
    dispatch(actions.getGroupList())
    dispatch(userActions.getUserList())
  }
})(
  connect((state) => ({
    groups: selectors.getGroups(state),
    users: userSelectors.getUsers(state),
    userActiveCount: userSelectors.getActiveCount(state)
  }), (dispatch) => {
    return {
      toggleFilters: () => {
        dispatch(usersViewActions.toggleFilters())
      },
      updateGroupState: (group) => {
        dispatch(actions.updateGroup(group))
      },
      deleteGroupState: (groupId) => {
        dispatch(actions.deleteGroup(groupId))
      }
    }
  })(Filters)
)
