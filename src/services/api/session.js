import axios from 'axios'
import endPoints from '@/endPoints'

const {
  auth,
  registro,
  recuperarPassword,
  guardarUsuario,
  cambioPassowrd,
  enviarContacto,
  buscarUsuario,
  enviarClave,
  cambiarClave
} = endPoints
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
  },
  updatePassword(params) {
    return axios.post(cambioPassowrd, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  sendContact(params) {
    return axios.post(enviarContacto, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  getUsuarioPass(params){
    return axios.post(buscarUsuario, params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  sendPass(params){
    return axios.post(enviarClave,  params, {
      headers: { 'Content-Type': 'application/json' }
    })
  },
  updatePass(params){
    return axios.post(cambiarClave,  params, {
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
