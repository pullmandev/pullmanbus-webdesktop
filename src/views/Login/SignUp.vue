<template>
  <Container :open="open" :width="600" @close="$emit('close')">
    <v-container>
      <v-form v-model="validForm">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="headline" v-lang.sign_up></h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>Únete! Ingresa tus datos para obtener una cuenta</p>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="name"
              :label="translate('name')"
              outline-1
              color="grey lighten-4"
              :rules="generalRules"
              class="app-textfield"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="m_lastname"
              :label="translate('m_lastname')"
              outline-1
              color="grey lighten-4"
              class="app-textfield"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-row dense>
              <v-col cols="12" style="position: relative">
                <v-menu
                  :close-on-content-click="true"
                  transition="scale-transition"
                  full-width
                  color="blue-dark"
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      dark
                      filled
                      outlined
                      dense
                      placeholder="Fecha de nacimiento"
                      v-on="on"
                      color="grey lighten-4"
                      :label="languageChange"
                      v-model="date"
                      readonly
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    min="1920-01-01"
                    @change="setDate"
                    v-model="date"
                    @input="setDate($event)"
                    color="blue_dark"
                    :locale="localeChange"
                    :first-day-of-week="firstDayOfweek"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="rut"
              :label="'Nº ' + translate('document')"
              outline-1
              color="grey lighten-4"
              :rules="rutRules"
              class="app-textfield"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              prefix="+569"
              placeholder=" "
              v-model="movil"
              :label="translate('mobile')"
              outline-1
              mask="#### ####"
              color="grey lighten-4"
              class="app-textfield"
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="email"
              :rules="emailRules"
              :label="translate('email')"
              outline-1
              color="grey lighten-4"
              class="app-textfield"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              dark
              filled
              outlined
              dense
              v-model="confirmemail"
              :rules="emailconfirmRules"
              :label="translate('confirm_email')"
              outline-1
              color="grey lighten-4"
              class="app-textfield"
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
              :append-icon="seePassword ? 'visibility' : 'visibility_off'"
              @click:append="seePassword = !seePassword"
              :type="seePassword ? 'password' : 'text'"
              outline-1
              color="grey lighten-4"
              :rules="passwordRules"
              class="app-textfield"
              required
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
              :append-icon="seePassword2 ? 'visibility' : 'visibility_off'"
              @click:append="seePassword2 = !seePassword2"
              :type="seePassword2 ? 'password' : 'text'"
              color="grey lighten-4"
              class="app-textfield"
            ></v-text-field>
          </v-col>
          <v-col md="4" cols="12" offset-md="4" class="pt-3">
            <v-btn
              block
              class="white--text search-font rounded-search"
              color="blue_dark"
              :disabled="!validForm || loading"
              @click="signup"
            >
              <span v-lang.sign_up></span>
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
import moment from 'moment'

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
      name: '',
      date: '',
      m_lastname: '',
      f_lastname: '',
      gender: '',
      doc_type: '',
      email: '',
      confirmemail: '',
      password: '',
      confirmpassword: '',
      movil: '',
      rut: '',
      terms: '',
      info: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      emailconfirmRules: [
        v => (v && this.email === v) || 'E-mails no coinciden'
      ],
      passwordRules: [
        v => !!v || 'Contraseña es requerido',
        validations.passwordValidation
      ],
      passwordconfirmRules: [
        v => (v && this.password === v) || 'Contraseñas no coinciden'
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      generalRules: [v => !!v || 'Este campo es requerido'],
      dateRules: [v => !!v || '']
    }
  },
  methods: {
    async signup() {
      this.loading = true
      const params = {
        rut: this.rut,
        email: this.email,
        nombre: this.name,
        apellidoMaterno: this.m_lastname,
        apellidoPaterno: this.f_lastname,
        estado: 'ACT',
        fechaCreacion: moment(moment(), 'DD-MM-YYYY')
          .format('L')
          .split('/')
          .join('-'),
        fechaNacimiento: `${this.day}-${this.month}-${this.year}`,
        password: this.password
      }
      console.log('params', params)
      const response = await API.signup(params)
      this.loading = false
      if (response.data.exito) {
        this.$router.push({ path: '/login' })
      } else {
        this.$notify({
          group: 'error',
          title: this.translate('sign_up'),
          type: 'error',
          text: this.translate('sign_up_error')
        })
        console.error(response.data)
      }
    }
  }
}
</script>

<style scoped>
.btn-picker-signup {
  position: absolute !important;
  top: 0;
  right: 0;
  margin-right: 2px !important;
  margin-bottom: 5px !important;
}
.signup-label {
  font-size: 14px;
}
.register-title {
  font-size: 2.5rem;
}
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
}
.spacer {
  height: 20vh;
}
.rounded-search-box {
  border-radius: 10px !important;
}
</style>
