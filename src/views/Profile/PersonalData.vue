<template>
  <v-container>
    <h1 class="blue--text mb-6">{{ $t('my_profile') }}</h1>
    <v-card max-width="700">
      <v-toolbar color="orange" class="white--text elevation-0">
        <div style="width: 50px">
          <v-img
            src="../../../static/logos/header/Iconos-24.png"
            height="35"
            width="35"
          />
        </div>
        <v-toolbar-title>
          <h2
            class="d-flex flex-column text-left title"
            style="line-height: 20px"
          >
            {{ name + ' ' + f_lastname }}
            <span class="body-2">{{ email }}</span>
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-container>
          <h1 class="mb-6 headline">Datos personales</h1>
          <v-form v-model="validForm">
            <v-row>
              <v-col cols="12" lg="5" class="ml-3 mr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="name"
                  :label="$t('name')"
                  outline-1
                  color="primary"
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
                  color="primary"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" class="ml-3 mr-3">
                <v-row dense>
                  <v-col cols="12" style="position: relative">
                    <v-menu
                      v-model="pickerMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      color="blue-dark"
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          filled
                          outlined
                          dense
                          placeholder="Fecha de nacimiento"
                          v-on="on"
                          color="grey lighten-4"
                          v-model="formatedDate"
                          readonly
                        >
                        </v-text-field>
                      </template>
                      <v-date-picker
                        min="1920-01-01"
                        v-model="date"
                        color="blue_dark"
                        @input="pickerMenu = false"
                        :first-day-of-week="$i18n.locale === 'en' ? 0 : 1"
                        :locale="$t('locale')"
                      >
                      </v-date-picker>
                    </v-menu>
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
                  color="primary"
                  :rules="rutRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" class="ml-3 mr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="email"
                  :rules="emailRules"
                  :label="$t('email')"
                  outline-1
                  color="primary"
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
                  color="primary"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="5" class="ml-3 mr-3">
                <v-btn
                  class="white--text"
                  small
                  :disabled="!validForm || loading"
                  color="blue_dark"
                  @click="modify"
                >
                  <span>{{ $t('save') }}</span>
                </v-btn>
                <v-btn
                  text
                  small
                  class="white--grey ml-6"
                  :disabled="loading"
                  @click="clear"
                >
                  <span>{{ $t('undo') }}</span>
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
import moment from 'moment'

export default {
  data() {
    return {
      pickerMenu: false,
      loading: false,
      validForm: false,
      seePassword: true,
      seePassword2: true,
      name: '',
      date: null,

      m_lastname: '',
      f_lastname: '',
      gender: '',
      doc_type: 'f',
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
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  mounted() {
    this.clear()
  },
  computed: {
    ...mapGetters({
      userData: ['userData']
    }),
    formatedDate() {
      moment.locale(this.$i18n.locale)
      return moment(this.date).format('LL')
    }
  },

  methods: {
    async modify() {
      this.loading = true
      const { usuario } = Object.assign({}, this.userData)
      const params = {
        rut: this.rut,
        email: this.email,
        nombre: this.name,
        apellidoMaterno: this.m_lastname,
        apellidoPaterno: this.f_lastname,
        fechaCreacion: usuario.fechaCreacion,
        fechaNacimiento: moment(this.date).format('DD-MM-YYYY')
      }
      const response = await API.signup(params)
      this.loading = false
      if (!response.data.exito) {
        this.$notify({
          group: 'error',
          title: 'Actualizar datos',
          type: 'error',
          text: 'Ocurrió un error al actualizar datos, intentelo mas tarde'
        })
        console.error(response.data)
      } else {
        this.$notify({
          group: 'info',
          title: 'Datos actualizados',
          type: 'info'
        })
        const newUsuario = Object.assign({}, usuario, params)
        const userData = { ...this.userData, usuario: newUsuario }
        this.$store.dispatch('SET_USER', { userData })
      }
    },
    clear() {
      const { usuario } = this.userData
      this.date = moment(usuario.fechaNacimiento, 'DD-MM-YYYY').format(
        'YYYY-MM-DD'
      )
      this.name = usuario.nombre
      this.m_lastname = usuario.apellidoMaterno
      this.f_lastname = usuario.apellidoPaterno
      this.email = usuario.email
      this.confirmemail = usuario.email
      this.rut = usuario.rut
    }
  }
}
</script>

<style scoped></style>
