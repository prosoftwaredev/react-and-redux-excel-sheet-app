import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions, selectors } from 'store/sheets'
import { CreateSheetModal } from '../components'
import { createSheet, createField } from 'modules/api'

const FORM_NAME = 'create-sheet-form'

export default connect((state) => ({
  showCreateSheetModal: selectors.showCreateModal(state),
  fieldCount: selectors.getFieldCount(state)
}), (dispatch) => ({
  hideModal: () => {
    dispatch(actions.hideSheetModal())
  },
  addField: () => {
    dispatch(actions.addFieldToNewSheet())
  }
}))(reduxForm({
  form: FORM_NAME,
  onSubmit: (values, dispatch) => {
    return createSheet({ title: values.title, description: values.description }).then((res) => {
      delete values.title
      delete values.description
      Object.values(values).map((value, index) => {
        if (value) {
          createField({
            sheet_id: res.data.id,
            type: 'text',
            name: value,
            description: '',
            field_number: index
          }).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
      })
      dispatch(actions.requestSheet(res.data.id))
      dispatch(actions.resetFieldCount())
      dispatch(actions.hideSheetModal())
    })
  }
})(CreateSheetModal))
