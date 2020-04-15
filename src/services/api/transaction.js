import axios from 'axios'
import endPoints from '@/endPoints'

const transaction = endPoints.transaction
const searchHeader = endPoints.searchHeader
const generateVoucher = endPoints.generateVoucher

export default {
  post (params) {
    return axios.post(transaction, params)
  },
  postHeader (params) {
    return axios.post(searchHeader, params)
  },
  postVoucher (params) {
    return axios.post(generateVoucher, params, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
