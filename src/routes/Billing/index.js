// import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'billing',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const BillingView = require('./views/BillingView').default
      // const module = require('./modules/user-view').default
      //
      // injectReducer(store, {
      //   key: module.constants.NAME,
      //   reducer: module.reducer
      // })

      cb(null, BillingView)
    }, 'billing')
  }
})
