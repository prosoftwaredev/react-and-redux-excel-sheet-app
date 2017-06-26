import React from 'react'
import { Field } from 'redux-form'
import { COMPANY_IMAGE } from 'modules/app-config'

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
      <label htmlFor='logo_image' style={{ cursor: 'pointer' }} className={classes}>
        { name ? `Selected ${name}` : 'Change company logo' }
      </label>
      <input
        id='logo_image'
        type='file'
        name='logo_image'
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
  base64Image,
  handleSubmit,
  pristine,
  submitting,
  submitFailed,
  submitSucceeded,

  ...restProps
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col-md-2'>
          <div className='avatar avatar-xl avatar-circle'>
            <img className='img-responsive' src={base64Image || COMPANY_IMAGE} alt='avatar' />
          </div>
        </div>
        <div className='col-md-10'>
          <Field
            label='Company Image'
            id='logo_image'
            name='logo_image'
            component={FileInput}
            />
          { !pristine && <button type='submit' className='btn btn-primary' disabled={pristine || submitting}>
            {submitting ? 'Uploading...' : 'Upload'}
          </button> }
          {submitFailed && <span className='text-danger'>Upload failed</span>}
          {submitSucceeded && <span className='text-success'>Success!</span>}
        </div>
      </div>
    </form>
  )
}

ImageUpload.displayName = 'ImageUpload'
ImageUpload.propTypes = {
  base64Image: React.PropTypes.string,
  handleSubmit: React.PropTypes.func,
  pristine: React.PropTypes.bool,
  submitting: React.PropTypes.bool,
  submitFailed: React.PropTypes.bool,
  submitSucceeded: React.PropTypes.bool
}

export default ImageUpload
