import { connect } from 'react-redux'
import { reduxForm, destroy, SubmissionError } from 'redux-form'
import { selectors, actions } from '../modules/sheets-view'
import { actions as sheetActions, selectors as sheetSelectors } from 'store/sheets'
import { RecordFormModal } from '../components'
import { createRecord, updateRecord } from 'modules/api'

const FORM_NAME = 'record-form'

export default connect((state) => {
  const sheet = sheetSelectors.getCurrentSheet(state) || {}
  const record = selectors.getCurrentRecord(state)

  let initialValues = {
    sheet_id: sheet.id
  }

  if (record) initialValues = Object.assign({}, record)

  return {
    initialValues,
    fields: sheet.fields || [],
    showCreateRecordModal: selectors.showModal(state),
    formTitle: record ? 'Edit Record' : 'Create Record'
  }
}, (dispatch) => ({
  hideModal: () => {
    dispatch(destroy(FORM_NAME))
    dispatch(actions.hideCreateRecordModal())
  }
}))(reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  onSubmit: (values, dispatch) => {
    const saveRecord = values.id ? updateRecord : createRecord
    return saveRecord(values)
      .then((res) => {
        dispatch(destroy(FORM_NAME))
        dispatch(sheetActions.requestSheet(values.sheet_id))
        dispatch(actions.hideCreateRecordModal())
      })
      .catch((err) => {
        let message = 'Create record failed!'
        if (err.response.data && err.response.data.message) {
          message = err.response.data.message
        }
        throw new SubmissionError({ _error: message })
      })
  }
})(RecordFormModal))
