import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  sheets: {},
  currentSheet: 1,
  expandedRecords: [],
  showCreateSheetModal: false,
  newSheetCount: 10
}

export default createReducer(initialState, {
  [t.LOAD_SHEET]: (state, payload) => {
    if (payload.records) {
      const records = payload.records.map((record, index) => {
        if (index === 0 || index === 1 || index === 4) {
          record.attachments.push({
            name: 'application.pdf',
            description: 'pdf'
          })
        }

        return record
      })

      payload.records = records
    } else {
      payload.records = []
    }

    const sheets = Object.assign({}, state.sheets, {
      [ payload.id ] : payload
    })
    return Object.assign({}, state, { sheets })
  },

  [t.UPDATE_SHEET]: (state, payload) => {
    return Object.assign({}, state, { sheets: Object.values(state.sheets).map((sheet) => {
      if (sheet.id === payload.id) {
        return Object.assign({}, sheet, payload)
      }
      return sheet
    }) })
  },

  [t.ADD_SHEET]: (state, payload) => {
    let sheets = Object.values(state.sheets).map((sheet) => sheet)
    sheets.push(payload)
    return Object.assign({}, state, { sheets })
  },

  [t.SET_CURRENT_SHEET]: (state, payload) => {
    return Object.assign({}, state, { currentSheet: payload, expandedRecords: [] })
  },

  [t.TOGGLE_RECORD_ATTACHMENTS]: (state, payload) => {
    let expandedRecords
    if (state.expandedRecords.includes(payload)) {
      expandedRecords = state.expandedRecords.reduce((prev, curr) => {
        if (curr === payload) {
          return prev
        } else {
          prev.push(curr)
          return prev
        }
      }, [])
    } else {
      expandedRecords = state.expandedRecords.map(item => item)
      expandedRecords.push(payload)
    }

    return Object.assign({}, state, { expandedRecords })
  },

  [t.SHOW_CREATE_SHEET_MODAL]: (state, playload) => {
    return Object.assign({}, state, {
      showCreateSheetModal: true
    })
  },

  [t.HIDE_CREATE_SHEET_MODAL]: (state, playload) => {
    return Object.assign({}, state, {
      showCreateSheetModal: false
    })
  },

  [t.CREATE_FIELD]: (state, payload) => {
    const sheets = Object.values(state.sheets).map((sheet) => {
      if (sheet.id === payload.sheet_id) {
        sheet.fields.push(payload)
      }
      return sheet
    })
    return Object.assign({}, state, { sheets: sheets })
  },

  [t.UPDATE_FIELD]: (state, payload) => {
    var sheets = state.sheets
    var sheet = sheets[state.currentSheet]
    var fields = sheet.fields.map(field => {
      if (field.id === payload.id) {
        return payload
      }
      return field
    })
    sheets[state.currentSheet] = Object.assign({}, sheet, { fields: fields })
    return Object.assign({}, state, { sheets: sheets })
  },

  [t.DELETE_FIELD]: (state, payload) => {
    var sheets = state.sheets
    var sheet = sheets[state.currentSheet]
    var records = sheet.records
    const fields = sheet.fields.reduce((prev, curr, index) => {
      if (curr.id === payload) {
        records = records.map(record => {
          var values = Object.values(record).splice(index, 1)
          var newRecord = values.reduce((prev, curr, i) => {
            prev[i + 1] = curr
            return prev
          }, {})
          return newRecord
        })
        return prev
      } else {
        prev.push(curr)
        return prev
      }
    }, [])
    sheets[state.currentSheet] = Object.assign({}, sheet, { fields: fields, records: records })
    return Object.assign({}, state, { sheets: sheets })
  },

  [t.ADD_FIELD_NEW_SHEET]: (state, payload) => {
    var newSheetCount = state.newSheetCount
    newSheetCount += 1
    return Object.assign({}, state, { newSheetCount: newSheetCount })
  },

  [t.RESET_FIELD_COUNT]: (state, playload) => {
    return Object.assign({}, state, { newSheetCount: 10 })
  }
})
