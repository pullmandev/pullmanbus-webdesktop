<template>
  <v-container class="center">
    <v-card class="elevation-10 pt-5 pb-5">
      <v-container fluid>
        <v-row class="confirmation-title blue_dark--text">
          <v-col cols="12" md="12" lg="12">
            <h1>{{ $t('congratulations') }}</h1>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <p>{{ $t('success_buy') }}</p>
          </v-col>

          <v-col cols="12" class="d-flex justify-center">
            <div
              class="page-icon text-center d-flex align-center justify-center"
            >
              <v-icon size="70" class="white--text">check</v-icon>
            </div>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <h3 class="mb-2">Datos de la compra:</h3>

            <v-data-table
              class="elevation-1"
              :headers="headers"
              :items="[data]"
              item-key="name"
            >
              <template slot="item" slot-scope="props">
                <td class="text-left">{{ codigo }}</td>
                <td class="text-left">Pullman bus</td>
                <td class="text-left">Peso Chileno</td>
                <td class="text-left">
                  {{ props.item.montoFormateado }}
                </td>
                <td class="text-left">
                  {{ props.item.codigoTransbank }}
                </td>
                <td class="text-left">{{ fechaFormateada }}</td>
                <td class="text-left">
                  {{ props.item.tipoPagoFormateado }}
                </td>
                <td class="text-left">{{ props.item.numeroCuota }}</td>
                <td class="text-left">{{ props.item.numeroTarjeta }}</td>
              </template>
            </v-data-table>
          </v-col>

          <v-col v-if="download" cols="12" md="12" lg="12">
            <v-data-table
              class="elevation-1 my-5 rounded-search-box"
              :headers="ticketsHeaders"
              :items="tickets"
              :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-chevron-double-left',
                lastIcon: 'mdi-chevron-double-right'
              }"
              :loading="tickets.length === 0"
              :loading-text="$t('Loading... Please wait')"
            >
              <template slot="item" slot-scope="props">
                <tr>
                  <td class="text-center">{{ props.item.boleto }}</td>
                  <td class="text-center">
                    {{ props.item.fechaHoraSalida }}
                  </td>
                  <td class="text-center">
                    {{ props.item.nombreTerminalOrigen }}
                  </td>
                  <td class="text-center">
                    {{ props.item.nombreTerminalDestino }}
                  </td>
                  <td class="text-center">{{ props.item.asiento }}</td>
                  <td class="text-center">{{ props.item.total }}</td>
                  <td class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          text
                          icon
                          dark
                          color="blue_dark"
                          v-bind="attrs"
                          v-on="on"
                          @click="downloaderTicket(props.item.boleto)"
                        >
                          <i class="material-icons">get_app</i>
                        </v-btn>
                      </template>
                      <span>{{ $t('download') }}</span>
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>

          <v-col class="d-flex justify-end">
            <v-btn
              class="mt-5"
              outlined
              @click="$router.push({ name: 'home' })"
            >
              {{ $t('back') }}
            </v-btn>

            <v-btn
              class="download white--text mt-5 ml-3"
              color="blue_dark"
              @click="getTickets()"
              :disabled="download"
            >
              {{ $t('download') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import apiTransaction from '@SERVICES/api/transaction'
import apiCancel from '@SERVICES/api/cancel'
import { getPdf } from '@SERVICES/getPdf'
import moment from 'moment'

export default {
  name: 'Voucher',

  data() {
    return {
      download: false,
      tickets: [],
      codigo: '',
      data: {},
      headers: [
        { text: 'Orden de Compra', sortable: false },
        { text: 'Comercio', sortable: false },
        { text: 'Moneda', sortable: false },
        { text: 'Monto', sortable: false },
        { text: 'Código Transacción', sortable: false },
        { text: 'Fecha', sortable: false },
        { text: 'Tipo de pago', sortable: false },
        { text: 'Cuotas', sortable: false },
        { text: 'N. Tarjeta', sortable: false }
      ],
      ticketsHeaders: [
        {
          text: this.$t('ticket'),
          align: 'center',
          sortable: false,
          value: 'boleto',
          class: 'purchase-table-header'
        },
        {
          text: this.$t('date'),
          value: 'fechaHoraSalida',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('from_city2'),
          value: 'nombreTerminalOrigen',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('to_city2'),
          value: 'nombreTerminalDestino',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('seat'),
          value: 'asiento',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('value'),
          value: 'total',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: '',
          value: 'actions',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        }
      ]
    }
  },

  mounted() {
    this.codigo = this.$route.params.id
    this.getTransaction()
  },

  computed: {
    fechaFormateada() {
      moment.locale(this.$i18n.locale)
      return moment(this.data.fechaCompra).format('L')
    }
  },

  methods: {
    async getTransaction() {
      const { data } = await apiTransaction.postHeader({ orden: this.codigo })
      console.log(data)
      this.data = data
    },

    async getTickets() {
      this.download = true

      this.$notify({
        group: 'load',
        title: this.$t('get_ticket'),
        type: 'info'
      })

      try {
        const { data } = await apiCancel.searchTicket({ codigo: this.codigo })
        console.log(data)
        this.tickets = data.map(item => {
          const { fechaHoraSalida } = item.imprimeVoucher
          const dateNumber = fechaHoraSalida.slice(0, 8)
          const hourNumber = fechaHoraSalida.slice(8, fechaHoraSalida.length)
          const date = moment(dateNumber).format('DD/MM/YYYY')
          const hour = `${hourNumber.slice(0, 2)}:${hourNumber.slice(2, 4)}`

          item.fechaHoraSalida = date + ' ' + hour
          item.nombreTerminalOrigen = item.imprimeVoucher.nombreTerminalOrigen
          item.nombreTerminalDestino = item.imprimeVoucher.nombreTerminalDestino
          item.asiento = item.imprimeVoucher.asiento
          item.total = item.imprimeVoucher.total.includes('.')
            ? `$ ${item.imprimeVoucher.total}`
            : this.$filters.currency(item.imprimeVoucher.total)

          return item
        })
      } catch (error) {
        console.error('ERROR-GET-TICKETS ->', error.message)

        this.$notify({
          group: 'load',
          title: this.$t('get_ticket'),
          type: 'warn'
        })
      }
    },

    async downloaderTicket(nroTicket) {
      this.$notify({
        group: 'load',
        title: this.$t('get_ticket'),
        type: 'info'
      })

      try {
        const { data } = await apiTransaction.postVoucher({
          boleto: nroTicket,
          codigo: this.codigo
        })
        console.log(data)
        getPdf(data)
      } catch (error) {
        console.error('ERROR-DOWNLOAD-TICKET ->', error.message)
      }
    }
  }
}
</script>

<style scoped>
.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-orange);
}

.center {
  margin-top: 8vh !important;
}

.confirmation-title h1 {
  text-align: center;
  font-weight: bold !important;
}

.confirmation-title h1 {
  line-height: 4rem !important;
  font-size: 44px;
}

.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}

table {
  width: 100%;
  background-color: lightgray;
}

table td {
  color: grey;
  text-align: center;
}
</style>
