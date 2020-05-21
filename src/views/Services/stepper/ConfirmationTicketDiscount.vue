<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1 pl-4 pb-10 rounded-search-box">
        <div class="white--text text-left orange confirmation-promotion-advice">
          <span class="ml-8 caption">Servicio con dcto %!</span>
        </div>
        <v-card-text>
          <v-card-text>
            <h3 class="headline pt-3">{{ $t('passenger_data') }}</h3>
          </v-card-text>
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
                  <h3>{{ props.item.vuelta ? 'VUELTA' : 'IDA' }}</h3>
                </td>
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
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="mt-12">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="grey--text"
            @click="routeWithScroll('#paymentStepper', 'List')"
            >{{ $t('cancel') }}</v-btn
          >
          <v-btn
            color="orange"
            class="white--text mr-5"
            @click="routeWithScroll('#paymentStepper', 'ServicesPaymentData')"
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
import routeWithScroll from '@/helpers/routeWithScroll'

export default {
  methods: {
    routeWithScroll,
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
      const index = this.seatsWithPromo.findIndex(
        item => id === item.servicio + item.piso + item.asiento
      )
      return index
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching']
    }),
    seatsWithPromo() {
      return this.selectedSeats.filter(item => item.tomadoPromo)
    },
    getSeatWithId() {
      const result = this.seatsWithPromo.map(seat => {
        const id = seat.servicio + seat.piso + seat.asiento
        return { ...seat, id }
      })
      return result
    },
    headers() {
      return [
        { text: 'Tipo de viaje', value: 'vuelta' },
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
        { text: this.$t('price'), value: 'precio', sortable: false }
      ]
    }
  }
}
</script>
<style scoped>
.confirmation-promotion-advice {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
  transform: rotate(-60deg);
}
</style>
