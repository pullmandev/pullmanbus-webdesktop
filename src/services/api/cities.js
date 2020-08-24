import axios from 'axios'
import endPoints from '@/endPoints'

const cities = endPoints.cities
const citiesTo = endPoints.citiesTo

export default {
  getCities() {
    return axios.post(cities)
  },
  getCityByCode(code) {
    return axios.post(citiesTo, code)
  }
}
