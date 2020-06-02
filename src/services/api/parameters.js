import axios from 'axios'
import endPoints from '@/endPoints'

const { itinerario, obtenerFaq, buscarMotivoContacto } = endPoints

export default {
  getItinerario(idServicio) {
    return axios.get(itinerario, { params: { idServicio } })
  },
  getFaqs() {
    return axios.get(obtenerFaq)
  },
  getMotivoContacto() {
    return axios.get(buscarMotivoContacto)
  }
}
