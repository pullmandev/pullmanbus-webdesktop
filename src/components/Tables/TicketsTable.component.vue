<template>
  <v-data-table
    class="elevation-1 my-5 rounded-search-box"
    :headers="ticketsHeaders"
    :items="formatTickets"
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-chevron-double-left',
      lastIcon: 'mdi-chevron-double-right'
    }"
    :loading="loading"
    :loading-text="$t('Loading... Please wait')"
  >
    <template slot="item" slot-scope="props">
      <tr>
        <td class="text-center">{{ props.item.boleto }}</td>
        <td class="text-center">{{ props.item.fechaHoraSalida }}</td>
        <td class="text-center">{{ props.item.nombreTerminalOrigen }}</td>
        <td class="text-center">{{ props.item.nombreTerminalDestino }}</td>
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
                @click="downloaderTicket(props.item)"
              >
                <i class="material-icons">get_app</i>
              </v-btn>
            </template>
            <span>{{ $t('download') }}</span>
          </v-tooltip>
        </td>
        <td class="text-center">
           <img 
              v-if="props.item.tipoServicio === 'pet'"
              src="../../../static/logos/seats/icono_pata_verde.svg"
              style="width:3rem;"/>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { OK } from 'http-status-codes'
import apiTransaction from '@SERVICES/api/transaction'
import { FileDownloadService } from '@SERVICES/FileDownload.service'

export default {
  name: 'TicketsTable',

  props: {
    tickets: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      ticketsHeaders: [
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
        },
           {
          text: '',
          value: '',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        }
      ]
    }
  },

  computed: {
    formatTickets() {
      const tickets = this.tickets.map(ticket => {
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

      return tickets
    }
  },

  methods: {
    async downloaderTicket(ticket) {
      this.$notify({
        group: 'load',
        title: this.$t('downloading_ticket'),
        type: 'info'
      })

      try {
        const { status, data } = await apiTransaction.postVoucher({
          boleto: ticket.boleto,
          codigo: ticket.codigo
        })

        if (status === OK) {
          FileDownloadService.getPdf(data)
        }
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

style
<style lang="scss">
.purchase-table-header {
  background-color: var(--var-orange);
  color: white !important;
  font-size: 16px !important;
}
</style>
