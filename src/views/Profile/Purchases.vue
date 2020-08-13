<template>
  <v-container>
    <h1 class="blue--text mb-6">{{ $t('my_purchases') }}</h1>

    <v-data-table
      class="elevation-1 mb-5 rounded-search-box"
      :headers="transactionHeaders"
      :items="transactions"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-chevron-double-left',
        lastIcon: 'mdi-chevron-double-right'
      }"
      :loading="loading"
      :loading-text="$t('Loading... Please wait')"
    >
      <template slot="item" slot-scope="props">
        <tr :class="{ selected: select[props.item.codigo] }">
          <td>{{ props.item.codigo }}</td>
          <td>{{ props.item.estado }}</td>
          <td>{{ props.item.fechaCompraFormato }}</td>
          <td>{{ props.item.monto | currency }}</td>
          <td class="text-center">
            <v-btn
              text
              icon
              color="blue_dark"
              @click="getTicket(props.item.codigo)"
            >
              <i class="material-icons">search</i>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>

    <TicketsTable :tickets="ticketsData" :loading="loadingTicket" />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { OK } from 'http-status-codes'
import TicketsTable from '@COMPONENTS/Tables/TicketsTable.component'
import apiCancel from '@SERVICES/api/cancel'

export default {
  name: 'Purchases',

  components: {
    TicketsTable
  },

  data() {
    return {
      select: {},
      notifyEmail: {},
      loadingTicket: false,
      loading: true,
      transactions: [],
      ticketsData: [],
      transactionHeaders: [
        {
          text: this.$t('transaction_code'),
          value: 'codigo',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('state'),
          value: 'estado',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: this.$t('purchase_date'),
          value: 'fechacompra',
          align: 'center',
          sortable: false,
          class: 'purchase-table-header'
        },
        {
          text: 'Total',
          value: 'monto',
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
    ...mapGetters({
      userData: ['userData']
    })
  },

  mounted() {
    this.getTransactions()
  },

  methods: {
    async getTransactions() {
      const { email } = this.$store.getters.userData.usuario
      try {
        const { status, data } = await apiCancel.searchTransaction({
          email
        })

        if (status === OK) {
          this.loading = false
          this.transactions = data
        }
      } catch (error) {
        console.error('ERROR-TRANSACTIONS ->', error.message)

        this.loading = false
        this.$notify({
          group: 'error',
          title: 'Error al cargar los datos'
        })
      }
    },

    async getTicket(code) {
      this.$notify({
        group: 'load',
        title: this.$t('get_tickets')
      })

      this.loadingTicket = true
      try {
        const { status, data } = await apiCancel.searchTicket({
          codigo: code
        })

        if (status === OK) {
          this.select = {}
          this.select[code] = true

          this.loadingTicket = false
          this.ticketsData = data
        }
      } catch (error) {
        console.error('ERROR-GET-TICKET ->', error.message)

        this.loadingTicket = false
        this.$notify({
          group: 'error',
          title: 'Error al cargar los datos'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.purchase-table-header {
  background-color: var(--var-orange);
  color: white !important;
  font-size: 16px !important;
}

.v-data-table {
  table {
    .selected {
      background-color: #0000001a !important;
    }
  }
}
</style>
