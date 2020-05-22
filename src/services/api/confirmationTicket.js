import axios from 'axios'
import endPoints from '@/endPoints'

const { buscarBoletoConfirmacion } = endPoints

export default {
  validateTicket(params) {
    return axios.post(buscarBoletoConfirmacion, params)
  }
}
