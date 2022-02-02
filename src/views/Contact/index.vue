<template>
  <div class="pull-panel contact">
    <v-row class="banner">
      <!-- TODO: cambiar banner -->
      <img
        src="../../../static/images/form_banners/banner_viajes.png"
        alt="Teléfono mostrando la app de google map"
      />
    </v-row>

    <v-row class="panel">
      <v-col cols="10" offset="1" class="px-0">
        <div class="contact-header">
          <img src="/img/icons/contact.png" alt="carta de correo" />

          <div class="contact-title">
            <h1 v-text="$t('viewContact.title')"></h1>
            <p>
              Estamos a tu disposición para cualquier consulta que quieras hacernos.
            </p>
          </div>
        </div>

        <section class="pull mt-5">
          <v-form ref="form" v-model="validForm">
            <v-row>
              <v-col class="tipodocumento" cols="3" offset="2">
                <div class="pull-document">
                  <p class="blue_light--text">{{ $t('doc_type') }}:</p>

                  <v-radio-group
                    v-model="documentType"
                    class="my-0"
                    :mandatory="true"
                    dense
                    row
                  >
                    <v-radio value="RUT" color="blue_light">
                      <template slot="label">
                        <label class="blue_light--text">Chileno</label>
                      </template>
                    </v-radio>

                    <v-radio value="OTHER" label="Otro" color="blue_light">
                      <template slot="label">
                        <label class="blue_light--text">{{ $t('other') }}</label>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </div>
              </v-col>

              <v-col cols="5">
                <v-text-field
                  v-model="document"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.document')"
                  outline-1
                  color="blue_light"
                  :rules="documentType === 'RUT' ? rutRules : otherRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="name"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.name')"
                  outline-1
                  color="blue_light"
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="lastname.paternal"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.lastname.paternal')"
                  outline-1
                  color="blue_light"
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="lastname.maternal"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.lastname.maternal')"
                  outline-1
                  color="blue_light"
                  :rules="generalRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="phone"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.phone')"
                  outline-1
                  color="blue_light"
                  :rules="phoneRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="email"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.email')"
                  outline-1
                  color="blue_light"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="ticket"
                  filled
                  outlined
                  dense
                  :label="$t('viewContact.fields.ticket')"
                  outline-1
                  color="blue_light"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-select
                  v-model="request"
                  outlined
                  dense
                  :items="requestOptions"
                  :label="$t('viewContact.fields.select1')"
                  :rules="generalRules"
                  required
                ></v-select>
              </v-col>

              <v-col cols="6">
                <v-select
                  v-model="reason"
                  outlined
                  dense
                  :items="
                    reasonOptions[
                      requestOptions.findIndex(requestOption => requestOption === request)
                    ]
                  "
                  :label="$t('viewContact.fields.select2')"
                  :rules="generalRules"
                  :disabled="!request"
                  required
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-file-input
                  v-model="files"
                  color="blue_light"
                  counter
                  multiple
                  outlined
                  dense
                  @change="convertFiles"
                  :placeholder="$t('viewContact.fields.add_file')"
                  :rules="filesRules"
                  show-size
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip v-if="index < 3" color="blue_light" dark label small>
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 3"
                      class="text-overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 3 }} Archivo{{ files.length - 3 > 1 ? 's' : '' }}
                    </span>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <span class="note-title blue_light--text">
                {{ $t('viewContact.fields.message') }}:
              </span>

              <v-col cols="12">
                <v-textarea
                  v-model="message"
                  outlined
                  dense
                  filled
                  :label="$t('viewContact.fields.note')"
                  :rules="generalRules"
                  counter="200"
                ></v-textarea>
              </v-col>
            </v-row>
            <div class="actions">
              <v-btn outlined class="mr-6 erasebtn actbtn" @click="clear">
                {{ $t('erase') }}
              </v-btn>
              <v-btn
                class="actbtn sendbtn"
                color="white"
                outlined
                :loading="loading"
                @click="send"
                :disabled="!validForm"
              >
                {{ $t('send') }}
              </v-btn>
            </div>
          </v-form>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import validations from '@/helpers/fieldsValidation'
