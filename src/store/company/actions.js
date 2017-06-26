import t from './actionTypes.js'
import { getCompanyProfile, getUserProfileImage } from 'modules/api'
import { rawImageToBase64 } from 'modules/utils'

export const loadCompany = (company) => {
  return {
    type: t.LOAD_COMPANY,
    payload: company
  }
}

export const getCompany = () => {
  return (dispatch, getState) => {
    getCompanyProfile()
    .then((res) => {
      // don't need the logo image data
      const { logo_image, ...company } = res.data.company
      dispatch(loadCompany(company))
      /* eslint-disable */
      if (logo_image) {
        return getUserProfileImage(logo_image.substring(1))
      }
      /* eslint-enable */
    })
    .then((response) => {
      if (response) {
        return rawImageToBase64(response.data)
      }
    })
    .then((image) => {
      dispatch(loadCompany({
        base64Image: image
      }))
    })
    // .catch((e) => {
    //   console.log('company error - ', e)
    // })
  }
}
