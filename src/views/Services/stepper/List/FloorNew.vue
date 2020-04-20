<template>
  <div>
    <Dialog :open="dialog" :type="messageType" @close="closeDialog" />
    <v-card flat class="ml-4 mr-4">
      <v-card class="hideAsientos">
        <v-card flat class="mt-3">
          <!-- Grilla de asientos -->
          <v-card-text>
            <div v-if="loadingSeats" style="text-align: center">
              <v-progress-circular
                indeterminate
                :size="50"
                color="primary"
              ></v-progress-circular>
            </div>
            <v-container
              v-else-if="bus.grilla.length > 0"
              :class="{ 'pa-0': isXs }"
            >
              <v-layout row wrap>
                <v-flex xs12 md2>
                  <v-layout row wrap>
                    <v-flex v-for="(item, index) in data.pisos" :key="index">
                      <v-btn
                        :outline="selectedFloor !== item.piso"
                        dark
                        color="primary"
                        @click="reloadAvailability(item.piso)"
                      >
                        {{ translate('floor') }} {{ item.piso + 1 }}
                      </v-btn>
                    </v-flex>
                    <v-flex xs12>
                      <h3 class="mt-4 mb-2">
                        {{ translate('price') }}: ${{
                          getSelectedFloor.tarifaInternet
                        }}
                      </h3>
                    </v-flex>
                    <v-flex xs12>
                      <h3>
                        {{ translate('service') }}:
                        {{ getSelectedFloor.servicio }}
                      </h3>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12 md10>
                  <div>
                    <h2 class="text-xs-center mb-1">
                      {{ translate('floor') }} {{ selectedFloor + 1 }}
                    </h2>
                    <v-layout row wrap justify-center>
                      <v-flex
                        xs12
                        sm12
                        md12
                        lg10
                        class="text-xs-center mb-4 border-bus"
                      >
                        <v-layout
                          :column="isXs"
                          :class="{ 'd-inline-block': isXs }"
                          v-for="(col, i) in bus.grilla[selectedFloor].grid"
                          :key="i"
                        >
                          <!-- acá tengo las columnas del bus (son 5)-->
                          <v-flex
                            xs1
                            class="text-xs-center mt-1"
                            style="margin-right: 1rem"
                            v-for="(seat, j) in col"
                            :key="j"
                          >
                            <!-- Acà voy a ir obteniendo los asientos de atras hacia adelante de una de las 5 columnas-->
                            <!-- <template > -->
                            <template v-if="seat !== null">
                              <!-- baño -->
                              <template v-if="seat.includes('B')">
                                <div class="my-1">
                                  <img
                                    src="static/imgs/grid/wc.svg"
                                    alt=""
                                    class="wcSize"
                                  />
                                </div>
                              </template>
                              <div
                                v-else-if="seat === 'X' || seat === '%'"
                                style="height: 33px; width: 33px;"
                              />
                              <v-btn
                                v-else-if="
                                  seatIsInshoppingCart(seat, selectedFloor) > -1
                                "
                                fab
                                small
                                class="mx-0 my-0 seatBtn"
                                color="light-green accent-4"
                                @click="selectSeat(seat, selectedFloor, [i, j])"
                              >
                                <seat
                                  :seatNumber="seat[0]"
                                  :selectedNumber="seat[0]"
                                  :floor="selectedFloor"
                                  type="desktop"
                                />
                              </v-btn>
                              <v-btn
                                v-else-if="seat[1] !== '0'"
                                fab
                                small
                                class="mx-0 my-0 seatBtn"
                                style="background-color: var(--var-red) !important;"
                                disabled
                              >
                                <seat
                                  :seatNumber="seat[0]"
                                  :floor="selectedFloor"
                                  type="desktop"
                                />
                              </v-btn>
                              <v-btn
                                v-else
                                fab
                                flat
                                class="mx-0 my-0 seatBtn"
                                small
                                @click="selectSeat(seat, selectedFloor, [i, j])"
                              >
                                <seat
                                  :seatNumber="seat[0]"
                                  type="desktop"
                                  :floor="selectedFloor"
                                />
                              </v-btn>
                            </template>
                            <!-- </template> -->
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <!-- .Grid end-->
        </v-card>
        <v-layout row class="mb-3">
          <v-flex md5 class="displayNoneSm">
            <span class="d-block mb-1"
              ><v-icon>event_seat</v-icon>
              {{ translate('available_seats') }}</span
            >
            <span class="d-block mb-1"
              ><v-icon color="light-green accent-4">event_seat</v-icon>
              {{ translate('selected_seats') }}</span
            >
            <span class="d-block"
              ><v-icon color="error">event_seat</v-icon>
              {{ translate('reserved_seats') }}</span
            >
          </v-flex>
          <v-flex md2 offset-md0 xs4 offset-xs4>
            <v-btn
              @click="showModal"
              class="right font white--text mt-5 mr-5"
              color="error"
              :disabled="!selectedSeats.length > 0"
              v-lang.continue
            ></v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
  </div>
