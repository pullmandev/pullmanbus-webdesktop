<template>
  <v-container>
    <h1 class="blue--text mb-6">{{ translate('cancellations') }}</h1>
    <v-card max-width="800">
      <v-card-text>
        <p class="subheading">
          Debe seleccionar el o los boletos que desea anular para la devolución
          de su dinero. La devolución debe ser realizada por lo menos 4 hrs.
          antes de la salida del servicio.
        </p>
        <form>
          <v-row align="center">
            <v-col cols="12" sm="6" md="6" class="pl-3 pr-3">
              <v-text-field
                label="Orden"
                v-model="code"
                :disabled="!search"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" class="pl-3 pr-3">
              <v-btn
                @click="getTicket"
                color="blue"
                :disabled="loading"
                class="white--text"
              >
                <template v-if="loading">
                  <v-progress-circular
                    indeterminate
                    color="blue"
                  ></v-progress-circular>
                </template>
                <template v-else>
                  <span>{{ search ? 'Consultar' : 'Borrar' }}</span>
                </template>
              </v-btn>
            </v-col>
          </v-row>
        </form>
        <v-data-table
          :headers="headers"
          :items="tickets"
          hide-default-footer
          class="elevation-0 purchase-table mb-3"
        >
          <template slot="headerCell" slot-scope="props">
            <span class="purchase-table-header">
              {{ props.header.text }}
            </span>
          </template>
          <template slot="item" slot-scope="props">
            <tr>
              <td class="text-left">{{ props.item.boleto }}</td>
              <td class="text-left">{{ props.item.fechaHoraSalida }}</td>
              <td class="text-left pa-1">
                {{ props.item.nombreTerminalOrigen }}
              </td>
              <td class="text-left pa-1">
                {{ props.item.nombreTerminalDestino }}
              </td>
              <td class="text-center">{{ props.item.asiento }}</td>
              <td class="text-left pa-2">
                {{ props.item.total | currency }}
              </td>
              <td class="text-left">
                <v-btn
                  text
                  icon
                  color="blue"
                  @click="getTicketInfo(props.item.boleto)"
                >
                  <v-icon>search</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
        <i class="subheading">
          *Si la compra se realizo con tarjeta de credito, se generara una
          reversa en su cuenta, si se realizo con tarjeta de debito, se
          realizara una transferencia a la cuenta que entregue para este fin. La
          devolución o reversa se hara efectiva en un plazo maximo de 6 dias
        </i>
        <v-form v-model="validForm">
          <v-row align="center" class="mt-5">
            <v-col cols="12" md="6" class="pl-3 pr-3">
              <v-text-field
                label="Boleto"
                v-model="selectedTicket"
                :rules="generalRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pl-3 pr-3">
              <v-select
                label="Tipo de compra"
                :items="purchaseTypes"
                v-model="selectedPurchase"
                autocomplete
              ></v-select>
            </v-col>
            <template v-if="selectedPurchase === 'Debito'">
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  label="Rut solicitante"
                  v-model="rutApplicant"
                  :rules="rutApplicantRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  label="Usuario"
                  v-model="name"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  label="RUT de titular de cuenta"
                  v-model="rutHolder"
                  :rules="rutRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-select
                  label="Tipo de cuenta"
                  :items="accountTypes"
                  v-model="selectedAccountType"
                  item-text="nombre"
                  item-value="codigo"
                  clearable
                  autocomplete
                  :rules="generalRules"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  label="Numero de cuenta"
                  v-model="accountNumber"
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-select
                  label="Banco"
                  :items="banks"
                  v-model="selectedBank"
                  item-text="nombre"
                  item-value="codigo"
                  clearable
                  autocomplete
                  :rules="generalRules"
                  required
                ></v-select>
              </v-col>
            </template>
          </v-row>
          <v-btn
            @click="submit"
            color="blue_dark"
            :disabled="!validForm || code === '' || loadingCancel"
          >
            <template v-if="loadingCancel">
              <v-progress-circular
                indeterminate
                color="blue_dark"
              ></v-progress-circular>
            </template>
            <template v-else>
              <span>Anular</span>
            </template>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
// Base component
import API from '@/services/api/cancel'
import moment from 'moment'
import { mapGetters } from 'vuex'
import validations from '@/helpers/fieldsValidation'

