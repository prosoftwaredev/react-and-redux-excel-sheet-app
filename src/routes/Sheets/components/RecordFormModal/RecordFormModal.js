import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field } from 'redux-form'
import InputField from 'components/InputField'
import uuid from 'uuid/v1'

const FileInput = ({
  input: {
    onChange,
    value: {
      name
    }
  },
  ...props
}) => {
  return (
    <div>
      <label htmlFor='docUpload' className='upload' style={{ cursor: 'pointer' }}>
        <i className='fa fa-upload' />
        <span> Upload Document(s)</span>
      </label>
      <div className='pull-right'>{ name ? `File: ${name}` : '' }</div>
      <input
        id='docUpload'
        type='file'
        name='profile_image'
        onChange={function (e) {
          onChange(e.target.files[0])
        }}
        style={{ display: 'none' }}
        />
    </div>
  )
}
FileInput.propTypes = {
  input: React.PropTypes.object
}

const RecordFormModal = ({
  fields,
  formTitle,

  initialValues,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,

  hideModal,
  showCreateRecordModal,
  error,

  ...restProps
}) => {
  return (
    <Modal
      show={showCreateRecordModal}
      aria-labelledby='contained-modal-title'>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <button type='button' className='close' onClick={hideModal} aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <Modal.Title>{ formTitle }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (!submitting && submitFailed) &&
            <div className='alert alert-danger text-center' role='alert'>
              {error || 'Create record failed'}
            </div>
          }
          {fields.map((field, index) => (
            <div className='col-xs-12 col-sm-6' key={uuid()}>
              <Field
                label={field.name}
                id={field.id}
                className='form-control input-shadow'
                placeholder={field.description}
                name={index + 1}
                component={InputField}
                />
            </div>)
          )}
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              {/* <label style={{ display: 'none' }}>
                <input type='checkbox' style={{ marginRight: '6px' }} />
                Exhibit
              </label> */}
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                name='docUpload'
                component={FileInput}
                />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-grey' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-blue-dark' disabled={pristine || submitting}>
            {submitting ? 'Saving...' : 'Save Record'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

RecordFormModal.displayName = 'RecordFormModal'
RecordFormModal.propTypes = {
  fields: React.PropTypes.array,
  formTitle: React.PropTypes.string,
  showCreateRecordModal: React.PropTypes.bool,
  hideModal: React.PropTypes.func,

  initialValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  error: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default RecordFormModal
