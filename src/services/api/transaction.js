import axios from 'axios'
import endPoints from '@/endPoints'

const transaction = endPoints.transaction
const searchHeader = endPoints.searchHeader
const generateVoucher = endPoints.generateVoucher
const transactionCoupon = endPoints.transactionCoupon
const searchHeaderCoupon = endPoints.searchHeaderCoupon
const generateCoupon = endPoints.generateCoupon
const dataClient = endPoints.guardarDatosCliente
export default {
  post(params) {
    return axios.post(transaction, params)
  },

  postHeader(params) {
    return axios.post(searchHeader, params)
  },

  postVoucher(params) {
    return axios.post(generateVoucher, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },

  postCoupon(params) {
    return axios.post(transactionCoupon, params)
  },

  postClientData(params) {
    return axios.post(dataClient, params)
  },

  postHeaderCoupon(params) {
    return axios.post(searchHeaderCoupon, params)
  },

  postVoucherCoupon(params) {
    return axios.post(generateCoupon, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
