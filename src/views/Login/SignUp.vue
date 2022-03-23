<template>
  <Container :open="open"  :width="600" @close="$emit('close')">
    <v-container class="pt-0 xim-desktop">
      <v-form v-model="validForm">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="headline">{{ $t('sign_up') }}</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>{{ $t('sign_up_text.description') }}</p>
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
            <h3 class="title  my-0">{{ $t('gender') }}</h3>
            <v-radio-group class="my-0" v-model="gender" :mandatory="true" dense row>
              <v-radio value="F" :label="$t('sign_up_text.woman')" color="blue" />
              <v-radio value="M" :label="$t('sign_up_text.man')" color="blue" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-row no-gutters>
              <v-col>
                <v-autocomplete
                  ref="date-1"
                  @input="dateInput(1)"
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
                  :rules="dateRules"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  ref="date-2"
                  @input="dateInput(2)"
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
                  :rules="dateRules"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  ref="date-3"
                  @input="dateInput(3)"
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
                  :rules="dateRules"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3 py-0">
            <h3 class="title  my-0">{{ $t('doc_type') }}</h3>
            <v-radio-group class="my-0" v-model="doc_type" :mandatory="true" dense row>
              <v-radio value="RUT" label="Chileno" color="blue" />
              <v-radio value="OTHER" :label="$t('other')" color="blue" />
            </v-radio-group>
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
              :rules="doc_type === 'RUT' ? rutRules : otherRules"
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              @input="
                v => {
                  this.emailconfirmError = this.confirmemail !== v
                }
              "
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
              :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
              :error="emailconfirmError"
              @input="
                v => {
                  this.emailconfirmError = this.email !== v
                }
              "
              :label="$t('confirm_email')"
              @paste.prevent
              outline-1
              color="blue"
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-autocomplete
              filled
              outlined
              dense
              v-model="nationality"
              :label="$t('nationality')"
              outline-1
              :color="blue"
              required
              :rules="generalRules"
              :append-icon="nationality === '' || nationality == null ? '$dropdown' : ''"
              :items="cities"
              item-text="descripcion"
              item-value="valor"
              :menu-props="{
                bottom: true,
                overflowY: true,
                maxHeight: this.windowHeight > 650 ? 300 : 200
              }"
              return-object
              clearable
            >
              <template slot="item" slot-scope="data">
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.descripcion"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              filled
              outlined
              dense
              v-model="phone"
              :label="$t('phone')"
              outline-1
              color="blue"
              :rules="generalRules"
              required
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              type="password"
              filled
              outlined
              dense
              v-model="password"
              @input="
                v => {
                  this.confirmpasswordError = this.confirmpassword !== v
                }
              "
              :label="$t('password')"
              outline-1
              color="blue"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              type="password"
              filled
              outlined
              dense
              v-model="confirmpassword"
              :hint="confirmpasswordError ? 'Contraseñas no coinciden' : ''"
              :error="confirmpasswordError"
              @input="
                v => {
                  this.confirmpasswordError = this.password !== v
                }
              "
              :label="$t('confirm_password')"
              outline-1
              color="blue"
              :rules="generalRules"
              required
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
    <v-container class="xim-movile xim-my-dialog">
      <v-form v-model="validForm">
        <v-row>
          <v-col cols="12" class="text-center">
            <h1 class="headline">{{ $t('sign_up') }}</h1>
          </v-col>
          <v-col cols="12" class="text-center">
            <p>{{ $t('sign_up_text.description') }}</p>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              v-model="name"
              :label="$t('name')"
              color="blue"
              :rules="generalRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              v-model="f_lastname"
              :label="$t('lastname')"
              color="blue"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3 py-0">
            <h3 class="title  my-0">{{ $t('gender') }}</h3>
            <v-radio-group class="my-0" v-model="gender" :mandatory="true" dense row>
              <v-radio value="F" :label="$t('sign_up_text.woman')" color="blue" />
              <v-radio value="M" :label="$t('sign_up_text.man')" color="blue" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-row no-gutters>
              <v-col>
                <v-autocomplete
                  ref="date-1"
                  @input="dateInput(1)"
                  maxLength="2"
                  class="body-1"
                  append-icon=""
                  v-model="day"
                  :items="days"
                  label="D"
                  color="blue"
                  style="border-top-right-radius: 0; border-bottom-right-radius: 0;"
                  :rules="dateRules"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  ref="date-2"
                  @input="dateInput(2)"
                  maxLength="2"
                  class="body-1"
                  append-icon=""
                  v-model="month"
                  :items="months"
                  label="M"
                  color="blue"
                  style="border-radius: 0;"
                  :rules="dateRules"
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  ref="date-3"
                  @input="dateInput(3)"
                  maxLength="4"
                  class="body-1"
                  append-icon=""
                  v-model="year"
                  :items="years"
                  :label="$t('short_year')"
                  color="blue"
                  style="border-bottom-left-radius: 0; border-top-left-radius: 0;"
                  :rules="dateRules"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3 py-0">
            <h3 class="title  my-0">{{ $t('doc_type') }}</h3>
            <v-radio-group class="my-0" v-model="doc_type" :mandatory="true" dense row>
              <v-radio value="RUT" label="Chileno" color="blue" />
              <v-radio value="OTHER" :label="$t('other')" color="blue" />
            </v-radio-group>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              v-model="rut"
              :label="'Nº ' + $t('document')"
              outline-1
              color="blue"
              :rules="doc_type === 'RUT' ? rutRules : otherRules"
            ></v-text-field>
          </v-col>
          <v-col xs12 lg="5" class="ml-3 mr-3">
            <v-text-field
              @input="
                v => {
                  this.emailconfirmError = this.confirmemail !== v
                }
              "
              v-model="email"
              :rules="emailRules"
              :label="$t('email')"
              color="blue"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              v-model="confirmemail"
              :hint="emailconfirmError ? 'E-mails no coinciden' : ''"
              :error="emailconfirmError"
              @input="
                v => {
                  this.emailconfirmError = this.email !== v
                }
              "
              :label="$t('confirm_email')"
              @paste.prevent
              color="blue"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-autocomplete
              v-model="nationality"
              :label="$t('nationality')"
              outline-1
              :color="blue"
              required
              :rules="generalRules"
              :append-icon="nationality === '' || nationality == null ? '$dropdown' : ''"
              :items="cities"
              item-text="descripcion"
              item-value="valor"
              :menu-props="{
                overflowY: true,
                maxHeight: this.windowHeight > 650 ? 300 : 200,
              }"
              return-object
              clearable
            >
              <template slot="item" slot-scope="data">
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.descripcion"></v-list-item-title>
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              v-model="phone"
              :label="$t('phone')"
              outline-1
              color="blue"
              :rules="generalRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              type="password"
              v-model="password"
              @input="
                v => {
                  this.confirmpasswordError = this.confirmpassword !== v
                }
              "
              :label="$t('password')"
              outline-1
              color="blue"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5" class="ml-3 mr-3">
            <v-text-field
              type="password"
              v-model="confirmpassword"
              :hint="confirmpasswordError ? 'Contraseñas no coinciden' : ''"
              :error="confirmpasswordError"
              @input="
                v => {
                  this.confirmpasswordError = this.password !== v
                }
              "
              :label="$t('confirm_password')"
              outline-1
              color="blue"
              :rules="generalRules"
              required
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
import passenger from '@/services/api/passenger'
import validations from '@/helpers/fieldsValidation'
import moment from 'moment'

