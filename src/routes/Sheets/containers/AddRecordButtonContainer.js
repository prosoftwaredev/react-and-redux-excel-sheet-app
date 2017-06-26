import { connect } from 'react-redux'
import { actions as sheetsViewActions } from '../modules/sheets-view'
import { AddRecordButton } from '../components'

export default connect(null, (dispatch) => {
  return {
    showCreateRecordModal: () => {
      dispatch(sheetsViewActions.showCreateRecordModal())
    }
  }
})(AddRecordButton)
