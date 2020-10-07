<template>
  <div id="idSearchConfirm" >
    <v-row v-if="!pideOrigenDestino">
      <v-col cols="12" sm="12" md="8" offset-md="2" >
        <v-card class="mt-12" >
          <v-toolbar
            dense
            class="elevation-0"
            dark
            color="blue_light"
            id="serviceToolbar"
          >
            <v-toolbar-title>
              <span class="title ml-3">
                Servicio por confirmar:
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form v-model="validForm">
                <v-row>
                  <v-col cols="12" md="4">
                    <ConfirmDatePicker v-model="date" :rules="generalRules" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      filled
                      outlined
                      dense
                      v-model="ticket"
                      :label="$t('ticket')"
                      outline-1
                      color="blue"
                      :rules="generalRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="displayNoneSm" md="4"></v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      filled
                      outlined
                      dense
                      v-model="email"
                      :rules="emailRules"
                      :label="$t('email')"
                      @input="
                        v => {
                          this.emailconfirmError = this.confirmemail.toUpperCase() !== v.toUpperCase()
                        }
                      "
                      outline-1
                      color="blue"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      filled
                      outlined
                      dense
                      :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                      :error="emailconfirmError"
                      @input="
                        v => {
                          this.emailconfirmError = this.email.toUpperCase() !== v.toUpperCase()
                        }
                      "
                      v-model="confirmemail"
                      :label="$t('confirm_email')"
                      @paste.prevent
                      outline-1
                      color="blue"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      class="white--text"
                      :disabled="!validForm"
                      :loading="loadingServices || loading"
                      color="blue_dark"
                      @click="validateSearch"
                    >
                      <span>Consultar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="pideOrigenDestino" >
      <v-col cols="12" sm="12" md="8" offset-md="2" >
        <v-card class="mt-12" >
          <v-toolbar
            dense
            class="elevation-0"
            dark
            color="blue_light"
            id="serviceToolbar"
          >
            <v-toolbar-title>
              <span class="title ml-3">
                Servicio por confirmar:
              </span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container > 
              <v-form v-model="validForm2">
                <v-row >
                  <v-col cols="12" md="4" >
                    <cities-from-list direction="from" v-model="fromCity" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <cities-to-list direction="to" v-model="toCity" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn
                      class="white--text"
                      :disabled="!validForm2"
                      :loading="loadingServices || loading"
                      color="blue_dark"
                      @click="search">
                      <span>Buscar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// Base components
import moment from 'moment'
import ConfirmDatePicker from '@/views/ConfirmationServices/ConfirmDatePicker'
import { mapGetters } from 'vuex'
import API from '@/services/api/confirmationTicket'
import scrollAnimation from '@/helpers/scrollAnimation'
import validations from '@/helpers/fieldsValidation'
import _ from 'lodash'
import CitiesToList from '@/views/ConfirmationServices/CitiesTo'
import CitiesFromList from '@/views/ConfirmationServices/CitiesFrom'

export default {
  props: ['type'],
  components: {
    ConfirmDatePicker,    
    CitiesFromList,
    CitiesToList
  },
  data() {
    return {
      fromCity: {},
      toCity: {},
      pideOrigenDestino:false,
      loading: false,
      validForm: false,
      validForm2: false,
      ticket: '',
      email: '',
      date: null,
      confirmemail: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      boletoConfirmacion:{},
      emailconfirmError: false,
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  computed: {
    ...mapGetters({
      loadingServices: ['getConfirmationLoadingService']
    })
  },
  mounted() {
    scrollAnimation('#idSearchConfirm')
    this.date = moment()
      .format()
      .split(':')[0]
      .split('T')[0]
  },
  watch: {
    fromCity(value) {     
      this.toCity = {}
      let searchingCity = {
        "origen":this.boletoConfirmacion.idOrigen,
        "destino":this.boletoConfirmacion.idDestino,
        "seleccion":value.codigo,
        "idIntegrador":this.boletoConfirmacion.idIntegrador
      }
      this.$store.dispatch('LOAD_CITIES_TO_CONFIRMATION_LIST', {
        searchingCity
      })
    }
  },
  methods: {
    search() {
      let ticket = this.boletoConfirmacion;
      ticket.ciudadOrigen = this.fromCity.codigo;
      ticket.ciudadDestino = this.toCity.codigo;
      this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
      ticket,
      type: 'ticket'
      })
      this.$store.dispatch('LOAD_CONFIRMATION_SERVICES_LIST', {
      date: this.date
      })
      this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
      date: this.date,
      type: 'date'
      })

    },
    validateSearch() {
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Validando boleto',
        type: 'info'
      })
      API.validateTicket({ boleto: this.ticket })
        .then(response => {
          const data = response.data
          //console.log('ticket', data)
          if (!data.resultado.exito) {
            this.$notify({
              group: 'error',
              title: data.resultado.mensaje,
              type: 'error'
            })
            return
          }
          let ticket = _.pick(data, [
            'boleto',
            'ciudadDestino',
            'ciudadOrigen',
            'idOrigen',
            'idDestino',
            'clase',
            'empresa',
            'idIntegrador',
            'pideOrigenDestino',
            'claseFiltro'
          ])
          ticket.confirmation = false
          ticket.email = this.email.toUpperCase()
          //this.fromCity.codigo=ticket.ciudadOrigen
          //this.toCity.codigo=ticket.ciudadDestino
          this.pideOrigenDestino = ticket.pideOrigenDestino;
          if(!ticket.pideOrigenDestino){
            this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
              ticket,
              type: 'ticket'
            })
            this.$store.dispatch('LOAD_CONFIRMATION_SERVICES_LIST', {
              date: this.date
            })
            this.$store.dispatch('SET_SEARCHING_CONFIRMATION', {
              date: this.date,
              type: 'date'
            })
          }else{
            this.boletoConfirmacion = ticket;
            let searchingCity = {"origen":ticket.idOrigen,"destino":ticket.idDestino,"idIntegrador":ticket.idIntegrador}
             this.$store.dispatch('LOAD_CITIES_CONFIRMATION_LIST', {
              searchingCity
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
$padding: 100px;
.searchContainer {
  padding-top: $padding;
  padding-bottom: $padding;
  min-height: 100vh;
}

</style>
