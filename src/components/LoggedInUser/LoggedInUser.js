import React from 'react'
import { Link } from 'react-router'

import defaultUser from 'images/avatar/default-user.png'
import onClickOutside from 'react-onclickoutside'
import createReactClass from 'create-react-class'

const LoggedInUserContent = ({
  toggle,
  firstName,
  lastName,
  profileImage,
  displayUserMenu,
  toggleMenu,
  logout
}) => {
  return (
    <ul id='top-nav' className='pull-right'>
      <li className='nav-item dropdown'>
        <a href='javascript:void(0)' onClick={toggle} className='dropdown-toggle top-bar-toggle'
          data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
          <div className='avatar avatar-top-bar avatar-circle'>
            <img className='img-responsive' src={defaultUser} alt='avatar' />
          </div>
          <span>{firstName} {lastName}<i className='zmdi zmdi-caret-down' /></span>
        </a>
        <ul className='dropdown-menu animated flipInY' style={{ display: (displayUserMenu) ? 'block' : 'none' }}>
          <li onClick={toggle}>
            <a href=''>
              <i className='m-r-md fa fa-user' />
              Personal
            </a>
          </li>
          <li onClick={toggle}>
            <a href=''>
              <i className='m-r-md fa fa-list' />
              Admin
            </a>
          </li>
          <li onClick={toggle}>
            <Link to='/users'>
              <i className='m-r-md fa fa-users' />
              Users
            </Link>
          </li>
          <li onClick={toggle}>
            <a href=''>
              <i className='m-r-md fa fa-question-circle' />
              Help
            </a>
          </li>
          <li onClick={toggle}>
            <a href='javascript:void(0)' onClick={logout}>
              <i className='m-r-md fa fa-sign-out' />
              Log Out
            </a>
          </li>
        </ul>
      </li>
    </ul>
  )
}

LoggedInUserContent.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  profileImage: React.PropTypes.string,
  displayUserMenu: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  toggle: React.PropTypes.func.isRequired
}

const LoggedInUser = onClickOutside(createReactClass({
  propTypes: {
    toggleMenu: React.PropTypes.func.isRequired,
    displayUserMenu: React.PropTypes.func.isRequired
  },
  handleClickOutside () {
    this.props.toggleMenu(false)
  },
  toggle () {
    this.props.toggleMenu(!this.props.displayUserMenu)
  },
  render () {
    return (<LoggedInUserContent toggle={this.toggle} {...this.props} />)
  }
}))

export default LoggedInUser
