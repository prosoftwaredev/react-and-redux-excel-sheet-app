import React from 'react'

const AddRecordButton = ({
  showCreateRecordModal
}) => {
  return (
    <button
      onClick={showCreateRecordModal}
      className='btn btn-blue-dark btn-md btn-block'
      type='button'
    >
      New Record
    </button>
  )
}

AddRecordButton.displayName = 'AddRecordButton'
AddRecordButton.propTypes = {
  showCreateRecordModal: React.PropTypes.func
}

export default AddRecordButton
