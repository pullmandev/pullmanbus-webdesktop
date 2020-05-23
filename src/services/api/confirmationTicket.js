import axios from 'axios'
import endPoints from '@/endPoints'

const { buscarBoletoConfirmacion, confirmarBoleto } = endPoints

export default {
  validateTicket(params) {
    return axios.post(buscarBoletoConfirmacion, params)
  },
  confirmTicket(params) {
    return axios.post(confirmarBoleto, params)
  }
}