import sessionAPI from '@SERVICES/api/session'
import { toBase64 } from '@HELPERS/transformations'

export default {
  name: 'Contact',

  data() {
    return {
      loading: false,
      validForm: false,
      documentType: 'RUT',
      document: '',
      name: '',
      lastname: { paternal: '', maternal: '' },
      ticket: '',
      email: '',
      phone: '',
      message: '',
      request: '',
      reason: '',
      files: [],
      archivos: [],
      // “Mi solicitud es”
      requestOptions: ['Consulta general', 'Sugerencias', 'Felicitaciones', 'Reclamo'],
      // “El motivo de mis solitud es”
      reasonOptions: [
        [
          'Servicio (Itinerario - Fecha y hora - Otros)',
          'Oferta laboral',
          'Cambio u confirmación de boleto',
          'Anulación de boleto',
          'Sobre equipaje',
          'Devolución de boleto'
        ],
        ['Sugerencias'],
        ['Felicitaciones'],
        ['Servicio', 'Venta vía web', 'Venta presencial', 'Equipaje']
      ],
      emailRules: [v => !!v || 'E-mail es requerido', validations.emailValidation],
      phoneRules: [v => !!v || 'Este campo es requerido', validations.numberValidation],
      rutRules: [v => !!v || 'Rut es requerido', validations.rutValidation],
      otherRules: [v => !!v || 'Este campo es requerido', validations.otherDocValidation],
      generalRules: [v => !!v || 'Este campo es requerido'],
      filesRules: [
        v => !v || v.length < 4 || 'La cantidad de archivos debe ser menor a 4',
        v => {
          if (v.length > 0) {
            const sizeError = v.find(file => file.size < 5e6) !== undefined
            return sizeError || 'El tamaño del archivo debe ser menor que 5 MB'
          }
        }
      ]
    }
  },

  methods: {
    createNote() {
      // prettier-ignore
      return `Cliente: ${this.name} ${this.lastname.paternal} ${this.lastname.maternal} Rut: ${this.document} ${this.email} Observacion: ${this.message}.\nboleto: ${this.ticket}`
    },

    createPhone() {
      const areaCodeFound = this.phone.search(/\+[0-9 ]+/) > -1
      return areaCodeFound ? this.phone : '+569' + this.phone
    },

    async createAttachments() {
      const attachments = []

      for (const file of this.files) {
        const { type, content } = await toBase64(file)

        attachments.push({
          name: file.name,
          type,
          content
        })
      }

      return attachments
    },

    async send() {
      this.loading = true
      const params = {
        rut: this.document,
        nombre: this.name,
        apellidoPaterno: this.lastname.paternal,
        apellidoMaterno: this.lastname.maternal,
        email: this.email,
        boleto: this.ticket,
        celular: this.createPhone(),
        motivo: this.reason,
        nota: this.message,
        listaArchivo: this.archivos
        // attachments: await this.createAttachments()
      }

      const emailSended = await sessionAPI.sendContact(params)
      console.log(emailSended)
      if (emailSended.exito) {
        this.$notify({
          group: 'info',
          title: 'Solicitud enviada exitosamente',
          type: 'info'
        })

        this.clear()
      } else {
        this.$notify({
          group: 'error',
          title: 'Solicitud de contacto',
          type: 'error',
          text: 'Ocurrió un error al enviar solicitud'
        })
      }

      this.loading = false
    },

    clear() {
      this.files = []
      this.filesError = false
      this.$refs.form.reset()
    },

    convertFiles() {
      this.archivos = []
      this.files.forEach(file => {
        let resultado = {
          archivo: '',
          nombre: ''
        }
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          //console.log(reader.result)
          let base64 = reader.result.split(',')
          resultado.archivo = base64[1]
          resultado.nombre = file.name
          this.archivos.push(resultado)
        }
        reader.onerror = function(error) {
          console.log('Error: ', error)
        }
      })
    }
  }
}
</script>

<style lang="scss" src="./Contact.scss" />
