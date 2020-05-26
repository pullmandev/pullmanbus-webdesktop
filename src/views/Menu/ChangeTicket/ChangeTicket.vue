<template>
  <v-container>
    <h1 class="blue--text mb-6">Cambio de Boleto</h1>
    <v-card max-width="800">
      <v-card-title>Instrucciones</v-card-title>
      <v-card-text>
        <p class="subheading">
          Ingrese el numero de boleto que desea cambiar
        </p>
        <v-form v-model="validCodeForm">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Boleto"
                filled
                outlined
                dense
                v-model="code"
                :disabled="!search"
                :rules="generalRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-btn
                @click="Consult"
                color="blue"
                :loading="loading"
                :disabled="!validCodeForm"
                class="white--text"
              >
                <span>Consultar</span>
              </v-btn>
              <v-btn
                @click="code = ''"
                text
                :disabled="!validCodeForm"
                class="ml-3"
              >
                <span>Borrar</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-data-table
          :headers="headers"
          :items="[ticket]"
          hide-default-footer
          class="elevation-0 purchase-table mb-3"
        >
          <template slot="item" slot-scope="props">
            <tr>
              <td class="text-left pa-1">
                {{ props.item.origenNombre }}
              </td>
              <td class="text-left pa-2">
                {{ props.item.valor | currency }}
              </td>
              <td class="text-left">{{ props.item.fechaEmbarcacion }}</td>

              <td class="text-left pa-1">
                {{ props.item.destinoNombre }}
              </td>
              <td class="text-center">
                {{ props.item.estadoActualDescripcion }}
              </td>
              <td class="text-center">{{ props.item.horaEmbarcacion }}</td>
              <td class="text-center">{{ props.item.asiento }}</td>
            </tr>
          </template>
        </v-data-table>
        <div v-if="validTicket">
          <h3 class="title" style="color: rgba(0,0,0,0.87)">
            Datos cambio boleto
          </h3>
          <v-form v-model="validForm">
            <v-row align="center" class="mt-5">
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="email"
                  :label="$t('email')"
                  outline-1
                  color="blue"
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-menu
                  v-if="ticket.tipoCompra === 'CAJA'"
                  v-model="pickerDate"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  color="blue-dark"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      filled
                      outlined
                      dense
                      label="Fecha de viaje"
                      v-on="on"
                      color="grey lighten-4"
                      v-model="formatedDate"
                      readonly
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    min="1920-01-01"
                    v-model="date"
                    color="blue_dark"
                    @input="pickerDate = false"
                    :first-day-of-week="$i18n.locale === 'en' ? 0 : 1"
                    :locale="$t('locale')"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="rut"
                  label="Rut"
                  outline-1
                  color="blue"
                  :rules="rutRules"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pl-3 pr-3">
                <v-menu
                  v-if="ticket.tipoCompra === 'CAJA'"
                  ref="menu"
                  v-model="pickerHour"
                  :close-on-content-click="false"
                  :return-value.sync="hour"
                  transition="scale-transition"
                  color="blue-dark"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      filled
                      outlined
                      dense
                      label="Hora de viaje"
                      v-on="on"
                      color="grey lighten-4"
                      v-model="hour"
                      readonly
                    >
                    </v-text-field>
                  </template>
                  <v-time-picker
                    v-model="hour"
                    format="24hr"
                    color="blue_dark"
                    @click:minute="$refs.menu.save(hour)"
                    :locale="$t('locale')"
                  >
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-btn
              @click="submit"
              color="orange"
              :loading="loadingExchange"
              :disabled="!validForm || code === ''"
              class="white--text"
            >
              <span>Cambiar</span>
            </v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
// Base component
import API from '@/services/api/changeTicket'
import moment from 'moment'
import { mapGetters } from 'vuex'
import validations from '@/helpers/fieldsValidation'

export default {
  props: ['ticketParam'],
  data() {
    return {
      loading: false,
      loadingExchange: false,
      search: true,
      validTicket: false,
      validForm: false,
      validCodeForm: false,
      pickerDate: false,
      pickerHour: false,
      rut: '',
      email: '',
      date: null,
      hour: null,
      ticket: this.ticketParam,
      code: this.ticketParam.boleto,
      generalRules: [v => !!v || 'Este campo es requerido'],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      headers: [
        {
          text: 'Origen',
          value: 'origenNombre',
          align: 'left',
          sortable: false
        },
        {
          text: 'Valor',
          value: 'valor',
          align: 'left',
          sortable: false
        },
        {
          text: 'Fecha',
          value: 'fechaEmbarcacion',
          align: 'left',
          sortable: false
        },
        {
          text: 'Destino',
          value: 'destinoNombre',
          align: 'left',
          sortable: false
        },
        {
          text: 'Estado',
          value: 'estadoActualDescripcion',
          align: 'left',
          sortable: false
        },
        {
          text: 'Hora',
          value: 'horaEmbarcacion',
          align: 'left',
          sortable: false
        },
        {
          text: 'Asiento',
          value: 'asiento',
          align: 'left',
          sortable: false
        }
      ]
    }
  },
  mounted() {
    console.log('mounted', this.ticket)
    this.Consult()
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    }),
    formatedDate() {
      moment.locale(this.$i18n.locale)
      return this.date != null ? moment(this.date).format('LL') : null
    }
  },
  methods: {
    async submit() {
      try {
        const params = {
          boleto: this.ticket.boleto,
          email: this.email,
          usuario: this.email,
          rut: this.rut
        }
        this.loadingExchange = true
        const response = await API.exchangeTicket(params)
        if (response.data.exito) {
          this.$notify({
            group: 'info',
            title: 'El boleto se canjeo con exito',
            type: 'info'
          })
          this.email = ''
          this.rut = ''
          this.$router.go(-1)
        } else {
          const { mensaje } = response.data
          const text = mensaje || 'Se genero un error al canjear boleto'
          this.$notify({
            group: 'error',
            title: 'Error al canjear',
            type: 'error',
            text
          })
        }
        console.log('boletos', response.data)
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingExchange = false
      }
    },
    async Consult() {
      try {
        this.loading = true
        const response = await API.validateTicket({
          boleto: this.ticket.boleto
        })
        if (!response.data.exito) {
          const { mensaje } = response.data
          const text = mensaje || 'Se genero un error al canjear boleto'
          this.validTicket = false
          this.$notify({
            group: 'error',
            title: 'Error al validar boleto',
            type: 'error',
            text
          })
        } else {
          this.validTicket = true
          this.$notify({
            group: 'info',
            title: 'El boleto es apto para canje',
            type: 'info'
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
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
