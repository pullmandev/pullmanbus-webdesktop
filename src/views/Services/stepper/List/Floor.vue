<template>
  <div>
    <ServicesListPanel
      :open.sync="confirmTicketDialog"
      :price="addedSeat.totalPromo"
      @accept="confirmationAmountFromDialog"
    />
    <Dialog :open="dialog" :type="messageType" @close="closeDialog" />
    <v-card flat class="hideAsientos mt-3">
      <!-- Grilla de asientos -->
      <div v-if="loadingSeats" style="text-align: center">
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
        <v-row dense :justify="floorArray.length === 1 ? 'center' : undefined">
          <v-col
            cols="4"
            md="4"
            v-for="(selectedFloor, index) in floorArray"
            :key="index"
            :class="{ 'left-border': selectedFloor > 0 }"
            class="pa-0"
            style="overflow: hidden; position: relative"
          >
            <div
              v-if="
                data.pisos[selectedFloor].confirmation.idaVuelta && !hasVuelta
              "
              class="white--text text-left orange promotion-advice-floor"
            >
              <span class="ml-8 caption">{{ data.textoPromocion }}</span>
            </div>
            <div>
              <h2 class="text-center mb-1">
                {{ $t('floor') }} {{ data.pisos[selectedFloor].piso + 1 }}
              </h2>
              <h4 class="text-center mb-3 subheading">
                {{ data.pisos[selectedFloor].servicio }} -
                {{ data.pisos[selectedFloor].tarifaInternet }}
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
                    v-for="(col, i) in bus.grilla[
                      data.pisos[selectedFloor].piso
                    ].grid"
                    :key="i"
                    class="d-inline-block"
                  >
                    <!-- acá tengo las columnas del bus (son 5)-->
                    <div
                      class="blank-seat-rem"
                      v-for="(seat, j) in col"
                      :key="j"
                    >
                      <!-- Acà voy a ir obteniendo los asientos de atras hacia adelante de una de las 5 columnas-->
                      <!-- <template > -->
                      <template v-if="seat !== null">
                        <!-- baño -->
                        <template v-if="seat.includes('B')">
                          <div
                            style="height: 33px"
                            class="seatWidth d-flex align-center justify-center grey darken-4 elevation-1 white--text mb-2 ml-1"
                          >
                            <span>WC</span>
                          </div>
                        </template>
                        <div
                          v-else-if="seat === 'X' || seat === '%'"
                          style="height: 33px"
                          class="seatWidth"
                        />
                        <v-btn
                          v-else-if="
                            seatIsInshoppingCart(
                              seat,
                              data.pisos[selectedFloor].piso
                            ) > -1
                          "
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          @click="
                            selectSeat(seat, data.pisos[selectedFloor].piso, [
                              i,
                              j
                            ])
                          "
                        >
                          <seat
                            :seatNumber="seat[0]"
                            :floor="data.pisos[selectedFloor].piso"
                            type="taken"
                          />
                        </v-btn>
                        <v-btn
                          v-else-if="seat[1] !== '0'"
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          disabled
                        >
                          <seat
                            :seatNumber="seat[0]"
                            :floor="data.pisos[selectedFloor].piso"
                            type="occupied"
                          />
                        </v-btn>
                        <v-btn
                          v-else
                          fab
                          text
                          small
                          class="mx-0 my-0 seatBtn seatWidth"
                          @click="
                            selectSeat(seat, data.pisos[selectedFloor].piso, [
                              i,
                              j
                            ])
                          "
                        >
                          <seat
                            :seatNumber="seat[0]"
                            type="free"
                            :floor="data.pisos[selectedFloor].piso"
                          />
                        </v-btn>
                      </template>
                      <!-- </template> -->
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
                            require(`../../../../../static/logos/seats/Iconos-${item.number}.png`)
                          "
                          contain
                        />
                      </div>
                      <h3 class="ml-1">
                        {{ $t(item.text) }}
                      </h3>
                    </div>
                    <template v-if="selectedSeats.length > 0">
                      <strong class="d-block">Total</strong>
                      <div class="text-right">
                        <hr />
                        <span
                          :key="index"
                          v-for="(seat, index) in selectedSeats"
                          class="d-block"
                          >{{ seat.servicioNombre }} -
                          <strong
                            >${{
                              seat.tomadoPromo ? seat.totalPromo : seat.tarifa
                            }}</strong
                          ></span
                        >
                        <hr />
                        <strong>{{ totalAmount | currency }}</strong>
                      </div>
                    </template>
                    <template v-if="confirmationSeats.length > 0 && !hasVuelta">
                      <strong class="d-block orange--text">
                        Compra tu pasaje por confirmar
                      </strong>
                      <div
                        class="text-right"
                        v-for="(seat, i) in confirmationSeats"
                        :key="i"
                      >
                        <hr v-if="i === 0" />
                        <span class="d-block body-2">
                          Boleto por confirmar piso {{ seat.piso + 1 }} asiento
                          {{ seat.asiento }}
                          <strong class="d-block">
                            ${{ seat.totalPromo }}
                          </strong>
                        </span>
                        <v-btn
                          color="orange"
                          small
                          class="white--text my-3"
                          @click="confirmationAmount(seat)"
                        >
                          Agregar
                        </v-btn>
                        <hr />
                      </div>
                    </template>
                  </div>
                </v-col>
              </v-row>
              <div class="align-self-end justify-self-end mr-4">
                <v-row class="align-end">
                  <v-col class="d-flex align-end justify-end">
                    <v-btn
                      outlined
                      :disabled="!selectedSeats.length > 0"
                      @click="deleteSeats"
                      >{{ $t('cancel') }}</v-btn
                    >
                  </v-col>
                  <v-col class="d-flex align-end justify-end">
                    <v-btn
                      @click="showModal"
                      class="white--text"
                      color="orange"
                      :disabled="!selectedSeats.length > 0"
                      >{{ $t('continue') }}</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <!-- .Grid end-->
    </v-card>
  </div>
