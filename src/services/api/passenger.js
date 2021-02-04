import axios from 'axios'
import endPoints from '@/endPoints'

const documentTypeList = endPoints.buscarListaTipoDocumento
const nationalityList = endPoints.buscarListaNacionalidad
const searchPassengerData = endPoints.buscarPorNumeroDocumento
const savePassengerData = endPoints.guardarRelacionPasajero
const buscarRegistroPorBoleto = endPoints.buscarRegistroPorBoleto
const editarRegistroBoleto = endPoints.editarRegistroBoleto

export default {
  getDocumentTypeList() {
    return axios.post(documentTypeList)
  },
  getNationalityList() {
    return axios.post(nationalityList)
  },
  getPassengerData(passenger) {
    return axios.post(searchPassengerData, passenger)
  },
  savePassengerData(passenger) {
    return axios.post(savePassengerData, passenger)
  },
  getPassengerDataByTicket(boleto) {
    return axios.get(`${buscarRegistroPorBoleto}/${boleto}`)
  },
  savePassengerDataTicket(passenger) {
    return axios.post(editarRegistroBoleto,passenger)
  }
}