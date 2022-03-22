import axios from 'axios'
import endPoints from '@/endPoints'

const services = endPoints.services

export default {
  get(params) {
    console.log('services.get', params)
    return axios.post(services, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
