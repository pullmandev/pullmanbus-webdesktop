import APIBanners from '@/services/api/banners'
import _ from 'lodash'

function createDefaultObject(type) {
  let result = []
  if (type === 3 || type === 4) {
    result.push({
      contenido: 'BOLETO DE REGRESO POR ${1}'
    })
  } else if (type === 2) {
    result.push({
      colorTarifa: '#ffffff',
      contenido: 'AGREGA TU BOLETO DE REGRESO POR ${1}, QUIERES AGREGARLO?',
      fondoTarifa: '#FF621D',
      urlImagen: 'http://pullman.cl/imagenes/Caluga_etapa_2.jpg'
    })
  }
  return result
}
function createBanners(searching, type, commit) {
  const { from_city, to_city, from_date } = searching
  if (from_city != null && to_city != null && from_date != null) {
    const params = {
      origen: from_city.codigo,
      destino: to_city.codigo,
      fechaSalida: from_date.replace(/-/g, ''),
      etapa: type
    }
    APIBanners.searchBanner(params)
      .then(response => {
        const data = response.data
        console.log(type, data)

        let banners = []
        data.forEach(item => {
          const params = _.pick(item, [
            'urlImagen',
            'contenido',
            'titulo',
            'tarifas',
            'colorTarifa',
            'fondoTarifa'
          ])
          banners.push(params)
        })
        if (banners.length <= 0) {
          banners = createDefaultObject(type)
        }
        let commitTo = ''
        if (type === 1) {
          commitTo = 'SET_HOME_BANNERS'
        } else if (type === 2) {
          commitTo = 'SET_SERVICE_BANNERS'
        } else if (type === 3) {
          commitTo = 'SET_FLOOR_BANNERS'
        } else {
          commitTo = 'SET_PAYMENT_BANNERS'
        }
        commit(commitTo, { banners })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default createBanners
