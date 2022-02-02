<template>
  <v-row>
    <v-col cols="12">
      <v-data-table
        class="rounded-search-box elevation-1 my-5 xim-desktop"
        :headers="ticketsHeaders"
        :items="formatTickets"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-chevron-double-left',
          lastIcon: 'mdi-chevron-double-right'
        }"
        :loading="loading"
        :loading-text="$t('Loading... Please wait')">

        <template slot="item" slot-scope="props" >
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
                style="width:3rem;"
              />
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" class="xim-movile">
      <v-row class="xim-alinea-vertical"
      v-for="(item, index) in this.tickets"
                             v-bind:item="item"
                           v-bind:index="index"
                           v-bind:key="item.id">
        <v-col cols="12" class="xim-colum">
          <h3>Datos de la Transacción</h3>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Número del Boleto</label>
          <span class="xim-texto-datos">{{ item.boleto }}</span>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Fecha de Salida</label>
          <span class="xim-texto-datos">{{ item.fechaHoraSalida }}</span>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Origen</label>
          <span class="xim-texto-datos">{{ item.nombreTerminalOrigen }}</span>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Destino</label>
          <span class="xim-texto-datos">{{ item.nombreTerminalDestino }}</span>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Asiento</label>
          <span class="xim-texto-datos">{{ item.asiento }}</span>
        </v-col>
        <v-col cols="6" class="xim-colum">
          <label class="xim-texto-label">Valor</label>
          <span class="xim-texto-datos">{{ item.total }}</span>
        </v-col>
        <v-col cols="12" class="xim-colum">
          <label class="xim-texto-label">Descargar el Voucher de su Compra</label>
          <span class="xim-texto-datos xim-alinea-horizontal">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    icon
                    dark
                    color="blue_dark"
                    v-bind="attrs"
                    v-on="on"
                    @click="downloaderTicket(item)"
                  >
                    <i class="material-icons">get_app</i>
                  </v-btn>
                </template>
              <span>{{ $t('download') }}</span>
            </v-tooltip>
            <img
              v-if="item.tipoServicio === 'pet'"
              src="../../../static/logos/seats/icono_pata_verde.svg"
              style="width:2rem;"
            />
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
        ticket.nombreTerminalDestino = ticket.imprimeVoucher.nombreTerminalDestino
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
@media (max-width: 576px) {
  .xim-desktop {
    display: none;
  }
  .xim-movile {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
  }
  .xim-alinea-vertical {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 94%;
    margin: 0 10px 0 10px;
  }
  .xim-colum {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
  }
  .xim-texto-label {
    font-family: 'Lato', sans-serif;
    font-size: 0.7rem;
    font-weight: bold;
    line-height: 0.7rem;
    width: 100%;
    border-bottom: 1px solid #ccc;
    color: grey;
  }
  .xim-texto-datos {
    font-family: 'Lato', sans-serif;
    font-size: 0.9rem;
    font-weight: bold;
    line-height: 0.9rem;
    width: 100%;
    padding: 5px 0 0 0;
    color: grey;
  }
  .xim-alinea-horizontal {
    display: flex;
    justify-content: end;
    align-content: center;
    flex-direction: row;
  }
}
</style>
