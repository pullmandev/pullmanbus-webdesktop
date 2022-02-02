<template>
  <div class="mt-50">
    <v-container class="center">
      <v-card class="elevation-10 pb-5">
        <v-container fluid>
          <v-form v-model="pasajeroCuponera.validForm" class="xim-multimedia">
            <v-row class="columnxs">
              <v-col>
                <div class="title-passenger-data">
                  <v-row class="imgresp">
                    <v-col cols="12">
                      <h3 class="blue_dark--text">Datos Pasajero</h3>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
            <v-row class="columnxs">
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-select
                  light
                  dense
                  color="blue_dark"
                  :items="listaTipoDocumento"
                  item-text="descripcion"
                  item-value="valor"
                  label="TIPO DOCUMENTO"
                  v-model="pasajeroCuponera.tipoDocumento"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-text-field
                  light
                  dense
                  label="Numero documento"
                  color="blue_dark"
                  v-model="pasajeroCuponera.numeroDocumento"
                  required
                  maxLength="10"
                  @keyup="validaRut"
                  :rules="
                    pasajeroCuponera.tipoDocumento === 'R' ? rutRules : [(v) => !!v || '']
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-text-field
                  light
                  dense
                  v-model="pasajeroCuponera.nombre"
                  label="Nombre"
                  color="blue_dark"
                  required
                  maxLength="40"
                  @keyup="validaNombre"
                  :rules="[(v) => !!v || '']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-text-field
                  light
                  dense
                  v-model="pasajeroCuponera.apellido"
                  label="Apellido"
                  color="blue_dark"
                  required
                  maxLength="60"
                  @keyup="validaApellido"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-autocomplete
                  light
                  dense
                  color="blue_dark"
                  :items="listaNacionalidad"
                  item-text="descripcion"
                  item-value="valor"
                  label="NACIONALIDAD"
                  v-model="pasajeroCuponera.nacionalidad"
                  required
                  :rules="[(v) => !!v || '']"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <v-text-field
                  light
                  dense
                  color="blue_dark"
                  label="EMAIL"
                  v-model="pasajeroCuponera.email"
                  required
                  maxLength="100"
                  @keyup="validaEmail"
                  :rules="[(v) => !!v || '']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="xim-mt30">
                <v-text-field
                  light
                  dense
                  color="blue_dark"
                  label="DIRECCION"
                  v-model="pasajeroCuponera.direccion"
                  required
                  :rules="[(v) => !!v || '']"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0">
                <calendar v-model="pasajeroCuponera.fromDate" />
              </v-col>

              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0"> </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="pt-0 headline">
                <v-btn
                  outlined
                  class="grey--text mr-5 md-5"
                  @click="clearPassengerData('ALL')"
                >
                  Limpiar
                </v-btn>
                <v-btn
                  color="orange"
                  :disabled="!pasajeroCuponera.validForm"
                  class="white--text mr-5 md-5"
                  @click="saveCouponData"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// Base components

import { mapGetters } from 'vuex'
import openDialog from '@/helpers/openDialog'
import validations from '@/helpers/fieldsValidation'
import APIPassenger from '@/services/api/passenger'
import APITransaction from '@/services/api/transaction'
import Calendar from '@/views/CouponServices/FormPublic/Calendar'

