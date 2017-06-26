import { connect } from 'react-redux'
import { reduxForm, SubmissionError } from 'redux-form'
import { actions as companyActions, selectors as companySelectors } from 'store/company'
import { ConfigurationForm } from '../components'
import { updateCompanyProfile } from 'modules/api'

const FORM_NAME = 'edit-company-form'

export default connect((state) => ({
  initialValues: companySelectors.getCompany(state)
}))(reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  onSubmit: (values, dispatch) => {
    return updateCompanyProfile(values)
      .then((res) => {
        dispatch(companyActions.loadCompany(values))
      }).catch(() => {
        throw new SubmissionError({ _error: 'Failed to save company' })
      })
  }
})(ConfigurationForm))
