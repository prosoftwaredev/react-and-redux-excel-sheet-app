import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field } from 'redux-form'
import InputField from 'components/InputField'

const FieldModal = ({
  initialValues,
  formTitle,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,
  hideModal,
  showFieldModal,
  error,
  ...restProps
}) => {
  return (
    <Modal
      show={showFieldModal}
      aria-labelledby='contained-modal-title'>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <button type='button' className='close' onClick={hideModal} aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (!submitting && submitFailed) &&
            <div className='alert alert-danger text-center' role='alert'>
              {error || 'Save Field failed'}
            </div>
          }
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Field Name'
                id='fieldname'
                type='text'
                className='form-control'
                placeholder='Field Name'
                name='name'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Description'
                id='desc'
                type='text'
                className='form-control'
                placeholder='Description'
                name='description'
                component={InputField}
                />
            </div>
          </div>
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Type'
                id='type'
                type='text'
                className='form-control'
                placeholder='Type'
                name='type'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Field Number'
                id='field_number'
                type='text'
                className='form-control'
                placeholder='Field Number'
                name='field_number'
                component={InputField}
                />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-grey' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-blue-dark' disabled={pristine || submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

FieldModal.displayName = 'FieldModal'
FieldModal.propTypes = {
  initialValues: React.PropTypes.object,
  formTitle: React.PropTypes.string,
  showFieldModal: React.PropTypes.bool,
  hideModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  error: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default FieldModal
