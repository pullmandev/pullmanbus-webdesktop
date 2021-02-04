<template>
  <div>
    <v-container class="center">
      <v-card class="elevation-10 pt-5 pb-5">
        <v-container fluid>
          <v-form v-model="formSearch">
            <v-row class="pt-3">
              <v-col cols="1" sm="12">
                <v-img src="../../../static/images/banner_pasajero.png" />
              </v-col>
            </v-row>            
            <v-row style="padding-top:20px;">
              <v-col cols="6" sm="6" md="5" lg="4" offset-md="1" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  v-model="boleto"
                  label="Boleto"
                  outline-1
                  color=""
                  required
                  :rules="[v => !!v || '']"
                  maxLength="15"
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-btn
                  color="orange"
                  class="white--text mr-5 md-5"
                  @click="search()"
                  :disabled="!formSearch"
                  >Buscar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
          <v-form v-model="pasajero.validForm"  v-if="verBoleto">
          <v-row>
            <v-col>
              <div class="title-passenger-data">
                <v-row>
                  <v-col lg="1">
                    <v-img
                      class="icono_persona"
                      title=""
                      src="../../../static/images/icono_persona.png"
                    />
                  </v-col>
                  <v-col>
                    <span
                      ><h6 class="headline pt-1">
                        DATOS PASAJERO
                      </h6></span
                    >
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>          
            <v-row>
              <v-col cols="6" sm="6" md="5" lg="4" offset-md="2" class="pt-0">
                <v-select
                  light
                  filled
                  outlined
                  dense
                  :items="listaTipoDocumento"
                  item-text="descripcion"
                  item-value="valor"
                  label="TIPO DOCUMENTO"
                  v-model="pasajero.tipoDocumento"
                ></v-select>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  label="Numero documento"
                  outline-1
                  color=""
                  v-model="pasajero.numeroDocumento"
                  required
                  maxLength="20"
                  :rules="
                    pasajero.tipoDocumento === 'R' ? rutRules : [v => !!v || '']
                  "
                  @keypress="
                    pasajero.tipoDocumento === 'R' ? validar($event, 'rut') : ''
                  "
                  v-on:blur="searchPassengerData(pasajero)"
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" offset-md="2" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  v-model="pasajero.nombre"
                  label="Nombre"
                  outline-1
                  color=""
                  required
                  :rules="[v => !!v || '']"
                  maxLength="40"
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  v-model="pasajero.apellido"
                  label="Apellido"
                  outline-1
                  color=""
                  required
                  :rules="[v => !!v || '']"
                  maxLength="60"
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" offset-md="2" class="pt-0">
                <v-autocomplete
                  light
                  filled
                  outlined
                  dense
                  :items="listaNacionalidad"
                  item-text="descripcion"
                  item-value="valor"
                  label="NACIONALIDAD"
                  v-model="pasajero.nacionalidad"
                  required
                  :rules="[v => !!v || '']"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  :label="$t('email')"
                  outline-1
                  color=""
                  :rules="emailRules"
                  v-model="pasajero.email"
                  required
                  maxLength="100"
                ></v-text-field>
              </v-col>
              <v-col cols="5" sm="6" md="5" lg="4" offset-md="2" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  label="Contacto Telefónico"
                  outline-1
                  color=""
                  v-model="pasajero.telefono"
                  required
                  maxLength="12"
                  @keypress="validar($event, 'telefono')"
                  :rules="[v => !!v || '']"
                ></v-text-field>
              </v-col>              
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-text-field
                  light
                  filled
                  outlined
                  dense
                  label="Contacto Telefónico Emergencia"
                  outline-1
                  color=""
                  v-model="pasajero.telefonoEmergencia"
                  required
                  maxLength="12"
                  @keypress="validar($event, 'telefono')"
                  :rules="[v => !!v || '']"
                ></v-text-field>
              </v-col>
              <v-col cols="5" sm="6" md="5" lg="3" offset-md="2" class="pt-0">
                <v-autocomplete
                  light
                  filled
                  outlined
                  dense
                  :items="listaComuna"
                  item-text="nombre"
                  item-value="codigo"
                  label="COMUNA RESIDENCIA ORIGEN"
                  v-model="pasajero.comunaOrigen"
                  required
                  :rules="[v => !!v || '']"
                ></v-autocomplete>
              </v-col>
               <v-col cols="1" sm="1" md="1" lg="1" class="pt-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span>Este campo debe ser llenado con la comuna de su hogar, la comuna de su trabajo o la comuna que se encuentra visitando previamente al viaje.</span>
                </v-tooltip>
              </v-col>             
              <v-col cols="6" sm="6" md="5" lg="3" class="pt-0">
                <v-autocomplete
                  light
                  filled
                  outlined
                  dense
                  :items="listaComuna"
                  item-text="nombre"
                  item-value="codigo"
                  label="COMUNA RESIDENCIA DESTINO"
                  v-model="pasajero.comunaDestino"
                  required
                  :rules="[v => !!v || '']"
                ></v-autocomplete>
              </v-col>
              <v-col cols="1" sm="1" md="1" lg="1" class="pt-0">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="primary" dark v-bind="attrs" v-on="on">
                      mdi-information-outline
                    </v-icon>
                  </template>
                  <span>Este campo debe ser llenado con la comuna donde residirá en destino, la comuna donde trabajará en el destino o la comuna que visitará en el destino.</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" offset-md="2" class="pt-0">
                <!--div class="d-flex justify-start">
                  <v-checkbox
                    color="orange_dark"
                    v-model="pasajero.terms"
                    :rules="[v => !!v || '']"
                    required
                  ></v-checkbox>
                  <div class="d-flex align-center">
                    <label class="subheading"
                      >{{ $t('read_terms1') }}
                      <span class="termLink" @click="pasajero.dialog = true">{{
                        $t('read_terms2')
                      }}</span></label
                    >
                  </div>
                </div-->
                <!--v-dialog
                  v-model="pasajero.dialog"
                  fullscreen
                  transition="dialog-bottom-transition"
                  :overlay="false"
                  scrollable
                >
                  <v-card>
                    <v-toolbar dark class="orange">
                      <v-btn icon @click.native="pasajero.dialog = false" dark>
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ $t('terms') }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                      <passengerTerms />
                    </v-card-text>
                  </v-card>
                </v-dialog-->
              </v-col>
              <v-col cols="6" sm="6" md="5" lg="4" class="pt-0">
                <v-btn
                  outlined
                  class="grey--text mr-5 md-5"
                  @click="clearPassengerData('ALL')"
                  >Limpiar</v-btn
                >
                <v-btn
                  color="orange"
                  :disabled="!pasajero.validForm"
                  class="white--text mr-5 md-5"
                  @click="savePassengerData()"
                  >Guardar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import validations from '@/helpers/fieldsValidation'
