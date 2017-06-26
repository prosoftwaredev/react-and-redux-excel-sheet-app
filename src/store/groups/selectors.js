import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getGroups = createSelector(
  state => state[NAME],
  store => store.groups
)
