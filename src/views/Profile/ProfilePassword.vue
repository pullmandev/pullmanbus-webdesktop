<template>
  <v-container>
    <h1 class="blue--text mb-6">{{ $t('change_password') }}</h1>
    <v-card class="rounded-search-box" max-width="700">
      <v-card-title>
        <v-container>
          <v-form v-model="validForm">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
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
                  outlined
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
                  outlined
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
                <v-btn
                  text
                  class="white--grey ml-6"
                  :disabled="loading"
                  @click="clear"
                >
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
    }
  }
}
</script>
