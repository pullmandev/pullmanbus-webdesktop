<template>
  <div id="idSearchConfirm">
    <v-row v-if="requiereAutenticacion">
      <v-col cols="12" sm="12" md="8" offset-md="2">
        <v-card class="mt-12">
          <v-toolbar
            dense
            class="elevation-0"
            dark
            color="blue_light"
            id="IdentificationSection"
          >
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
                  @keypress="validar($event, 'rut')"
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
          <v-card-text>
            <v-container>
              <h2 class="my-6 blue_dark--text">Detalle Cuponera</h2>
              <table class="xim-tabla-cuponera xd">
                <tr>
                  <th>Empresa</th>
                  <th>Programa</th>
                  <th>Boletos Ida</th>
                  <th>Boletos Vuelta</th>
                  <th>Valor</th>
                </tr>
                <tr>
                  <td>{{ cupon.origenNombre + ' - ' + cupon.destinoNombre }}</td>
                  <td>{{ cupon.programa }}</td>
                  <td>{{ cupon.cantidadIda }}</td>
                  <td>{{ cupon.cantidadVuelta }}</td>
                  <td>{{ cupon.total | currency }}</td>
                </tr>
              </table>

              <table class="xim-tabla-cuponera xm">
                <tr>
                  <th>Empresa</th>
                </tr>
                <tr>
                  <td>{{ cupon.origenNombre + ' - ' + cupon.destinoNombre }}</td>
                </tr>
                <tr>
                  <th>Programa</th>
                </tr>
                <tr>
                  <td>{{ cupon.programa }}</td>
                </tr>
                <tr>
                  <th>Boletos Ida</th>
                </tr>
                <tr>
                  <td>{{ cupon.cantidadIda }}</td>
                </tr>
                <tr>
                  <th>Boletos Vuelta</th>
                </tr>
                <tr>
                  <td>{{ cupon.cantidadVuelta }}</td>
                </tr>
                <tr>
                  <th>Valor</th>
                </tr>
                <tr>
                  <td>{{ cupon.total | currency }}</td>
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
          <v-card-text>
            <v-container>
              <h2 class="my-6 blue_dark--text">Medio de Pago</h2>
              <v-form class="mt-5" v-model="validForm2">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      ref="email"
                      dense
                      v-model="email"
                      label="Email"
                      outline-1
                      color="blue-dark"
                      :rules="emailRules"
                      @input="
                        v => {
                          this.emailconfirmError =
                            this.confirmemail.toUpperCase() !== v.toUpperCase()
                        }
                      "
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
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
                          this.emailconfirmError =
                            this.email.toUpperCase() !== v.toUpperCase()
                        }
                      "
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
              <v-row cols="12" sm="12" md="8">
                <v-col>
                  <v-radio-group v-model="payMethod" :mandatory="true" row>
                    <v-col :key="index" v-for="(item, index) in payments" md="12">
                      <v-row>
                        <v-col cols="5" md="10">
                          <div class="xim-ah">
                            <v-radio color="orange_dark" label :value="item.value" />
                          </div>
                        </v-col>
                        <v-col cols="5" md="2">
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
                        {{ $t('read_terms2') }}
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
                    >{{ $t('continue') }}</v-btn
                  >
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
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      requiereAutenticacion: false,
      condiciones: '',
      forLS: JSON.parse(localStorage.getItem('vuex'))
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
    //console.log('cupon : ', this.cupon)
    this.requiereAutenticacion = this.cupon.requiereAutenticacion
    if (this.requiereAutenticacion) {
      this.showPaymentPanel = false
    } else {
      this.showPaymentPanel = true
    }
    this.condiciones = this.cupon.condiciones
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    async validate() {
      this.email = ''
      this.confirmemail = ''
      this.showPaymentPanel = false
      this.loading = true
      this.$notify({
        group: 'load',
        title: 'Autenticando Usuario',
        type: 'info'
      })
      let user = {
        rut: this.rut,
        clave: this.password,
        integrador: 1001
      }
      API.validaUsuario(user)
        .then(response => {
          if (response.data.valido) {
            if (response.data.programa == this.cupon.programa) {
              //console.log(response.data);
              this.showPaymentPanel = true
              this.email = response.data.mailVenta.toUpperCase()
              this.$nextTick(function() {
                const theElement = this.$refs['email'].$el
                const input = theElement.querySelector('input:not([type=hidden])')
                if (input) {
                  setTimeout(() => {
                    input.focus()
                  }, 0)
                }
              })
            } else {
              this.$notify({
                group: 'error',
                title: 'Usuario, no pertenece al programa ' + this.cupon.programa,
                type: 'error'
              })
            }
          } else {
            this.$notify({
              group: 'error',
              title: 'Error de Autenticación',
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
      console.log('PAGAR.........')
      this.loadingPayAction = true
      this.makeTransaccion()
        .then(data => {
          this.$store.dispatch('SET_CAN_DOWNLOAD', {
            permission: 'OK',
            type: 'permission'
          })
          if (data.exito) {
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
      let rutUser = ''

      console.log('USER::', this.forLS.userCoupon)

      if (this.forLS.userCoupon.active === true) {
        rutUser = this.forLS.userCoupon.documento
      } else {
        rutUser = this.forLS.userData.rut
      }
      //rutUser = "10809653-5"

      let transactionParams = {
        integrador: this.cupon.integrador,
        idSistema: process.env.ID_SISTEMA,
        clase: this.cupon.clase,
        boletos: this.cupon.cantidad,
        programa: this.cupon.programa,
        valor: this.cupon.total,
        origen: this.cupon.origen,
        origenDescripcion: this.cupon.origenNombre,
        destino: this.cupon.destino,
        destinoDescripcion: this.cupon.destinoNombre,
        cantidad: this.cupon.cantidad,
        tipoCliente: 'PPS',
        bus: this.cupon.tipoBus,
        empresa: this.cupon.empresa,
        empresaDescripcion: this.cupon.empresaDescripcion,
        rut: rutUser,
        email: this.email,
        medioDePago: 'WBPAY'
      }
      //console.log(transactionParams)
      const response = await APITransaction.postCoupon(transactionParams)
      //console.log(response.data)
      return response.data
    },
    validar(tecla, tipo) {
      let patron
      switch (tipo) {
        case 'rut':
          patron = /[\dKk-]/
          break //Solo acepta números, K y guion
      }
      var charCode = tecla.which ? tecla.which : tecla.keyCode
      if (charCode != 8) {
        let aux = String.fromCharCode(charCode)
        //console.log(patron.test(aux));
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
  created: function() {
    //console.log('Create')
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
.xd {
  display: table;
}
.xm {
  display: none;
  width: 100%;
}
.xim-ah {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  width: 100%;
  height: 100%;
}
.xim-tabla-cuponera {
  width: 100%;
}
.xim-tabla-cuponera th {
  text-align: left;
  padding: 10px 0;
  color: #0078db;
  font-weight: 900;
}
.xim-tabla-cuponera td {
  text-align: left;
  padding: 10px 0;
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
@media (max-width: 530px) {
  .xd {
    display: none;
    width: 100%;
  }
  .xm {
    display: table;
  }
  .xim-tabla-cuponera td {
    padding: 0 !important;
  }
}
</style>
