import { connect } from 'react-redux'
import { actions as sheetsViewActions } from '../modules/sheets-view'
import Filters from '../components/Filters'

export default connect(null, dispatch => ({
  toggleFilters: () => {
    dispatch(sheetsViewActions.toggleFilters())
  }
}))(Filters)
