import isEmail from 'validator/lib/isEmail'

export default (values) => {
  let errors = {}

  if (!values.email_address || !isEmail(values.email_address)) errors.email_address = 'Email is required'
  if (!values.first_name) errors.first_name = 'First name is required'
  if (!values.last_name) errors.last_name = 'Last name is required'
  if (!values.user_level) errors.user_level = 'User level is required'
  if (!values.user_level_name) errors.user_level_name = 'Title is required'

  return errors
}
