<template>
  <v-card max-width="700">
    <v-toolbar color="orange" class="white--text elevation-0">
      <v-icon size="35" color="white" class="mr-2"
        >mdi-arrow-right-circle</v-icon
      >
      <v-toolbar-title>
        <h2
          class="d-flex flex-column text-left title"
          style="line-height: 20px"
        >
          INGRESA TUS DATOS PARA SOLICITAR {{ requestType.text }}
        </h2>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-title>
      <v-container>
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
                color="blue"
                :rules="generalRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="5" class="ml-3 mr-3 py-0">
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
            </v-col>
            <v-col cols="12" lg="5" class="ml-3 mr-3">
              <v-text-field
                :value="movil"
                @input="phoneInput"
                ref="phone"
                maxLength="9"
                color="blue"
                filled
                outlined
                dense
                prefix="+569"
                clearable
                :placeholder="$t('mobile')"
                :hint="$t('insert_mobile')"
                :rules="phoneRules"
                class="phone"
              />
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
            <v-col cols="12" lg="5" class="ml-3 mr-3">
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
            <v-col cols="12">
              <v-textarea
                v-model="description"
                outlined
                dense
                filled
                label="Descripción del viaje"
                counter="200"
                :rules="generalRules"
              ></v-textarea>
            </v-col>
            <v-col cols="12" lg="5" class="ml-3 mr-3">
              <v-btn
                class="white--text"
                small
                :disabled="!validForm"
                :loading="loading"
                color="blue_dark"
                @click="submit"
              >
                <span>Ingresar</span>
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
</template>

<script>
// Base components
import API from '@/services/api/request'
import validations from '@/helpers/fieldsValidation'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: ['type'],
  data() {
    return {
      loading: false,
      validForm: false,
      name: '',
      doc_type: 'RUT',
      email: '',
      movil: '',
      movil_last: '',
      rut: '',
      description: '',
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
    },
    requestType() {
      const defaultObj = { text: 'VIAJE ESPECIAL', id: 1 }
      switch (this.type) {
        case 'Trip':
          return defaultObj
        case 'CurrentAccount':
          return { text: 'CUENTA CORRIENTE', id: 2 }
        default:
          return defaultObj
      }
    }
  },
  methods: {
    phoneInput(value) {
      if (!isNaN(value)) {
        this.movil = value
      } else {
        this.$refs.phone.$data.lazyValue = this.movil
      }
    },
    async submit() {
      try {
        this.loading = true
        const params = {
          tipoSolicitud: this.requestType.id,
          solicitante: this.name,
          rut: this.rut,
          telefono: '+56 9 ' + this.movil,
          email: this.email,
          descripcion: this.description,
          estado: '1',
          fechaSolicitud: moment().format(),
          responsable: null
        }
        console.log(params)
        const response = await API.postSolicitudServicio(params)
        console.log(response.data)
        if (!response.data.exito) {
          this.$notify({
            group: 'error',
            title: 'Solicitud para Viaje Especial',
            type: 'error',
            text: 'Ocurrió un error al ingreasar solicitud'
          })
          console.error(response.data)
        } else {
          this.$notify({
            group: 'info',
            title: 'Solicitud de Viaje Especial ingresada exitosamente',
            type: 'info'
          })
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    clear() {
      const { usuario } = this.userData
      this.date = moment(usuario.fechaNacimiento, 'DD-MM-YYYY').format(
        'YYYY-MM-DD'
      )
      this.name = ''
      this.movil = ''
      this.doc_type = ''
      this.rut = ''
      this.email = ''
      this.description = ''
    }
  }
}
</script>
