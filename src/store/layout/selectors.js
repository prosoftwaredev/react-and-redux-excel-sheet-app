import { NAME } from './constants'
import { createSelector } from 'reselect'

export const displayUserMenu = createSelector(
  state => state[NAME],
  layout => {
    return layout.showUserMenu
  }
)

export const displaySheetList = createSelector(
  state => state[NAME],
  layout => {
    return layout.showSheetList
  }
)
