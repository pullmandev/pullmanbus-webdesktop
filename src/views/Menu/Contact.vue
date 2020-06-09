<template>
  <v-container class="d-flex justify-center">
    <v-card max-width="1000">
      <v-toolbar color="orange" class="white--text elevation-0">
        <v-toolbar-title class="d-flex align-center">
          <v-img
            src="../../../static/logos/Iconos-33.png"
            height="45"
            width="45"
            contain
            class="d-inline-flex mr-2"
          />
          <h2
            class="d-inline-flex flex-column text-left title"
            style="line-height: 20px"
          >
            Contacto
            <span class="body-2">
              Estamos a tu disposición para cualquier consulta que quieras
              hacernos.
            </span>
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-container class="pt-0">
          <v-form v-model="validForm">
            <v-row>
              <v-col cols="12" lg="5" class="ml-3 mr-3 py-0 d-flex justify-end">
                <div>
                  <h3 class="title  my-0">Tipo de documento</h3>
                  <v-radio-group
                    class="my-0"
                    v-model="doc_type"
                    :mandatory="true"
                    dense
                    row
                  >
                    <v-radio value="RUT" label="Chileno" color="blue" />
                    <v-radio value="OTHER" label="Otro" color="blue" />
                  </v-radio-group>
                </div>
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
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
              <v-col cols="12" md="5" class="ml-3 mr-3">
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
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="f_lastname"
                  :label="$t('f_lastname')"
                  outline-1
                  color="blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-text-field
                  filled
                  outlined
                  dense
                  v-model="m_lastname"
                  :label="$t('m_lastname')"
                  outline-1
                  color="blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
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
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-text-field
                  :value="homePhone"
                  @input="homePhoneInput"
                  ref="homePhone"
                  maxLength="9"
                  color="blue"
                  filled
                  outlined
                  dense
                  clearable
                  placeholder="Teléfono de casa"
                  class="phone"
                />
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-text-field
                  :value="phone"
                  @input="phoneInput"
                  ref="phone"
                  maxLength="8"
                  color="blue"
                  filled
                  outlined
                  dense
                  prefix="+569"
                  :rules="phoneRules"
                  clearable
                  :placeholder="$t('mobile')"
                  :hint="$t('insert_mobile')"
                  class="phone"
                />
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-text-field
                  maxLength="9"
                  filled
                  outlined
                  dense
                  v-model="ticket"
                  :label="$t('ticket')"
                  outline-1
                  color="blue"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5" class="ml-3 mr-3">
                <v-autocomplete
                  v-model="motivo"
                  :items="motivos"
                  outlined
                  filled
                  dense
                  label="Motivo de contacto"
                  color="blue"
                  item-text="nombre"
                  item-value="codigo"
                  required
                  :rules="generalRules"
                />
              </v-col>
              <v-col cols="12" class="ml-3 mr-3">
                <v-textarea
                  filled
                  outlined
                  color="blue"
                  name="input-7-4"
                  label="Nota"
                  v-model="note"
                  counter="500"
                  :error="errorNote"
                  @input="noteInput"
                  :class="{ 'error-note': errorNote }"
                ></v-textarea>
              </v-col>
              <v-col md="4" cols="12" offset-md="4" class="pt-3">
                <v-btn
                  block
                  class="white--text search-font rounded-search"
                  color="blue_dark"
                  :disabled="!validForm"
                  :loading="loading"
                  @click="send"
                >
                  <span>{{ $t('send') }}</span>
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
import validations from '@/helpers/fieldsValidation'
import APIParams from '@/services/api/parameters'
import APIUser from '@/services/api/session'

export default {
  data() {
    return {
      errorNote: false,
      loading: false,
      validForm: false,
      motivo: '',
      motivos: [],
      name: '',
      ticket: '',
      f_lastname: '',
      m_lastname: '',
      email: '',
      phone: '',
      homePhone: '',
      rut: '',
      note: '',
      doc_type: 'RUT',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        validations.emailValidation
      ],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      otherRules: [
        v => !!v || 'Este campo es requerido',
        validations.otherDocValidation
      ],
      phoneRules: [
        v => !!v || 'Este campo es requerido',
        validations.numberValidation
      ],
      generalRules: [v => !!v || 'Este campo es requerido']
    }
  },
  created() {
    APIParams.getMotivoContacto()
      .then(response => {
        this.motivos = response.data
        console.log(response.data)
      })
      .catch(err => console.error(err))
  },
  methods: {
    noteInput(value) {
      this.errorNote = value.length > 500 || value.length < 80
    },
    phoneInput(value) {
      this.validatePhone(value, 'phone')
    },
    homePhoneInput(value) {
      this.validatePhone(value, 'homePhone')
    },
    validatePhone(value, prop) {
      if (!isNaN(value)) {
        this[prop] = value
      } else {
        this.$refs[prop].$data.lazyValue = this[prop]
      }
    },
    async send() {
      try {
        this.loading = true
        const params = {
          rut: this.rut,
          nombre: this.name,
          apellidoPaterno: this.f_lastname,
          apellidoMaterno: this.m_lastname,
          email: this.email,
          telefono: this.homePhone,
          celular: '+569' + this.phone,
          boleto: this.ticket,
          motivo: this.motivo,
          nota: this.note
        }
        const response = await APIUser.sendContact(params)
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: 'Solicitud de contacto',
            type: 'error',
            text: 'Ocurrió un error al enviar solicitud'
          })
        } else {
          this.$notify({
            group: 'info',
            title: 'Solicitud enviada exitosamente',
            type: 'info'
          })
          this.clear()
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.name = ''
      this.f_lastname = ''
      this.m_lastname = ''
      this.email = ''
      this.rut = ''
      this.note = ''
      this.phone = ''
      this.homePhone = ''
      this.motivo = ''
      this.ticket = ''
    }
  }
}
</script>
<style lang="scss">
@import '@/sass/mixins.scss';

@include thumb('.error-note textarea', #ff5252 !important);
</style>
