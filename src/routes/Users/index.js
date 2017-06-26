import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'users',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const UsersView = require('./views/UsersView').default
      const module = require('./modules/user-view').default

      injectReducer(store, {
        key: module.constants.NAME,
        reducer: module.reducer
      })

      cb(null, UsersView)
    }, 'users')
  }
})
