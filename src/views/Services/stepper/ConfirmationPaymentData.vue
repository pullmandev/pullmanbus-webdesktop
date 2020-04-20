<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text
              ><h3 class="capitalize" v-lang.passenger_data></h3
            ></v-card-text>
          </v-flex>
          <v-layout row wrap class="pl-4 pt-3">
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  {{ translate('name') }}
                  <h3 class="py-3">{{ payment_info.completeName }}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  {{ translate('email') }}
                  <h3 class="py-3">{{ payment_info.email }}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  {{ translate('mobile') }}
                  <h3 class="py-3">
                    {{
                      payment_info.movil != null
                        ? '+569 ' + payment_info.movil
                        : 'Sin móvil'
                    }}
                  </h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex pa-1 xs12 sm3>
              <v-card class="elevation-0">
                <v-card-text>
                  Rut
                  <h3 class="py-3">{{ payment_info.rut }}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <!-- Card date Ticket -->
      <v-card class="elevation-1 mt-5">
        <v-card-text>
          <v-flex xs12 class="pt-3 pl-4">
            <v-card-text
              ><h3 class="capitalize" v-lang.one_reservation></h3
            ></v-card-text>
          </v-flex>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :items="getSeatWithId"
          item-key="id"
          class="elevation-1"
          hide-default-footer
        >
          <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
              <span slot="activator">
                {{ props.header.text }}
              </span>
              <span>
                {{ props.header.text }}
              </span>
            </v-tooltip>
          </template>
          <template slot="items" slot-scope="props">
            <!-- <td>
              <v-checkbox
                primary
                hide-details
                v-model="props.selected"
              ></v-checkbox>
            </td> -->
            <td class="text-xs-right">
              <h3>{{ props.item.terminalSalida }}</h3>
            </td>
            <td class="text-xs-right">
              <h3>{{ props.item.terminalLlegada }}</h3>
            </td>
            <td class="text-xs-right">
              <h3>{{ props.item.fecha }}</h3>
            </td>
            <td class="text-xs-right">
              <h3>{{ props.item.horaSalida }}</h3>
            </td>
            <td class="text-xs-right">
              <h3>
                {{
                  props.item.piso > 0
                    ? parseInt(props.item.asiento) + 20
                    : props.item.asiento
                }}
              </h3>
            </td>
            <td class="text-xs-right">
              <h3>{{ '0' + (parseInt(props.item.piso) + 1).toString() }}</h3>
            </td>
            <td class="text-xs-right">
              <h3>${{ props.item.precio }}</h3>
            </td>
            <td class="text-xs-right">
              <v-btn
                flat
                color="error"
                @click="deleteSelected(props.item)"
                :disabled="deleting"
              >
                <v-icon>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <!-- <template slot="footer">
            <td colspan="100%" class="text-xs-right">
              <v-btn color="error" :disabled="selected.length <= 0" @click="deleteSelected"
                :class="selected.length > 0 ? 'fadeIn' : 'fadeOut'" v-lang.delete></v-btn>
            </td>
          </template> -->
        </v-data-table>
      </v-card>
      <div class="mt-5">
        <v-btn
          color="primary"
          :disabled="selectedSeats.length <= 0"
          class="white--text"
          @click="validateSeats"
          v-lang.continue
        ></v-btn>
        <v-btn
          style="background-color:#a0a0a0;"
          class="white--text"
          @click="$store.dispatch('SET_STEP', { step: 1 })"
          v-lang.cancel
        ></v-btn>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import API from '@/services/api/seats'
import _ from 'lodash'

export default {
  data() {
    return {
      name: '',
      rut: '',
      email: '',
      deleting: false
      // selected: []
    }
  },
  methods: {
    // async deleteSelected () {
    //   for (let item of this.selected) {
    //     const index = this.findSeatIndex(item.id)
    //     if (index > -1) {
    //       const params = this.selectedSeats[index]
    //       const requestParams = this.createRequestParams(params)
    //       await API.freeSeat(requestParams)
    //       await this.awaitForDeletion(index)
    //     }
    //   }
    //   this.selected = []
    // },
    async deleteSelected(item) {
      this.deleting = true
      const index = this.findSeatIndex(item.id)
      if (index > -1) {
        const params = this.selectedSeats[index]
        const requestParams = this.createRequestParams(params)
        await API.freeSeat(requestParams)
        this.$store.dispatch('DELETE_SEAT', { seat: index })
      }
      this.deleting = false
    },
    awaitForDeletion(index) {
      this.$store.dispatch('DELETE_SEAT', { seat: index })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
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
    findSeatIndex(id) {
      const index = this.selectedSeats.findIndex(
        item => id === item.servicio + item.piso + item.asiento
      )
      return index
    },
    async validateSeats() {
      this.$store.dispatch('SET_STEP', { step: 3 })
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching']
    }),
    getSeatWithId() {
      const result = this.selectedSeats.map(seat => {
        const id = seat.servicio + seat.piso + seat.asiento
        return { ...seat, id }
      })
      return result
    },
    getSeatInfo() {
      let seatsList = ''
      this.selectedSeats.forEach((seat, index) => {
        const seatByFloor = seat.piso > 0 ? `${seat.asiento}P2` : seat.asiento
        const dot = index === 0 ? '' : '-'
        seatsList = `${seatsList} ${dot} ${seatByFloor}`
      })
      return {
        fromCity: this.searching.from_city.nombre,
        toCity: this.searching.to_city.nombre,
        fecha: this.selectedSeats[0].fecha,
        hora: this.selectedSeats[0].horaSalida,
        terminalSalida: this.selectedSeats[0].terminalSalida,
        terminalLlegada: this.selectedSeats[0].terminalLlegada,
        seats: seatsList
      }
    },
    headers() {
      return [
        { text: this.translate('from_city2'), value: 'terminalSalida' },
        { text: this.translate('to_city2'), value: 'terminalLlegada' },
        // { text: 'Origen', value: 'fat' },
        // { text: 'Destino', value: 'carbs' },
        { text: this.translate('from_date2'), value: 'fecha' },
        { text: this.translate('departure_hour'), value: 'horaSalida' },
        { text: this.translate('seat'), value: 'asiento' },
        { text: this.translate('floor'), value: 'piso' },
        { text: this.translate('price'), value: 'precio' },
        { text: '', value: '' }
      ]
    }
  }
}
</script>
