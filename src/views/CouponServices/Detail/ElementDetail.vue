<template>
  <div id="idSearchConfirm">
    <v-row v-if="requiereAutenticacion">
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <v-card class="mt-12">
          <v-toolbar dense class="elevation-0" dark color="blue_light" id="IdentificationSection">
            <v-toolbar-title>
              <span class="title ml-3">Autenticación</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form v-model="validForm">
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
                  @keypress="validar($event,'rut')"
                ></v-text-field>
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="password"
                  label="Contraseña"
                  type="password"
                  outline-1
                  color="blue"
                  :rules="passwordRules"
                  required
                ></v-text-field>
                <div style="text-align: right;">
                  <v-btn
                    class="white--text"
                    :disabled="!validForm"
                    :loading="loading"
                    color="blue_dark"
                    @click="validate()"
                  >
                    <span>Validar</span>
                  </v-btn>
                </div>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <v-card class="mt-12">
          <v-toolbar dense class="elevation-0" dark color="blue_light" id="ServiceToolbar">
            <v-toolbar-title>
              <span class="title ml-3">Detalle Cuponera</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <table id="tblCupon">
                <tr>
                  <th class="leftText">Empresa</th>
                  <th class="leftText">Programa</th>
                  <th class="leftText">Servicio</th>
                  <th class="leftText">Ruta</th>
                  <th class="leftText">Boletos</th>
                  <th class="leftText">Distribucion</th>
                  <th class="rightText">Valor</th>
                </tr>
                <tr>
                  <td class="leftText">
                    <img
                      :src="'data:image;base64,' + cupon.empresaLogo"
                      class="service-company-image"
                      :title="cupon.empresaDescripcion"/>
                  </td>
                  <td class="leftText">{{ cupon.programa }}</td>
                  <td class="leftText">{{ cupon.claseDescripcion }}</td>                  
                  <td class="leftText">{{ cupon.rutaDescripcion }}</td>
                  <td class="leftText"><b>{{ cupon.boletos}}</b></td>
                  <td class="leftText">{{ cupon.distribucion }}</td>
                  <td class="rightText">{{ cupon.total | currency }}</td>
                </tr>
              </table>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="showPaymentPanel">
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <v-card class="mt-12">
          <v-toolbar dense class="elevation-0" dark color="blue_light" id="PaySection">
            <v-toolbar-title>
              <span class="title ml-3">Medio de Pago</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-form class="mt-5" v-model="validForm2">
                <v-row>
                  <v-col cols="4">
                    <v-text-field
                      ref="email"
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
                    this.emailconfirmError = this.confirmemail.toUpperCase() !== v.toUpperCase()
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
                    this.emailconfirmError = this.email.toUpperCase() !== v.toUpperCase()
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
                          <v-radio color="orange_dark" label :value="item.value" />
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
                    <label class="subheading">
                      {{ $t('read_terms1') }}
                      <span class="termLink" @click="dialog = true">
                        {{
                        $t('read_terms2')
                        }}
                      </span>
                      {{ $t('read_terms3') }}
                    </label>
                  </div>
                </div>
                <div class="d-flex justify-end">
                  <v-btn
                    color="orange"
                    class="white--text mr-5"
                    :disabled="disabledButton"
                    :loading="loadingPayAction"
                    @click="pay"
                  >{{ $t('continue') }}</v-btn>
                </div>
              </v-form>
            </v-container>
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
                  <p class="title text-center my-4"><b>Términos y condiciones</b></p>
                  <div contenteditable="true" v-html="condiciones"></div>
                  <!--{{ cupon.condiciones }}-->
                  </div>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import validations from '@/helpers/fieldsValidation'
