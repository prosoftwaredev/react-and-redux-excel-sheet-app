import t from './actionTypes.js'

export const toggleUserMenu = (isOpen) => ({
  type: t.TOGGLE_USER_MENU,
  payload: isOpen
})

export const toggleSheetList = (isOpen) => ({
  type: t.TOGGLE_SHEET_LIST,
  payload: isOpen
})
