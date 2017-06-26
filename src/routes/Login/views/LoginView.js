import React from 'react'
import { actions as authActions } from 'store/auth'
import DefaultLayout from 'layouts/DefaultLayout'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { loginAdmin, getUserProfile, getUserProfileImage, setToken } from 'modules/api'
import { rawImageToBase64 } from 'modules/utils'
import CheckboxField from 'components/CheckboxField'
import componentDispatch from 'modules/component-dispatch'

import base64 from 'base-64'

import LogoPNG from 'images/logo.png'

const InputWithIcon = ({
  input,
  icon,
  ...restProps
}) => {
  return (
    <div className='form-group'>
      <div className='input-with-icon'>
        <i className={`fa ${icon}`} />
        <input {...input} {...restProps} />
      </div>
    </div>
  )
}

InputWithIcon.propTypes = {
  input: React.PropTypes.object,
  icon: React.PropTypes.string
}

const login = (values, dispatch) => {
  return loginAdmin(values)
    .then((response) => {
      const emailAddress = response.data.user.user_email_address
      setToken(response.data.token)
      dispatch(authActions.receiveCredentials(response.data))
      const req = getUserProfile(emailAddress)
      req
      .then((userReq) => {
        response.data.user = userReq.data
        dispatch(authActions.receiveCredentials(response.data))
        getUserProfileImage(userReq.data.profile_image.substring(1))
          .then((response) => {
            return rawImageToBase64(response.data)
          })
          .then((image) => {
            response.data.user.base64Image = image
            dispatch(authActions.receiveCredentials(response.data))
          })
      })
      return req
    })
}

const LoginView = ({
  handleSubmit,
  submitting,
  submitFailed
}) => {
  return (
    <DefaultLayout>
      <div className='simple-page-form' id='login-form'>
        <div className='logo'>
          <img src={LogoPNG} alt='LawMap' />
        </div>
        { (!submitting && submitFailed) &&
          <div className='alert alert-danger text-center' role='alert'>
            Login failed
          </div>
        }
        <form onSubmit={handleSubmit}>
          <Field
            type='email'
            icon='fa-user'
            placeholder='Email'
            name='email_address'
            component={InputWithIcon}
          />
          <Field
            type='password'
            icon='fa-key'
            placeholder='Password'
            name='password'
            component={InputWithIcon}
          />

          {
            <div className='form-group m-b-xl'>
              <Field
                name='remember'
                id='remember'
                label='Remember me'
                type='checkbox'
                component={CheckboxField}
            />
              <div className='forgot-password'>
                <Link to='/forgot'>Forgot Password?</Link>
              </div>
            </div>
          }

          <div className='buttons'>
            <button
              type='submit'
              className='btn btn-lg btn-login btn-dark-blue'
              disabled={submitting}
            >
              {submitting ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <footer>
          <span>{`Don't have an Account yet?`}</span><a href='javascript:void(0)'>Sign up</a>
        </footer>
      </div>
    </DefaultLayout>
  )
}

LoginView.displayName = 'LoginView'
LoginView.propTypes = {
  handleSubmit: React.PropTypes.func,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool
}

export default componentDispatch({

  didMount (props = {}, dispatch) {
    try {
      let userInfor = authActions.readUserInfor()
      let emailAddress = userInfor['email_address'] ? base64.decode(userInfor['email_address']) : null
      let password = userInfor['password'] ? base64.decode(userInfor['password']) : null
      if (emailAddress && password) {
        login({
          'email_address': emailAddress,
          'password': password,
          'remember': false
        }, dispatch).then(() => {
          window.location = '/'
        }).catch((exception) => {
          console.log(exception)
          authActions.removeUserInfor()
        })
      }
    } catch (exception) {
      console.log(exception)
    }
  }
})(connect(() => {
  return {}
})(reduxForm({
  form: 'login',
  onSubmit: (values, dispatch, { router }) => {
    return new Promise((resolve, reject) => {
      login(values, dispatch)
        .then(() => {
          window.location = '/'
          if (values.remember === true) {
            authActions.saveUserInfor(base64.encode(values.email_address), base64.encode(values.password))
          }
          resolve()
        }).catch((exception) => {
          console.log(exception)
          reject()
        })
    })
  }
})(LoginView)))
