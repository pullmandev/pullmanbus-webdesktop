<template>
  <div>
    <v-card flat class="hideAsientos mt-3">
      <!-- Grilla de asientos -->
      <div v-if="loadingSeats" style="text-align: center">
        <v-progress-circular indeterminate :size="50" color="blue"></v-progress-circular>
      </div>
      <v-container
        fluid
        v-else-if="bus.grilla.length > 0"
        class="px-0"
        :class="{ 'pa-0': isXs }"
      >
        <div class="xim-desktop">
          <v-row dense :justify="floorArray.length === 1 ? 'center' : undefined">
            <v-col
              cols="4"
              md="4"
              v-for="(selectedFloor, index) in floorArray"
              :key="index"
              :class="{ 'left-border': selectedFloor > 0 }"
              class="pa-0"
            >
              <div>
                <h2 class="text-center mb-1">
                  {{
                    data.pisos[selectedFloor].piso > 0 ? 'Segundo piso' : 'Primer piso'
                  }}
                </h2>
                <h4 class="text-center mb-3 subheading">
                  {{ data.pisos[selectedFloor].servicio }}
                </h4>
                <v-row justify="center" dense>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="10"
                    class="text-center mb-4 border-bus"
                  >
                    <div
                      v-for="(col, i) in bus.grilla[data.pisos[selectedFloor].piso].grid"
                      :key="i"
                      class="blank-seat-rem"
                    >
                      <div class="d-inline-block" v-for="(seat, j) in col" :key="j">
                        <template v-if="seat !== null">
                          <template v-if="seat.asiento.includes('B')">
                            <div
                              style="height: 33px"
                              class="seatWidth d-flex align-center justify-center grey darken-4 elevation-1 white--text mb-2 ml-1"
                            >
                              <span>WC</span>
                            </div>
                          </template>
                          <div
                            v-else-if="seat.asiento === '' || seat.asiento === '%'"
                            style="height: 33px"
                            class="seatWidth"
                          />
                          <v-btn
                            :disabled="loadingPdf"
                            v-else-if="
                              seatIsInshoppingCart(
                                seat.asiento,
                                data.pisos[selectedFloor].piso
                              ) > -1
                            "
                            fab
                            text
                            small
                            class="mx-0 my-0 seatBtn seatWidth"
                            @click="
                              selectSeat(seat.asiento, data.pisos[selectedFloor].piso, [
                                i,
                                j
                              ])
                            "
                          >
                            <seat
                              :seatNumber="seat.asiento"
                              :floor="data.pisos[selectedFloor].piso"
                              type="taken"
                            />
                          </v-btn>
                          <v-btn
                            v-else-if="seat.estado === 'ocupado'"
                            fab
                            text
                            small
                            class="mx-0 my-0 seatBtn seatWidth"
                            disabled
                          >
                            <seat
                              :seatNumber="seat.asiento"
                              :floor="data.pisos[selectedFloor].piso"
                              type="occupied"
                            />
                          </v-btn>
                          <v-btn
                            v-else-if="seat.tipo === 'asociado'"
                            fab
                            text
                            small
                            class="mx-0 my-0 seatBtn seatWidth"
                            disabled
                          >
                            <seat
                              :seatNumber="seat.asiento"
                              :floor="data.pisos[selectedFloor].piso"
                              type="occupied"
                            />
                          </v-btn>
                          <v-btn
                            v-else-if="seat.tipo === 'pet'"
                            fab
                            text
                            small
                            class="mx-0 my-0 seatBtn seatWidth"
                            disabled
                          >
                            <seat
                              :seatNumber="seat.asiento"
                              :floor="data.pisos[selectedFloor].piso"
                              type="pet-occupied"
                            />
                          </v-btn>
                          <v-btn
                            v-else
                            :disabled="loadingPdf"
                            fab
                            text
                            small
                            class="mx-0 my-0 seatBtn seatWidth"
                            @click="
                              selectSeat(seat.asiento, data.pisos[selectedFloor].piso, [
                                i,
                                j
                              ])
                            "
                          >
                            <seat
                              :seatNumber="seat.asiento"
                              type="free"
                              :floor="data.pisos[selectedFloor].piso"
                            />
                          </v-btn>
                        </template>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="4" md="4" class="left-border">
              <div class="d-flex flex-column" style="height: 100%">
                <h2 class="text-center mb-5">{{ $t('seat_title') }}</h2>
                <v-row justify="center">
                  <v-col md="9">
                    <div>
                      <div
                        class="d-flex justify-start ma-4"
                        v-for="(item, index) in seatsImg"
                        :key="index"
                      >
                        <div style="width: 35px">
                          <v-img
                            height="20"
                            :src="
                              require(`../../../../static/logos/seats/${item.number}.png`)
                            "
                            contain
                          />
                        </div>
                        <h3 class="ml-1">
                          {{ $t(item.text) }}
                        </h3>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <div class="align-self-end justify-self-end mr-4">
                  <v-row class="align-end">
                    <v-col class="d-flex align-end justify-end">
                      <v-btn
                        outlined
                        :disabled="!selectedSeats.length > 0 || loadingPdf"
                        @click="deleteSeats"
                        >{{ $t('cancel') }}</v-btn
                      >
                    </v-col>
                    <v-col class="d-flex align-end justify-end">
                      <v-btn
                        @click="gettingTickets"
                        class="white--text"
                        color="orange"
                        :disabled="!selectedSeats.length > 0 || loadingPdf"
                        >{{ $t('continue') }}</v-btn
                      >
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="xim-movile mt-menos">
          <v-card flat class="hideAsientos mt-3">
            <div v-if="loadingSeats" style="text-align: center;margin-top:-250px">
              <v-progress-circular
                indeterminate
                :size="50"
                color="blue"
              ></v-progress-circular>
            </div>
            <v-container
              fluid
              v-else-if="bus.grilla.length > 0"
              class="px-0"
              :class="{ 'pa-0': isXs }"
            >
              <div class="xim-botonera-principal">
                <v-row>
                  <v-col cols="6" class="xim-centra-hijo">
                    <v-btn
                      :class="[classBtn ? 'classBtnAzul' : 'classBtnNormal']"
                      @click="muestraPisoMovile(0)"
                    >
                      Piso 1
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="xim-centra-hijo">
                    <v-btn
                      :class="[classBtn ? 'classBtnNormal' : 'classBtnAzul']"
                      id="xim-btn-secundario_a"
                      @click="muestraPisoMovile(1)"
                    >
                      Piso 2
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
              <v-row
                class="xim-bus"
                dense
                :justify="floorArray.length === 1 ? 'center' : undefined"
              >
                <v-col style="overflow: hidden; position: relative" cols="12">
                  <h2 class="xim-text-center mb-1">
                    {{
                      data.pisos[pisoMuestra].piso === 0 ? 'Primer piso' : 'Segundo piso'
                    }}
                  </h2>
                  <h4 class="xim-text-center mb-3 subheading">
                    {{ data.pisos[pisoMuestra].servicio }}
                  </h4>
                  <v-divider></v-divider>
                  <v-row>
                    <v-col cols="12">
                      <div
                        v-for="(col, i) in bus.grilla[data.pisos[pisoMuestra].piso].grid"
                        :key="i"
                        class="xim-fila-asiento"
                      >
                        <div class="xim-espcio-celdas" v-for="(seat, j) in col" :key="j">
                          <template v-if="seat !== null">
                            <template v-if="seat.asiento.includes('B')">
                              <div class="xim-colum-bano">
                                <span>WC</span>
                              </div>
                            </template>
                            <div
                              v-else-if="seat.asiento === '' || seat.asiento === '%'"
                              class="xim-alinea-pasillo"
                            />
                            <v-btn
                              :disabled="loadingPdf"
                              v-else-if="
                                seatIsInshoppingCart(
                                  seat.asiento,
                                  data.pisos[pisoMuestra].piso
                                ) > -1
                              "
                              fab
                              text
                              small
                              class="xim-asientos"
                              @click="
                                selectSeat(seat.asiento, data.pisos[pisoMuestra].piso, [
                                  i,
                                  j
                                ])
                              "
                            >
                              <seat
                                :seatNumber="seat.asiento"
                                :floor="data.pisos[pisoMuestra].piso"
                                type="taken"
                              />
                            </v-btn>
                            <v-btn
                              v-else-if="seat.estado === 'ocupado'"
                              fab
                              text
                              small
                              class="xim-asientos"
                              disabled
                            >
                              <seat
                                :seatNumber="seat.asiento"
                                :floor="data.pisos[pisoMuestra].piso"
                                type="occupied"
                              />
                            </v-btn>
                            <v-btn
                              v-else-if="seat.tipo === 'asociado'"
                              fab
                              text
                              small
                              class="xim-asientos"
                              disabled
                            >
                              <seat
                                :seatNumber="seat.asiento"
                                :floor="data.pisos[pisoMuestra].piso"
                                type="occupied"
                              />
                            </v-btn>
                            <v-btn
                              v-else-if="seat.tipo === 'pet'"
                              fab
                              text
                              small
                              class="xim-asientos"
                              disabled
                            >
                              <seat
                                :seatNumber="seat.asiento"
                                :floor="data.pisos[pisoMuestra].piso"
                                type="pet-occupied"
                              />
                            </v-btn>
                            <v-btn
                              v-else
                              :disabled="loadingPdf"
                              fab
                              text
                              small
                              class="xim-asientos"
                              @click="
                                selectSeat(seat.asiento, data.pisos[pisoMuestra].piso, [
                                  i,
                                  j
                                ])
                              "
                            >
                              <seat
                                :seatNumber="seat.asiento"
                                type="free"
                                :floor="data.pisos[pisoMuestra].piso"
                              />
                            </v-btn>
                          </template>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" class="left-border">
                  <div class="d-flex flex-column" style="height: 100%">
                    <h2 class="text-center mb-5">{{ $t('seat_title') }}</h2>
                    <v-row justify="center">
                      <v-col md="9">
                        <div>
                          <div
                            class="d-flex justify-start ma-4"
                            v-for="(item, index) in seatsImg"
                            :key="index"
                          >
                            <div style="width: 35px">
                              <v-img
                                height="20"
                                :src="
                                  require(`../../../../static/logos/seats/${item.number}.png`)
                                "
                                contain
                              />
                            </div>
                            <h3 class="ml-1">
                              {{ $t(item.text) }}
                            </h3>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <div class="align-self-end justify-self-end mr-4">
                      <v-row class="align-end">
                        <v-col class="d-flex align-end justify-end">
                          <v-btn
                            outlined
                            :disabled="!selectedSeats.length > 0 || loadingPdf"
                            @click="deleteSeats"
                            >{{ $t('cancel') }}</v-btn
                          >
                        </v-col>
                        <v-col class="d-flex align-end justify-end">
                          <v-btn
                            @click="gettingTickets"
                            class="white--text"
                            color="orange"
                            :disabled="!selectedSeats.length > 0 || loadingPdf"
                            >{{ $t('continue') }}</v-btn
                          >
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </div>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import seat from '@/views/ConfirmationServices/List/Seat'
import { mapGetters } from 'vuex'
import deleteSeat from '@/helpers/deleteSeat'
import API from '@/services/api/seats'
import APIConfirmation from '@/services/api/confirmationTicket'
import _ from 'lodash'

