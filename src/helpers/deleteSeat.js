import store from '@/store'
import API from '@/services/api/seats'
import _ from 'lodash'

function createRequestParams(params) {
  const requestParams = _.pick(params, [
    'servicio',
    'fecha',
    'origen',
    'destino',
    'integrador',
    'asiento'
  ])
  requestParams.asiento =
    params.piso > 0
      ? (parseInt(params.asiento) + 20).toString()
      : params.asiento
  return requestParams
}

async function deleteSeat(index, confirmation) {
  const params = confirmation
    ? store.getters.confirmationSeats[index]
    : store.getters.seats[index]
  const requestParams = createRequestParams(params)
  await API.freeSeat(requestParams)
  const param = confirmation ? 'DELETE_CONFIRMATION_SEAT' : 'DELETE_SEAT'
  store.dispatch(param, { seat: index })
}

export default deleteSeat
