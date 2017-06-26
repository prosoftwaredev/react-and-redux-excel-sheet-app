import React from 'react'

import AddUserButtonContainer from '../../containers/AddUserButtonContainer'
import { AddGroupContainer } from 'store/groups/containers'
import InlineEdit from 'react-edit-inline'
import { updateGroup, deleteGroup } from 'modules/api'

const modifyGroup = (group, updateGroupState) => {
  updateGroup(group).then((res) => {
    updateGroupState(group)
  }, (err) => {
    console.log(err)
  })
}

const removeGroup = (groupId, deleteGroupState) => (e) => {
  deleteGroup({ id: groupId }).then((res) => {
    deleteGroupState(groupId)
  }, (err) => {
    console.log(err)
  })
}

const Filters = ({
  groups,
  users,
  userActiveCount,
  toggleFilters,
  updateGroupState,
  deleteGroupState
}) => {
  return (
    <div className='filter-sidebar'>
      <div className='widget'>
        <header className='widget-header'>
          <a id='toggle-filter-show' onClick={toggleFilters}>
            <i className='fa fa-user' />
          </a>
          <h4 className='widget-title'>Groups</h4>
        </header>
        <hr className='widget-separator' />
        <div className='widget-body'>
          <div className='sidebar-header-options'>
            <AddUserButtonContainer />
            <div className='list-group'>
              <a href='javascript:void(0)' className='list-group-item'>
                <i className='fa fa-users' />
                {' '}
                <span>All Users</span>
                <span className='pull-right'>{userActiveCount}</span>
              </a>
            </div>
          </div>
          <hr className='separator' />
          <div className='list-group'>
            {
              groups.map((group) => {
                return (
                  <a href='javascript:void(0)' className='list-group-item'>
                    <div className='item-data'>
                      <InlineEdit
                        className='label-text'
                        text={group.name}
                        paramName='groupName'
                        style={{
                          width: 'calc(100% - 25px)',
                          display: 'inline-block',
                          margin: 0,
                          padding: 0,
                          fontSize: 15,
                          outline: 0,
                          border: 0
                        }}
                        change={(changedGroup) => {
                          group.name = changedGroup.groupName
                          modifyGroup(group, updateGroupState)
                        }}
                        />
                      <span className='pull-right'>
                        <span className='number'>{ group.members && group.members.length}</span>
                        <span className='delete-group' onClick={removeGroup(group.id, deleteGroupState)}>
                          <i className='fa fa-minus' />
                        </span>
                      </span>
                    </div>
                  </a>
                )
              })
            }
            <hr className='separator' />
            <a href='javascript:void(0)' className='list-group-item'>
              <div className='item-data'>
                <AddGroupContainer />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Filters.displayName = 'Filters'
Filters.propTypes = {
  groups: React.PropTypes.array.isRequired,
  users: React.PropTypes.array.isRequired,
  userActiveCount: React.PropTypes.number.isRequired,
  toggleFilters: React.PropTypes.func.isRequired,
  updateGroupState: React.PropTypes.func.isRequired,
  deleteGroupState: React.PropTypes.func.isRequired
}

export default Filters
