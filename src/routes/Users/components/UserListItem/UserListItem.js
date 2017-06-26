import React from 'react'

const UserListItem = ({
  selectUser,
  user
}) => {
  const handleSelectUser = () => {
    selectUser(user)
  }

  return (
    <div className='user-card contact-item p-md'>
      <div className='media'>
        <div className='media-left'>
          <div className='avatar avatar-l avatar-circle'>
            <img src={user.base64Image} alt='contact image' />
          </div>
        </div>
        <div className='media-body'>
          <a href='#' data-toggle='modal' data-target='#userModal' onClick={handleSelectUser}>
            <h5 className='media-heading'>
              {user.first_name} {user.last_name} { (user.is_disabled) ? '(Disabled)' : '' }
            </h5>
          </a>
          <small className='media-meta'>{user.user_level_name}</small>
        </div>
      </div>
      <div className='contact-item-actions'>
        <a href='#' className='btn btn-default' onClick={handleSelectUser}>
          <i className='zmdi zmdi-account' />
        </a>
      </div>
    </div>
  )
}

UserListItem.displayName = 'UserListItem'
UserListItem.propTypes = {
  selectUser: React.PropTypes.func,
  user: React.PropTypes.object
}

export default UserListItem
