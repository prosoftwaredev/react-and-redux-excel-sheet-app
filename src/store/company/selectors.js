import { NAME } from './constants'
import { createSelector } from 'reselect'

export const getCompany = createSelector(
  state => state[NAME],
  company => company
)
