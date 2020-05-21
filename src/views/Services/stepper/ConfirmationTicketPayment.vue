<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1 pl-4 pb-10 rounded-search-box">
        <v-card-text>
          <v-card-text>
            <h3 class="headline pt-3">{{ $t('passenger_data') }}</h3>
          </v-card-text>
          <v-card-text>
            <h3 v-if="hasVuelta">
              {{ $t('two_reservation') }}
            </h3>
            <h3 v-else class="capitalize">{{ $t('one_reservation') }}</h3>
          </v-card-text>
          <div v-for="(item, i) in getSeatWithId" :key="i">
            <v-data-table
              :headers="headers"
              :items="[item]"
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
            <div class="text-left mt-5">
              <strong class="d-block orange--text">
                Compra tu pasaje por confirmar
              </strong>
              <hr />
              <div class="d-flex justify-space-between align-center">
                <span class="d-block body-2 ml-6">
                  Boleto por confirmar
                  <strong> ${{ item.totalPromo }} </strong>
                </span>
                <v-btn
                  color="orange"
                  small
                  class="white--text my-3"
                  @click="confirmationAmount(item)"
                >
                  Agregar
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="mt-12">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="grey--text"
            @click="$router.push({ name: 'List' })"
            >{{ $t('cancel') }}</v-btn
          >
          <v-btn
            color="orange"
            :disabled="selectedSeats.length <= 0"
            class="white--text mr-5"
            @click="$router.push({ name: 'ServicesPaymentData' })"
            >{{ $t('continue') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import deleteSeat from '@/helpers/deleteSeat'
import confirmationAmount from '@/helpers/updateConfirmationTicket'

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
    confirmationAmount,
    async deleteSelected(item) {
      this.deleting = true
      const index = this.findSeatIndex(item.id)
      if (index > -1) {
        await deleteSeat(index)
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
  watch: {
    selectedSeats(list) {
      if (list.length <= 0) {
        this.$router.push({ name: 'ServicesPaymentData' })
      }
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seatsWithPromo'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching'],
      hasVuelta: ['hasVuelta']
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
        {
          text: this.$t('from_city2'),
          value: 'terminalSalida',
          sortable: false
        },
        {
          text: this.$t('to_city2'),
          value: 'terminalLlegada',
          sortable: false
        },
        { text: this.$t('from_date2'), value: 'fecha', sortable: false },
        {
          text: this.$t('departure_hour'),
          value: 'horaSalida',
          sortable: false
        },
        { text: this.$t('seat'), value: 'asiento', sortable: false },
        { text: this.$t('floor'), value: 'piso', sortable: false },
        { text: this.$t('price'), value: 'precio', sortable: false },
        { text: '', value: '', sortable: false }
      ]
    }
  }
}
</script>
