<template>
  <div class="custom-form">
    <img
      src="../../../../static/images/form_banners/cambia_pasajes.png"
      alt="banner-confirmacion"
      style="width: 100%;margin-top:-10px"
    />

    <v-container>
      <v-toolbar class="xim-cajatitulo" dense>
        <div class="xim-titulo-principal">
          <v-icon class="xim-icon">autorenew</v-icon>
        </div>
        <v-toolbar-title>
          <h1 class="xim-titulo-principal">
            {{ $t('changeTicket.form') }}
          </h1>
        </v-toolbar-title>
      </v-toolbar>
      <p class="blue_light--text my-5 xim-k-lr">
        {{ $t('changeTicket.content') }}
      </p>
      <v-card color="xim-background_blue">
        <v-card-text>
          <div class="my-6 text-center blue_light--text" style="font-size: 0.875rem;">
            <h2>
              <v-icon color="blue_light" size="35">mdi-arrow-down-thin-circle-outline</v-icon
              >
              {{ $t('changeTicket.enter') }}
            </h2>
          </div>
          <v-container class="resp">
            <v-form v-model="validCodeForm">
              <v-row>
                <v-col class="inp" cols="12" sm="6" md="6">
                  <div class="xim-desktop">
                    <v-text-field
                      :label="$t('ticket')"
                      filled
                      outlined
                      dense
                      v-model="code"
                      :disabled="search"
                      :rules="generalRules"
                      @keypress="validarEnter($event)"
                      maxLength="12"
                      required
                    ></v-text-field>
                  </div>
                  <div class="xim-movile">
                    <v-text-field
                      :label="$t('ticket')"
                      v-model="code"
                      :disabled="search"
                      :rules="generalRules"
                      @keypress="validarEnter($event)"
                      maxLength="12"
                      required
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col class="respbtn" cols="6" md="6">
                  <div class="xim-desktop">
                    <v-btn
                      @click="consultAndFillTable"
                      color="blue"
                      :loading="loading"
                      :disabled="!validCodeForm"
                      class="white--text"
                    >
                      <span>{{ $t('consult') }}</span>
                    </v-btn>
                    <v-btn
                      @click="clear"
                      text
                      :disabled="!validCodeForm"
                      class="ml-3"
                      color="blue_light"
                      outlined
                    >

                      <!--span>{{ search ? 'Buscar' : 'Borrar' }}</span-->
                      <span> {{ $t('erase') }}</span>
                    </v-btn>
                  </div>
                  <div class="xim-movile xim-horizontal">
                    <v-btn
                      @click="clear"
                      text
                      :disabled="!validCodeForm"
                      class="ml-3"
                      color="blue_light"
                      outlined
                    >
                      <span> {{ $t('erase') }}</span>
                    </v-btn>
                    <v-btn
                      @click="consultAndFillTable"
                      color="blue"
                      :loading="loading"
                      :disabled="!validCodeForm"
                      class="white--text">
                      <span>{{ $t('consult') }}</span>
                    </v-btn>
                  </div>

                </v-col>
              </v-row>
            </v-form>
            <div class="xim-desktop" v-if="this.ticket.boleto != undefined">
              <v-data-table
                mobile-breakpoint="0"
                :headers="headers"
                :items="[ticket]"
                hide-default-footer
                class="elevation-1"
              >
                <template slot="item" slot-scope="props">
                  <tr class="tablerows">
                    <td class=" pa-1">
                      {{ props.item.boleto.origenNombre }}
                    </td>
                    <td class=" pa-2">
                      {{ props.item.boleto.valor | currency }}
                    </td>
                    <td class="">
                      {{ props.item.boleto.fechaEmbarcacion }}
                    </td>

                    <td class=" pa-1">
                      {{ props.item.boleto.destinoNombre }}
                    </td>
                    <td class="">
                      {{ props.item.boleto.estadoActualDescripcion }}
                    </td>
                    <td class="">
                      {{ props.item.boleto.horaEmbarcacion }}
                    </td>
                    <td class="">{{ props.item.boleto.asiento }}</td>
                  </tr>
                </template>
              </v-data-table>
            </div>
            <div class="xim-movile" v-if="this.ticket.boleto != undefined">
              <v-row class="xim-alinea-vertical" >
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Term. Origen</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.origenNombre}}</span>
                </v-col>
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Term. Destino</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.destinoNombre}}</span>
                </v-col>
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Fecha de Embarque</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.fechaEmbarcacion}}</span>
                </v-col>
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Hora de Embarque</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.horaEmbarcacion}}</span>
                </v-col>
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Asiento</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.asiento}}</span>
                </v-col>
                <v-col cols="6" class="xim-colum">
                  <label class="xim-texto-label">Valor</label>
                  <span class="xim-texto-datos">{{this.ticket.boleto.valor | currency}}</span>
                </v-col>
              </v-row>
            </div>
          </v-container>
          <div v-if="validTicket">
            <div class="my-6 text-center blue_light--text" style="font-size: 0.875rem;">
              <h2>
                <v-icon color="blue_light">mdi-arrow-down-thin-circle-outline</v-icon>
                {{ $t('changeTicket.enter_data') }}
              </h2>
            </div>

            <v-radio-group style="display: flex; align-content:center;" row v-model="tCambio" class="radio-center">
              <v-radio value="BLN" label="Boleto en blanco"></v-radio>
              <v-radio value="CUP" label="Cupón descuento"></v-radio>
            </v-radio-group>

            <v-container class="form2">
              <v-form v-model="validForm">
                <div class="xim-desktop">
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
                      v-if="ticket.boleto.tipoCompra === 'CAJA'"
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
                      maxLength="10"
                      @keypress="validar($event, 'rut')"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="pl-3 pr-3">
                    <v-menu
                      v-if="ticket.boleto.tipoCompra === 'CAJA'"
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
                </div>
                <div class="xim-movile">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="email"
                        :label="$t('email')"
                        outline-1
                        color="blue"
                        :rules="generalRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        v-if="ticket.boleto.tipoCompra === 'CAJA'"
                        v-model="pickerDate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        color="blue-dark"
                        max-width="290px"
                        min-width="290px"
                      >
                      <template v-slot:activator="{ on }">
                        <v-text-field
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
                    <v-col cols="12">
                      <v-text-field
                        v-model="rut"
                        label="Rut"
                        outline-1
                        color="blue"
                        :rules="rutRules"
                        required
                        maxLength="10"
                        @keypress="validar($event, 'rut')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-menu
                        v-if="ticket.boleto.tipoCompra === 'CAJA'"
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
                </div>
                <div class="d-flex justify-start">
                  <v-checkbox
                    color="orange_dark"
                    v-model="terms"
                    :rules="[v => !!v || '']"
                    required
                  ></v-checkbox>
                  <div class="d-flex align-center xim-ml">
                    <label class="subheading">
                      {{ $t('read_terms1') }}
                      <span class="termLink" @click="dialog = true">
                        {{ $t('read_terms2') }}
                      </span>
                      {{ $t('read_terms4') }}
                    </label>
                  </div>
                </div>
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
            </v-container>
          </div>
          <v-dialog
            v-model="dialog"
            fullscreen
            transition="dialog-bottom-transition"
            :overlay="false"
            scrollable
          >
            <v-card>
              <v-toolbar dark class="orange">
                <v-btn icon @click.native="dialog = false" dark>
                  <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t('terms') }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <div class="justifyText">
                    <p class="title text-center my-4">
                      <b>Términos y condiciones</b>
                    </p>
                    <div contenteditable="true" v-html="condiciones"></div>
                    <!--{{ cupon.condiciones }}-->
                  </div>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
