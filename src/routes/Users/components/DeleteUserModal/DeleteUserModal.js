import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

const DeleteUserModal = ({
  initialValues,
  showDeleteModal,
  hideDeleteModal,
  handleSubmit,

  deleteUser,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,

  ...restProps
}) => {
  return (
    <Modal
      show={showDeleteModal}
      aria-labelledby='contained-modal-title'
      role='dialog'
      >
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <button type='button' className='close' onClick={hideDeleteModal} aria-label='Close'>
            <span aria-hidden='true'>&times;</span>
          </button>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Do you really want to delete this user?</h5>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-default' onClick={hideDeleteModal}>Cancel</button>
          <button type='submit' className='btn btn-danger' disabled={submitting}>
            {submitting ? 'Deleting...' : (submitSucceeded ? 'Deleted!' : 'Delete')}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

DeleteUserModal.displayName = 'UserViewModal'
DeleteUserModal.propTypes = {
  initialValues: React.PropTypes.object,
  showDeleteModal: React.PropTypes.bool,
  hideDeleteModal: React.PropTypes.func,
  handleSubmit: React.PropTypes.func,
  deleteUser: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

DeleteUserModal.defaultProps = {
  initialValues: {
    first_name: '',
    last_name: ''
  }
}

export default DeleteUserModal
