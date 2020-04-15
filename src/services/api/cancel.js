import axios from 'axios'
import endPoints from '@/endPoints'

const buscarBoletoCode = endPoints.buscarBoletoCode
const buscarTransEmail = endPoints.buscarTransEmail
const cancel = endPoints.cancel
const tipoCuenta = endPoints.tipoCuenta
const bancos = endPoints.bancos

export default {
  searchTicket (params) {
    return axios.post(buscarBoletoCode, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  searchTransaction (params) {
    return axios.post(buscarTransEmail, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  cancel (params) {
    return axios.post(cancel, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  tipoCuenta (params) {
    return axios.post(tipoCuenta, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  bancos () {
    return axios.post(bancos, null, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