// Base component
import API from '@/services/api/changeTicket'
import moment from 'moment'
import { mapGetters } from 'vuex'
import validations from '@/helpers/fieldsValidation'

export default {
  //props: ['params'],
  data() {
    return {
      tCambio:null,
      dialog: false,
      loading: false,
      loadingExchange: false,
      search: false,
      validTicket: false,
      validForm: false,
      terms: false,
      condiciones: '',
      validCodeForm: false,
      pickerDate: false,
      pickerHour: false,
      rut: '',
      email: '',
      date: null,
      hour: null,
      ticket: {},
      code: '',
      generalRules: [v => !!v || 'Este campo es requerido'],
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
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
    //console.log('mounted', this.params)
    //this.Consult()
  },
  computed: {
    ...mapGetters({
      userData: ['userData'],
      ticket: ['elTicket']
    }),
    formatedDate() {
      moment.locale(this.$i18n.locale)
      return this.date != null ? moment(this.date).format('LL') : null
    }
  },
  methods: {
    async consultAndFillTable() {
      this.Consult()
    },
    async Consult() {
      try {
        this.loading = true
        this.code = this.code.toUpperCase()
        const response = await API.validateTicket({
          boleto: this.code
        })
        //console.log('Apto?', response.data)
        //console.log(response.data);
        const resultado = response.data.resultado
        //console.log('resultado',resultado);
        if (!resultado.exito) {
          //const { mensaje } = resultado.mensaje
          const text = resultado.mensaje || 'Se genero un error al canjear boleto'
          this.validTicket = false
          this.$notify({
            group: 'error',
            title: 'Error al validar boleto',
            type: 'error',
            text
          })
        } else {
          this.ticket = response.data
          this.condiciones = this.ticket.boleto.condiciones
          this.validTicket = true
          this.$notify({
            group: 'info',
            title: 'El boleto es apto para canje',
            type: 'info'
          })
          this.search = true
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    async submit() {
      try {
        const params = {
          boleto: this.ticket.boleto.boleto,
          email: this.email,
          usuario: this.email,
          rut: this.rut,
          idIntegrador: this.ticket.idIntegrador,
          tipoCambio: this.tCambio
        }
        //console.log("params",params)
        this.loadingExchange = true
        const response = await API.exchangeTicket(params)
        const ticketChange = response.data
        const resultado = response.data.resultado
        if (resultado.exito) {
          /*
          this.$notify({
            group: 'info',
            title: 'El boleto se canjeo con exito',
            type: 'info'
          })
          */
          this.email = ''
          this.rut = ''
          this.$store.dispatch('SET_TICKET_CHANGE', {
            ticketChange
          })
          if (this.tCambio == 'BLN'){
            this.$router.push({ path: 'voucherChangeTicket' })
          } else {
            this.$router.push({ path: 'voucherCupon' });
          }
        } else {
          this.$router.push({ path: 'failChangeTicket' })
        }
        //console.log('boletos', response.data)
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingExchange = false
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
    },
    clear() {
      this.search = false
      this.code = ''
      this.validTicket = false
      this.email = ''
      this.rut = ''
      this.ticket.boleto = {}
    },
    validar(tecla, tipo) {
      let patron
      switch (tipo) {
        case 'rut':
          patron = /[\dKk-]/
          break //Solo acepta números, K y guion
      }
      var charCode = tecla.which ? tecla.which : tecla.keyCode
      if (charCode != 8) {
        let aux = String.fromCharCode(charCode)
        //console.log(patron.test(aux));
        if (patron.test(aux)) {
          return true
        } else {
          tecla.preventDefault()
        }
      } else {
        return true
      }
    },
    validarEnter(tecla) {
      var charCode = tecla.which ? tecla.which : tecla.keyCode
      if (charCode === 13) {
        tecla.preventDefault()
        this.consultAndFillTable()
      }
    }
  }
}
</script>

<style lang="scss">
.purchase-table thead {
  background-color: var(--var-light-blue) !important;
}
.purchase-table-header {
  color: white;
  font-size: 16px;
}
.resp{
  padding: 12px 200px;
}
.form2{
  padding: 12px 200px;
}
@media (max-width: 1267px){
  .resp{
    padding: 10px !important;
  }
  .inp{
    flex: none;
    max-width: 100%;
  }
  .respbtn
  {
    flex: none;
    max-width: 100%;
  }
}
@media (max-width: 700px){
  .form2{
    padding: 0%;
  }
  .v-data-table-header tr{
    display: flex;
    flex-direction: column;
  }
  .v-data-table-header{
    min-width: 50%;
  }
  .tablerows{
    display: flex;
    flex-direction: column;
  }
  .v-data-table table {
    display: flex;
    flex-direction: row;
  }
  .tbody{
    min-width: 50%;
  }
  .v-data-table__wrapper tbody{
    min-width: 50%;
  }
  .theme--light.v-data-table thead tr:last-child th{
    border-bottom: thin solid rgba(0, 0, 0, 0);
  }

}
.v-input--radio-group__input{
  display: flex;
  justify-content: center;
}
</style>
