export default (store) => ({
  path : 'terms',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const TermsView = require('./views/TermsView').default
      cb(null, TermsView)
    }, 'terms')
  }
})
