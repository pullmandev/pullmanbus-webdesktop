<template>
  <v-container class="my-2">
    <h1 v-lang.payment_methods class="blue_dark--text"></h1>
    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-row cols="12" sm="12" md="8" lg="6">
        <v-col>
          <v-card-text>
            <v-row class="mx-8">
              <v-col cols="2" sm="1">
                <v-radio-group v-model="payMethod" :mandatory="true">
                  <v-radio color="orange_dark" label="" value="webpay" />
                </v-radio-group>
              </v-col>
              <v-col cols="10" sm="11">
                <img
                  src="../../../../static/logos/web-pay-plus.png"
                  alt="webpay"
                  class="webpay-payment"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-col>
      </v-row>
      <v-container class="mt-5 px-8">
        <span class="headline" style="color: #454545">
          Total: {{ totalAmount | currency }}
        </span>
        <v-form class="mt-5" v-model="validForm">
          <div class="d-flex justify-start">
            <v-checkbox
              color="orange_dark"
              v-model="terms"
              :rules="[v => !!v || '']"
              required
            ></v-checkbox>
            <div class="d-flex align-center">
              <label class="subheading"
                >{{ translate('read_terms1') }}
                <span
                  class="termLink"
                  @click="dialog = true"
                  v-lang.read_terms2
                ></span>
                {{ translate('read_terms3') }}</label
              >
            </div>
          </div>
          <div class="d-flex justify-end">
            <v-btn
              color="orange"
              class="white--text mr-5"
              :disabled="disabledButton"
              @click="pay"
              v-lang.continue
            ></v-btn>
            <v-btn
              text
              class="grey--text"
              @click="$router.push({ name: 'Services' })"
              v-lang.back
            ></v-btn>
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
          <v-toolbar-title>{{ translate('terms') }}</v-toolbar-title>
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
import Terms from '@/views/Services/Payment/Terms'
import { mapGetters } from 'vuex'
import APITransaction from '@/services/api/transaction'
import _ from 'lodash'

export default {
  components: {
    Terms
  },
  data() {
    return {
      payMethod: 'webpay',
      terms: false,
      dialog: false,
      validForm: false,
      email: this.$store.getters.payment_info.email,
      confirmemail: '',
      movil: this.$store.getters.payment_info.movil,
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /^.+@.+\..+$/.test(v) || 'E-mail debe ser valido'
      ],
      emailconfirmRules: [
        v => !!v || 'E-mail es requerido',
        v => this.email === v || 'E-mails no coinciden'
      ],
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  methods: {
    async pay() {
      this.makeTransaccion().catch(err => {
        console.log(err)
      })
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
        params.monto = parseInt(seat.monto.split('.').join('')) // params.monto = 10
        params.precio = parseInt(seat.precio.split('.').join('')) // params.precio = 10
        params.piso = seat.piso + 1
        params.asiento =
          seat.piso === 1
            ? (parseInt(seat.asiento) + 20).toString()
            : seat.asiento
        params.datoConvenio = ''
        params.convenio = ''
        listaCarrito.push(params)
      })
      const paymentInfo = {
        email: this.payment_info.email,
        rut: this.payment_info.rut,
        medioDePago: 'WBPAY',
        puntoVenta: 'VEB',
        montoTotal: this.totalAmount,
        idSistema: 7,
        codigoPais: '+569',
        numeroTelefono:
          this.payment_info.movil != null ? this.payment_info.movil : '+569'
      }
      const transactionParams = { ...paymentInfo, listaCarrito }
      console.log('transactionParams', transactionParams)
      const response = await APITransaction.post(transactionParams)
      console.log(response.data)
      const { url, token } = response.data
      // localStorage.url = url
      // localStorage.token = token
      // window.open('http://localhost:8081/wbpay', '_blank')
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
    }
  },
  computed: {
    ...mapGetters({
      selectedSeats: ['seats'],
      payment_info: ['payment_info'],
      searching: ['getSearching']
    }),
    totalAmount() {
      let totalAmount = 0
      this.selectedSeats.forEach(item => {
        totalAmount += parseInt(item.tarifa.split('.').join('')) // totalAmount += 10
      })
      return totalAmount
    },
    disabledButton() {
      return !this.validForm || this.payMethod === ''
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
