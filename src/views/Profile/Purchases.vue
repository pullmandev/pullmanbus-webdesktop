<template>
  <v-container>
    <h1 class="blue--text mb-6">{{ $t('my_purchases') }}</h1>

    <v-data-table
      :headers="transactionHeaders"
      :items="transactions"
      class="elevation-1 mb-5 rounded-search-box"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right'
      }"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td>{{ props.item.codigo }}</td>
          <td>{{ props.item.estado }}</td>
          <td>{{ props.item.fechaCompraFormato }}</td>
          <td>{{ props.item.monto | currency }}</td>
          <td class="text-left">
            <v-btn
              text
              icon
              color="blue_dark"
              @click="getTicket(props.item.codigo)"
            >
              <i class="material-icons">search</i>
            </v-btn>
          </td>
          <td class="text-left">
            <v-btn
              text
              icon
              color="blue_dark"
              @click="downloadTickets(props.item.codigo)"
            >
              <i class="material-icons">get_app</i>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <v-data-table
      v-bind:headers="ticketsHeaders"
      :items="tickets"
      class="elevation-1 my-5 rounded-search-box"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right'
      }"
    >
      <template slot="item" slot-scope="props">
        <tr>
          <td class="text-xs-left">{{ props.item.boleto }}</td>
          <td class="text-xs-left">{{ props.item.fechaHoraSalida }}</td>
          <td class="text-xs-left">{{ props.item.nombreTerminalOrigen }}</td>
          <td class="text-xs-left">{{ props.item.nombreTerminalDestino }}</td>
          <td class="text-xs-center">{{ props.item.asiento }}</td>
          <td class="text-xs-left">{{ props.item.total }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import API from '@/services/api/cancel'
import APITransaction from '@/services/api/transaction'
import { getPdf } from '@SERVICES/getPdf'

export default {
  data() {
    return {
      transactions: [],
      tickets: []
    }
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    }),
    transactionHeaders() {
      return [
        {
          text: this.$t('transaction_code'),
          align: 'left',
          sortable: false,
          value: 'codigo',
          class: 'purchase-table-header'
        },
        {
          text: this.$t('state'),
          value: 'estado',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('purchase_date'),
          value: 'fechacompra',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: 'Total',
          value: 'monto',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: '',
          value: '',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: '',
          value: '',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        }
      ]
    },
    ticketsHeaders() {
      return [
        {
          text: this.$t('ticket'),
          align: 'left',
          sortable: false,
          value: 'boleto',
          class: 'purchase-table-header'
        },
        {
          text: this.$t('date'),
          value: 'fechaHoraSalida',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('from_city2'),
          value: 'nombreTerminalOrigen',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('to_city2'),
          value: 'nombreTerminalDestino',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('seat'),
          value: 'asiento',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('value'),
          value: 'total',
          align: 'left',
          sortable: false,
          class: 'purchase-table-header'
        }
      ]
    }
  },
  mounted() {
    const { email } = this.$store.getters.userData.usuario
    console.log('Mis compras', email)
    API.searchTransaction({ email })
      .then(response => {
        console.log('Mis compras', response.data)
        this.transactions = response.data
      })
      .catch(err => {
        console.err(err)
      })
  },
  methods: {
    async getTicket(codigo) {
      this.$notify({
        group: 'load',
        title: this.$t('get_tickets'),
        type: 'info'
      })
      const response = await API.searchTicket({
        codigo
      })
      this.tickets = response.data.map(item => {
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
      console.log(this.tickets)
    },

    downloadTickets(codigo) {
      this.$notify({
        group: 'load',
        title: this.$t('get_tickets'),
        type: 'info'
      })

      APITransaction.postHeader({ orden: codigo }).then(async response => {
        const data = response.data
        const boletos = data.boletos

        for (let item of boletos) {
          const responseTicket = await APITransaction.postVoucher({
            boleto: item.boleto,
            codigo
          })

          getPdf(responseTicket.data)
        }
      })
    }
  }
}
</script>

<style>
.purchase-table-header {
  background-color: var(--var-orange);
  color: white !important;
  font-size: 16px !important;
}
</style>
