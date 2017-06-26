import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field, Fields } from 'redux-form'
import InputField from 'components/InputField'
import DefaultUserIMG from 'images/avatar/default-user.png'

import Select from 'react-select'
import 'react-select/dist/react-select.css'

const changeProfileImage = (fields) => (e) => {
  e.preventDefault()
  let reader = new FileReader()
  let file = e.target.files[0]
  fields.upload_image.input.onChange(file)
  reader.onloadend = () => {
    fields.base64Image.input.onChange(reader.result)
  }
  reader.readAsDataURL(file)
}

const ImageField = (fields) => {
  return (
    <div>
      <div className='avatar avatar-xl avatar-circle m-r-0'>
        <img className='img-responsive' src={fields.base64Image.input.value || DefaultUserIMG} alt='avatar' />
      </div>
      <label className='btn btn-default btn-file btn-block'>
        <i className='fa fa-upload m-r-sm' />
          Browse
          <input type='file' style={{ 'display': 'none' }} onChange={changeProfileImage(fields)} />
      </label>
    </div>
  )
}

const MultiselectField = (field) => {
  const changedGroups = (selected) => {
    field.input.onChange(JSON.stringify(selected))
  }

  const selectedGroup = field.input.value === '' ? [] : JSON.parse(field.input.value).map((group) => {
    return { value: group.value, label: group.label }
  })

  return (
    <Select
      options={field.groups.map((group) => {
        return { value: group.id, label: group.name }
      })}
      value={selectedGroup}
      multi
      onChange={changedGroups}
      />
  )
}

const CreateUserModal = ({
  initialValues,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,
  hideModal,
  showCreateUserModal,
  error,
  groups,
  ...restProps
}) => {
  return (
    <Modal
      show={showCreateUserModal}
      aria-labelledby='contained-modal-title'>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <button type='button' className='close' onClick={hideModal} aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (!submitting && submitFailed) &&
            <div className='alert alert-danger text-center' role='alert'>
              {error || 'Create user failed'}
            </div>
          }

          <div className='row'>
            <div className='form-group text-center col-xs-12 col-sm-12'>
              <label htmlFor='exampleInputFile' style={{ 'display': 'block' }}>Avatar Picture</label>
              <Fields
                names={['base64Image', 'upload_image']}
                component={ImageField}
                />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='First Name'
                id='firstName'
                type='text'
                className='form-control'
                placeholder='First Name'
                name='first_name'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Last Name'
                id='lastName'
                type='text'
                className='form-control'
                placeholder='Last Name'
                name='last_name'
                component={InputField}
                />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Email'
                id='userEmail'
                type='email'
                className='form-control'
                placeholder='Email'
                name='email_address'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <label htmlFor='field-1'>Group</label>
              <Field
                name='groups'
                groups={groups}
                component={MultiselectField}
                />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Quota'
                id='quota'
                type='text'
                className='form-control'
                placeholder='Quota'
                name='quota'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Storage Location'
                id='storage_location'
                type='text'
                className='form-control'
                placeholder='Storage Location'
                name='storage_location'
                component={InputField}
                />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <div className='form-group'>
                <Field
                  id='admin'
                  name='is_admin'
                  type='checkbox'
                  component='input'
                  />
                <label htmlFor='admin' style={{ marginLeft: '10px' }}>Admin</label>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-grey' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-blue-dark' disabled={pristine || submitting}>
            {submitting ? 'Adding...' : 'Add User'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

CreateUserModal.displayName = 'CreateUserModal'
CreateUserModal.propTypes = {
  initialValues: React.PropTypes.object,
  showCreateUserModal: React.PropTypes.bool,
  hideModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  error: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool,

  groups: React.PropTypes.array
}

export default CreateUserModal
