import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import { Field } from 'redux-form'
import InputField from 'components/InputField'

const CreateSheetModal = ({
  initialValues,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,
  hideModal,
  addField,
  showCreateSheetModal,
  fieldCount,
  error,
  ...restProps
}) => {
  var fields = []
  for (var i = 1; i <= fieldCount; i++) {
    var field = {}
    field['label'] = 'Field ' + i
    field['name'] = 'field' + i
    field['id'] = 'field_' + i
    fields.push(field)
  }
  return (
    <Modal
      show={showCreateSheetModal}
      aria-labelledby='contained-modal-title'>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <button type='button' className='close' onClick={hideModal} aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <Modal.Title>Create Sheet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { (!submitting && submitFailed) &&
            <div className='alert alert-danger text-center' role='alert'>
              {error || 'Create sheet failed'}
            </div>
          }
          <div className='row'>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Sheet Name'
                id='sheetname'
                type='text'
                className='form-control'
                placeholder='Sheet Name'
                name='title'
                component={InputField}
                />
            </div>
            <div className='form-group col-xs-12 col-sm-6'>
              <Field
                label='Sheet description'
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
            {
              fields && fields.map(field => {
                return (
                  <div className='form-group col-xs-12 col-sm-6'>
                    <Field
                      label={field.label}
                      id={field.id}
                      type='text'
                      className='form-control'
                      placeholder='Field'
                      name={field.name}
                      component={InputField}
                      />
                  </div>
                )
              })
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-grey' onClick={addField}>Add Field</button>
          <button type='button' className='btn btn-grey' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-blue-dark' disabled={pristine || submitting}>
            {submitting ? 'Adding...' : 'Add Sheet'}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

CreateSheetModal.displayName = 'CreateSheetModal'
CreateSheetModal.propTypes = {
  initialValues: React.PropTypes.object,
  fieldCount: React.PropTypes.number,
  showCreateSheetModal: React.PropTypes.bool,
  hideModal: React.PropTypes.func,
  addField: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  error: React.PropTypes.string,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default CreateSheetModal
