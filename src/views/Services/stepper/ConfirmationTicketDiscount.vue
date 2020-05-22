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
          <v-row
            class="pt-3"
            v-if="payment_info.email && payment_info.email !== ''"
          >
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
              </tr>
            </template>
          </v-data-table>
          <h3
            class="headline ml-3 mt-12 mb-6"
            v-if="seatsWithPromoNotSelected.length > 0"
          >
            Boletos por confirmar
          </h3>
          <div v-for="(item, i) in seatsWithPromoNotSelected" :key="i">
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
import routeWithScroll from '@/helpers/routeWithScroll'
import confirmationAmount from '@/helpers/updateConfirmationTicket'

export default {
  data() {
    return {
      name: '',
      rut: '',
      email: ''
    }
  },
  methods: {
    routeWithScroll,
    confirmationAmount
  },
  computed: {
    ...mapGetters({
      seatsWithPromoNotSelected: ['seatsWithPromoNotSelected'],
      selectedSeats: ['seatsWithPromo'],
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
<style scoped>
.confirmation-promotion-advice {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
  transform: rotate(-60deg);
}
</style>
