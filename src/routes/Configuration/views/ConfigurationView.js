import React from 'react'
import { ChangeImageContainer, ConfigurationFormContainer } from '../containers'

export default () => {
  return (
    <div className='container'>
      <div className='wrap'>
        <section className='app-content'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='widget'>
                <header className='widget-header'>
                  <h4 className='widget-title'>Company Branding</h4>
                </header>
                <hr className='widget-separator' />
                <div className='widget-body'>
                  <div className='m-b-lg'>
                    <small>
                      Edit brand details on your dashboard.
                    </small>
                  </div>
                  <ConfigurationFormContainer />
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='widget'>
                <div className='widget-body'>
                  <ChangeImageContainer />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
