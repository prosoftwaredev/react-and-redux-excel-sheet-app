import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import uuid from 'uuid/v1'

import { AuthenticatedComponent } from 'store/auth/components'
import { CreateSheetModalContainer } from 'routes/Sheets/containers'
import { setToken } from 'modules/api'
import { selectors as authSelectors } from 'store/auth'
import { actions as sheetActions, selectors as sheetSelectors } from 'store/sheets'
import { selectors as layoutSelectors, actions as layoutActions } from 'store/layout'
import onClickOutside from 'react-onclickoutside'

import createReactClass from 'create-react-class'
// import DashboardMenu from './DashboardMenu'
import DashboardNav from './DashboardNav'

@AuthenticatedComponent
class DashboardLayout extends React.Component {
  componentWillMount () {
    setToken(this.props.authToken)
    this.props.getAllSheets()
  }

  render () {
    const { children, sheetTitle, sheetList, displaySheetList, toggleSheetList, showSheetModal } = this.props

    return (
      <div className='sb-top' style={{ height: '100%' }}>
        <div className='breadcumb blue-dark'>
          <div className='container'>
            <DashboardLayoutContent
              sheetTitle={sheetTitle}
              sheetList={sheetList}
              displaySheetList={displaySheetList}
              toggleSheetList={toggleSheetList}
              showSheetModal={showSheetModal} />
            <div className='litigation'>Demo Law Firm</div>
          </div>
        </div>
        <DashboardNav />
        <CreateSheetModalContainer />
        <main id='app-main' className='app-main in'>
          <div className='container'>
            <div>
              {children}
            </div>
            <div>
              <footer className='app-footer'>
                <div className='row'>
                  <div className='col-md-6 text-md-center'>
                    <div className='privacy-terms'>
                      <ul>
                        <li>
                          <a href='javascript:void(0)'>
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a href='javascript:void(0)'>
                            Terms of Use
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className='copyright'>Copyright LawMap App 2017 &copy;</div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    )
  }
}

DashboardLayout.displayName = 'DashboardLayout'
DashboardLayout.propTypes = {
  children : React.PropTypes.object.isRequired,
  authToken: React.PropTypes.string.isRequired,
  sheetTitle: React.PropTypes.string.isRequired,
  sheetList: React.PropTypes.array.isRequired,
  displaySheetList: React.PropTypes.bool.isRequired,
  toggleSheetList: React.PropTypes.func.isRequired,
  getAllSheets: React.PropTypes.func.isRequired,
  showSheetModal: React.PropTypes.func.isRequired
}

DashboardLayout.defaultProps = {
  authToken: '',
  children: [],
  sheetTitle: '...',
  sheetList: [],
  displaySheetList: false
}

const DashboardLayoutContent = onClickOutside(createReactClass({
  propTypes: {
    toggleSheetList: React.PropTypes.func.isRequired,
    displaySheetList: React.PropTypes.bool.isRequired,
    sheetTitle: React.PropTypes.string.isRequired,
    sheetList: React.PropTypes.array.isRequired,
    showSheetModal: React.PropTypes.func.isRequired
  },
  handleClickOutside () {
    this.props.toggleSheetList(false)
  },
  toggle () {
    this.props.toggleSheetList(!this.props.displaySheetList)
  },
  render () {
    const { sheetTitle, sheetList, displaySheetList, showSheetModal } = this.props
    let openMenuClass = displaySheetList ? 'open' : ''
    return (

      <div className={`sheet ${openMenuClass}`}>
        <a className='dropdown-toggle' type='button' onClick={this.toggle}>
          { sheetTitle }
          <span className='caret' />
        </a>
        <ul className='dropdown-menu'>
          { sheetList.map(sheet => (
            <li key={uuid()} onClick={this.toggle}>
              <Link to={`sheets/${sheet.id}`} onClick={this.toggle}>{sheet.title}</Link>
            </li>
          ))}
          <li>
            <a href='javascript:void(0)' onClick={showSheetModal}>
              <i className='m-r-md fa fa-plus' />
              Create new sheet
            </a>
          </li>
        </ul>
      </div>
    )
  }
}))

export default connect((state) => ({
  authToken: authSelectors.getToken(state),
  sheetTitle: sheetSelectors.getCurrentSheet(state).title,
  sheetList: sheetSelectors.getSheetList(state) || [],
  displaySheetList: layoutSelectors.displaySheetList(state)
}), (dispatch, props) => ({
  toggleSheetList: (isOpen) => dispatch(layoutActions.toggleSheetList(isOpen)),
  getAllSheets: () => {
    dispatch(sheetActions.requestAllSheets())
      .then(res => {
        if (props.params && props.params.id) {
          dispatch(sheetActions.requestSheet(props.params.id))
        } else {
          dispatch(sheetActions.requestSheet(res.data[0].id))
        }
      })
  },
  showSheetModal: () => dispatch(sheetActions.showSheetModal())
}))(DashboardLayout)
