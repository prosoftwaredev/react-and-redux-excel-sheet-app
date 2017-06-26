export default (store) => ({
  path : 'reset',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ForgotPassword = require('./views/ResetPassword').default
      cb(null, ForgotPassword)
    }, 'reset')
  }
})
