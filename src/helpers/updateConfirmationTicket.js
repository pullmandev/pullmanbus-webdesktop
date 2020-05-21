import store from '@/store'

function confirmationAmount(seat) {
  const index = store.getters.seats.findIndex(
    item =>
      item.servicio === seat.servicio &&
      item.piso === seat.piso &&
      item.asiento === seat.asiento
  )
  store.dispatch('SET_CONFIRMATION_SEAT_AMOUNT', {
    seat: index,
    tomado: !seat.tomadoPromo
  })
}

export default confirmationAmount
