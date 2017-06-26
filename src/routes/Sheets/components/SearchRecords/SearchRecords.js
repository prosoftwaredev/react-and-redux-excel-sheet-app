import React from 'react'

const SearchRecords = ({
  onSearch
}) => {
  return (
    <div className='input-group'>
      <input type='text' onKeyUp={onSearch} className='form-control' placeholder='Search for...' />
      <span className='input-group-btn'>
        <button className='btn btn-default' type='button'>
          <i className='fa fa-search' />
        </button>
      </span>
    </div>
  )
}

SearchRecords.displayName = 'SearchRecords'
SearchRecords.propTypes = {
  onSearch: React.PropTypes.func
}

export default SearchRecords
