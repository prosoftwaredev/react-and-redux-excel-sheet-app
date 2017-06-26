import { combineReducers } from 'redux'
import locationReducer from './location'
import { reducer as formReducer } from 'redux-form'
import { routerReducer as router } from 'react-router-redux'
import { reducer as usersReducer } from './users'
import { reducer as groupsReducer } from './groups'
import { reducer as sheetsReducer } from './sheets'
import { reducer as companyReducer } from './company'
import { reducer as authReducer } from './auth'
import { reducer as layoutReducer } from './layout'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    location: locationReducer,
    users: usersReducer,
    groups: groupsReducer,
    sheets: sheetsReducer,
    company: companyReducer,
    auth: authReducer,
    layout: layoutReducer,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
