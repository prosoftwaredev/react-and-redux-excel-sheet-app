import { connect } from 'react-redux'
import { reduxForm, destroy } from 'redux-form'
import { selectors, actions } from '../modules/sheets-view'
import { actions as sheetActions, selectors as sheetSelectors } from 'store/sheets'
import { FieldModal } from '../components'
import { createField, updateField } from 'modules/api'

const FORM_NAME = 'field form'

export default connect((state) => {
  const sheet = sheetSelectors.getCurrentSheet(state) || {}
  const field = selectors.getCurrentField(state)

  let initialValues = {
    sheet_id: sheet.id
  }

  if (field) initialValues = Object.assign({}, field)

  return {
    initialValues,
    showFieldModal: selectors.showFieldModal(state),
    formTitle: field ? 'Edit Field' : 'Create Field'
  }
}, (dispatch) => ({
  hideModal: () => {
    dispatch(destroy(FORM_NAME))
    dispatch(actions.hideFieldModal())
  }
}))(reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  onSubmit: (values, dispatch) => {
    const saveField = values.id ? updateField : createField
    const saveFieldText = values.id ? 'updateField' : 'createField'
    return saveField(values)
      .then((res) => {
        dispatch(sheetActions[saveFieldText](res.data))
        dispatch(sheetActions.requestSheet(res.data.sheet_id))
        dispatch(actions.hideFieldModal())
      })
  }
})(FieldModal))
