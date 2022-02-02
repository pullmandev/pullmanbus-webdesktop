import axios from 'axios'
import endPoints from '@/endPoints'

const {
  itinerario,
  obtenerFaq,
  buscarMotivoContacto,
  obtenerCiudades,
  obtenerRegiones,
  buscarListaCarrusel
} = endPoints

export default {
  getItinerario(idServicio) {
    return axios.get(itinerario, { params: { idServicio } })
  },
  getFaqs() {
    return axios.get(obtenerFaq)
  },

  async getMotivoContacto() {
    try {
      const { status, data } = await axios.get(buscarMotivoContacto)

      if (status === 200) return data
      else {
        console.warn('WARN-GET-MOTIVO-CONTACTO ->', data)
        return null
      }
    } catch (error) {
      console.error('ERROR-GET-MOTIVO-CONTACTO ->', error.message)
      return null
    }
  },

  getCities(params) {
    return axios.post(obtenerCiudades, params)
  },
  getRegions() {
    return axios.post(obtenerRegiones)
  },
  getContenidoSeccion(params) {
    return axios.post(buscarListaCarrusel, params)
  }
}
