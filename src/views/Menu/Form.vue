<template>
  <div class="custom-form">
    <img
      src="../../../static/images/form_banners/banner_viajes.png"
      alt="banner-confirmacion"
      style="width: 100%"
    />
    <v-container>
      <v-toolbar color="blue_light" class="toolbar-radius white--text" dense>
        <img
          src="../../../static/logos/menu/icono_viajes_espaciales.svg"
          alt="icono_viajes_especiales"
          height="65"
        />
        <v-toolbar-title>
          <h2 class="text-left title" style="line-height: 20px">
            {{ $t('special_trips.drawer') }}
          </h2>
        </v-toolbar-title>
      </v-toolbar>
      <p class="blue_light--text my-5">
        {{ $t('special_trips.content') }}
      </p>
      <v-card color="background_blue">
        <v-card-text>
          <div class="my-6 blue_light--text text-center" style="font-size: 0.875rem;">
            <h2>
              <v-icon color="blue_light" size="35"
                >mdi-arrow-down-thin-circle-outline</v-icon
              >
              <span>{{ $t('special_trips.form') }}</span>
            </h2>
          </div>
          <v-container class="resp">
            <v-form v-model="validForm">
              <v-row>
                <v-col cols="12" lg="5" class="mx-3">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="name"
                    :label="$t('name')"
                    outline-1
                    color="blue_light"
                    :rules="generalRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3 py-0">
                  <h3 class="title blue_light--text my-0">
                    {{ $t('doc_type') }}
                  </h3>
                  <v-radio-group
                    class="my-0"
                    v-model="doc_type"
                    :mandatory="true"
                    dense
                    row
                  >
                    <v-radio value="RUT" color="blue_light">
                      <template slot="label">
                        <label class="blue_light--text">
                          Chileno
                        </label>
                      </template>
                    </v-radio>
                    <v-radio value="OTHER" label="Otro" color="blue_light">
                      <template slot="label">
                        <label class="blue_light--text">
                          {{ $t('other') }}
                        </label>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3">
                  <v-text-field
                    :value="movil"
                    @input="phoneInput"
                    ref="phone"
                    maxLength="8"
                    color="blue_light"
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
                <v-col cols="12" lg="5" class="mx-3">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="rut"
                    :label="'Nº ' + $t('document')"
                    outline-1
                    color="blue_light"
                    :rules="doc_type === 'RUT' ? rutRules : otherRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3">
                  <v-text-field
                    filled
                    outlined
                    dense
                    v-model="email"
                    :rules="emailRules"
                    :label="$t('email')"
                    outline-1
                    color="blue_light"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3">
                  <v-text-field
                    filled
                    outlined
                    dense
                    type="number"
                    v-model="cantidadPasajeros"
                    :rules="numberRules"
                    :label="$t('cantidadPasajeros')"
                    outline-1
                    color="blue"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3">
                  <!-- <v-text-field
					filled
					outlined
					dense
					v-model="comunaOrigen"
					:label="$t('comunaOrigen')"
					outline-1
					color="blue"
					:rules="generalRules"
					required
				  ></v-text-field> -->

                  <v-autocomplete
                    light
                    filled
                    outlined
                    dense
                    :items="listaComuna"
                    item-text="nombre"
                    item-value="nombre"
                    label="COMUNA RESIDENCIA ORIGEN"
                    v-model="comunaOrigen"
                    required
                    :rules="[v => !!v || '']"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="5" class="mx-3">
                  <!-- <v-text-field
					filled
					outlined
					dense
					v-model="comunaDestino"
					:label="$t('comunaDestino')"
					outline-1
					color="blue"
					:rules="generalRules"
					required
				  ></v-text-field> -->

                  <v-autocomplete
                    light
                    filled
                    outlined
                    dense
                    :items="listaComuna"
                    item-text="nombre"
                    item-value="nombre"
                    label="COMUNA RESIDENCIA DESTINO"
                    v-model="comunaDestino"
                    required
                    :rules="[v => !!v || '']"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12" lg="11" class="ml-3 pr-12">
                  <v-textarea
                    v-model="description"
                    outlined
                    dense
                    filled
                    :label="$t('special_trips.description')"
                    counter="200"
                    :rules="generalRules"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" lg="11" class="ml-3 pr-12 d-flex justify-end">
                  <v-btn
                    text
                    color="blue_light"
                    outlined
                    class="white--grey mr-6"
                    :disabled="loading"
                    @click="clear"
                  >
                    {{ $t('erase') }}
                  </v-btn>
                  <v-btn
                    class="white--text"
                    :disabled="!validForm"
                    :loading="loading"
                    color="blue_light"
                    @click="submit"
                  >
                    <span>{{ $t('send') }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.resp {
  padding: 12px 150px;
}
@media (max-width: 790px) {
  .resp {
    padding: 10px !important;
  }
}
</style>

<script>
// Base components
import API from '@/services/api/request'
import validations from '@/helpers/fieldsValidation'
import moment from 'moment'
import APICities from '@/services/api/cities'

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
      rut: '',
      description: '',
      cantidadPasajeros: 0,
      comunaOrigen: '',
      comunaDestino: '',
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      otherRules: [v => !!v || 'Este campo es requerido', validations.otherDocValidation],
      phoneRules: [v => !!v || 'Este campo es requerido', validations.numberValidation],
      numberRules: [
        v => !!v || 'Este campo es requerido',
        v => (v && v >= 0) || 'El valor debe ser mayor que 0',
        v => (v && v <= 5000) || 'El valor debe ser menor que 5000',
        validations.numericValidation
      ],
      generalRules: [v => !!v || 'Este campo es requerido'],
      listaComuna: []
    }
  },
  mounted() {
    this.clear()
    APICities.getAllCities()
      .then(response => {
        if (response.data) {
          response.data.forEach(item => {
            this.listaComuna.push(item)
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
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
  watch: {
    type() {
      this.clear()
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
          responsable: null,
          cantidadPasajeros: this.cantidadPasajeros,
          comunaOrigen: this.comunaOrigen,
          comunaDestino: this.comunaDestino,
          tipoDocumento: this.doc_type === 'RUT' ? 1 : 0
        }
        //console.log(params)
        const response = await API.postSolicitudServicio(params)
        //console.log(response.data)
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
          this.movil = ''
          this.reset()
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    clear() {
      this.name = ''
      this.movil = ''
      this.doc_type = 'RUT'
      this.rut = ''
      this.email = ''
      ;(this.description = ''),
        (this.cantidadPasajeros = 0),
        (this.comunaOrigen = ''),
        (this.comunaDestino = '')
    },
    reset() {
      this.$refs.form.reset()
    }
  }
}
</script>
