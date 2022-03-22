import axios from 'axios'
import endPoints from '@/endPoints'

const convenios = endPoints.convenios
const botonPago = endPoints.botonPago
const validar = endPoints.validarConvenio
const detalleConvenioAtributo = endPoints.detalleConvenioAtributo

export default {
  getBotonPago() {
    return axios.post(botonPago)
  },
  getConvenios() {
    return axios.post(convenios)
  },
  getValidateConvenio(param) {
    return axios.post(validar, param)
  },
  getDetalleConvenioAtributo(convenio) {
    return axios.post(detalleConvenioAtributo, { convenio: convenio })
  }
}
