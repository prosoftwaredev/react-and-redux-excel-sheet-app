// We only need to import the modules necessary for initial render
// import DefaultLayout from '../layouts/DefaultLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import UsersRoute from './Users'
import SheetsRoute from './Sheets'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

const dashboard = (store) => ({
  component: DashboardLayout,
  path: '/',
  indexRoute: SheetsRoute(store),
  getChildRoutes (location, next) {
    require.ensure([], (require) => {
      const routes = [
        require('./Billing').default(store),
        SheetsRoute(store),
        require('./Configuration').default(store),
        UsersRoute(store)
      ]
      next(null, routes)
    })
  }
})

export const createRoutes = (store) => {
  const routes = {
    getChildRoutes (location, next) {
      require.ensure([], (require) => {
        const routes = [
          dashboard(store)
        ].concat(
          require('./Login').default(store),
          require('./ForgotPassword').default(store),
          require('./ResetPassword').default(store),
          require('./Terms').default(store),
          require('./Privacy').default(store),
        )
        next(null, routes)
      })
    }
  }
  return routes
}

export default createRoutes
