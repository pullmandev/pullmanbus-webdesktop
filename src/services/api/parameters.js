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
  getMotivoContacto() {
    return axios.get(buscarMotivoContacto)
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
