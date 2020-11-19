import axios from 'axios'
import endPoints from '@/endPoints'

const cities = endPoints.cities
const citiesTo = endPoints.citiesTo
const obtenerListaCiudad = endPoints.obtenerListaCiudad

export default {
  getCities() {
    return axios.post(cities)
  },
  getCityByCode(code) {
    return axios.post(citiesTo, code)
  },
  getAllCities() {
    return axios.post(obtenerListaCiudad)
  }
}
