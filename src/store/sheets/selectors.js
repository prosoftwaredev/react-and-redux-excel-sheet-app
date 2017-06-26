import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getSheets = createSelector(
  state => state[NAME],
  sheets => sheets.sheets
)

export const getSheetList = createSelector(
  getSheets,
  (sheets) => {
    return Object.values(sheets)
  }
)

export const getSheetById = createSelector(
  getSheets,
  sheets => id => sheets[id] || {}
)

export const getCurrentSheet = createSelector(
  [
    getSheets,
    state => state[NAME].currentSheet
  ],
  (sheets, currentSheet) => sheets[currentSheet] || {}
)

export const getExpandedRecordsList = createSelector(
  state => state[NAME],
  sheets => sheets.expandedRecords
)

export const showCreateModal = createSelector(
  state => state[NAME],
  sheets => sheets.showCreateSheetModal
)

export const getFieldCount = createSelector(
  state => state[NAME],
  sheets => sheets.newSheetCount
)
