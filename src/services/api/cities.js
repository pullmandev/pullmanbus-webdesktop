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
    const props = {
      idSistema: "7"
    }
    return axios.post(origenCuponera, props)
  },
  getCuponeraByCode(citiesTo) {
    const props = {
      idSistema: "7",
      origen: citiesTo
    }
    return axios.post(destinoCuponera, props)
  }
}
