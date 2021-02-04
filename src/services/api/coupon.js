import axios from 'axios'
import endPoints from '@/endPoints'

const buscarCuponera = endPoints.buscarCuponera
const validarUsuario = endPoints.validarUsuario

export default {
  getListCoupon(cupon) {
    return axios.post(buscarCuponera,cupon)
  },
  validaUsuario(user) {
    return axios.post(validarUsuario,user)
  }
}