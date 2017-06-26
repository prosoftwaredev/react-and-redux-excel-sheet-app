import { createReducer } from 'modules/redux-utils'
import t from './actionTypes'

// initialState
const initialState = {
  groups: []
}

export default createReducer(initialState, {
  [t.LOAD_GROUP_LIST]: (state, payload) => {
    return Object.assign({}, state, { groups: payload })
  },
  [t.ADD_GROUP]: (state, payload) => {
    let groups = state.groups.map((group) => group)
    groups.push(payload)
    return Object.assign({}, state, { groups: groups })
  },
  [t.DELETE_GROUP]: (state, payload) => {
    let groups = state.groups.reduce((prev, curr) => {
      if (curr.id === payload) {
        return prev
      }
      prev.push(curr)
      return prev
    }, [])
    return Object.assign({}, state, { groups })
  },
  [t.UPDATE_GROUP]: (state, payload) => {
    return Object.assign({}, state, { groups: state.groups.map((group) => {
      if (group.id === payload.id) {
        return Object.assign({}, group, payload)
      }
      return group
    }) })
  },
  [t.REMOVE_USER_FROM_GROUP]: (state, { userId, groupId }) => {
    return Object.assign({}, state, { groups: state.groups.map((group) => {
      if (groupId === group.id && group.members) {
        let members = group.members.reduce((prev, curr) => {
          console.log(curr.id, userId)
          if (curr.id === userId) {
            return prev
          }
          prev.push(curr)
          return prev
        }, [])
        group.members = members
      }
      return group
    }) })
  },
  [t.ADD_USER_TO_GROUPS]: (state, { user, userGroupIds }) => {
    let groups = state.groups.map((group) => {
      if (userGroupIds.indexOf(group.id) !== -1) {
        group.members.push(user)
      }
      return group
    })

    return Object.assign({}, state, { groups: groups })
  },
  [t.REMOVE_USER_FROM_ALL_GROUPS]: (state, payload) => {
    let groups = state.groups.map((group) => {
      console.log(group.members)

      let members = group.members.reduce((prev, curr) => {
        console.log(payload.email_address, curr.email_address)
        if (payload.email_address === curr.email_address) {
          return prev
        }
        prev.push(curr)
        return prev
      }, [])
      group.members = members
      console.log(members)
      return group
    })

    return Object.assign({}, state, { groups: groups })
  }
})
