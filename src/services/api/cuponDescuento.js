import axios from 'axios'
import endPoints from '@/endPoints'

const validaCupon = endPoints.validaCupon
const validaCuponNuevo = endPoints.validaCuponNuevo

export default {
  validaCupon(cupon) {
    return axios.post(validaCupon, cupon)
  },
  validaCuponNuevo(cupon){
    return axios.post(validaCuponNuevo,cupon);
  }
}
