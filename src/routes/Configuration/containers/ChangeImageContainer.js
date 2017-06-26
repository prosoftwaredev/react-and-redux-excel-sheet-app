import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { actions as companyActions, selectors as companySelectors } from 'store/company'
import ImageUpload from '../components/ImageUpload'
import { updateCompanyImage } from 'modules/api'

const FORM_NAME = 'company-image-form'

export default connect((state) => {
  const { base64Image } = companySelectors.getCompany(state)
  return {
    base64Image
  }
})(reduxForm({
  form: FORM_NAME,
  validate: (values) => {
    let errors = {}
    if (!values.logo_image) errors.logo_image = 'Profile image required'
    return errors
  },
  onSubmit: (values, dispatch) => {
    return new Promise((resolve, reject) => {
      updateCompanyImage(values.logo_image)
      .then((res) => {
        dispatch(companyActions.getCompany())
        dispatch(reset(FORM_NAME))
        resolve()
      }, (err) => {
        reject(err)
      })
    })
  }
})(ImageUpload))
