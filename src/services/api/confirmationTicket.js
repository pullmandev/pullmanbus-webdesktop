import axios from 'axios'
import endPoints from '@/endPoints'

const { buscarBoletoConfirmacion, confirmarBoleto,buscarCityConfirmacion, buscarCityToConfirmacion } = endPoints

export default {
  validateTicket(params) {
    return axios.post(buscarBoletoConfirmacion, params)
  },
  confirmTicket(params) {
    return axios.post(confirmarBoleto, params)
  },
  getCities(params) {
    return axios.post(buscarCityConfirmacion,params)
  },
  getCitiesTo(params) {
    return axios.post(buscarCityToConfirmacion,params)
  }
}
