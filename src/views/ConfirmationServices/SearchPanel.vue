<template>
  <div id="idSearchConfirm" class="custom-form">
    <img
      src="../../../static/images/form_banners/confirmacion_pasajes.png"
      alt="banner-confirmacion"
      class="xim-bannerConfirmacion"
    />
    <v-container>
      <v-toolbar dense class="toolbar-radius" dark color="blue_light" id="serviceToolbar">
        <v-toolbar-title class="d-flex align-center">
          <img
            src="../../../static/logos/menu/icono_confirmacion.svg"
            alt="logo_confirmacion"
            height="48"
          />
          <h1 class="title d-inline">
            {{ $t('confirmation.form') }}
          </h1>
        </v-toolbar-title>
      </v-toolbar>
      <p class="blue_light--text my-5 xim-margen">
        {{ $t('confirmation.content') }}
      </p>
      <v-row v-if="!pideOrigenDestino">
        <v-col cols="12" sm="12" md>
          <v-card color="xim-background_blue">
            <v-card-text>
              <div class="my-6 text-center blue_light--text" style="font-size: 0.875rem;">
                <h2>
                  <v-icon color="blue_light" size="35"
                    >mdi-arrow-down-thin-circle-outline</v-icon
                  >
                  {{ $t('confirmation.enter') }}
                </h2>
              </div>
              <v-container class="resp">
                <v-form v-model="validForm">
                  <v-row class="xim-desktop">
                    <v-col cols="12" md="5">
                      <ConfirmDatePicker
                        v-model="date"
                        :rules="generalRules"
                        color="blue_light"
                      />
                    </v-col>
                    <v-col cols="12" md="5">
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
                    <v-col class="displayNoneSm" md="2"></v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        filled
                        outlined
                        dense
                        v-model="email"
                        :rules="emailRules"
                        :label="$t('email')"
                        @input="
                          v => {
                            this.emailconfirmError =
                              this.confirmemail.toUpperCase() !== v.toUpperCase()
                          }
                        "
                        outline-1
                        color="blue"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        filled
                        outlined
                        dense
                        :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                        :error="emailconfirmError"
                        @input="
                          v => {
                            this.emailconfirmError =
                              this.email.toUpperCase() !== v.toUpperCase()
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
                    <v-col cols="12" md="2">
                      <v-btn
                        class="white--text"
                        :disabled="!validForm"
                        :loading="loadingServices || loading"
                        color="blue_dark"
                        @click="validateSearch"
                      >
                        <span>{{ $t('consult') }}</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="xim-movile">
                    <v-col cols="12">
                      <ConfirmDatePickerMov v-model="date" :rules="generalRules" />
                      <v-text-field
                        v-model="ticket"
                        :label="$t('ticket')"
                        outline-1
                        color="blue_dark"
                        :rules="generalRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        :label="$t('email')"
                        @input="
                          v => {
                            this.emailconfirmError =
                              this.confirmemail.toUpperCase() !== v.toUpperCase()
                          }
                        "
                        outline-1
                        color="blue_dark"
                        required
                      ></v-text-field>
                      <v-text-field
                        :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                        :error="emailconfirmError"
                        @input="
                          v => {
                            this.emailconfirmError =
                              this.email.toUpperCase() !== v.toUpperCase()
                          }
                        "
                        v-model="confirmemail"
                        :label="$t('confirm_email')"
                        @paste.prevent
                        outline-1
                        color="blue_dark"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        class="white--text"
                        :disabled="!validForm"
                        :loading="loadingServices || loading"
                        color="blue_dark"
                        @click="validateSearch"
                      >
                        <span>{{ $t('consult') }}</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="pideOrigenDestino">
        <v-col cols="12" sm="12">
          <v-card class="mt-12" color="background_blue">
            <v-card-text>
              <div class="my-6 text-center blue_light--text" style="font-size: 0.875rem;">
                <h2>
                  <v-icon color=" blue_light">mdi-arrow-down-thin-circle-outline</v-icon>
                  INGRESA TU SERVICIO POR CONFIRMAR:
                </h2>
              </div>
              <v-container style="padding: 12px 200px">
                <v-form v-model="validForm2">
                  <v-row>
                    <v-col cols="12" md="5">
                      <cities-from-list direction="from" v-model="fromCity" outlined />
                    </v-col>
                    <v-col cols="12" md="5">
                      <cities-to-list direction="to" v-model="toCity" outlined />
                    </v-col>
                    <v-col cols="12" md="2">
                      <v-btn
                        class="white--text"
                        :disabled="!validForm2"
                        :loading="loadingServices || loading"
                        color="blue_dark"
                        @click="search"
                      >
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
    </v-container>
  </div>
</template>

<script>
// Base components
import moment from 'moment'
import ConfirmDatePicker from '@/views/ConfirmationServices/ConfirmDatePicker'
import ConfirmDatePickerMov from '@/views/ConfirmationServices/ConfirmacionDataPicketMov'
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
    CitiesToList,
    ConfirmDatePickerMov
  },
  data() {
    return {
      fromCity: {},
      toCity: {},
      pideOrigenDestino: false,
      loading: false,
      validForm: false,
      validForm2: false,
      ticket: '',
      email: '',
      date: null,
      confirmemail: '',
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      boletoConfirmacion: {},
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
        origen: this.boletoConfirmacion.idOrigen,
        destino: this.boletoConfirmacion.idDestino,
        seleccion: value.codigo,
        idIntegrador: this.boletoConfirmacion.idIntegrador,
        boleto: this.boletoConfirmacion.boleto
      }
      this.$store.dispatch('LOAD_CITIES_TO_CONFIRMATION_LIST', {
        searchingCity
      })
    }
  },
  methods: {
    search() {
      let ticket = this.boletoConfirmacion
      ticket.ciudadOrigen = this.fromCity.ciudad
      ticket.ciudadDestino = this.toCity.ciudad
      console.log(ticket)
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
      this.ticket = this.ticket.toUpperCase()
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Validando boleto',
        type: 'info'
      })
      API.validateTicket({ boleto: this.ticket, idSistema : process.env.ID_SISTEMA })
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
            'claseFiltro',
            'rut'
          ])
          ticket.confirmation = false
          ticket.email = this.email.toUpperCase()
          //this.fromCity.codigo=ticket.ciudadOrigen
          //this.toCity.codigo=ticket.ciudadDestino
          this.pideOrigenDestino = ticket.pideOrigenDestino
          if (!ticket.pideOrigenDestino) {
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
          } else {
            this.boletoConfirmacion = ticket
            let searchingCity = {
              origen: ticket.idOrigen,
              destino: ticket.idDestino,
              idIntegrador: ticket.idIntegrador,
              boleto: ticket.boleto
            }
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

<style lang="scss">
#idSearchConfirm {
  .searchContainer {
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 100vh;
  }
}
.resp {
  padding: 12px 200px;
}
@media (max-width: 1267px) {
  .resp {
    padding: 10px !important;
  }
}
</style>
