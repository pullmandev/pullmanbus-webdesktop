import APIBanners from '@/services/api/banners'
import _ from 'lodash'

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