export default {
  components: {
    Calendar,
  },
  data: () => ({
    fromDate: null,
    loading: false,
    validForm: false,
    windowSize: { x: window.innerWidth, y: window.innerHeight },
    generalRules: [(v) => !!v || 'Este campo es requerido'],
    forLS: JSON.parse(localStorage.getItem('vuex')),
    loginDialog: false,
    formSearch: false,
    pasajeroCuponera: {
      validForm: false,
      tipoDocumento: 'R',
      documento: '',
      comuna: '',
      direccion: '',
      email: '',
      materno: '',
      nacionalidad: '',
      nombres: '',
      paterno: '',
      telefono: '',
      dialog: false,
      fechaNacimiento: '',
      fromDate: null
    },
    rutRules: [(v) => !!v || 'Rut es requerido', validations.rutValidation],
    emailRules: [(v) => !!v || 'E-mail es requerido', validations.emailValidation],
    listaTipoDocumento: [],
    listaNacionalidad: [],
  }),
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    APIPassenger.getDocumentTypeList()
      .then((response) => {
        if (response.data) {
          response.data.forEach((item) => {
            this.listaTipoDocumento.push(item)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    APIPassenger.getNationalityList()
      .then((response) => {
        if (response.data) {
          response.data.forEach((item) => {
            this.listaNacionalidad.push(item)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  watch: {},
  methods: {
    clearPassengerData(option) {
      if (option === 'ALL') {
        this.pasajeroCuponera.tipoDocumento = 'R'
        this.pasajeroCuponera.numeroDocumento = ''
      }
      this.fromDate = null
      this.pasajeroCuponera.nombre = ''
      this.pasajeroCuponera.apellido = ''
      this.pasajeroCuponera.nacionalidad = ''
      this.pasajeroCuponera.email = ''
      this.pasajeroCuponera.comunaOrigen = ''
      this.pasajeroCuponera.telefono = ''
      this.pasajeroCuponera.telefonoEmergencia = ''
      this.pasajeroCuponera.comunaDestino = ''
      this.pasajeroCuponera.direccion = ''
      this.pasajeroCuponera.validForm = false
    },
    validaRut() { 
      this.pasajeroCuponera.numeroDocumento = this.pasajeroCuponera.numeroDocumento.replace(/[\s]|[a-yA-Y][^kK]/g,'');
    },
    validaNombre() { 
      this.pasajeroCuponera.nombre = this.pasajeroCuponera.nombre.replace(/\d/g,'');
    },
    validaApellido() { 
      this.pasajeroCuponera.apellido = this.pasajeroCuponera.apellido.replace(/\d/g,'');
    },
    validaEmail() { 
      this.pasajeroCuponera.email = this.pasajeroCuponera.email.replace(/[\d]|[\s]/g,'');
    },
    openDialog,
    saveCouponData() {
      console.log('EMAIL::::..',validations.emailValidation(this.pasajeroCuponera.email));
      if(validations.emailValidation(this.pasajeroCuponera.email)) {
        this.pasajeroCuponera.email = '';
        return validations.emailValidation(this.pasajeroCuponera.email);
      }
      this.$store.dispatch('SET_USER_COUPON', {
        userCoupon: {
          documento: this.pasajeroCuponera.numeroDocumento,
          email: this.pasajeroCuponera.email,
          nacionalidad: this.pasajeroCuponera.nacionalidad,
          nombre: this.pasajeroCuponera.nombre,
          apellido: this.pasajeroCuponera.apellido,
          direccion: this.pasajeroCuponera.direccion,
          fechaNacimiento: this.fromDate,
          active: true,
        },
      });

      let datosCliente = {
        numeroDocumento: this.pasajeroCuponera.numeroDocumento,
        tipoDocumento: this.pasajeroCuponera.tipoDocumento,
        nombre: this.pasajeroCuponera.nombre,
        apellido: this.pasajeroCuponera.apellido,
        nacionalidad: this.pasajeroCuponera.nacionalidad,
        email: this.pasajeroCuponera.email,
        direccion: this.pasajeroCuponera.direccion,
        fechaNacimiento: this.pasajeroCuponera.fromDate 
      }
      console.log(datosCliente)
      APITransaction.postClientData(datosCliente)

      this.$router.push({ path: `/couponServices/` })
    },
    validar(tecla, tipo) {
      let patron
      switch (tipo) {
        case 'rut':
          patron = /[\dKk-]/
          break //Solo acepta números, K y guion
        case 'telefono':
          patron = /[\d+]/
          break //Solo acepta números y punto
      }
      var charCode = tecla.which ? tecla.which : tecla.keyCode
      if (charCode != 8) {
        let aux = String.fromCharCode(charCode)
        console.log(patron.test(aux))
        if (patron.test(aux)) {
          return true
        } else {
          tecla.preventDefault()
        }
      } else {
        return true
      }
    },
  },
}
</script>
<style>
.xim-mt30 { 
  margin: 10px 0 0 0;
}
.xim-multimedia { 
  margin: 0 5%!important;
}
.checkbox {
  display: inline-block !important;
}
.termLink {
  color: var(--var-blue_light);
  text-decoration: underline;
}
.termLink:hover {
  cursor: pointer;
}
.webpay-payment {
  width: 150px;
}
input {
  text-transform: uppercase;
}
</style>
