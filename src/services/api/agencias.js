import endPoints from '@/endPoints'
import axios from 'axios'

const { datosAgencia } = endPoints

export default {
  getAgencies(id) {
    console.log('ID::', id)
    return axios.get(`${datosAgencia}?ciudad=${id}`)
  }
}
