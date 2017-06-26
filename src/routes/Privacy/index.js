export default (store) => ({
  path : 'privacy',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PrivacyView = require('./views/PrivacyView').default
      cb(null, PrivacyView)
    }, 'PrivacyView')
  }
})