</template>
<script>
import Dialog from '@/views/services/stepper/List/ContinueDialog'
import { mapGetters } from 'vuex'
import API from '@/services/api/seats'
import _ from 'lodash'
import seat from '@/views/services/stepper/List/Seat'

export default {
  props: ['item', 'expanded', 'isXs', 'back'],
  data() {
    return {
      dialog: false,
      messageType: false,
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
    seat,
    Dialog
  },
  mounted() {
    // console.log('fromMounted')
    this.getSeats(this.item, this.expanded)
  },
  watch: {
    item() {
      console.log('watch')
      this.getSeats(this.item, this.expanded)
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
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
          seat[0] === item.asiento
      )
      return index
    },
    closeDialog({ ok, type }) {
      this.dialog = false
      if (ok) {
        this.$emit('confirm')
      } else {
        const tab = type ? 'Vuelta' : 'Ida'
        this.$store.dispatch('SET_SERVICE_TAB', { tab })
      }
    },
    showModal() {
      if (this.hasVuelta) {
        const hasBackServices = this.seatsByTravel(true).length > 0
        const hasGoServices = this.seatsByTravel().length > 0
        if (!hasBackServices && hasGoServices) {
          this.messageType = true
          this.dialog = true
        } else if (hasBackServices && !hasGoServices) {
          this.messageType = false
          this.dialog = true
        } else {
          this.$emit('confirm')
        }
      } else {
        this.$emit('confirm')
      }
    },
    selectSeat(seat, piso, indexes) {
      const index = this.data.pisos.length > 1 ? this.selectedFloor : 0
      const seatIndex = this.seatIsInshoppingCart(seat, piso)
      const floorData = {
        ...this.serviceData,
        servicioNombre: this.serviceData.pisos[index].servicio,
        tarifa: this.serviceData.pisos[index].tarifaInternet,
        monto: this.serviceData.pisos[index].tarifaInternet,
        precio: this.serviceData.pisos[index].tarifaInternet,
        clase: this.serviceData.pisos[index].clase,
        bus: this.serviceData.pisos[index].busPiso,
        descuento: 0
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
      console.log('seatList', seatList)
      if (seatList.length > 3) {
        this.$notify({
          group: 'error',
          title: this.translate('seats_max'),
          type: 'error'
        })
        return
      }
      this.$notify({
        group: 'load',
        title: this.translate('taking_seat'),
        type: 'info'
      })
      const requestParams = this.createRequestParams(params)
      const response = await API.takeSeat(requestParams)
      if (!response.data > 0) {
        this.$notify({
          group: 'error',
          title: this.translate('seats'),
          text:
            this.translate('seats_error1') +
            requestParams.asiento +
            this.translate('seats_error2'),
          type: 'error'
        })
        this.bus.grilla[params.piso].grid[indexes[0]][indexes[1]][1] = '1'
        this.$forceUpdate()
      } else {
        const seat = Object.assign({ vuelta: this.back }, params)
        this.$store.dispatch('SET_SEAT', { seat })
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
    async getSeats(item, expanded) {
      this.selectedFloor = item.pisos[0].piso
      this.data = item
      if (!expanded) {
        return
      }
      if (this.bus.grilla.length > 0) {
        return
      }
      this.loadingSeats = true
      console.log(item)
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
      console.log({
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
@media (max-width: 400px) {
  .container {
    padding: 0px !important;
  }
}
.wcSize {
  width: 30px;
  fill: grey;
}
</style>
