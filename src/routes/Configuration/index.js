export default (store) => ({
  path : 'configuration',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ConfigurationView = require('./views/ConfigurationView').default

      cb(null, ConfigurationView)
    }, 'configuration')
  }
})