export default {
  props: ['item', 'isXs', 'back'],
  data() {
    return {
      classBtn: true,
      pisoMuestra: 0,
      btnPrimerPiso: false,
      btnPrimerSegundo: false,
      loadingPdf: false,
      seatImageBase: '../../../../static/logos/seats/',
      seatsImg: [
        { text: 'available_seats', number: 'seat-free' },
        { text: 'selected_seats', number: 'seat-taken' },
        { text: 'reserved_seats', number: 'seat-busy' }
      ],
      seatsPetImg: [
        { text: 'available_pet_seats', number: 'seat-pet-free' },
        { text: 'selected_pet_seats', number: 'seat-pet-taken' },
        { text: 'reserved_pet_seats', number: 'seat-pet-busy' }
      ],
      dialog: false,
      messageType: false,
      floorArray: [0],
      selectedFloor: 0,
      data: {},
      serviceData: {},
      loadingSeats: false,
      map: [],
      bus: {
        grilla: []
      }
    }
  },
  components: {
    seat
  },
  mounted() {
    this.getSeats(this.item)
    console.log(this.$store.getters.seats)
    /*
    if (this.$store.getters.seats.length > 0) {
      console.log(this.$store.getters.seats[0].servicioNombre)
      if (this.$store.getters.seats[0].servicioNombre == 'SALON CAMA') {
        this.tipoBotones = 2
      } else {
        this.tipoBotones = 1
      }
      return this.tipoBotones
    }
    */
  },
  watch: {
    item() {
      this.getSeats(this.item)
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['confirmationSeats'],
      totalAmount: ['confirmationSeatsTotalAmount']
    }),
    getSelectedFloor() {
      const pisos = this.data.pisos
      const selected = this.selectedFloor
      const piso = pisos.filter(item => {
        return item.piso === selected
      })[0]
      return piso
    },
    confirmationSeats() {
      return this.data.pisos.filter(item => item.confirmation.idaVuelta)
    }
  },
  methods: {
    muestraPisoMovile(p) {
      this.pisoMuestra = p
      if (p >= 0) {
        this.classBtn = !this.classBtn
      }
    },
    async gettingTickets() {
      try {
        this.loadingPdf = true
        this.$notify({
          group: 'load',
          title: this.$t('get_tickets'),
          type: 'info'
        })
        const seat = this.selectedSeats[0]
        const ticket = this.$store.state.searchingConfirmation.ticket
        const fechaServicio = this.formatDate(seat.fechaServicio)
        const fechaSalida =
          seat.fechaSubida.split('-').join('') + seat.horaSalida.split(':').join('')
        const params = {
          boleto: ticket.boleto,
          clase: seat.clase,
          empresa: seat.empresa,
          asiento: seat.piso === 1 ? parseInt(seat.asiento).toString() : seat.asiento,
          idServicio: seat.servicio,
          fechaServicio,
          fechaSalida,
          idOrigen: seat.origen,
          idDestino: seat.destino,
          piso: seat.piso + 1,
          email: ticket.email,
          idIntegrador: ticket.idIntegrador,
          codigoReserva: seat.codigoReserva
        }
        const response = await APIConfirmation.confirmTicket(params)
        const { resultado } = response.data
        let nameRoute = 'ConfirmationServiceSucceed'
        if (!resultado.exito) {
          nameRoute = 'ConfirmationServiceFail'
          const text =
            resultado.mensaje || 'Se genero un error inesperado al confirmar boleto'
          this.$notify({
            group: 'error',
            title: 'Error al confirmar boleto',
            text,
            type: 'error'
          })
        }
        this.$router.push({
          name: nameRoute,
          query: response.data
        })
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingPdf = false
      }
    },
    async deleteSeats() {
      const lenght = this.selectedSeats.length - 1
      for (let index = lenght; index >= 0; index--) {
        await deleteSeat(index, true)
      }
    },
    createDataForRequest() {
      this.serviceData = {
        empresa: this.data.empresa,
        servicio: this.data.idServicio,
        fecha: this.data.fechaSalida,
        fechaLlegada: this.data.fechaLlegada,
        fechaPasada: this.data.fechaSalida,
        fechaServicio: this.data.fechaServicio,
        fechaSubida: this.data.fechaSubida,
        horaSalida: this.data.horaSalida,
        horaLlegada: this.data.horaLlegada,
        origen: this.data.idTerminalOrigen,
        destino: this.data.idTerminalDestino,
        integrador: this.data.integrador,
        terminalLlegada: this.data.terminaLlegada,
        terminalSalida: this.data.terminalSalida,
        pisos: this.data.pisos
      }
      return this.serviceData
    },
    seatIsInshoppingCart(seat, piso) {
      const index = this.selectedSeats.findIndex(
        item =>
          item.piso === piso &&
          item.servicio === this.serviceData.servicio &&
          item.fecha === this.serviceData.fecha &&
          item.origen === this.serviceData.origen &&
          item.destino === this.serviceData.destino &&
          item.integrador === this.serviceData.integrador &&
          item.empresa === this.serviceData.empresa &&
          seat === item.asiento
      )
      return index
    },
    selectSeat(seat, piso, indexes) {
      const index = this.data.pisos.length > 1 ? piso : 0
      const seatIndex = this.seatIsInshoppingCart(seat, piso)
      const floorData = {
        ...this.serviceData,
        servicioNombre: this.serviceData.pisos[index].servicio,
        tarifa: this.serviceData.pisos[index].tarifaInternet,
        tarifaNormal: this.serviceData.pisos[index].tarifa,
        monto: this.serviceData.pisos[index].tarifaInternet,
        precio: this.serviceData.pisos[index].tarifaInternet,
        clase: this.serviceData.pisos[index].clase,
        bus: this.serviceData.pisos[index].busPiso,
        descuento: 0
      }
      if (seatIndex > -1) {
        this.leverageSeat({ ...floorData, asiento: seat, piso }, seatIndex, indexes)
      } else {
        this.takeSeat({ ...floorData, asiento: seat, piso }, indexes)
      }
    },
    async takeSeat(params, indexes) {
      if (this.selectedSeats.length > 0) {
        this.$notify({
          group: 'error',
          title: 'Máximo de 1 asiento',
          type: 'error'
        })
        return
      }
      this.$notify({
        group: 'load',
        title: this.$t('taking_seat'),
        type: 'info'
      })
      const requestParams = this.createRequestParams(params)
      const response = await API.takeSeat(requestParams)
      if (!response.data.estadoReserva) {
        this.$notify({
          group: 'error',
          title: this.$t('seats'),
          text: this.$t('seats_error1') + requestParams.asiento + this.$t('seats_error2'),
          type: 'error'
        })
        this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]].estado = 'ocupado'
        this.$forceUpdate()
      } else {
        const seat = Object.assign({ vuelta: this.back }, params)
        seat.codigoReserva = response.data.codigoReserva
        this.$store.dispatch('SET_CONFIRMATION_SEAT', { seat })
      }
    },
    async leverageSeat(params, index, indexes) {
      const requestParams = this.createRequestParams(params)
      await API.freeSeat(requestParams)

      this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]].estado = 'libre'
      this.$store.dispatch('DELETE_CONFIRMATION_SEAT', { seat: index })
    },
    createRequestParams(params) {
      console.log(params)
      const requestParams = _.pick(params, [
        'servicio',
        'fecha',
        'origen',
        'destino',
        'integrador',
        'asiento',
        'tarifa'
      ])
      requestParams.asiento =
        params.piso > 0 ? parseInt(params.asiento).toString() : params.asiento
      return requestParams
    },
    async getSeats(item) {
      //console.log('ITEM::',item);
      /*
      const nomServ = this.$store.getters.seats[0].servicioNombre
      let clase = 0
      clase = nomServ == 'SALON CAMA' ? 2 : 1

      if(item.pisos.length > 0) {
        item.pisos.forEach(p => {

          if(clase == 2 && p.piso == 0) {
            this.btnUno = 1
          } else if (clase == 1 && p.piso == 0 && nomServ == p.servicio) {
            this.btnUno = 1
          }

          if(clase == 2 && p.piso == 1) {
            this.btnDos = 1
          } else if (clase == 1 && p.piso == 1 && nomServ == p.servicio) {
            this.btnDos = 1
          }
        })
      }
      */
      this.floorArray = item.pisos.length > 1 ? [0, 1] : [0]
      this.selectedFloor = item.pisos[0].piso
      this.data = item
      if (this.bus.grilla.length > 0) {
        return
      }
      this.loadingSeats = true
      this.createDataForRequest()
      const mapResponse = await API.getMapVertical({
        idServicio: item.idServicio,
        tipoBusPiso1: item.busPiso1,
        tipoBusPiso2: item.busPiso2,
        fechaServicio: item.fechaServicio,
        idOrigen: item.idTerminalOrigen,
        idDestino: item.idTerminalDestino,
        integrador: item.integrador
      })
      this.map = mapResponse.data
      const floors = Object.keys(this.map)
      let grilla = []
      const map = JSON.parse(JSON.stringify(this.map))
      floors.forEach(key => {
        grilla.push({ floor: key, grid: map[key] })
      })
      //console.log('grilla', grilla)
      this.bus = { grilla }
      this.loadingSeats = false
    },
    formatDate(fecha, hour) {
      const fechaItems = fecha.split('/')
      let result = fechaItems[2] + fechaItems[1] + fechaItems[0]
      if (hour) {
        const formatedHour = hour.split(':').join('')
        result += formatedHour
      }
      console.log(result)
      return result
    }
  }
}
</script>
<style scoped>
.classBtnAzul {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  background: #1110ad !important;
  color: #ffffff !important;
}
.classBtnNormal {
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  background: #ffffff !important;
  color: #1110ad !important;
}
.promotion-advice-floor {
  width: 80%;
  height: 30px;
  border-radius: 10px;
}
@media (max-width: 400px) {
  .container {
    padding: 0px !important;
  }
}
.wcSize {
  width: 30px;
  fill: grey;
}
.left-border {
  border-left: 1.5px solid rgb(206, 204, 204);
}
.seatContinueButton {
  position: absolute;
  bottom: 0;
  right: 0;
}
.seatWidth {
  width: 33px;
}
.blank-seat-rem {
  margin-right: 1rem;
}
@media screen and (max-width: 1364px) {
  .seatWidth {
    width: 29px;
  }
  .blank-seat-rem {
    margin-right: 0.5;
  }
}

@media screen and (max-width: 1064px) {
  .blank-seat-rem {
    margin-right: 0;
  }
}
</style>
