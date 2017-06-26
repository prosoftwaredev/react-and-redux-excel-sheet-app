import React from 'react'
// import { Link } from 'react-router'
import LogoPNG from 'images/logo.png'
import LoggedInUserContainer from '../../containers/LoggedInUserContainer'

const NavBar = () => {
  return (
    <nav id='app-navbar' className='app-navbar bg-primary in grey'>
      <div className='container'>
        <div id='navbar-header' className='pull-left'>
          <div>
            <a href='javascript:void(0)' id='app-brand' className='app-brand text-white'>
              <img src={LogoPNG} alt='LawMap' />
            </a>
          </div>
        </div>
        <div>
          <LoggedInUserContainer />
        </div>
        {/* NOT USED
          <div id='navbar-search' className='navbar-search'>
            <form action='#'>
              <span className='search-icon'><i className='fa fa-search' /></span>
              <input className='search-field' type='search' placeholder='search...' />
            </form>
            <button id='search-close' className='search-close'>
              <i className='fa fa-close' />
            </button>
          </div>
        */}
      </div>
    </nav>
  )
}

export default NavBar
