import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { COMPANY_IMAGE } from 'modules/app-config'
import { actions as companyActions, selectors as companySelectors } from 'store/company'
import componentDispatch from 'modules/component-dispatch'

const menuItems = [{
  name: 'Users',
  icon: 'zmdi-accounts'
}]

// const menuItems = [{
//   name: 'Company',
//   icon: 'zmdi-home'
// }, {
//   name: 'Users',
//   icon: 'zmdi-accounts'
// }, {
//   name: 'Billing',
//   icon: 'zmdi-balance-wallet'
// }, {
//   name: 'Configuration',
//   icon: 'zmdi-settings'
// }]

const DashboardMenu = ({
  company
}) => {
  return (
    <aside id='app-aside' className='app-aside top light in'>
      <div className='container'>
        <div className='aside-menu-wrapper'>
          <div id='aside-top-menu-toggle' className='visible-xs-inline-block'>
            <button data-toggle='class' data-target='#aside-top-menu' data-className='open'
              className='hamburger hamburger--spin js-hamburger' type='button'>
              <span className='hamburger-box'>
                <span className='hamburger-inner' />
              </span>
            </button>
          </div>
          <ul className='sf-menu aside-menu aside-top-menu sf-js-enabled sf-arrows'
            id='aside-top-menu' style={{ touchAction: 'pan-y' }}>
            {menuItems.map((item, index) => {
              return (
                <li key={`menu-${item.name}`}>
                  <Link to={`/${item.name.toLowerCase()}`} className='menu-link'>
                    <span className='menu-icon'>
                      <i className={`zmdi zmdi-hc-lg ${item.icon}`} />
                    </span>
                    <span className='menu-text'>{item.name}</span>
                  </Link>
                </li>
              )
            })}

          </ul>
        </div>
        <div className='aside-user'>
          <ul>
            <li className='dropdown'>
              <div className='company-info'>
                <div className='avatar avatar-sm'>
                  <img className='img-responsive' src={company.base64Image || COMPANY_IMAGE} alt='avatar' />
                </div>
                <span>{company.name}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}

DashboardMenu.propTypes = {
  company: React.PropTypes.object
}

export default componentDispatch({
  willMount: (props, dispatch) => {
    dispatch(companyActions.getCompany())
  }
})(connect((state) => ({
  company: companySelectors.getCompany(state)
}))(DashboardMenu))
