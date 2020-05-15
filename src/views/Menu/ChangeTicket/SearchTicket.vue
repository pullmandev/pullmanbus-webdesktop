<template>
  <v-card max-width="700">
    <v-card-title>
      Ingresar
    </v-card-title>
    <v-card-text>
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
            <v-col cols="12" lg="5" class="ml-3 mr-3">
              <v-btn
                class="white--text"
                small
                :disabled="!validForm"
                :loading="loading"
                color="blue_dark"
                @click="$emit('changeStep', 2)"
              >
                <span>Consultar</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
// Base components
import API from '@/services/api/menu'
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
      doc_type: 'f',
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
    async Consult() {
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
