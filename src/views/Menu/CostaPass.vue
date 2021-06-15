<template>
  <v-container class="d-flex justify-center" >
    <v-card max-width="1000" style="margin:40px">
      <v-toolbar color="orange" class="white--text elevation-0">
        <v-toolbar-title class="d-flex align-center">
          <v-img
            src="../../../static/logos/CostaPass.png"
            height="45"
            width="45"
            contain
            class="d-inline-flex mr-2"
          />
          <h2
            class="d-inline-flex flex-column text-left title"
            style="line-height: 20px"
           >
            Generar Contraseña Costa Pass
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-container class="pt-0">
          <v-form v-model="validForm">
            <v-row >
              <v-col cols="12" md="6" class="ml-3 mr-3">
                <v-text-field
                v-if="hideRut"
                filled
                outlined
                dense
                v-model="usuario.rut"
                label="RUT"
                outline-1
                color="blue"
                :rules="rutRules"
                required
                maxLength="10"
                :disabled="validForm1"
              ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="ml-3 mr-3">
                <v-btn
                  v-if="hideRut "
                  color="orange"
                  class="white--text mr-5 md-5"
                  @click="search()"
                  :disabled="!validForm"
                  >Buscar</v-btn
                >
              </v-col>
              <v-col cols="12" md="1" class="ml-3 mr-3">
                <v-btn
                  v-if="hideRut"
                  color="orange"
                  class="white--text mr-5 md-5"
                  @click="clear()"
                  >Limpiar</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-container class="pt-0">
          <v-form v-model="validForm2">
            <v-row >
              <v-col cols="12" md="6" class="ml-3 mr-3">
                <v-text-field
                  v-if="hideEmail"
                  filled
                  outlined
                  dense
                  v-model="usuario.email"
                  :rules="emailRules"
                  label="CORREO ELECTRONICO"
                  outline-1
                  color="blue"
                  :disabled="validForm4"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="ml-3 mr-3">
                <v-btn
                  v-if="hideEmail"
                  color="orange"
                  class="white--text mr-5 md-5"
                  @click="send()"
                  :disabled="!validForm2"
                  >Enviar Contraseña</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
        <v-container class="pt-0">
          <v-form v-model="validForm3">
            <v-row >
              <v-col cols="12" md="6" class="ml-3 mr-3">
                <v-text-field
                v-if="hidePassword"
                filled
                outlined
                dense
                v-model="usuario.passwordTemporal"
                :label="$t('password')"
                :append-icon="seePassword ? 'visibility' : 'visibility_off'"
                @click:append="seePassword = !seePassword"
                :type="seePassword ? 'password' : 'text'"
                outline-1
                color="blue"
                :rules="codeRules"
                required
                maxLength="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ml-3 mr-3">
                <v-text-field
                  v-if="hidePassword"
                  filled
                  outlined
                  dense
                  v-model="usuario.password"
                  label="NUEVA CONTRASEÑA"
                  :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
                  @click:append="seePassword2 = !seePassword2"
                  :type="seePassword2 ? 'password' : 'text'"
                  outline-1
                  color="blue"
                  :rules="passwordRules"
                  required
                  maxLength="10"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="ml-3 mr-3">
                <v-text-field
                v-if="hidePassword"
                filled
                outlined
                dense
                v-model="usuario.passwordConfirmacion"
                label="CONFIRME NUEVA CONTRASEÑA"
                :append-icon="seePassword3 ? 'visibility' : 'visibility_off'"
                @click:append="seePassword3 = !seePassword3"
                :type="seePassword3 ? 'password' : 'text'"
                outline-1
                color="blue"
                :rules="passwordconfirmRules"
                required
                maxLength="10"
              ></v-text-field>
              <div 
                v-if="hidePassword" 
                v-bind:style="styleMensaje"
                >
                  Tu contraseña debe tener mínimo 8 y máximo 10 caracteres
                </div>
              </v-col>
              <v-col cols="12" md="2" class="ml-3 mr-3">
                  <v-btn
                  v-if="hidePassword"
                  color="orange"
                  class="white--text mr-5 md-5"
                  @click="update()"
                  :disabled="!validForm3"
                  >Actualizar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
// Base components
import validations from '@/helpers/fieldsValidation'
import APIUser from '@/services/api/session'

