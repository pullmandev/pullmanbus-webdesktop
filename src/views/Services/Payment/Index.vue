<template>
  <v-container class="my-2">
    <InvalidConvenio :open.sync="convDialog" @accept="validate" />
    <h1 class="blue_dark--text">{{ $t('payment_methods') }}</h1>
    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            Convenios
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-card-text>
          <v-radio-group v-model="selectedConvenio" row>
            <v-row>
              <v-col
                :key="i"
                v-for="(item, i) in listaCovenios"
                class="d-flex align-center justify-center"
                lg="2"
                md="3"
                sm="6"
                xs="12"
              >
                <v-radio
                  class="mr-1"
                  color="orange_dark"
                  label=""
                  :value="item.value"
                />
                <v-img
                  max-height="80px"
                  max-width="80px"
                  :src="item.img"
                  class="webpay-payment"
                />
              </v-col>
            </v-row>
          </v-radio-group>
        </v-card-text>
      </v-card-title>
      <!-- Dialog -->
    </v-card>
    <v-card
      class="elevation-2 my-12 rounded-search-box"
      v-if="selectedConvenio != ''"
    >
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            Validación
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        Nombre del convenio: {{ selectedConvenioName }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="validForm">
          <v-row cols="12" sm="12" md="8" lg="7">
            <v-col cols="3">
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
            <v-col cols="4">
              <v-btn
                color="orange"
                :loading="loadingRutValidation"
                class="white--text"
                @click="showDialogOrValidate"
              >
                Validar
              </v-btn>
              <v-btn text>
                {{ $t('cancel') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <!-- Dialog -->
    </v-card>
    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="body-1 d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            Medios de pago
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-container class="mt-5 px-8">
        <strong class="display-1" style="color: #454545">
          Total: {{ totalAmount | currency }}
        </strong>
        <v-form class="mt-5" v-model="validForm2">
          <v-row>
            <v-col cols="4">
              <v-text-field
                filled
                outlined
                dense
                v-model="email"
                label="Email"
                outline-1
                color="blue"
                :rules="emailRules"
                @input="
                  v => {
                    this.emailconfirmError = this.confirmemail !== v
                  }
                "
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                filled
                outlined
                dense
                v-model="confirmemail"
                @paste.prevent
                label="Re-ingresar email"
                outline-1
                color="blue"
                required
                :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
                :error="emailconfirmError"
                @input="
                  v => {
                    this.emailconfirmError = this.email !== v
                  }
                "
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row cols="12" sm="12" md="8">
          <v-col>
            <v-radio-group v-model="payMethod" :mandatory="true" row>
              <v-col :key="index" v-for="(item, index) in payments" md="4">
                <v-row>
                  <v-col cols="1">
                    <v-radio color="orange_dark" label="" :value="item.value" />
                  </v-col>
                  <v-col cols="11">
                    <v-img
                      width="100px"
                      :src="`data:image/png;base64,${item.img}`"
                      :alt="item.alt"
                      class="webpay-payment"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-form class="mt-5" v-model="validForm3">
          <div class="d-flex justify-start">
            <v-checkbox
              color="orange_dark"
              v-model="terms"
              :rules="[v => !!v || '']"
              required
            ></v-checkbox>
            <div class="d-flex align-center">
              <label class="subheading"
                >{{ $t('read_terms1') }}
                <span class="termLink" @click="dialog = true">{{
                  $t('read_terms2')
                }}</span>
                {{ $t('read_terms3') }}</label
              >
            </div>
          </div>
          <div class="d-flex justify-end">
            <v-btn text class="grey--text" @click="toServices">{{
              $t('back')
            }}</v-btn>
            <v-btn
              color="orange"
              class="white--text mr-5"
              :disabled="disabledButton"
              :loading="loadingPayAction"
              @click="pay"
              >{{ $t('continue') }}</v-btn
            >
          </div>
        </v-form>
      </v-container>

      <!-- Dialog -->
    </v-card>
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
          <terms />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import InvalidConvenio from '@/views/Services/stepper/InvalidConvenioDiscount'
import Terms from '@/views/Services/Payment/Terms'
import { mapGetters } from 'vuex'
import APITransaction from '@/services/api/transaction'
import APIConvenio from '@/services/api/convenios'
import validations from '@/helpers/fieldsValidation'
import _ from 'lodash'

export default {
  components: {
    Terms,
    InvalidConvenio
  },
  data() {
    return {
      convDialog: false,
      loadingRutValidation: false,
      loadingPayAction: false,
      selectedConvenio: '',
      selectedConvenioName: '',
      listaCovenios: [],
      selectedSeats: this.$store.state.seats,
      rut: '',
      personalRut: this.$store.getters.payment_info.rut,
      payMethod: 'WBPAY',
      payments: [],
      terms: false,
      dialog: false,
      validForm: false,
      validForm2: false,
      validForm3: false,
      email: this.$store.getters.payment_info.email,
      confirmemail: '',
      movil: this.$store.getters.payment_info.movil,
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmError: false
    }
  },
  computed: {
    ...mapGetters({
      payment_info: ['payment_info'],
      searching: ['getSearching']
    }),
    totalAmount() {
      let totalAmount = 0
      this.selectedSeats.forEach(item => {
        const tarifa = item.tomadoPromo ? item.totalPromo : item.tarifa
        totalAmount += parseInt(tarifa.split('.').join('')) // totalAmount += 10
      })
      return totalAmount
    },
    disabledButton() {
      //const checkForRut = this.selectedConvenio !== 'NA' ? this.validForm : true
      return (
        !this.validForm2 ||
        !this.validForm3 ||
        this.email !== this.confirmemail ||
        this.payMethod === ''
      )
    }
  },
  methods: {
    showDialogOrValidate() {
      const withPromo = this.selectedSeats.filter(item => item.tomadoPromo)
      if (withPromo.length > 0) {
        this.convDialog = true
      } else {
        this.validate()
      }
    },
    toServices() {
      localStorage.fromFail = true
      this.$router.push({ name: 'ServicesPaymentData' })
    },
    async validate() {
      try {
        this.loadingRutValidation = true
        var re = /\./gi
        const params = {
          descuento: '0',
          idConvenio: this.selectedConvenio,
          listaAtributo: [{ idCampo: 'RUT', valor: this.rut }],
          listaBoleto: [],
          mensaje: '',
          montoTotal: '0',
          totalApagar: '0'
        }
        this.selectedSeats.forEach(seat => {
          console.log(seat)
          var fecha = seat.fechaPasada.split('/')
          params.listaBoleto.push({
            clase: seat.clase,
            descuento: '',
            destino: seat.destino,
            fechaSalida: fecha[2] + fecha[1] + fecha[0],
            idServicio: seat.servicio,
            origen: seat.origen,
            pago: seat.precio.replace(re, ''),
            piso: seat.piso,
            valor: seat.tarifaNormal.replace(re, ''),
            asiento: seat.asiento,
            promocion: '0'
          })
        })
        const response = await APIConvenio.getValidateConvenio(params)
        if (response.data.mensaje == 'OK') {
          response.data.listaBoleto.forEach(salida => {
            console.log(salida)
            this.selectedSeats.find(seat => {
              var fechaArr = seat.fechaPasada.split('/')
              var fecha = fechaArr[2] + fechaArr[1] + fechaArr[0]
              if (
                seat.servicio == salida.idServicio &&
                seat.origen == salida.origen &&
                seat.destino == salida.destino &&
                seat.asiento == salida.asiento &&
                fecha == salida.fechaSalida
              ) {
                seat.tarifa = salida.pago
              }
            })
          })
          this.$notify({
            group: 'info',
            title: 'Descuento aplicado',
            type: 'info'
          })
        } else {
          this.$notify({
            group: 'error',
            title: 'Validar conevenio',
            type: 'error',
            text: `${response.data.mensaje}`
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loadingRutValidation = false
      }
    },
    async pay() {
      this.loadingPayAction = true
      this.makeTransaccion()
        .then(data => {
          this.$store.dispatch('SET_CAN_DOWNLOAD', {
            permission: 'OK',
            type: 'permission'
          })
          setTimeout(() => {
            const { url, token } = data
            let f = document.createElement('form')
            f.setAttribute('method', 'post')
            f.setAttribute('action', url)
            let i = document.createElement('input')
            i.setAttribute('type', 'text')
            i.setAttribute('name', 'TBK_TOKEN')
            i.setAttribute('value', token)
            f.appendChild(i.cloneNode())
            f.style.display = 'none'
            document.body.appendChild(f)
            f.submit()
            document.body.removeChild(f)
          }, 500)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.loadingPayAction = false))
    },
    async makeTransaccion() {
      let listaCarrito = []
      this.selectedSeats.forEach(seat => {
        const params = _.pick(seat, [
          'servicio',
          'fechaServicio',
          'fechaPasada',
          'fechaLlegada',
          'horaSalida',
          'horaLlegada',
          'origen',
          'destino',
          'descuento',
          'empresa',
          'clase',
          'bus',
          'integrador'
        ])
        if (!seat.tomadoPromo) {
          params.monto = parseInt(seat.monto.split('.').join(''))
          params.precio = parseInt(seat.tarifa.split('.').join(''))
        } else {
          params.monto = parseInt(seat.totalPromo.split('.').join(''))
          params.precio = parseInt(seat.totalPromo.split('.').join(''))
        }
        params.idaVuelta = seat.tomadoPromo
        params.piso = seat.piso + 1
        params.asiento =
          seat.piso === 1 ? parseInt(seat.asiento).toString() : seat.asiento
        params.datoConvenio = this.rut
        params.convenio = this.selectedConvenio
        listaCarrito.push(params)
      })
      const paymentInfo = {
        email: this.email,
        rut: this.personalRut,
        medioDePago: this.payMethod,
        puntoVenta: 'PUL',
        montoTotal: this.totalAmount,
        idSistema: 7,
        codigoPais: '+569',
        numeroTelefono: '+569'
      }
      const transactionParams = { ...paymentInfo, listaCarrito }
      console.log('transactionParams', transactionParams)
      const response = await APITransaction.post(transactionParams)
      console.log(response.data)
      return response.data
    }
  },
  created: function() {
    console.log('Create')
    APIConvenio.getBotonPago().then(response => {
      const data = response.data.Convenio
      data.forEach(convenio => {
        if (convenio.BotonPago == 'SI') {
          this.payments.push({
            img: convenio.Imagen,
            value: convenio.Convenio,
            alt: convenio.Descripcion
          })
        }
      })
    })

    APIConvenio.getConvenios().then(response => {
      const data = response.data
      data.forEach(convenio => {
        this.listaCovenios.push({
          img: convenio.imagenCarrusel,
          value: convenio.idConvenio,
          alt: convenio.convenio.descripcion
        })
      })
      console.log(response.data)
    })
  },
  watch: {
    payMethod: function(newMethod) {
      console.log(newMethod)
      if (newMethod == 'BCNSD') {
        this.selectedConvenio = 'BCNSD'
      } else {
        if (this.selectedConvenio == 'BCNSD') {
          this.selectedConvenio = ''
        }
      }
    },
    selectedConvenio: function(newConvenio) {
      this.rut = ''
      this.selectedConvenioName = ''
      this.selectedSeats.forEach(seat => {
        console.log(seat)
        seat.tarifa = seat.precio
      })
      this.listaCovenios.forEach(conv => {
        if (conv.value == newConvenio) {
          this.selectedConvenioName = conv.alt
        }
      })
      if (newConvenio != 'BCNSD') {
        this.payMethod = 'WBPAY'
      }
    }
  }
}
</script>
<style>
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
</style>
