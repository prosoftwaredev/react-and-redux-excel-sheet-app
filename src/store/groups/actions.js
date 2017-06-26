import t from './actionTypes.js'
import { getAllGroups, getGroup } from 'modules/api'

export const loadGroupList = (list) => {
  return {
    type: t.LOAD_GROUP_LIST,
    payload: list
  }
}

export const addGroup = (group) => {
  return {
    type: t.ADD_GROUP,
    payload: group
  }
}

export const updateGroup = (group) => {
  return {
    type: t.UPDATE_GROUP,
    payload: group
  }
}

export const deleteGroup = (group) => {
  return {
    type: t.DELETE_GROUP,
    payload: group
  }
}

export const getDetailGrops = (groups) => {
  return (dispatch, getState) => {
    groups.map((group) => {
      getGroup(group.id).then((res) => {
        dispatch(updateGroup(res.data))
      })
    })
  }
}

export const getGroupList = () => {
  return (dispatch, getState) => {
    getAllGroups().then((res) => {
      let groups = res.data
      dispatch(loadGroupList(groups))
      dispatch(getDetailGrops(groups))
    })
  }
}

export const removeUserFromGroup = ({ userId, groupId }) => {
  return {
    type: t.REMOVE_USER_FROM_GROUP,
    payload: { userId, groupId }
  }
}

export const removeUserFromAllGroups = (user) => {
  return {
    type: t.REMOVE_USER_FROM_ALL_GROUPS,
    payload: user
  }
}

export const addUserToGroups = ({ user, userGroupIds }) => {
  return {
    type:t.ADD_USER_TO_GROUPS,
    payload: { user, userGroupIds }
  }
}
