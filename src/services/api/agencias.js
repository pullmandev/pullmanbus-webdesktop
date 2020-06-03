import axios from 'axios'
import endPoints from '@/endPoints'

const { datosAgencia } = endPoints

export default {
  getAgencies(id) {
    return axios.get(`${datosAgencia}/codciudad=${id}`)
  }
}
