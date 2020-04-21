import axios from 'axios'
import endPoints from '@/endPoints'

/**
 * Declare Variable
 */
const map = endPoints.map
const availability = endPoints.availability
const validateSeat = endPoints.validateSeat
const takeSeat = endPoints.takeSeat
const freeSeat = endPoints.freeSeat
/**
 * Export
 */
export default {
  getMap(params) {
    if (params) {
      return axios.post(map, params)
    } else {
      return axios.post(map)
    }
  },
  getAvailability(params) {
    if (params) {
      return axios.post(availability, params)
    } else {
      return axios.post(availability)
    }
  },
  validateSeat(params) {
    if (params) {
      return axios.post(validateSeat, params)
    } else {
      return axios.post(validateSeat)
    }
  },
  takeSeat(params) {
    if (params) {
      return axios.post(takeSeat, params)
    } else {
      return axios.post(takeSeat)
    }
  },
  freeSeat(params) {
    if (params) {
      return axios.post(freeSeat, params)
    } else {
      return axios.post(freeSeat)
    }
  }
}
