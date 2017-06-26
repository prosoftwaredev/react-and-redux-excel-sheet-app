import React from 'react'

const CheckboxField = ({
  input,
  id,
  type,
  label
}) => {
  return (
    <div className='checkbox checkbox-primary'>
      <input {...input} id={`${id}`} type={`${type}`} />
      <label htmlFor={`${id}`} >{`${label}`}</label>
    </div>
  )
}

CheckboxField.displayName = 'CheckboxField'

CheckboxField.propTypes = {
  id: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  label: React.PropTypes.string.isRequired,
  input: React.PropTypes.object.isRequired
}

CheckboxField.defaultProps = {
  type: 'checkbox'
}

export default CheckboxField
