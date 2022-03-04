import axios from 'axios'
import endPoints from '@/endPoints'

const validaCupon = endPoints.validaCupon

export default {
  validaCupon(cupon) {
    return axios.post(validaCupon, cupon)
  }
}