export default {
  data() {
    return {
      styleMensaje:{
        color: 'silver',
        fontSize: '14px',
        textAlign: 'center'
      },
      loading: false,
      validForm: false,
      validForm1: false,
      validForm2: false,
      validForm3: false,
      validForm4: false,
      hideRut: true, 
      hideSearch: true,
      hideEmail:false,
      hidePassword: false,
      seePassword: true,
      seePassword2:true,
      seePassword3:true,
      listaUsuario:[],
      usuario: {
        rut: '',
        email: '',
        passwordTemporal: '',
        password: '',
        passwordConfirmacion: ''
      },
      rutRules: [
        v => !!v || 'Rut es requerido', 
        validations.rutValidation
      ],
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      codeRules: [v => !!v || 'Codigo es requerido'],
      passwordRules: [
        v => !!v || 'Ingrese contraseña',
        validations.passwordValidation
      ],
      passwordconfirmRules: [
        v => (v && this.usuario.password === v) || 'Contraseñas no coinciden'
      ]
    }
  }, 
  computed: {
  },
  methods: {
    search() {  
        this.getUsuarioPass()
    },
    async getUsuarioPass(){
      const params = {
          rut: this.usuario.rut
      }
      const response = await APIUser.getUsuarioPass(params)
      const data = response.data
      if(data.status == true){
        if(data.response.email != ''){
          this.usuario.email = data.response.email
          this.hideEmail=true
          this.hideRut = true
          this.validForm1=true
          this.validForm = false  
          this.validForm4= true    
          this.mensajeEmail = false    
        }
        else{
          this.$notify({
            group: 'error',
            title: 'Error de email',
            type: 'error',
            text: `Debe acercarse a un punto de venta para registrar su email`
          })
          // this.validForm1 = true
          // this.hideEmail = false
          // this.validForm = false
          // this.mensajeEmail = true
        }
      }
      else{
        this.$notify({
          group: 'error',
          title: 'Rut no existe',
          type: 'error',
          text: `${response.data.mensaje}`
        })
      }
    },
    clear() {
      this.usuario = {
        rut: '',
        email: '',
        passwordTemporal: '',
        password: '',
        passwordConfirmacion: ''   
      },
      this.hideRut = true
      this.hideEmail = false
      this.hidePassword = false
      this.validForm1 = false
    },
    send(){
      if(this.usuario.email != ''){
        this.sendPass()

        this.hideRut = true
        this.hideEmail = true
        this.hidePassword= true
        this.validForm1 =true
        this.validForm2 = false 
        this.validForm4= true
      }
      else{
        this.$notify({
          group: 'error',
          title: 'Debe Ingresar Correo Electronico',
          type: 'error',
          text: 'Verique correo electronico'
      })
      }
    },
    async sendPass(){
      const params = {
          email: this.usuario.email,
          rut: this.usuario.rut
        }
      const response = await APIUser.sendPass(params)
      const data = response.data
      if (data.status === true){
        this.$notify({
            group: 'info',
            title: 'Se envio contraseña provisoria a su correo electronico',
            type: 'info',
            text: `${response.data.mensaje}`
            })
      }
      else{
        this.$notify({
            group: 'error',
            title: 'No se pudo enviar contraseña provisoria a su correo electronico',
            type: 'error',
            text: `${response.data.mensaje}`
            })
      }
    },
    update(){
      if(this.usuario.password === this.usuario.passwordConfirmacion){
        this.updatepassword()
      }
      else{
        this.$notify({
          group: 'error',
          title: 'Contraseñas no coinciden',
          type: 'error',
          text: 'Verique Contraseña'
          })
      }
    },
    async updatepassword(){
      try {
        this.loading = true
        const params = {
            rut: this.usuario.rut,
            clave: this.usuario.passwordTemporal,
            claveNueva: this.usuario.password
          }
        const response = await APIUser.updatePass(params)
        const data = response.data
        if(data.status === true){
          this.$notify({
                  group: 'info',
                  title: 'Contraseña Actualizada',
                  type: 'info',
                  text: `${response.data.mensaje}`
                })
          this.clear()
        }else{
          this.$notify({
                  group: 'info',
                  title: 'Contraseña Provisoria',
                  type: 'info',
                  text: `${response.data.mensaje}`
                })
        }
      } catch (err) {
          console.error(err)
      } finally {
          this.loading = false
      }
    }
  }
}

</script>
<style lang="scss">
</style>
