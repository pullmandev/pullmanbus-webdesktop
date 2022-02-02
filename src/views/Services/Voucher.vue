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
            <div class="page-icon text-center d-flex align-center justify-center">
              <v-icon size="70" class="white--text">check</v-icon>
            </div>
          </v-col>

          <v-col cols="12" md="12" lg="12">
            <h3 class="mb-2 ml-2">Datos de la compra:</h3>
              <div class="xim-desktop">

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
              </div>
              <div class="xim-movile">
                <v-row class="xim-alinea-vertical"
                    v-for="(item, index) in this.transaction"
                                          v-bind:item="item"
                                        v-bind:index="index"
                                        v-bind:key="item.id">
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Orden de Compra</label>
                      <span class="xim-texto-datos">{{ item.codigo }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Comercio</label>
                      <span class="xim-texto-datos">PullmanBus</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Moneda</label>
                      <span class="xim-texto-datos">Peso Chileno</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Monto</label>
                      <span class="xim-texto-datos">{{ item.monto | currency }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Código de Transacción</label>
                      <span class="xim-texto-datos">{{ codigoTransbank }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Fecha</label>
                      <span class="xim-texto-datos">{{ fechaFormateada }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Tipo de Pago</label>
                      <span class="xim-texto-datos">{{ item.tipoPagoFormateado }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Cuotas</label>
                      <span class="xim-texto-datos">{{ item.numeroCuota }}</span>
                    </v-col>
                    <v-col cols="6" class="xim-colum">
                      <label class="xim-texto-label">Número Tarjeta</label>
                      <span class="xim-texto-datos">...{{ item.numeroTarjeta }}</span>
                    </v-col>
                </v-row>
              </div>
          </v-col>

          <v-col v-if="download" cols="12" md="12" lg="12">
            <TicketsTable :tickets="ticketsData" />
          </v-col>

          <v-col class="d-flex justify-end pr-10">
            <v-btn class="mt-5" outlined @click="$router.push({ name: 'home' })">
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
    // this.$store.dispatch('DELETE_ALL_SEAT')
    this.getTransaction()
  },

  destroyed() {
    this.$notify({
      group: 'info',
      clean: true
    })
  },

  computed: {
    fechaFormateada() {
      moment.locale(this.$i18n.locale)
      return moment(this.transaction[0].fechaCompra).format('L')
    }
  },

  methods: {
    async getTransaction() {
      const code = this.$route.params.id
      try {
        const { status, data } = await apiTransaction.postHeader({
          orden: code
        })
        if (status === OK) {
          this.loading = false
          this.transaction.push(data)
          this.ticketsData = data.boletos
          let email = this.transaction[0].boletos[0].imprimeVoucher.cliente
          this.$notify({
            group: 'info',
            title: this.$t('success_buy'),
            text: this.$t('email_sent') + `: ${email}`,
            duration: 3000, // negative to remain until clicked
            classes : 'texto-alert'
          })
        }
      } catch (error) {
        console.error('ERROR-GET-TICKETS ->', error.message)
        this.loading = false
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
.v-icon.v-icon {
  margin: 0 10px 0 10px;
}
.vue-notification-group {
  widows: 730px!important;
}
.texto-alert{
  font-size : 12px;
}
</style>
<style lang="scss" src="./stepper/List/ElementList.scss"></style>