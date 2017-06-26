export default (store) => ({
  path : 'login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LoginView = require('./views/LoginView').default
      cb(null, LoginView)
    }, 'login')
  }
})