export default {
  components: {
    Container
  },
  props: ['open', 'windowHeight', 'blue'],
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
      years: Array.from({ length: 87 }, (v, k) => k + moment().get('year') - 100),
      f_lastname: '',
      gender: 'F',
      doc_type: 'RUT',
      email: '',
      confirmemail: '',
      password: '',
      confirmpassword: '',
      movil: '',
      rut: '',
      terms: '',
      info: '',
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      emailconfirmError: false,
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      otherRules: [v => !!v || 'Este campo es requerido', validations.otherDocValidation],
      generalRules: [v => !!v || 'Este campo es requerido'],
      dateRules: [v => !!v || ''],
      nationality: '',
      confirmpasswordError: false,
      cities: [],
      phone: '',
      passwordRules: [v => !!v || 'Contraseña es requerida', validations.passwordValidation]
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
          genero: this.gender,
          pais: this.nationality?.valor,
          telefono: this.phone,
          password: this.password,
        }
        // console.log('params', params)
        const response = await API.signup(params)
        //console.log(response.data)
        if (response.data.exito) {
          this.$notify({
            group: 'info',
            title: 'Usuario registrado correctamente',
            type: 'info'
          })
          this.$store.dispatch('SET_SESSION_DIALOG', {
            type: 'dialogType',
            dialogType: 'login'
          })
        } else {
          let text =
            response.data.mensaje.length > 0
              ? response.data.mensaje
              : this.$t('sign_up_error')
          this.$notify({
            group: 'error',
            title: this.$t('sign_up'),
            type: 'error',
            text
          })
          console.error(response.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    dateInput(id) {
      this.$nextTick(() => {
        const nextId = id + 1
        if (nextId >= 4) {
          return
        }
        const theElement = this.$refs[`date-${nextId}`].$el
        const input = theElement.querySelector('input:not([type=hidden])')
        if (input) {
          setTimeout(() => {
            input.focus()
          }, 0)
        }
      })
    },
    getNationality() {
      passenger.getNationalityList().then(
        v => {
          this.cities = v.data;
        }
      );
    }
  },
  beforeMount(){
    this.getNationality()
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