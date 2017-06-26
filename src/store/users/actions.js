import t from './actionTypes.js'
import { getUsers, getUserProfile, getUserProfileImage, removeUser, getUserInfo, postProfileImage } from 'modules/api'
import { rawImageToBase64 } from 'modules/utils'

export const loadUserList = (users) => {
  return {
    type: t.LOAD_USER_LIST,
    payload: users
  }
}

export const updateUser = (user) => {
  return {
    type: t.UPDATE_USER,
    payload: user
  }
}

export const addUser = (user) => {
  return {
    type: t.ADD_USER,
    payload: user
  }
}

export const updateUserProfileImage = ({ userEmailAddress, imageUrl }) => {
  return {
    type: t.UPDATE_USER_PROFILEIMAGE,
    payload: { userEmailAddress, imageUrl }
  }
}

export const deleteUserFromState = (userEmailAddress) => {
  return {
    type: t.DELETE_USER,
    payload: userEmailAddress
  }
}

export const deleteUser = (userEmailAddress) => {
  return (dispatch, getState) => {
    getUserInfo(userEmailAddress).then((res) => {
      removeUser(userEmailAddress).then(() => {
        dispatch(deleteUserFromState(userEmailAddress))
      })
    })
  }
}

export const uploadImage = (userEmailAddress, image) => {
  return (dispatch, getState) => {
    postProfileImage({ userEmailAddress, image }).then((res) => {
      let imageUrl = res.data.url
      dispatch(updateUserProfileImage({ userEmailAddress, imageUrl }))
    }).catch((err) => {
      console.log(err)
    })
  }
}

export const getUserList = () => {
  return (dispatch, getState) => {
    getUsers().then((res) => {
      let users = res.data.users.map((user) => {
        user.quota = ''
        user.storage_location = ''
        return user
      })
      dispatch(loadUserList(users))
      users.forEach((user) => {
        if (user && user.profile_image) {
          dispatch(retrieveProfileImage(user.email_address, user.profile_image.substring(1)))
        }
      })
    })
  }
}

export const getUser = (emailAddress) => {
  return (dispatch, getState) => {
    getUserProfile(emailAddress)
    .then((res) => {
      let user = res.data

      dispatch(updateUser(user))
      if (user && user.profile_image) {
        dispatch(retrieveProfileImage(user.email_address, user.profile_image.substring(1)))
      }
    })
  }
}

export const retrieveProfileImage = (emailAddress, profileURL) => {
  return (dispatch, getState) => {
    getUserProfileImage(profileURL)
      .then((response) => {
        return rawImageToBase64(response.data)
      })
      .then((image) => {
        dispatch(updateUser({
          email_address: emailAddress,
          base64Image: image
        }))
      })
  }
}
