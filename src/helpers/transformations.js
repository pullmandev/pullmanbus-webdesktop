export async function toBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fullStr = ''

    const getPositionSymbol = symbol => {
      return fullStr.search(symbol) + 1
    }

    reader.readAsDataURL(blob)

    reader.onload = () => {
      fullStr = reader.result
      const content = fullStr.substring(getPositionSymbol(','))
      const type = fullStr.substring(getPositionSymbol(':'), getPositionSymbol(';') - 1)

      resolve({ content, type })
    }

    reader.onerror = error => reject(error)
  })
}
