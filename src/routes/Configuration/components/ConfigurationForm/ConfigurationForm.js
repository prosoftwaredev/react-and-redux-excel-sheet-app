import React from 'react'
import { Field } from 'redux-form'
import InputField from 'components/InputField'

const ConfigurationForm = ({
  initialValues,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,

  hideModal,
  showCreateUserModal,
  error,

  ...restProps
}) => {
  return (
    <form onSubmit={handleSubmit}>
      { (!submitting && submitFailed) &&
        <div className='alert alert-danger text-center' role='alert'>
          {error || 'Company update failed'}
        </div>
      }
      <div className='form-group'>
        <Field
          label='Company Name'
          id='companyName'
          type='text'
          className='form-control'
          placeholder='Company Name'
          name='name'
          component={InputField}
          />
      </div>

      <button type='submit' className='btn btn-primary btn-lg'>
        {submitting ? 'Saving...' : 'Save'}
      </button>
      {!submitting && submitSucceeded && <span className='text-success'>Company saved!</span>}
    </form>
  )
}

ConfigurationForm.propTypes = {
  initialValues: React.PropTypes.object,
  showCreateUserModal: React.PropTypes.bool,
  hideModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  error: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default ConfigurationForm
