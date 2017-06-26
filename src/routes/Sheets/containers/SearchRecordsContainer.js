import { connect } from 'react-redux'
import { actions as sheetViewActions } from '../modules/sheets-view'
import { SearchRecords } from '../components'

export default connect(null, (dispatch) => ({
  onSearch: (e) => {
    dispatch(sheetViewActions.setSearchText(e.target.value))
  }
}))(SearchRecords)
