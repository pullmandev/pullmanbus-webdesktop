import axios from 'axios'
import endPoints from '@/endPoints'

const { buscarBoleto, validarBoletoCanje, canjearBoletoCanje } = endPoints

export default {
  searchTicket(params) {
    return axios.post(buscarBoleto, params)
  },
  validateTicket(params) {
    return axios.post(validarBoletoCanje, params)
  },
  exchangeTicket(params) {
    return axios.post(canjearBoletoCanje, params)
  }
}
