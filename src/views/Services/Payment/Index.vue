<template>
  <v-container class="my-2">
    <h1 class="blue_dark--text">{{ $t('payment_methods') }}</h1>
    <v-card class="elevation-2 my-12 rounded-search-box">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            Convenios
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-row cols="12" sm="12" md="8" lg="6">
          <v-col>
            <v-card-text>
              <v-radio-group v-model="selectedConvenio"  row>
                <v-col :key="i" v-for="(item, i) in listaCovenios">
                  <v-row>
                    <v-col cols="2">
                      <v-radio
                        color="orange_dark"
                        label=""
                        :value="item.value"
                      />
                    </v-col>
                    <v-col cols="10">
                      <v-img width="100px"
                        :src="item.img"
                        class="webpay-payment"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-radio-group>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-title>
      <!-- Dialog -->
    </v-card>
    <v-card class="elevation-2 my-12 rounded-search-box" v-if="selectedConvenio!=''">
      <v-toolbar dense color="orange" class="white--text elevation-0">
        <v-toolbar-title>
          <h2
            class="d-flex flex-column text-left headline"
            style="line-height: 20px"
          >
            Validación
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title> Nombre del convenio: {{ selectedConvenio }} </v-card-title>
      <v-card-text>
        <v-form v-model="validForm">
          <v-row cols="12" sm="12" md="8" lg="6">
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
              <v-btn color="orange" class="white--text"
              @click="validate">
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
            class="d-flex flex-column text-left headline"
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
                required
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                filled
                outlined
                dense
                v-model="confirmemail"
                label="Re-ingresar email"
                outline-1
                color="blue"
                required
                :rules="emailconfirmRules"
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
            <v-btn
              color="orange"
              class="white--text mr-5"
              :disabled="disabledButton"
              @click="pay"
              >{{ $t('continue') }}</v-btn
            >
            <v-btn
              text
              class="grey--text"
              @click="$router.push({ name: 'Services' })"
              >{{ $t('back') }}</v-btn
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
import Terms from '@/views/Services/Payment/Terms'
import { mapGetters } from 'vuex'
import APITransaction from '@/services/api/transaction'
import APIConvenio from '@/services/api/convenios'
import validations from '@/helpers/fieldsValidation'
import _ from 'lodash'

export default {
  components: {
    Terms
  },
  data() {
    return {
      selectedConvenio: '',
      listaCovenios: [],
      rut: '',
      payMethod: 'WBPAY',
      payments: [],
      terms: false,
      dialog: false,
      validForm: false,
      validForm2: false,
      validForm3: false,
      email: this.$store.getters.payment_info.email.toString(),
      confirmemail: '',
      movil: this.$store.getters.payment_info.movil,
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmRules: [
        v => (!!v && this.email === v) || 'E-mails no coinciden'
      ]
    }
  },
  methods: {
    async validate(){
      console.log("validate")
      var re = /\./gi
      const params= {
        "descuento": "0",
        "idConvenio": this.selectedConvenio,
        "listaAtributo":[{"idCampo": "RUT","valor": this.rut}],
        "listaBoleto":[],
        "mensaje": "",
        "montoTotal": "0",
        "totalApagar": "0"
      }
      this.selectedSeats.forEach(seat => {
          console.log(seat)
          var fecha = seat.fechaPasada.split("/");
          params.listaBoleto.push({
            "clase": seat.clase,
            "descuento": "",
            "destino": seat.destino,
            "fechaSalida": fecha[2] + fecha[1] + fecha[0],
            "idServicio": seat.servicio,
            "origen": seat.origen,
            "pago": seat.precio.replace(re,''),
            "piso": seat.piso,
            "valor": seat.tarifa.replace(re,''),
            "asiento": seat.asiento,
            "promocion": "0"
            }
          )
        })
        const response = await APIConvenio.getValidateConvenio(params)
        if(response.data.mensaje=="OK"){
          response.data.listaBoleto.forEach(salida=>{
            console.log(salida)
            this.selectedSeats.find(seat => {
              var fechaArr = seat.fechaPasada.split("/")
              var fecha = fechaArr[2]+fechaArr[1]+fechaArr[0]
              if(seat.servicio==salida.idServicio &&
                  seat.origen==salida.origen &&
                  seat.destino==salida.destino &&
                  seat.asiento==salida.asiento &&
                  fecha==salida.fechaSalida){
                    seat.tarifa=salida.pago;
                  }
            })
          })
        }
    },
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
        params.precio = parseInt(seat.tarifa.split('.').join('')) // params.precio = 10
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
        medioDePago: this.payMethod,
        puntoVenta: 'PUL',
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
      totalAmount: ['seatsTotalAmount'],
      payment_info: ['payment_info'],
      searching: ['getSearching']
    }),
    disabledButton() {
      return (
        !this.validForm2 ||
        !this.validForm3 ||
        this.email !== this.confirmemail ||
        this.payMethod === '' 
      )
    }
  },
  created: function () {
    console.log("Create")
    APIConvenio.getBotonPago().then(response =>{      
      const data = response.data.Convenio
      data.forEach(convenio=>{        
        if(convenio.BotonPago=='SI'){
          this.payments.push({
          img: convenio.Imagen,
          value: convenio.Convenio,
          alt: convenio.Descripcion
          })
        }
      })
    })   
    
    APIConvenio.getConvenios().then(response=>{
      const data = response.data
      data.forEach(convenio=>{
        this.listaCovenios.push({
          img: convenio.imagenCarrusel,
          value: convenio.idConvenio,
          alt: convenio.convenio.descripcion
          })
      })
      console.log(this.convenios)
    })
  },
  watch: {
    payMethod: function(newMethod)
      {
        console.log(newMethod)
        if(newMethod=="BCNSD"){
          this.selectedConvenio="BCNSD"
        }else{
          if(this.selectedConvenio=="BCNSD"){
            this.selectedConvenio=""
          }
        }       
      },
     selectedConvenio: function(newConvenio){
       if(newConvenio!="BCNSD"){
         this.payMethod="WBPAY"
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
