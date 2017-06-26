import React from 'react'
// import UserListItem from '../UserListItem'

import { withState } from 'recompose'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import onClickOutside from 'react-onclickoutside'
import createReactClass from 'create-react-class'

const imageFormatter = (cell, row, selectUser) => {
  return (
    <div className='avatar avatar-top-bar avatar-circle' onClick={selectUser(row)}> { cell &&
      <img src={cell} className='img-responsive' alt='avatar' />
      }
    </div>
  )
}

const getCaret = (direction) => {
  if (direction === 'asc') {
    return (
      <div className='sort-icon asc' />
    )
  }
  if (direction === 'desc') {
    return (
      <div className='sort-icon desc' />
    )
  }
  return (
    <div className='sort-icon both' />
  )
}

const actionFormatter = (cell, row, funcs) => {
  return (
    <UserMenu selectUser={funcs.selectUser(row)} deleteUser={funcs.deleteUser(row)} />
  )
}

const columnFormatter = (cell, row, selectUser) => {
  return (
    <div onClick={selectUser(row)}>{cell}</div>
  )
}

const enhance = withState('menuOpen', 'toggleMenu', false)

const UserMenuContent = enhance(({
  menuOpen,
  toggleMenu,
  toggle,
  isOpen,
  selectUser,
  deleteUser
}) => {
  if (menuOpen !== isOpen) {
    toggleMenu(isOpen)
    menuOpen = isOpen
  }
  let classes = ['btn-group', 'table-actions']
  if (menuOpen) classes.push('open')

  return (
    <div
      className={classes.join(' ')}
      onClick={() => toggle()}
    >
      <a type='button'
        className='dropdown-toggle'
        data-toggle='dropdown'
        aria-expanded={menuOpen}>
        <i className='fa fa-ellipsis-v' />
      </a>
      <ul className='dropdown-menu pull-right' role='menu'>
        <li>
          <a href='javascript:void(0)' onClick={selectUser}>
            <i className='m-r-md fa fa-pencil' /> Edit
          </a>
        </li>
        <li>
          <a href='javascript:void(0)' onClick={deleteUser}>
            <i className='m-r-md fa fa-trash-o' />Delete
          </a>
        </li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-key' />Reset Password</a></li>
      </ul>
    </div>
  )
})

const OutsideClickUserMenu = createReactClass({
  getInitialState () {
    return {
      isOpen: false
    }
  },
  handleClickOutside () {
    this.setState({ isOpen: false })
  },
  toggle () {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen }
    })
  },
  render () {
    return (
      <UserMenuContent toggle={this.toggle} isOpen={this.state.isOpen} {...this.props} />
    )
  }
})

const UserMenu = onClickOutside(OutsideClickUserMenu)

const UserList = ({
  users,
  createUser,
  selectUser,
  deleteUser,
  ...restProps
}) => {
  let funcs = {
    selectUser: selectUser,
    deleteUser: deleteUser
  }
  return (
    <div className='widget table-widget'>
      <header className='widget-header'>
        <h4 className='widget-title'>
          Users <span onClick={createUser}><i className='fa fa-plus' /></span>
        </h4>
      </header>
      <hr className='widget-separator' />
      <div className='widget-body'>
        <div className='table-responsive'>
          <div style={{
            position: 'relative',
            clear: 'both',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <div style={{
              overflowX: 'auto',
              overflowY: 'auto',
              height: '100%'
            }}>
              <BootstrapTable
                data={users}
                hover
                striped
                multiColumnSort={8}
                containerClass='fixed-table-container'
                search
                multiColumnSearch
                >
                <TableHeaderColumn
                  dataField='base64Image'
                  dataFormat={imageFormatter}
                  formatExtraData={selectUser}
                  columnClassName='column-image-profile'
                  width='72' />
                <TableHeaderColumn
                  dataField='first_name'
                  caretRender={getCaret}
                  dataFormat={columnFormatter}
                  formatExtraData={selectUser}
                  dataSort>
                  First Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField='last_name'
                  caretRender={getCaret}
                  dataFormat={columnFormatter}
                  formatExtraData={selectUser}
                  dataSort>
                  Last Name
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField='email_address'
                  isKey
                  caretRender={getCaret}
                  dataFormat={columnFormatter}
                  formatExtraData={selectUser}
                  dataSort>
                  Email
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField=''
                  dataFormat={actionFormatter}
                  formatExtraData={funcs}
                  tdStyle={{ overflow: 'inherit' }}
                  columnClassName='text-right'
                  width='40' />
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

UserList.displayName = 'UserList'
UserList.propTypes = {
  users: React.PropTypes.array,
  createUser: React.PropTypes.func,
  selectUser: React.PropTypes.func,
  deleteUser: React.PropTypes.func
}

export default UserList
