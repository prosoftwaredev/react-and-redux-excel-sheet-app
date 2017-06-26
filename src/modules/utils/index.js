export const rawImageToBase64 = (data) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.addEventListener('load', () => {
      resolve(reader.result)
    }, false)
    reader.readAsDataURL(new Blob([data]))
  })
}
