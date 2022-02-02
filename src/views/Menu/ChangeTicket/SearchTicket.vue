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
                v-model="ticket"
                :label="$t('ticket')"
                outline-1
                color="blue"
                :rules="generalRules"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="5" class="ml-3 mr-3">
              <v-btn
                class="white--text"
                :disabled="!validForm"
                :loading="loading"
                color="blue_dark"
                @click="Consult"
              >
                <span>{{ $t('consult') }}</span>
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
import API from '@/services/api/changeTicket'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: ['type'],
  data() {
    return {
      loading: false,
      validForm: false,
      ticket: '',
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
        const response = await API.searchTicket({ boleto: this.ticket })
        if (response.data.valorFormateado === '') {
          this.$notify({
            group: 'error',
            title: 'Error al solicitar datos de boleto',
            text: 'Verifique el boleto e intentelo de nuevo',
            type: 'error'
          })
        } else {
          this.$notify({
            group: 'info',
            title: 'Datos de boleto entregados',
            type: 'info'
          })
          this.$router.push({
            name: 'ChangeTicket',
            query: { data: response.data, ticket: this.ticket }
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
      this.date = moment(usuario.fechaNacimiento, 'DD-MM-YYYY').format('YYYY-MM-DD')
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
