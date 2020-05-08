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

async function deleteSeat(index) {
  const params = store.getters.seats[index]
  const requestParams = createRequestParams(params)
  await API.freeSeat(requestParams)
  store.dispatch('DELETE_SEAT', { seat: index })
}

export default deleteSeat
