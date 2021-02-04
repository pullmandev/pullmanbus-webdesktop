import store from '@/store'

function confirmationAmount(seat) {
  const index = store.getters.seats.findIndex(item => item.id === seat.id)
  store.dispatch('SET_CONFIRMATION_SEAT_AMOUNT', {
    seat: index,
    tomado: !seat.tomadoPromo
  })
}

export default confirmationAmount
