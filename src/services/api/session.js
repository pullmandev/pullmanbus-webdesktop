import axios from 'axios'
import endPoints from '@/endPoints'

const { auth, registro, recuperarPassword, guardarUsuario } = endPoints
export default {
  auth(params) {
    return axios.post(auth, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  signup(params) {
    return axios.post(registro, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  forgotPassword(params) {
    return axios.post(recuperarPassword, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  updateUser(params) {
    return axios.post(guardarUsuario, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