import APIConvenio from '@/services/api/convenios'
import APITransaction from '@/services/api/transaction'
import API from '@/services/api/coupon'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      showPaymentPanel: false,
      loadingPayAction: false,
      loading: false,
      rut: '',
      password: '',
      validForm: false,
      windowSize: { x: window.innerWidth, y: window.innerHeight },
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      passwordRules: [
        v => !!v || 'Ingrese contraseña',
        validations.passwordCostaValidation
      ],
      payMethod: 'WBPAY',
      payments: [],
      validForm2: false,
      validForm3: false,
      terms: false,
      email: '',
      confirmemail: '',
      emailconfirmError: false,
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      requiereAutenticacion:false,
      condiciones:''
    }
  },  
  computed: {
     ...mapGetters({
      cupon: ['getCupon']
    }),
    disabledButton() {
      return (
        !this.validForm2 ||
        !this.validForm3 ||
        this.email.toUpperCase() !== this.confirmemail.toUpperCase() ||
        this.payMethod === ''
      )
    }
  },
  components: {},
  mounted() {
    console.log('cupon : ', this.cupon)
    this.requiereAutenticacion = this.cupon.requiereAutenticacion;
    if(this.requiereAutenticacion){
      this.showPaymentPanel = false;
    }else{
      this.showPaymentPanel = true;
    }
    this.condiciones = this.cupon.condiciones;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    async validate() {   
      this.email = ""
      this.confirmemail = ""
      this.showPaymentPanel = false   
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Autenticando Usuario',
        type: 'info'
      })
      let user = {
        "rut": this.rut,
        "clave": this.password,
        "integrador":1001
      }      
      API.validaUsuario(user)
      .then(response => {        
        if(response.data.valido){
          if(response.data.programa == this.cupon.programa){
            console.log(response.data);
            this.showPaymentPanel = true
            this.email = response.data.mailVenta.toUpperCase()           
            this.$nextTick(function () {
              const theElement = this.$refs['email'].$el
              const input = theElement.querySelector('input:not([type=hidden])')
              if (input) {
                setTimeout(() => {
                  input.focus()
                }, 0)
              }
            });
          }else{
            this.$notify({
            group: 'error',
            title: "Usuario, no pertenece al programa " + this.cupon.programa,
            type: 'error'
            })
          }          
        }else{
          this.$notify({
          group: 'error',
          title: "Error de Autenticación",
          type: 'error'
          })
        }  
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        this.loading = false        
      })  
    },
    async pay() {
      this.loadingPayAction = true
        this.makeTransaccion()
        .then(data => {
          this.$store.dispatch('SET_CAN_DOWNLOAD', {
            permission: 'OK',
            type: 'permission'
          })
          if(data.exito){
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
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.loadingPayAction = false))
  },
  async makeTransaccion() {
    let transactionParams = {
      "integrador":1001,
      "idSistema":7,
      "programa": this.cupon.programa,
      "valor":  this.cupon.valorBoleto,
      "origen": this.cupon.idOrigen,
      "origenDescripcion":this.cupon.origenNombre,
      "destino": this.cupon.idDestino,
      "destinoDescripcion": this.cupon.destinoNombre,
      "cantidad": this.cupon.cantidad,
      "boletos": this.cupon.boletos,
      "tipoCliente": "PPS",
      "bus": this.cupon.ruta,
      "empresa": this.cupon.empresa,
      "empresaDescripcion": this.cupon.empresaDescripcion,
      "rut": this.rut,
      "email":this.email,
      "medioDePago":"WBPAY",      
      "clase": this.cupon.clase
    }
    console.log(transactionParams)
    const response = await APITransaction.postCoupon(transactionParams)
    console.log(response.data)
    return response.data
    
    },
     validar(tecla, tipo) {
      let patron;
      switch (tipo) {
      case 'rut': patron = /[\dKk-]/; break //Solo acepta números, K y guion    
      }
      var charCode = (tecla.which) ? tecla.which : tecla.keyCode;
      if (charCode != 8) {
        let aux = String.fromCharCode(charCode);
        console.log(patron.test(aux));
        if(patron.test(aux)){
          return true
        }else{
          tecla.preventDefault();
        }
      } else {
        return true;
      }
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
  }
}
</script>

<style>
#tblCupon {
  width: 100%;
}
#tblCupon td {
  padding: 5px;
}
.checkbox {
  display: inline-block !important;
}
.termLink {
  color: var(--var-blue_light);
  text-decoration: underline;
}.termLink:hover {
  cursor: pointer;
}
.webpay-payment {
  width: 150px;
}
input{
  text-transform: uppercase
}
</style>