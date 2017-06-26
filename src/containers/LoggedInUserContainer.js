import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { selectors as authSelectors, actions as authActions } from 'store/auth'
import LoggedInUser from 'components/LoggedInUser'
import { selectors as layoutSelectors, actions as layoutActions } from 'store/layout'

export default withRouter(connect((state) => {
  const user = authSelectors.getUser(state)
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    profileImage: user.base64Image,
    displayUserMenu: layoutSelectors.displayUserMenu(state)
  }
}, (dispatch, props) => {
  return {
    toggleMenu: (isOpen) => {
      dispatch(layoutActions.toggleUserMenu(isOpen))
    },
    logout: () => {
      dispatch(authActions.removeCredentials())
      props.router.push('/login')
    }
  }
})(LoggedInUser))
