import t from './actionTypes.js'
import { getSheet, getAllSheets, removeField } from 'modules/api'

export const loadSheet = (sheet) => ({
  type: t.LOAD_SHEET,
  payload: sheet
})

export const setCurrentSheet = (id) => ({
  type: t.SET_CURRENT_SHEET,
  payload: id
})

export const updateSheet = (sheet) => ({
  type: t.UPDATE_SHEET,
  payload: sheet
})

export const toggleRecordAttachments = (recordId) => ({
  type: t.TOGGLE_RECORD_ATTACHMENTS,
  payload: recordId
})

export const addSheet = (sheet) => ({
  type: t.ADD_SHEET,
  payload: sheet
})

export const requestAllSheets = () => {
  return dispatch => {
    const req = getAllSheets()
    req
      .then((res) => {
        if (res && res.data && res.data.length) {
          res.data.forEach(sheet => {
            dispatch(loadSheet(sheet))
          })
        }
      })
      .catch((e) => {
        console.log('error getting sheets: ', e)
      })

    return req
  }
}

export const requestSheet = (id) => {
  return (dispatch) => {
    dispatch(setCurrentSheet(id))
    getSheet(id)
      .then((res) => {
        dispatch(loadSheet(res.data))
      })
      .catch((e) => {
        console.log('error getting sheet: ', e)
      })
  }
}

export const showSheetModal = () => {
  return {
    type: t.SHOW_CREATE_SHEET_MODAL
  }
}

export const hideSheetModal = () => {
  return {
    type: t.HIDE_CREATE_SHEET_MODAL
  }
}

export const createField = (data) => ({
  type: t.CREATE_FIELD,
  payload: data
})

export const updateField = (data) => ({
  type: t.UPDATE_FIELD,
  payload: data
})

export const deleteFieldFromState = (data) => ({
  type: t.DELETE_FIELD,
  payload: data
})

export const deleteField = ({ id, sheetId }) => {
  return (dispatch) => {
    removeField({ id: id })
      .then(() => {
        dispatch(requestSheet(sheetId))
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

export const addFieldToNewSheet = () => ({
  type: t.ADD_FIELD_NEW_SHEET
})

export const resetFieldCount = () => ({
  type: t.RESET_FIELD_COUNT
})
