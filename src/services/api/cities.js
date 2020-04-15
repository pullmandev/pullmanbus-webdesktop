import axios from 'axios'
import endPoints from '@/endPoints'

const cities = endPoints.cities

export default {
  getCities () {
    return axios.post(cities)
  },
  getCityByCode (code) {
    return axios.post(cities, code)
  }
}
