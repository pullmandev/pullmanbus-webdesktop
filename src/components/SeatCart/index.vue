<template>
  <v-dialog
    v-model="seatCart"
    overlay-color="blue_dark"
    content-class="seatCart"
    :max-width="1200"
  >
    <v-card class="rounded-search-box pb-6 pt-3">
      <div class="float-right">
        <v-btn
          max-width="25px"
          max-height="25px"
          fab
          class="white--text mt-2 mr-4 elevation-1"
          color="orange"
          @click="seatCart = false"
          ><v-icon color="white">clear</v-icon>
        </v-btn>
      </div>
      <v-card-text>
        <v-card-text>
          <h3 class="headline pt-3">{{ $t('passenger_data') }}</h3>
        </v-card-text>
        <v-data-table
          :headers="headers"
          :items="selectedSeats"
          :sort-by="['fechaSubida', 'horaSalida']"
          :sort-desc="[false, false]"
          item-key="id"
          class="elevation-0"
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
                      ? parseInt(props.item.asiento)
                      : props.item.asiento
                  }}
                </h3>
              </td>
              <td v-if="!hasVuelta" class="text-center">
                <h3>
                  {{ props.item.tomadoPromo ? 'Si' : 'No' }}
                </h3>
              </td>
              <td class="base-price">
                <h3>{{ getTarifaNormal(props.item) }}</h3>
              </td>
              <td class="d-flex align-center" style="font-weight: bold;">
                <h3 class="blue_dark--text" style="font-size: 1.4rem">
                  ${{ getFinalPrice(props.item) }}
                </h3>
                <img
                  src="../../../static/logos/icono_por_ciento.svg"
                  alt="percentage_logo"
                  height="25px"
                />
              </td>
              <td>
                <v-btn
                  text
                  color="orange"
                  @click="clear(props.item)"
                  :disabled="deleting"
                  v-if="props.item.tipo != 'pet'"
                >
                  <v-icon>clear</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMixin } from '@/helpers/seatsUtils'

export default {
  mixins: [getMixin()],
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      deleting: false
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
    seatCart: {
      get() {
        return this.open
      },
      set(value) {
        this.$emit('update:open', value)
      }
    },

    headers() {
      let result = [
        { text: '', value: '' },
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
        {
          text: this.$t('normal_price'),
          value: 'tarifaNormal',
          sortable: false
        },
        { text: this.$t('final_price'), value: 'precio', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false }
      ]
      if (!this.hasVuelta) {
        result.splice(7, 0, {
          text: 'Promoción',
          value: 'tomadoPromo',
          sortable: false
        })
      }
      return result
    }
  },
  methods: {
    async clear(seat) {
      this.deleting = true
      await this.deleteSelected(seat, this.selectedSeats)
      this.deleting = false
    }
  }
}
</script>
<style lang="scss" scoped src="./SeatCart.scss"></style>
