import axios from 'axios'
import endPoints from '@/endPoints'

const cities = endPoints.cities
const citiesTo = endPoints.citiesTo
const obtenerListaCiudad = endPoints.obtenerListaCiudad
const origenCuponera = endPoints.origenCuponera
const destinoCuponera = endPoints.destinoCuponera

export default {
  getCities() {
    return axios.post(cities)
  },
  getCityByCode(code) {
    return axios.post(citiesTo, code)
  },
  getAllCities() {
    return axios.post(obtenerListaCiudad)
  },
  getCuponera() {
    return axios.post(origenCuponera)
  },
  getCuponeraByCode(citiesTo) {
    return axios.post(destinoCuponera,citiesTo)
  }
}
