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
              :headers="transactionHeaders"
              :items="transaction"
              :loading="loading"
              :loading-text="$t('Loading... Please wait')"
            >
              <template slot="item" slot-scope="props">
                <td class="text-center">{{ props.item.codigo }}</td>
                <td class="text-center">Pullman bus</td>
                <td class="text-center">Peso Chileno</td>
                <td class="text-center">{{ props.item.montoFormateado }}</td>
                <td class="text-center">{{ props.item.codigoTransbank }}</td>
                <td class="text-center">{{ fechaFormateada }}</td>
                <td class="text-center">{{ props.item.tipoPagoFormateado }}</td>
                <td class="text-center">{{ props.item.numeroCuota }}</td>
                <td class="text-center">{{ props.item.numeroTarjeta }}</td>
              </template>
            </v-data-table>
          </v-col>

          <v-col v-if="download" cols="12" md="12" lg="12">
            <TicketsTable :tickets="ticketsData" />
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
import moment from 'moment'
import { OK } from 'http-status-codes'
import TicketsTable from '@COMPONENTS/Tables/TicketsTable.component'
import apiTransaction from '@SERVICES/api/transaction'

export default {
  name: 'Voucher',

  components: {
    TicketsTable
  },

  data() {
    return {
      loading: true,
      download: false,
      transaction: [],
      ticketsData: [],
      transactionHeaders: [
        { text: 'Orden de Compra', align: 'center', sortable: false },
        { text: 'Comercio', align: 'center', sortable: false },
        { text: 'Moneda', align: 'center', sortable: false },
        { text: 'Monto', align: 'center', sortable: false },
        { text: 'Código Transacción', align: 'center', sortable: false },
        { text: 'Fecha', align: 'center', sortable: false },
        { text: 'Tipo de pago', align: 'center', sortable: false },
        { text: 'Cuotas', align: 'center', sortable: false },
        { text: 'N. Tarjeta', align: 'center', sortable: false }
      ]
    }
  },

  mounted() {
    this.getTransaction()
  },

  computed: {
    fechaFormateada() {
      moment.locale(this.$i18n.locale)
      return moment(this.transaction[0].fechaCompra).format('L')
    }
  },

  methods: {
    async getTransaction() {
      this.$notify({
        group: 'load',
        title: this.$t('success_buy'),
        type: 'info'
      })

      const code = this.$route.params.id
      try {
        const { status, data } = await apiTransaction.postHeader({
          orden: code
        })

        if (status === OK) {
          this.loading = false

          this.transaction.push(data)
          this.ticketsData = data.boletos
        }
      } catch (error) {
        console.error('ERROR-GET-TICKETS ->', error.message)

        this.loading = false
        this.$notify({
          group: 'error',
          title: 'Error al cargar los datos',
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.center {
  margin-top: 8vh !important;
}

.confirmation-title {
  h1 {
    text-align: center;
    line-height: 4rem !important;
    font-size: 44px;
    font-weight: bold !important;
  }

  p {
    font-size: 20px;
    color: #a0a0a0;
    text-align: center;
  }
}

.page-icon {
  border-radius: 50%;
  width: 125px;
  height: 125px;
  background-color: var(--var-orange);
}

table {
  width: 100%;

  td {
    color: grey;
    text-align: center;
  }
}
</style>
