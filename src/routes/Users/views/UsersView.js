import React from 'react'
import { UserViewModalContainer, UserListContainer,
  CreateUserModalContainer, FiltersContainer } from '../containers'
import DeleteUserModalContainer from '../containers/DeleteUserModalContainer'

import { connect } from 'react-redux'
import { selectors } from 'store/users'
import { selectors as groupSelectors } from 'store/groups'
import { selectors as viewSelectors } from '../modules/user-view'

const UsersView = ({
  users,
  groups,
  userAcitveCount,
  showFilters
}) => {
  const classes = ['col-sm-12']
  if (!showFilters) classes.push('collapsed')

  return (
    <section className='app-content' id='users-page'>
      <UserViewModalContainer />
      <DeleteUserModalContainer />
      <CreateUserModalContainer />
      <div className='row'>
        &nbsp;
      </div>

      <div className='row'>
        <div className={classes.join(' ')} id='table-with-filter'>
          <FiltersContainer />
          {' '}
          <UserListContainer />
        </div>
      </div>
    </section>
  )
}

UsersView.displayName = 'UsersView'
UsersView.propTypes = {
  users: React.PropTypes.array,
  groups: React.PropTypes.array,
  userAcitveCount: React.PropTypes.number,
  showFilters: React.PropTypes.bool
}

export default connect((state) => ({
  users: selectors.getUsers(state),
  groups: groupSelectors.getGroups(state),
  userAcitveCount: selectors.getActiveCount(state),
  showFilters: viewSelectors.showFilters(state)
}))(UsersView)
