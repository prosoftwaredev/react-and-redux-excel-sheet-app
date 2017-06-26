import React from 'react'
import { Field } from 'redux-form'

const FileInput = ({
  input: {
    onChange,
    value: {
      name
    }
  },
  ...props
}) => {
  const classes = (name) ? '' : 'btn btn-primary'

  return (
    <div>
      <label htmlFor='profile_image' style={{ cursor: 'pointer' }} className={classes}>
        { name ? `Selected ${name}` : 'Change image' }
      </label>
      <input
        id='profile_image'
        type='file'
        name='profile_image'
        onChange={function (e) {
          onChange(e.target.files[0])
        }}
        style={{ display: 'none' }}
        />
    </div>
  )
}
FileInput.propTypes = {
  input: React.PropTypes.object
}

const ImageUpload = ({
  initialValues,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,

  ...restProps
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label='Profile Image'
        id='profile_image'
        name='profile_image'
        component={FileInput}
        />
      { !pristine && <button type='submit' className='btn btn-primary' disabled={pristine || submitting}>
        {submitting ? 'Uploading...' : 'Upload'}
      </button> }
      {submitFailed && <span className='text-danger'>Upload failed</span>}
      {submitSucceeded && <span className='text-success'>Success!</span>}
    </form>
  )
}

ImageUpload.displayName = 'ImageUpload'
ImageUpload.propTypes = {
  initialValues: React.PropTypes.object,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default ImageUpload
