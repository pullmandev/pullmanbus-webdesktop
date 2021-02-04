import axios from 'axios'
import endPoints from '@/endPoints'

const { buscarCaluga } = endPoints

export default {
  searchBanner(params) {
    return axios.post(buscarCaluga, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
