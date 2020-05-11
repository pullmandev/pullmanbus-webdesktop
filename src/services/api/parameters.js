import axios from 'axios'
import endPoints from '@/endPoints'

const itinerario = endPoints.itinerario

export default {
  getItinerario(idServicio) {
    return axios.get(itinerario, { params: { idServicio } })
  }
}
