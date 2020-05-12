<template>
  <Container :open="open" :width="600" @close="$emit('close')">
    <v-container class="pt-0">
      <v-form v-model="validForm">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="headline">{{ $t('sign_up') }}</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>Únete! Ingresa tus datos para obtener una cuenta</p>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="name"
              :label="$t('name')"
              outline-1
              color="blue"
              :rules="generalRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="f_lastname"
              :label="$t('lastname')"
              outline-1
              color="blue"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3 py-0">
            <h3 class="title  my-0">Genero</h3>
            <v-radio-group
              class="my-0"
              v-model="gender"
              :mandatory="true"
              dense
              row
            >
              <v-radio value="F" label="Mujer" color="blue" />
              <v-radio value="M" label="Hombre" color="blue" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-row no-gutters>
              <v-col>
                <v-autocomplete
                  maxLength="2"
                  class="body-1"
                  append-icon=""
                  v-model="day"
                  :items="days"
                  outlined
                  filled
                  dense
                  label="D"
                  color="blue"
                  style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  maxLength="2"
                  class="body-1"
                  append-icon=""
                  v-model="month"
                  :items="months"
                  outlined
                  filled
                  dense
                  label="M"
                  color="blue"
                  style="border-radius: 0;"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  maxLength="4"
                  class="body-1"
                  append-icon=""
                  v-model="year"
                  :items="years"
                  outlined
                  filled
                  dense
                  :label="$t('short_year')"
                  color="blue"
                  style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="rut"
              :label="'Nº ' + $t('document')"
              outline-1
              color="blue"
              :rules="rutRules"
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="email"
              :rules="emailRules"
              :label="$t('email')"
              outline-1
              color="blue"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="confirmemail"
              :rules="emailconfirmRules"
              :label="$t('confirm_email')"
              outline-1
              color="blue"
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
              <span>{{ $t('sign_up') }}</span>
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
      pickerMenu: false,
      loading: false,
      validForm: false,
      seePassword: true,
      seePassword2: true,
      name: '',
      day: '',
      days: Array.from({ length: 31 }, (v, k) => k + 1),
      month: '',
      months: Array.from({ length: 12 }, (v, k) => k + 1),
      year: '',
      years: Array.from({ length: 81 }, (v, k) => k + 1940),
      f_lastname: '',
      gender: 'F',
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
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      generalRules: [v => !!v || 'Este campo es requerido'],
      dateRules: [v => !!v || '']
    }
  },
  computed: {
    formatedDate() {
      if (this.date === '') return ''
      else return moment(this.date).format('LL')
    },
    actualDate() {
      return moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    async signup() {
      try {
        this.loading = true
        const params = {
          rut: this.rut,
          email: this.email,
          nombre: this.name,
          apellidoPaterno: this.f_lastname,
          fechaNacimiento: `${this.year}-${this.month}-${this.day}T00:00:00.000+0000`,
          genero: this.gender
        }
        console.log('params', params)
        const response = await API.signup(params)
        console.log(response.data)
        if (response.data.exito) {
          this.$notify({
            group: 'info',
            title: 'Usuario resgistrado',
            type: 'info'
          })
          this.$store.dispatch('SET_SESSION_DIALOG', {
            type: 'dialogType',
            dialogType: 'login'
          })
        } else {
          this.$notify({
            group: 'error',
            title: this.$t('sign_up'),
            type: 'error',
            text: this.$t('sign_up_error')
          })
          console.error(response.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
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
</style>