</template>
<script>
import Dialog from '@/views/Services/stepper/List/ContinueDialog'
import ServicesListPanel from '@/components/Banners/ServicesListPanel'
import seat from '@/views/Services/stepper/List/Seat'
import scrollAnimation from '@/helpers/scrollAnimation'
import confirmationAmount from '@/helpers/updateConfirmationTicket'
import { mapGetters } from 'vuex'
import deleteSeat from '@/helpers/deleteSeat'
import API from '@/services/api/seats'
import _ from 'lodash'
// import moment from 'moment'

export default {
  props: ['item', 'isXs', 'back'],
  data() {
    return {
      //confirmationSeats: [],
      seatImageBase: '../../../../../static/logos/seats/',
      seatsImg: [
        { text: 'available_seats', number: '28' },
        { text: 'selected_seats', number: '27' },
        { text: 'reserved_seats', number: '26' }
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
      },
      confirmTicketDialog: false,
      addedSeat: {}
    }
  },
  components: {
    ...mapGetters({
      hasVuelta: ['hasVuelta']
    }),
    seat,
    Dialog,
    ServicesListPanel
  },
  mounted() {
    this.getSeats(this.item)
  },
  watch: {
    item() {
      console.log('watch', this.item)
      this.getSeats(this.item)
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      confirmationSeats: ['seatsWithPromoNotSelected'],
      totalAmount: ['seatsTotalAmount'],
      seatsByTravel: ['seatsByTravel'],
      hasVuelta: ['hasVuelta']
    }),
    getSelectedFloor() {
      const pisos = this.data.pisos
      const selected = this.selectedFloor
      const piso = pisos.filter(item => {
        return item.piso === selected
      })[0]
      console.log('piso', piso)
      return piso
    }
  },
  methods: {
    confirmationAmount,
    confirmationAmountFromDialog() {
      confirmationAmount(this.addedSeat)
    },
    async deleteSeats() {
      const lenght = this.selectedSeats.length - 1
      for (let index = lenght; index >= 0; index--) {
        await deleteSeat(index)
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
          seat[0] === item.asiento //&&
        // moment().diff(moment(item.fechaTomada), 'minutes') < 15
      )
      return index
    },
    closeDialog({ ok }) {
      this.dialog = false
      if (ok) {
        this.$emit('confirm')
      }
    },
    showModal() {
      if (this.hasVuelta) {
        const hasBackServices = this.seatsByTravel(true).length > 0
        const hasGoServices = this.seatsByTravel().length > 0
        if (!hasBackServices && hasGoServices) {
          if (this.$store.state.services.tab === 'tab-Vuelta') {
            this.messageType = true
            this.dialog = true
          } else {
            this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Vuelta' })
            scrollAnimation('#serviceToolbar')
          }
        } else if (hasBackServices && !hasGoServices) {
          if (this.$store.state.services.tab === 'tab-Ida') {
            this.messageType = false
            this.dialog = true
          } else {
            this.$store.dispatch('SET_SERVICE_TAB', { tab: 'tab-Ida' })
            scrollAnimation('#serviceToolbar')
          }
        } else {
          this.$emit('confirm')
        }
      } else {
        this.$emit('confirm')
      }
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
        hasPromo: this.serviceData.pisos[index].confirmation.idaVuelta,
        totalPromo: this.serviceData.pisos[index].confirmation.tarifaTotal,
        tomadoPromo: false,
        descuento: 0
        // fechaTomada: moment.now()
      }
      if (seatIndex > -1) {
        this.leverageSeat(
          { ...floorData, asiento: seat[0], piso },
          seatIndex,
          indexes
        )
      } else {
        this.takeSeat({ ...floorData, asiento: seat[0], piso }, indexes)
      }
    },
    async takeSeat(params, indexes) {
      const seatList = this.seatsByTravel(this.back)
      if (seatList.length > 3) {
        this.$notify({
          group: 'error',
          title: this.$t('seats_max'),
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
      if (!response.data > 0) {
        this.$notify({
          group: 'error',
          title: this.$t('seats'),
          text:
            this.$t('seats_error1') +
            requestParams.asiento +
            this.$t('seats_error2'),
          type: 'error'
        })
        this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]][1] = '1'
        this.$forceUpdate()
      } else {
        const seat = Object.assign({ vuelta: this.back }, params)
        this.$store.dispatch('SET_SEAT', { seat })
        if (seat.hasPromo && !seat.tomadoPromo && !this.hasVuelta) {
          this.confirmTicketDialog = true
          this.addedSeat = seat
        }
      }
    },
    async leverageSeat(params, index, indexes) {
      const requestParams = this.createRequestParams(params)
      await API.freeSeat(requestParams)
      console.log(
        'grilla',
        this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]]
      )
      this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]][1] = '0'
      this.$store.dispatch('DELETE_SEAT', { seat: index })
    },
    createRequestParams(params) {
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
    },
    async getSeats(item) {
      this.floorArray = item.pisos.length > 1 ? [0, 1] : [0]
      this.selectedFloor = item.pisos[0].piso
      this.data = item
      if (this.bus.grilla.length > 0) {
        return
      }
      this.loadingSeats = true
      this.createDataForRequest()
      const mapResponse = await API.getMap({
        idServicio: item.idServicio,
        tipoBusPiso1: item.busPiso1,
        tipoBusPiso2: item.busPiso2,
        fechaServicio: item.fechaServicio,
        idOrigen: item.idTerminalOrigen,
        idDestino: item.idTerminalDestino,
        integrador: item.integrador
      })
      this.map = mapResponse.data
      await this.getAvailability()
    },
    async getAvailability() {
      const availabilityResponse = await API.getAvailability({
        idServicio: this.item.idServicio,
        tipoBusPiso1: this.item.busPiso1,
        tipoBusPiso2: this.item.busPiso2,
        fechaServicio: this.item.fechaServicio,
        idOrigen: this.item.idTerminalOrigen,
        idDestino: this.item.idTerminalDestino,
        integrador: this.item.integrador
      })
      const availability = availabilityResponse.data
      const floors = Object.keys(this.map)
      console.log('availability', availability)
      console.log('map', this.map)
      console.log('floors', floors)
      let grilla = []
      const map = JSON.parse(JSON.stringify(this.map))
      floors.forEach((key, iFloor) => {
        map[key] = this.map[key].map(row => {
          const newRow = row.map(olditem => {
            let item = olditem
            if (item === 'null') {
              item = null
            }
            let seat = item
            if (
              item !== null &&
              item !== 'X' &&
              item !== '%' &&
              !item.includes('B')
            ) {
              seat = []
              seat.push(item)
              const index = parseInt(item)
              seat.push(availability[iFloor].substring(index - 1, index))
            }
            return seat
          })
          return newRow
        })
        grilla.push({ floor: key, grid: map[key] })
      })
      console.log('grilla', grilla)
      this.bus = { grilla }
      this.loadingSeats = false
    },
    async reloadAvailability(floor) {
      this.loadingSeats = true
      this.selectedFloor = floor
      await this.getAvailability()
    }
  }
}
</script>
<style scoped>
.promotion-advice-floor {
  position: absolute;
  width: 200px;
  top: 57px;
  left: -67px;
  transform: rotate(-65deg);
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
