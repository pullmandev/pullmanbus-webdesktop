<template>
  <v-container class="xim-container-i">
    <h1 class="blue--text mb-6 mt-50">{{ $t('change_password') }}</h1>
    <v-card class="rounded-search-box">
      <v-toolbar color="orange" class="white--text elevation-0">
        <div style="width: 50px">
          <v-img
            src="../../../static/logos/header/Iconos-24.png"
            height="35"
            width="35"
          />
        </div>
        <v-toolbar-title>
          <h2 class="d-flex flex-column text-left title" style="line-height: 20px">
            {{ formTitle }}
            <span v-if="userData.usuario.nombre" class="body-2">{{ email }}</span>
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-container>
          <v-form v-model="validForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  dense
                  v-model="oldpassword"
                  :label="$t('password')"
                  :append-icon="seePassword ? 'visibility' : 'visibility_off'"
                  @click:append="seePassword = !seePassword"
                  :type="seePassword ? 'password' : 'text'"
                  outline-1
                  color="blue"
                  :rules="codeRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  dense
                  v-model="password"
                  label="Nueva contraseña"
                  :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
                  @click:append="seePassword2 = !seePassword2"
                  :type="seePassword2 ? 'password' : 'text'"
                  outline-1
                  color="blue"
                  :rules="passwordRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  dense
                  v-model="confirmpassword"
                  :label="$t('confirm_password')"
                  outline-1
                  :rules="passwordconfirmRules"
                  :append-icon="seePassword3 ? 'visibility' : 'visibility_off'"
                  @click:append="seePassword3 = !seePassword3"
                  :type="seePassword3 ? 'password' : 'text'"
                  color="blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" class="ml-3 mr-3">
                <v-btn
                  :disabled="!validForm || loading"
                  class="white--text rounded-search"
                  color="blue_dark"
                  @click="changePassword"
                >
                  <span>{{ $t('save') }}</span>
                </v-btn>
                <v-btn text class="white--grey ml-6" :disabled="loading" @click="clear">
                  <span>{{ $t('cancel') }}</span>
                </v-btn>
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
import API from '@/services/api/session'
import validations from '@/helpers/fieldsValidation'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      loading: false,
      validForm: false,
      seePassword: true,
      seePassword2: true,
      seePassword3: true,
      oldpassword: '',
      password: '',
      confirmpassword: '',
      codeRules: [v => !!v || 'Codigo es requerido'],
      passwordRules: [v => !!v || 'Ingrese contraseña', validations.passwordValidation],
      passwordconfirmRules: [
        v => (v && this.password === v) || 'Contraseñas no coinciden'
      ]
    }
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    }),
    formTitle() {
      let { nombre, apellidoPaterno } = this.userData.usuario
      let title = null
      if (nombre) {
        title = nombre
        if (apellidoPaterno) {
          title += ' ' + apellidoPaterno
        }
      }
      return title != null ? title : this.email
    }
  },
  methods: {
    clear() {
      this.password = ''
      this.confirmpassword = ''
      this.confirmpassword = ''
    },
    async getParameters() {
      const { usuario } = this.userData
      this.email = usuario.email
    },
    async changePassword() {
      try {
        this.loading = true
        this.email = this.userData.usuario.email
        const params = {
          email: this.userData.usuario.email,
          password: this.oldpassword,
          nuevaPassword: this.password
        }
        const response = await API.updatePassword(params)
        this.loading = false
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: this.$t('update_data'),
            type: 'error',
            text: 'Ocurrió un error al actualizar datos, intentelo mas tarde'
          })
          console.error(response.data)
        } else {
          this.$notify({
            group: 'info',
            title: this.$t('data_updated'),
            type: 'info'
          })
        }
        this.password = ''
        this.confirmpassword = ''
        this.confirmpassword = ''
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
