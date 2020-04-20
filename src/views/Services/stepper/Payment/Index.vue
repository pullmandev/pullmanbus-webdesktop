<template>
  <div>
    <v-layout xs12 sm12 md8 lg6>
      <v-flex>
        <v-card class="elevation-0 mt-2">
          <v-toolbar color="font" dark class="blue-light">
            <v-toolbar-title v-lang.payment_methods></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-card>
        <v-container>
          <v-card class="elevation-8">
            <v-card-text>
              <v-container class="mb-3 mt-3">
                <v-layout row>
                  <v-flex xs2 sm1>
                    <v-radio-group v-model="payMethod" :mandatory="true">
                      <v-radio color="primarylight" label="" value="webpay" />
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs10 sm11>
                    <img
                      src="static/imgs/brands/web-pay-plus.png"
                      alt="webpay"
                      class="webpay-payment"
                    />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
    <v-container class="mt-5">
      <span class="display-2 amount">Total: {{ totalAmount | currency }}</span>
      <v-form class="mt-5" v-model="validForm">
        <v-layout row>
          <v-flex xs2 sm1>
            <v-checkbox
              color="primarylight"
              v-model="terms"
              :rules="[v => !!v || '']"
              required
            ></v-checkbox>
          </v-flex>
          <v-flex xs10 sm11 class="mt-1">
            <label class="subheading"
              >{{ translate('read_terms1') }}
              <span
                class="termLink"
                @click="dialog = true"
                v-lang.read_terms2
              ></span>
              {{ translate('read_terms3') }}</label
            >
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs4 md4 class="pl-3 pr-3">
            <v-btn
              color="primary"
              class="white--text"
              :disabled="disabledButton"
              @click="pay"
              v-lang.continue
            ></v-btn>
            <v-btn
              style="background-color:#a0a0a0;"
              class="white--text"
              @click="$store.dispatch('SET_STEP', { step: 2 })"
              v-lang.back
            ></v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
    <!-- Dialog -->
    <v-dialog
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
      :overlay="false"
      scrollable
    >
      <v-card>
        <v-toolbar dark class="primary">
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
  </div>
</template>
<script>
import Terms from '@/views/Services/stepper/Payment/Terms'
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
        idSistema: 2,
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
  color: var(--var-dark-blue);
  text-decoration: underline;
}
.termLink:hover {
  cursor: pointer;
}
.amount {
  color: var(--var-dark-blue);
  font-weight: bold !important;
}

.webpay-payment {
  width: 150px;
}
</style>
