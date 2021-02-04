import axios from 'axios'
import endPoints from '@/endPoints'

const { guardarSolicitudServicio } = endPoints

export default {
  postSolicitudServicio(params) {
    return axios.post(guardarSolicitudServicio, params)
  }
}
