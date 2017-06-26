export default (store) => ({
  path : 'forgot',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ForgotPassword = require('./views/ForgotPassword').default
      cb(null, ForgotPassword)
    }, 'forgot')
  }
})
