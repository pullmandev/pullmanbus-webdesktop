import deleteSeat from '@/helpers/deleteSeat'

export function getFinalPrice(seat) {
  const finalPrice = seat.tomadoPromo ? seat.totalPromo : seat.tarifa
  return parseInt(finalPrice.split('.').join(''))
}

export function getTarifaNormal(seat) {
  let base = null
  if (seat.tomadoPromo) {
    base =
      parseInt(seat.totalPromo.split('.').join('')) -
      parseInt(seat.tarifa.split('.').join('')) +
      parseInt(seat.tarifaNormal.split('.').join(''))
  } else {
    base = parseInt(seat.tarifaNormal.split('.').join(''))
  }
  return base
}

export async function deleteSelected(seat, seatList) {
  const index = seatList.findIndex(item => item.id === seat.id)
  if (index > -1) {
    await deleteSeat(index)
  }
  if (seat.tipo === 'asociado') {
    const index = seatList.findIndex(
      item =>
        item.piso === seat.piso &&
        item.servicio === seat.servicio &&
        item.fecha === seat.fecha &&
        item.origen === seat.origen &&
        item.destino === seat.destino &&
        item.integrador === seat.integrador &&
        item.empresa === seat.empresa &&
        item.asiento === seat.asientoAsociado &&
        item.tipo === 'pet'
    )
    if (index > -1) {
      await deleteSeat(index)
    }
  }
}

export function getTravelType(type, uppercase) {
  const str = type ? 'vuelta' : 'ida'
  return uppercase ? str.toUpperCase() : str
}

export function getMixin() {
  return {
    methods: { getFinalPrice, getTarifaNormal, deleteSelected }
  }
}
