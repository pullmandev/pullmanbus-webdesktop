<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1 pl-4 pb-10 rounded-search-box">
        <v-card-text>
          <v-card-text>
            <h3 class="headline pt-3">{{ $t('passenger_data') }}</h3>
          </v-card-text>
          <v-row class="pt-3">
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">{{ $t('name') }}</span>
                  <h3 class="py-2 body-2">{{ payment_info.completeName }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">{{ $t('email') }}</span>
                  <h3 class="py-2 body-2">{{ payment_info.email }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">{{ $t('mobile') }}</span>
                  <h3 class="py-2 body-2">
                    {{
                      payment_info.movil != null
                        ? '+569 ' + payment_info.movil
                        : 'Sin móvil'
                    }}
                  </h3>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">Rut</span>
                  <h3 class="py-2 body-2">{{ payment_info.rut }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card-text>
            <h3 class="capitalize">{{ $t('one_reservation') }}</h3>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :items="getSeatWithId"
            item-key="id"
            class="elevation-0"
            hide-default-footer
          >
            <template slot="item" slot-scope="props">
              <tr>
                <td>
                  <h3>{{ props.item.terminalSalida }}</h3>
                </td>
                <td>
                  <h3>{{ props.item.terminalLlegada }}</h3>
                </td>
                <td>
                  <h3>{{ props.item.fecha }}</h3>
                </td>
                <td>
                  <h3>{{ props.item.horaSalida }}</h3>
                </td>
                <td>
                  <h3>
                    {{
                      props.item.piso > 0
                        ? parseInt(props.item.asiento) + 20
                        : props.item.asiento
                    }}
                  </h3>
                </td>
                <td>
                  <h3>
                    {{ '0' + (parseInt(props.item.piso) + 1).toString() }}
                  </h3>
                </td>
                <td>
                  <h3>${{ props.item.precio }}</h3>
                </td>
                <td>
                  <v-btn
                    text
                    color="error"
                    @click="deleteSelected(props.item)"
                    :disabled="deleting"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="mt-12">
          <v-spacer></v-spacer>
          <v-btn
            color="orange"
            :disabled="selectedSeats.length <= 0"
            class="white--text mr-5"
            @click="validateSeats"
            >{{ $t('continue') }}</v-btn
          >
          <v-btn
            text
            class="grey--text"
            @click="$store.dispatch('SET_STEP', { step: 1 })"
            >{{ $t('cancel') }}</v-btn
          >
        </v-card-actions>
      </v-card>
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
    }
  },
  methods: {
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
      this.$router.push({ name: 'Payment' })
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
        { text: this.$t('from_city2'), value: 'terminalSalida' },
        { text: this.$t('to_city2'), value: 'terminalLlegada' },
        { text: this.$t('from_date2'), value: 'fecha' },
        { text: this.$t('departure_hour'), value: 'horaSalida' },
        { text: this.$t('seat'), value: 'asiento' },
        { text: this.$t('floor'), value: 'piso' },
        { text: this.$t('price'), value: 'precio' },
        { text: '', value: '' }
      ]
    }
  }
}
</script>
