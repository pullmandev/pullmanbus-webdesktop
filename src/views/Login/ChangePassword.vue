<template>
  <Container :width="600" :open="open">
    <v-container class="pt-0">
      <v-form v-model="validForm">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="headline" v-lang.change_password2></h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p v-lang.change_password_data></p>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="email"
              :label="translate('email')"
              outline-1
              color="grey lighten-4"
              :rules="emailRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="oldpassword"
              label="Codigo"
              :append-icon="seePassword ? 'visibility' : 'visibility_off'"
              @click:append="seePassword = !seePassword"
              :type="seePassword ? 'password' : 'text'"
              outline-1
              color="grey lighten-4"
              :rules="codeRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="password"
              :label="translate('password')"
              :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
              @click:append="seePassword2 = !seePassword2"
              :type="seePassword2 ? 'password' : 'text'"
              outline-1
              color="grey lighten-4"
              :rules="passwordRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="confirmpassword"
              :label="translate('confirm_password')"
              outline-1
              :rules="passwordconfirmRules"
              :append-icon="seePassword3 ? 'visibility' : 'visibility_off'"
              @click:append="seePassword3 = !seePassword3"
              :type="seePassword3 ? 'password' : 'text'"
              color="grey lighten-4"
            ></v-text-field>
          </v-col>
          <v-col md="4" offset-md="4" cols="12" class="pt-3">
            <v-btn
              :disabled="!validForm || loading"
              block
              class="white--text"
              color="blue_dark"
              @click="changePassword"
            >
              <template v-if="loading">
                <v-progress-circular
                  indeterminate
                  color="blue_dark"
                ></v-progress-circular>
              </template>
              <template v-else>
                <span v-lang.send></span>
              </template>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </Container>
</template>

<script>
// Base components
import Container from '@/views/Login/Container'
import API from '@/services/api/session'
import validations from '@/helpers/fieldsValidation'

export default {
  components: {
    Container
  },
  props: ['open'],
  data() {
    return {
      loading: false,
      validForm: false,
      seePassword: true,
      seePassword2: true,
      seePassword3: true,
      email: '',
      oldpassword: '',
      password: '',
      confirmpassword: '',
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
        v => (v && this.password === v) || 'Contraseñas no coinciden'
      ]
    }
  },
  methods: {
    async changePassword() {
      this.loading = true
      const params = {
        email: this.email,
        password: this.oldpassword,
        nuevaPassword: this.password
      }
      const response = await API.changePassword(params)
      this.loading = false
      if (!response.data.exito) {
        this.$notify({
          group: 'error',
          title: this.translate('change_password'),
          type: 'error',
          text: this.translate('change_password_error')
        })
        console.error(response.data)
      } else {
        this.$notify({
          group: 'info',
          title: this.translate('change_password_success'),
          type: 'info'
        })
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
}
.imageBanner {
  width: 100%;
  height: 100%;
}
.small-text-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.small-text {
  font-size: 16px;
  text-decoration: underline;
  opacity: 0.7;
  text-align: center;
  color: white;
}
.spacer {
  height: 20vh;
}
.rounded-search-box {
  border-radius: 10px !important;
}
</style>
