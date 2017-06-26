import React from 'react'

export const DefaultLayout = ({ children }) => (
  <div className='simple-page' style={{ height: '100%' }}>
    <div className='simple-page-wrap'>
      {children}
    </div>
  </div>
)

DefaultLayout.displayName = 'DefaultLayout'
DefaultLayout.propTypes = {
  children : React.PropTypes.array
}

export default DefaultLayout
