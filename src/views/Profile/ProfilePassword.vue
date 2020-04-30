<template>
  <v-app>
    <template>
      <v-card class="rounded-search-box">
        <v-card-title>
          <v-container>
            <v-layout column>
              <v-form v-model="validForm">
                <v-flex xs12>
                  <v-text-field
                    v-model="oldpassword"
                    :label="translate('password')"
                    :append-icon="seePassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (seePassword = !seePassword)"
                    :type="seePassword ? 'password' : 'text'"
                    outline-1
                    color="primary"
                    :rules="codeRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    label="Nueva contraseña"
                    :append-icon="
                      seePassword2 ? 'visibility' : 'visibility_off'
                    "
                    :append-icon-cb="() => (seePassword2 = !seePassword2)"
                    :type="seePassword2 ? 'password' : 'text'"
                    outline-1
                    color="primary"
                    :rules="passwordRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="confirmpassword"
                    :label="translate('confirm_password')"
                    outline-1
                    :rules="passwordconfirmRules"
                    :append-icon="
                      seePassword3 ? 'visibility' : 'visibility_off'
                    "
                    :append-icon-cb="() => (seePassword3 = !seePassword3)"
                    :type="seePassword3 ? 'password' : 'text'"
                    color="primary"
                  ></v-text-field>
                </v-flex>
              </v-form>
            </v-layout>
          </v-container>
        </v-card-title>
      </v-card>
      <div class="pt-3">
        <v-btn
          :disabled="!validForm || loading"
          class="white--text search-font rounded-search"
          color="error"
          @click="changePassword"
        >
          <span v-lang.save></span>
        </v-btn>
      </div>
    </template>
  </v-app>
</template>

<script>
// Base components
import API from '@/services/api/session'
import validations from '@/helpers/fieldsValidation'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      validForm: false,
      seePassword: true,
      seePassword2: true,
      seePassword3: true,
      oldpassword: '',
      password: '',
      confirmpassword: '',
      codeRules: [v => !!v || 'Codigo es requerido'],
      passwordRules: [
        v => !!v || 'Ingrese contraseña',
        validations.passwordValidation
      ],
      passwordconfirmRules: [
        v => (v && this.password === v) || 'Contraseñas no coinciden'
      ]
    }
  },
  mounted() {
    this.$parent.$parent.$data.title = 'change_password'
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    })
  },
  methods: {
    async changePassword() {
      this.loading = true
      const params = {
        email: this.userData.usuario.email,
        password: this.oldpassword,
        nuevaPassword: this.password
      }
      const response = await API.changePassword(params)
      this.loading = false
      if (!response.data.exito) {
        this.$notify({
          group: 'error',
          title: this.translate('update_data'),
          type: 'error',
          text: 'Ocurrió un error al actualizar datos, intentelo mas tarde'
        })
        console.error(response.data)
      } else {
        this.$notify({
          group: 'info',
          title: this.translate('data_updated'),
          type: 'info'
        })
      }
    }
  }
}
</script>
