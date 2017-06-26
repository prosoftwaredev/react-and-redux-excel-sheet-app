import axios from 'axios'
import { APP_URL } from 'modules/app-config'

let token
export function setToken (t) {
  token = t
}

/**
 * HTTP
 */
function _getHeaders () {
  return {
    'Authorization': token
  }
}

function _postRequest ({ route, data }, config = {}) {
  let {
    headers = {},
    ...restConfig
  } = config

  Object.assign(headers, _getHeaders())
  return axios({
    method: 'POST',
    url: `${APP_URL}/${route}`,
    data,
    headers,
    ...restConfig
  })
}

function _getRequest ({ route }, config = {}) {
  return axios({
    method: 'GET',
    headers: _getHeaders(),
    url: `${APP_URL}/${route}`,
    ...config
  })
}

/**
 * USER
 */
export const loginAdmin = (data) => {
  return _postRequest({ route: 'admin/login', data })
}

export const passwordReset = (data) => {
  return _postRequest({ route: 'password/reset', data })
}

export const getUsers = () => {
  return _getRequest({ route: 'user/all' })
}

export const getUserProfile = (emailAddress) => {
  return _getRequest({ route: `user/info?email_address=${emailAddress}` })
}

export const resetUserPassword = (emailAddress) => {
  return _postRequest({
    route: 'user/resetPassword',
    data: {
      email_address: emailAddress
    }
  })
}

export const deactivateUser = (emailAddress) => {
  return _postRequest({
    route: 'user/disable',
    data: {
      email_address: emailAddress
    }
  })
}

export const activateUser = (emailAddress) => {
  return _postRequest({
    route: 'user/enable',
    data: {
      email_address: emailAddress
    }
  })
}

export const removeUser = (emailAddress) => {
  return _postRequest({
    route: 'user/delete',
    data: {
      email_address: emailAddress
    }
  })
}

// get image profile
// It's done this way because it requires an Authorization header to retrieve
// After the image data is retrieved, it's base64 encoded and used inline
let imageRequestCache = {}
export const getUserProfileImage = (profileUrl) => {
  const cachedImage = imageRequestCache[profileUrl]
  if (cachedImage) {
    return cachedImage
  } else {
    imageRequestCache[profileUrl] = _getRequest({ route: profileUrl }, { responseType: 'arraybuffer' })
    return imageRequestCache[profileUrl]
  }
}

export const postProfileImage = ({
  userEmailAddress,
  image
}) => {
  const data = new FormData()
  data.append('user_email_address', userEmailAddress)
  data.append('image', image)
  return _postRequest({
    route: 'admin/images',
    data
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * Create/Update a user profile
 * params include
      first_name
      last_name
      email_address
      user_level
      user_level_name
 */
export const createUser = (data) => {
  return _postRequest({ route: 'user/create', data })
}
export const modifyUser = (data) => {
  return _postRequest({ route: 'user/update', data })
}
export const resendUserInvite = (emailAddress) => {
  return _postRequest({
    route: 'user/resendInvite',
    data: {
      email: emailAddress
    }
  })
}

export const getUserInfo = (emailAddress) => {
  return _getRequest({ route: `user/info?email_address=${emailAddress}` })
}

/**
 * COMPANY
 */
export const getCompanyProfile = () => {
  return _getRequest({ route: 'company' })
}

export const updateCompanyProfile = (data) => {
  return _postRequest({ route: 'company/update', data })
}

export const updateCompanyImage = (file) => {
  const data = new FormData()
  data.append('image', file)

  return _postRequest({
    route: 'company/image',
    data
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * SHEETS
 */

export const getAllSheets = () => {
  return _getRequest({ route: 'sheet/all' })
}

export const getSheet = (id) => {
  return _getRequest({ route: `sheet?id=${id}` })
}

export const createSheet = (data) => {
  return _postRequest({
    route: 'sheet/create',
    data
  })
}

export const createRecord = (data) => {
  return _postRequest({
    route: 'record/create',
    data
  })
}

export const updateRecord = (data) => {
  return _postRequest({
    route: 'record/update',
    data
  })
}

export const createField = (data) => {
  return _postRequest({
    route: 'field/create',
    data
  })
}

export const updateField = (data) => {
  return _postRequest({
    route: 'field/update',
    data
  })
}

export const removeField = (data) => {
  return _postRequest({
    route: 'field/delete',
    data
  })
}

export const postFileUpload = ({
  sheet_id,
  name,
  description,
  file
}) => {
  const data = new FormData()
  data.append('name', name)
  data.append('description', description)
  data.append('sheet_id', sheet_id)
  data.append('file', file)

  return _postRequest({
    route: 'file/upload',
    data
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * Groups
 */

export const getAllGroups = () => {
  return _getRequest({ route: 'group/all' })
}

export const createGroup = (data) => {
  return _postRequest({
    route: 'group/create',
    data
  })
}

export const updateGroup = (data) => {
  return _postRequest({
    route: 'group/update',
    data
  })
}

export const deleteGroup = (data) => {
  return _postRequest({
    route: 'group/delete',
    data
  })
}

export const addUserToGroups = (data) => {
  return _postRequest({
    route: 'group/addUserToGroups',
    data
  })
}

export const removeUserFromGroup = (data) => {
  return _postRequest({
    route: 'group/removeMember',
    data
  })
}

export const getGroup = (id) => {
  return _getRequest({ route: `group?id=${id}` })
}
