<template>
  <div>
    <v-container fluid>
      <!-- Card date passenger -->
      <v-card class="elevation-1 pl-4 pb-10 rounded-search-box">
        <div
          class="white--text text-left orange passenger-data-advice"
          v-if="!hasVuelta"
        >
          <span class="ml-10">
            Horario en promoción
          </span>
        </div>
        <v-card-text>
          <v-card-text>
            <h3 class="headline pt-3">{{ $t('passenger_data') }}</h3>
          </v-card-text>
          <v-row class="pt-3">
            <v-col cols="1" sm="12">
              <v-img src="../../../../static/images/banner_pasajero.png" />
            </v-col>
          </v-row>
          <v-row
            class="pt-3"
            v-if="payment_info.email && payment_info.email !== ''"
          >
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">{{ $t('email') }}</span>
                  <h3 class="py-2 body-2">{{ payment_info.email }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="3">
              <v-card class="elevation-0">
                <v-card-text>
                  <span class="font-weight-black">Rut</span>
                  <h3 class="py-2 body-2">{{ payment_info.rut }}</h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-card-text>
            <h3 v-if="hasVuelta">
              {{ $t('two_reservation') }}
            </h3>
            <h3 v-else class="capitalize">{{ $t('one_reservation') }}</h3>
          </v-card-text>
          <v-data-table
            :headers="headers"
            :items="selectedSeats" 
            :expanded="selectedSeats"           
            :sort-by="['fechaSubida', 'horaSalida']"
            :sort-desc="[false, false]"
            item-key="id"
            class="elevation-0"
            show-expand
            hide-default-footer
            :single-expand="false"
          >
            <template slot="item" slot-scope="props">
              <tr>
                <td style="overflow: hidden; max-width: 70px" class="pa-0">
                  <div
                    v-if="props.item.tomadoPromo"
                    class="orange confirmation-promotion-advice"
                  />
                </td>
                <td>
                  <h3>{{ props.item.vuelta ? 'VUELTA' : 'IDA' }}</h3>
                </td>
                <td class="px-2">
                  <span style="0.7rem">{{ props.item.terminalOrigen }}</span>
                </td>
                <td class="px-2">
                  <span style="0.7rem">{{ props.item.terminalDestino }}</span>
                </td>
                <td>
                  <span style="0.7rem">{{ props.item.fechaSubida }}</span>
                </td>
                <td>
                  <span style="0.7rem">{{ props.item.horaSalida }}</span>
                </td>
                <td>
                  <span>
                    {{ props.item.servicioNombre }}
                  </span>
                </td>
                <td class="text-center">
                  <h3>
                    {{
                      props.item.piso > 0
                        ? parseInt(props.item.asiento)
                        : props.item.asiento
                    }}
                  </h3>
                </td>
                <td v-if="!hasVuelta" class="text-center">
                  <h3>
                    {{ props.item.tomadoPromo ? 'Si' : 'No' }}
                  </h3>
                </td>
                <td>
                  <h3>
                    ${{
                      props.item.tomadoPromo
                        ? props.item.totalPromo
                        : props.item.precio
                    }}
                  </h3>
                </td>
                <td>
                  <v-btn
                    text
                    color="orange"
                    @click="deleteSelected(props.item)"
                    :disabled="deleting"
                    v-if="props.item.tipo != 'pet'"
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn text @click="props.expand(!props.isExpanded)" 
                    v-if="props.item.tipo != 'pet'">                    
                    <v-img
                      width="32px"
                      title="Ingresar datos pasajero"
                      src="../../../../static/images/icono_bus_flecha.png"
                    />
                  </v-btn>
                  <v-img
                    v-if="props.item.tipo === 'pet'"
                    width="52px"
                    style="margin-left:8px;"
                    title="Asiento Mascota"
                    src="../../../../static/logos/seats/icono_pata_verde.svg"
                  />
                </td>
              </tr>
            </template>
            <template v-slot:expanded-item="props">
              <tr>
                <td
                  :colspan="props.headers.length"
                  v-if="
                    !props.item.tomadoPromo && props.item.hasPromo && !hasVuelta
                  "
                >
                  <v-row>
                    <v-col cols="8" md="8" sm="12">
                      <strong class="orange--text">
                        {{ setBannerText(props.item) }}
                      </strong>
                    </v-col>
                    <v-col
                      cols="4"
                      md="4"
                      sm="12"
                      class="pt-0 d-flex justify-end"
                    >
                      <v-btn
                        color="orange"
                        small
                        class="white--text my-3"
                        @click="confirmationAmount(props.item)"
                      >
                        Agregar
                      </v-btn>
                    </v-col>
                  </v-row>
                </td>
              </tr>
              <tr class="passenger-data" v-if="props.item.tipo != 'pet'">
                <td :colspan="props.headers.length">
                  <v-row>
                    <v-col>
                      <div class="title-passenger-data">
                        <v-row>
                          <v-col lg="1">
                            <v-img
                              class="icono_persona"
                              title=""
                              src="../../../../static/images/icono_persona.png"
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
                  <v-form v-model="props.item.pasajero.validForm">
                    <v-row>
                      <v-col
                        cols="6"
                        sm="6"
                        md="5"
                        lg="4"
                        offset-md="2"
                        class="pt-0"
                      >
                        <v-select
                          light
                          filled
                          outlined
                          dense
                          :items="listaTipoDocumento"
                          item-text="descripcion"
                          item-value="valor"
                          label="TIPO DOCUMENTO"
                          v-model="props.item.pasajero.tipoDocumento"
                          v-on:change="changeDocumentType(props.item.pasajero)"
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
                          v-model="props.item.pasajero.numeroDocumento"
                          required
                          maxLength="20"
                          :rules="
                            props.item.pasajero.tipoDocumento === 'R'
                              ? rutRules
                              : [v => !!v || '']
                          "
                          @keypress="
                            props.item.pasajero.tipoDocumento === 'R'
                              ? validar($event, 'rut')
                              : ''
                          "
                          v-on:blur="searchPassengerData(props.item.pasajero)"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="6"
                        md="5"
                        lg="4"
                        offset-md="2"
                        class="pt-0"
                      >
                        <v-text-field
                          light
                          filled
                          outlined
                          dense
                          v-model="props.item.pasajero.nombre"
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
                          v-model="props.item.pasajero.apellido"
                          label="Apellido"
                          outline-1
                          color=""
                          required
                          :rules="[v => !!v || '']"
                          maxLength="60"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="6"
                        md="5"
                        lg="4"
                        offset-md="2"
                        class="pt-0"
                      >
                        <v-autocomplete
                          light
                          filled
                          outlined
                          dense
                          :items="listaNacionalidad"
                          item-text="descripcion"
                          item-value="valor"
                          label="NACIONALIDAD"
                          v-model="props.item.pasajero.nacionalidad"
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
                          v-model="props.item.pasajero.email"
                          required
                          maxLength="100"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="5"
                        sm="6"
                        md="5"
                        lg="4"
                        offset-md="2"
                        class="pt-0"
                      >
                        <v-text-field
                          light
                          filled
                          outlined
                          dense
                          label="Contacto Telefónico"
                          outline-1
                          color=""
                          v-model="props.item.pasajero.telefono"
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
                          v-model="props.item.pasajero.telefonoEmergencia"
                          required
                          maxLength="12"
                          @keypress="validar($event, 'telefono')"
                          :rules="[v => !!v || '']"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="5"
                        sm="6"
                        md="5"
                        lg="3"
                        offset-md="2"
                        class="pt-0"
                      >
                        <v-autocomplete
                          light
                          filled
                          outlined
                          dense
                          :items="listaComuna"
                          item-text="nombre"
                          item-value="codigo"
                          label="COMUNA RESIDENCIA ORIGEN"
                          v-model="props.item.pasajero.comunaOrigen"
                          required
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="1" sm="1" md="1" lg="1" class="pt-0">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
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
                          v-model="props.item.pasajero.comunaDestino"
                          required
                          :rules="[v => !!v || '']"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="1" sm="1" md="1" lg="1" class="pt-0">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              color="primary"
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              mdi-information-outline
                            </v-icon>
                          </template>
                          <span>Este campo debe ser llenado con la comuna donde residirá en destino, la comuna donde trabajará en el destino o la comuna que visitará en el destino.</span>
                        </v-tooltip>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="6"
                        md="5"
                        lg="4"
                        offset-md="2"
                        class="pt-0"
                      >
                        <!--div class="d-flex justify-start">
                          <v-checkbox
                            color="orange_dark"
                            v-model="props.item.pasajero.terms"
                            :rules="[v => !!v || '']"
                            required
                          ></v-checkbox>
                          <div class="d-flex align-center">
                            <label class="subheading"
                              >{{ $t('read_terms1') }}
                              <span
                                class="termLink"
                                @click="props.item.pasajero.dialog = true"
                                >{{ $t('read_terms2') }}</span
                              ></label
                            >
                          </div>
                        </div-->
                        <!--v-dialog
                          v-model="props.item.pasajero.dialog"
                          fullscreen
                          transition="dialog-bottom-transition"
                          :overlay="false"
                          scrollable
                        >
                          <v-card>
                            <v-toolbar dark class="orange">
                              <v-btn
                                icon
                                @click.native="
                                  props.item.pasajero.dialog = false
                                "
                                dark
                              >
                                <v-icon>close</v-icon>
                              </v-btn>
                              <v-toolbar-title>{{
                                $t('terms')
                              }}</v-toolbar-title>
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
                          @click="
                            clearPassengerData(props.item.pasajero, 'ALL')
                          "
                          >Limpiar</v-btn
                        >
                        <v-btn
                          color="orange"
                          :disabled="!props.item.pasajero.validForm"
                          class="white--text mr-5 md-5"
                          @click="savePassengerData(props.item.pasajero)"
                          >Guardar</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-form>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="mt-12">
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="grey--text"
            @click="routeWithScroll('#paymentStepper', 'List')"
            >{{ $t('cancel') }}</v-btn
          >
          <v-btn
            color="orange"
            :disabled="puedeContinuar()"
            class="white--text mr-5"
            @click="validaData()"
            >{{ $t('continue') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import deleteSeat from '@/helpers/deleteSeat'
import routeWithScroll from '@/helpers/routeWithScroll'
import confirmationAmount from '@/helpers/updateConfirmationTicket'
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
      name: '',
      deleting: false,
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
    for(const seat of this.selectedSeats){
      if(seat.tipo != 'pet'){
        seat.isExpanded = true;
      }
    }
    console.log(this.selectedSeats)
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
    changeDocumentType(pasajero) {
      pasajero.numeroDocumento = ''
    },
    async searchPassengerData(pasajero) {
      this.clearPassengerData(pasajero, '')
      if(pasajero.tipoDocumento=='R'){
        let valida = validations.rutValidation(pasajero.numeroDocumento)
        console.log(valida);
        if(valida!==true) return;
      }else{
        console.log("Validar pasaporte")
      }
      
      let passenger = {
        tipoDocumento: pasajero.tipoDocumento,
        documento: pasajero.numeroDocumento
      }
      console.log(passenger)
      
        await APIPassenger.getPassengerData(passenger).then(response => {
          if (response.data.documento != null) {
            pasajero.numeroDocumento = response.data.documento
            pasajero.nombre = response.data.nombres
            pasajero.apellido =
              response.data.paterno + ' ' + response.data.materno
            pasajero.nacionalidad = response.data.nacionalidad
            pasajero.email = response.data.email
            pasajero.comunaOrigen = response.data.comuna
            pasajero.telefono = response.data.telefono
            pasajero.comunaDestino = undefined
            pasajero.direccion = response.data.direccion
            pasajero.terms = false;
            pasajero.telefonoEmergencia = undefined
            console.log(pasajero)
          }
        })
    },
    async savePassengerData(pasajero) {
      await APIPassenger.savePassengerData(pasajero).then(response => {
        console.log(response.data.exito)
        if (response.data.exito) {
          this.$notify({
            group: 'info',
            title: response.data.mensaje,
            type: 'info'
          })
        } else {
          this.$notify({
            group: 'error',
            title: response.data.mensaje,
            type: 'error'
          })
        }
      })
    },
    clearPassengerData(pasajero, option) {
      if (option === 'ALL') {
        pasajero.tipoDocumento = 'R'
        pasajero.numeroDocumento = ''
      }
      pasajero.nombre = ''
      pasajero.apellido = ''
      pasajero.nacionalidad = ''
      pasajero.email = ''
      pasajero.comunaOrigen = ''
      pasajero.telefono = ''
      pasajero.telefonoEmergencia = ''
      pasajero.comunaDestino = ''
      pasajero.terms = false;
    },
    validaData() {      
      this.routeWithScroll('#paymentStepper', 'Payment')    
    },
    puedeContinuar(){
      let valid = false;
      if (this.selectedSeats.length > 0){
        this.selectedSeats.forEach(element=>{
          console.log(element.pasajero.validForm);
          if(!element.pasajero.validForm) valid=true;
        })
      }
      return valid;
    },
    routeWithScroll,
    confirmationAmount,
    async deleteSelected(seat) {
      this.deleting = true
      const index = this.selectedSeats.findIndex(item => item.id === seat.id)
      if (index > -1) {
        await deleteSeat(index)
      }
      if(seat.tipo === 'asociado'){
         const index = this.selectedSeats.findIndex(
          item =>
            item.piso === seat.piso &&
            item.servicio === seat.servicio &&
            item.fecha === seat.fecha &&
            item.origen === seat.origen &&
            item.destino === seat.destino &&
            item.integrador === seat.integrador &&
            item.empresa === seat.empresa &&
            item.asiento === seat.asientoAsociado &&
            item.tipo === 'pet' 
        )
        if (index > -1) {
          await deleteSeat(index)
        }
      }
      this.deleting = false
    },
    setBannerText(seat) {
      const content = this.banner[0].contenido
      const price =
        parseInt(seat.totalPromo.split('.').join('')) -
        parseInt(seat.tarifa.split('.').join(''))
      const priceText = this.$filters.currency(price)
      let result = content
      if (content.includes('${1}')) {
        result = content.replace('${1}', priceText)
      }
      return result
    },
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
  },
  computed: {
    ...mapGetters({
      seatsWithPromoNotSelected: ['seatsWithPromoNotSelected'],
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      userData: ['userData'],
      searching: ['getSearching'],
      hasVuelta: ['hasVuelta'],
      banner: ['getServicePaymentBanners']
    }),
    headers() {
      let result = [
        { text: 'Tipo de viaje', value: 'vuelta' },
        {
          text: this.$t('from_city2'),
          value: 'terminalOrigen',
          sortable: false
        },
        {
          text: this.$t('to_city2'),
          value: 'terminalLlegada',
          sortable: false
        },
        { text: this.$t('from_date2'), value: 'fechaSubida', sortable: false },
        {
          text: this.$t('departure_hour'),
          value: 'horaSalida',
          sortable: false
        },
        { text: this.$t('service'), value: 'servicioNombre', sortable: false },
        { text: this.$t('seat'), value: 'asiento', sortable: false },
        { text: this.$t('price'), value: 'precio', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false }
      ]
      if (!this.hasVuelta) {
        result.splice(7, 0, {
          text: 'Promoción',
          value: 'tomadoPromo',
          sortable: true
        })
      }
      return result
    }
  }
}
</script>
<style>
.confirmation-promotion-advice {
  width: 90px;
  height: 10px;
  transform: rotate(-60deg);
}

.passenger-data-advice {
  width: 300px;
  margin-top: 10px;
  margin-left: -100px;
  transform: rotate(-58deg);
  font-size: 0.7rem !important;
}
.passenger-data {
  background: #e5eaf4;
}
.title-passenger-data {
  margin: 10px 10px 10px 10px;
  color: white;
  background: #97abd2;
  border-radius: 0px !important;
  text-align: left;
}
.icono_persona {
  width: 32px;
  margin-left: 40px;
}
</style>
