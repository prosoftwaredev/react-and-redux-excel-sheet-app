import { connect } from 'react-redux'

import { actions as sheetActions, selectors as sheetSelectors } from 'store/sheets'
import { actions as sheetViewActions, selectors as sheetViewSelectors } from '../modules/sheets-view'
import { updateRecord } from 'modules/api'

import { Sheet } from '../components'

export default connect((state) => {
  const sheet = sheetSelectors.getCurrentSheet(state) || {}
  const fields = (sheet.fields || []).sort((a, b) => {
    const aCreate = new Date(a.created_date_time)
    const bCreate = new Date(b.created_date_time)
    if (a.field_number > b.field_number) return 1
    if (a.field_number < b.field_number) return -1
    if (aCreate.getTime() > bCreate.getTime()) return 1
    if (aCreate.getTime() < bCreate.getTime()) return -1
    return 0
  })

  return {
    sheetTitle: sheet.title,
    fields,
    records: sheetViewSelectors.getSortedRecords(state),
    showFilters: sheetViewSelectors.showFilters(state),
    expandedRecordsList: sheetSelectors.getExpandedRecordsList(state)
  }
}, (dispatch) => ({
  headerClick: (field) => (e) => {
    event.preventDefault()
    dispatch(sheetViewActions.sortByField(field))
  },
  saveRecord: (record) => (e) => {
    updateRecord(record)
      .then((res) => {
        console.log(res)
      })
  },
  editRecord: (record) => (event) => {
    event.preventDefault()
    dispatch(sheetViewActions.showEditRecordModal(record))
  },
  insertRecord: (e) => {
    dispatch(sheetViewActions.showCreateRecordModal())
  },
  editField: (field) => (event) => {
    event.preventDefault()
    dispatch(sheetViewActions.showFieldModal(field))
  },
  deleteField: (id, sheetId) => (event) => {
    dispatch(sheetActions.deleteField({ id, sheetId }))
  },
  toggleRecord: (recordId) => (event) => {
    event.preventDefault()
    dispatch(sheetActions.toggleRecordAttachments(recordId))
  }
}))(Sheet)
