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
            <h3 class="mb-2 ml-2">Datos de la compra:</h3>

            <v-data-table
              class="elevation-1"
              :headers="buyHeaders"
              :items="[buyData]"
              item-key="name"
            >
              <template slot="item" slot-scope="props">
                <td class="text-center">{{ code }}</td>
                <td class="text-center">Pullman bus</td>
                <td class="text-center">Peso Chileno</td>
                <td class="text-center">
                  {{ props.item.montoFormateado }}
                </td>
                <td class="text-center">
                  {{ props.item.codigoTransbank }}
                </td>
                <td class="text-center">{{ fechaFormateada }}</td>
                <td class="text-center">
                  {{ props.item.tipoPagoFormateado }}
                </td>
                <td class="text-center">{{ props.item.numeroCuota }}</td>
                <td class="text-center">{{ props.item.numeroTarjeta }}</td>
              </template>
            </v-data-table>
          </v-col>

          <v-col v-if="download" cols="12" md="12" lg="12">
            <v-data-table
              class="elevation-1 my-5 rounded-search-box"
              :headers="ticketHeaders"
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
              @click="download = true"
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
import { getPdf } from '@SERVICES/getPdf'
import { OK } from 'http-status-codes'
import moment from 'moment'

export default {
  name: 'Voucher',

  data() {
    return {
      download: false,
      buyData: {},
      tickets: [],
      code: '',
      buyHeaders: [
        { text: 'Orden de Compra', align: 'center', sortable: false },
        { text: 'Comercio', align: 'center', sortable: false },
        { text: 'Moneda', align: 'center', sortable: false },
        { text: 'Monto', align: 'center', sortable: false },
        { text: 'Código Transacción', align: 'center', sortable: false },
        { text: 'Fecha', align: 'center', sortable: false },
        { text: 'Tipo de pago', align: 'center', sortable: false },
        { text: 'Cuotas', align: 'center', sortable: false },
        { text: 'N. Tarjeta', align: 'center', sortable: false }
      ],
      ticketHeaders: [
        {
          text: this.$t('ticket'),
          align: 'center',
          value: 'boleto',
          sortable: false,
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
    this.code = this.$route.params.id
    this.getTransaction()
  },

  computed: {
    fechaFormateada() {
      moment.locale(this.$i18n.locale)
      return moment(this.buyData.fechaCompra).format('L')
    }
  },

  methods: {
    async getTransaction() {
      try {
        const { status, data } = await apiTransaction.postHeader({
          orden: this.code
        })

        if (status === OK) {
          this.buyData = data
          this.formatTickets(data.boletos)

          this.$notify({
            group: 'load',
            title: this.$t('success_buy'),
            type: 'info'
          })
        }
      } catch (error) {
        console.error('ERROR-GET-TICKETS ->', error.message)

        this.$notify({
          group: 'error',
          title: 'Error al cargar los datos',
          text: 'Actualice la pagina por favor',
          type: 'error'
        })
      }
    },

    formatTickets(tickets) {
      this.tickets = tickets.map(ticket => {
        const { fechaHoraSalida } = ticket.imprimeVoucher
        const dateNumber = fechaHoraSalida.slice(0, 8)
        const hourNumber = fechaHoraSalida.slice(8, fechaHoraSalida.length)
        const date = moment(dateNumber).format('DD/MM/YYYY')
        const hour = `${hourNumber.slice(0, 2)}:${hourNumber.slice(2, 4)}`

        ticket.fechaHoraSalida = date + ' ' + hour
        ticket.nombreTerminalOrigen = ticket.imprimeVoucher.nombreTerminalOrigen
        ticket.nombreTerminalDestino =
          ticket.imprimeVoucher.nombreTerminalDestino
        ticket.asiento = ticket.imprimeVoucher.asiento
        ticket.total = ticket.imprimeVoucher.total.includes('.')
          ? `$ ${ticket.imprimeVoucher.total}`
          : this.$filters.currency(ticket.imprimeVoucher.total)

        return ticket
      })
    },

    async downloaderTicket(nroTicket) {
      this.$notify({
        group: 'load',
        title: this.$t('downloading_tickets'),
        type: 'info'
      })

      try {
        const { data } = await apiTransaction.postVoucher({
          boleto: nroTicket,
          codigo: this.code
        })

        getPdf(data)
      } catch (error) {
        console.error('ERROR-DOWNLOAD-TICKET ->', error.message)

        this.$notify({
          group: 'error',
          title: 'Error al descargar boleto',
          text: 'Intente nuevamente por favor',
          type: 'error'
        })
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
