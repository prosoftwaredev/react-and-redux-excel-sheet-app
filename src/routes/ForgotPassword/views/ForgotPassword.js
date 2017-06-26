import React from 'react'
import DefaultLayout from 'layouts/DefaultLayout'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { resetUserPassword } from 'modules/api'

const ForgotPassword = ({
  handleSubmit,
  submitting,
  submitFailed,
  submitSucceeded
}) => {
  return (
    <DefaultLayout>
      <div className='simple-page-form animated flipInY' id='reset-password-form'>
        <h4 className='form-title m-b-xl text-center'>Forgot Your Password ?</h4>
        { (!submitting && submitFailed) &&
          <div className='alert alert-danger text-center' role='alert'>
            Account not found
          </div>
        }

        { (!submitting && submitSucceeded) &&
          <div className='alert alert-success text-center' role='alert'>
            Email sent to reset your password
          </div>
        }
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <Field
              id='sign-in-email'
              type='email'
              className='form-control'
              placeholder='Email'
              name='email_address'
              component='input'
              />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={submitting}
            >{submitting ? 'SUBMITTING...' : 'RESET YOUR PASSWORD'}</button>
        </form>
      </div>

      <div className='simple-page-footer'>
        <p>
          <Link to='/login'>BACK TO LOGIN</Link>
        </p>
      </div>
    </DefaultLayout>
  )
}

ForgotPassword.displayName = 'ForgotPassword'
ForgotPassword.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default reduxForm({
  form: 'forgot',
  onSubmit: (values, dispatch) => {
    return new Promise((resolve, reject) => {
      resetUserPassword(values)
        .then(resolve, reject)
    })
  },
  onSubmitSuccess: () => {
  }
})(ForgotPassword)
