import t from './actionTypes.js'

const TOKEN_NAME = '--token'
export const receiveCredentials = (credentials) => {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(credentials))

  return {
    type: t.RECEIVE_CREDENTIALS,
    payload: credentials
  }
}

export const removeCredentials = (credentials) => {
  localStorage.removeItem(TOKEN_NAME)

  return {
    type: t.REMOVE_CREDENTIALS
  }
}

export const reloadCredentials = (credentials) => {
  return (dispatch) => {
    const tokens = localStorage.getItem(TOKEN_NAME)
    if (!tokens) return

    try {
      const parsedTokens = JSON.parse(tokens)
      if (parsedTokens) {
        dispatch(receiveCredentials(parsedTokens))
      }
    } catch (e) {
      // do nothing
    }
  }
}

const emailKey = 'lm_email_address'
const pwKey = 'lm_password'

export const saveUserInfor = (emailAddress, password) => {
  localStorage.setItem(emailKey, emailAddress)
  localStorage.setItem(pwKey, password)
}

export const removeUserInfor = () => {
  localStorage.removeItem(emailKey)
  localStorage.removeItem(pwKey)
}

export const readUserInfor = () => {
  return {
    'email_address': localStorage.getItem(emailKey),
    'password': localStorage.getItem(pwKey)
  }
}

