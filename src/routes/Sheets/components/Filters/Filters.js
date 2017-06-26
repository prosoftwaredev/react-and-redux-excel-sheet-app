import React from 'react'
// import uuid from 'uuid/v1'

const Filters = ({
  toggleFilters
}) => {
  return (
    <div className='filter-sidebar'>
      <div className='widget'>
        <header className='widget-header'>
          <a id='toggle-filter-show' onClick={toggleFilters}>
            <i className='fa fa-filter' />
          </a>
          <h4 className='widget-title'>Filters</h4>
        </header>
        <hr className='widget-separator' />
        <div className='widget-body'>
          <div>
            <h4 data-toggle='collapse' data-target='#group-1'>
              <i className='fa fa-fw fa-caret-down parent-expanded' />
              <i className='fa fa-fw fa-caret-right parent-collapsed' />
              Fields
            </h4>
            <div id='group-1' className='list-group collapse in'>
              <a className='list-group-item' href='#'>
                <h4 data-toggle='collapse' data-target='#group-2'>
                  <i className='fa fa-fw fa-caret-down parent-expanded' />
                  <i className='fa fa-fw fa-caret-right parent-collapsed' />
                  Country
                </h4>
                <div id='group-2'
                  className='list-group collapse in'
                  style={{
                    marginLeft: '20px'
                  }}
                >
                  <a className='list-group-item' href='#'>
                    Brazil (<span>2</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    USA (<span>1</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    Spain (<span>1</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    Italy (<span>1</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    Argentina (<span>1</span>)
                  </a>
                </div>
              </a>
              <a className='list-group-item' href='#'>
                <h4 data-toggle='collapse' data-target='#group-3'>
                  <i className='fa fa-fw fa-caret-down parent-expanded' />
                  <i className='fa fa-fw fa-caret-right parent-collapsed' />
                  State
                </h4>
                <div id='group-3'
                  className='list-group collapse in'
                  style={{
                    marginLeft: '20px'
                  }}
                >
                  <a className='list-group-item' href='#'>
                    Value 2 (<span>123</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    Value 3 (<span>123</span>)
                  </a>
                  <a className='list-group-item' href='#'>
                    Value 4 (<span>123</span>)
                  </a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Filters.displayName = 'Filters'
Filters.propTypes = {
  toggleFilters: React.PropTypes.func
}

export default Filters
