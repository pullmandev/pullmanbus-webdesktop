<template>
  <v-container class="xim-container-i">
    <div class="xim-desktop">
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
              <v-btn text icon color="blue_dark" @click="getTicket(props.item.codigo)">
                <i class="material-icons">search</i>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

    </div>
    <!-- <TicketsTable :tickets="ticketsData" :loading="loadingTicket" /> -->
        <div class="xim-movile">
          <h1 class="blue--text mb-6 mt-50">{{ $t('my_purchases') }}</h1>
          <v-card class="rounded-search-box">
            <v-toolbar color="orange" class="white--text elevation-0">
              <div style="width: 50px">
                <v-img
                  src="../../../static/logos/header/Iconos-24.png"
                  height="35"
                  width="35"
                />
                </div>
                <v-toolbar-title>
                  <h2 class="d-flex flex-column text-left title" style="line-height: 20px">
                    {{ formTitle }}
                    <span v-if="userData.usuario.nombre" class="body-2">{{ email }}</span>
                  </h2>
                </v-toolbar-title>
              </v-toolbar>
              <div class="xim-card-body-i" v-if="transactions">
                <v-row class="xim-alinea-vertical xim-ll"
                        v-for="(item, index) in this.transactions"
                                                v-bind:item="item"
                                              v-bind:index="index"
                                              v-bind:key="item.id"
                >
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">C&oacute;digo de Transacci&oacute;n </label>
                    <span class="xim-texto-datos"> {{ item.codigo }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">Estado</label>
                    <span class="xim-texto-datos">{{ item.estado }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                    <label class="xim-texto-label">Fecha de Compra</label>
                    <span class="xim-texto-datos">{{ item.fechaCompraFormato }}</span>
                  </v-col>
                  <v-col cols="6" class="xim-colum">
                      <v-row>
                        <v-col cols="8">
                          <label class="xim-texto-label">Total</label>
                          <span class="xim-texto-datos">$ {{ item.montoFormateado }}</span>
                        </v-col>
                        <v-col cols="4">
                          <v-btn class="xim-ver-mas" text icon color="blue_dark" @click="getTicket(item.codigo)">
                            <i class="material-icons">search</i>
                          </v-btn>
                        </v-col>
                      </v-row>
                  </v-col>
                </v-row>
              </div>
          </v-card>
        </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { OK } from 'http-status-codes'
/* import TicketsTable from '@COMPONENTS/Tables/TicketsTable.component' */
import apiCancel from '@SERVICES/api/cancel'

export default {
  name: 'Purchases',

  components: {
    // TicketsTable
  },

  data() {
    return {
      select: {},
      notifyEmail: {},
      loadingTicket: false,
      loading: true,
      transactions: [],
      ticketsData: [],
      email: '',
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
    }),
    formTitle() {
      let { nombre, apellidoPaterno } = this.userData.usuario
      let title = null
      if (nombre) {
        title = nombre
        if (apellidoPaterno) {
          title += ' ' + apellidoPaterno
        }
      }
      return title != null ? title : this.email
    },
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
          this.email = email
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
