import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withState } from 'recompose'
import { actions } from 'store/groups'
import { createGroup } from 'modules/api'
import { connect } from 'react-redux'

const CreateGroupForm = ({
  handleSubmit,
  toggleOpen,
  isOpen
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='input-group'>
        <Field
          name='name'
          type='text'
          className='form-control'
          id='add_group'
          placeholder='Group'
          component='input' />
        <span className='input-group-addon' onClick={() => toggleOpen(isOpen => !isOpen)}>
          <i className='fa fa-minus' />
        </span>
      </div>
      <button type='submit' className='hidden'>Submit</button>
    </form>
  )
}

CreateGroupForm.displayName = 'AddGroupForm'

CreateGroupForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  toggleOpen: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.func.isRequired
}

const AddGroupForm = connect()(reduxForm({
  form: 'addgroup',
  onSubmit: (values, dispatcher, props) => {
    values.description = 'Group'
    createGroup(values).then((res) => {
      let group = res.data
      dispatcher(actions.addGroup(group))
      props.initialize()
    }, (err) => {
      console.log(err)
    })
  }
})(CreateGroupForm))

const toggleForm = withState('isOpen', 'toggleOpen', false)

const AddGroup = toggleForm(({
  isOpen,
  toggleOpen
}) => {
  if (!isOpen) {
    return (
      <span className='label-text' onClick={() => toggleOpen(isOpen => !isOpen)}>
        <i className='fa fa-plus' />
        {' '}
        Add Group
      </span>
    )
  }
  return (
    <AddGroupForm toggleOpen={toggleOpen} isOpen={isOpen} />
  )
})

AddGroup.displayName = 'AddGroup'
AddGroup.propTypes = {
  isOpen: React.PropTypes.bool,
  toggleOpen: React.PropTypes.func
}

export default AddGroup
