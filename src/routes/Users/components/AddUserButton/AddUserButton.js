import React from 'react'

const AddUserButton = ({
  showCreateUserModal
}) => {
  return (
    <button
      onClick={showCreateUserModal}
      className='btn btn-blue-dark btn-block'
      id='btn-new-record'
      type='button'
      data-toggle='modal'
      data-target='#myModal'>
      New User
    </button>
  )
}

AddUserButton.displayName = 'AddUserButton'
AddUserButton.propTypes = {
  showCreateUserModal: React.PropTypes.func
}

export default AddUserButton
