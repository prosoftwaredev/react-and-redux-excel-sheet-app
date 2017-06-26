import React from 'react'
import { connect } from 'react-redux'
import DefaultLayout from 'layouts/DefaultLayout'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { passwordReset } from 'modules/api'
import componentDispatch from 'modules/component-dispatch'

const ResetPassword = ({
  handleSubmit,
  submitting,
  submitFailed,
  submitSucceeded,
  error
}) => {
  return (
    <DefaultLayout>
      <div className='simple-page-form animated flipInY' id='reset-password-form'>
        <h4 className='form-title m-b-xl text-center'>Reset Your Password ?</h4>
        { (!submitting && submitFailed) &&
          <div className='alert alert-danger text-center' role='alert'>
            {error || 'Reset password failed'}
          </div>
        }

        { (!submitting && submitSucceeded) &&
          <div className='alert alert-success text-center' role='alert'>
            Your password has been reset
          </div>
        }
        <form onSubmit={handleSubmit}>

          <div className='form-group'>
            <Field
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              component='input'
              />
          </div>
          <div className='form-group'>
            <Field
              id='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              component='input'
              />
          </div>

          <button
            type='submit'
            className='btn btn-primary'
            disabled={submitting}
            >{submitting ? 'RESETTING...' : 'RESET YOUR PASSWORD'}</button>
        </form>
      </div>
    </DefaultLayout>
  )
}

ResetPassword.displayName = 'ResetPassword'
ResetPassword.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool,
  error: React.PropTypes.string
}

export default componentDispatch({
  willMount (props = {}) {
    const { router, location: { query: { reset_token, email_address } } } = props
    /* eslint-disable */
    if (!reset_token || !email_address) {
      router.replace('/login')
    }
    /* eslint-enable */
  }
})(connect((state, ownProps) => {
  const { reset_token, email_address } = ownProps.location.query
  return {
    initialValues: {
      reset_token,
      email_address
    }
  }
})(reduxForm({
  form: 'reset',
  onSubmit: (values, dispatch) => {
    const { confirmPassword, password } = values

    if (!password) {
      throw new SubmissionError({ _error: 'Password is required' })
    } else if (confirmPassword !== password) {
      throw new SubmissionError({ _error: 'Passwords must match' })
    } else {
      return new Promise((resolve, reject) => {
        passwordReset(values)
          .then(resolve, reject)
          .catch(() => {
            throw new SubmissionError({ _error: 'Reset password failed' })
          })
      })
    }
  }
})(ResetPassword)))
