<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1 pl-4 pb-10 rounded-search-box">
        <div
          class="white--text text-left orange passenger-data-advice"
          v-if="!hasVuelta"
        >
          <span class="ml-10">
            Horario en promoción
          </span>
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
            <h3 v-if="hasVuelta">
              {{ $t('two_reservation') }}
            </h3>
            <h3 v-else class="capitalize">{{ $t('one_reservation') }}</h3>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :items="selectedSeats"
            :expanded="selectedSeats"
            :sort-by="['fechaSubida', 'horaSalida']"
            :sort-desc="[false, false]"
            item-key="id"
            class="elevation-0"
            show-expand
            hide-default-footer
            :single-expand="false"
          >
            <template slot="item" slot-scope="props">
              <tr>
                <td style="overflow: hidden; max-width: 70px" class="pa-0">
                  <div
                    v-if="props.item.tomadoPromo"
                    class="orange confirmation-promotion-advice"
                  />
                </td>
                <td>
                  <h3>{{ props.item.vuelta ? 'VUELTA' : 'IDA' }}</h3>
                </td>
                <td class="px-2">
                  <span style="0.7rem">{{ props.item.terminalOrigen }}</span>
                </td>
                <td class="px-2">
                  <span style="0.7rem">{{ props.item.terminalDestino }}</span>
                </td>
                <td>
                  <span style="0.7rem">{{ props.item.fechaSubida }}</span>
                </td>
                <td>
                  <span style="0.7rem">{{ props.item.horaSalida }}</span>
                </td>
                <td>
                  <span>
                    {{ props.item.servicioNombre }}
                  </span>
                </td>
                <td class="text-center">
                  <h3>
                    {{
                      props.item.piso > 0
                        ? parseInt(props.item.asiento) + 20
                        : props.item.asiento
                    }}
                  </h3>
                </td>
                <td v-if="!hasVuelta" class="text-center">
                  <h3>
                    {{ props.item.tomadoPromo ? 'Si' : 'No' }}
                  </h3>
                </td>
                <td>
                  <h3>
                    ${{
                      props.item.tomadoPromo
                        ? props.item.totalPromo
                        : props.item.precio
                    }}
                  </h3>
                </td>
                <td>
                  <v-btn
                    text
                    color="orange"
                    @click="deleteSelected(props.item)"
                    :disabled="deleting"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    v-if="
                      props.item.hasPromo &&
                        !props.item.tomadoPromo &&
                        !hasVuelta
                    "
                    text
                    @click="props.expand(!props.isExpanded)"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>

            <template v-slot:expanded-item="props">
              <td
                :colspan="props.headers.length"
                v-if="
                  !props.item.tomadoPromo && props.item.hasPromo && !hasVuelta
                "
              >
                <v-row>
                  <v-col cols="8" md="8" sm="12">
                    <strong class="orange--text">
                      {{ setBannerText(props.item) }}
                    </strong>
                  </v-col>
                  <v-col
                    cols="4"
                    md="4"
                    sm="12"
                    class="pt-0 d-flex justify-end"
                  >
                    <v-btn
                      color="orange"
                      small
                      class="white--text my-3"
                      @click="confirmationAmount(props.item)"
                    >
                      Agregar
                    </v-btn>
                  </v-col>
                </v-row>
              </td>
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
            :disabled="selectedSeats.length <= 0"
            class="white--text mr-5"
            @click="routeWithScroll('#paymentStepper', 'Payment')"
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
    routeWithScroll,
    confirmationAmount,
    async deleteSelected(seat) {
      this.deleting = true
      const index = this.selectedSeats.findIndex(item => item.id === seat.id)
      if (index > -1) {
        await deleteSeat(index)
      }
      this.deleting = false
    },
    setBannerText(seat) {
      const content = this.banner[0].contenido
      const price =
        parseInt(seat.totalPromo.split('.').join('')) -
        parseInt(seat.tarifa.split('.').join(''))
      const priceText = this.$filters.currency(price)
      let result = content
      if (content.includes('${1}')) {
        result = content.replace('${1}', priceText)
      }
      return result
    }
  },
  computed: {
    ...mapGetters({
      seatsWithPromoNotSelected: ['seatsWithPromoNotSelected'],
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching'],
      hasVuelta: ['hasVuelta'],
      banner: ['getServicePaymentBanners']
    }),
    headers() {
      let result = [
        { text: 'Tipo de viaje', value: 'vuelta' },
        {
          text: this.$t('from_city2'),
          value: 'terminalOrigen',
          sortable: false
        },
        {
          text: this.$t('to_city2'),
          value: 'terminalLlegada',
          sortable: false
        },
        { text: this.$t('from_date2'), value: 'fechaSubida', sortable: false },
        {
          text: this.$t('departure_hour'),
          value: 'horaSalida',
          sortable: false
        },
        { text: this.$t('service'), value: 'servicioNombre', sortable: false },
        { text: this.$t('seat'), value: 'asiento', sortable: false },
        { text: this.$t('price'), value: 'precio', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false }
      ]
      if (!this.hasVuelta) {
        result.splice(7, 0, {
          text: 'Promoción',
          value: 'tomadoPromo',
          sortable: true
        })
      }
      return result
    }
  }
}
</script>
<style>
.confirmation-promotion-advice {
  width: 90px;
  height: 10px;
  transform: rotate(-60deg);
}

.passenger-data-advice {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
  transform: rotate(-58deg);
  font-size: 0.7rem !important;
}
</style>
