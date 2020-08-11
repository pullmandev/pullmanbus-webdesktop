const toUint8Array = file => {
  const binary = atob(file)
  const length = binary.length
  const arrayBuffer = new ArrayBuffer(length)
  const uintArray = new Uint8Array(arrayBuffer)

  for (let i = 0; i < length; i++) {
    uintArray[i] = binary.charCodeAt(i)
  }

  return uintArray
}

export const getPdf = file => {
  // create a download anchor tag
  const tipo = file.tipo.toLowerCase()
  let downloadLink = document.createElement('a')

  downloadLink.target = '_blank'
  downloadLink.download = file.nombre

  // convert downloaded data to a Blob
  const blob = new Blob([toUint8Array(file.archivo)], {
    type: `application/${tipo}`
  })

  // create an object URL from the Blob
  let URL = window.URL || window.webkitURL
  const downloadUrl = URL.createObjectURL(blob)

  // set object URL as the anchor's href
  downloadLink.href = downloadUrl

  // append the anchor to document body
  document.body.append(downloadLink)

  // fire a click event on the anchor
  downloadLink.click()

  // cleanup: remove element and revoke object URL
  document.body.removeChild(downloadLink)
  URL.revokeObjectURL(downloadUrl)
}
