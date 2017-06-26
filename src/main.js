import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import { actions as authActions } from 'store/auth'

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

import 'font-awesome/css/font-awesome.min.css'
import 'animate.css/animate.min.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'styles/dashboard/bootstrap.scss'
import 'styles/dashboard/app.scss'

store.dispatch(authActions.reloadCredentials())

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something before request is sent
  // console.log('interceptor response')
  return response
}, (error) => {
  if (error.toString().indexOf('status code 401') !== -1) {
    store.dispatch(authActions.removeCredentials())
    window.location = '/'
  }
  return Promise.reject(error)
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