export default {
  data() {
    return {
      loading: false,
      loadingCancel: false,
      search: true,
      validForm: false,
      code: '',
      name: '',
      accountNumber: '',
      rutHolder: '',
      rutApplicant: '',
      tickets: [],
      accountTypes: [],
      banks: [],
      purchaseTypes: ['Credito', 'Debito'],
      selectedTicket: '',
      selectedAccountType: '',
      selectedBank: '',
      selectedPurchase: 'Credito',
      generalRules: [v => !!v || 'Este campo es requerido'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v =>
          v === this.userData.usuario.email ||
          'E-mail no coincide con su usuario'
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      rutApplicantRules: [
        v => !!v || 'Rut es requerido',
        v => v === this.userData.usuario.rut || 'Rut no coincide con su usuario'
      ],
      headers: [
        {
          text: 'Boleto',
          align: 'left',
          sortable: false,
          value: 'boleto'
        },
        {
          text: 'Fecha',
          value: 'fechaHoraSalida',
          align: 'left',
          sortable: false
        },
        {
          text: 'Origen',
          value: 'nombreTerminalOrigen',
          align: 'left',
          sortable: false
        },
        {
          text: 'Destino',
          value: 'nombreTerminalDestino',
          align: 'left',
          sortable: false
        },
        {
          text: 'Asiento',
          value: 'asiento',
          align: 'left',
          sortable: false
        },
        {
          text: 'Valor',
          value: 'total',
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
    }
  },
  mounted() {
    this.getParameters()
  },
  computed: mapGetters({
    userData: ['userData']
  }),
  methods: {
    async getParameters() {
      const accountTypesRes = await API.tipoCuenta({ codigo: 'VD' })
      const banksRes = await API.bancos()
      this.accountTypes = accountTypesRes.data
      this.banks = banksRes.data
    },
    async getTicket() {
      if (this.search) {
        this.loading = true
        const params = { codigo: this.code, email: this.userData.usuario.email }
        const response = await API.searchTicket(params)
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
          item.codigoTransaccion = item.imprimeVoucher.codigoTransaccion
          return item
        })
        if (this.tickets.length > 0) {
          this.search = false
        }
        this.loading = false
      } else {
        this.clearTicketData()
      }
    },
    getTicketInfo(code) {
      const ticket = this.tickets.filter(item => {
        return item.boleto === code
      })[0]
      if (!this.validateTicketDate(ticket.imprimeVoucher.fechaHoraSalida)) {
        return
      }
      this.selectedTicket = ticket.boleto
      this.rutApplicant = this.userData.usuario.rut
      this.name = this.userData.usuario.email
      this.code = ticket.codigoTransaccion
    },
    clearTicketData() {
      this.code = ''
      this.tickets = []
      this.selectedTicket = ''
      this.search = true
    },
    clearData() {
      this.clearTicketData()
      this.name = ''
      this.accountNumber = ''
      this.rutHolder = ''
      this.rutApplicant = ''
      this.selectedAccountType = ''
      this.selectedBank = ''
    },
    async submit() {
      const ticket = this.tickets.filter(item => {
        return item.boleto === this.selectedTicket
      })[0]
      if (!this.validateTicketDate(ticket.imprimeVoucher.fechaHoraSalida)) {
        return
      }
      this.loadingCancel = true
      let params = {
        boleto: this.selectedTicket,
        codigoTransaccion: this.code,
        integrador: ticket.integrador
      }
      if (this.selectedPurchase === 'Debito') {
        params.rutSolicitante = this.rutApplicant
        params.usuario = this.name
        params.banco = this.selectedBank
        params.tipoCuenta = this.selectedAccountType
        params.numeroCuenta = this.accountNumber
        params.rutTitular = this.rutHolder
      }
      console.log(params)
      const response = await API.cancel(params)
      this.loadingCancel = false
      if (response.data.exito) {
        this.$notify({
          group: 'info',
          title: this.translate('cancellations_success'),
          type: 'info'
        })
        this.clearData()
      } else {
        this.$notify({
          group: 'error',
          title: this.translate('cancellation'),
          type: 'error',
          text: this.translate('cancellations_error')
        })
      }
      console.log('boletos', response.data)
    },
    validateTicketDate(date) {
      const ticketHour = moment(date, 'YYYY-MM-DD HH:mm')
      const today = moment()
      const diff = ticketHour.diff(today, 'seconds')
      const result = diff > 3600 * 4
      if (!result) {
        this.$notify({
          group: 'error',
          title: 'Pasaje fuera del plazo para anular',
          type: 'error'
        })
      }
      return result
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
