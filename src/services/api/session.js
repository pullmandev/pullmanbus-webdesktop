import axios from 'axios'
import endPoints from '@/endPoints'

const auth = endPoints.auth
const registro = endPoints.registro
const cambioPassword = endPoints.cambioPassword
const recuperarPassword = endPoints.recuperarPassword
export default {
  auth (params) {
    return axios.post(auth, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  signup (params) {
    return axios.post(registro, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  changePassword (params) {
    return axios.post(cambioPassword, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  forgotPassword (params) {
    return axios.post(recuperarPassword, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
