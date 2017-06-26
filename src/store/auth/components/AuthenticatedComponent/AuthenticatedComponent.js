import React from 'react'
import { connect } from 'react-redux'
import { getAuthState } from '../../selectors'

export default (Component) => {
  class AuthenticatedComponent extends React.Component {
    static displayName = 'auth:AuthenticatedComponent'

    static propTypes = {
      isAuthenticated: React.PropTypes.bool.isRequired,
      router: React.PropTypes.object
    }

    componentWillMount () {
      this.checkAuth(this.props)
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth(nextProps)
    }

    checkAuth (props) {
      const {
        isAuthenticated
      } = props

      // if not logged in, redirect to login page - save the route they were trying to go to
      // else if logged in - if user was trying to go to a route, but had to login first, redirect them there
      if (!isAuthenticated) {
        this.props.router.push('/login')
      }
    }

    render () {
      if (this.props.isAuthenticated === true) {
        return (<Component {...this.props} />)
      } else {
        return null
      }
    }
  }

  AuthenticatedComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  const mapStateToProps = (state) => getAuthState(state)
  return connect(mapStateToProps, null)(AuthenticatedComponent)
}
