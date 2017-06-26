import React from 'react'
import userTypes from 'store/users/user-types'
import uuid from 'uuid/v1'

const UserLevelSelect = ({
  input,
  id,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className='form-group'>
    <label htmlFor='userLevel'>User Level</label>
    <select id='userLevel'
      className='form-control'
      name='user_level'
      {...input}
      >
      <option value=''>Select</option>
      {userTypes.map((type) => (
        <option key={uuid()} value={type.level}>{type.name}</option>
      ))}
    </select>
    {touched && error && <span className='text-danger'>{error}</span>}
  </div>
)
UserLevelSelect.displayName = 'UserLevelSelect'
UserLevelSelect.propTypes = {
  input: React.PropTypes.object.isRequired,
  id: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired
}
UserLevelSelect.defaultProps = {
  type: 'select'
}

export default UserLevelSelect
