<template>
  <div>
    <v-data-table
      :headers="transactionHeaders"
      :items="transactions"
      class="elevation-1 mb-5 purchase-table"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator" class="purchase-table-header">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.codigo }}</td>
        <td class="text-xs-left">{{ props.item.estado }}</td>
        <td class="text-xs-left">{{ props.item.fechacompra }}</td>
        <td class="text-xs-left">{{ props.item.monto | currency }}</td>
        <td class="text-xs-left">
          <v-btn
            flat
            icon
            color="primary"
            @click="getTicket(props.item.codigo)"
          >
            <i class="material-icons">search</i>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-data-table
      v-bind:headers="ticketsHeaders"
      :items="tickets"
      class="elevation-1 my-5 purchase-table"
    >
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator" class="purchase-table-header">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.boleto }}</td>
        <td class="text-xs-left">{{ props.item.fechaHoraSalida }}</td>
        <td class="text-xs-left">{{ props.item.nombreTerminalOrigen }}</td>
        <td class="text-xs-left">{{ props.item.nombreTerminalDestino }}</td>
        <td class="text-xs-center">{{ props.item.asiento }}</td>
        <td class="text-xs-left">{{ props.item.total | currency }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import API from '@/services/api/cancel'
import moment from 'moment'
import { mapGetters } from 'vuex'

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
          text: this.translate('transaction_code'),
          align: 'left',
          sortable: false,
          value: 'codigo'
        },
        {
          text: this.translate('state'),
          value: 'estado',
          align: 'left',
          sortable: false
        },
        {
          text: this.translate('purchase_date'),
          value: 'fechacompra',
          align: 'left',
          sortable: false
        },
        {
          text: 'Total',
          value: 'monto',
          align: 'left',
          sortable: false
        },
        {
          text: '',
          value: '',
          align: 'left',
          sortable: false
        }
      ]
    },
    ticketsHeaders() {
      return [
        {
          text: this.translate('ticket'),
          align: 'left',
          sortable: false,
          value: 'boleto'
        },
        {
          text: this.translate('date'),
          value: 'fechaHoraSalida',
          align: 'left',
          sortable: false
        },
        {
          text: this.translate('from_city2'),
          value: 'nombreTerminalOrigen',
          align: 'left',
          sortable: false
        },
        {
          text: this.translate('to_city2'),
          value: 'nombreTerminalDestino',
          align: 'left',
          sortable: false
        },
        {
          text: this.translate('seat'),
          value: 'asiento',
          align: 'left',
          sortable: false
        },
        {
          text: this.translate('value'),
          value: 'total',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  mounted() {
    const { email } = this.$store.getters.userData.usuario
    console.log('Mis compras', email)
    this.$parent.$parent.$data.title = 'my_purchases'
    API.searchTransaction({ email })
      .then(response => {
        console.log('Mis compras', response)
        const data = response.data.map(item => {
          item.fechacompra = moment(item.fechacompra).format('DD/MM/YYYY')
          return item
        })
        this.transactions = data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    async getTicket(codigo) {
      this.$notify({
        group: 'load',
        title: this.translate('get_ticket'),
        type: 'info'
      })
      const response = await API.searchTicket({
        codigo,
        email: this.userData.usuario.email
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
        item.total = item.imprimeVoucher.total
        return item
      })
      // const voucherData = _.pick(data.imprimeVoucher, 'nombreTerminalOrigen', 'nombreTerminalDestino')
      console.log(this.tickets)
    }
  }
}
</script>
<style>
.purchase-table thead {
  background-color: var(--var-light-blue) !important;
}
.purchase-table-header {
  color: white;
  font-size: 16px;
}
</style>