import APICities from '@/services/api/cities'
import APIPassenger from '@/services/api/passenger'
//import PassengerTerms from '@/views/Services/stepper/PassengerTerms'
export default {
  components: {
    //PassengerTerms
  },
  data() {
    return {
      formSearch: false,
      boleto: '',
      verBoleto: false,
      pasajero: {
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
        terms: false,
        dialog: false
      },
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      listaTipoDocumento: [],
      listaNacionalidad: [],
      listaComuna: []
    }
  },
  mounted() {
    const ticket = this.$route.params.boleto
    this.boleto = ticket === undefined ? '' : ticket  
    this.search();  
    APIPassenger.getDocumentTypeList()
      .then(response => {
        if (response.data) {
          response.data.forEach(item => {
            this.listaTipoDocumento.push(item)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    APIPassenger.getNationalityList()
      .then(response => {
        if (response.data) {
          response.data.forEach(item => {
            this.listaNacionalidad.push(item)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    APICities.getAllCities()
      .then(response => {
        if (response.data) {
          response.data.forEach(item => {
            this.listaComuna.push(item)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    async search(){
      this.verBoleto = false;
        if(this.boleto != ''){
            APIPassenger.getPassengerDataByTicket(this.boleto)
            .then(response => {
                if(response.data.mensaje.exito){
                    this.pasajero = {...response.data.registro}
                    this.pasajero.numeroDocumento = this.pasajero.documento
                    this.verBoleto = true;
                }else{
                    this.$notify({
                        group: 'error',
                        title: response.data.mensaje.mensaje,
                        type: 'error'
                    })
                }                
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    async searchPassengerData() {
      let passenger = {
        tipoDocumento: this.pasajero.tipoDocumento,
        documento: this.pasajero.numeroDocumento
      }
      this.clearPassengerData(''),
        await APIPassenger.getPassengerData(passenger).then(response => {
          if (response.data.documento != null) {
            this.pasajero.numeroDocumento = response.data.documento
            this.pasajero.nombre = response.data.nombres
            this.pasajero.apellido = response.data.paterno + ' ' + response.data.materno
            this.pasajero.nacionalidad = response.data.nacionalidad
            this.pasajero.email = response.data.email
            this.pasajero.comunaOrigen = response.data.comuna
            this.pasajero.telefono = response.data.telefono
            this.pasajero.comunaDestino = ''
            this.pasajero.direccion = response.data.direccion
            this.pasajero.telefonoEmergencia = response.data.telefonoEmergencia
            this.pasajero.comunaDestino = response.data.comunaDestino
          }
        })
    },
    async savePassengerData() {
        let passenger = {
            boleto : this.boleto,
            comunaDestino : this.pasajero.comunaDestino,
            comunaOrigen : this.pasajero.comunaOrigen,
            documento : this.pasajero.numeroDocumento,
            email : this.pasajero.email,
            nacionalidad : this.pasajero.nacionalidad,
            nombre : this.pasajero.nombre,
            apellido : this.pasajero.apellido,
            telefono : this.pasajero.telefono,
            telefonoEmergencia : this.pasajero.telefonoEmergencia,
            tipoDocumento : this.pasajero.tipoDocumento
        }
        APIPassenger.savePassengerDataTicket(passenger)
        .then(response => {
            if(response.data.exito){
                this.$notify({
                    group: 'info',
                    title: 'Datos modificados correctamente.',
                    type: 'info'
                })
                this.clearPassengerData('ALL');
                this.verBoleto = false;
                window.scroll(0, 0)
            }else{
                this.$notify({
                    group: 'error',
                    title: 'Error al modificar datos.',
                    type: 'error'
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    },
    clearPassengerData(option) {
      if (option === 'ALL') {
        this.pasajero.tipoDocumento = 'R'
        this.pasajero.numeroDocumento = ''
      }
      this.pasajero.nombre = ''
      this.pasajero.apellido = ''
      this.pasajero.nacionalidad = ''
      this.pasajero.email = ''
      this.pasajero.comunaOrigen = ''
      this.pasajero.telefono = ''
      this.pasajero.telefonoEmergencia = ''
      this.pasajero.comunaDestino = ''
      this.pasajero.terms = false
    },
    validaData() {},
    validar(tecla, tipo) {
      let patron
      switch (tipo) {
        case 'rut':
          patron = /[\dKk-]/
          break //Solo acepta n�meros, K y guion
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
    }
  }
}
</script>
<style scoped>
.center {
  margin-top: 8vh !important;
}
.confirmation-title h1,
.confirmation-title h3 {
  text-align: center;
  font-weight: bold !important;
}
.confirmation-title h1 {
  line-height: 4rem !important;
  font-size: 44px;
}
.confirmation-title p {
  font-size: 20px;
  color: #a0a0a0;
  text-align: center;
}
</style>