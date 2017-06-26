import { connect } from 'react-redux'
import { reduxForm, reset } from 'redux-form'
import { selectors } from '../modules/user-view'
import { actions as userActions } from 'store/users'
import ImageUpload from '../components/ImageUpload'
import { postProfileImage } from 'modules/api'

const FORM_NAME = 'user-image-form'

export default connect((state) => {
  const user = selectors.getUser(state)
  return {
    initialValues: {
      email_address: user.email_address
    }
  }
})(reduxForm({
  form: FORM_NAME,
  validate: (values) => {
    let errors = {}
    if (!values.profile_image) errors.profile_image = 'Profile image required'
    return errors
  },
  onSubmit: (values, dispatch) => {
    const userEmailAddress = values.email_address
    return new Promise((resolve, reject) => {
      postProfileImage({
        userEmailAddress,
        image: values.profile_image
      })
      .then((res) => {
        dispatch(userActions.getUser(userEmailAddress))
        dispatch(reset(FORM_NAME))
        resolve()
      }, (err) => {
        reject(err)
      })
    })
  }
})(ImageUpload))
