import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'sheets/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SheetsView = require('./views/SheetsView').default
      const module = require('./modules/sheets-view').default

      injectReducer(store, {
        key: module.constants.NAME,
        reducer: module.reducer
      })

      cb(null, SheetsView)
    }, 'sheets')
  }
})
