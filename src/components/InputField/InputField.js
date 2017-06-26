import React from 'react'

const InputField = ({
  input,
  label,
  type,
  id,
  disabled,
  placeholder,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className='form-group'>
    <label htmlFor={id}>{label}</label>
    <input {...input} id={id} className='form-control input-shadow'
      placeholder={placeholder || label} type={type} disabled={disabled} />
    {touched && error && <span className='text-danger'>{error}</span>}
  </div>
)
InputField.displayName = 'InputField'
InputField.propTypes = {
  input: React.PropTypes.object.isRequired,
  label: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  id: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  type: React.PropTypes.string,
  disabled: React.PropTypes.bool
}
InputField.defaultProps = {
  type: 'text'
}

export default InputField
