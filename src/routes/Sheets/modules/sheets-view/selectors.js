import { NAME } from './constants'
import { createSelector } from 'reselect'
import { selectors as sheetSelectors } from 'store/sheets'

export const showModal = createSelector(
  state => state[NAME],
  view => view.showModal
)

export const showFieldModal = createSelector(
  state => state[NAME],
  view => view.showFieldModal
)

export const showFilters = createSelector(
  state => state[NAME],
  view => view.showFilters
)

export const getCurrentRecord = createSelector(
  state => state[NAME],
  view => view.currentRecord
)

export const getCurrentField = createSelector(
  state => state[NAME],
  view => view.currentField
)

export const getSortField = createSelector(
  state => state[NAME],
  view => view.sortField
)

export const getSearchText = createSelector(
  state => state[NAME],
  view => view.searchText
)

export const getSortedRecords = createSelector(
  [
    sheetSelectors.getCurrentSheet,
    getSortField,
    getSearchText,
    sheetSelectors.getExpandedRecordsList
  ],
  (sheet, sortField, searchText, expandedRecordList) => {
    const fieldNumbers = (sheet && sheet.fields) ? sheet.fields.map(field => field.field_number) : []
    const sortFieldNumber = (sortField || { field_number: 1 }).field_number

    const records = (sheet.records || [])
    records.sort((a, b) => {
      const aField = a[sortFieldNumber]
      const bField = b[sortFieldNumber]
      if (aField > bField) return 1
      if (aField < bField) return -1
      return 0
    })

    return records.reduce((prev, curr, index) => {
      let addRecord = false
      let attachment = false
      if (searchText && searchText.length) {
        fieldNumbers.forEach(num => {
          const value = curr[num]
          if (value && !addRecord && value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) addRecord = true
        })
      } else {
        addRecord = true
        if (expandedRecordList.indexOf(curr.id) !== -1) {
          attachment = {
            sheet_record_id: curr.id,
            type: 'attachment'
          }
        }
      }

      if (addRecord) prev.push(curr)
      if (attachment) prev.push(attachment)
      return prev
    }, [])
  }
)
