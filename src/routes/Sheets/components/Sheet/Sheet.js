import React from 'react'
import uuid from 'uuid/v1'
import { withState } from 'recompose'
import createReactClass from 'create-react-class'
import onClickOutside from 'react-onclickoutside'
import FiltersContainer from '../../containers/FiltersContainer'
import InlineEdit from 'react-edit-inline'
const enhance = withState('menuOpen', 'toggleMenu', false)

var globalRecords = []

const RecordMenuContent = enhance(({
  menuOpen,
  toggle,
  toggleMenu,
  isOpen,
  editRecord,
  insertRecord,
  saveRecord,
  index
}) => {
  if (menuOpen !== isOpen) {
    toggleMenu(isOpen)
    menuOpen = isOpen
  }
  let classes = ['btn-group', 'table-actions']
  if (menuOpen) classes.push('open')
  return (
    <div
      className={classes.join(' ')}
      onClick={() => toggle()}
    >
      <a type='button'
        className='dropdown-toggle'
        data-toggle='dropdown'
        aria-expanded={menuOpen}
      >
        <i className='fa fa-ellipsis-v' />
      </a>
      <ul className='dropdown-menu pull-left' role='menu'>
        <li>
          <a href='javascript:void(0)' onClick={editRecord}>
            <i className='m-r-md fa fa-pencil' />Edit
          </a>
        </li>
        <li><a href='javascript:void(0)' onClick={insertRecord}><i className='m-r-md fa fa-floppy-o' />Insert</a></li>
        <li>
          <a href='javascript:void(0)' onClick={saveRecord(globalRecords[index])}>
            <i className='m-r-md fa fa-floppy-o' />Save
          </a>
        </li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-download' />Export</a></li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-thumb-tack' />Pin</a></li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-comment' />Comment</a></li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-share-alt' />Share</a></li>
      </ul>
    </div>
  )
})

const FieldMenuContent = enhance(({
  menuOpen,
  toggle,
  toggleMenu,
  isOpen,
  key,
  editField,
  deleteField,
  field
}) => {
  if (menuOpen !== isOpen) {
    toggleMenu(isOpen)
    menuOpen = isOpen
  }
  let classes = []
  if (menuOpen) classes.push('open')
  return (
    <th
      className={classes.join(' ')}
      onClick={() => toggle()}
      style={{ position: 'relative' }}
    >
      <a type='button'
        className='dropdown-toggle'
        data-toggle='dropdown'
        aria-expanded={menuOpen}
      >
        {field.name}
      </a>
      <ul className='dropdown-menu' role='menu'>
        <li>
          <a href='javascript:void(0)' onClick={editField(field)}>
            <i className='m-r-md fa fa-pencil' />Edit
          </a>
        </li>
        <li>
          <a href='javascript:void(0)' onClick={deleteField(field.id, field.sheet_id)}>
            <i className='m-r-md fa fa-pencil' />Delete
          </a>
        </li>
        <li><a href='javascript:void(0)'><i className='m-r-md fa fa-floppy-o' />Sort</a></li>
      </ul>
    </th>
  )
})

const OutsideClickRecordMenu = createReactClass({
  getInitialState () {
    return {
      isOpen: false
    }
  },
  handleClickOutside () {
    this.setState({ isOpen: false })
  },
  toggle () {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen }
    })
  },
  render () {
    return (
      <RecordMenuContent toggle={this.toggle} isOpen={this.state.isOpen} {...this.props} />
    )
  }
})

const OutsideClickFieldMenu = createReactClass({
  getInitialState () {
    return {
      isOpen: false
    }
  },
  handleClickOutside () {
    this.setState({ isOpen: false })
  },
  toggle () {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen }
    })
  },
  render () {
    return (
      <FieldMenuContent toggle={this.toggle} isOpen={this.state.isOpen} {...this.props} />
    )
  }
})

const RecordMenu = onClickOutside(OutsideClickRecordMenu)
const FieldMenu = onClickOutside(OutsideClickFieldMenu)

const Sheet = ({
  sheetTitle,
  fields,
  records,
  editRecord,
  insertRecord,
  editField,
  saveRecord,
  deleteField,
  headerClick,
  showFilters,
  toggleRecord,
  expandedRecordsList
}) => {
  const classes = ['col-sm-12']
  if (!showFilters) classes.push('collapsed')
  globalRecords = records
  return (
    <div className='row'>
      <div className={classes.join(' ')} id='table-with-filter'>
        <FiltersContainer />
        {' '}
        <div className='widget table-widget'>
          <header className='widget-header'>
            <h4 className='widget-title'>
              {sheetTitle}
            </h4>
          </header>
          <hr className='widget-separator' />
          <div className='widget-body'>
            <div className='table-responsive'>
              <div style={{
                position: 'relative',
                clear: 'both',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}>
                <div style={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  height: '100%'
                }}>
                  <table className='table table-striped table-hover' style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>#</th>
                        { fields.map(field => (
                          <FieldMenu
                            key={uuid()}
                            field={field}
                            editField={editField}
                            deleteField={deleteField} />
                          )) }
                      </tr>
                    </thead>
                    <tbody>
                      { records.length < 1 && (
                        <tr>
                          <td colSpan={fields.length + 1}>
                            <h2 className='text-center'>No records.</h2>
                          </td>
                        </tr>
                      )}
                      { records.map((record, index) => {
                        if (record.type === 'attachment') {
                          return (
                            <tr
                              key={uuid()}
                              className='clickable column-collapse'
                              data-toggle='collapse'
                            >
                              <td />
                              <td colSpan={fields.length + 1}>
                                <i className='fa fa-file-pdf-o' style={{ color: '#0000ff' }} />
                                {' '} {`attachment-${record.sheet_record_id}.pdf`}
                              </td>
                            </tr>
                          )
                        }

                        const hasAttachments = record.id === 1 || record.id === 2 || record.id === 3
                        const collapsed = !expandedRecordsList.includes(record.id) ? 'collapsed' : ''
                        return (
                          <tr
                            key={uuid()}
                            className={`clickable column-collapse ${collapsed}`}
                            data-toggle='collapse'
                          >
                            <td>
                              {hasAttachments && <span onClick={toggleRecord(record.id)}>
                                <i className='m-r-md fa fa-caret-right' />
                                <i className='m-r-md fa fa-caret-down' />
                                </span>
                              }
                              {!hasAttachments &&
                                <RecordMenu
                                  editRecord={editRecord(record)}
                                  insertRecord={insertRecord}
                                  saveRecord={saveRecord}
                                  index={index} />
                              }
                            </td>
                            { fields.map((field, idx) => (
                              <td key={uuid()}>
                                <InlineEdit
                                  className='label-text'
                                  text={record[idx + 1]}
                                  paramName='value'
                                  change={(changeRecord) => {
                                    globalRecords[index][idx + 1] = changeRecord.value
                                  }}
                                  />
                              </td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Sheet.displayName = 'Sheet'
Sheet.propTypes = {
  sheetTitle: React.PropTypes.string,
  fields: React.PropTypes.array,
  records: React.PropTypes.array,
  editRecord: React.PropTypes.func,
  insertRecord: React.PropTypes.func,
  editField: React.PropTypes.func,
  saveRecord: React.PropTypes.func,
  deleteField: React.PropTypes.func,
  headerClick: React.PropTypes.func,
  showFilters: React.PropTypes.bool,
  toggleRecord: React.PropTypes.func,
  expandedRecordsList: React.PropTypes.array
}

export default Sheet
